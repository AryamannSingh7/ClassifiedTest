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
  expanded: string | boolean;

  isAddQuestionModalOpen: boolean;
  isEditQuestionModalOpen: boolean;
  isAddCategoryModalOpen: boolean;
  isDeleteAllCategoryModalOpen: boolean;
  isDeleteQuestionModalOpen: boolean;

  faqList: any[];
  catagoriesList: any[];

  selectedCategoryId: string;
  selectedCategoryName: string;

  categoryName: string;

  selectedFaqId: string;

  editCategoryId: string;
  editQuestion: string;
  editAnswer: string;

  createCategoryId: string;
  createQuestion: string;
  createAnswer: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FaqChairmanController extends BlockComponent<
  Props,
  S,
  SS
> {
  FaqCategoryCallId: any;
  CreateFaqCategoryCallId: any;
  DeleteFaqCategoryCallId: any;
  EditFaqCallId: any;
  DeleteFaqCallId: any;
  CreateFaqCallId: any;
  CategoryByIdCallId: any;

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
      expanded: "",

      isAddQuestionModalOpen: false,
      isEditQuestionModalOpen: false,
      isAddCategoryModalOpen: false,
      isDeleteAllCategoryModalOpen: false,
      isDeleteQuestionModalOpen: false,

      faqList: [],
      catagoriesList: [],

      selectedCategoryId: "",
      selectedCategoryName: "",

      categoryName: "",

      selectedFaqId: "",

      editCategoryId: "",
      editQuestion: "",
      editAnswer: "",

      createCategoryId: "",
      createQuestion: "",
      createAnswer: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get FAQ Category
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.FaqCategoryCallId !== null &&
      this.FaqCategoryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.FaqCategoryCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState({
          ...this.state,
          catagoriesList: responseJson.data,
          selectedCategoryId:
            responseJson.data.length > 0 ? responseJson.data[0].id : "",
          selectedCategoryName:
            responseJson.data.length > 0
              ? responseJson.data[0].attributes.name
              : "",
          faqList:
            responseJson.data.length > 0
              ? responseJson.data[0].attributes.FAQ
              : [],
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

    // Create Category
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateFaqCategoryCallId !== null &&
      this.CreateFaqCategoryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateFaqCategoryCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState(
          {
            ...this.state,
            catagoriesList: [...this.state.catagoriesList, responseJson.data],
            selectedCategoryId: responseJson.data.id,
            selectedCategoryName: responseJson.data.attributes.name,
            faqList: responseJson.data.attributes.FAQ,
            categoryName: "",
          },
          () => {
            this.handleAddCategoryModal();
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

    // Delete Category
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteFaqCategoryCallId !== null &&
      this.DeleteFaqCategoryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteFaqCategoryCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.getFaqCategory();
      this.handleDeleteAllCategoryModal();

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

    // Edit Faq
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditFaqCallId !== null &&
      this.EditFaqCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditFaqCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson) {
        this.setState(
          {
            ...this.state,
            editCategoryId: "",
            editQuestion: "",
            editAnswer: "",
          },
          () => {
            this.getCategoryByCategoryId();
            this.handleEditQuestionModal();
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

    // Delete Faq
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteFaqCallId !== null &&
      this.DeleteFaqCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteFaqCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson) {
        this.getCategoryByCategoryId();
        this.handleDeleteQuestionModal();
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

    // Create Faq
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateFaqCallId !== null &&
      this.CreateFaqCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateFaqCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        this.setState(
          {
            ...this.state,
            createCategoryId: "",
            createQuestion: "",
            createAnswer: "",
          },
          () => {
            this.getCategoryByCategoryId();
            this.handleAddQuestionModal();
          }
        );
        // this.getFaqCategory();
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

    // Get Category Id
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CategoryByIdCallId !== null &&
      this.CategoryByIdCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CategoryByIdCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson.data) {
        const data = this.state.catagoriesList.map((category: any) =>
          category.id === responseJson.data.id ? responseJson.data : category
        );

        this.setState({
          ...this.state,
          catagoriesList: data,
          faqList: responseJson.data.attributes.FAQ,
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
    this.getFaqCategory();
  }

  // Get FAQ Category API
  getFaqCategory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.FaqCategoryCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.FaqCategoryAPIEndPoint
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

  // Create FAQ Category API
  createCategory = () => {
    const body = {
      data: {
        attributes: {
          name: this.state.categoryName,
          society_id: localStorage.getItem("society_id"),
        },
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateFaqCategoryCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CreateFaqCategoryAPIEndPoint
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete FAQ Category API
  deleteCategory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteFaqCategoryCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.DeleteFaqCategoryAPIEndPoint}/${
        this.state.selectedCategoryId
      }`
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

  // Edit FAQ API
  editFaq = () => {
    const body = {
      data: {
        attributes: {
          title: this.state.editQuestion,
          content: this.state.editAnswer,
          interactive_faq_category_id: this.state.editCategoryId,
        },
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditFaqCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.EditFaqAPIEndPoint}/${this.state.selectedFaqId}`
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete FAQ API
  deleteFaq = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteFaqCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.DeleteFaqAPIEndPoint}/${this.state.selectedFaqId}`
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

  // Create FAQ API
  createFaq = () => {
    const body = {
      data: {
        attributes: {
          title: this.state.createQuestion,
          content: this.state.createAnswer,
          interactive_faq_category_id: this.state.createCategoryId,
        },
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateFaqCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CreateFaqAPIEndPoint
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    apiRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Category Id API
  getCategoryByCategoryId = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CategoryByIdCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CategoryByIdAPIEndPoint}/${this.state.selectedCategoryId}`
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

  // State Handle Function
  selectEditFaq = (faq: any) => {
    this.setState(
      {
        ...this.state,
        selectedFaqId: faq.id,
        editCategoryId: faq.interactive_faq_category_id,
        editQuestion: faq.title,
        editAnswer: faq.content,
      },
      () => {
        this.handleEditQuestionModal();
      }
    );
  };

  selectDeleteFaq = (faq: any) => {
    this.setState(
      {
        ...this.state,
        selectedFaqId: faq.id,
      },
      () => {
        this.handleDeleteQuestionModal();
      }
    );
  };

  handleChange = (panel: string) => () => {
    this.setState({
      ...this.state,
      expanded: panel.toString(),
    });
  };

  handleAddQuestionModal = () => {
    this.setState({
      ...this.state,
      isAddQuestionModalOpen: !this.state.isAddQuestionModalOpen,
    });
  };

  handleEditQuestionModal = () => {
    this.setState({
      ...this.state,
      isEditQuestionModalOpen: !this.state.isEditQuestionModalOpen,
    });
  };

  handleAddCategoryModal = () => {
    this.setState({
      ...this.state,
      isAddCategoryModalOpen: !this.state.isAddCategoryModalOpen,
    });
  };

  handleDeleteAllCategoryModal = () => {
    this.setState({
      ...this.state,
      isDeleteAllCategoryModalOpen: !this.state.isDeleteAllCategoryModalOpen,
    });
  };

  handleDeleteQuestionModal = () => {
    this.setState({
      ...this.state,
      isDeleteQuestionModalOpen: !this.state.isDeleteQuestionModalOpen,
    });
  };

  // Customizable Area End
}
