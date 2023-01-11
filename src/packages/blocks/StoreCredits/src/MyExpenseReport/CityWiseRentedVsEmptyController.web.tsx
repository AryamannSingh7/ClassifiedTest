import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("../config");

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
  cityName: string;

  unitDataByCity: any[];

  filter: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CityWiseRentedVsEmptyController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  UnitDataByCityCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      // Customizable Area Start
      loading: false,
      cityName: "",

      unitDataByCity: [],

      filter: "All",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.UnitDataByCityCallId:
          this.setState({ loading: false }, () => {
            if (responseJson && responseJson.data) {
              this.setState({ unitDataByCity: responseJson.data });
            }
          });
          break;
        case "":
          break;
        default:
          break;
      }

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
    const city_name = this.props.navigation.getParam("id");
    this.setState({ cityName: city_name }, () => {
      this.getUnitDataByCity();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filter !== this.state.filter) {
      await this.getUnitDataByCity();
    }
  }

  getUnitDataByCity = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UnitDataByCityCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/city_wise_unit?city=${this.state.cityName}&type=${
        this.state.filter === "All" ? "" : this.state.filter
      }`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
  // Customizable Area End
}
