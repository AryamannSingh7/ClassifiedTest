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

interface UnitData {
  lat: string;
  long: string;
  country: string;
  region: string;
  city: string;
  complex: string;
  building: string;
  unit: string;
  floor: string;
  size: string;
  measurement: string;
  currency: string;
  config: string;
  purchasePrice: string;
  purchaseDate: string;
  valuation: string;
  photos: any[];
  isPendingRequest: boolean;
  requestId: string;
}

interface RentData {
  status: string;
  tenantId: string;
  tenantName: string;
  startDate: string;
  endDate: string;
  charge: string;
}

interface S {
  isDeleteUnitModalOpen: boolean;
  loading: boolean;

  unitId: string;

  unitDetails: UnitData;
  rentDetails: RentData;

  rentHistory: any[];
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UnitDetailsController extends BlockComponent<Props, S, SS> {
  GetMyUnitDetailsCallId: any;
  GetRentHistoryCallId: any;
  DeLinkUnitCallId: any;
  DeleteRequestUnitCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isDeleteUnitModalOpen: false,
      loading: false,

      unitId: "",

      unitDetails: {
        lat: "",
        long: "",
        country: "",
        region: "",
        city: "",
        complex: "",
        building: "",
        unit: "",
        floor: "",
        size: "",
        measurement: "",
        currency: "",
        config: "",
        purchasePrice: "",
        purchaseDate: "",
        valuation: "",
        photos: [],
        isPendingRequest: false,
        requestId: "",
      },
      rentDetails: {
        status: "",
        tenantId: "",
        tenantName: "",
        startDate: "",
        endDate: "",
        charge: "",
      },

      rentHistory: [],
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
        case this.GetMyUnitDetailsCallId:
          this.getMyUnitDetailsResponse(responseJson);
          break;
        case this.GetRentHistoryCallId:
          this.getRentHistoryResponse(responseJson);
          break;
        case this.DeLinkUnitCallId:
          this.deLinkUnitFromOwnerResponse(responseJson);
          break;
        case this.DeleteRequestUnitCallId:
          this.deleteRequestUnitResponse(responseJson);
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

  slider: any;

  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getMyUnitDetails();
      this.getRentHistory();
    });
  }

  getMyUnitDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetMyUnitDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getMyUnitDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const unit = responseJson.data;
      this.setState(
        {
          unitDetails: {
            lat: unit.attributes.lat,
            long: unit.attributes.long,
            country: unit.attributes.country,
            region: unit.attributes.region,
            city: unit.attributes.city,
            complex: unit.attributes.society_management.name,
            building: unit.attributes.building_management.name,
            unit: unit.attributes.apartment_name,
            floor: unit.attributes.floor_number,
            size: unit.attributes.size,
            config: unit.attributes.configuration,
            purchasePrice: unit.attributes.purchase_price,
            purchaseDate: unit.attributes.purchase_date,
            valuation: unit.attributes.current_valuation,
            photos: unit.attributes.photos,
            isPendingRequest: unit.attributes.request.status === "Requested",
            requestId: unit.attributes.request.id,
            measurement: unit.attributes.society_management.measurement_unit,
            currency: unit.attributes.currency && unit.attributes.currency.currency,
          },
          rentDetails: {
            ...this.state.rentDetails,
            status: unit.attributes.status,
          },
        },
        () => {
          this.handleTenantRentHistoryResponse(unit.attributes.rent_status);
        }
      );
    }
  };

  handleTenantRentHistoryResponse = (tenant: any) => {
    let tenant_id = "";
    if (tenant.data && tenant.data.attributes.tenant) {
      tenant_id = tenant.data.attributes.tenant.data.id;
    }
    this.setState({
      rentDetails: {
        ...this.state.rentDetails,
        tenantId: tenant_id,
        tenantName: tenant.data ? tenant.data.attributes.tenant_name : "",
        startDate: tenant.data ? tenant.data.attributes.start_date : "",
        endDate: tenant.data ? tenant.data.attributes.end_date : "",
        charge: tenant.data ? tenant.data.attributes.rent_amount : "",
      },
    });
  };

  getRentHistory = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetRentHistoryCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/rent_histories?apartment_management_id=${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  getRentHistoryResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ rentHistory: responseJson.data });
    }
  };

  deLinkUnitFromOwner = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeLinkUnitCallId = apiRequest.messageId;

    const owner_id = localStorage.getItem("userId");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/delink_user?apartment_management_id=${this.state.unitId}&account_id=${owner_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  deLinkUnitFromOwnerResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.code === 200) {
        toast.success(responseJson.message);
        this.props.navigation.navigate("MyUnitList");
      }
    });
  };

  handleDeleteUnitModal = () => {
    this.setState({ isDeleteUnitModalOpen: !this.state.isDeleteUnitModalOpen });
  };

  deleteRequestUnit = (unit: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteRequestUnitCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/requests/${unit}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeDelete);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  deleteRequestUnitResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.code === 200) {
        toast.success(responseJson.message);
        this.props.navigation.navigate("MyUnitList");
      }
    });
  };

  validationText = (name: any) => {
    if (name) {
      return name;
    }
    return "-";
  };

  handleEmptyText = (name: any) => {
    if (name) {
      return name;
    }
    return "";
  };
}
