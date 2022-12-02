import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

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
  loading: boolean;

  requestList: any[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PropertyManagerRequestController extends BlockComponent<Props, S, SS> {
  GetManagerRequestCallId: any;
  EditManagerRequestCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      requestList: [],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    let responseJson: any;
    let errorResponse: any;

    // Get Request Manager List  - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetManagerRequestCallId !== null &&
      this.GetManagerRequestCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetManagerRequestCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ requestList: responseJson.data });
      }

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Status Update - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditManagerRequestCallId !== null &&
      this.EditManagerRequestCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditManagerRequestCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        this.getManagerRequestList();
      });

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    } else {
      ApiErrorResponse(responseJson);
    }
    ApiCatchErrorResponse(errorResponse);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getManagerRequestList();
  }

  getManagerRequestList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetManagerRequestCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/new_request`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  updateManagerRequest = (requestId: any, status: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditManagerRequestCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/update_request?id=${requestId}&status=${status}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  validationText = (name: any) => {
    if (name) {
      return name;
    }
    return "N/A";
  };
  // Customizable Area End
}
