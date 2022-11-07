import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
import moment from "moment";
import { RouteComponentProps } from "react-router";
import toast from "react-hot-toast";
import RichTextEditor from "react-rte";

export const configJSON = require("./config.js");

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface LeaseForm {
  tenantName: string;
  landlordName: string;
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
  isSaveLeaseModalOpen: boolean;
  isGenerateLeaseModalOpen: boolean;
  isShareModalOpen: boolean;

  changedTemplate: string;

  shareUrl: string;

  isLatePaymentPenalty: boolean;
  penalty: any;
  penaltyId: string;
  penaltyType: string;
  penaltyAmount: string;

  paymentTerm: any[];
  personalCondition: any[];
  selectedPaymentTermId: any[];
  selectedPaymentTerm: any[];
  selectedPersonalConditionId: any[];
  selectedPersonalCondition: any[];

  editor: any;

  templateName: string;
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
  GetPenaltyDetailsCallId: any;
  CreatePenaltyCallId: any;
  EditPenaltyCallId: any;
  GetPaymentTermCallId: any;
  GetPersonalConditionCallId: any;
  CreateContractCallId: any;
  CreateTemplateCallId: any;
  EditTemplateCallId: any;

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
      isSaveLeaseModalOpen: false,
      isGenerateLeaseModalOpen: false,
      isShareModalOpen: false,

      changedTemplate: "",

      shareUrl: "",

      isLatePaymentPenalty: false,
      penalty: null,
      penaltyId: "",
      penaltyType: "",
      penaltyAmount: "",

      paymentTerm: [],
      personalCondition: [],
      selectedPaymentTermId: [],
      selectedPaymentTerm: [],
      selectedPersonalConditionId: [],
      selectedPersonalCondition: [],

      editor: RichTextEditor.createEmptyValue(),

      templateName: "",
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

      this.setState({ tenant: responseJson.account, contract: responseJson.contract.data }, () => {
        if (this.state.tenant) {
          window.sessionStorage.setItem("tenant", this.state.tenant.id);
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

    // Get Penalty Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPenaltyDetailsCallId !== null &&
      this.GetPenaltyDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPenaltyDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.penanlty) {
        this.setState({ penalty: responseJson.penanlty });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Create Penalty Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreatePenaltyCallId !== null &&
      this.CreatePenaltyCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreatePenaltyCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.penanlty) {
        this.setState({ penalty: responseJson.penanlty }, () => {
          this.handlePenaltyCountModal();
          toast.success("Late payment penalty created successfully");
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

    // Edit Penalty Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditPenaltyCallId !== null &&
      this.EditPenaltyCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditPenaltyCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.penanlty) {
        this.setState({ penalty: responseJson.penanlty, penaltyId: "", penaltyAmount: "", penaltyType: "" }, () => {
          this.handlePenaltyCountModal();
          toast.success("Late payment penalty edited successfully");
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

    // Get Template - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTemplateTextCallId !== null &&
      this.GetTemplateTextCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTemplateTextCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      const contract = JSON.parse(window.sessionStorage.getItem("contractForm") as any);

      if (responseJson.data) {
        const template = responseJson.data.attributes.template;
        let changedTemplate = template.replaceAll("{{TENANT_NAME}}", contract.tenantName);
        changedTemplate = changedTemplate.replaceAll("{{LANDLORD_NAME}}", contract.landlordName);
        changedTemplate = changedTemplate.replaceAll("{{BUILDING_NAME}}", contract.buildingName);
        changedTemplate = changedTemplate.replaceAll("{{UNIT_NAME}}", contract.unitName);
        changedTemplate = changedTemplate.replaceAll("{{DURATION}}", contract.duration);
        changedTemplate = changedTemplate.replaceAll(
          "{{START_DATE}}",
          moment(contract.startDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
        );
        changedTemplate = changedTemplate.replaceAll(
          "{{END_DATE}}",
          moment(contract.endDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
        );
        changedTemplate = changedTemplate.replaceAll("{{AMOUNT}}", contract.currency + " " + contract.monthlyRent);

        window.sessionStorage.setItem("changedTemplate", changedTemplate);
        this.setState({ changedTemplate: changedTemplate });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Payment Term - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPaymentTermCallId !== null &&
      this.GetPaymentTermCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPaymentTermCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.terms) {
        this.setState({ paymentTerm: responseJson.terms }, () => {
          if (this.state.selectedPaymentTermId.length > 0) {
            const data = this.state.paymentTerm.filter((term: any) =>
              this.state.selectedPaymentTermId.includes(term.id)
            );
            this.setState({ selectedPaymentTerm: data });
          }
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

    // Get Personal Condition - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPersonalConditionCallId !== null &&
      this.GetPersonalConditionCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPersonalConditionCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.Conditions) {
        this.setState({ personalCondition: responseJson.Conditions }, () => {
          if (this.state.selectedPersonalConditionId.length > 0) {
            const data = this.state.personalCondition.filter((condition: any) =>
              this.state.selectedPersonalConditionId.includes(condition.id)
            );
            this.setState({ selectedPersonalCondition: data });
          }
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

    // CREATE CONTRACT - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateContractCallId !== null &&
      this.CreateContractCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateContractCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        window.sessionStorage.clear();
        toast.success(responseJson.message);
        this.props.navigation.navigate("ContractsList");
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // CREATE TEMPLATE - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateTemplateCallId !== null &&
      this.CreateTemplateCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateTemplateCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson) {
        window.sessionStorage.clear();
        toast.success("Template created successfully");
        this.props.navigation.navigate("ContractsList");
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // EDIT TEMPLATE - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditTemplateCallId !== null &&
      this.EditTemplateCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditTemplateCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson) {
        window.sessionStorage.clear();
        toast.success("Template edited successfully");
        this.props.navigation.navigate("ContractsList");
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

  // Get Penalty - API
  getPenaltyDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPenaltyDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    const tenant_id = window.sessionStorage.getItem("tenant");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/penanlty_late_payments/show_penanlty?tenant_id=${tenant_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Create Penalty - API
  createPenalty = (values: any) => {
    const tenant_id = window.sessionStorage.getItem("tenant");
    const body = {
      penanlty: {
        penanlty_counted: values.penaltyType,
        amount: values.penaltyAmount,
        tenant_id: tenant_id,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreatePenaltyCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/penanlty_late_payments`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Edit Penalty - API
  editPenalty = (values: any) => {
    const tenant_id = window.sessionStorage.getItem("tenant");
    const body = {
      penanlty: {
        penanlty_counted: values.penaltyType,
        amount: values.penaltyAmount,
        tenant_id: tenant_id,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditPenaltyCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/penanlty_late_payments/${this.state.penaltyId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

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

  // Get Payment Term - API
  getPaymentTerm = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPaymentTermCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/terms`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Personal Condition - API
  getPersonalCondition = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPersonalConditionCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/conditions`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // CRETE CONTRACT - API
  handleCreateContract = () => {
    const society_id: any = localStorage.getItem("society_id");
    const tenant_id: any = window.sessionStorage.getItem("tenant");
    const latePaymentPenalty: any = window.sessionStorage.getItem("isLatePaymentPenalty");
    const contractTemplate: any = window.sessionStorage.getItem("changedTemplate");
    const contractForm: any = JSON.parse(window.sessionStorage.getItem("contractForm") as any);
    const condition: any = JSON.parse(window.sessionStorage.getItem("condition") as any);

    var data = new FormData();
    data.append("[contract][society_management_id]", society_id);
    data.append("[contract][building_management_id]", contractForm.buildingId);
    data.append("[contract][apartment_management_id]", contractForm.unitId);
    data.append("[contract][tenant_id]", tenant_id);
    data.append("[contract][tenant_name]", contractForm.tenantName);
    data.append("[contract][landlord_name]", contractForm.landlordName);
    data.append("[contract][agreement_duration]", contractForm.duration);
    data.append("[contract][start_date]", contractForm.startDate);
    data.append("[contract][expires_on]", contractForm.endDate);
    data.append("[contract][rent_amount]", contractForm.monthlyRent);
    data.append("[contract][currency]", contractForm.currency);
    if (condition.isEditorCondition) {
      data.append("[contract][custom_term_condition]", condition.editorCondition);
    } else {
      data.append("[contract][term_ids][]", condition.paymentTerm.toString());
      data.append("[contract][condition_ids][]", condition.personalCondition.toString());
    }
    data.append("[contract][penanlty_late_payment]", latePaymentPenalty);
    data.append("[contract][contract_template]", contractTemplate);
    data.append("[contract][custom_contract]", "false");
    data.append("[contract][lease_template_id]", this.state.templateId);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateContractCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // CRETE TEMPLATE - API
  handleCreateTemplate = () => {
    const society_id: any = localStorage.getItem("society_id");
    const tenant_id: any = window.sessionStorage.getItem("tenant");
    const latePaymentPenalty: any = window.sessionStorage.getItem("isLatePaymentPenalty");
    const contractTemplate: any = window.sessionStorage.getItem("changedTemplate");
    const contractForm: any = JSON.parse(window.sessionStorage.getItem("contractForm") as any);
    const condition: any = JSON.parse(window.sessionStorage.getItem("condition") as any);

    var data = new FormData();
    data.append("[template][lease_template_id]", this.state.templateId);
    data.append("[template][template_name]", this.state.templateName);
    data.append("[template][apartment_management_id]", contractForm.unitId);
    data.append("[template][building_management_id]", contractForm.buildingId);
    data.append("[template][society_management_id", society_id);
    data.append("[template][landlord_name", contractForm.landlordName);
    data.append("[template][start_date]", contractForm.startDate);
    data.append("[template][rent_amount]", contractForm.monthlyRent);
    data.append("[template][currency]", contractForm.currency);
    data.append("[template][expires_on]", contractForm.endDate);
    data.append("[template][tenant_name", contractForm.tenantName);
    data.append("[template][penanlty_late_payment]", latePaymentPenalty);
    data.append("[template][custom_contract]", "false");
    data.append("[template][agreement_duration]", contractForm.duration);
    data.append("[template][custom_lease_template]", contractTemplate);
    if (condition.isEditorCondition) {
      data.append("[template][custom_term_condition]", condition.editorCondition);
    } else {
      data.append("[template][term_ids][]", condition.paymentTerm.toString());
      data.append("[template][condition_ids][]", condition.personalCondition.toString());
    }
    data.append("[template][tenant_id]", tenant_id);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateTemplateCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/saved_lease_templates`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleEditLeaseModal = () => {
    const template_id: any = window.sessionStorage.getItem("templateId");
    const society_id: any = localStorage.getItem("society_id");
    const tenant_id: any = window.sessionStorage.getItem("tenant");
    const latePaymentPenalty: any = window.sessionStorage.getItem("isLatePaymentPenalty");
    const contractTemplate: any = window.sessionStorage.getItem("changedTemplate");
    const contractForm: any = JSON.parse(window.sessionStorage.getItem("contractForm") as any);
    const condition: any = JSON.parse(window.sessionStorage.getItem("condition") as any);

    var data = new FormData();
    data.append("[template][lease_template_id]", this.state.templateId);
    data.append("[template][template_name]", this.state.templateName);
    data.append("[template][apartment_management_id]", contractForm.unitId);
    data.append("[template][building_management_id]", contractForm.buildingId);
    data.append("[template][society_management_id", society_id);
    data.append("[template][landlord_name", contractForm.landlordName);
    data.append("[template][start_date]", contractForm.startDate);
    data.append("[template][rent_amount]", contractForm.monthlyRent);
    data.append("[template][currency]", contractForm.currency);
    data.append("[template][expires_on]", contractForm.endDate);
    data.append("[template][tenant_name", contractForm.tenantName);
    data.append("[template][penanlty_late_payment]", latePaymentPenalty);
    data.append("[template][custom_contract]", "false");
    data.append("[template][agreement_duration]", contractForm.duration);
    data.append("[template][custom_lease_template]", contractTemplate);
    if (condition.isEditorCondition) {
      data.append("[template][custom_term_condition]", condition.editorCondition);
    } else {
      data.append("[template][term_ids][]", condition.paymentTerm.toString());
      data.append("[template][condition_ids][]", condition.personalCondition.toString());
    }
    data.append("[template][tenant_id]", tenant_id);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditTemplateCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/saved_lease_templates/${template_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
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
      .test(
        "unitId",
        "There is no tenant available for this unit. you need to assign this unit to tenant before creating a contract.",
        (value: any) => {
          if (value) {
            return this.state.tenant !== null;
          }
          return true;
        }
      )
      .test(
        "unitId",
        "The contract is already created for this unit. you need to terminate the contract before creating a new one.",
        (value: any) => {
          if (value) {
            return (
              (this.state.contract === null ||
                (this.state.contract.attributes.status === "Terminated" ||
                  this.state.contract.attributes.status === "Closed")) &&
              this.state.tenant
            );
          }
          return true;
        }
      ),
    // .when("buildingId", (buildingId: any, schema: any) => {
    //   return schema.test({
    //     test: (unitId: any) => {
    //       if (unitId) {
    //         return !this.state.contract && this.state.tenant;
    //       }
    //       return true;
    //     },
    //     message:
    //       "The contract is already created for this unit. you need to terminate the contract before creating a new one.",
    //   });
    // }),
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

  PenaltyFormValidation: any = Yup.object().shape({
    penaltyType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    penaltyAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
  });

  handleConditionModal = () => {
    this.setState({ isConditionModalOpen: !this.state.isConditionModalOpen });
  };

  handlePenaltyCountModal = () => {
    this.setState({ isPenaltyCountModalOpen: !this.state.isPenaltyCountModalOpen });
  };

  handlePenaltyRentModal = () => {
    this.setState({ isPenaltyRentModalOpen: !this.state.isPenaltyRentModalOpen });
  };

  handlePenaltyAmountModal = () => {
    this.setState({ isPenaltyAmountModalOpen: !this.state.isPenaltyAmountModalOpen });
  };

  goBackFromReviewPage = () => {
    this.props.navigation.navigate("ChangedSelectedTemplate", { templateId: this.state.templateId });
  };

  gotoLeaseFormPage = () => {
    this.props.navigation.navigate("LeaseFormIssueLease", { templateId: this.state.templateId });
  };

  gotoSelectTemplatePage = () => {
    const isEditFlow = window.sessionStorage.getItem("isEditFlow");
    if (isEditFlow === "true") {
      this.props.navigation.navigate("ContractsList");
    } else {
      this.props.navigation.navigate("SelectedTemplateTwo", { templateId: this.state.templateId });
    }
  };

  handleSaveLeaseModal = () => {
    this.setState({ isSaveLeaseModalOpen: !this.state.isSaveLeaseModalOpen });
  };

  handleGenerateLeaseModal = () => {
    this.setState({ isGenerateLeaseModalOpen: !this.state.isGenerateLeaseModalOpen });
  };

  handleShareModal = () => {
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen });
  };
  // Customizable Area End
}
