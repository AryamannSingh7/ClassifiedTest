// Customizable Area Start
import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import MessageEnum, {getName} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  classes: any;
  history:any;
  match:any;
  location:any;
}

interface S {
  budgetReportList:any;
  status:any,
  budgetYear:"",
}

interface SS {
  id: any;
}

export default class BudgetReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBudgetData:string = ""
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    this.state = {
      budgetReportList:[],
      budgetYear:"",
      status:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getBudgetReport(this.state.status,this.state.budgetYear)
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getBudgetData === apiRequestCallId ){
        console.log("CHECK",responseJson,errorResponse)
        if(responseJson.hasOwnProperty("budget_report")){
          this.setState({
            budgetReportList:responseJson?.budget_report?.data
          })
        }
      }
    }
  }



  getBudgetReport = async (status:any,year:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getBudgetData = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_report/budget_reports?status=${status}&year=${year}`,
    });
  }

  handleYearChange = (e:any) => {
    this.setState({
      budgetYear:e.target.value
    })
    this.getBudgetReport(this.state.status,e.target.value)
  }

  handleStatusChange = (e:any) => {
    this.setState({
      status:e.target.value
    })
    this.getBudgetReport(e.target.value,this.state.budgetYear)
  }
}
// Customizable Area End