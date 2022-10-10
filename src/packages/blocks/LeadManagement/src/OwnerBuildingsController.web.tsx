import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface BuildingData {
  buildingName: string;
  city: string;
  country: string;
  logo: string;
  photos: any[];
  aboutBuilding: string;
  buildingArea: string;
  totalFloor: string;
  totalUnit: string;
  sharedAreaList: any[];
  lat: string;
  long: string;
}

interface S {
  // Customizable Area Start
  buildingId: string;
  buildingData: BuildingData;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OwnerBuildingsController extends BlockComponent<Props, S, SS> {
  GetBuildingDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      buildingId: "",
      buildingData: {
        buildingName: "",
        city: "",
        country: "",
        logo: "",
        photos: [],
        aboutBuilding: "",
        buildingArea: "",
        totalFloor: "",
        totalUnit: "",
        sharedAreaList: [],
        lat: "",
        long: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    // Get Building Details API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetBuildingDetailsCallId !== null &&
      this.GetBuildingDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetBuildingDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          buildingData: {
            buildingName: responseJson.data.attributes.name,
            city: responseJson.data.attributes.city,
            country: responseJson.data.attributes.country,
            logo: responseJson.data.attributes.logo && responseJson.data.attributes.logo.url,
            photos: responseJson.data.attributes.photos,
            aboutBuilding: responseJson.data.attributes.description,
            buildingArea: responseJson.data.attributes.building_area,
            totalFloor: responseJson.data.attributes.total_floors,
            totalUnit: responseJson.data.attributes.total_units,
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

  async componentDidMount(): Promise<void> {
    const building_id = this.props.navigation.getParam("id");
    this.setState({ buildingId: building_id }, () => {
      this.getBuildingDetail();
    });
  }

  // Get Building Details API
  getBuildingDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/building_managements/${this.state.buildingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  slider: any;

  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };
  // Customizable Area End
}
