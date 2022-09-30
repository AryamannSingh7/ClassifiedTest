import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  setDeLinkOpen: boolean;
  setSuspendOpen: boolean;
  setEditOpen: boolean;
  setUnitOpen: boolean;
  imageBox: boolean;
  unitImages: any;

  photoIndex: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitDetailsController extends BlockComponent<Props, S, SS> {
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
      setDeLinkOpen: false,
      setUnitOpen: false,
      setSuspendOpen: false,
      setEditOpen: false,
      imageBox: false,
      unitImages: [],

      photoIndex: 0,
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
  slider: any;
  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };
  
  InvitationSchema() {
    const validations = Yup.object().shape({
      complexname: Yup.string().required(`This field is required`),
      buildingname: Yup.string().required(`This field is required`),
      unitno: Yup.string().required(`This field is required`),
      configuration: Yup.string().required(`This field is required`),
      purchaseprice: Yup.string().required(`This field is required`),
      purchasedate: Yup.string().required(`This field is required`),
      currentvaluation: Yup.string().required(`This field is required`),
      size: Yup.string().required(`This field is required`),
    });
    return validations;
  }

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

  handleDeLinkModal = () => {
    this.setState({ setDeLinkOpen: !this.state.setDeLinkOpen });
  };

  handleSuspendModal = () => {
    this.setState({ setSuspendOpen: !this.state.setSuspendOpen });
  };

  handleEditModal = () => {
    this.setState({ setEditOpen: !this.state.setEditOpen });
  };

  handleUnitModal = () => {
    this.setState({ setUnitOpen: !this.state.setUnitOpen });
  };

  imageonChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({ unitImages: imageList });
  };

  // Customizable Area End
}
