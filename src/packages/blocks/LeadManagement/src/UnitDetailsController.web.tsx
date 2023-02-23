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
import { apiCall } from "../../../components/src/APICallComponent/index.web";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  history: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isOpenMapModalOpen: boolean;
  setDeLinkOpen: boolean;
  setSuspendOpen: boolean;
  setUnitOpen: boolean;
  isEditFamilyModalOpen: boolean;
  isDeleteFamilyModalOpen: boolean;

  imageBox: boolean;
  unitImages: any;

  photoIndex: number;

  unitId: string;

  unitData: UnitData;

  editForm: EditUnitForm;

  relationList: any[];
  idProofList: any[];
  configList: any[];

  familyId: string;
  familyMemberName: string;
  editFamilyForm: EditFamilyForm;

  buildingId: string;
  // Customizable Area End
}

interface UnitData {
  unitName: string;
  complexName: string;
  photos: any[];
  lat: string;
  long: string;
  country: string;
  region: string;
  city: string;
  currency: string;
  floor: string;
  size: string;
  measurement: string;
  configuration: string;
  purchasePrice: string;
  purchaseDate: string;
  currentValuation: string;
  activeIncidents: any[];
  vehicleDetails: any[];
  rentHistory: any[];
  familyList: any[];
  relatedPeople: any[];
  buildingName: string;
  rentStatus: string;
  tenantName: string;
  rentStartDate: string;
  rentEndDate: string;
  rentAmount: string;
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

interface EditFamilyForm {
  name: string;
  relation: string;
  idProof: string;
  idNumber: string;
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
  GetRelationListCallId: any;
  GetIDProofListCallId: any;
  GetConfigurationListCallId: any;
  CreateChatRoomAPIId: any;

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
      isEditFamilyModalOpen: false,
      isDeleteFamilyModalOpen: false,

      imageBox: false,
      unitImages: [],

      photoIndex: 0,

      unitId: "",

      unitData: {
        unitName: "",
        complexName: "",
        photos: [],
        lat: "",
        long: "",
        country: "",
        region: "",
        city: "",
        currency: "",
        floor: "",
        size: "",
        measurement: "",
        configuration: "",
        purchasePrice: "",
        purchaseDate: "",
        currentValuation: "",
        activeIncidents: [],
        vehicleDetails: [],
        rentHistory: [],
        familyList: [],
        relatedPeople: [],
        buildingName: "",
        rentStatus: "",
        tenantName: "",
        rentStartDate: "",
        rentEndDate: "",
        rentAmount: "",
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

      relationList: [],
      idProofList: [],
      configList: [],

      familyId: "",
      familyMemberName: "",
      editFamilyForm: {
        name: "",
        relation: "",
        idProof: "",
        idNumber: "",
      },

      buildingId: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.GetUnitDetailsCallId:
          this.handleGetUnitDetailsResponse(responseJson);
          break;
        case this.EditUnitDetailCallId:
          this.handleSaveUnitDetailsResponse(responseJson);
          break;
        case this.EditFamilyMemberCallId:
          this.handleEditFamilyMemberResponse(responseJson);
          break;
        case this.DeleteFamilyMemberCallId:
          this.handleDeleteFamilyMemberResponse(responseJson);
          break;
        case this.GetRelationListCallId:
          this.handleGetRelationListResponse(responseJson);
          break;
        case this.GetIDProofListCallId:
          this.handleGetIDProofListResponse(responseJson);
          break;
        case this.GetConfigurationListCallId:
          this.handleGetConfigurationListResponse(responseJson);
          break;
        case this.CreateChatRoomAPIId:
          this.handleChatRoomAPIResponse(responseJson);
          break;
        default:
          break;
      }
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
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getUnitDetail();
      this.getConfigurationList();
      this.getRelationList();
      this.getIDProofList();
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

  handleGetUnitDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({
        unitData: {
          unitName: responseJson.data.attributes.apartment_name,
          complexName: responseJson.data.attributes.society_management.name,
          photos: responseJson.data.attributes.photos,
          lat: responseJson.data.attributes.lat,
          long: responseJson.data.attributes.long,
          country: responseJson.data.attributes.country,
          region: responseJson.data.attributes.region,
          city: responseJson.data.attributes.city,
          currency: responseJson.data.attributes.currency && responseJson.data.attributes.currency.currency,
          floor: responseJson.data.attributes.floor_number,
          size: responseJson.data.attributes.size,
          measurement: responseJson.data.attributes.society_management.measurement_unit,
          configuration: responseJson.data.attributes.configuration,
          purchasePrice: responseJson.data.attributes.purchase_price,
          purchaseDate: responseJson.data.attributes.purchase_date,
          currentValuation: responseJson.data.attributes.current_valuation,
          activeIncidents: responseJson.data.attributes.active_incidents.data,
          rentHistory: responseJson.data.attributes.rent_history.data,
          buildingName: responseJson.data.attributes.building_management.name,
          rentStatus: responseJson.data.attributes.status,
          tenantName: responseJson.data.attributes.rent_status && responseJson.data.attributes.rent_status.tenant_name,
          rentStartDate:
            responseJson.data.attributes.rent_status && responseJson.data.attributes.rent_status.start_date,
          rentEndDate: responseJson.data.attributes.rent_status && responseJson.data.attributes.rent_status.end_date,
          rentAmount: responseJson.data.attributes.rent_status && responseJson.data.attributes.rent_status.rent_amount,
          familyList: responseJson.data.attributes.family_members.data
            ? responseJson.data.attributes.family_members.data
            : [],
          vehicleDetails: responseJson.data.attributes.vehicle_details.data
            ? responseJson.data.attributes.vehicle_details.data
            : [],
          relatedPeople: responseJson.data.attributes.related_people,
        },
        buildingId: responseJson.data.attributes.building_management.id,
      });
    }
  };

  // Get Configuration List
  getConfigurationList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetConfigurationListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/unit_configuration`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetConfigurationListResponse = (responseJson: any) => {
    if (responseJson && responseJson.configuration) {
      this.setState({ configList: responseJson.configuration });
    }
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

  handleSaveUnitDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.getUnitDetail();
      toast.success("Details updated successfully");
    }
  };

  // Edit Family Member API
  handleEditFamilyMember = async (values: EditFamilyForm) => {
    var data = new FormData();
    data.append("name", values.name);
    data.append("relation_id", values.relation);
    data.append("id_proof_id", values.idProof);
    if (values.idNumber) {
      data.append("id_number", values.idNumber);
    } else {
      data.append("id_number", "");
    }

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditFamilyMemberCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_family/families/${this.state.familyId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleEditFamilyMemberResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      toast.success("Details updated successfully");
      this.getUnitDetail();
    }
  };

  // Delete Family Member API
  handleDeleteFamilyMember = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteFamilyMemberCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_family/families/${this.state.familyId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleDeleteFamilyMemberResponse = (responseJson: any) => {
    if (responseJson) {
      this.handleDeleteFamilyMemberModal();
      this.getUnitDetail();
      toast.success("Details deleted successfully");
    }
  };

  // Get Relation List API
  getRelationList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetRelationListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/relations`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetRelationListResponse = (responseJson: any) => {
    if (responseJson && responseJson.relaions) {
      this.setState({ relationList: responseJson.relaions });
    }
  };

  // Get ID Proof API
  getIDProofList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetIDProofListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/id_proofs`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetIDProofListResponse = (responseJson: any) => {
    if (responseJson && responseJson.relaions) {
      this.setState({ idProofList: responseJson.relaions });
    }
  };

  // Handle State
  editUnitDetailValidation = Yup.object().shape({
    size: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    configuration: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    purchasePrice: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    purchaseDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    currentValuation: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
  });

  editFamilyMemberValidation = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    relation: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idProof: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
  });

  openEditUnitModal = () => {
    this.setState(
      {
        editForm: {
          complexName: this.state.unitData.complexName || "-",
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

  openFamilyModal = (value: any) => {
    this.setState(
      {
        editFamilyForm: {
          name: value.attributes.name,
          relation: value.attributes.relation.id,
          idProof: value.attributes.id_proof.id,
          idNumber: value.attributes.id_number,
        },
      },
      () => {
        this.handleEditFamilyMemberModal();
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

  handleEditFamilyMemberModal = () => {
    this.setState({ isEditFamilyModalOpen: !this.state.isEditFamilyModalOpen });
  };

  handleDeleteFamilyMemberModal = () => {
    this.setState({ isDeleteFamilyModalOpen: !this.state.isDeleteFamilyModalOpen });
  };

  handleUnitText = (text: any) => {
    if (text) {
      return text;
    } else {
      return "-";
    }
  };

  openChat = async (id: any) => {
    let formData = new FormData();
    formData.append("chat[chatable_type]", "AccountBlock::Account");
    formData.append("chat[chatable_id]", localStorage.getItem("userId") || "{}");
    formData.append("chat[chat_with_account]", id);

    this.CreateChatRoomAPIId = await apiCall({
      method: "POST",
      endPoint: `bx_block_chat/chats`,
      body: formData,
    });
  };

  handleChatRoomAPIResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      localStorage.setItem("selectedChat", JSON.stringify(responseJson.data));
      // @ts-ignore
      this.props.history.push({
        pathname: "/chairmanchat",
        state: { data: responseJson.data },
      });
    }
  };
  // Customizable Area End
}
