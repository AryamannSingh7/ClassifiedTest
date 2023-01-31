// Customizable Area Start
import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import MessageEnum, {getName} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";
const {baseURL} = require("../../../framework/src/config")
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
  searchName:any;
}

interface SS {
  id: any;
}

export default class BudgetReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBudgetData:string = "";
  getDownloadFileId:string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    this.state = {
      budgetReportList:[],
      budgetYear:"",
      status:"",
      searchName:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getBudgetReport(this.state.status,this.state.budgetYear,this.state.searchName)
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getBudgetData === apiRequestCallId ){
        if(responseJson.hasOwnProperty("budget_report")){
          this.setState({
            budgetReportList:responseJson?.budget_report?.data
          })
        }else{
          this.setState({
            budgetReportList:[]
          })
        }
      }
    }
  }

  manageSearch = (e:any) => {
    this.setState({searchName:e.target.value})
    this.getBudgetReport(this.state.status,this.state.budgetYear,e.target.value)
  }

  manageDownload = async (id:any) => {
    const societyID = localStorage.getItem("society_id")
    await this.downloadPdf(`/society_managements/${societyID}/bx_block_report/budget_reports/${id}/download_report.pdf`,"BudgetReport.pdf")
  }

  getBudgetReport = async (status:any,year:any,search:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getBudgetData = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_report/budget_reports?status=${status}&year=${year}&search=${search}`,
    });
  }

  handleYearChange = (e:any) => {
    this.setState({
      budgetYear:e.target.value
    })
  }

  handleStatusChange = (e:any) => {
    this.setState({
      status:e.target.value
    })
  }
}
// Customizable Area End