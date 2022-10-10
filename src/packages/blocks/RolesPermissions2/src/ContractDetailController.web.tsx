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
  isTerminateContractModalOpen: boolean;
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
}

export default class ContractDetailController extends BlockComponent<Props, S, SS> {
  GetContractsDetailsCallId: any;

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

      contractId: "",

      contractData: {
        templateUrl: "",
        templateText: "",
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
        this.setState({
          contractData: {
            templateText: responseJson.contract.data.attributes.template_text,
            templateUrl: responseJson.contract.data.attributes.template_pdf.url,
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

  // Handle State
  handleTerminateContractModal = () => {
    this.setState({
      ...this.state,
      isTerminateContractModalOpen: !this.state.isTerminateContractModalOpen,
    });
  };

  handleShareModal = () => {
    this.setState({
      ...this.state,
      isShareModalOpen: !this.state.isShareModalOpen,
    });
  };
  // Customizable Area End
}
