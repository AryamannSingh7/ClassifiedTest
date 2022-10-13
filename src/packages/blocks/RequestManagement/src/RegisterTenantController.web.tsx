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

interface S {
  loading: boolean;

  buildingList: any[];
  unitList: any[];
  idTypeList: any[];

  registerTenantForm: TenantForm;

  contract: any;
  contractPageCount: string;

  tenantId: string;
  tenantDetails: any;
}

interface TenantForm {
  tenantType: string;
  tenantName: string;
  tenantEmail: string;
  tenantCountryCode: string;
  tenantMobile: string;
  building: string;
  unit: string;
  idType: string;
  idNumber: string;
  idDate: string;
  idCard: any[];
  otherDocument: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RegisterTenantController extends BlockComponent<Props, S, SS> {
  GetBuildingListCallId: any;
  GetUnitListCallId: any;
  GetIDTypeListCallId: any;
  CreateTenantCallId: any;
  GetTenantDetailsCallId: any;
  CreateContractCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      buildingList: [],
      unitList: [],
      idTypeList: [],

      registerTenantForm: {
        tenantType: "",
        tenantName: "",
        tenantCountryCode: "+971",
        tenantMobile: "",
        tenantEmail: "",
        building: "",
        unit: "",
        idType: "",
        idNumber: "",
        idDate: "",
        idCard: [],
        otherDocument: [],
      },

      contract: null,
      contractPageCount: "",

      tenantId: "",
      tenantDetails: null,
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

    // Create Tenant - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateTenantCallId !== null &&
      this.CreateTenantCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateTenantCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ loading: false });
        toast.success("Tenant created successfully");
        this.props.navigation.navigate("RegisterTenantContract", { id: responseJson.data.id });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Get Tenant Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTenantDetailsCallId !== null &&
      this.GetTenantDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTenantDetailsCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({ tenantDetails: responseJson.tenant.data });
      }

      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      } else {
        ApiErrorResponse(responseJson);
      }
      ApiCatchErrorResponse(errorResponse);
    }

    // Create Contract  - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.CreateContractCallId !== null &&
      this.CreateContractCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.CreateContractCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({ loading: false });
        toast.success("Contract created successfully");
        this.props.navigation.navigate("TenantList");
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

  uploadIDCard: any;
  uploadOtherDocument: any;
  uploadContract: any;

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

  handleSubmitRegisterTenant = (values: TenantForm) => {
    this.setState({ loading: true });
    const otherDocument: any = [...values.otherDocument];
    var data = new FormData();
    data.append("[tenant_resquest][name]", values.tenantName);
    data.append("[tenant_resquest][phone_number]", values.tenantCountryCode + "-" + values.tenantMobile);
    data.append("[tenant_resquest][email]", values.tenantEmail);
    data.append("[tenant_resquest][building_management_id]", values.building);
    data.append("[tenant_resquest][apartment_management_id]", values.unit);
    data.append("[tenant_resquest][id_proof_id]", values.idType);
    data.append("[tenant_resquest][id_number]", values.idNumber);
    data.append("[tenant_resquest][id_expectation_date]", values.idDate);
    data.append("[tenant_resquest][tenant_type]", values.tenantType);
    data.append("[tenant_resquest][tenant_id_copy]", values.idCard[0]);
    data.append("[tenant_resquest][tenant_documents]", otherDocument);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateTenantCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_contract/tenant_resquests`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getTenantDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTenantDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contract/tenant_resquests/${this.state.tenantId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleSubmitTenantContract = () => {
    this.setState({ loading: true });
    var data = new FormData();
    data.append("[contract][apartment_management_id]", this.state.tenantDetails.attributes.apartment_management_id);
    data.append("[contract][account_id]", this.state.tenantDetails.attributes.account.id);
    data.append("[contract][tenant_id]", this.state.tenantDetails.attributes.tenant.id);
    data.append("[contract][building_management_id]", this.state.tenantDetails.attributes.building_management.id);
    data.append(
      "[contract][society_management_id]",
      this.state.tenantDetails.attributes.building_management.society_management_id
    );
    data.append("[contract][landlord_name]", this.state.tenantDetails.attributes.account.full_name);
    data.append("[contract][tenant_name]", this.state.tenantDetails.attributes.tenant.full_name);
    data.append("[contract][custom_contract_image]", this.state.contract);
    data.append("[contract][custom_contract]", "true");

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateContractCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  validationRegisterTenantFormSchema: any = Yup.object().shape({
    tenantType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    tenantName: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    tenantMobile: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^[6-9]\d{9}$/, { message: "Please enter valid number" }),
    tenantEmail: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .email("Please enter valid email"),
    building: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unit: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idNumber: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    idCard: Yup.array()
      .min(1, "Required")
      .nullable(),
    otherDocument: Yup.array()
      .min(1, "Required")
      .nullable(),
  });

  niceBytes = (x: any) => {
    const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let l = 0;
    let n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
  };
}
