import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
import { ROLE } from "../../../framework/src/Enum";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  Year: any;
  expanded: any;
  anchorEl: any;

  isMenuOpen: boolean;
  isLogoutModalOpen: boolean;
  profileData: any;
  unReadCount: any;

  isPropertyManagerModalOpen: boolean;
  propertyManagerRequest: any[];
  property: {
    manager: string;
    building: string;
    unit: string;
    company: string;
  };

  isNewNotification: boolean;

  realState: any;
  buildingCategory: any;
  personalCategory: any;
  currency: string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: any = "";
  dashboardApiCallId: any = "";
  apiGetQueryStrinurl: any = "";
  getProfileDataAPiCallId: any = "";
  getUnreadCountAPIId: any = "";
  GetNotificationCallId: any = "";
  GetManagerRequestCallId: any;
  checkLoginId: string = "";
  GetOwnerDashboardStatisticCallId: string = "";
  GetResidentDashboardStatisticCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token: "",
      loading: false,
      Year: "",
      expanded: "",
      anchorEl: null,

      isLogoutModalOpen: false,
      isMenuOpen: false,
      profileData: null,
      unReadCount: null,

      isPropertyManagerModalOpen: false,
      propertyManagerRequest: [],
      property: {
        manager: "",
        building: "",
        unit: "",
        company: "",
      },

      isNewNotification: false,

      realState: null,
      buildingCategory: null,
      personalCategory: null,
      currency: ""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", async () => {
        this.getToken();
      });
    }
    this.getProfile();

    const userType = localStorage.getItem("userType");
    if (userType === ROLE.OWNER) {
      this.getManagerRequestList();
      this.getOwnerDashboardStatistic();
    } else if(userType === ROLE.OWNER_RESIDENT || userType === ROLE.TENANT) {
      this.getResidentDashboardStatistic();
    }

    this.getNotification();
  }

  getToken = () => {
    const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msg);
  };

  getDashboardData = (): boolean => {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.apiDashboardItemCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.dashboardGetUrl);

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.dashboarApiMethodType);

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
    // Customizable Area End
  };

  checkLogin = (): boolean => {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.checkLoginId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.checkLogin);

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.dashboarApiMethodType);

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
    // Customizable Area End
  };

  getNotification = async () => {
    this.GetNotificationCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_notifications/notifications/new_notification`,
    });
  }

  handleNewNotificationResponse = (responseJson: any) => {
    this.setState({isNewNotification: responseJson.new_notification})
  }

  getOwnerDashboardStatistic = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetOwnerDashboardStatisticCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/owner_dashbords?society_management_id=${society_id}`,
    });
  }

  handleOwnerDashboardStatisticResponse = (responseJson: any) => {
    if(responseJson && responseJson.data)  {
      this.setState({
        realState: responseJson.data.attributes.real_state_details,
        buildingCategory: responseJson.data.attributes.building_categories,
        personalCategory: responseJson.data.attributes.personal_categories,
        currency: responseJson.data.attributes.currency,
      });
    }
  }

  getResidentDashboardStatistic = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetResidentDashboardStatisticCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/resident_dashbords?society_management_id=${society_id}`,
    });
  }

  handleResidentDashboardStatisticResponse = (responseJson: any) => {
    if(responseJson && responseJson.data) {
      this.setState({
        buildingCategory: responseJson.data.attributes.building_services,
        personalCategory: responseJson.data.attributes.personal_services,
        currency: responseJson.data.attributes.currency,
      });
    }
  }

  checkLoginResponse = (responseJson:any) => {
    if(!responseJson?.hasOwnProperty("month")){
      localStorage.removeItem("userToken")
      this.props.navigation.navigate("/")
    }
  }
 
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
        // this.getDashboardData();
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson: any = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse: any = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.getProfileDataAPiCallId:
          this.getProfileDataAPiCallId = null;
          if (!responseJson?.errors) {
            this.setState({ profileData: responseJson?.data,loading:false })
          }
          this.parseApiCatchErrorResponse(errorResponse);
          break;
        case this.getUnreadCountAPIId:
          this.getUnreadCountAPIId = null;
          if (!responseJson?.errors) {
            this.setState({ profileData: responseJson?.data,loading:false })
          }
          this.parseApiCatchErrorResponse(errorResponse);
          break;
        case this.GetManagerRequestCallId:
          this.GetManagerRequestCallId = null;
          this.getManagerRequestListResponse(responseJson);
          break;
        case this.GetNotificationCallId:
          this.handleNewNotificationResponse(responseJson);
          break;
        case this.GetOwnerDashboardStatisticCallId:
          this.handleOwnerDashboardStatisticResponse(responseJson);
          break;
        case this.GetResidentDashboardStatisticCallId:
          this.handleResidentDashboardStatisticResponse(responseJson)
          break;
        case this.checkLoginId:
          this.checkLoginResponse(responseJson)
          break;
      }
      if (responseJson && !responseJson?.errors && responseJson?.data) {
        this.handleResponse(responseJson);
      } else {
        this.handleErrorResponse(errorResponse);
      }
    }
    // Customizable Area End
  }

  slider: any;

  // Customizable Area Start
  handleChange = (event: any) => {
    this.setState({ Year: event.target.value });
  };

  handleAccordinoChange = (panel: string) => (event: any, isExpanded: boolean) => {
    this.setState({ expanded: isExpanded ? panel : "" });
  };

  handleResponse = (responseJson: any) => {
    if (responseJson?.data?.length === 0) {
      this.setState({
        errorMsg: "Data Not Found", loading: false
      });
    } else {
      this.setState({
        dashboardData: responseJson?.data, errorMsg: "", loading: false
      });
    }
  }

  handleErrorResponse = (errorResponse: any) => {
    if (errorResponse === undefined) {
      this.setState({
        errorMsg: "Something went wrong", loading: false
      });
    } else {
      this.setState({
        errorMsg: errorResponse, loading: false
      });
    }
  }

  getProfile = () => {
    this.setState({ loading: true });

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getProfileDataAPiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_profile/my_profile`);

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "GET");

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getUnreadCount = () => {
    this.setState({ loading: true });

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getUnreadCountAPIId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/chats/all_unread_messages`
    );

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "GET");

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getManagerRequestList = () => {
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetManagerRequestCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/new_request`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "GET");

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getManagerRequestListResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ propertyManagerRequest: responseJson.data });
    }
  };

  handlePropertyManagerModal = () => {
    this.setState({ isPropertyManagerModalOpen: !this.state.isPropertyManagerModalOpen });
  };
  // Customizable Area End
}
