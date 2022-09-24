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
      visitorListing:[
        {
          id:"1",
          name:"Sean K. Wilt",
          profilePic:"https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
          time:"10-03-2022, 16:30",
        },
        {
          id:"4",
          name:"Yusaf Khan",
          profilePic:"https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
          time:"12-03-2022, 14:30",
        },
        {
          id:"3",
          name:"Sean K. Wilt",
          profilePic:"https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
          time:"10-03-2022, 16:30",
        },
        {
          id:"2",
          name:"Yusaf Khan",
          profilePic:"https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
          time:"12-03-2022, 14:30",
        },
      ],
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {

  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
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
  };

}

// Customizable Area End
