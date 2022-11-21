import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  loading: boolean;
  isAddPropertyModalOpen: boolean;

  buildingList: any[];
  unitList: any[];
  idTypeList: any[];

  propertyManagerForm: PropertyManagerForm;

  propertyForm: PropertyForm;
  isPropertyManagerAvailable: boolean;

  propertyId: string;
  propertyList: any[];

  editManagerId: string;
}

interface PropertyManagerForm {
  companyName: string;
  managerName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  idType: string;
  idNumber: string;
  idDate: string;
  idCardFile: any;
}

interface PropertyForm {
  country: string;
  city: string;
  buildingId: string;
  unitId: string;
  buildingName: string;
  unitName: string;
  startDate: string;
  endDate: string;
  feeType: string;
  rent: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RegisterPropertyManagerController extends BlockComponent<Props, S, SS> {
  GetIDTypeListCallId: any;
  GetBuildingListCallId: any;
  GetUnitListCallId: any;
  CreatePropertyManagerCallId: any;
  CheckPropertyManagerAvailableCallId: any;
  GetComplexDetailsCallId: any;
  GetPropertyManagerDetailCallId: any;
  GetPropertyListCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isAddPropertyModalOpen: false,

      buildingList: [],
      unitList: [],
      idTypeList: [],

      propertyManagerForm: {
        companyName: "",
        managerName: "",
        email: "",
        countryCode: "+971",
        mobileNumber: "",
        idType: "",
        idNumber: "",
        idDate: "",
        idCardFile: null,
      },

      propertyForm: {
        country: "",
        city: "",
        buildingId: "",
        unitId: "",
        buildingName: "",
        unitName: "",
        startDate: "",
        endDate: "",
        feeType: "",
        rent: "",
      },
      isPropertyManagerAvailable: false,

      propertyId: "",
      propertyList: [],

      editManagerId: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get All Building List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetBuildingListCallId !== null &&
      this.GetBuildingListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetBuildingListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.buildings) {
        this.setState({ buildingList: responseJson.buildings });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get All Unit List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetUnitListCallId !== null &&
      this.GetUnitListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetUnitListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.apartments) {
        this.setState({ unitList: responseJson.apartments });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get All Id Type List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetIDTypeListCallId !== null &&
      this.GetIDTypeListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetIDTypeListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.relaions) {
        this.setState({ idTypeList: responseJson.relaions });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Create Property Manager - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreatePropertyManagerCallId !== null &&
      this.CreatePropertyManagerCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreatePropertyManagerCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.setState({ loading: false }, () => {
        if (responseJson && responseJson.data) {
          sessionStorage.clear();
          this.props.navigation.navigate("RegisterPropertyManagerSuccess");
        }
      });

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Check Property Manager Available - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CheckPropertyManagerAvailableCallId !== null &&
      this.CheckPropertyManagerAvailableCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CheckPropertyManagerAvailableCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.message) {
        this.setState({ isPropertyManagerAvailable: true });
      } else {
        this.setState({ isPropertyManagerAvailable: false });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Complex Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetComplexDetailsCallId !== null &&
      this.GetComplexDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetComplexDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.complex && responseJson.complex_address) {
        this.setState({
          propertyForm: {
            ...this.state.propertyForm,
            country: responseJson.complex_address.country,
            city: responseJson.complex_address.city,
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

    // Get Property Manager Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetPropertyManagerDetailCallId !== null &&
      this.GetPropertyManagerDetailCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetPropertyManagerDetailCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson && responseJson.data) {
        const manager = responseJson.data;
        const IdCardCopy: any[] = [manager.attributes.image];

        const IdCardCopyUrlPromise: any[] = IdCardCopy.map(async (file: any) => {
          return new Promise(async (resolve, reject) => {
            let blobString = await this.fileUrlToDataURL(file.url);
            resolve(blobString);
          });
        });

        let IdCardCopyFilesPromise = await Promise.allSettled(IdCardCopyUrlPromise);
        let IdCardCopyFiles = IdCardCopyFilesPromise.map((file: any) => file.value);

        const IdCardFile = IdCardCopyFiles.map((blobString: any, index: number) => {
          return this.dataURLtoFileObject(blobString, manager.attributes.name + " " + manager.attributes.id_proof.name);
        });

        this.setState({
          propertyManagerForm: {
            companyName: manager.attributes.company_name,
            managerName: manager.attributes.name,
            email: manager.attributes.email,
            countryCode: manager.attributes.mobile_number.split("-")[0],
            mobileNumber: manager.attributes.mobile_number.split("-")[1],
            idType: manager.attributes.id_proof.id,
            idNumber: manager.attributes.id_number,
            idDate: manager.attributes.id_expiration_date,
            idCardFile: IdCardFile[0],
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
  }

  // Customizable Area Start
  uploadIDCard: any;

  getBuildingList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetBuildingListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/find_building`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getUnitList = (building: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/find_unit?building_management_id=${building}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getIdTypeList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetIDTypeListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/id_proofs`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  createPropertyManager = (values: any) => {
    const ownerId = localStorage.getItem("userId") as any;
    var data = new FormData();

    data.append("company_name", values.companyName);
    data.append("name", values.managerName);
    data.append("email", values.email);
    data.append("mobile_number", values.countryCode + "-" + values.mobileNumber);
    data.append("id_proof_id", values.idType);
    data.append("id_number", values.idNumber);
    data.append("id_expiration_date", values.idDate);
    data.append("image", values.idCardFile);

    for (let i = 0; i < this.state.propertyList.length; i++) {
      data.append(`properties_attributes[${i}][building_management_id]`, this.state.propertyList[i].buildingId);
      data.append(`properties_attributes[${i}][apartment_management_id]`, this.state.propertyList[i].unitId);
      data.append(`properties_attributes[${i}][start_date]`, this.state.propertyList[i].startDate);
      data.append(`properties_attributes[${i}][end_date]`, this.state.propertyList[i].endDate);
      data.append(`properties_attributes[${i}][fees_type]`, this.state.propertyList[i].feeType);
      data.append(`properties_attributes[${i}][fixed_persentage_of_rent]`, this.state.propertyList[i].rent);
      data.append(`properties_attributes[${i}][account_id]`, ownerId);
    }

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreatePropertyManagerCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

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
      `bx_block_request_management/find_complex?society_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getPropertyList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/find_complex?society_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getPropertyManagerDetail = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetPropertyManagerDetailCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/property_manager_requests/${this.state.editManagerId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  checkPropertyManagerAvailable = (unit: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CheckPropertyManagerAvailableCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_property_manager/properties/verify_property?apartment_management_id=${unit}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  registerPropertyManagerFormSchema: any = Yup.object().shape({
    companyName: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    managerName: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    email: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .email("Please enter valid email"),
    mobileNumber: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^[0-9]{6,10}$/, { message: "Please enter valid number" }),
    idType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idNumber: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idCardFile: Yup.array()
      .min(1, "Required")
      .nullable(),
  });

  registerPropertyFormSchema: any = Yup.object().shape({
    buildingId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unitId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .test("unitId", "Property Manager is available for this unit", (value: any) => {
        if (value) {
          return this.state.isPropertyManagerAvailable;
        }
        return true;
      }),
    startDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    feeType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    rent: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
  });

  handleOpenAddPropertyModal = () => {
    this.setState({
      isAddPropertyModalOpen: !this.state.isAddPropertyModalOpen,
    });
  };

  handleCloseAddPropertyModal = () => {
    this.setState({
      isAddPropertyModalOpen: !this.state.isAddPropertyModalOpen,
      propertyId: "",
      propertyForm: {
        ...this.state.propertyForm,
        buildingId: "",
        unitId: "",
        buildingName: "",
        unitName: "",
        startDate: "",
        endDate: "",
        feeType: "",
        rent: "",
      },
    });
  };

  fileUrlToDataURL = (url: any) =>
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

  dataURLtoFileObject = (dataurl: any, fileName: any) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };
  // Customizable Area End
}
