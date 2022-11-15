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
    anchorEl1: any
    profileData:any
    loading:boolean
    profileDetails:any
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserDetailedProfileController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getProfileDataAPiCallId:any;
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
        anchorEl1: null,
        profileData:null,
        loading:false,
        profileDetails:null
      
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
      if (apiRequestCallId === this.getProfileDataAPiCallId) {
        if (!responseJson.errors) {
          console.log(responseJson)
          //@ts-ignore
          //@ts-nocheck
         this.setState({profileDetails:responseJson,loading:false},()=>console.log(this.state.profileDetails))

        } else {
          //Check Error Response
          this.parseApiErrorResponse(responseJson);
        }

        this.parseApiCatchErrorResponse(errorReponse);
      }

      }

    // Customizable Area End
  }

  handleMoreClose = () => {
    this.setState({anchorEl:null});
  }

  handleMoreClick = (e: any) => {
    this.setState({anchorEl:e.currentTarget});
  }

  handleUnitMoreClose = () => {
    this.setState({anchorEl1:null});
  }

  handleUnitMoreClick = (e: any) => {
    this.setState({anchorEl1:e.currentTarget});
  }
  getUserProfileDetails=(id:any)=>{
    console.log(id)
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getProfileDataAPiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile/profiles/2`
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
  }
}
