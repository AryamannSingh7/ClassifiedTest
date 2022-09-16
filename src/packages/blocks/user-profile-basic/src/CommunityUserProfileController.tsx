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
  openToolTip: boolean;
  anchorEl:any;
  popUPText:string;
  setOpen:boolean;
  invitationData:any;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class CommunityUserProfileController extends BlockComponent<
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
      openToolTip: false,
      anchorEl:null,
      popUPText:"",
      setOpen:false,
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

  handleToolTip = (event: any, text: any) => {
    this.setState({ openToolTip: !this.state.openToolTip });
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ popUPText: text });
  };

  handleOpen = () => {
    this.setState({setOpen:true});
  };

  handleClose = () => {
    this.setState({setOpen:false});
  };

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
