import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface LeaseForm {
  tenantName: string;
  landlordName: string;
  complexName: any;
  buildingName: string;
  unitName: string;
  buildingId: string;
  unitId: string;
  duration: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  currency: string;
}

interface S {
  // Customizable Area Start
  currencyList: any[];
  buildingList: any[];
  unitList: any[];

  templateId: string;
  leaseForm: LeaseForm;

  tenant: any;
  contract: any;

  isPenaltyCountModalOpen: boolean;
  isPenaltyRentModalOpen: boolean;
  isPenaltyAmountModalOpen: boolean;
  isConditionModalOpen: boolean;

  changedTemplate: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LeaseFormController extends BlockComponent<Props, S, SS> {
  GetCurrencyListCallId: any;
  GetBuildingListCallId: any;
  GetUnitListCallId: any;
  IsContractExistCallId: any;
  GetTemplateTextCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      currencyList: [],
      buildingList: [],
      unitList: [],

      templateId: "",

      tenant: null,
      contract: null,

      leaseForm: {
        tenantName: "",
        landlordName: "",
        complexName: localStorage.getItem("society_id"),
        buildingName: "",
        unitName: "",
        buildingId: "",
        unitId: "",
        duration: "",
        startDate: "",
        endDate: "",
        monthlyRent: "",
        currency: "",
      },

      isPenaltyCountModalOpen: false,
      isPenaltyRentModalOpen: false,
      isPenaltyAmountModalOpen: false,
      isConditionModalOpen: false,

      changedTemplate: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Get Building - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetBuildingListCallId !== null &&
      this.GetBuildingListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetBuildingListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.buildings) {
        this.setState({ buildingList: responseJson.buildings });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Units - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUnitListCallId !== null &&
      this.GetUnitListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUnitListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.apartments) {
        this.setState({ unitList: responseJson.apartments });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Currency List - API
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

    // Find Unit Contract Exist - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.IsContractExistCallId !== null &&
      this.IsContractExistCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.IsContractExistCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ tenant: responseJson.account, contract: responseJson.contract.data });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Template - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTemplateTextCallId !== null &&
      this.GetTemplateTextCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTemplateTextCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      const contract = JSON.parse(window.sessionStorage.getItem("contractForm") as any);
      console.log(contract);

      // this.setState({ tenant: responseJson.account, contract: responseJson.contract.data });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
  }

  // Customizable Area Start
  // Get Building - API
  getBuilding = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/find_building`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Units - API
  getUnits = (building: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/find_unit?building_management_id=${building}`
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

  // Find Unit Contract Exist - API
  handleCheckContractExist = (unit: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.IsContractExistCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/find_tenant?apartment_management_id=${unit}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Template - API
  getTemplateText = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTemplateTextCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contract/lease_templates/${this.state.templateId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  goBackPage = () => {
    this.props.navigation.goBack();
  };

  ContractFormValidation: any = Yup.object().shape({
    tenantName: Yup.string()
      .required("Required")
      .max(100, "Maximum length should be 100 character")
      .matches(/\S/, "Required"),
    landlordName: Yup.string()
      .required("Required")
      .max(100, "Maximum length should be 100 character")
      .matches(/\S/, "Required"),
    buildingId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unitId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .when("buildingId", (buildingId: any, schema: any) => {
        return schema.test({
          test: (unitId: any) => {
            if (unitId) {
              return !this.state.contract;
            }
            return true;
          },
          message: "Already contract available for this unit.",
        });
      }),
    duration: Yup.string()
      .required("Required")
      .max(100, "Maximum length should be 100 character")
      .matches(/\S/, "Required"),
    startDate: Yup.string()
      .required("Required")
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

  handleConditionModal = () => {
    this.setState({
      ...this.state,
      isConditionModalOpen: !this.state.isConditionModalOpen,
    });
  };

  handlePenaltyCountModal = () => {
    this.setState({
      ...this.state,
      isPenaltyCountModalOpen: !this.state.isPenaltyCountModalOpen,
    });
  };

  handlePenaltyRentModal = () => {
    this.setState({
      ...this.state,
      isPenaltyRentModalOpen: !this.state.isPenaltyRentModalOpen,
    });
  };

  handlePenaltyAmountModal = () => {
    this.setState({
      ...this.state,
      isPenaltyAmountModalOpen: !this.state.isPenaltyAmountModalOpen,
    });
  };
  // Customizable Area End
}
