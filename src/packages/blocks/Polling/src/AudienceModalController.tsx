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
  handleClose:any;
}

interface S {
  audienceData:Array<Object>;
  selectedAudience:Array<any>;
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
      audienceData:[
        {
          id:"1",
          name:"Jhone Doe",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"2",
          name:"Fukuyo Fazutoshee",
          unitNo:"1205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"3",
          name:"Marysa Laborne",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"4",
          name:"Jhone Doe",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"5",
          name:"Jhone Doe",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"6",
          name:"Jhone Doe",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
        {
          id:"7",
          name:"Jhone Doe",
          unitNo:"205",
          floorNo:"10",
          userType:"Resident",
          selected:"false"
        },
      ],
      selectedAudience:[]
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
}

// Customizable Area End