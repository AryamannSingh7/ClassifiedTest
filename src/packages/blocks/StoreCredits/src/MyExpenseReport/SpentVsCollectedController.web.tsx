import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  // Customizable Area End
}

interface S {
  loading: boolean;

  collectedAmount: string;
  spentAmount: string;

  selectedFilter: string;
  yearList: number[];
  quarterList: any[];
  monthList: number[];
  selectedYear: number;
  selectedQuarter: number;
  selectedMonth: number;

  unitWiseData: any[];
  cityWiseData: any[];

  currency: string;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SpentVsCollectedController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  CollectedVsSpentCallId: string = "";
  LastYearsListCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      loading: false,

      collectedAmount: "",
      spentAmount: "",

      unitWiseData: [],
      cityWiseData: [],

      currency: "",

      selectedFilter: "year",
      yearList: [],
      quarterList: [
        { key: "Quarter 1", value: 1 },
        { key: "Quarter 2", value: 2 },
        { key: "Quarter 3", value: 3 },
        { key: "Quarter 4", value: 4 },
      ],
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedYear: moment().year(),
      selectedQuarter: 0,
      selectedMonth: 0,
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
        // Get All Expense List - API Response
        case this.CollectedVsSpentCallId:
          this.setState({ loading: false }, () => {
            this.handleCollectedVsDueResponse(responseJson);
          });
          break;
        case this.LastYearsListCallId:
          if (responseJson && responseJson.year) {
            this.setState({ yearList: responseJson.year });
          }
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
    this.getCollectedVsSpentData();
    this.getLastYearsList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.selectedYear !== this.state.selectedYear ||
      prevState.selectedQuarter !== this.state.selectedQuarter ||
      prevState.selectedMonth !== this.state.selectedMonth
    ) {
      this.getCollectedVsSpentData();
    }
  }

  getCollectedVsSpentData = () => {
    const { selectedFilter, selectedYear, selectedQuarter, selectedMonth } = this.state;
    let filter = "";
    if (selectedFilter === "year") {
      filter = `year=${selectedYear}`;
    } else if (selectedFilter === "month") {
      filter = `month=${selectedMonth}`;
    } else {
      filter = `quarter=${selectedQuarter}`;
    }

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.CollectedVsSpentCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expense_report/expense_reports/spent_index?${filter}`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleCollectedVsDueResponse = (responseJson: any) => {
    if (responseJson && responseJson.data) {
      const collectVsSpent = responseJson.data.attributes.spent_amount_vs_collectd;

      this.setState({
        currency: responseJson.data.attributes.currency,
        collectedAmount: collectVsSpent ? collectVsSpent.collectd_amount : "N/A",
        spentAmount: collectVsSpent ? collectVsSpent.spent_amount : "N/A",
        unitWiseData: responseJson.data.attributes.unit_wise_spent_amount_vs_collectd,
        cityWiseData: responseJson.data.attributes.city_wise_spent_amount_vs_collectd,
      });
    }
  };

  getLastYearsList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.LastYearsListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expense_report/expense_reports/year_list`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleYearFilter = () => {
    if (this.state.selectedFilter !== "year") {
      this.setState({ selectedFilter: "year", selectedYear: moment().year(), loading: true });
    }
  };

  handleQuarterFilter = () => {
    if (this.state.selectedFilter !== "quarter") {
      this.setState({
        loading: true,
        selectedFilter: "quarter",
        selectedYear: moment().year(),
        selectedQuarter: 1,
      });
    }
  };

  handleMonthFilter = () => {
    if (this.state.selectedFilter !== "month") {
      this.setState({
        loading: true,
        selectedFilter: "month",
        selectedYear: moment().year(),
        selectedMonth: 1,
      });
    }
  };

  validateCurrency = (expense: any) => {
    if (!expense || expense === 0) {
      return expense || 0;
    } else {
      return this.state.currency + " " + expense;
    }
  };
  // Customizable Area End
}
