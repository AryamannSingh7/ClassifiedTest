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
  documentType: string;

  isAddDocumentModalOpen: boolean;
  isDeleteDocumentModalOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;

  selectedDocumentId: string;

  title: string;
  file: any;

  documentsList: any[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PersonalDocumentListController extends BlockComponent<Props, S, SS> {
  DocumentsCallId: any;
  DeleteDocumentCallId: any;
  CreateDocumentCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      documentType: "",

      isAddDocumentModalOpen: false,
      isDeleteDocumentModalOpen: false,
      isShareModalOpen: false,

      shareUrl: "",

      selectedDocumentId: "",

      title: "",
      file: null,

      documentsList: [],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Documents
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

    //  Delete Personal Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteDocumentCallId !== null &&
      this.DeleteDocumentCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteDocumentCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        const newDocumentList = this.state.documentsList.filter(
          (document: any) => document.id !== responseJson.data.id
        );

        this.setState({
          documentsList: newDocumentList,
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

    // Create Personal Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateDocumentCallId !== null &&
      this.CreateDocumentCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateDocumentCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          documentsList: [...this.state.documentsList, responseJson.data],
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

  upload: any;

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const document_name = this.props.navigation.getParam("name");
    this.setState({ documentType: document_name.toLowerCase() }, () => {
      this.getDocuments();
    });
  }

  // Get Documents API
  getDocuments = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DocumentsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    var APIEndpoint: string = "";
    if (this.state.documentType === "rent-contract") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/rent_contracts`;
    } else if (this.state.documentType === "unit-plan") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/unit_plans`;
    } else if (this.state.documentType === "other-documents") {
      APIEndpoint = `society_managements/${society_id}/bx_block_my_document/other_documents`;
    }

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), APIEndpoint);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete Personal Document API
  deletePersonalDocument = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteDocumentCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/personal_documents/${this.state.selectedDocumentId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);

    this.handleDeleteDocumentModal();
    return true;
  };

  // Create Personal Document API
  createPersonalDocument = () => {
    var data = new FormData();
    data.append("title", this.state.title.trim());
    data.append("images", this.state.file);

    if (this.state.documentType === "rent-contract") {
      data.append("document_type", "Rent_contract");
    } else if (this.state.documentType === "unit-plan") {
      data.append("document_type", "Unit_plan");
    } else if (this.state.documentType === "other-documents") {
      data.append("document_type", "Other_document");
    }

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateDocumentCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/personal_documents`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);

    this.handleAddDocumentModal();
    return true;
  };

  isInputOnlyWhiteSpace = (text: string) => {
    const regEx = /\S/;
    if (!regEx.test(text)) {
      return true;
    } else {
      return false;
    }
  };

  // Handle State
  onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];

    this.setState({
      ...this.state,
      file: file,
    });
  };

  handleAddDocumentModal = () => {
    this.setState({
      ...this.state,
      title: "",
      file: null,
      isAddDocumentModalOpen: !this.state.isAddDocumentModalOpen,
    });
  };

  handleDeleteDocumentModal = () => {
    this.setState({
      ...this.state,
      isDeleteDocumentModalOpen: !this.state.isDeleteDocumentModalOpen,
    });
  };

  handleShareModal = () => {
    this.setState({
      ...this.state,
      isShareModalOpen: !this.state.isShareModalOpen,
    });
  };
  // Customizable Area End
}
