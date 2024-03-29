// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  classes: any;
}

interface S {
  budgetReportCount:any;
  expenseReportCount:any;
  invitationReportCount:any;
  managementFeeCount:any;
}

interface SS {
  id: any;
}

export default class ReportDashboardController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBudgetDataId:string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      budgetReportCount:0,
      expenseReportCount:0,
      invitationReportCount:0,
      managementFeeCount:0,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getBudgetReport()
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getBudgetDataId === apiRequestCallId ){
          this.setState({
            budgetReportCount:responseJson?.budget_report_count || 0,
            expenseReportCount:responseJson?.expence_report_count || 0,
            invitationReportCount:responseJson?.invitaion_report_count || 0,
            managementFeeCount:responseJson?.management_fee_report_count || 0,
          })
      }
    }
  }

  getBudgetReport = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getBudgetDataId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_report/budget_reports/budget_report_list_count`,
    });
  }
}
// Customizable Area End