// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
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
  managementFeeDetails:any;
}

interface SS {
  id: any;
}

export default class CoverImageController extends CommonApiCallForBlockComponent<
  Props,
  S,
  SS
> {

  getManagementFeeDetailsId:string
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      managementFeeDetails:{},
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getManagementFee()
  }

  getManagementFee = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getManagementFeeDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_fees_payment/management_fees`,
    });
  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getManagementFeeDetailsId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
    }
  }
}

// Customizable Area End
