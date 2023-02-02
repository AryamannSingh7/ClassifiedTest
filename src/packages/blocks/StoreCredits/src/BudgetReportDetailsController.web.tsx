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
  history:any;
  match:any;
}

interface S {
  ApproveModal: boolean;
  setOpen:boolean;
  rejectReason:any;
  RejectReasonError:any;
  isRejectReportModalOpen: boolean;
  isApproveReportModalOpen: boolean;
  budgetDetails:any;
  showSuccess:boolean;
  successMessage:any;
}

interface SS {
  id: any;
}

export default class BudgetReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBudgetReportDetailsId:string = "";
  approveBudgetReportId:string = "";
  getDownloadFilesId:string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      ApproveModal: false,
      setOpen:false,
      rejectReason:"",
      RejectReasonError:"",
      isRejectReportModalOpen: false,
      isApproveReportModalOpen: false,
      budgetDetails:{},
      showSuccess:false,
      successMessage:"",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getBudgetReportDetails()
  }

  manageDownloadFile = async () => {
    const societyID = localStorage.getItem("society_id")
    const {id} = this.props.match.params
    await this.downloadPdf(`/society_managements/${societyID}/bx_block_report/budget_reports/${id}/download_report.pdf`,"BudgetReport.pdf")
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getBudgetReportDetailsId === apiRequestCallId ){
        console.log("CHECK",responseJson,errorResponse)
        if(responseJson.hasOwnProperty("budget_report")){
          this.setState({
            budgetDetails:responseJson?.budget_report?.data?.attributes
          })
        }
      }
      if(this.approveBudgetReportId === apiRequestCallId) {
        this.bugetReportVerifyResponse(responseJson)
      }
    }
  }

  bugetReportVerifyResponse = (responseJson:any) => {
    if(responseJson.message === "Budget Report Successfully verified"){
      this.getBudgetReportDetails()
      if(this.state.rejectReason){
        this.setState({
          setOpen:false,
          showSuccess:true,
          successMessage:"Budget Rejected Successfully!",
        })
      }else{
        this.setState({
          ApproveModal:false,
          showSuccess:true,
          successMessage:"Budget Approved Successfully!"
        })
      }
    }
  }

  getBudgetReportDetails = async () => {
    const societyID = localStorage.getItem("society_id")
    const {id} = this.props.match.params
    this.getBudgetReportDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_report/budget_reports/${id}`,
    });
  }

  manageBudgetApproval = () => {
    const data = {
      status:true
    }
    this.ApproveBudgetReport(data)
  }

  handleRejectBudget = () => {
    if(this.state.rejectReason){
      const data = {
        status:0,
        note:this.state.rejectReason
      }
      this.ApproveBudgetReport(data)
    }else{
      this.setState({
        RejectReasonError:"Please enter reason for reject this budget"
      })
    }
  }

  ApproveBudgetReport = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    const {id} = this.props.match.params
    this.approveBudgetReportId = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `/society_managements/${societyID}/bx_block_report/budget_reports/${id}/verify_budget`,
      body:JSON.stringify(data)
    });
  }

    handleRejectReportModal = () => {
      this.setState({
        isRejectReportModalOpen: !this.state.isRejectReportModalOpen,
      });
    };

  handleApproveReportModal = () => {
    this.setState({
      isApproveReportModalOpen: !this.state.isApproveReportModalOpen,
    });
  };
}
// Customizable Area End
