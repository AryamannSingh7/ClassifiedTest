import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";
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
  isOpenMapModalOpen: boolean;
  setDeLinkOpen: boolean;
  setSuspendOpen: boolean;
  setUnitOpen: boolean;
  imageBox: boolean;
  unitImages: any;

  photoIndex: number;

  unitId: string;

  unitData: UnitData;

  editForm: EditUnitForm;

  familyList: any[];
  // Customizable Area End
}

interface UnitData {
  unitName: string;
  photos: any[];
  lat: string;
  long: string;
  country: string;
  region: string;
  city: string;
  floor: string;
  size: string;
  configuration: string;
  purchasePrice: string;
  purchaseDate: string;
  currentValuation: string;
  activeIncidents: any[];
  vehicleDetails: any[];
  rentHistory: any[];
  buildingName: string;
}

interface EditUnitForm {
  complexName: string;
  buildingName: string;
  unitName: string;
  size: string;
  configuration: string;
  purchasePrice: string;
  purchaseDate: string;
  currentValuation: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitDetailsController extends BlockComponent<Props, S, SS> {
  GetUnitDetailsCallId: any;
  EditUnitDetailCallId: any;
  GetFamilyListCallId: any;
  EditFamilyMemberCallId: any;
  DeleteFamilyMemberCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isOpenMapModalOpen: false,
      setDeLinkOpen: false,
      setUnitOpen: false,
      setSuspendOpen: false,
      imageBox: false,
      unitImages: [],

      photoIndex: 0,

      unitId: "",

      unitData: {
        unitName: "",
        photos: [],
        lat: "",
        long: "",
        country: "",
        region: "",
        city: "",
        floor: "",
        size: "",
        configuration: "",
        purchasePrice: "",
        purchaseDate: "",
        currentValuation: "",
        activeIncidents: [],
        vehicleDetails: [],
        rentHistory: [],
        buildingName: "",
      },

      editForm: {
        complexName: "",
        buildingName: "",
        unitName: "",
        size: "",
        configuration: "",
        purchasePrice: "",
        purchaseDate: "",
        currentValuation: "",
      },

      familyList: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Get Unit Detail API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUnitDetailsCallId !== null &&
      this.GetUnitDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUnitDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          unitData: {
            unitName: responseJson.data.attributes.apartment_name,
            photos: responseJson.data.attributes.photos,
            lat: responseJson.data.attributes.lat,
            long: responseJson.data.attributes.long,
            country: responseJson.data.attributes.country,
            region: responseJson.data.attributes.region,
            city: responseJson.data.attributes.city,
            floor: responseJson.data.attributes.floor_number,
            size: responseJson.data.attributes.size,
            configuration: responseJson.data.attributes.configuration,
            purchasePrice: responseJson.data.attributes.purchase_price,
            purchaseDate: responseJson.data.attributes.purchase_date,
            currentValuation: responseJson.data.attributes.current_valuation,
            activeIncidents: responseJson.data.attributes.active_incidents,
            vehicleDetails: responseJson.data.attributes.vehicle_details,
            rentHistory: responseJson.data.attributes.rent_history,
            buildingName: responseJson.data.attributes.building_management.name,
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

    // Edit Unit Detail API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditUnitDetailCallId !== null &&
      this.EditUnitDetailCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditUnitDetailCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.getUnitDetail();
        toast.success("Details updated successfully");
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Family List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetFamilyListCallId !== null &&
      this.GetFamilyListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetFamilyListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ familyList: responseJson.data ? responseJson.data : [] });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Edit Family Family Member API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditFamilyMemberCallId !== null &&
      this.EditFamilyMemberCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditFamilyMemberCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getFamilyList();

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Delete Family Family Member API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteFamilyMemberCallId !== null &&
      this.DeleteFamilyMemberCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteFamilyMemberCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getFamilyList();

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getUnitDetail();
      this.getFamilyList();
    });
  }

  // Get Unit Details API
  getUnitDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Edit Unit Detail API
  handleSaveUnitDetails = async (values: EditUnitForm) => {
    var data = new FormData();
    data.append("apartment_management[size]", values.size);
    data.append("apartment_management[purchase_price]", values.purchasePrice);
    data.append("apartment_management[configuration]", values.configuration);
    data.append("apartment_management[purchase_date]", values.purchaseDate);
    data.append("apartment_management[current_valuation]", values.currentValuation);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditUnitDetailCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Family List API
  getFamilyList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetFamilyListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/families`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Edit Family Member API
  handleEditFamilyMember = async (values: EditUnitForm) => {
    var data = new FormData();
    data.append("name", "test-1");
    data.append("relation_id", "1");
    data.append("id_proof_id", "1");
    data.append("id_number", "xxx0xxx");

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditFamilyMemberCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/families/21`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Delete Family Member API
  handleDeleteMember = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteFamilyMemberCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/families/1`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  editUnitDetailValidation = Yup.object().shape({
    size: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    configuration: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    purchasePrice: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    purchaseDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    currentValuation: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
  });

  openEditUnitModal = () => {
    this.setState(
      {
        editForm: {
          complexName: "-",
          buildingName: this.state.unitData.buildingName || "",
          unitName: this.state.unitData.unitName || "",
          size: this.state.unitData.size || "",
          configuration: this.state.unitData.configuration || "",
          purchasePrice: this.state.unitData.purchasePrice || "",
          purchaseDate: this.state.unitData.purchaseDate || "",
          currentValuation: this.state.unitData.currentValuation || "",
        },
      },
      () => {
        this.handleUnitModal();
      }
    );
  };

  slider: any;
  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };

  handleDeLinkModal = () => {
    this.setState({ setDeLinkOpen: !this.state.setDeLinkOpen });
  };

  handleSuspendModal = () => {
    this.setState({ setSuspendOpen: !this.state.setSuspendOpen });
  };

  handleUnitModal = () => {
    this.setState({ setUnitOpen: !this.state.setUnitOpen });
  };

  handleMapModal = () => {
    this.setState({ isOpenMapModalOpen: !this.state.isOpenMapModalOpen });
  };
  // Customizable Area End
}
