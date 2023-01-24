import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
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
  city: string;
  aboutUs: string;
  photos: any[];
  complexArea: string;
  measurement: string;
  totalUnits: string;
  totalBuilding: number;
  buildingList: any[];
  sharedAreaList: any[];
  lat: string;
  long: string;
}

interface EditForm {
  logo: any;
  displayLogo: any;
  photos: any[];
  aboutUs: string;
  complexArea: string;
  measurement: string;
  totalUnits: string;
  totalBuilding: number;
  lat: string;
  long: string;
}

interface S {
  // Customizable Area Start
  loading: boolean;

  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;
  isOpenMapModalOpen: boolean;

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
  GetBuildingListCallId: any;
  EditComplexDetailCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      // Customizable Area Start
      loading: false,

      imageBox: false,
      photoIndex: 0,

      currentTab: 0,

      isEditBuildingModalOpen: false,
      isOpenMapModalOpen: false,

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
        city: "",
        aboutUs: "",
        photos: [],
        complexArea: "",
        measurement: "",
        totalUnits: "",
        totalBuilding: 0,
        buildingList: [],
        sharedAreaList: [],
        lat: "",
        long: "",
      },

      editForm: {
        logo: null,
        displayLogo: null,
        photos: [],
        complexArea: "",
        measurement: "",
        aboutUs: "",
        totalUnits: "",
        totalBuilding: 0,
        lat: "",
        long: "",
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
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.GetDocumentCountCallId:
          this.handleDocumentCountResponse(responseJson);
          break;
        case this.GetComplexDetailsCallId:
          this.handleComplexDetailsResponse(responseJson);
          break;
        case this.EditComplexDetailCallId:
          if (responseJson.data) {
            this.setState({ loading: false }, () => {
              toast.success("Details updated successfully");
              this.getComplexDetails();
            });
          }
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

  handleComplexDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({
        complexDetails: responseJson.data,
        complexData: {
          ...this.state.complexData,
          logo: responseJson.data.attributes.logo && responseJson.data.attributes.logo.url,
          complexName: responseJson.data.attributes.name,
          city: responseJson.data.attributes.city,
          aboutUs: responseJson.data.attributes.description,
          photos: responseJson.data.attributes.photos,
          complexArea: responseJson.data.attributes.complex_area,
          measurement: responseJson.data.attributes.measurement_unit,
          totalUnits: responseJson.data.attributes.total_units && responseJson.data.attributes.total_units[0],
          totalBuilding: responseJson.data.attributes.total_buildings,
          buildingList: responseJson.data.attributes.building_list,
          sharedAreaList: responseJson.data.attributes.shared_area,
          lat: responseJson.data.attributes.lat,
          long: responseJson.data.attributes.long,
        },
      });
    }
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

  handleDocumentCountResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
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
  };

  // Edit Complex Detail API
  handleSaveComplexDetails = async (values: EditForm) => {
    this.setState({ loading: true });
    let data = new FormData();
    data.append("society_management[description]", values.aboutUs);
    data.append("society_management[complex_area]", values.complexArea);
    data.append("society_management[latitude]", values.lat);
    data.append("society_management[longitude]", values.long);
    data.append("society_management[measurement_unit]", values.measurement);

    if (typeof values.logo === "object" && values.logo !== null) {
      data.append("society_management[logo]", values.logo);
    }

    values.photos.forEach((image: any) => {
      data.append("society_management[photos][]", this.dataURLtoFile(image));
    });

    this.handleEditComplexAPICall(data);
  };

  handleEditComplexAPICall = (data: any) => {
    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditComplexDetailCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/society_managements/${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Handle State
  handleTabChange = (event: any, newValue: number) => {
    this.setState({ currentTab: newValue });
  };

  handleEditComplexModal = () => {
    this.setState({ isEditBuildingModalOpen: !this.state.isEditBuildingModalOpen });
  };

  handleMapModal = () => {
    this.setState({ isOpenMapModalOpen: !this.state.isOpenMapModalOpen });
  };

  toDataURL = (url: any) =>
    fetch(url)
      .then((response: any) => response.blob())
      .then(
        (blob: any) =>
          new Promise((resolve: any, reject: any) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  dataURLtoFile = (dataUrl: any) => {
    let arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "imageName.jpg", { type: mime });
  };

  editComplexDetailValidation = Yup.object().shape({
    logo: Yup.mixed().required("Required"),
    aboutUs: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    complexArea: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    measurement: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .nullable(),
    lat: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .nullable(),
    long: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .nullable(),
    photos: Yup.array().min(1, "Required"),
  });

  openEditBuildingModal = async () => {
    this.setState({ loading: true });

    const imageUrlPromise: any[] = this.state.complexData.photos.map(async (image: any) => {
      return new Promise(async (resolve, reject) => {
        let blobString = await this.toDataURL(image.url);
        resolve(blobString);
      });
    });
    let photos = await Promise.allSettled(imageUrlPromise);

    this.updateStateOpenBuildingModal(photos);
  };

  updateStateOpenBuildingModal = (photos: any) => {
    this.setState(
      {
        loading: false,
        editForm: {
          logo: this.state.complexData.logo,
          displayLogo: this.state.complexData.logo,
          photos: photos.map((image: any) => image.value),
          complexArea: this.state.complexData.complexArea,
          measurement: this.state.complexData.measurement,
          aboutUs: this.state.complexData.aboutUs,
          totalUnits: this.state.complexData.totalUnits,
          totalBuilding: this.state.complexData.totalBuilding,
          lat: this.state.complexData.lat,
          long: this.state.complexData.long,
        },
      },
      () => {
        this.handleEditComplexModal();
      }
    );
  };
  // Customizable Area End
}
