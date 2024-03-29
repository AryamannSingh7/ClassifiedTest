import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
// Customizable Area End

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

  buildingList: any[];
  filterBuilding: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DashboardActionsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetAllBuildingListCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      buildingList: [],
      filterBuilding: "",
    };
    // Customizable Area End
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
        case this.GetAllBuildingListCallId:
          this.handleBuildingListResponse(responseJson);
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
  // Building List
  getAllBuildingList = async () => {
    this.GetAllBuildingListCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_settings/building_managements`,
    });
  };

  handleBuildingListResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ buildingList: responseJson.data });
    }
  };
  // Customizable Area End
}
