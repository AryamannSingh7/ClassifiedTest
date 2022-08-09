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
  docName: string;

  idAddDocumentModalOpen: boolean;
  idDeleteDocumentModalOpen: boolean;
  idAddResolutionModalOpen: boolean;
  idSelectMeetingModalOpen: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DocumentListChairmanController extends BlockComponent<
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
      docName: "",

      idAddDocumentModalOpen: false,
      idDeleteDocumentModalOpen: false,
      idAddResolutionModalOpen: false,
      idSelectMeetingModalOpen: false,
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
    const document_name = this.props.navigation.getParam("name");
    this.setState({
      ...this.state,
      docName: document_name,
    });
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
      idAddDocumentModalOpen: !this.state.idAddDocumentModalOpen,
    });
  };

  handleDeleteDocumentModal = () => {
    this.setState({
      ...this.state,
      idDeleteDocumentModalOpen: !this.state.idDeleteDocumentModalOpen,
    });
  };

  handleAddResolutionsModal = () => {
    this.setState({
      ...this.state,
      idAddResolutionModalOpen: !this.state.idAddResolutionModalOpen,
    });
  };

  handleSelectMeetingModal = () => {
    this.setState({
      ...this.state,
      idSelectMeetingModalOpen: !this.state.idSelectMeetingModalOpen,
    });
  };
  // Customizable Area End
}
