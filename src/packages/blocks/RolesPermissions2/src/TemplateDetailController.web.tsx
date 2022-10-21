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
}

interface S {
  // Customizable Area Start
  isTerminateContractModalOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;

  templateId: string;

  templateData: TemplateData;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TemplateDetailController extends BlockComponent<Props, S, SS> {
  GetTemplateDetailsCallId: any;
  DeleteTemplateDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isTerminateContractModalOpen: false,
      isShareModalOpen: false,

      shareUrl: "",

      templateId: "",

      templateData: {
        templateUrl: "",
        templateText: "",
        tenantName: "",
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
        this.setState({
          shareUrl: template.attributes.template_pdf.url,
          templateData: {
            templateUrl: template.attributes.template_pdf.url,
            templateText: template.attributes.template,
            tenantName: template.attributes.template_name,
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

  // Handle State
  handleDeleteTemplateModal = () => {
    this.setState({ isTerminateContractModalOpen: !this.state.isTerminateContractModalOpen });
  };

  handleShareModal = () => {
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen });
  };
  // Customizable Area End
}
