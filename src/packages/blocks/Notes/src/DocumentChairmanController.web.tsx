import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

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
  policy: number;
  guidelines: number;
  roles: number;
  resolution: number;
  buildingPlans: number;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DocumentChairmanController extends BlockComponent<
  Props,
  S,
  SS
> {
  GetDocumentCountCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
    ];

    this.state = {
      policy: 0,
      guidelines: 0,
      roles: 0,
      resolution: 0,
      buildingPlans: 0,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Document Count
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetDocumentCountCallId !== null &&
      this.GetDocumentCountCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetDocumentCountCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState({
          ...this.state,
          policy: responseJson.data.policy_count,
          guidelines: responseJson.data.guideline_count,
          roles: responseJson.data.role_count,
          resolution: responseJson.data.resolution_count,
          buildingPlans: responseJson.data.building_plan_count,
        });
      }

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorReponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getDocumentCount();
  }

  getDocumentCount = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetDocumentCountCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetDocumentCountAPIEndPoint
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
  // Customizable Area End
}
