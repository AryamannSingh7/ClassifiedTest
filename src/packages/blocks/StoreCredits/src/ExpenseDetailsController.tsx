// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  match:any;
  location:any; 
}

interface S {
  loading: boolean;
  sortBy:any;
  expenseDetails:any;
  expenseId:any;
}

interface SS {
  id: any;
}

export default class VisitorDetailsController extends CommonApiCallForBlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  labelTitle: string = "";
  expenseDetailsId:string = "";
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      loading:false,
      sortBy : "" ,
      expenseDetails:{},
      expenseId:""
    };
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getExpenseDetails()
  }

  getExpenseDetails = async () => {
    const societyExpnseID = localStorage.getItem("society_id")
    const expenseId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({expenseId:expenseId})
    this.expenseDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyExpnseID}/bx_block_report/expence_reports/${expenseId}`,
    });
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.expenseDetailsId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            expenseDetails:responseJson.data.attributes
          })
        }else{
          window.history.back()
        }
      }
    }
  }

  manageExpenseDetailsDownload = (name:any) => {
    const societyID = localStorage.getItem("society_id")
    const expenseId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.downloadPdf(`/society_managements/${societyID}/bx_block_report/expence_reports/${expenseId}/expence_download_pdf`,`ExpenseAttachment-${name}.pdf`)
  }
}

// Customizable Area End
