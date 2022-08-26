import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

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
  isSaveLeaseModalOpen: boolean;
  isGenerateLeaseModalOpen: boolean;
  isShareModalOpen: boolean;

  shareQuote: string;
  shareUrl: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReviewTemplateController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
    ];

    this.state = {
      isSaveLeaseModalOpen: false,
      isGenerateLeaseModalOpen: false,
      isShareModalOpen: false,

      shareQuote: "",
      shareUrl: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {}

  // Handle State
  handleSaveLeaseModal = () => {
    this.setState({
      ...this.state,
      isSaveLeaseModalOpen: !this.state.isSaveLeaseModalOpen,
    });
  };

  handleGenerateLeaseModal = () => {
    this.setState({
      ...this.state,
      isGenerateLeaseModalOpen: !this.state.isGenerateLeaseModalOpen,
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
