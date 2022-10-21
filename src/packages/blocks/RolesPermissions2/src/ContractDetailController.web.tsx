import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import moment from "moment";
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
  isTerminateContractModalOpen: boolean;
  isClosedContractModalOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;

  contractId: string;

  contractData: ContractData;
  // Customizable Area End
}

interface SS {
  id: any;
}

interface ContractData {
  templateUrl: string;
  templateText: string;
  isCustomContract: boolean;
  tenantName: string;
  conditionText: string;
  status: string;
}

export default class ContractDetailController extends BlockComponent<Props, S, SS> {
  GetContractsDetailsCallId: any;
  UpdateContractsStatusCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isTerminateContractModalOpen: false,
      isClosedContractModalOpen: false,
      isShareModalOpen: false,

      shareUrl: "",

      contractId: "",

      contractData: {
        templateUrl: "",
        templateText: "",
        isCustomContract: false,
        tenantName: "",
        conditionText: "",
        status: "",
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

        let conditionText: string = "";
        if (contract.attributes.conditions && contract.attributes.conditions.length > 0) {
          conditionText += "<h4>Personal Condition</h4>";
          contract.attributes.conditions.map((condition: any) => {
            conditionText += `<p>${condition.text}</p>`;
            return;
          });
        }
        if (contract.attributes.terms && contract.attributes.terms.length > 0) {
          conditionText += "<h4>Payment Terms</h4>";
          contract.attributes.terms.map((term: any) => {
            conditionText += `<p>${term.text}</p>`;
            return;
          });
        }
        if (contract.attributes.custom_term_condition) {
          conditionText += "<h4>Custom Condition</h4>";
          conditionText += contract.attributes.custom_term_condition;
        }

        this.setState({
          contractData: {
            templateText: contract.attributes.custom_contract
              ? contract.attributes.custom_contract_image.url
              : contract.attributes.contract_template,
            templateUrl: contract.attributes.custom_contract
              ? contract.attributes.custom_contract_image.url
              : contract.attributes.contract_template_pdf.url,
            isCustomContract: contract.attributes.custom_contract,
            tenantName: contract.attributes.tenant.full_name,
            conditionText: conditionText,
            status: contract.attributes.status,
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

    // Update Contract Status - API
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.UpdateContractsStatusCallId !== null &&
      this.UpdateContractsStatusCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.UpdateContractsStatusCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        toast.success("Status updated successfully");
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

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const contract_id = this.props.navigation.getParam("id");
    this.setState({ contractId: contract_id }, () => {
      this.getContractDetails();
    });
  }

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

  // Update Contract Status - API
  handleUpdateContractStatus = (contractStatus: any) => {
    const body = {
      contract: {
        status: contractStatus,
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UpdateContractsStatusCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/${this.state.contractId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleTerminateContractModal = () => {
    this.setState({ isTerminateContractModalOpen: !this.state.isTerminateContractModalOpen });
  };

  handleShareModal = () => {
    this.setState({ isShareModalOpen: !this.state.isShareModalOpen });
  };

  handleClosedContractModal = () => {
    this.setState({ isClosedContractModalOpen: !this.state.isClosedContractModalOpen });
  };
  // Customizable Area End
}
