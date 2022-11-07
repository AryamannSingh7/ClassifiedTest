import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  myUnitList: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MyUnitListController extends BlockComponent<Props, S, SS> {
  GetMyUnitListCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      myUnitList: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get My Unit List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMyUnitListCallId !== null &&
      this.GetMyUnitListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMyUnitListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ myUnitList: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
  }

  async componentDidMount(): Promise<void> {
    this.getMyUnitList();
  }

  getMyUnitList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMyUnitListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `account_block/accounts/my_apartments`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
}
