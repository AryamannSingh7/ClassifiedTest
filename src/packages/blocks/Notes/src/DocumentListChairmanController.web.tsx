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

  docName: string;

  isAddDocumentModalOpen: boolean;
  isDeleteDocumentModalOpen: boolean;
  isAddResolutionModalOpen: boolean;
  isSelectMeetingModalOpen: boolean;
  isShareModalOpen: boolean;

  documentList: any[];

  title: string;
  file: any;

  selectedDocumentId: string;

  shareUrl: string;
  shareQuote: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DocumentListChairmanController extends BlockComponent<
  Props,
  S,
  SS
> {
  ChairmanDocumentsCallId: any;
  CreateDocumentCallId: any;
  DeleteDocumentCallId: any;

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
      docName: "",

      isAddDocumentModalOpen: false,
      isDeleteDocumentModalOpen: false,
      isAddResolutionModalOpen: false,
      isSelectMeetingModalOpen: false,
      isShareModalOpen: false,

      documentList: [],

      title: "",
      file: null,

      selectedDocumentId: "",

      shareUrl: "",
      shareQuote: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.ChairmanDocumentsCallId !== null &&
      this.ChairmanDocumentsCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.ChairmanDocumentsCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState({
          ...this.state,
          documentList: responseJson.data,
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

    // Create Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateDocumentCallId !== null &&
      this.CreateDocumentCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateDocumentCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState(
          {
            ...this.state,
            documentList: [...this.state.documentList, responseJson.data],
          },
          () => {
            this.handleAddDocumentModal();
          }
        );
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

    // Delete Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteDocumentCallId !== null &&
      this.DeleteDocumentCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteDocumentCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        const newDocumentList = this.state.documentList.filter(
          (document: any) => document.id !== responseJson.data.id
        );

        this.setState(
          {
            ...this.state,
            documentList: newDocumentList,
          },
          () => {
            this.handleDeleteDocumentModal();
          }
        );
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

  upload: any;

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const document_name = this.props.navigation.getParam("name");
    this.setState(
      {
        ...this.state,
        docName: document_name,
      },
      () => {
        if (
          document_name.toLowerCase() === "policy" ||
          document_name.toLowerCase() === "guidelines" ||
          document_name.toLowerCase() === "roles" ||
          document_name.toLowerCase() === "building-plans"
        ) {
          this.getDocuments(document_name.toLowerCase());
        } else if (document_name.toLowerCase() === "resolutions") {
          console.log("resolutions");
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

    this.ChairmanDocumentsCallId = apiRequest.messageId;

    var APIEndpoint: string = "";
    if (documentType === "policy") {
      APIEndpoint = configJSON.PolicyDocumentAPIEndPoint;
    } else if (documentType === "guidelines") {
      APIEndpoint = configJSON.GuidelinesDocumentAPIEndPoint;
    } else if (documentType === "roles") {
      APIEndpoint = configJSON.RolesDocumentAPIEndPoint;
    } else if (documentType === "building-plans") {
      APIEndpoint = configJSON.BuildingPlansDocumentAPIEndPoint;
    }

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      APIEndpoint
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

  // Create Document API
  createDocument = () => {
    var data = new FormData();
    data.append("title", this.state.title);
    data.append("images", this.state.file);

    if (this.state.docName.toLowerCase() === "policy") {
      data.append("document_type", "Policy");
    } else if (this.state.docName.toLowerCase() === "guidelines") {
      data.append("document_type", "Guideline");
    } else if (this.state.docName.toLowerCase() === "roles") {
      data.append("document_type", "Role");
    } else if (this.state.docName.toLowerCase() === "building-plans") {
      data.append("document_type", "Building_plan");
    }

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateDocumentCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CreateDocumentAPIEndPoint
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete Document API
  deleteCategory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteDocumentCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.DeleteDocumentAPIEndPoint}/${this.state.selectedDocumentId}`
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeDelete
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

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

  handleAddResolutionsModal = () => {
    this.setState({
      ...this.state,
      isAddResolutionModalOpen: !this.state.isAddResolutionModalOpen,
    });
  };

  handleSelectMeetingModal = () => {
    this.setState({
      ...this.state,
      isSelectMeetingModalOpen: !this.state.isSelectMeetingModalOpen,
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
