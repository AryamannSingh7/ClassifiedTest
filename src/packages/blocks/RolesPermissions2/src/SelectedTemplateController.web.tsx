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
  templateId: string;
  template: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SelectedTemplateController extends BlockComponent<Props, S, SS> {
  GetTemplateDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      templateId: "",
      template: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTemplateDetailsCallId !== null &&
      this.GetTemplateDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTemplateDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ template: responseJson.data.attributes.template });
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
    const template_id = this.props.navigation.getParam("templateId");
    this.setState({ templateId: template_id }, () => {
      this.getTemplateDetails();
    });
  }

  getTemplateDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTemplateDetailsCallId = apiRequest.messageId;

    // const society_id = localStorage.getItem("society_id");
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
    const sessionPage = window.sessionStorage.getItem("page");
    window.sessionStorage.clear();

    if (sessionPage === "IssueLease") {
      this.props.navigation.navigate("IssueLease");
    } else {
      this.props.navigation.navigate("IssueContract");
    }
  };

  gotoContractFrom = () => {
    const buildingId = window.sessionStorage.getItem("buildingId");
    const unitId = window.sessionStorage.getItem("unitId");
    const formData = {
      tenantName: "",
      landlordName: "",
      buildingName: "",
      unitName: "",
      address: "",
      complexName: "",
      buildingId: buildingId ? buildingId : "",
      unitId: unitId ? unitId : "",
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
    window.sessionStorage.setItem("isEditFlow", "false");
    window.sessionStorage.setItem("templateName", "");

    window.sessionStorage.setItem("condition", JSON.stringify(condition));

    this.props.navigation.navigate("LeaseFormIssueLease", { templateId: this.state.templateId });
  };
  // Customizable Area End
}
