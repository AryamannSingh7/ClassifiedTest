import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

interface IExpenseDetails {
  expenseDate: string;
  expenseCost: string;
  expenseIssue: string;
  category: string;
  buildingId: string;
  buildingName: string;
  unitId: string;
  unitName: string;
  resolvedBy: string;
  summary: string;
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
  isExpenseModalOpen: boolean;

  expenseId: string;
  expenseDetails: IExpenseDetails;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ExpenseDetailController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetExpenseDetailsCallId: string = "";
  DeleteExpenseCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      isExpenseModalOpen: false,

      expenseId: "",

      expenseDetails: {
        expenseDate: "",
        expenseCost: "",
        expenseIssue: "",
        category: "",
        buildingId: "",
        buildingName: "",
        unitId: "",
        unitName: "",
        resolvedBy: "",
        summary: "",
      },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        // Get Expense Details - API Response
        case this.GetExpenseDetailsCallId:
          if (responseJson && responseJson.data) {
            const expense = responseJson.data;
            this.setState({
              expenseDetails: {
                expenseDate: expense.attributes.expense_date,
                expenseCost: expense.attributes.expense_amount,
                expenseIssue: expense.attributes.issue_title,
                category: expense.attributes.expense_category.title,
                buildingId: expense.attributes.building_management.id,
                buildingName: expense.attributes.building_management.name,
                unitId: expense.attributes.apartment_management.id,
                unitName: expense.attributes.apartment_management.apartment_name,
                resolvedBy: expense.attributes.resolved_by,
                summary: expense.attributes.summary,
              },
            });
          }
          break;
        // Delete Expense - API Response
        case this.DeleteExpenseCallId:
          this.setState({ loading: false }, () => {
            if (responseJson && responseJson.data) {
              this.handleNavigationToUnitExpenseList();
            }
          });
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
    const expense_id = this.props.navigation.getParam("id");
    this.setState({ expenseId: expense_id }, () => {
      this.getExpenseDetails();
    });
  }

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

  handleDeleteExpense = () => {
    this.setState({ loading: true }, () => {
      this.handleExpenseModal();
    });

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteExpenseCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses/${this.state.expenseId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleExpenseModal = () => {
    this.setState({ isExpenseModalOpen: !this.state.isExpenseModalOpen });
  };

  handleNavigationToUnitExpenseList = () => {
    this.props.navigation.navigate("UnitExpenseList", { id: this.state.expenseDetails.unitId });
  };

  handleNavigationToEditExpense = () => {
    this.props.navigation.navigate("EditExpense", { id: this.state.expenseId });
  };
  // Customizable Area End
}
