import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import * as Yup from "yup";
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
  loading: boolean;
  isRegisterTenantOpen: boolean;
  isNowContract: boolean;

  buildingList: any[];
  unitList: any[];
  idTypeList: any[];

  registerTenantForm: TenantForm;

  contract: any;
  contractPageCount: string;

  tenantId: string;
  tenantDetails: any;

  isTenant: any;
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
  GetTenantDetailsForEditCallId: any;
  EditTenantCallId: any;
  CreateTenantForContractCallId: any;
  IsTenantExistCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isRegisterTenantOpen: true,
      isNowContract: true,

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

      isTenant: null,
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
        case this.GetBuildingListCallId:
          this.handleGetBuildingListResponse(responseJson);
          break;
        case this.GetUnitListCallId:
          this.handleGetUnitListResponse(responseJson);
          break;
        case this.GetIDTypeListCallId:
          this.handleGetIdTypeListResponse(responseJson);
          break;
        case this.CreateTenantCallId:
          this.handleSubmitRegisterTenantResponse(responseJson);
          break;
        case this.CreateTenantForContractCallId:
          this.handleSubmitTenantForContractResponse(responseJson);
          break;
        case this.GetTenantDetailsCallId:
          this.handleGetTenantDetailsResponse(responseJson);
          break;
        case this.CreateContractCallId:
          this.handleSubmitTenantContractResponse(responseJson);
          break;
        case this.GetTenantDetailsForEditCallId:
          this.handleGetTenantDetailsForEditResponse(responseJson);
          break;
        case this.EditTenantCallId:
          this.handleEditTenantResponse(responseJson);
          break;
        case this.IsTenantExistCallId:
          this.handleCheckTenantExistResponse(responseJson);
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

  handleGetBuildingListResponse = (responseJson: any) => {
    if (responseJson && responseJson.buildings) {
      this.setState({ buildingList: responseJson.buildings });
    }
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
      `society_managements/${society_id}/bx_block_contract/tenant_resquests/find_unit?building_management_id=${building}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetUnitListResponse = (responseJson: any) => {
    if (responseJson && responseJson.apartments) {
      this.setState({ unitList: responseJson.apartments });
    }
  };

  getIdTypeList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetIDTypeListCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_family/id_proofs`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetIdTypeListResponse = (responseJson: any) => {
    if (responseJson && responseJson.relaions) {
      this.setState({ idTypeList: responseJson.relaions });
    }
  };

  // Find Unit Tenant Exist - API
  handleCheckTenantExist = (unit: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.IsTenantExistCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_contract/contracts/find_tenant?apartment_management_id=${unit}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleCheckTenantExistResponse = (responseJson: any) => {
    if (responseJson) {
      this.setState({ isTenant: responseJson.account !== null });
    }
  };

  handleSubmitRegisterTenant = (values: TenantForm, isNowContract: boolean) => {
    this.setState({ loading: true, isNowContract: isNowContract });
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
    otherDocument.map((document: any) => {
      data.append("[tenant_resquest][tenant_documents][]", document);
    });

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

  handleSubmitRegisterTenantResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        toast.success("Tenant created successfully");
        localStorage.removeItem("isComingFromContract");
        if (this.state.isNowContract) {
          this.props.navigation.navigate("IssueLease");
        } else {
          this.props.navigation.navigate("TenantList");
        }
      }
    });
  };

  handleEditTenant = (values: TenantForm) => {
    this.setState({ loading: true });
    const otherDocument: any = [...values.otherDocument];

    var data = new FormData();
    data.append("[tenant_resquest][name]", values.tenantName);
    data.append("[tenant_resquest][phone_number]", values.tenantCountryCode + "-" + values.tenantMobile);
    data.append("[tenant_resquest][id_proof_id]", values.idType);
    data.append("[tenant_resquest][id_number]", values.idNumber);
    data.append("[tenant_resquest][id_expectation_date]", values.idDate);
    data.append("[tenant_resquest][tenant_type]", values.tenantType);
    data.append("[tenant_resquest][tenant_id_copy]", values.idCard[0]);
    otherDocument.map((document: any) => {
      data.append("[tenant_resquest][tenant_documents][]", document);
    });

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditTenantCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contract/tenant_resquests/${this.state.tenantId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePut);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleEditTenantResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        toast.success("Tenant updated successfully");
        this.props.navigation.navigate("TenantDetails", { id: responseJson.data.id });
      }
    });
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

  handleGetTenantDetailsResponse = (responseJson: any) => {
    if (responseJson.code === 200) {
      this.setState({ tenantDetails: responseJson.tenant.data }, () => {
        this.handleSubmitTenantContract();
      });
    }
  };

  getTenantDetailsForEdit = () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTenantDetailsForEditCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contract/tenant_resquests/${this.state.tenantId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetTenantDetailsForEditResponse = async (responseJson: any) => {
    if (responseJson.code === 200) {
      const tenant = responseJson.tenant.data;

      const IdCardCopy: any[] = [tenant.attributes.tenant_id_copy];

      const IdCardCopyUrlPromise: any[] = IdCardCopy.map(async (file: any) => {
        return new Promise(async (resolve, reject) => {
          let blobString = await this.fileUrlToDataURL(file.url);
          resolve(blobString);
        });
      });

      let IdCardCopyFilesPromise = await Promise.allSettled(IdCardCopyUrlPromise);
      let IdCardCopyFiles = IdCardCopyFilesPromise.map((file: any) => file.value);

      const IdCardFile = IdCardCopyFiles.map((blobString: any, index: number) => {
        return this.dataURLtoFileObject(blobString, IdCardCopy[index].file_name);
      });

      const otherDocumentUrlPromise: any[] = tenant.attributes.tenant_documents.map(async (file: any) => {
        return new Promise(async (resolve, reject) => {
          let blobString = await this.fileUrlToDataURL(file.url);
          resolve(blobString);
        });
      });

      let otherDocumentFilesPromise = await Promise.allSettled(otherDocumentUrlPromise);
      let otherDocumentFiles = otherDocumentFilesPromise.map((file: any) => file.value);

      const otherDocumentFile = otherDocumentFiles.map((blobString: any, index: number) => {
        return this.dataURLtoFileObject(blobString, tenant.attributes.tenant_documents[index].file_name);
      });

      this.setState({
        loading: false,
        registerTenantForm: {
          tenantType: tenant.attributes.tenant_type,
          tenantName: tenant.attributes.tenant.full_name,
          tenantCountryCode: tenant.attributes.phone_number.split("-")[0],
          tenantMobile: tenant.attributes.phone_number.split("-")[1],
          tenantEmail: tenant.attributes.email,
          building: tenant.attributes.building_management.name,
          unit: tenant.attributes.apartment_management.apartment_name,
          idType: tenant.attributes.id_proof.id,
          idNumber: tenant.attributes.id_number,
          idDate: tenant.attributes.id_expectation_date,
          idCard: IdCardFile,
          otherDocument: otherDocumentFile,
        },
      });
    }
  };

  // Create Tenant For Contract - API
  handleSubmitTenantForContract = (values: TenantForm) => {
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
    otherDocument.map((document: any) => {
      data.append("[tenant_resquest][tenant_documents][]", document);
    });

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateTenantForContractCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_contract/tenant_resquests`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleSubmitTenantForContractResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ tenantId: responseJson.data.id }, () => {
        this.getTenantDetails();
      });
    }
  };

  handleSubmitTenantContract = () => {
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

  handleSubmitTenantContractResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson.code === 200) {
        toast.success("Tenant created successfully");
        this.props.navigation.navigate("TenantList");
      }
    });
  };

  validationRegisterTenantFormSchema: any = Yup.object().shape({
    tenantType: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    tenantName: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^[aA-zZ\s]+$/, "Only character are allowed"),
    tenantMobile: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^[0-9]{9,9}$/, { message: "Please enter valid number" }),
    tenantEmail: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .email("Please enter valid email"),
    building: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unit: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .test("unit", "Already tenant available to this unit", (value: any) => {
        if (value) {
          return this.state.isTenant === false;
        }
        return true;
      }),
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

  handleChangePage = () => {
    this.setState({
      isRegisterTenantOpen: !this.state.isRegisterTenantOpen,
    });
  };
}
