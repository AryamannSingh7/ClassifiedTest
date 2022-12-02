import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

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

  propertyId: string;
  propertyDetails: PropertyDetails;

  // Customizable Area End
}

interface PropertyDetails {
  managerName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  buildingName: string;
  unitName: string;
  lat: string;
  long: string;
}

interface SS {
  id: any;
}

export default class RequestPropertyManagerDetailsController extends BlockComponent<Props, S, SS> {
  GetPropertyManagerDetailsCallId: any;
  GetComplexDetailsCallId: any;
  EditPropertyCallId: any;
  EditManagerRequestCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      propertyId: "",

      propertyDetails: {
        managerName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        buildingName: "",
        unitName: "",
        lat: "",
        long: "",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    let responseJson: any;
    let errorResponse: any;
    // Get Property Manager Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPropertyManagerDetailsCallId !== null &&
      this.GetPropertyManagerDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPropertyManagerDetailsCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        const property = responseJson.data;
        this.setState({
          propertyDetails: {
            managerName: property.attributes.property_manager.name,
            companyName: property.attributes.property_manager.company_name,
            phoneNumber: property.attributes.property_manager.mobile_number,
            email: property.attributes.property_manager.email,
            buildingName: property.attributes.building_management.name,
            unitName: property.attributes.apartment_management.data.attributes.apartment_name,
            lat: property.attributes.apartment_management.data.attributes.lat,
            long: property.attributes.apartment_management.data.attributes.long,
          },
        });
      }

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Status Update - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditManagerRequestCallId !== null &&
      this.EditManagerRequestCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditManagerRequestCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        this.props.navigation.navigate("PropertyManagerRequest");
      });

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    if (responseJson && responseJson.meta && responseJson.meta.token) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    } else {
      ApiErrorResponse(responseJson);
    }
    ApiCatchErrorResponse(errorResponse);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const property_id = this.props.navigation.getParam("id");
    this.setState({ propertyId: property_id }, () => {
      this.getPropertyDetails();
    });
  }

  getPropertyDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyManagerDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/new_request_show?id=${this.state.propertyId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  updateManagerRequest = (status: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditManagerRequestCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/update_request?id=${this.state.propertyId}&status=${status}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  validationText = (name: any) => {
    if (name) {
      return name;
    }
    return "-";
  };
  // Customizable Area End
}
