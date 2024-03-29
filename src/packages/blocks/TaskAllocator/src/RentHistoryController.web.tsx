import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
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
  isRentHistoryModalOpen: boolean;

  isDeleteOpen: boolean;
  selectedRentHistory: any[];

  unitId: string;

  rentHistory: any[];
  rentHistoryForm: RentHistoryForm;

  currency: string;
}

interface RentHistoryForm {
  startDate: string;
  endDate: string;
  rentAmount: string;
  receivedAmount: string;
  tenantName: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RentHistoryController extends BlockComponent<Props, S, SS> {
  GetRentHistoryCallId: any;
  DeleteRentHistoriesCallId: any;
  CreateRentHistoryCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isRentHistoryModalOpen: false,

      unitId: "",

      rentHistory: [],

      isDeleteOpen: false,
      selectedRentHistory: [],

      rentHistoryForm: {
        startDate: "",
        endDate: "",
        rentAmount: "",
        receivedAmount: "",
        tenantName: "",
      },

      currency: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    let responseJson: any;
    let errorResponse: any;
    // Get Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetRentHistoryCallId !== null &&
      this.GetRentHistoryCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetRentHistoryCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getRentHistoryResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Delete Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteRentHistoriesCallId !== null &&
      this.DeleteRentHistoriesCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteRentHistoriesCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.deleteRentHistoriesResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Create Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateRentHistoryCallId !== null &&
      this.CreateRentHistoryCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateRentHistoryCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.addRentHistoryResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    if (responseJson && responseJson.meta && responseJson.meta.token) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    } else {
      ApiErrorResponse(responseJson);
    }
    ApiCatchErrorResponse(errorResponse);
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

  getRentHistoryResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ rentHistory: responseJson.data }, () => {
        if (this.state.rentHistory.length !== 0) {
          const firstRentHistory = this.state.rentHistory[0];
          this.setState({
            currency: firstRentHistory.attributes.currency ? firstRentHistory.attributes.currency.currency : "",
          });
        }
      });
    }
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

  deleteRentHistoriesResponse = (responseJson: any) => {
    if (responseJson) {
      toast.success(responseJson.message);
      this.setState({ isDeleteOpen: false, selectedRentHistory: [] }, () => {
        this.getRentHistory();
      });
    }
  };

  addRentHistory = (values: any) => {
    let data = new FormData();
    data.append("rent_history[apartment_management_id]", this.state.unitId);
    data.append("rent_history[start_date]", values.startDate);
    data.append("rent_history[end_date]", values.endDate);
    data.append("rent_history[rent_amount]", values.rentAmount);
    data.append("rent_history[tenant_name]", values.tenantName);
    data.append("rent_history[received_amount]", values.receivedAmount);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateRentHistoryCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_settings/rent_histories`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  addRentHistoryResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        toast.success("Rent History Created Successfully");
        this.getRentHistory();
      } else if (responseJson && responseJson.message) {
        toast.error(responseJson.message);
      }
    });
  };

  validationRentHistoryFormSchema: any = Yup.object().shape({
    startDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    rentAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    receivedAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    tenantName: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
  });

  selectAllHistory = () => {
    const idList = this.state.rentHistory.map((history: any) => history.id);
    this.setState({ selectedRentHistory: idList });
  };

  handleRentHistoryModal = () => {
    this.setState({
      isRentHistoryModalOpen: !this.state.isRentHistoryModalOpen,
    });
  };

  validationText = (name: any) => {
    if (name) {
      return name;
    }
    return "-";
  };
}
