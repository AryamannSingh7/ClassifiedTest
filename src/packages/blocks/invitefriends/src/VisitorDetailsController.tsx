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
  visitorDetails:any;
  deleteConfirmModal:boolean;
  visitorId:any;
}

interface SS {
  id: any;
}

export default class VisitorDetailsController extends BlockComponent<
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
      visitorDetails:{
          id:"",
          name:"",
          profilePic:"",
          time:"",
          date:"",
          building:"",
          phoneNo:""
        },
      deleteConfirmModal:false,
      visitorId:""
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this)
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this)

  }

  async componentDidMount() {
    this.getVisitorDetails()
    console.log("EDIT ?",this.props.match.params.type)
  }

  getVisitorDetails = async () => {
    const societyID = localStorage.getItem("society_id")
    const visitorId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({visitorId:visitorId})
    this.visitorDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/${visitorId}`,
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
        if(responseJson.hasOwnProperty("visitor")){
          this.setState({
            visitorDetails:responseJson.visitor.data.attributes
          })
        }else{
          window.history.back()
        }
      }
    }
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    // console.log("Called 1",data);

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
        header
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
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
