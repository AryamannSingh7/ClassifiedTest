import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";

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

  propertyManagerList: any[];
  requestPropertyManagerList: any[];

  sort: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PropertyManagerListController extends BlockComponent<Props, S, SS> {
  GetPropertyManagerListCallId: any;
  GetManagerRequestCallId: any;
  DeletePropertyManagerCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      propertyManagerList: [],
      requestPropertyManagerList: [],

      sort: "asc",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    let responseJson: any;
    let errorResponse: any;
    // Get Property Manager - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPropertyManagerListCallId !== null &&
      this.GetPropertyManagerListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPropertyManagerListCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ propertyManagerList: responseJson.data });
      }

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Get Property Manager Request - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetManagerRequestCallId !== null &&
      this.GetManagerRequestCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetManagerRequestCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ requestPropertyManagerList: responseJson.data });
      }

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Delete Property Manager - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeletePropertyManagerCallId !== null &&
      this.DeletePropertyManagerCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeletePropertyManagerCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        toast.success(responseJson.message);
        this.getPropertyManagerList();
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
    this.getPropertyManagerList();
    this.getManagerRequestList();
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.sort !== this.state.sort) {
      this.getPropertyManagerList();
    }
  }

  getPropertyManagerList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyManagerListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests?sort=${this.state.sort}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

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

  deletePropertyManager = (managerId: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeletePropertyManagerCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/${managerId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
  // Customizable Area End
}
