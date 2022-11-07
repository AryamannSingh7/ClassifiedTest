import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { ROLE } from "../../../framework/src/Enum";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface ComplexData {
  logo: any;
  complexName: string;
  city: string;
  aboutUs: string;
  photos: any[];
  complexArea: string;
  totalUnits: string;
  totalBuilding: number;
  buildingList: any[];
  sharedAreaList: any[];
  lat: string;
  long: string;
}
interface S {
  // Customizable Area Start
  complexDetails: any;
  complexData: ComplexData;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OwnerComplexController extends BlockComponent<Props, S, SS> {
  GetDocumentCountCallId: any;
  GetComplexDetailsCallId: any;
  GetBuildingListCallId: any;
  EditComplexDetailCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      // Customizable Area Start
      complexDetails: null,
      complexData: {
        logo: null,
        complexName: "",
        city: "",
        aboutUs: "",
        photos: [],
        complexArea: "",
        totalUnits: "",
        totalBuilding: 0,
        buildingList: [],
        sharedAreaList: [],
        lat: "",
        long: "",
      },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    // Get Complex Details API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetComplexDetailsCallId !== null &&
      this.GetComplexDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetComplexDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          complexDetails: responseJson.data,
          complexData: {
            ...this.state.complexData,
            logo: responseJson.data.attributes.logo && responseJson.data.attributes.logo.url,
            complexName: responseJson.data.attributes.name,
            city: responseJson.data.attributes.city,
            aboutUs: responseJson.data.attributes.description,
            photos: responseJson.data.attributes.photos,
            complexArea: responseJson.data.attributes.complex_area,
            totalUnits: responseJson.data.attributes.total_units && responseJson.data.attributes.total_units[0],
            totalBuilding: responseJson.data.attributes.total_buildings,
            buildingList: responseJson.data.attributes.building_list,
            sharedAreaList: responseJson.data.attributes.shared_area,
            lat: responseJson.data.attributes.lat,
            long: responseJson.data.attributes.long,
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
  slider: any;

  async componentDidMount(): Promise<void> {
    this.getComplexDetails();
  }

  // Get Complex Details API
  getComplexDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetComplexDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/society_managements/${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleGotoDashboard = () => {
    const userType = localStorage.getItem("userType");
    if (userType === ROLE.OWNER || userType === ROLE.PROPERTY_MANAGER) {
      this.props.navigation.navigate("OwnerDashboard");
    } else {
      this.props.navigation.navigate("ResidentDashboard");
    }
  };
  // Customizable Area End
}
