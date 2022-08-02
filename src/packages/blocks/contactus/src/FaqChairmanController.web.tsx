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
  expanded: string | boolean;

  isAddQuestionModalOpen: boolean;
  isEditQuestionModalOpen: boolean;
  isAddCategoryModalOpen: boolean;
  isDeleteAllCategoryModalOpen: boolean;
  isDeleteQuestionModalOpen: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class FaqChairmanController extends BlockComponent<
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
      expanded: "",

      isAddQuestionModalOpen: false,
      isEditQuestionModalOpen: false,
      isAddCategoryModalOpen: false,
      isDeleteAllCategoryModalOpen: false,
      isDeleteQuestionModalOpen: false,
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
    
  }




  handleChange = (panel: string) => () => {
    this.setState({
      ...this.state,
      expanded: panel,
    });
  };

  handleAddQuestionModal = () => {
    this.setState({
      ...this.state,
      isAddQuestionModalOpen: !this.state.isAddQuestionModalOpen,
    });
  };

  handleEditQuestionModal = () => {
    this.setState({
      ...this.state,
      isEditQuestionModalOpen: !this.state.isEditQuestionModalOpen,
    });
  };

  handleAddCategoryModal = () => {
    this.setState({
      ...this.state,
      isAddCategoryModalOpen: !this.state.isAddCategoryModalOpen,
    });
  };

  handleDeleteAllCategoryModal = () => {
    this.setState({
      ...this.state,
      isDeleteAllCategoryModalOpen: !this.state.isDeleteAllCategoryModalOpen,
    });
  };

  handleDeleteQuestionModal = () => {
    this.setState({
      ...this.state,
      isDeleteQuestionModalOpen: !this.state.isDeleteQuestionModalOpen,
    });
  };

  // Customizable Area End
}
