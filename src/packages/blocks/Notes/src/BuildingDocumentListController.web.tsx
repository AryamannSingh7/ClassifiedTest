import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
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
  isShareModalOpen: boolean;

  shareUrl: string;

  documentType: string;

  documentsList: any[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class BuildingDocumentListController extends BlockComponent<Props, S, SS> {
  DocumentsCallId: any;
  ResolutionsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isShareModalOpen: false,

      shareUrl: "",

      documentType: "",

      documentsList: [],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DocumentsCallId !== null &&
      this.DocumentsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DocumentsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          ...this.state,
          documentsList: responseJson.data,
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

    // Get Resolutions
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.ResolutionsCallId !== null &&
      this.ResolutionsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.ResolutionsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          ...this.state,
          documentsList: responseJson.resolution.data,
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
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const document_type = this.props.navigation.getParam("name");

    this.setState(
      {
        ...this.state,
        documentType: document_type,
      },
      () => {
        if (
          document_type.toLowerCase() === "policy" ||
          document_type.toLowerCase() === "guidelines" ||
          document_type.toLowerCase() === "roles" ||
          document_type.toLowerCase() === "building-plans"
        ) {
          this.getDocuments(document_type.toLowerCase());
        } else if (document_type.toLowerCase() === "resolutions") {
          this.getResolutions();
        }
      }
    );
  }

  // Get Document API
  getDocuments = (documentType: string) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DocumentsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    var APIEndpoint: string = "";
    if (documentType === "policy") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/policy_document`;
    } else if (documentType === "guidelines") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/guideline_document`;
    } else if (documentType === "roles") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/role_document`;
    } else if (documentType === "building-plans") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/building_plan_document`;
    }

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), APIEndpoint);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Resolutions API
  getResolutions = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const society_id = localStorage.getItem("society_id");
    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.ResolutionsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/resolutions`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleShareModal = () => {
    this.setState({
      ...this.state,
      isShareModalOpen: !this.state.isShareModalOpen,
    });
  };
  // Customizable Area End
}
