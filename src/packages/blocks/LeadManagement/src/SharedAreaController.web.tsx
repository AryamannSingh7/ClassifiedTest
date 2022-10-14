import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from "yup";
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
  setComplexEditOpen: boolean;
  loading: boolean;

  imageBox: boolean;
  photoIndex: number;

  sharedAreaId: string;

  sharedAreaData: SharedAreaData;
  editForm: SharedAreaEditForm;

  buildings: any[];
  reservationList: any[];
  selectedBuilding: string;
  // Customizable Area End
}

interface SharedAreaEditForm {
  photos: any[];
  details: string;
  totalArea: string;
  fees: string;
  floorPlan: any;
  floorPlanName: string;
}

interface SharedAreaData {
  name: string;
  photos: any[];
  details: string;
  totalArea: string;
  reservationFee: string;
  floorPlan: any;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SharedAreaController extends BlockComponent<Props, S, SS> {
  GetSharedAreaDetailsCallId: any;
  EditSharedAreaCallId: any;
  GetUpcomingReservationListCallId: any;
  GetBuildingCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      setComplexEditOpen: false,
      loading: false,

      imageBox: false,
      photoIndex: 0,

      sharedAreaId: "",

      sharedAreaData: {
        name: "",
        photos: [],
        details: "",
        totalArea: "",
        reservationFee: "",
        floorPlan: null,
      },

      editForm: {
        photos: [],
        details: "",
        totalArea: "",
        fees: "",
        floorPlan: null,
        floorPlanName: "",
      },

      buildings: [],
      reservationList: [],
      selectedBuilding: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get Unit Detail API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetSharedAreaDetailsCallId !== null &&
      this.GetSharedAreaDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetSharedAreaDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({
          sharedAreaData: {
            name: responseJson.data.attributes.name,
            photos: responseJson.data.attributes.photos,
            details: responseJson.data.attributes.details,
            totalArea: responseJson.data.attributes.total_area,
            reservationFee: responseJson.data.attributes.reservation_fee,
            floorPlan: responseJson.data.attributes.floor_plan,
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

    // Edit Shared Area API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.EditSharedAreaCallId !== null &&
      this.EditSharedAreaCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.EditSharedAreaCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ loading: false }, () => {
          toast.success("Details updated successfully");
          this.getSharedAreaDetail();
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

    // Edit Shared Area API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetBuildingCallId !== null &&
      this.GetBuildingCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetBuildingCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ buildings: responseJson.data.buildings });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Edit Shared Area API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUpcomingReservationListCallId !== null &&
      this.GetUpcomingReservationListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUpcomingReservationListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ reservationList: responseJson.data });
      }

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
    this.setState({ sharedAreaId: unit_id }, () => {
      this.getSharedAreaDetail();
      this.getBuildingsList();
      this.getUpcomingReservationList();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.selectedBuilding !== this.state.selectedBuilding) {
      await this.getUpcomingReservationList();
    }
  }

  // Get Shared Area Detail API
  getSharedAreaDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetSharedAreaDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/common_areas/${this.state.sharedAreaId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Edit Shared Area API
  handleSaveSharedAreaDetails = (values: SharedAreaEditForm) => {
    this.setState({ loading: true });

    var data = new FormData();

    var data = new FormData();
    data.append("common_area[details]", values.details);
    data.append("common_area[total_area]", values.totalArea);
    data.append("common_area[reservation_fee]", values.fees);
    values.photos.map((image: any) => {
      data.append("common_area[photos][]", this.dataURLtoFile(image));
    });
    if (typeof values.floorPlan === "object" && values.floorPlan !== null) {
      data.append("common_area[floor_plan]", values.floorPlan);
    }

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditSharedAreaCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/common_areas/${this.state.sharedAreaId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Upcoming Reservation List API
  getUpcomingReservationList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUpcomingReservationListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/facility_reservations/upcoming_reservation?common_area_id=${this.state.sharedAreaId}&search_building=${this.state.selectedBuilding}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Buildings List API
  getBuildingsList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/building_list?society_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  slider: any;
  uploadFile: any;
  uploadImages: any;

  // Handle State
  nextImage = () => {
    this.slider.slickNext();
  };
  previousImage = () => {
    this.slider.slickPrev();
  };

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

  editAreaDetailValidation = Yup.object().shape({
    floorPlan: Yup.mixed().required("Required"),
    details: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    totalArea: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    fees: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    photos: Yup.array().min(1, "Required"),
  });

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

  openSharedAreaEditModal = async () => {
    this.setState({ loading: true });

    const imageUrlPromise: any[] = this.state.sharedAreaData.photos.map(async (image: any) => {
      return new Promise(async (resolve, reject) => {
        let blobString = await this.toDataURL(image.url);
        resolve(blobString);
      });
    });
    let photos = await Promise.allSettled(imageUrlPromise);

    this.setState(
      {
        loading: false,
        editForm: {
          photos: photos.map((image: any) => image.value),
          details: this.state.sharedAreaData.details || "",
          totalArea: this.state.sharedAreaData.totalArea || "",
          fees: this.state.sharedAreaData.reservationFee || "",
          floorPlan: this.state.sharedAreaData.floorPlan?.url || "",
          floorPlanName: this.state.sharedAreaData.floorPlan?.file_name || "",
        },
      },
      () => {
        this.handleSharedAreaEditModal();
      }
    );
  };

  handleSharedAreaEditModal = () => {
    this.setState({ setComplexEditOpen: !this.state.setComplexEditOpen });
  };

  // Customizable Area End
}
