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

interface RentHistoryForm {
  startDate: string;
  endDate: string;
  rentAmount: string;
  receivedAmount: string;
  tenantName: string;
}

interface UnitRegisterForm {
  country: string;
  region: string;
  city: string;
  complex: string;
  buildingId: string;
  floorId: string;
  unitId: string;
  size: string;
  config: string;
  price: string;
  date: string;
  type: string;
  income: string;
  valuation: string;
  measurement: string;
}

interface S {
  loading: boolean;
  isRentHistoryModalOpen: boolean;

  buildingList: any[];
  floorList: any[];
  unitList: any[];
  rentHistoryList: any[];
  configList: any[];

  unitRegisterForm: UnitRegisterForm;

  rentHistoryForm: RentHistoryForm;
  unitId: string;

  currency: string;

  lat: string;
  long: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RegisterUnitController extends BlockComponent<Props, S, SS> {
  GetBuildingListCallId: any;
  GetComplexDetailsCallId: any;
  GetRentHistoryListCallId: any;
  DeleteRentHistoriesCallId: any;
  GetFloorListCallId: any;
  GetUnitListCallId: any;
  CreateRentHistoryCallId: any;
  RegisterUnitCallId: any;
  GetEditUnitDetailsCallId: any;
  EditRegisterUnitCallId: any;
  GetConfigurationListCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isRentHistoryModalOpen: false,

      buildingList: [],
      floorList: [],
      unitList: [],
      rentHistoryList: [],
      configList: [],

      unitRegisterForm: {
        country: "",
        region: "",
        city: "",
        complex: "",
        buildingId: "",
        floorId: "",
        unitId: "",
        size: "",
        config: "",
        price: "",
        date: "",
        type: "Rented",
        income: "",
        valuation: "",
        measurement: "",
      },

      rentHistoryForm: {
        startDate: "",
        endDate: "",
        rentAmount: "",
        receivedAmount: "",
        tenantName: "",
      },
      unitId: "",

      currency: "",

      lat: "",
      long: "",
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
          this.handleBuildingListResponse(responseJson);
          break;
        case this.GetFloorListCallId:
          this.handleFloorListResponse(responseJson);
          break;
        case this.GetUnitListCallId:
          this.handleUnitListResponse(responseJson);
          break;
        case this.GetRentHistoryListCallId:
          this.handleRentHistoryResponse(responseJson);
          break;
        case this.CreateRentHistoryCallId:
          this.handleAddRentHistoryResponse(responseJson);
          break;
        case this.DeleteRentHistoriesCallId:
          this.handleDeleteRentHistoriesResponse(responseJson);
          break;
        case this.RegisterUnitCallId:
          this.handleRegisterUnitToOwnerResponse(responseJson);
          break;
        case this.EditRegisterUnitCallId:
          this.handleEditRegisterUnitResponse(responseJson);
          break;
        case this.GetConfigurationListCallId:
          this.handleConfigurationListResponse(responseJson);
          break;
        case this.GetEditUnitDetailsCallId:
          this.handleGetEditUnitDetailsResponse(responseJson);
          break;
        case this.GetComplexDetailsCallId:
          this.handleComplexDetailsResponse(responseJson);
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
      `bx_block_address/building_list?society_management_id=${society_id}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleBuildingListResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ buildingList: responseJson.data.buildings });
    }
  };

  getConfigurationList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetConfigurationListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/unit_configuration`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleConfigurationListResponse = (responseJson: any) => {
    if (responseJson && responseJson.configuration) {
      this.setState({ configList: responseJson.configuration });
    }
  };

  getFloorList = (building: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetFloorListCallId = apiRequest.messageId;

    const society_id = localStorage.getItem("society_id");
    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `society_managements/${society_id}/bx_block_meeting/meeting_groups/floor_listing?building_id=${building}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleFloorListResponse = (responseJson: any) => {
    if (responseJson && responseJson.floors) {
      this.setState({ floorList: responseJson.floors });
    }
  };

  getUnitList = (buildingId: any, floor: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetUnitListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/unit_list?building_management_id=${buildingId}&floor_number=${floor}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleUnitListResponse = (responseJson: any) => {
    if (responseJson && responseJson.apartment_managements) {
      this.setState({ unitList: responseJson.apartment_managements });
    }
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

  handleComplexDetailsResponse = (responseJson: any) => {
    if (responseJson) {
      if (responseJson.complex) {
        this.setState({
          unitRegisterForm: {
            ...this.state.unitRegisterForm,
            complex: responseJson.complex.name,
            measurement: responseJson.complex.measurement_unit,
          },
        });
      }
      if (responseJson.complex_address) {
        this.setState({
          unitRegisterForm: {
            ...this.state.unitRegisterForm,
            country: responseJson.complex_address.country,
            region: responseJson.complex_address.region,
            city: responseJson.complex_address.city,
          },
        });
      }
      if (responseJson.currency) {
        this.setState({
          currency: responseJson.currency && responseJson.currency.currency,
        });
      }
    }
  };

  getRentHistory = (unitId: any) => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetRentHistoryListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/rent_histories?apartment_management_id=${unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleRentHistoryResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ rentHistoryList: responseJson.data });
    }
  };

  addRentHistory = (values: any) => {
    var data = new FormData();
    data.append("rent_history[apartment_management_id]", this.state.unitId);
    data.append("rent_history[start_date]", values.startDate);
    data.append("rent_history[end_date]", values.endDate);
    data.append("rent_history[rent_amount]", values.rentAmount);
    data.append("rent_history[tenant_name]", values.tenantName);
    data.append("rent_history[received_amount]", values.receivedAmount);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CreateRentHistoryCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_settings/rent_histories`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleAddRentHistoryResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        toast.success("Rent History Created Successfully");
        this.getRentHistory(this.state.unitId);
      } else if (responseJson && responseJson.message) {
        toast.error(responseJson.message);
      }
    });
  };

  deleteRentHistories = (id: any) => {
    const body = {
      ids: [id],
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.DeleteRentHistoriesCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/rent_histories/delete_all`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleDeleteRentHistoriesResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.message) {
        toast.success(responseJson.message);
        this.getRentHistory(this.state.unitId);
      }
    });
  };

  registerUnitToOwner = (values: any) => {
    const body = {
      data: {
        country: values.country,
        city: values.city,
        building_management_id: values.buildingId,
        apartment_management_id: values.unitId,
        floor_number: values.floorId,
        size: values.size,
        purchase_price: values.price,
        configuration: values.config,
        purchase_date: values.date,
        current_valuation: values.valuation,
        monthly_renting_income: values.income,
        unit_type: values.type,
        society_management_id: localStorage.getItem("society_id"),
      },
    };

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.RegisterUnitCallId = apiRequest.messageId;

    apiRequest.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_request_management/requests`);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleRegisterUnitToOwnerResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        this.props.navigation.navigate("RegisterMyUnitSuccess");
      }
    });
  };

  getEditUnitDetails = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetEditUnitDetailsCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleGetEditUnitDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const unit = responseJson.data;
      this.setState({
        unitRegisterForm: {
          ...this.state.unitRegisterForm,
          buildingId: unit.attributes.building_management.name,
          floorId: unit.attributes.floor_number,
          unitId: unit.attributes.apartment_name,
          size: unit.attributes.size || "",
          config: unit.attributes.configuration || "",
          price: unit.attributes.purchase_price || "",
          date: unit.attributes.purchase_date || "",
          type: unit.attributes.unit_type,
          income: unit.attributes.monthly_renting_income || "",
          valuation: unit.attributes.current_valuation || "",
        },
        lat: unit.attributes.lat,
        long: unit.attributes.long,
      });
    }
  };

  editRegisterUnit = (values: any) => {
    var data = new FormData();
    data.append("apartment_management[purchase_price]", values.price);
    data.append("apartment_management[purchase_date]", values.date);
    data.append("apartment_management[current_valuation]", values.valuation);
    data.append("apartment_management[unit_type]", values.type);
    data.append("apartment_management[monthly_renting_income]", values.income);

    const header = {
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.EditRegisterUnitCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/apartment_managements/${this.state.unitId}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestBodyMessage), data);

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePatch);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleEditRegisterUnitResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        this.props.navigation.navigate("MyUnitDetails", { id: this.state.unitId });
      }
    });
  };

  validationRentHistoryFormSchema: any = Yup.object().shape({
    startDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    endDate: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    rentAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    receivedAmount: Yup.string()
      .required("Required")
      .matches(/\S/, "Required")
      .matches(/^\d+$/, "Only digit allowed"),
    tenantName: Yup.string()
      .required("Required")
      .max(100, "Maximum length of title should be 100 character")
      .matches(/\S/, "Required"),
  });

  validationRegisterUnitFormSchema: any = Yup.object().shape({
    buildingId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    floorId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    unitId: Yup.string()
      .required("Required")
      .matches(/\S/, "Required"),
    price: Yup.string().matches(/^\d+$/, "Only digit allowed"),
    type: Yup.string(),
    income: Yup.string().matches(/^\d+$/, "Only digit allowed"),
    valuation: Yup.string().matches(/^\d+$/, "Only digit allowed"),
    size: Yup.string().matches(/^\d+$/, "Only digit allowed"),
  });

  validationEditUnitFormSchema: any = Yup.object().shape({
    price: Yup.string().matches(/^\d+$/, "Only digit allowed"),
    valuation: Yup.string().matches(/^\d+$/, "Only digit allowed"),
    type: Yup.string(),
    income: Yup.string().matches(/^\d+$/, "Only digit allowed"),
  });

  handleOpenRentHistoryModal = (unitId: any) => {
    this.setState({
      isRentHistoryModalOpen: !this.state.isRentHistoryModalOpen,
      unitId: unitId,
    });
  };

  handleCloseRentHistoryModal = () => {
    this.setState({
      isRentHistoryModalOpen: !this.state.isRentHistoryModalOpen,
    });
  };
}
