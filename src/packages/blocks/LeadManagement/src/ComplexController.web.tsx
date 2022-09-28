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

interface ComplexData {
  logo: any;
  complexName: string;
  country: string;
  aboutUs: string;
  photos: any[];
  buildingList: any[];
  complexArea: string;
  totalUnits: string;
  totalBuilding: number;
}

interface EditForm {
  logo: any;
  displayLogo: any;
  aboutUs: string;
  photos: any[];
  complexArea: string;
  totalUnits: string;
  totalBuilding: number;
}

interface S {
  // Customizable Area Start
  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;

  dataSearch: any;
  documentCount: DocumentCount;

  complexDetails: any;
  complexData: ComplexData;

  editForm: EditForm;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ComplexController extends BlockComponent<Props, S, SS> {
  GetDocumentCountCallId: any;
  GetComplexDetailsCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      // Customizable Area Start
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

      complexDetails: null,
      complexData: {
        logo: null,
        complexName: "",
        country: "",
        aboutUs: "",
        photos: [],
        buildingList: [],
        complexArea: "",
        totalUnits: "",
        totalBuilding: 0,
      },

      editForm: {
        logo: null,
        displayLogo: null,
        photos: [],
        complexArea: "",
        aboutUs: "",
        totalUnits: "",
        totalBuilding: 0,
      },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
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

    // Get Complex Details API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetComplexDetailsCallId !== null &&
      this.GetComplexDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetComplexDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          complexDetails: responseJson.data,
          complexData: {
            ...this.state.complexData,
            logo: responseJson.data.attributes.logo,
            complexName: responseJson.data.attributes.name,
            country: "",
            aboutUs: responseJson.data.attributes.description,
            photos: responseJson.data.attributes.photos.map((image: any) => image.url),
            buildingList: [],
            complexArea: responseJson.data.attributes.complex_area,
            totalUnits: "",
            totalBuilding: responseJson.data.attributes.total_buildings,
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

  // Customizable Area Start
  uploadLogo: any;
  uploadImages: any;
  slider: any;
  
  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };

  async componentDidMount(): Promise<void> {
    this.getDocumentCount();
    this.getComplexDetails();
  }

  // Get Complex Details API
  getComplexDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetComplexDetailsCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/society_managements/${society_id}`
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
          logo: this.state.complexData.logo,
          displayLogo: this.state.complexData.logo,
          photos: this.state.complexData.photos,
          complexArea: this.state.complexData.complexArea,
          aboutUs: this.state.complexData.aboutUs,
          totalUnits: this.state.complexData.totalUnits,
          totalBuilding: this.state.complexData.totalBuilding,
        },
      },
      () => {
        this.handleEditBuildingModal();
      }
    );
  };
  // Customizable Area End
}
