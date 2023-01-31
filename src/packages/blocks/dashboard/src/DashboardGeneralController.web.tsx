import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { apiCall } from "../../../components/src/APICallComponent/index.web";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
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

  yearList: any[];
  filterYear: any;

  generalDashboard: any;
  meetingList: any[];
  facilityList: any[];
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardBudgetController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetGeneralDashboardCallId: any;
  GetGeneralDashboardYearListCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      yearList: [],
      filterYear: moment().year(),

      generalDashboard: {
        ownershipRate: null,
        rentedApartment: null,
        managementFee: null,
        registeredUser: null,
        activeMember: null,
        memberNotLogin: null,
        overdueFee: null,
        classified: null,
        incidents: null,
        facility: null,
        vehicle: null,
        collection: null,
      },
      meetingList: [],
      facilityList: [],
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
        case this.GetGeneralDashboardCallId:
          this.handleGetGeneralDashboardResponse(responseJson);
          break;
        case this.GetGeneralDashboardYearListCallId:
          this.handleGetDashboardYearListResponse(responseJson);
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
  async componentDidMount(): Promise<void> {
    this.getGeneralDashboardData();
    this.getGeneralDashboardYearList();
  }

  getGeneralDashboardData = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetGeneralDashboardCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_settings/dashbords/general_dashbord?society_management_id=${society_id}`,
    });
  };

  handleGetGeneralDashboardResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const dashboardInfo = responseJson.data.attributes;
      this.setState({
        generalDashboard: {
          ownershipRate: dashboardInfo.general_dashbord.building_ownership_rate,
          rentedApartment: dashboardInfo.general_dashbord.rented_out_apartment,
          managementFee: dashboardInfo.general_dashbord.management_fees_collected,
          registeredUser: dashboardInfo.general_dashbord.Registered_residents_owners,
          activeMember: dashboardInfo.general_dashbord.active_registered_member,
          memberNeverLogin: dashboardInfo.general_dashbord.member_never_looged_in,
          overdueFee: dashboardInfo.general_dashbord.overdue_management_fees,
          classified: dashboardInfo.general_dashbord.classified,
          incidents: dashboardInfo.general_dashbord.incident,
          facility: dashboardInfo.general_dashbord.facility,
          vehicle: dashboardInfo.general_dashbord.vehicle,
          collection: null,
        },
        meetingList: dashboardInfo.upcoming_events.meetings,
        facilityList: dashboardInfo.upcoming_events.facility,
      });
    }
  };

  getGeneralDashboardYearList = async () => {
    this.GetGeneralDashboardYearListCallId = await apiCall({
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
  // Customizable Area End
}
