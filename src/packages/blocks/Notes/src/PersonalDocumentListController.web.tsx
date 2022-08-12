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
  isAddDocumentModalOpen: boolean;
  isDeleteDocumentModalOpen: boolean;
  isShareModalOpen: boolean;

  shareUrl: string;
  shareQuote: string;

  title: string;
  file: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PersonalDocumentListController extends BlockComponent<
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
      isAddDocumentModalOpen: false,
      isDeleteDocumentModalOpen: false,
      isShareModalOpen: false,

      shareUrl: "",
      shareQuote: "",

      title: "",
      file: null,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  upload: any;

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
  }

  onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];

    console.log(file);
  };

  handleAddDocumentModal = () => {
    this.setState({
      ...this.state,
      isAddDocumentModalOpen: !this.state.isAddDocumentModalOpen,
    });
  };

  handleDeleteDocumentModal = () => {
    this.setState({
      ...this.state,
      isDeleteDocumentModalOpen: !this.state.isDeleteDocumentModalOpen,
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
