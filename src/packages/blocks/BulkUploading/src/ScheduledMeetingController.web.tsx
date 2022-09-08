import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
import toast from "react-hot-toast";
import moment from "moment";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface Form {
  title: string;
  place: string;
  agenda: string;
  building: string;
  date: string;
  time: string;
  momWriter: string;
  status: string;
  meetingType: string;
}

interface Pagination {
  current_page: any | number;
  next_page: any | number;
  prev_page: any | number;
  total_count: any | number;
  total_pages: any | number;
}

interface Filter {
  place: string;
  status: string;
  date: string;
  title: string;
  page: number;
}

interface S {
  // Customizable Area Start
  isCreateMeetingModalOpen: boolean;
  isEditMeetingModalOpen: boolean;
  isCancelMeetingModalOpen: boolean;
  isCompleteMeetingModalOpen: boolean;
  isCreateAttendeeModalOpen: boolean;

  scheduleMeetingList: any[];
  buildingsList: any[];
  managersList: any[];

  pagination: any | Pagination;

  place: string;
  status: string;
  date: string;
  filter: Filter;

  scheduleMeetingId: string;
  scheduleMeetingStatus: string;
  scheduleMeetingDetails: any;

  meetingForm: Form;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ScheduledMeetingController extends BlockComponent<Props, S, SS> {
  GetAllMeetingsCallId: any;
  GetScheduledMeetingDetailCallId: any;
  GetAllBuildingsCallId: any;
  GetAllManagersCallId: any;
  CreateMeetingCallId: any;
  EditMeetingCallId: any;
  UpdateStatusMeetingCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isCreateMeetingModalOpen: false,
      isEditMeetingModalOpen: false,
      isCancelMeetingModalOpen: false,
      isCompleteMeetingModalOpen: false,
      isCreateAttendeeModalOpen: false,

      scheduleMeetingList: [],
      buildingsList: [],
      managersList: [],

      pagination: null,

      place: "",
      status: "",
      date: "",
      filter: {
        place: "",
        status: "",
        date: "",
        title: "",
        page: 1,
      },

      scheduleMeetingId: "",
      scheduleMeetingStatus: "",
      scheduleMeetingDetails: null,

      meetingForm: {
        title: "",
        place: "",
        agenda: "",
        building: "",
        date: "",
        time: "",
        momWriter: "",
        status: "scheduled",
        meetingType: "",
      },
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
      this.GetScheduledMeetingDetailCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetScheduledMeetingDetailCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          scheduleMeetingDetails: responseJson.meeting.data,
          scheduleMeetingStatus: responseJson.meeting.data.attributes.status,
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

    // Get All Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllMeetingsCallId !== null &&
      this.GetAllMeetingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllMeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.meeting) {
        this.setState({
          ...this.state,
          scheduleMeetingList: responseJson.meeting.data,
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

    // Get All Manager List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetAllManagersCallId !== null &&
      this.GetAllManagersCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetAllManagersCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.manager) {
        this.setState({
          managersList: responseJson.manager,
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

    // Create Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateMeetingCallId !== null &&
      this.CreateMeetingCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateMeetingCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState(
          {
            scheduleMeetingList: [...this.state.scheduleMeetingList, responseJson.meeting.data],
          },
          () => {
            toast.success(responseJson.message);
          }
        );
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Edit Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditMeetingCallId !== null &&
      this.EditMeetingCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditMeetingCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      const newMeetingList = this.state.scheduleMeetingList.map((meeting: any) => {
        return meeting.id === this.state.scheduleMeetingId ? responseJson.meeting.data : meeting;
      });

      this.setState({ scheduleMeetingList: newMeetingList }, () => {
        toast.success(responseJson.message);
        if (this.props.navigation.getParam("id")) {
          this.getScheduleMeetingDetail();
        }
      });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Update Status Meeting API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.UpdateStatusMeetingCallId !== null &&
      this.UpdateStatusMeetingCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.UpdateStatusMeetingCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      const newMeetingList = this.state.scheduleMeetingList.map((meeting: any) => {
        return meeting.id === this.state.scheduleMeetingId ? responseJson.meeting.data : meeting;
      });
      this.setState(
        {
          scheduleMeetingList: newMeetingList,
        },
        () => {
          if (this.state.isCancelMeetingModalOpen) {
            this.handleCancelMeetingModal();
          }
          if (this.state.isCompleteMeetingModalOpen) {
            this.handleCompleteMeetingModal();
          }
          if (this.props.navigation.getParam("id")) {
            this.getScheduleMeetingDetail();
            toast.success(responseJson.message);
          }
        }
      );

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
  addMeetingValidation = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
    place: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
    agenda: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
    building: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    date: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    time: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    momWriter: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    status: Yup.string()
      .required("Required")
      .required("Required")
      .matches(/\S/, "Required"),

    // file: Yup.mixed().required("Required"),
  });

  // Get All Meeting API
  getAllMeetings = () => {
    const { place, status, date, title, page } = this.state.filter;

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings?place=${place}&status=${status}&title=${title}&date=${date}&page=${page}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

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
      `society_managements/${society_id}/bx_block_meeting/meetings/${this.state.scheduleMeetingId}`
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

  // Get All Building List API
  getManagersList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllManagersCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings/get_manager`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Create Meeting API
  createMeeting = (values: Form) => {
    const body = {
      meeting: {
        title: values.title,
        place: values.place,
        agenda: values.agenda,
        building_management_id: values.building,
        date: values.date,
        time: values.time,
        manager_id: values.momWriter,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateMeetingCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Edit Meeting API
  editMeeting = (values: Form) => {
    const body = {
      meeting: {
        title: values.title,
        place: values.place,
        agenda: values.agenda,
        building_management_id: values.building,
        date: values.date,
        time: values.time,
        manager_id: values.momWriter,
        status: values.status,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditMeetingCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings/${this.state.scheduleMeetingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Update Status Meeting API
  updateStatusMeeting = (newStatus: string) => {
    const body = {
      meeting: {
        status: newStatus,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateStatusMeetingCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings/${this.state.scheduleMeetingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

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

  handleCompleteMeetingModal = () => {
    this.setState({
      isCompleteMeetingModalOpen: !this.state.isCompleteMeetingModalOpen,
    });
  };

  handleCreateAttendeeModal = () => {
    this.setState({
      isCreateAttendeeModalOpen: !this.state.isCreateAttendeeModalOpen,
    });
  };

  openEditMeetingModal = (meeting: any) => {
    this.setState(
      {
        scheduleMeetingId: meeting.id,
        meetingForm: {
          title: meeting.attributes.title,
          place: meeting.attributes.place,
          agenda: meeting.attributes.agenda,
          building: meeting.attributes.building.id,
          date: meeting.attributes.meeting_date_time
            .split(" ")[0]
            .split("-")
            .reverse()
            .join("-"),
          time: meeting.attributes.meeting_date_time.split(" ")[1],
          momWriter: meeting.attributes.meeting_mins_writer.id,
          status: meeting.attributes.status,
          meetingType: "",
        },
      },
      () => {
        this.handleEditMeetingModal();
      }
    );
  };

  openCreateMeetingModal = () => {
    this.setState(
      {
        meetingForm: {
          title: "",
          place: "",
          agenda: "",
          building: "",
          date: "",
          time: "",
          momWriter: "",
          status: "scheduled",
          meetingType: "",
        },
      },
      () => {
        this.handleCreateMeetingModal();
      }
    );
  };
  // Customizable Area End
}
