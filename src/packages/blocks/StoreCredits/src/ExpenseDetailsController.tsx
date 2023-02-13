// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";
// import {toast} from "react-toastify";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  match:any;
  location:any; 
}

interface S {
  anchorEl :any ;
  anchorEl_1 :any ;
  loading: boolean;
  sortBy:any;
  status:any;
  expenseDetails:any;
  deleteConfirmModal:boolean;
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
  emailReg: RegExp;
  labelTitle: string = "";
  visitorDetailsId:string = "";
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      anchorEl:null,
      anchorEl_1:null,
      loading:false,
      sortBy : "" ,
      status:"",
      expenseDetails:{},
      deleteConfirmModal:false,
      expenseId:""
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this)
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this)

  }

  async componentDidMount() {
    this.getExpenseDetails()
  }

  getExpenseDetails = async () => {
    const societyID = localStorage.getItem("society_id")
    const expenseId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({expenseId:expenseId})
    this.visitorDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_report/expence_reports/${expenseId}`,
    });
  }

  handleCloseDeleteModal() {
    this.setState({
      deleteConfirmModal:false
    })
  }

  handleOpenDeleteModal() {
    this.setState({
      deleteConfirmModal:true
    })
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.visitorDetailsId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            expenseDetails:responseJson.data.attributes
          })
        }else{
          // window.history.back()
        }
      }
    }
  }

  manageExpenseDetailsDownload = (path:any,name:any) => {
    this.downloadPdf(`${path}`,`ExpenseAttachment-${name}.pdf`)
  }


  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };

  handleClose = (e?:any, v?:any) => {
    let sortBy : any ;
    console.log("v=========>",v)
    if(v === undefined || v === null){
      sortBy =this.state.sortBy
    }
    else {
      sortBy =v;
    }
    this.setState({anchorEl:null,sortBy : sortBy})
  };

  handleClick_1 = (event:any) => {
    this.setState({anchorEl_1:event.currentTarget})
  };

  handleClose_1 = (e?:any, v?:any) => {
    let status : any ;
    if(v === undefined || v === null){
      status =this.state.status;
    }
    else {
      status =v;
    }
    this.setState({anchorEl_1:null ,status :status})
  };
}

// Customizable Area End
