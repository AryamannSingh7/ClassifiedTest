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
  open:any;
}

interface SS {
  id: any;
}

export default class CoverImageController extends BlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getVisitorListId:String = "";

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
      open:false,
      visitorListing:[],
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getVisitorList("")
  }

  getVisitorList = async (filter:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getVisitorListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors?past_visitor=true&${filter}`,
    });
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
      }
    }
  }

  doEmailLogIn(data:any): boolean {
    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget,open:true })
  };

  handleClose = (e?:any) => {
    this.setState({anchorEl:null,open:false})
    this.getVisitorList("last_one_month=true")
  };

  handle1Month = (e?:any) => {
    this.setState({anchorEl:null,open:false})
    this.getVisitorList("last_one_month=true")
  };
  handle3Month = (e?:any) => {
    this.setState({anchorEl:null,open:false})
    this.getVisitorList("last_three_month=true")
  };
  handle6Month = (e?:any) => {
    this.setState({anchorEl:null,open:false})
    this.getVisitorList("last_six_month=true")
  };
  handle12Month = (e?:any) => {
    this.setState({anchorEl:null,open:false})
    this.getVisitorList("last_twelve_month=true")
  };


}

// Customizable Area End
