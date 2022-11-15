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
  loading: boolean;
  isDeleteUnitModalOpen: boolean;

  unitId: string;

  myUnitList: any[];

  filter: {
    unitType: string;
    status: string;
  };
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MyUnitListController extends BlockComponent<Props, S, SS> {
  GetMyUnitListCallId: any;
  DeLinkUnitCallId: any;
  DeleteRequestUnitCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isDeleteUnitModalOpen: false,

      unitId: "",

      myUnitList: [],

      filter: {
        unitType: "",
        status: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get My Unit List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMyUnitListCallId !== null &&
      this.GetMyUnitListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMyUnitListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        this.setState({ myUnitList: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // DeLink Unit - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeLinkUnitCallId !== null &&
      this.DeLinkUnitCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeLinkUnitCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        if (responseJson && responseJson.code === 200) {
          toast.success(responseJson.message);
          this.getMyUnitList();
        }
      });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Delete Request Unit - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteRequestUnitCallId !== null &&
      this.DeleteRequestUnitCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteRequestUnitCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        if (responseJson && responseJson.code === 200) {
          toast.success(responseJson.message);
          this.getMyUnitList();
        }
      });

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
    this.getMyUnitList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.filter.status !== this.state.filter.status ||
      prevState.filter.unitType !== this.state.filter.unitType
    ) {
      await this.getMyUnitList();
    }
  }

  getMyUnitList = () => {
    const { unitType, status } = this.state.filter;

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMyUnitListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/my_apartment?status=${status}&unit_type=${unitType}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleOpenDeleteUnitModal = (unit: any) => {
    this.setState({ isDeleteUnitModalOpen: !this.state.isDeleteUnitModalOpen, unitId: unit });
  };

  handleCloseDeleteUnitModal = () => {
    this.setState({ isDeleteUnitModalOpen: !this.state.isDeleteUnitModalOpen });
  };

  deLinkUnitFromOwner = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeLinkUnitCallId = apiRequest.messageId;

    const owner_id = localStorage.getItem("userId");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/delink_user?apartment_management_id=${this.state.unitId}&account_id=${owner_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  deleteRequestUnit = (unit: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteRequestUnitCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/requests/${unit}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
}
