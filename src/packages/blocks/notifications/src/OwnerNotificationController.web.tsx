import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";
import { ROLE } from "../../../framework/src/Enum";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  loading: boolean;

  isDeleteNotificationModalOpen: boolean;
  isDeleteOpen: boolean;

  notificationList: any[];
  notificationTypeList: any[];

  selectedNotification: any[];

  filterType: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OwnerNotificationController extends BlockComponent<Props, S, SS> {
  GetNotificationListCallId: any;
  DeleteNotificationCallId: any;
  GetNotificationTypeCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      isDeleteNotificationModalOpen: false,
      isDeleteOpen: false,

      notificationList: [],
      notificationTypeList: [],

      selectedNotification: [],

      filterType: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.GetNotificationListCallId:
          this.setState({ loading: false }, () => {
            this.handleGetAllNotificationResponse(responseJson);
          });
          break;
        case this.DeleteNotificationCallId:
          this.setState({ loading: false }, () => {
            this.getAllNotification();
          });
          break;
        case this.GetNotificationTypeCallId:
          this.handleGetNotificationTypeResponse(responseJson);
          break;
        default:
          break;
      }
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  async componentDidMount(): Promise<void> {
    this.getAllNotification();
    this.getNotificationType();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filterType !== this.state.filterType) {
      await this.getAllNotification();
    }
  }

  getAllNotification = () => {
    const { filterType } = this.state;

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetNotificationListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications?notification_type=${filterType}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.getDataMethod);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetAllNotificationResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ notificationList: responseJson.data });
    }
  };

  deleteNotification = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteNotificationCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications/multiple_delete_notification?notification_ids[]=${this.state.selectedNotification.toString()}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.deleteText);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getNotificationType = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetNotificationTypeCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications/notification_type`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.getDataMethod);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetNotificationTypeResponse = (responseJson: any) => {
    if (responseJson && responseJson.notification_type) {
      this.setState({ notificationTypeList: responseJson.notification_type });
    }
  };

  handleDeleteNotificationModal = () => {
    this.setState({ isDeleteNotificationModalOpen: !this.state.isDeleteNotificationModalOpen });
  };

  handleNavigationBack = () => {
    if (localStorage.getItem("userType") == ROLE.OWNER) {
      this.props.navigation.navigate("OwnerDashboard");
    } else {
      this.props.navigation.navigate("ResidentDashboard");
    }
  };
}
