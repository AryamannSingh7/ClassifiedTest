import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
import { toast } from "react-hot-toast";
import moment from "moment";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  isConfigModalOpen: boolean;

  avgResolutionDay: string;
  ticketYear: string;
  ticketDays: string;
  configDays: string;

  modalConfigDays: string;

  yearList: any[];
  filterYear: any;
  buildingList: any[];
  filterBuilding: string;
  searchResident: string;
  pagination: any;
  page: number;

  ticketList: any[];
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardTicketController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  UpdateConfigDayCallId: any;
  GetTicketDashboardYearListCallId: any;
  GetAllBuildingListCallId: any;
  GetTicketByResidentCallId: any;
  GetTicketCardDataCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,
      isConfigModalOpen: false,

      avgResolutionDay: "0",
      ticketYear: "0",
      ticketDays: "0",
      configDays: "0",

      modalConfigDays: "0",

      yearList: [],
      filterYear: moment().year(),
      buildingList: [],
      filterBuilding: "",
      searchResident: "",
      pagination: null,
      page: 1,

      ticketList: [],
    };
    // Customizable Area End
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
        case this.UpdateConfigDayCallId:
          this.handleChangeConfigDayResponse(responseJson);
          break;
        case this.GetTicketDashboardYearListCallId:
          this.handleGetDashboardYearListResponse(responseJson);
          break;
        case this.GetAllBuildingListCallId:
          this.handleBuildingListResponse(responseJson);
          break;
        case this.GetTicketCardDataCallId:
          this.handleTicketCardResponse(responseJson);
          break;
        case this.GetTicketByResidentCallId:
          this.handleTicketByResidentResponse(responseJson);
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
  // Ticket Dashboard Card
  GetTicketCardData = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetTicketCardDataCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/ticket_dashbords?society_management_id=${society_id}`,
    });
  };

  handleTicketCardResponse = (responseJson: any) => {
    const card_data = responseJson.data.attributes;
    this.setState({
      avgResolutionDay: card_data.dashbord.average_resolution_time,
      ticketYear: card_data.dashbord.ticket_generated_in_year,
      ticketDays: card_data.dashbord.ticket_took_more_then_days,
      configDays: card_data.days,
    });
  };

  // Ticket open by resident
  getTicketByResident = async () => {
    const { searchResident, page } = this.state;
    const society_id = localStorage.getItem("society_id");

    this.GetTicketByResidentCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/ticket_dashbords/ticket_open_by_resident?society_management_id=${society_id}&search=${searchResident}&page=${page}`,
    });
  };

  handleTicketByResidentResponse = (responseJson: any) => {
    this.setState({ ticketList: responseJson.incident.data, pagination: responseJson.meta.pagination });
  };

  // Config Days
  handleChangeConfig = async () => {
    const society_id = localStorage.getItem("society_id");

    this.UpdateConfigDayCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/ticket_dashbords/change_configuration?society_management_id=${society_id}&days=${
        this.state.modalConfigDays
      }`,
    });
  };

  handleChangeConfigDayResponse = (responseJson: any) => {
    this.setState({ loading: false }, () => {
      toast.success(responseJson.message);
      this.GetTicketCardData();
    });
  };

  // Year List
  getTicketDashboardYearList = async () => {
    this.GetTicketDashboardYearListCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_expense_report/expense_reports/year_list`,
    });
  };

  handleGetDashboardYearListResponse = (responseJson: any) => {
    if (responseJson && responseJson.year) {
      this.setState({ yearList: responseJson.year });
    }
  };

  // Building List
  getAllBuildingList = async () => {
    this.GetAllBuildingListCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_settings/building_managements`,
    });
  };

  handleBuildingListResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ buildingList: responseJson.data });
    }
  };

  handleConfigModal = () => {
    this.setState({ modalConfigDays: this.state.configDays, isConfigModalOpen: !this.state.isConfigModalOpen });
  };
  // Customizable Area End
}
