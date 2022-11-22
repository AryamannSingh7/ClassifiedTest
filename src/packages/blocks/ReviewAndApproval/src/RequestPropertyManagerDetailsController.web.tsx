import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;

  propertyManagerId: string;
  propertyManagerDetails: PropertyManagerDetails;

  // Customizable Area End
}

interface PropertyManagerDetails {
  managerName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  IdType: string;
  IdNumber: string;
  IdDate: string;
  IdPdfDocument: string;
  propertyList: any[];
}

interface SS {
  id: any;
}

export default class RequestPropertyManagerDetailsController extends BlockComponent<Props, S, SS> {
  GetPropertyManagerDetailsCallId: any;
  GetComplexDetailsCallId: any;
  EditPropertyCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      propertyManagerId: "",

      propertyManagerDetails: {
        managerName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        IdType: "",
        IdNumber: "",
        IdDate: "",
        IdPdfDocument: "",
        propertyList: [],
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Property Manager Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPropertyManagerDetailsCallId !== null &&
      this.GetPropertyManagerDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPropertyManagerDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      console.log(responseJson.data);
      if (responseJson && responseJson.data) {
        const manager = responseJson.data;
        this.setState({
          propertyManagerDetails: {
            managerName: manager.attributes.name,
            companyName: manager.attributes.company_name,
            phoneNumber: manager.attributes.mobile_number,
            email: manager.attributes.email,
            IdType: manager.attributes.id_proof.name,
            IdNumber: manager.attributes.id_number,
            IdDate: manager.attributes.id_expiration_date,
            IdPdfDocument: manager.attributes.image.url,
            propertyList: manager.attributes.properties.data,
          },
        });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const manager_id = this.props.navigation.getParam("id");
    this.setState({ propertyManagerId: manager_id }, () => {
      this.getPropertyManagerDetails();
    });
  }

  getPropertyManagerDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyManagerDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/${this.state.propertyManagerId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
  // Customizable Area End
}
