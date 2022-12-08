import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

interface ExpenseForm {
  expenseDate: string;
  expenseAmount: string;
  issueTitle: string;
  category: string;
  building: string;
  unit: string;
  resolvedBy: string;
  summary: string;
}

export interface IExpenseCategory {
  id: number;
  title: string;
}

export interface IResponseExpenseCategory {
  expense_category: IExpenseCategory[];
}

interface IResponseBuilding {
  buildings: IBuilding[];
}

interface IResponseUnit {
  apartments: IUnit[];
}

export interface IBuilding {
  id: number;
  name: string;
}

export interface IUnit {
  id: number;
  apartment_name: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  t: (label: string) => string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  isComingFromMainPage: boolean;

  expenseId: string;
  expenseForm: ExpenseForm;

  expenseCategoryList: IExpenseCategory[];
  buildingList: IBuilding[];
  unitList: IUnit[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddEditExpenseController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetAllExpenseCategoryListCallId: string = "";
  GetBuildingListCallId: string = "";
  GetUnitListCallId: string = "";
  AddExpenseCallId: string = "";
  GetExpenseDetailsCallId: string = "";
  EditExpenseCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      isComingFromMainPage: false,

      expenseId: "",
      expenseForm: {
        expenseDate: "",
        expenseAmount: "",
        issueTitle: "",
        category: "",
        building: "",
        unit: "",
        resolvedBy: "",
        summary: "",
      },

      expenseCategoryList: [],
      buildingList: [],
      unitList: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const data = message.getData(getName(MessageEnum.AddExpenseDataMessage));
      const { isMainPage, unitId, buildingId } = data;

      this.setState(
        {
          isComingFromMainPage: isMainPage,
          expenseForm: {
            ...this.state.expenseForm,
            building: buildingId,
            unit: unitId,
          },
        },
        () => {
          this.getBuildingList();
          this.getUnitList(buildingId);
        }
      );
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        // Get All Expense Category List - API Response
        case this.GetAllExpenseCategoryListCallId:
          this.getAllExpenseCategoryListResponse(responseJson);
          break;
        // Get Building List - API Response
        case this.GetBuildingListCallId:
          this.handleBuildingListResponse(responseJson);
          break;
        // Get Unit List - API Response
        case this.GetUnitListCallId:
          this.handleUnitListResponse(responseJson);
          break;
        // Add Expense - API Response
        case this.AddExpenseCallId:
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("AddExpenseSuccess");
          });
          break;
        // Edit Expense - API Response
        case this.EditExpenseCallId:
          this.setState({ loading: false }, () => {
            this.props.navigation.navigate("ExpenseDetail", { id: this.state.expenseId });
          });
          break;
        // Get Expense Detail - API Response
        case this.GetExpenseDetailsCallId:
          if (responseJson && responseJson.data) {
            const expense = responseJson.data;
            this.setState(
              {
                expenseForm: {
                  expenseDate: expense.attributes.expense_date,
                  expenseAmount: expense.attributes.expense_amount,
                  issueTitle: expense.attributes.issue_title,
                  category: expense.attributes.expense_category.id,
                  building: expense.attributes.building_management.id,
                  unit: expense.attributes.apartment_management.id,
                  resolvedBy: expense.attributes.resolved_by,
                  summary: expense.attributes.summary,
                },
              },
              () => {
                this.getUnitList(this.state.expenseForm.building);
              }
            );
          }
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
    const expense_id = this.props.navigation.getParam("id");
    this.setState({ expenseId: expense_id }, () => {
      if (this.state.expenseId) {
        this.getExpenseDetails();
      }
      this.getAllExpenseCategoryList();
      this.getBuildingList();
    });
  }

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

  getAllExpenseCategoryListResponse = (responseJson: IResponseExpenseCategory) => {
    if (responseJson && responseJson.expense_category) {
      this.setState({ expenseCategoryList: responseJson.expense_category });
    }
  };

  getBuildingList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/find_building`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleBuildingListResponse = (responseJson: IResponseBuilding) => {
    if (responseJson && responseJson.buildings) {
      this.setState({ buildingList: responseJson.buildings });
    }
  };

  getUnitList = (building: string) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/find_unit?building_management_id=${building}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleUnitListResponse = (responseJson: IResponseUnit) => {
    if (responseJson && responseJson.apartments) {
      this.setState({ unitList: responseJson.apartments });
    }
  };

  getExpenseDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetExpenseDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses/${this.state.expenseId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  validationExpenseFormSchema = Yup.object().shape({
    expenseDate: Yup.string().required("Required").matches(/\S/, "Required"),
    expenseAmount: Yup.string().required("Required").matches(/\S/, "Required"),
    issueTitle: Yup.string().required("Required").matches(/\S/, "Required"),
    category: Yup.string().required("Required").matches(/\S/, "Required"),
    building: Yup.string().required("Required").matches(/\S/, "Required"),
    unit: Yup.string().required("Required").matches(/\S/, "Required"),
    resolvedBy: Yup.string().required("Required").matches(/\S/, "Required"),
    summary: Yup.string().required("Required").matches(/\S/, "Required"),
  });

  handleAddExpenseForm = (values: ExpenseForm) => {
    const society_id = localStorage.getItem("society_id");
    const body = {
      expense: {
        expense_date: values.expenseDate,
        expense_amount: values.expenseAmount,
        issue_title: values.issueTitle,
        expense_category_id: values.category,
        building_management_id: values.building,
        apartment_management_id: values.unit,
        resolved_by: values.resolvedBy,
        summary: values.summary,
        society_management_id: society_id,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.AddExpenseCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_expensetracking/expenses`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleEditExpenseForm = (values: ExpenseForm) => {
    const body = {
      expense: {
        expense_date: values.expenseDate,
        expense_amount: values.expenseAmount,
        issue_title: values.issueTitle,
        expense_category_id: values.category,
        building_management_id: values.building,
        apartment_management_id: values.unit,
        resolved_by: values.resolvedBy,
        summary: values.summary,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditExpenseCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses/${this.state.expenseId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleNavigationBack = () => {
    if (this.state.expenseId) {
      this.props.navigation.navigate("ExpenseDetail", { id: this.state.expenseId });
    } else if (this.state.isComingFromMainPage) {
      this.props.navigation.navigate("MyExpenseList");
    } else if (!this.state.isComingFromMainPage) {
      this.props.navigation.navigate("UnitExpenseList", { id: this.state.expenseForm.unit });
    } else {
      this.props.navigation.navigate("MyExpenseList");
    }
  };

  handleSubmitExpenseForm = (values: ExpenseForm, resetForm: () => void) => {
    this.setState({ loading: true }, () => {
      if (this.state.expenseId) {
        this.handleEditExpenseForm(values);
      } else {
        this.handleAddExpenseForm(values);
        resetForm();
      }
    });
  };

  handleNavigationBackSuccessPage = () => {
    this.props.navigation.navigate("MyExpenseList");
  };
  // Customizable Area End
}
