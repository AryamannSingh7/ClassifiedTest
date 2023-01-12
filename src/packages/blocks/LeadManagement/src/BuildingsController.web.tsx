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

interface Pagination {
  current_page: any | number;
  next_page: any | number;
  prev_page: any | number;
  total_count: any | number;
  total_pages: any | number;
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
  city: string;
  country: string;
  logo: string;
  photos: any[];
  aboutBuilding: string;
  buildingArea: string;
  measurement: string;
  totalFloor: string;
  totalUnit: string;
  sharedAreaList: any[];
  lat: string;
  long: string;
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
  loading: boolean;

  imageBox: boolean;
  photoIndex: number;

  currentTab: number;

  isEditBuildingModalOpen: boolean;
  isOpenMapModalOpen: boolean;

  dataSearch: any;

  documentCount: DocumentCount;

  buildingId: string;
  buildingData: BuildingData;

  unitList: any[];
  pagination: any | Pagination;
  page: number;
  status: string;

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
  EditBuildingDetailCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
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

      buildingId: "",

      buildingData: {
        buildingName: "",
        city: "",
        country: "",
        logo: "",
        photos: [],
        aboutBuilding: "",
        buildingArea: "",
        measurement: "",
        totalFloor: "",
        totalUnit: "",
        sharedAreaList: [],
        lat: "",
        long: "",
      },

      unitList: [],
      pagination: null,
      page: 1,
      status: "-",

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
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        case this.GetUnitListCallId:
          if (responseJson && responseJson.apartment_managements) {
            this.setState({
              unitList: responseJson.apartment_managements.data,
              pagination: responseJson.meta.pagination,
            });
          }
          break;
        case this.GetDocumentCountCallId:
          this.handleDocumentCountResponse(responseJson);
          break;
        case this.GetBuildingDetailsCallId:
          this.handleBuildingDetailResponse(responseJson);
          break;
        case this.EditBuildingDetailCallId:
          if (responseJson && responseJson.data) {
            this.setState({ loading: false }, () => {
              toast.success("Details updated successfully");
              this.getBuildingDetail();
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

  async componentDidMount(): Promise<void> {
    const building_id = this.props.navigation.getParam("id");
    this.setState({ buildingId: building_id }, () => {
      this.getBuildingDetail();
      this.getDocumentCount();
      this.getUnitList();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.page !== this.state.page || prevState.status !== this.state.status) {
      await this.getUnitList();
    }
  }

  // Get Unit List API
  getUnitList = () => {
    const { page, status } = this.state;
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/apartment_list?building_management_id=${
        this.state.buildingId
      }&per_page=5&page=${page}&status=${status === "-" ? "" : status}`
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

  handleBuildingDetailResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({
        buildingData: {
          buildingName: responseJson.data.attributes.name,
          city: responseJson.data.attributes.city,
          country: responseJson.data.attributes.country,
          logo: responseJson.data.attributes.logo && responseJson.data.attributes.logo.url,
          photos: responseJson.data.attributes.photos,
          aboutBuilding: responseJson.data.attributes.description,
          buildingArea: responseJson.data.attributes.building_area,
          totalFloor: responseJson.data.attributes.total_floors,
          totalUnit: responseJson.data.attributes.total_units,
          sharedAreaList: responseJson.data.attributes.shared_area,
          lat: responseJson.data.attributes.lat,
          long: responseJson.data.attributes.long,
          measurement: responseJson.data.attributes.society_management.measurement_unit,
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

  handleSaveBuildingDetails = (values: EditForm) => {
    this.setState({ loading: true });

    let data = new FormData();
    data.append("building_management[name]", values.buildingName);
    data.append("building_management[building_area]", values.buildingArea);
    data.append("building_management[description]", values.aboutBuilding);

    if (typeof values.logo === "object" && values.logo !== null) {
      data.append("building_management[logo]", values.logo);
    }

    values.photos.map((image: any) => {
      data.append("building_management[photos][]", this.dataURLtoFile(image));
    });

    this.handleAPICallEditBuilding(data);
  };

  handleAPICallEditBuilding = (data: any) => {
    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditBuildingDetailCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/building_managements/${this.state.buildingId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

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

  dataURLtoFile = (dataurl: any) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "imageName.jpg", { type: mime });
  };

  editBuildingDetailValidation = Yup.object().shape({
    logo: Yup.mixed().required("Required"),
    aboutBuilding: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    buildingName: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    buildingArea: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    photos: Yup.array().min(1, "Required"),
  });

  openEditBuildingModal = async () => {
    this.setState({ loading: true });

    const imageUrlPromise: any[] = this.state.buildingData.photos.map(async (image: any) => {
      return new Promise(async (resolve, reject) => {
        let blobString = await this.toDataURL(image.url);
        resolve(blobString);
      });
    });
    let photos = await Promise.allSettled(imageUrlPromise);

    this.handleOpenEditBuildingState(photos);
  };

  handleOpenEditBuildingState = (photos: any) => {
    this.setState(
      {
        loading: false,
        editForm: {
          logo: this.state.buildingData.logo,
          displayLogo: this.state.buildingData.logo,
          photos: photos.map((image: any) => image.value),
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

  handleValidText = (text: any) => {
    if (text) {
      return text;
    } else {
      return "-";
    }
  };
  // Customizable Area End
}
