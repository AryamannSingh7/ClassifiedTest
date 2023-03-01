import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import { apiCall } from "../../../components/src/APICallComponent/index.web";
import { toast } from "react-hot-toast";
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
  buildingList: any[];
  filterBuilding: string;

  currency: string;

  budgetAmount: string;
  budgetCollected: string;
  rentDue: string;
  rentCollected: string;
  member: string;
  totalExpense: string;
  rateUnsold: string;
  rateSold: string;
  totalBudget: string;

  approveAmount: string;
  facility: any[];

  expenseBreakdown: any[];
  collectedFee: any[];
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardBudgetController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetBudgetDashboardYearListCallId: any;
  GetAllBuildingListCallId: any;
  GetBudgetDashboardDataCallId: any;
  GetBudgetDetailsCallId: any;
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
      buildingList: [],
      filterBuilding: "",

      currency: "",

      budgetAmount: "",
      budgetCollected: "",
      rentDue: "",
      rentCollected: "",
      member: "",
      totalExpense: "",
      rateSold: "",
      rateUnsold: "",
      totalBudget: "",

      approveAmount: "",
      facility: [],

      expenseBreakdown: [],
      collectedFee: [],
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
        case this.GetBudgetDashboardYearListCallId:
          this.handleGetDashboardYearListResponse(responseJson);
          break;
        case this.GetAllBuildingListCallId:
          this.handleBuildingListResponse(responseJson);
          break;
        case this.GetBudgetDashboardDataCallId:
          this.handleBudgetDashboardDataResponse(responseJson);
          break;
        case this.GetBudgetDetailsCallId:
          this.handleGetBudgetDetailsResponse(responseJson);
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
  // Year List
  getBudgetDashboardData = async () => {
    const { filterYear, filterBuilding } = this.state;
    const society_id = localStorage.getItem("society_id");

    this.GetBudgetDashboardDataCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_dashboard/budget_dashbords?society_management_id=${society_id}&year=${filterYear}&building_management_id=${filterBuilding}`,
    });
  };

  handleBudgetDashboardDataResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const budgetDetails = responseJson.data;
      this.setState({
        budgetAmount: budgetDetails.attributes.budget_vs_collected.budget,
        budgetCollected: budgetDetails.attributes.budget_vs_collected.collected,
        rentDue: budgetDetails.attributes.total_rent_due_vs_collected.rent_due,
        rentCollected: budgetDetails.attributes.total_rent_due_vs_collected.rent_collected,
        member: budgetDetails.attributes.member_have_not_paid_management_fees.count,
        totalExpense: budgetDetails.attributes.total_expenses.count,
        rateSold: budgetDetails.attributes.occupancy_rate.sold,
        rateUnsold: budgetDetails.attributes.occupancy_rate.unsold,
        totalBudget: budgetDetails.attributes.remaining_budget_amount.count,
        currency: budgetDetails.attributes.currency,
        expenseBreakdown: Object.entries(budgetDetails.attributes.total_expenses_breakdown).map(([key, value]) => ({
          key,
          value,
        })),
        collectedFee: Object.entries(budgetDetails.attributes.collected_fees).map(([key, value]) => ({
          key,
          value,
        })),
      });
    }
  };

  // Budget Details
  getBudgetDetails = async () => {
    const { filterYear, filterBuilding } = this.state;
    const society_id = localStorage.getItem("society_id");

    this.GetBudgetDetailsCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${society_id}/bx_block_report/budget_reports/preview_budget?year=${filterYear}`,
    });
  };

  handleGetBudgetDetailsResponse = (responseJson: any) => {
    if (responseJson && responseJson.budget_report) {
      this.setState({
        approveAmount: responseJson.budget_report.approved_amount,
        facility: responseJson.budget_report.facilities,
        currency: responseJson.budget_report.currency.currency,
      });
    } else {
      this.setState(
        {
          approveAmount: "",
          facility: [],
          currency: "",
        },
        () => {
          toast.error(responseJson.message);
        }
      );
    }
  };

  getBudgetDashboardYearList = async () => {
    this.GetBudgetDashboardYearListCallId = await apiCall({
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
    const society_id = localStorage.getItem("society_id");

    this.GetAllBuildingListCallId = await apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_settings/building_managements?society_management_id=${society_id}`,
    });
  };

  handleBuildingListResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      this.setState({ buildingList: responseJson.data });
    }
  };
  // Customizable Area End
}
