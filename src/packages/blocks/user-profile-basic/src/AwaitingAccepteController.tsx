import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import * as Yup from 'yup';

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
  setAcceptOpen:any;
  anchorEl1:any;
  setRequestOpen:boolean;
  setDeleteRequest:boolean;
  invitationData:any;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class AwaitingAccepteController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
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
      setAcceptOpen:"",
      anchorEl1:null,
      setRequestOpen:false,
      setDeleteRequest:false,
      invitationData:""
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

      }

    // Customizable Area End
  }

  // More Button click

  handleMoreClose = () => {
    this.setState({anchorEl1:null});
  }

  handleMoreClick = (e: any) => {
    this.setState({anchorEl1:e.currentTarget});
  }

  // Resend Request popup

  handleResendRequest = () => {
    this.setState({setRequestOpen:true})
    this.setState({anchorEl1:null});
  }

  handleRequestClose = () => {
    this.setState({setRequestOpen:false})
  }

  // Delete Invitation Request popup

  handleDeleteRequestOpen = () => {
    this.setState({setDeleteRequest:true})
    this.setState({anchorEl1:null});
  }

  handleDeleteRequestClose = () => {
    this.setState({setDeleteRequest:false})
  }

  InvitationSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .strict(true)
        .lowercase(`Please enter all values in lowercase`)
        .trim()
        .required(`This field is required.`),
      usertype: Yup.string().required(`This field is required`),
      fullname: Yup.string().required(`This field is required`),
      phoneno: Yup.string().required(`This field is required`),
      building: Yup.string().required(`This field is required`),
      unit: Yup.string().required(`This field is required`),
    });
    return validations
  }

  invitationData = (values: any) => {
    this.setState({invitationData:values})
  }
}
