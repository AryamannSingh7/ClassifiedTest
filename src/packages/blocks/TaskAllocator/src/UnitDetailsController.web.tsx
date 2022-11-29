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
    let responseJson: any;
    let errorResponse: any;
    // Get Unit Details - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetMyUnitDetailsCallId !== null &&
      this.GetMyUnitDetailsCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetMyUnitDetailsCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getMyUnitDetailsResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Get Rent History - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.GetRentHistoryCallId !== null &&
      this.GetRentHistoryCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.GetRentHistoryCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.getRentHistoryResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // DeLink Unit - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeLinkUnitCallId !== null &&
      this.DeLinkUnitCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeLinkUnitCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.deLinkUnitFromOwnerResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    // Delete Request Unit - API Response
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.DeleteRequestUnitCallId !== null &&
      this.DeleteRequestUnitCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.DeleteRequestUnitCallId = null;

      responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      this.deleteRequestUnitResponse(responseJson);

      errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    }

    if (responseJson && responseJson.meta && responseJson.meta.token) {
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    } else {
      ApiErrorResponse(responseJson);
    }
    ApiCatchErrorResponse(errorResponse);
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
      this.setState({
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
        },
        rentDetails: {
          status: unit.attributes.status,
          tenantId: unit.attributes.rent_status.data ? unit.attributes.rent_status.data.attributes.tenant.data.id : "",
          tenantName: unit.attributes.rent_status.data ? unit.attributes.rent_status.data.attributes.tenant_name : "",
          startDate: unit.attributes.rent_status.data ? unit.attributes.rent_status.data.attributes.start_date : "",
          endDate: unit.attributes.rent_status.data ? unit.attributes.rent_status.data.attributes.end_date : "",
          charge: unit.attributes.rent_status.data ? unit.attributes.rent_status.data.attributes.rent_amount : "",
        },
      });
    }
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
}
