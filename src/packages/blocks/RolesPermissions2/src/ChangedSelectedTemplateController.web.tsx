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
  isPenaltyCountModalOpen: boolean;
  isPenaltyRentModalOpen: boolean;
  isPenaltyAmountModalOpen: boolean;
  isConditionModalOpen: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ChangedSelectedTemplateController extends BlockComponent<
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
      isPenaltyCountModalOpen: false,
      isPenaltyRentModalOpen: false,
      isPenaltyAmountModalOpen: false,
      isConditionModalOpen: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    console.log("Loading...");
  }

  goBackPage = () => {
    this.props.navigation.goBack();
  };

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
