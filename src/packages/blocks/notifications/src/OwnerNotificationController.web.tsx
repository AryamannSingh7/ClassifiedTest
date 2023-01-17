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

  selectedNotification: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OwnerNotificationController extends BlockComponent<Props, S, SS> {
  GetNotificationListCallId: any;
  DeleteNotificationCallId: any;

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

      selectedNotification: [],
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
            if (responseJson && responseJson.data) {
              this.setState({ notificationList: responseJson.data });
            }
          });
          break;
        case this.DeleteNotificationCallId:
          this.setState({ loading: false }, () => {
            if (responseJson) {
              this.getAllNotification();
            }
          });
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
  }

  getAllNotification = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetNotificationListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_notifications/notifications`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.getDataMethod);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
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
