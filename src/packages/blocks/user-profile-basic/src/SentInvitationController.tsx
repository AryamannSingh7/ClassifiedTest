import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
    dataSearch: any,
    anchorEl: any,
    loading:boolean,
    allInvitation:any;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SentInvitationController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getInvitationAPICall:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
        dataSearch: "",
        anchorEl: null,
        loading:false,
        allInvitation:[]
      
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

       if (apiRequestCallId === this.getInvitationAPICall) {
        if (!responseJson.errors) {
this.setState({allInvitation:responseJson.data,loading:false})


        } else {
          //Check Error Response
          this.parseApiErrorResponse(responseJson);
        }

        this.parseApiCatchErrorResponse(errorReponse);
      }

      }

    // Customizable Area End
  }
// Customizable Area Start
  handleClose = () => {
    this.setState({anchorEl:null})
  }

  handleClick = (e: any) => {
    this.setState({anchorEl:e.currentTarget});
  }

  getInvitation = () => {

    try {
      const header = {
        token: localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getInvitationAPICall = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/member_invitations?&q=${this.state.dataSearch}`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
}
