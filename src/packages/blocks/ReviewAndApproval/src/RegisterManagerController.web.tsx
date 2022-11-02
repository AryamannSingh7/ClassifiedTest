import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface RentHistoryForm {
  startDate: string;
  endDate: string;
  rentAmount: string;
  receivedAmount: string;
  tenantName: string;
}

interface S {
  loading: boolean;
  isRentHistoryModalOpen: boolean;

  rentHistoryForm: RentHistoryForm;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RegisterManagerController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isRentHistoryModalOpen: false,

      rentHistoryForm: {
        startDate: "",
        endDate: "",
        rentAmount: "",
        receivedAmount: "",
        tenantName: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
  }

  validationRentHistoryFormSchema: any = Yup.object().shape({
    startDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    rentAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    receivedAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    tenantName: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
  });

  handleRentHistoryModal = () => {
    this.setState({
      isRentHistoryModalOpen: !this.state.isRentHistoryModalOpen,
    });
  };
}
