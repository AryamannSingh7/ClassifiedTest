// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
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
  visitorListing:any;
  deleteConfirmModal:boolean;
  deleteVisitor:any;
}

interface SS {
  id: any;
}

export default class ScheduledVisitorController extends BlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getVisitorListId:string = "";
  deleteVisitorId:string = "";
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
      visitorListing:[],
      deleteConfirmModal:false,
      deleteVisitor:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this)
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this)

  }

  async componentDidMount() {
    this.getVisitorList()
  }

  handleCloseDeleteModal() {
    this.setState({
      deleteConfirmModal:false
    })
  }

  manageDeleteVisitor = () => {
    this.deleteVisitor(this.state.deleteVisitor)
  }

  handleOpenDeleteModal(id:any) {
    this.setState({
      deleteConfirmModal:true,
      deleteVisitor:id
    })
  }


  getVisitorList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getVisitorListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors?scheduled_visitor=true`,
    });
  }

  deleteVisitor = async  (id:any) => {
    const societyID = localStorage.getItem("society_id")
    this.deleteVisitorId = await this.apiCall({
      contentType:"application/json",
      method: "DELETE",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/${id}`,
    });
  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getVisitorListId === apiRequestCallId ){
        if(responseJson.hasOwnProperty("visitors")){
          this.setState({
            visitorListing:responseJson.visitors.data,
          })
        }else{
          this.setState({
            visitorListing:[]
          })
        }
      }else{
        if(this.deleteVisitorId === apiRequestCallId){
          console.log("Data",responseJson)
          if(responseJson.message === "Successfully deleted"){
            this.setState({
              deleteConfirmModal:false,
            })
          }
          this.getVisitorList()
        }
      }
    }
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;

    const token = localStorage.getItem('userToken') ;

    const header = {
      "Content-Type": contentType,
      token
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
    body && requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // console.log("Called",requestMessage);
    return requestMessage.messageId;
  };


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
