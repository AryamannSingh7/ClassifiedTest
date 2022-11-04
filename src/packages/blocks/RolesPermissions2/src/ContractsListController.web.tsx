import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

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
  isContractOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;

  templatesList: any[];
  contractsList: any[];

  filter: {
    sort: string;
    status: string;
  };
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContractsListController extends BlockComponent<Props, S, SS> {
  GetTemplatesListCallId: any;
  GetContractsListCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isContractOpen: true,
      isShareModalOpen: false,

      shareUrl: "",

      templatesList: [],
      contractsList: [],

      filter: {
        status: "",
        sort: "desc",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Get All Contract List - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetContractsListCallId !== null &&
      this.GetContractsListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetContractsListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.contract) {
        this.setState({ contractsList: responseJson.contract.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get All Template List - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTemplatesListCallId !== null &&
      this.GetTemplatesListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTemplatesListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ templatesList: responseJson.data });
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
  // Get All Contract List - API
  getContractsList = () => {
    const { status, sort } = this.state.filter;
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetContractsListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts?status=${status}&sort=${sort}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get All Template List - API
  getTemplatesList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTemplatesListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/saved_lease_templates`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleShareModal = () => {
    this.setState({
      ...this.state,
      isShareModalOpen: !this.state.isShareModalOpen,
    });
  };

  handleEditTemplate = (template: any) => {
    const templateDetails = template;

    const formData = {
      tenantName: templateDetails.attributes.tenant_name,
      landlordName: templateDetails.attributes.landlord_name,
      buildingName: templateDetails.attributes.building_management.name,
      unitName: templateDetails.attributes.apartment_management.apartment_name,
      buildingId: templateDetails.attributes.building_management_id,
      unitId: templateDetails.attributes.apartment_management_id,
      duration: templateDetails.attributes.agreement_duration,
      startDate: templateDetails.attributes.start_date,
      endDate: templateDetails.attributes.expires_on,
      monthlyRent: templateDetails.attributes.rent_amount,
      currency: templateDetails.attributes.currency,
    };

    let termId: any[] = [];
    let conditionId: any[] = [];
    if (templateDetails.attributes.term_ids) {
      termId = templateDetails.attributes.term_ids[0].split(",");
    }
    if (templateDetails.attributes.condition_ids) {
      conditionId = templateDetails.attributes.condition_ids[0].split(",");
    }

    const condition = {
      isEditorCondition: templateDetails.attributes.custom_term_condition !== null,
      paymentTerm: termId,
      personalCondition: conditionId,
      editorCondition: templateDetails.attributes.custom_term_condition,
    };

    window.sessionStorage.setItem("contractForm", JSON.stringify(formData));

    window.sessionStorage.setItem("isLatePaymentPenalty", templateDetails.attributes.penanlty_late_payment);

    window.sessionStorage.setItem("isEditFlow", "true");

    window.sessionStorage.setItem("changedTemplate", templateDetails.attributes.custom_lease_template);
    window.sessionStorage.setItem("tenant", templateDetails.attributes.tenant_id);
    window.sessionStorage.setItem("templateId", templateDetails.id);
    window.sessionStorage.setItem("templateName", templateDetails.attributes.template_name);

    window.sessionStorage.setItem("condition", JSON.stringify(condition));

    this.props.navigation.navigate("LeaseFormIssueLease", { templateId: templateDetails.attributes.lease_template_id });
  };
  // Customizable Area End
}
