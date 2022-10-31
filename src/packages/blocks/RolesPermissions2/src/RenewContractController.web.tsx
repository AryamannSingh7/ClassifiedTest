import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import moment from "moment";
import * as Yup from "yup";
import toast from "react-hot-toast";
// Customizable Area Start
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
  isRenewContractModalOpen: boolean;

  contractId: string;

  currencyList: any;

  contractData: ContractData;
  renewForm: RenewForm;
  // Customizable Area End
}

interface SS {
  id: any;
}

interface RenewForm {
  duration: string;
  endDate: string;
  startDate: string;
  monthlyRent: string;
  currency: string;
}

interface ContractData {
  tenantName: string;
  complexName: string;
  buildingName: string;
  unitName: string;
}

export default class RenewContractController extends BlockComponent<Props, S, SS> {
  GetContractsDetailsCallId: any;
  GetCurrencyListCallId: any;
  RenewContractCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isRenewContractModalOpen: false,

      contractId: "",

      currencyList: [],

      contractData: {
        tenantName: "",
        complexName: "",
        buildingName: "",
        unitName: "",
      },

      renewForm: {
        duration: "",
        endDate: "",
        startDate: "",
        monthlyRent: "",
        currency: "",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get Contract Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetContractsDetailsCallId !== null &&
      this.GetContractsDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetContractsDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        const contract = responseJson.contract.data;

        this.setState({
          contractData: {
            tenantName: contract.attributes.tenant_name,
            complexName: contract.attributes.society_management.name,
            buildingName: contract.attributes.building_name,
            unitName: contract.attributes.unit_name,
          },
          renewForm: {
            duration: contract.attributes.agreement_duration || "",
            endDate: contract.attributes.expires_on || "",
            startDate: contract.attributes.start_date || "",
            monthlyRent: contract.attributes.rent_amount || "",
            currency: contract.attributes.currency || "",
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

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetCurrencyListCallId !== null &&
      this.GetCurrencyListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetCurrencyListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ currencyList: responseJson.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Renew Contract - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.RenewContractCallId !== null &&
      this.RenewContractCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.RenewContractCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        toast.success(responseJson.message);
        this.props.navigation.navigate("ContractDetail", { id: this.state.contractId });
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
  async componentDidMount(): Promise<void> {
    const contract_id = this.props.navigation.getParam("id");
    this.setState({ contractId: contract_id }, () => {
      this.getContractDetails();
      this.getCurrencyList();
    });
  }

  RenewFormValidation: any = Yup.object().shape({
    duration: Yup.string()
      .required("Required")
      .max(100, "Maximum length should be 100 character")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    currency: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    monthlyRent: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Enter only number"),
  });

  // Get Contract Details - API
  getContractDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetContractsDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/${this.state.contractId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Currency List - API
  getCurrencyList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetCurrencyListCallId = apiRequest.messageId;

    // const society_id = localStorage.getItem("society_id");
    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_posts/classifieds/currency_list`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleRenewContract = () => {
    const body = {
      contract: {
        agreement_duration: this.state.renewForm.duration,
        rent_amount: this.state.renewForm.monthlyRent,
        currency: this.state.renewForm.currency,
        expires_on: this.state.renewForm.endDate,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.RenewContractCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/${this.state.contractId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleRenewContractModal = () => {
    this.setState({ isRenewContractModalOpen: !this.state.isRenewContractModalOpen });
  };
  // Customizable Area End
}
