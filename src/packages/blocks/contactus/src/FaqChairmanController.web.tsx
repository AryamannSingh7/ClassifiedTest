import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
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
  dashboardTypeList: any[];

  selectedCategoryId: string;
  selectedCategoryName: string;

  categoryName: string;
  dashboardType: string;

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

export default class FaqChairmanController extends BlockComponent<Props, S, SS> {
  FaqCategoryCallId: any;
  CreateFaqCategoryCallId: any;
  DeleteFaqCategoryCallId: any;
  EditFaqCallId: any;
  DeleteFaqCallId: any;
  CreateFaqCallId: any;
  CategoryByIdCallId: any;
  GetDashboardTypeCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      expanded: "",

      isAddQuestionModalOpen: false,
      isEditQuestionModalOpen: false,
      isAddCategoryModalOpen: false,
      isDeleteAllCategoryModalOpen: false,
      isDeleteQuestionModalOpen: false,

      faqList: [],
      catagoriesList: [],
      dashboardTypeList: [],

      selectedCategoryId: "",
      selectedCategoryName: "",

      categoryName: "",
      dashboardType: "",

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
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.FaqCategoryCallId:
          this.handleGetFaqCategoryResponse(responseJson);
          break;
        case this.CreateFaqCategoryCallId:
          this.handleCreateCategoryResponse(responseJson);
          break;
        case this.DeleteFaqCategoryCallId:
          this.getFaqCategory();
          this.handleDeleteAllCategoryModal();
          break;
        case this.EditFaqCallId:
          this.handleEditFaqResponse(responseJson);
          break;
        case this.DeleteFaqCallId:
          this.handleDeleteFaqResponse(responseJson);
          break;
        case this.CreateFaqCallId:
          this.handleCreateFaqResponse(responseJson);
          break;
        case this.CategoryByIdCallId:
          this.handleGetCategoryByIdResponse(responseJson);
          break;
        case this.GetDashboardTypeCallId:
          this.handleGetDashboardTypeResponse(responseJson);
          break;
        default:
          break;
      }

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
    this.getFaqCategory();
    this.getDashboardType();
  }

  // Get FAQ Category API
  getFaqCategory = async () => {
    const society_id = localStorage.getItem("society_id");
    const dashboard_type = localStorage.getItem("userType");

    this.FaqCategoryCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faq_categories?dashboard_type=${dashboard_type}`,
    });
  };

  handleGetFaqCategoryResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({
        ...this.state,
        catagoriesList: responseJson.data,
        selectedCategoryId: responseJson.data.length > 0 ? responseJson.data[0].id : "",
        selectedCategoryName: responseJson.data.length > 0 ? responseJson.data[0].attributes.name : "",
        faqList: responseJson.data.length > 0 ? responseJson.data[0].attributes.FAQ : [],
      });
    }
  };

  // Create FAQ Category API
  createCategory = async () => {
    const body = {
      data: {
        attributes: {
          name: this.state.categoryName,
          society_id: localStorage.getItem("society_id"),
          dashboard_type: this.state.dashboardType,
        },
      },
    };
    const society_id = localStorage.getItem("society_id");

    this.CreateFaqCategoryCallId = await apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faq_categories`,
      body: JSON.stringify(body),
    });
  };

  handleCreateCategoryResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState(
        {
          catagoriesList: [...this.state.catagoriesList, responseJson.data],
          selectedCategoryId: responseJson.data.id,
          selectedCategoryName: responseJson.data.attributes.name,
          faqList: responseJson.data.attributes.FAQ,
        },
        () => {
          this.handleAddCategoryModal();
        }
      );
    }
  };

  // Delete FAQ Category API
  deleteCategory = async () => {
    const society_id = localStorage.getItem("society_id");

    this.DeleteFaqCategoryCallId = await apiCall({
      contentType: "application/json",
      method: "DELETE",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faq_categories/${
        this.state.selectedCategoryId
      }`,
    });
  };

  // Edit FAQ API
  editFaq = async () => {
    const body = {
      data: {
        attributes: {
          title: this.state.editQuestion,
          content: this.state.editAnswer,
          interactive_faq_category_id: this.state.editCategoryId,
        },
      },
    };
    const society_id = localStorage.getItem("society_id");

    this.EditFaqCallId = await apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faqs/${
        this.state.selectedFaqId
      }`,
      body: JSON.stringify(body),
    });
  };

  handleEditFaqResponse = (responseJson: any) => {
    if (responseJson) {
      this.setState(
        {
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
  };

  // Delete FAQ API
  deleteFaq = async () => {
    const society_id = localStorage.getItem("society_id");

    this.DeleteFaqCallId = await apiCall({
      contentType: "application/json",
      method: "DELETE",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faqs/${
        this.state.selectedFaqId
      }`,
    });
  };

  handleDeleteFaqResponse = (responseJson: any) => {
    if (responseJson) {
      this.getCategoryByCategoryId();
      this.handleDeleteQuestionModal();
    }
  };

  // Create FAQ API
  createFaq = async () => {
    const body = {
      data: {
        attributes: {
          title: this.state.createQuestion,
          content: this.state.createAnswer,
          interactive_faq_category_id: this.state.createCategoryId,
        },
      },
    };
    const society_id = localStorage.getItem("society_id");

    this.CreateFaqCallId = await apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faqs`,
      body: JSON.stringify(body),
    });
  };

  handleCreateFaqResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ ...this.state }, () => {
        this.getCategoryByCategoryId();
        this.handleAddQuestionModal();
      });
    }
  };

  // Get Category Id API
  getCategoryByCategoryId = async () => {
    const society_id = localStorage.getItem("society_id");

    this.CategoryByIdCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/interactive_faq_categories/${
        this.state.selectedCategoryId
      }`,
    });
  };

  handleGetCategoryByIdResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const data = this.state.catagoriesList.map((category: any) =>
        category.id === responseJson.data.id ? responseJson.data : category
      );

      this.setState({
        catagoriesList: data,
        faqList: responseJson.data.attributes.FAQ,
      });
    }
  };

  // Get Dashboard Type
  getDashboardType = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetDashboardTypeCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${society_id}/bx_block_interactive_faqs/list_dashbord`,
    });
  };

  handleGetDashboardTypeResponse = (responseJson: any) => {
    if (responseJson && responseJson.dashbords) {
      this.setState({ dashboardTypeList: responseJson.dashbords });
    }
  };

  // State Handle Function
  selectEditFaq = (faq: any) => {
    this.setState(
      {
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
    this.setState({ selectedFaqId: faq.id }, () => {
      this.handleDeleteQuestionModal();
    });
  };

  handleChange = (panel: string) => () => {
    this.setState({
      expanded: panel.toString(),
    });
  };

  handleAddQuestionModal = () => {
    this.setState({
      createQuestion: "",
      createAnswer: "",
      isAddQuestionModalOpen: !this.state.isAddQuestionModalOpen,
    });
  };

  handleEditQuestionModal = () => {
    this.setState({
      isEditQuestionModalOpen: !this.state.isEditQuestionModalOpen,
    });
  };

  handleAddCategoryModal = () => {
    this.setState({
      categoryName: "",
      dashboardType: "",
      isAddCategoryModalOpen: !this.state.isAddCategoryModalOpen,
    });
  };

  handleDeleteAllCategoryModal = () => {
    this.setState({
      isDeleteAllCategoryModalOpen: !this.state.isDeleteAllCategoryModalOpen,
    });
  };

  handleDeleteQuestionModal = () => {
    this.setState({
      isDeleteQuestionModalOpen: !this.state.isDeleteQuestionModalOpen,
    });
  };
  // Customizable Area End
}
