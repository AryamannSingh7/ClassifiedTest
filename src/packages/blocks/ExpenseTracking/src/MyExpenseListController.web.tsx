import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";

export interface IBuilding {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    apartment_managements: IUnit[];
  };
}

interface IExpenseUnitResponse {
  data: IExpenseBuilding[];
}

export interface IUnit {
  id: number;
  apartment_name: string;
}

export interface IExpenseBuilding {
  id: string;
  attributes: {
    apartment_name: string;
    building_management: {
      id: number;
      name: string;
      city: string | null;
    };
  };
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  t: (label: string) => string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  isFilterOpen: boolean;

  expanded: string | boolean;

  expenseUnitList: IExpenseBuilding[];
  buildingList: IBuilding[];

  unitList: number[];
  filterUnitList: number[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MyExpenseListController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  GetAllExpenseUnitListCallId: string = "";
  GetAllOwnBuildingListCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      isFilterOpen: false,

      expanded: false,

      expenseUnitList: [],
      buildingList: [],

      unitList: [],
      filterUnitList: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      switch (apiRequestCallId) {
        // Get Expense Building List - API Response
        case this.GetAllExpenseUnitListCallId:
          this.handleAllExpenseListResponse(responseJson);
          break;
        // Get Own Building List - API Response
        case this.GetAllOwnBuildingListCallId:
          if (responseJson && responseJson.data) {
            this.setState({ buildingList: responseJson.data });
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
    this.getAllExpenseUnitList();
    this.getAllOwnedBuildingList();
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>): Promise<void> {
    if (JSON.stringify(prevState.filterUnitList) !== JSON.stringify(this.state.filterUnitList)) {
      this.getAllExpenseUnitList();
    }
  }

  getAllExpenseUnitList = () => {
    const { filterUnitList } = this.state;

    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllExpenseUnitListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_expensetracking/expenses?apartment_management_id=${
        filterUnitList.length > 0 ? JSON.stringify(filterUnitList) : ""
      }`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleAllExpenseListResponse = (responseJson: IExpenseUnitResponse) => {
    this.setState({ loading: false }, () => {
      if (responseJson && responseJson.data) {
        this.setState({ expenseUnitList: responseJson.data });
      }
    });
  };

  getAllOwnedBuildingList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: localStorage.getItem("userToken"),
    };

    const apiRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.GetAllOwnBuildingListCallId = apiRequest.messageId;

    apiRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_settings/building_managements/building_list`
    );

    apiRequest.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));

    apiRequest.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(apiRequest.id, apiRequest);
    return true;
  };

  handleFilterModal = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };

  handleChangeFilterAccordion = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    this.setState({ expanded: newExpanded ? panel : false });
  };

  handleNavigationToOwnerDashboard = () => {
    this.props.navigation.navigate("OwnerDashboard");
  };

  handleNavigationToAddExpense = () => {
    const msg: Message = new Message(getName(MessageEnum.NavigationAddExpenseMessage));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.AddExpenseDataMessage), {
      isMainPage: true,
      buildingId: "",
      unitId: "",
    });
    this.send(msg);
  };

  handleChangeCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>, unitId: number) => {
    if (e.target.checked) {
      const selectedUnitIds = [...this.state.unitList, unitId];
      this.setState({ unitList: selectedUnitIds });
    } else {
      const unitIds = this.state.unitList.filter((id: number) => id !== unitId);
      this.setState({ unitList: unitIds });
    }
  };

  handleApplyFilter = () => {
    if (this.state.unitList.length > 0) {
      this.setState({ loading: true, filterUnitList: this.state.unitList }, () => {
        this.handleFilterModal();
      });
    }
  };

  handleClearFilter = () => {
    this.setState({ unitList: [] });
  };
  // Customizable Area End
}
