import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
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
  docName: string;

  isAddDocumentModalOpen: boolean;
  isDeleteDocumentModalOpen: boolean;
  isAddResolutionModalOpen: boolean;
  isSelectMeetingModalOpen: boolean;
  isShareModalOpen: boolean;

  documentList: any[];
  resolutionList: any[];
  meetingsList: any[];

  title: string;
  file: any;

  selectedDocumentId: string;
  selectedMeeting: any;

  shareUrl: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DocumentListChairmanController extends BlockComponent<Props, S, SS> {
  ChairmanDocumentsCallId: any;
  CreateDocumentCallId: any;
  DeleteDocumentCallId: any;
  ResolutionsCallId: any;
  DeleteResolutionCallId: any;
  MeetingsCallId: any;
  CreateResolutionCallId: any;
  ResolutionPDFCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      docName: "",

      isAddDocumentModalOpen: false,
      isDeleteDocumentModalOpen: false,
      isAddResolutionModalOpen: false,
      isSelectMeetingModalOpen: false,
      isShareModalOpen: false,

      documentList: [],
      resolutionList: [],
      meetingsList: [],

      title: "",
      file: null,

      selectedDocumentId: "",
      selectedMeeting: null,

      shareUrl: "",
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
      this.ChairmanDocumentsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.ChairmanDocumentsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          ...this.state,
          documentList: responseJson.data,
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

    // Create Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateDocumentCallId !== null &&
      this.CreateDocumentCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateDocumentCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          ...this.state,
          documentList: [...this.state.documentList, responseJson.data],
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

    // Delete Document
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteDocumentCallId !== null &&
      this.DeleteDocumentCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteDocumentCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        const newDocumentList = this.state.documentList.filter((document: any) => document.id !== responseJson.data.id);

        this.setState({ documentList: newDocumentList });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Meetings
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.MeetingsCallId !== null &&
      this.MeetingsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.MeetingsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({
          ...this.state,
          meetingsList: responseJson.meeting.data,
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
          resolutionList: responseJson.resolution.data,
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

    // Delete Resolutions
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteResolutionCallId !== null &&
      this.DeleteResolutionCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteResolutionCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getResolutions();
      this.handleDeleteDocumentModal();

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Create Resolution
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateResolutionCallId !== null &&
      this.CreateResolutionCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateResolutionCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState(
          {
            ...this.state,
            resolutionList: [...this.state.resolutionList, responseJson.resolution.data],
          },
          () => {
            this.handleAddResolutionsModal();
          }
        );
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
          this.getMeetings();
          this.getResolutions();
        }
      }
    );
  }

  // Get Meetings API
  getMeetings = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const society_id = localStorage.getItem("society_id");
    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.MeetingsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_mins`
    );

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

  // Delete Resolution API
  deleteResolution = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const society_id = localStorage.getItem("society_id");
    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteResolutionCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/resolutions/${this.state.selectedDocumentId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Create Resolution API
  createResolution = () => {
    var data = new FormData();
    data.append("resolution[title]", this.state.title.trim());
    data.append("resolution[attachments][]", this.state.file);
    data.append("resolution[meeting_id]", this.state.selectedMeeting.id);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const society_id = localStorage.getItem("society_id");
    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateResolutionCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/resolutions`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Document API
  getDocuments = (documentType: string) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.ChairmanDocumentsCallId = apiRequest.messageId;

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

  // Create Document API
  createDocument = (values: any) => {
    var data = new FormData();
    data.append("title", values.title.trim());
    data.append("images", values.file);

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

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/building_documents`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

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

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/building_documents/${this.state.selectedDocumentId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    this.handleDeleteDocumentModal();
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

  validationAddForm = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
    file: Yup.mixed().required("Required"),
  });

  isInputOnlyWhiteSpace = (text: string) => {
    const regEx = /\S/;
    if (!regEx.test(text)) {
      return true;
    } else {
      return false;
    }
  };

  // Handle State
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
      title: "",
      file: null,
      selectedMeeting: null,
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
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen });
  };

  handleOpenShareModal = (url: string) => {
    this.setState({ shareUrl: url }, () => {
      this.handleShareModal();
    });
  };

  // Customizable Area End
}
