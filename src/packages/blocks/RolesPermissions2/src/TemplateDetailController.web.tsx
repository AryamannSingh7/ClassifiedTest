import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
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

interface TemplateData {
  templateUrl: string;
  templateText: string;
  tenantName: string;
  conditionText: string;
}

interface S {
  // Customizable Area Start
  loading: boolean;
  isTerminateContractModalOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;

  templateId: string;

  template: any;
  templateData: TemplateData;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TemplateDetailController extends BlockComponent<Props, S, SS> {
  GetTemplateDetailsCallId: any;
  DeleteTemplateDetailsCallId: any;
  CreateContractCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isTerminateContractModalOpen: false,
      isShareModalOpen: false,

      shareUrl: "",

      templateId: "",

      template: null,
      templateData: {
        templateUrl: "",
        templateText: "",
        tenantName: "",
        conditionText: "",
      },
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Get Contract Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTemplateDetailsCallId !== null &&
      this.GetTemplateDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTemplateDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        const template = responseJson.data;

        let conditionText: string = "";
        if (template.attributes.conditions && template.attributes.conditions.length > 0) {
          conditionText += "<h4>Personal Condition</h4>";
          template.attributes.conditions.map((condition: any) => {
            conditionText += `<p>${condition.text}</p>`;
            return;
          });
        }
        if (template.attributes.terms && template.attributes.terms.length > 0) {
          conditionText += "<h4>Payment Terms</h4>";
          template.attributes.terms.map((term: any) => {
            conditionText += `<p>${term.text}</p>`;
            return;
          });
        }
        if (template.attributes.custom_term_condition) {
          conditionText += "<h4>Custom Condition</h4>";
          conditionText += template.attributes.custom_term_condition;
        }

        this.setState({
          template: template,
          shareUrl: template.attributes.custom_lease_template_pdf.url,
          templateData: {
            templateUrl: template.attributes.custom_lease_template_pdf.url,
            templateText: template.attributes.custom_lease_template,
            tenantName: template.attributes.template_name,
            conditionText: conditionText,
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

    // Delete Contract Detail - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteTemplateDetailsCallId !== null &&
      this.DeleteTemplateDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteTemplateDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson) {
        toast.success("Template deleted successfully");
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

    // Create Contract - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateContractCallId !== null &&
      this.CreateContractCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateContractCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({ loading: false }, () => {
          toast.success(`Contract created successfully for unit ${responseJson.contract.data.attributes.unit_name}`);
          this.props.navigation.navigate("ContractDetail", { id: responseJson.contract.data.id });
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

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const template_id = this.props.navigation.getParam("id");
    this.setState({ templateId: template_id }, () => {
      this.getTemplateDetails();
    });
  }

  // Get Template Details - API
  getTemplateDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTemplateDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/saved_lease_templates/${this.state.templateId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete Template Details - API
  deleteTemplateDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteTemplateDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/saved_lease_templates/${this.state.templateId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // CRETE CONTRACT - API
  handleCreateContract = () => {
    const templateDetails = this.state.template;

    const society_id: any = localStorage.getItem("society_id");

    var data = new FormData();
    data.append("[contract][society_management_id]", society_id);
    data.append("[contract][building_management_id]", templateDetails.attributes.building_management_id);
    data.append("[contract][apartment_management_id]", templateDetails.attributes.apartment_management_id);
    data.append("[contract][tenant_id]", templateDetails.attributes.tenant_id);
    data.append("[contract][tenant_name]", templateDetails.attributes.tenant_name);
    data.append("[contract][landlord_name]", templateDetails.attributes.landlord_name);
    data.append("[contract][agreement_duration]", templateDetails.attributes.agreement_duration);
    data.append("[contract][start_date]", templateDetails.attributes.start_date);
    data.append("[contract][expires_on]", templateDetails.attributes.expires_on);
    data.append("[contract][rent_amount]", templateDetails.attributes.rent_amount);
    data.append("[contract][currency]", templateDetails.attributes.currency);
    if (templateDetails.attributes.custom_term_condition) {
      data.append("[contract][custom_term_condition]", templateDetails.attributes.custom_term_condition);
    } else {
      data.append("[contract][term_ids][]", templateDetails.attributes.term_ids[0]);
      data.append("[contract][condition_ids][]", templateDetails.attributes.condition_ids[0]);
    }
    data.append("[contract][penanlty_late_payment]", templateDetails.attributes.penanlty_late_payment);
    data.append("[contract][contract_template]", templateDetails.attributes.custom_lease_template);
    data.append("[contract][custom_contract]", "false");
    data.append("[contract][lease_template_id]", templateDetails.attributes.lease_template_id);

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

  handleEditTemplate = () => {
    const formData = {
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
    };

    const condition = {
      isEditorCondition: false,
      paymentTerm: [],
      personalCondition: [],
      editorCondition: "",
    };

    window.sessionStorage.setItem("contractForm", JSON.stringify(formData));

    window.sessionStorage.setItem("isLatePaymentPenalty", "false");

    window.sessionStorage.setItem("isEditFlow", "true");

    window.sessionStorage.setItem("changedTemplate", "");
    window.sessionStorage.setItem("tenant", "");
    window.sessionStorage.setItem("templateId", "");

    window.sessionStorage.setItem("condition", JSON.stringify(condition));

    this.props.navigation.navigate("LeaseFormIssueLease", { templateId: 1 });
  };

  // Handle State
  handleDeleteTemplateModal = () => {
    this.setState({ isTerminateContractModalOpen: !this.state.isTerminateContractModalOpen });
  };

  handleShareModal = () => {
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen });
  };
  // Customizable Area End
}
