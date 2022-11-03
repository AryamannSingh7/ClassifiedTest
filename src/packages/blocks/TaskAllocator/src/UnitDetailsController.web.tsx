import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface UnitData {
  lat: string;
  long: string;
  country: string;
  region: string;
  city: string;
  complex: string;
  building: string;
  unit: string;
  floor: string;
  size: string;
  config: string;
  purchasePrice: string;
  purchaseDate: string;
  valuation: string;
  photos: any[];
}

interface RentData {
  status: string;
  tenantName: string;
  duration: string;
  expiry: string;
  change: string;
}

interface S {
  unitId: string;

  unitDetails: UnitData;
  rentDetails: RentData;

  rentHistory: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitDetailsController extends BlockComponent<Props, S, SS> {
  GetMyUnitDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      unitId: "",

      unitDetails: {
        lat: "",
        long: "",
        country: "",
        region: "",
        city: "",
        complex: "",
        building: "",
        unit: "",
        floor: "",
        size: "",
        config: "",
        purchasePrice: "",
        purchaseDate: "",
        valuation: "",
        photos: [],
      },
      rentDetails: {
        status: "",
        tenantName: "",
        duration: "",
        expiry: "",
        change: "",
      },

      rentHistory: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get Unit Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMyUnitDetailsCallId !== null &&
      this.GetMyUnitDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMyUnitDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        const unit = responseJson.data;

        this.setState({
          unitDetails: {
            lat: unit.attributes.lat,
            long: unit.attributes.long,
            country: unit.attributes.country,
            region: unit.attributes.region,
            city: unit.attributes.city,
            complex: unit.attributes.society_management.name,
            building: unit.attributes.building_management.name,
            unit: unit.attributes.apartment_name,
            floor: unit.attributes.floor_number,
            size: unit.attributes.size,
            config: unit.attributes.configuration,
            purchasePrice: unit.attributes.purchase_price,
            purchaseDate: unit.attributes.purchase_date,
            valuation: unit.attributes.current_valuation,
            photos: unit.attributes.photos,
          },

          rentHistory: unit.attributes.rent_history,
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
  }

  slider: any;

  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getMyUnitDetails();
    });
  }

  getMyUnitDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMyUnitDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
}
