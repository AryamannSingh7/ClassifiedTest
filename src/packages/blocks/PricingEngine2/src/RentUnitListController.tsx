// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
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
  UnitListing: any;
}

interface SS {
  id: any;
}

export default class CoverImageController extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: string = "";
  labelTitle: string = "";
  getVisitorListId: string = "";
  getRentUnitListId: string = "";

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
      UnitListing: [],
    };

    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getRentUnitList();
  }


  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      console.log("ERROR",errorReponse)
      if (this.getRentUnitListId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            UnitListing:responseJson.data
          })
        }
      }
    }
  }

  getRentUnitList = async () => {
    const {id} = this.props.match.params
    console.log("BuildingID",id)
    this.getRentUnitListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/apartments/${id}`,
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
