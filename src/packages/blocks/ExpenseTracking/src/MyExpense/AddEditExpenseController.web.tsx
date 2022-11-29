import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../../components/src/APIErrorResponse";
import * as Yup from "yup";

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

  expenseId: string;
  expenseForm: ExpenseForm;
}

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

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddEditExpenseController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

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
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson: any = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse: any = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
  }

  async componentDidMount(): Promise<void> {
    const expense_id = this.props.navigation.getParam("id");
    this.setState({ expenseId: expense_id });
  }

  validationAddUnitFormSchema: any = Yup.object().shape({});

  validationEditUnitFormSchema: any = Yup.object().shape({});
}
