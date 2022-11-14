import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  isDeleteOpen: boolean;
  selectedRentHistory: any[];

  unitId: string;

  rentHistory: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RentHistoryController extends BlockComponent<Props, S, SS> {
  GetRentHistoryCallId: any;
  DeleteRentHistoriesCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      unitId: "",

      rentHistory: [],

      isDeleteOpen: false,
      selectedRentHistory: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetRentHistoryCallId !== null &&
      this.GetRentHistoryCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetRentHistoryCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ rentHistory: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Delete Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteRentHistoriesCallId !== null &&
      this.DeleteRentHistoriesCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteRentHistoriesCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson) {
        toast.success(responseJson.message);
        this.setState({ isDeleteOpen: false, selectedRentHistory: [] }, () => {
          this.getRentHistory();
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

  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getRentHistory();
    });
  }

  getRentHistory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetRentHistoryCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/rent_histories?apartment_management_id=${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  deleteRentHistories = () => {
    const body = {
      ids: this.state.selectedRentHistory,
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteRentHistoriesCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/rent_histories/delete_all`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  selectAllHistory = () => {
    const idList = this.state.rentHistory.map((history: any) => history.id);
    this.setState({ selectedRentHistory: idList });
  };
}
