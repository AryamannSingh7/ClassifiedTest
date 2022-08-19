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
  documentType: string;
  documentId: string;

  document: any;

  documentTitle: string;
  documentUrl: string;
  documentDownloadUrl: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ViewBuildingDocumentController extends BlockComponent<
  Props,
  S,
  SS
> {
  GetDocumentCallId: any;
  GetResolutionCallId: any;

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
      documentType: "",
      documentId: "",

      document: null,

      documentTitle: "",
      documentUrl: "",
      documentDownloadUrl: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetDocumentCallId !== null &&
      this.GetDocumentCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetDocumentCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState({
          ...this.state,
          document: responseJson.data,
          documentTitle: responseJson.data.attributes.title,
          documentUrl: responseJson.data.attributes.images[0].url,
          documentDownloadUrl:
            responseJson.data.attributes.images[0].download_url,
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

    // Get Resolution
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetResolutionCallId !== null &&
      this.GetResolutionCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetResolutionCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.code === 200) {
        this.setState({
          ...this.state,
          document: responseJson.resolution.data,
          documentTitle: responseJson.resolution.data.attributes.title,
          documentUrl:
            responseJson.resolution.data.attributes.attachments[0].url,
          documentDownloadUrl:
            responseJson.resolution.data.attributes.attachments[0].url,
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
    const document_type = this.props.navigation.getParam("name");
    const document_id = this.props.navigation.getParam("id");
    this.setState(
      {
        ...this.state,
        documentType: document_type,
        documentId: document_id,
      },
      () => {
        if (
          document_type.toLowerCase() === "policy" ||
          document_type.toLowerCase() === "guidelines" ||
          document_type.toLowerCase() === "roles" ||
          document_type.toLowerCase() === "building-plans"
        ) {
          this.getDocument();
        } else if (document_type.toLowerCase() === "resolutions") {
          this.getResolution();
        }
      }
    );
  }

  // Get Document API
  getDocument = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetDocumentCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.GetDocumentAPIEndPoint}/${this.state.documentId}`
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

  // Get Resolution API
  getResolution = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const society_id = localStorage.getItem("society_id");
    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetResolutionCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/resolutions/${
        this.state.documentId
      }`
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
