import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;

  dataSearch: any;
  anchorEl: any;
  invitationData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BuildingsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      imageBox: false,
      photoIndex: 0,

      currentTab: 0,

      isEditBuildingModalOpen: false,

      dataSearch: "",
      anchorEl: null,
      invitationData: "",
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Handle State
  handleTabChange = (event: any, newValue: number) => {
    this.setState({ currentTab: newValue });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMoreClick = (e: any) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  invitationData = (values: any) => {
    this.setState({ invitationData: values });
  };

  handleEditBuildingModal = () => {
    this.setState({ isEditBuildingModalOpen: !this.state.isEditBuildingModalOpen });
  };

  EditSchema() {
    const validations = Yup.object().shape({
      countryname: Yup.string().required(`This field is required`),
      buildingname: Yup.string().required(`This field is required`),
      buildingarea: Yup.string().required(`This field is required`),
      totalfloors: Yup.string().required(`This field is required`),
      totalunits: Yup.string().required(`This field is required`),
      purchasedate: Yup.string().required(`This field is required`),
      currentvaluation: Yup.string().required(`This field is required`),
      size: Yup.string().required(`This field is required`),
    });
    return validations;
  }
  // Customizable Area End
}
