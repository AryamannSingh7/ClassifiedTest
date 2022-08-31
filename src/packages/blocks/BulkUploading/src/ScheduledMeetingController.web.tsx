import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  isCreateMeetingModalOpen: boolean;
  isEditMeetingModalOpen: boolean;
  isCancelMeetingModalOpen: boolean;

  scheduleMeetingList: any[];

  scheduleMeetingId: string;
  scheduleMeetingStatus: string;
  scheduleMeetingDetails: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ScheduledMeetingController extends BlockComponent<
  Props,
  S,
  SS
> {
  GetAllMeetingsCallId: any;
  GetScheduledMeetingDetailCallId: any;

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
      isCreateMeetingModalOpen: false,
      isEditMeetingModalOpen: false,
      isCancelMeetingModalOpen: false,

      scheduleMeetingList: [],

      scheduleMeetingId: "",
      scheduleMeetingStatus: "",
      scheduleMeetingDetails: null,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Schedule Meeting Detail API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetScheduledMeetingDetailCallId !== null &&
      this.GetScheduledMeetingDetailCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetScheduledMeetingDetailCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.code === 200) {
        this.setState({
          scheduleMeetingDetails: responseJson.meeting.data,
          scheduleMeetingStatus: responseJson.meeting.data.attributes.status,
        });
      }

      var errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }

    // Get All Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllMeetingsCallId !== null &&
      this.GetAllMeetingsCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllMeetingsCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.code === 200) {
        this.setState({
          scheduleMeetingList: responseJson.meeting.data,
        });
      }

      var errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  color = {
    cancelled: {
      background: "#FFEAEA",
      color: "#F21717",
    },
    scheduled: {
      background: "#D4FFE3",
      color: "#1EC65B",
    },
    completed: {
      background: "#F1F1F1",
      color: "#6C6C6C",
    },
  };

  // Get All Meeting API
  getAllMeetings = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings`
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Schedule Meeting Detail API
  getScheduleMeetingDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetScheduledMeetingDetailCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings/${
        this.state.scheduleMeetingId
      }`
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleCreateMeetingModal = () => {
    this.setState({
      isCreateMeetingModalOpen: !this.state.isCreateMeetingModalOpen,
    });
  };

  handleEditMeetingModal = () => {
    this.setState({
      isEditMeetingModalOpen: !this.state.isEditMeetingModalOpen,
    });
  };

  handleCancelMeetingModal = () => {
    this.setState({
      isCancelMeetingModalOpen: !this.state.isCancelMeetingModalOpen,
    });
  };
  // Customizable Area End
}
