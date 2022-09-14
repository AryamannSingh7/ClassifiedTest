import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import RichTextEditor from "react-rte";
import toast from "react-hot-toast";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface Pagination {
  current_page: any | number;
  next_page: any | number;
  prev_page: any | number;
  total_count: any | number;
  total_pages: any | number;
}

interface Filter {
  status: string;
  date: string;
  title: string;
  page: number;
  building: string;
}

interface S {
  // Customizable Area Start
  isRejectMeetingModalOpen: boolean;
  isApproveMeetingModalOpen: boolean;
  isShareModalOpen: boolean;
  isSubmitNoteModalOpen: boolean;
  isNotePreviewOpen: boolean;

  meetingMinuteList: any[];
  buildingsList: any[];

  pagination: any | Pagination;

  meetingMinuteId: string;
  meetingMinuteStatus: string;
  meetingMinuteDetails: any;

  meetingNote: any;

  shareUrl: string;

  rejectNote: string;

  status: string;
  date: string;
  building: string;
  filter: Filter;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MeetingMinutesController extends BlockComponent<Props, S, SS> {
  GetAllMinuteMeetingsCallId: any;
  GetMinuteMeetingDetailCallId: any;
  UpdateMinuteMeetingCallId: any;
  MinuteMeetingNoteCallId: any;
  GetAllBuildingsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isRejectMeetingModalOpen: false,
      isApproveMeetingModalOpen: false,
      isShareModalOpen: false,
      isSubmitNoteModalOpen: false,
      isNotePreviewOpen: false,

      meetingMinuteList: [],
      buildingsList: [],

      pagination: null,

      meetingMinuteId: "",
      meetingMinuteStatus: "",
      meetingMinuteDetails: null,

      meetingNote: RichTextEditor.createEmptyValue(),

      shareUrl: "",

      rejectNote: "",

      status: "",
      date: "",
      building: "",
      filter: {
        status: "",
        date: "",
        title: "",
        page: 1,
        building: "",
      },
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
      this.GetAllMinuteMeetingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllMinuteMeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          meetingMinuteList: responseJson.meeting.data,
          pagination: responseJson.meta.pagination,
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
      this.GetMinuteMeetingDetailCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMinuteMeetingDetailCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          meetingMinuteDetails: responseJson.meeting.data,
          meetingMinuteStatus: responseJson.meeting.data.attributes.meeting_mins_status,
          meetingNote: RichTextEditor.createValueFromString(
            responseJson.meeting.data.attributes.meeting_mins_notes,
            "html"
          ),
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

    // Add / Edit Meeting Minute Note API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.MinuteMeetingNoteCallId !== null &&
      this.MinuteMeetingNoteCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.MinuteMeetingNoteCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        toast.success("Meeting Minuted Added Successful!!");
        this.props.navigation.goBack();
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Update Minute Meeting Status Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.UpdateMinuteMeetingCallId !== null &&
      this.UpdateMinuteMeetingCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.UpdateMinuteMeetingCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        if (this.state.isApproveMeetingModalOpen) {
          this.handleApproveMeetingModal();
        } else {
          this.handleRejectMeetingModal();
        }
        toast.success(responseJson.message);
        this.MinuteMeetingDetail();
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get All Building List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllBuildingsCallId !== null &&
      this.GetAllBuildingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllBuildingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.buildings) {
        this.setState({
          buildingsList: responseJson.buildings,
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
    const { page } = this.state.filter;
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMinuteMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins?page=${page}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get All Building List API
  getBuildingsList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllBuildingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/find_building`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

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
      `society_managements/${society_id}/bx_block_meeting/meeting_mins/${this.state.meetingMinuteId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Update Minute Meeting Status API
  updateMinuteMeeting = (status: string) => {
    let body = {
      meeting: {
        meeting_mins_status: status,
      },
    };

    if (status === "rejected") {
      const note = {
        meeting_reject_note_attributes: {
          note: this.state.rejectNote,
        },
      };
      body.meeting = Object.assign(body.meeting, note);
    }

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateMinuteMeetingCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins/${this.state.meetingMinuteId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Add / Edit Meeting Minute Note API
  meetingMinuteNote = () => {
    var data = new FormData();
    data.append("meeting_mins_notes", this.state.meetingNote._cache.html);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.MinuteMeetingNoteCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins/${this.state.meetingMinuteId}/meeting_mins_notes`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  onChange = (value: any) => {
    console.log(value.toString("html"));
    this.setState({
      meetingNote: value,
    });
  };

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

  handleShareModal = () => {
    this.setState({
      isShareModalOpen: !this.state.isShareModalOpen,
    });
  };

  handleSubmitNoteModal = () => {
    this.setState({
      isSubmitNoteModalOpen: !this.state.isSubmitNoteModalOpen,
    });
  };

  handleNotePreview = () => {
    this.setState({
      isNotePreviewOpen: !this.state.isNotePreviewOpen,
    });
  };

  isInputOnlyWhiteSpace = (text: string) => {
    const regEx = /\S/;
    if (!regEx.test(text)) {
      return true;
    } else {
      return false;
    }
  };
  // Customizable Area End
}
