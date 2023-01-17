import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  currentTab: number;

  loading: boolean;

  notificationList: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChairmanNotificationController extends BlockComponent<Props, S, SS> {
  GetChairmanNotificationListCallId: any;
  UpdateReadStatusCallId: any;
  DeleteNotificationCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      currentTab: 0,

      loading: false,

      notificationList: [],
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
        case this.GetChairmanNotificationListCallId:
          this.setState({ loading: false }, () => {
            if (responseJson && responseJson.data) {
              this.setState({ notificationList: responseJson.data });
            }
          });
          break;
        case this.DeleteNotificationCallId:
        case this.UpdateReadStatusCallId:
          this.setState({ loading: false }, () => {
            this.getAllChairmanNotification(false);
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
    this.getAllChairmanNotification(true);
  }

  getAllChairmanNotification = (isTask: boolean) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetChairmanNotificationListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications?is_task=${isTask}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.getDataMethod);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  updateReadNotificationStatus = (id: any, isRead: boolean) => {
    this.setState({ loading: true });

    const status = {
      notification: {
        is_read: isRead,
      },
    };

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateReadStatusCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications/${id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(status));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.patchMethod);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  deleteSingleNotification = (id: any) => {
    this.setState({ loading: true });

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteNotificationCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_notifications/notifications/${id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.deleteText);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleTabChange = (event: any, newValue: number) => {
    this.setState({ currentTab: newValue });
  };
}
