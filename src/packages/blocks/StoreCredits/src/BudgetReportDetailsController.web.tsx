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
}

interface SS {
  id: any;
}

export default class BudgetReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBudgetReportDetailsId:string = "";
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
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getBudgetReportDetails()
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
