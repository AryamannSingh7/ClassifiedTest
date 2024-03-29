// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {RouteComponentProps} from "react-router-dom"
export const configJSON = require("./config");

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
  history: any;
  match: any;
  location: any;
}

interface S {
  anchorEl: any;
  anchorEl_1: any;
  loading: boolean;
  sortBy: any;
  status: any;
  BuildingListing: any;
}

interface SS {
  id: any;
}

export default class CoverImageController extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getVisitorListId: string = "";
  getRentBuildingListId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      anchorEl: null,
      anchorEl_1: null,
      loading: false,
      sortBy: "",
      status: "",
      BuildingListing: [],
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getRentBuildingList();
  }


  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (this.getRentBuildingListId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            BuildingListing:responseJson.data
          })
        }
      }
    }
  }

  getRentBuildingList = async () => {
    this.getRentBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/buildings`,
    });
  };



  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;

    const token = localStorage.getItem("userToken");

    const header = {
      "Content-Type": contentType,
      token,
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), endPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    body && requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
}

// Customizable Area End
