import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../../components/src/APIErrorResponse";
import { ICityWiseRentedEmpty } from "../../../../framework/src/Interfaces/IExpenseReport.web";
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
  rentedUnit: string;
  emptyUnit: string;

  cityWiseRentedVsEmpty: ICityWiseRentedEmpty[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RentedVsEmptyController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  RentVsEmptyCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      rentedUnit: "",
      emptyUnit: "",

      cityWiseRentedVsEmpty: [],
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
        case this.RentVsEmptyCallId:
          if (responseJson && responseJson.data) {
            const rentVsEmpty = responseJson.data.attributes.rented_vs_empty_unit;
            const cityWiseData = responseJson.data.attributes.city_wise_rented_vs_empty_unit;
            this.setState({
              rentedUnit: rentVsEmpty ? rentVsEmpty.rented : "N/A",
              emptyUnit: rentVsEmpty ? rentVsEmpty.empty : "N/A",
              cityWiseRentedVsEmpty: cityWiseData,
            });
          }
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
    this.getRentVsEmptyData();
  }

  getRentVsEmptyData = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.RentVsEmptyCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/rented_empty_unit`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
  // Customizable Area End
}
