import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface DocumentCount {
  policy: number;
  guidelines: number;
  roles: number;
  resolution: number;
  buildingPlans: number;
}

interface BuildingData {
  buildingName: string;
  country: string;
  logo: string;
  photos: any[];
  aboutBuilding: string;
  buildingArea: string;
  totalFloor: string;
  totalUnit: string;
}

interface EditForm {
  logo: string;
  displayLogo: string;
  photos: any[];
  buildingArea: string;
  aboutBuilding: string;
  buildingName: string;
  totalUnits: string;
  totalFloor: string;
  country: string;
}

interface S {
  // Customizable Area Start
  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;

  dataSearch: any;

  documentCount: DocumentCount;

  buildingId: string;
  buildingData: BuildingData;

  unitList: any[];

  editForm: EditForm;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BuildingsController extends BlockComponent<Props, S, SS> {
  GetDocumentCountCallId: any;
  GetBuildingDetailsCallId: any;
  GetUnitListCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      imageBox: false,
      photoIndex: 0,

      currentTab: 0,

      isEditBuildingModalOpen: false,

      dataSearch: "",

      documentCount: {
        policy: 0,
        guidelines: 0,
        roles: 0,
        resolution: 0,
        buildingPlans: 0,
      },

      buildingId: "",

      buildingData: {
        buildingName: "",
        country: "",
        logo: "",
        photos: [],
        aboutBuilding: "",
        buildingArea: "",
        totalFloor: "",
        totalUnit: "",
      },

      unitList: [],

      editForm: {
        logo: "",
        displayLogo: "",
        photos: [],
        buildingArea: "",
        aboutBuilding: "",
        buildingName: "",
        totalUnits: "",
        totalFloor: "",
        country: "",
      },
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
    // Get Unit List API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUnitListCallId !== null &&
      this.GetUnitListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUnitListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ unitList: responseJson.data.unit_apartments });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Building Details API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetBuildingDetailsCallId !== null &&
      this.GetBuildingDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetBuildingDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          buildingData: {
            buildingName: responseJson.data.attributes.name,
            country: "",
            logo: responseJson.data.attributes.logo,
            photos: responseJson.data.attributes.photos.map((image: any) => image.url),
            aboutBuilding: responseJson.data.attributes.description,
            buildingArea: responseJson.data.attributes.building_area,
            totalFloor: responseJson.data.attributes.total_floors,
            totalUnit: responseJson.data.attributes.total_units,
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

    // Get Document Count API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetDocumentCountCallId !== null &&
      this.GetDocumentCountCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetDocumentCountCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          documentCount: {
            policy: responseJson.data.policy_count,
            guidelines: responseJson.data.guideline_count,
            roles: responseJson.data.role_count,
            resolution: responseJson.data.resolution_count,
            buildingPlans: responseJson.data.building_plan_count,
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
    // Customizable Area End
  }

  async componentDidMount(): Promise<void> {
    const building_id = this.props.navigation.getParam("id");
    this.setState({ buildingId: building_id }, () => {
      this.getBuildingDetail();
      this.getDocumentCount();
      this.getUnitList();
    });
  }

  // Get Unit List API
  getUnitList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/apartment_list?id=${this.state.buildingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Building Details API
  getBuildingDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/building_managements/${this.state.buildingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Document Count API
  getDocumentCount = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetDocumentCountCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_my_document/document_count`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  slider: any;
  uploadLogo: any;
  uploadImages: any;

  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };

  handleTabChange = (event: any, newValue: number) => {
    this.setState({ currentTab: newValue });
  };

  handleEditBuildingModal = () => {
    this.setState({ isEditBuildingModalOpen: !this.state.isEditBuildingModalOpen });
  };

  openEditBuildingModal = () => {
    this.setState(
      {
        editForm: {
          logo: this.state.buildingData.logo,
          displayLogo: this.state.buildingData.logo,
          photos: this.state.buildingData.photos,
          buildingArea: this.state.buildingData.buildingArea,
          aboutBuilding: this.state.buildingData.aboutBuilding,
          buildingName: this.state.buildingData.buildingName,
          totalUnits: this.state.buildingData.totalUnit,
          totalFloor: this.state.buildingData.totalFloor,
          country: this.state.buildingData.country,
        },
      },
      () => {
        this.handleEditBuildingModal();
      }
    );
  };
  // Customizable Area End
}
