import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../../components/src/APIErrorResponse";

export interface IExpenseCategory {
  id: number;
  title: string;
}

interface IResponseExpenseCategoryList {
  expense_category: IExpenseCategory[];
}

interface IResponseExpenseList {
  data: IExpense[];
}

export interface IExpense {
  id: string;
  type: string;
  attributes: {
    id: number;
    expense_date: string;
    expense_amount: number;
    issue_title: string;
    expense_category_id: number;
    address: {
      currency: string;
    };
    building_management: {
      id: number;
      name: string;
    };
    apartment_management: {
      id: number;
      apartment_name: string;
    };
    resolved_by: string;
    expense_category: {
      id: number;
      title: string;
    };
    summary: string;
  };
}

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  loading: boolean;
  isFilterOpen: boolean;

  unitId: string;
  unitName: string;
  buildingName: string;

  expenseList: IExpense[];
  expenseCategoryList: IExpenseCategory[];

  categoryList: number[];
  filterCategoryList: number[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitTotalExpenseController extends BlockComponent<Props, S, SS> {
  GetAllExpenseCategoryListCallId: string = "";
  GetAllExpenseListCallId: string = "";
  GetUnitDetailsCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isFilterOpen: false,

      unitId: "",
      unitName: "",
      buildingName: "",

      expenseList: [],
      expenseCategoryList: [],

      categoryList: [],
      filterCategoryList: [],
    };
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
        // Get All Expense List - API Response
        case this.GetAllExpenseListCallId:
          this.getAllExpenseListResponse(responseJson);
          break;
        // Get All Expense Category List - API Response
        case this.GetAllExpenseCategoryListCallId:
          this.getAllExpenseCategoryListResponse(responseJson);
          break;
        // Get Unit Details - API Response
        case this.GetUnitDetailsCallId:
          if (responseJson && responseJson.data) {
            const unit = responseJson.data;
            this.setState({
              unitId: unit.id,
              unitName: unit.attributes.apartment_name,
              buildingName: unit.attributes.building_management.name,
            });
          }
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
  }

  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getAllExpenseList();
      this.getAllExpenseCategoryList();
      this.getUnitDetails();
    });
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>): Promise<void> {
    if (JSON.stringify(prevState.filterCategoryList) !== JSON.stringify(this.state.filterCategoryList)) {
      this.getAllExpenseList();
    }
  }

  getAllExpenseList = () => {
    const { filterCategoryList } = this.state;

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllExpenseListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses/unit_expense?apartment_management_id=${
        this.state.unitId
      }&expense_category_id=${filterCategoryList.length > 0 ? JSON.stringify(filterCategoryList) : ""}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getAllExpenseListResponse = (responseJson: IResponseExpenseList) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        this.setState({ expenseList: responseJson.data });
      }
    });
  };

  getUnitDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getAllExpenseCategoryList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllExpenseCategoryListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses/expense_category`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getAllExpenseCategoryListResponse = (responseJson: IResponseExpenseCategoryList) => {
    if (responseJson && responseJson.expense_category) {
      this.setState({ expenseCategoryList: responseJson.expense_category });
    }
  };

  handleChangeCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>, categotyId: number) => {
    if (e.target.checked) {
      const selectedCategoryIds = [...this.state.categoryList, categotyId];
      this.setState({ categoryList: selectedCategoryIds });
    } else {
      const newCategoryIds = this.state.categoryList.filter((id: number) => id !== categotyId);
      this.setState({ categoryList: newCategoryIds });
    }
  };

  handleApplyFilter = () => {
    if (this.state.filterCategoryList.length > 0 || this.state.categoryList.length > 0) {
      this.setState({ loading: true, filterCategoryList: this.state.categoryList }, () => {
        this.handleFilterModal();
      });
    }
  };

  handleClearFilter = () => {
    this.setState({ categoryList: [] });
  };

  handleFilterModal = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };
}
