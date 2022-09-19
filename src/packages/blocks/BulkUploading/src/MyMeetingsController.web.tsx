import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isScheduledMeetingOpen: boolean;
  isAttendMeetingModalOpen: boolean;

  scheduleMeetingId: string;

  meeting: any;

  response: string;

  scheduleMeetingList: any[];
  minuteMeetingList: any[];

  filter: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MyMeetingsController extends BlockComponent<Props, S, SS> {
  GetAllScheduledMeetingsCallId: any;
  GetAllMinuteMeetingsCallId: any;
  CreateMeetingResponseCallId: any;
  UpdateMeetingResponseCallId: any;
  GetMeetingByIdCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isScheduledMeetingOpen: true,
      isAttendMeetingModalOpen: false,

      scheduleMeetingId: "",

      meeting: null,

      response: "true",

      scheduleMeetingList: [],
      minuteMeetingList: [],

      filter: "scheduled",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get All Scheduled Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllScheduledMeetingsCallId !== null &&
      this.GetAllScheduledMeetingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllScheduledMeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.meeting) {
        this.setState({
          ...this.state,
          scheduleMeetingList: responseJson.meeting.data,
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get All Minute Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllMinuteMeetingsCallId !== null &&
      this.GetAllMinuteMeetingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllMinuteMeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.meeting) {
        this.setState({
          ...this.state,
          minuteMeetingList: responseJson.meeting.data,
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMeetingByIdCallId !== null &&
      this.GetMeetingByIdCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMeetingByIdCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          ...this.state,
          meeting: responseJson.meeting.data,
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Create Meeting Response API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateMeetingResponseCallId !== null &&
      this.CreateMeetingResponseCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateMeetingResponseCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.handleAttendMeetingModal();
        this.getMeetingById();
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Update Meeting Response API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.UpdateMeetingResponseCallId !== null &&
      this.UpdateMeetingResponseCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.UpdateMeetingResponseCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.handleAttendMeetingModal();
        this.getMeetingById();
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  // Get All Scheduled Meeting API
  getScheduledMeetingList = () => {
    const { filter } = this.state;

    const society_id = localStorage.getItem("society_id");
    let APIEndPoint = `society_managements/${society_id}/bx_block_meeting/meetings/shaduled_meeting`;

    if (filter === "asc" || filter === "desc") {
      APIEndPoint = APIEndPoint + "?sort=" + filter;
    } else if (filter === "accepted" || filter === "rejected") {
      APIEndPoint = APIEndPoint + "?response=" + filter;
    } else if (filter === "scheduled" || filter === "cancelled") {
      APIEndPoint = APIEndPoint + "?status=" + filter;
    }

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllScheduledMeetingsCallId = apiRequest.messageId;

    // const society_id = localStorage.getItem("society_id");
    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), APIEndPoint);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get All Minute Meeting API
  getMinuteMeetingList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMinuteMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins/approved_meeting_mins`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Meeting API
  getMeetingById = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMeetingByIdCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings/${this.state.scheduleMeetingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Create Meeting Response API
  createMeetingResponse = () => {
    const body = {
      meeting_response: {
        meeting_id: this.state.scheduleMeetingId,
        status: this.state.response === "true",
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateMeetingResponseCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_responses`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Update Meeting Response API
  updateMeetingResponse = () => {
    const body = {
      meeting_response: {
        meeting_id: this.state.scheduleMeetingId,
        status: this.state.response === "true",
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateMeetingResponseCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_responses/${this.state.scheduleMeetingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handel State
  handleScheduledMeetingModal = () => {
    this.setState({
      isScheduledMeetingOpen: !this.state.isScheduledMeetingOpen,
    });
  };

  handleAttendMeetingModal = () => {
    this.setState({
      isAttendMeetingModalOpen: !this.state.isAttendMeetingModalOpen,
    });
  };

  // Customizable Area End
}
