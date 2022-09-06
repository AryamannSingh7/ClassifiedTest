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
  isRejectMeetingModalOpen: boolean;
  isApproveMeetingModalOpen: boolean;

  meetingMinuteList: any[];

  meetingMinuteId: string;
  meetingMinuteStatus: string;
  meetingMinuteDetails: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MeetingMinutesController extends BlockComponent<Props, S, SS> {
  GetAllMinuteMeetingsCallId: any;
  GetMinuteMeetingDetailCallId: any;
  UpdateMinuteMeetingCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
    ];

    this.state = {
      isRejectMeetingModalOpen: false,
      isApproveMeetingModalOpen: false,

      meetingMinuteList: [],

      meetingMinuteId: "",
      meetingMinuteStatus: "",
      meetingMinuteDetails: null,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get All Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllMinuteMeetingsCallId !== null &&
      this.GetAllMinuteMeetingsCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllMinuteMeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          meetingMinuteList: responseJson.meeting.data,
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

    // Minute Meeting Detail API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMinuteMeetingDetailCallId !== null &&
      this.GetMinuteMeetingDetailCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMinuteMeetingDetailCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          meetingMinuteDetails: responseJson.meeting.data,
          meetingMinuteStatus: responseJson.meeting.data.attributes.meeting_mins_status,
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
    // Customizable Area End
  }

  // Customizable Area Start
  // Get All Meeting API
  getAllMeetings = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMinuteMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Minute Meeting Detail API
  MinuteMeetingDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMinuteMeetingDetailCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins/${
        this.state.meetingMinuteId
      }`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Update Minute Meeting API
  updateMinuteMeeting = () => {
    const body = {
      meeting: {
        meeting_mins_status: "rejected",
        meeting_reject_note_attributes: {
          note: "",
        },
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateMinuteMeetingCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), ``);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleRejectMeetingModal = () => {
    this.setState({
      isRejectMeetingModalOpen: !this.state.isRejectMeetingModalOpen,
    });
  };

  handleApproveMeetingModal = () => {
    this.setState({
      isApproveMeetingModalOpen: !this.state.isApproveMeetingModalOpen,
    });
  };
  // Customizable Area End
}
