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
  classified: any;
  facility: any;
  incidents: any;
  vehicle: any;
  ownershipRate: any;
  rentedApartment: any;
  activeMember: any;
  memberNotLogin: any;
  registeredUser: any;

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

      classified: { active: 0, pending: 0 },
      facility: { reservation: 0, pending: 0 },
      incidents: { resolved: 0, unresolved: 2 },
      vehicle: { registered: 0, pending: 1 },
      ownershipRate: { sold: 0, unsold: 0 },
      rentedApartment: { rented: 0, total: 0 },
      activeMember: { count: 0 },
      memberNotLogin: { count: 0 },
      registeredUser: { count: 0 },
      generalDashboard: {
        managementFee: null,
        overdueFee: null,
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

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filterYear !== this.state.filterYear) {
      await this.getGeneralDashboardData();
    }
  }

  getGeneralDashboardData = async () => {
    const society_id = localStorage.getItem("society_id");

    this.GetGeneralDashboardCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/genral_dashbords?society_management_id=${society_id}&year=${this.state.filterYear}`,
    });
  };

  handleGetGeneralDashboardResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const dashboardInfo = responseJson.data.attributes;
      const general_dashboard = responseJson.data.attributes.general_dashbord;
      this.setState(
        {
          generalDashboard: {
            managementFee: dashboardInfo.general_dashbord.management_fees_collected,
            overdueFee: dashboardInfo.general_dashbord.overdue_management_fees,
            collection: null,
          },
          registeredUser: { count: general_dashboard.Registered_residents_owners.count },
          memberNotLogin: { count: general_dashboard.member_never_looged_in.count },
          activeMember: { count: general_dashboard.active_registered_member.count },
          rentedApartment: {
            rented: general_dashboard.rented_out_apartment.rented,
            total: general_dashboard.rented_out_apartment.totle,
          },
          ownershipRate: {
            sold: general_dashboard.building_ownership_rate.sold,
            unsold: general_dashboard.building_ownership_rate.unsold,
          },
          classified: {
            active: general_dashboard.classified.Active,
            pending: general_dashboard.classified.Pending,
          },
          facility: {
            reservation: general_dashboard.facility.Reservation,
            pending: general_dashboard.facility.Pending,
          },
          incidents: {
            resolved: general_dashboard.incident.Resolved,
            unresolved: general_dashboard.incident.Unresolved,
          },
          vehicle: {
            registered: general_dashboard.vehicle.Registered,
            pending: general_dashboard.vehicle.Pending,
          },
          meetingList: dashboardInfo.upcoming_events.meetings.data,
          facilityList: dashboardInfo.upcoming_events.facility.data,
        },
        () => {
          console.log(this.state);
        }
      );
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
