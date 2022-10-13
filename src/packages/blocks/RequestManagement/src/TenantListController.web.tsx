import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import toast from "react-hot-toast";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface TenantDetails {
  tenantName: string;
  tenantType: string;
  buildingName: string;
  unitNumber: string;
  city: string;
  phoneNumber: string;
  email: string;
  isLeaseIssued: string;
  IdType: string;
  IdNumber: string;
  IdExpDate: string;
}

interface S {
  loading: boolean;

  tenantList: any[];

  tenantId: string;
  tenantData: TenantDetails;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TenantListController extends BlockComponent<Props, S, SS> {
  GetTenantListCallId: any;
  GetTenantDetailsCallId: any;
  DeleteTenantCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      tenantList: [],

      tenantId: "",
      tenantData: {
        tenantName: "",
        tenantType: "",
        buildingName: "",
        unitNumber: "",
        city: "",
        phoneNumber: "",
        email: "",
        isLeaseIssued: "",
        IdType: "",
        IdNumber: "",
        IdExpDate: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Get All Tenant List - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetTenantListCallId !== null &&
      this.GetTenantListCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetTenantListCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.data) {
        this.setState({ tenantList: responseJson.data });
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
        this.setState({
          tenantData: {
            tenantName: responseJson.tenant.data.attributes.tenant.full_name,
            tenantType: responseJson.tenant.data.attributes.tenant_type,
            buildingName: responseJson.tenant.data.attributes.building_management.name,
            unitNumber: responseJson.tenant.data.attributes.apartment_management.apartment_name,
            city: responseJson.tenant.data.attributes,
            phoneNumber: responseJson.tenant.data.attributes.phone_number,
            email: responseJson.tenant.data.attributes.email,
            isLeaseIssued: responseJson.tenant.data.attributes,
            IdType: responseJson.tenant.data.attributes.id_proof.name,
            IdNumber: responseJson.tenant.data.attributes.id_number,
            IdExpDate: responseJson.tenant.data.attributes.id_expectation_date,
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

    // Delete Tenant - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteTenantCallId !== null &&
      this.DeleteTenantCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteTenantCallId = null;

      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (responseJson.code === 200) {
        this.setState({ loading: false });
        this.getTenantList();
        toast.success("Delete tenant successfully");
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

  // Get All Tenant List - API
  getTenantList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetTenantListCallId = apiRequest.messageId;

    // const society_id = localStorage.getItem("society_id");
    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_contract/tenant_resquests`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  // Get Tenant Details - API
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

  // Delete Tenant - API
  handleDeleteTenant = () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteTenantCallId = apiRequest.messageId;

    // const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contract/tenant_resquests/${this.state.tenantId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };
}
