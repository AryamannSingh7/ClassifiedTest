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
import { ROLE } from "../../../framework/src/Enum";
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
  // momWriter: string | null;
  status: string;
  meetingType: string;
  attendeeIds: any[];
  meetingGroupIds: any[];
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
  building: string;
}

interface UserFilter {
  buildingName: string;
  floorId: string;
  userType: string;
}

interface S {
  // Customizable Area Start
  isCreateMeetingModalOpen: boolean;
  isEditMeetingModalOpen: boolean;
  isCancelMeetingModalOpen: boolean;
  isCompleteMeetingModalOpen: boolean;
  isCreateAttendeeModalOpen: boolean;
  isEditAttendeeModalOpen: boolean;
  isSelectAllUser: boolean;

  scheduleMeetingList: any[];
  buildingsList: any[];
  managersList: any[];
  responseList: any[];
  userList: any[];
  groupList: any[];
  floorList: any[];

  pagination: any | Pagination;

  place: string;
  status: string;
  date: string;
  building: string;
  filter: Filter;

  scheduleMeetingId: string;
  scheduleMeetingStatus: string;
  scheduleMeetingDetails: any;

  meetingForm: Form;

  groupId: string;
  selectedUser: any[];
  groupName: string;
  selectedGroup: any[];
  isIdAddingToList: boolean;

  buildingName: string;
  floorId: string;
  userType: string;
  userFilter: UserFilter;
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
  GetMeetingResponseCallId: any;
  GetUserListCallId: any;
  GetGroupListCallId: any;
  GetGroupDetailsCallId: any;
  CreateGroupCallId: any;
  DeleteGroupListCallId: any;
  UpdateGroupCallId: any;
  // GetGroupIdsCallId: any;
  GetOwnerIdsCallId: any;
  GetResidentIdsCallId: any;
  GetFloorListCallId: any;

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
      isEditAttendeeModalOpen: false,
      isSelectAllUser: false,

      scheduleMeetingList: [],
      buildingsList: [],
      managersList: [],
      responseList: [],
      userList: [],
      groupList: [],
      floorList: [],

      pagination: null,

      place: "",
      status: "",
      date: "",
      building: "",
      filter: {
        place: "",
        status: "",
        date: "",
        title: "",
        page: 1,
        building: "",
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
        // momWriter: "",
        status: "scheduled",
        meetingType: "",
        attendeeIds: [],
        meetingGroupIds: [],
      },

      groupId: "",
      selectedUser: [],
      groupName: "",
      selectedGroup: [],
      isIdAddingToList: false,

      buildingName: "",
      floorId: "",
      userType: "",
      userFilter: {
        buildingName: "",
        floorId: "",
        userType: "",
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

    // // Get All Manager List API Response
    // if (
    //   getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    //   this.GetAllManagersCallId !== null &&
    //   this.GetAllManagersCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    // ) {
    //   this.GetAllManagersCallId = null;

    //   var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

    //   if (responseJson.manager) {
    //     this.setState({
    //       managersList: responseJson.manager,
    //     });
    //   }

    //   var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

    //   if (responseJson && responseJson.meta && responseJson.meta.token) {
    //     runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    //   } else {
    //     ApiErrorResponse(responseJson);
    //   }
    //   ApiCatchErrorResponse(errorResponse);
    // }

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
          this.getMeetingResponseList();
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

    // Get Meeting Response API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMeetingResponseCallId !== null &&
      this.GetMeetingResponseCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMeetingResponseCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ responseList: [], pagination: responseJson.meta.pagination }, () => {
          this.setState({ responseList: responseJson.data.data });
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

    //  Get User List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUserListCallId !== null &&
      this.GetUserListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUserListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ userList: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Group List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetGroupListCallId !== null &&
      this.GetGroupListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetGroupListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      console.log(responseJson);

      if (responseJson.data) {
        this.setState({ groupList: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Group Details API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetGroupDetailsCallId !== null &&
      this.GetGroupDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetGroupDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        const idList = responseJson.data.attributes.accounts.map((user: any) => user.id.toString());
        this.setState({
          groupName: responseJson.data.attributes.group_name,
          selectedUser: idList,
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

    // Create Group API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateGroupCallId !== null &&
      this.CreateGroupCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateGroupCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.handleCreateAttendeeModal();
        this.setState({ groupName: "", selectedUser: [] }, () => {
          this.getGroupList();
          toast.success("Group Created Successfully!!");
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

    // Delete Group API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteGroupListCallId !== null &&
      this.DeleteGroupListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteGroupListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        const filterList = this.state.meetingForm.meetingGroupIds.filter(
          (groupId: any) => groupId !== responseJson.data.id
        );
        this.setState({ meetingForm: { ...this.state.meetingForm, meetingGroupIds: filterList } }, () => {
          this.getGroupList();
          toast.success("Group Deleted Successfully!!");
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

    // Update Group API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.UpdateGroupCallId !== null &&
      this.UpdateGroupCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.UpdateGroupCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.handleCreateAttendeeModal();
        this.setState({ groupName: "", selectedUser: [], isEditAttendeeModalOpen: false }, () => {
          this.getGroupList();
          toast.success("Group Updated Successfully!!");
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

    // Get Owner Ids API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetOwnerIdsCallId !== null &&
      this.GetOwnerIdsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetOwnerIdsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.owner_account && this.state.isIdAddingToList) {
        const newIdList = this.state.meetingForm.attendeeIds.concat(
          responseJson.owner_account.map((resOwnerId: any) => resOwnerId.toString())
        );

        this.setState({ meetingForm: { ...this.state.meetingForm, attendeeIds: newIdList } });
      } else if (responseJson.owner_account && !this.state.isIdAddingToList) {
        let ownerIds = responseJson.owner_account.map((resOwnerId: any) => resOwnerId.toString());

        let newIdList: any[] = [];
        for (let attendeeId of this.state.meetingForm.attendeeIds) {
          if (ownerIds.includes(attendeeId)) {
            ownerIds = ownerIds.filter((Id: any) => Id !== attendeeId);
          } else {
            newIdList = [...newIdList, attendeeId.toString()];
          }
        }
        this.setState({ meetingForm: { ...this.state.meetingForm, attendeeIds: newIdList } });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Resident Ids API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetResidentIdsCallId !== null &&
      this.GetResidentIdsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetResidentIdsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.resident_account && this.state.isIdAddingToList) {
        const newIdList = this.state.meetingForm.attendeeIds.concat(
          responseJson.resident_account.map((resOwnerId: any) => resOwnerId.toString())
        );

        this.setState({ meetingForm: { ...this.state.meetingForm, attendeeIds: newIdList } });
      } else if (responseJson.resident_account && !this.state.isIdAddingToList) {
        let residentIds = responseJson.resident_account.map((resResidentId: any) => resResidentId.toString());

        let newIdList: any[] = [];
        for (let attendeeId of this.state.meetingForm.attendeeIds) {
          if (residentIds.includes(attendeeId)) {
            residentIds = residentIds.filter((Id: any) => Id !== attendeeId);
          } else {
            newIdList = [...newIdList, attendeeId.toString()];
          }
        }
        this.setState({ meetingForm: { ...this.state.meetingForm, attendeeIds: newIdList } });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Floor List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetFloorListCallId !== null &&
      this.GetFloorListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetFloorListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      console.log(responseJson.floors);
      if (responseJson.floors) {
        this.setState({ floorList: responseJson.floors });
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
  addMeetingValidation: any = Yup.object().shape({
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
      .matches(/\S/, "Required")
      .when("date", (date:any, schema:any) => {
        const newDate = date && moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
        return schema.test({
          test: (time: any) => {
            if (date && time) {
              const test = moment(newDate + ` ${time}`, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
              return moment(test).isAfter(new Date());
            }
            return true;
          },
          message: "You have entered past time!",
        });
      }),
    // momWriter: Yup.string()
    //   .required("Required")
    //   .matches(/\S/, "Required"),
    status: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    meetingType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    attendeeIds: Yup.array().when("meetingGroupIds", {
      is: (meetingGroupIds) => meetingGroupIds.length === 0,
      then: Yup.array().min(1, "Required"),
    }),

    // file: Yup.mixed().required("Required"),
  });

  // Get All Meeting API
  getAllMeetings = () => {
    const { place, status, date, title, page, building } = this.state.filter;

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllMeetingsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meetings?place=${place}&status=${status}&title=${title.trim()}&date=${date}&page=${page}&search_building=${building}`
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

  // // Get All Manager List API
  // getManagersList = () => {
  //   const header = {
  //     "Content-Type": configJSON.ApiContentType,
  //     token: localStorage.getItem("userToken"),
  //   };

  //   const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

  //   this.GetAllManagersCallId = apiRequest.messageId;

  //   const society_id = localStorage.getItem("society_id");
  //   apiRequest.addData(
  //     getName(MessageEnum.RestAPIResponceEndPointMessage),
  //     `society_managements/${society_id}/bx_block_meeting/meetings/get_manager`
  //   );

  //   apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

  //   apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

  //   runEngine.sendMessage(apiRequest.id, apiRequest);
  //   return true;
  // };

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
        // manager_id: values.momWriter,
        meeting_type: values.meetingType,
        joinee_ids: values.attendeeIds,
        meeting_group_ids: values.meetingGroupIds,
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
        // manager_id: values.momWriter,
        status: values.status,
        meeting_type: values.meetingType,
        joinee_ids: values.attendeeIds,
        meeting_group_ids: values.meetingGroupIds,
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

  // Get Meeting Response API
  getMeetingResponseList = () => {
    const { page } = this.state.filter;
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMeetingResponseCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_responses?meeting_id=${
        this.state.scheduleMeetingId
      }&page=${page}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get User List API
  getUserList = () => {
    const { buildingName, floorId, userType } = this.state.userFilter;
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUserListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/add_group_member?search_building=${buildingName}&search_floor_number=${floorId}&user_type=${userType}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Group List API
  getGroupList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetGroupListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Group Details API
  getGroupDetails = (id: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetGroupDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/${id}?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Create Group API
  createGroup = () => {
    const body = {
      meeting_group: {
        group_name: this.state.groupName,
        account_ids: this.state.selectedUser,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateGroupCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete Group API
  deleteGroup = (id: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteGroupListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/${id}?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Update Group API
  updateGroup = () => {
    const body = {
      meeting_group: {
        group_name: this.state.groupName,
        account_ids: this.state.selectedUser,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateGroupCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/${
        this.state.groupId
      }?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // // Get Group Ids List API
  // getGroupIdsList = (id: any) => {
  //   const header = {
  //     "Content-Type": configJSON.ApiContentType,
  //     token: localStorage.getItem("userToken"),
  //   };

  //   const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

  //   this.GetGroupIdsCallId = apiRequest.messageId;

  //   const society_id = localStorage.getItem("society_id");
  //   apiRequest.addData(
  //     getName(MessageEnum.RestAPIResponceEndPointMessage),
  //     `society_managements/${society_id}/bx_block_meeting/meeting_groups/group_member_ids?building_management_id=${society_id}&id=${id}`
  //   );

  //   apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

  //   apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

  //   runEngine.sendMessage(apiRequest.id, apiRequest);
  //   return true;
  // };

  // Get Owner Ids List API
  getOwnerIdsList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetOwnerIdsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/owner?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Resident Ids List API
  getResidentIdsList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetResidentIdsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/resident?building_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Floor List API
  getFloorIdsList = (buildingId: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetFloorListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/floor_listing?building_id=${buildingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

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

  openCreateAttendeeModal = () => {
    this.setState({ selectedUser: [], groupName: "", isEditAttendeeModalOpen: false }, () => {
      this.handleCreateAttendeeModal();
    });
  };

  openEditMeetingModal = (meeting: any) => {
    const meetingGroupList = meeting.attributes.meeting_groups.meeting_group.map((group: any) => group.id.toString());

    let selectedGroupList: any[] = [...meetingGroupList];
    if (meeting.attributes.meeting_groups.meeting_owner) {
      selectedGroupList = [...selectedGroupList, "owner"];
      this.setState({ isIdAddingToList: true }, () => {
        this.getOwnerIdsList();
      });
    }
    if (meeting.attributes.meeting_groups.meeting_resident) {
      selectedGroupList = [...selectedGroupList, "resident"];
      this.setState({ isIdAddingToList: true }, () => {
        this.getResidentIdsList();
      });
    }

    this.setState(
      {
        scheduleMeetingId: meeting.id,
        selectedGroup: selectedGroupList,
        meetingForm: {
          ...this.state.meetingForm,
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
          // momWriter: meeting.attributes.meeting_mins_writer.id,
          status: meeting.attributes.status,
          meetingType: meeting.attributes.meeting_type,
          meetingGroupIds: meetingGroupList,
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
          // momWriter: localStorage.getItem("userType") === ROLE.MANAGER ? localStorage.getItem("userId") : "",
          status: "scheduled",
          meetingType: "",
          attendeeIds: [],
          meetingGroupIds: [],
        },
      },
      () => {
        this.handleCreateMeetingModal();
      }
    );
  };

  addUser = (Id: any) => {
    this.setState({
      selectedUser: [...this.state.selectedUser, Id],
    });
  };

  removeUser = (Id: string) => {
    const newUserList = this.state.selectedUser.filter((id: any) => {
      return id !== Id;
    });
    this.setState({
      selectedUser: newUserList,
    });
  };

  selectAllUser = () => {
    const idList = this.state.userList.map((user: any) => user.id);
    this.setState({
      selectedUser: idList,
      isSelectAllUser: true,
    });
  };

  removeAllUser = () => {
    this.setState({
      selectedUser: [],
      isSelectAllUser: false,
    });
  };

  handleSelectedGroupList = (Id: string) => {
    const ROLE = {
      Owner: "owner",
      Resident: "resident",
    };
    if (!this.state.selectedGroup.includes(Id)) {
      this.setState({ selectedGroup: [...this.state.selectedGroup, Id] }, () => {
        if (Id === ROLE.Owner || Id === ROLE.Resident) {
          this.setState({ isIdAddingToList: true }, () => {
            if (Id === ROLE.Owner) {
              this.getOwnerIdsList();
            } else {
              this.getResidentIdsList();
            }
          });
        } else {
          this.setState({
            meetingForm: {
              ...this.state.meetingForm,
              meetingGroupIds: [...this.state.meetingForm.meetingGroupIds, Id],
            },
          });
        }
      });
    } else {
      const newSelectedList = this.state.selectedGroup.filter((id: any) => id !== Id);
      this.setState({ selectedGroup: newSelectedList }, () => {
        if (Id === ROLE.Owner || Id === ROLE.Resident) {
          this.setState({ isIdAddingToList: false }, () => {
            if (Id === ROLE.Owner) {
              this.getOwnerIdsList();
            } else {
              this.getResidentIdsList();
            }
          });
        } else {
          const newGroupIdsList = this.state.meetingForm.meetingGroupIds.filter((id: any) => id !== Id);
          this.setState({
            meetingForm: {
              ...this.state.meetingForm,
              meetingGroupIds: newGroupIdsList,
            },
          });
        }
      });
    }
  };
  // Customizable Area End
}
