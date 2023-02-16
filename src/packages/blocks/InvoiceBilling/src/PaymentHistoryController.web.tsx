// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  classes: any;
}

interface S {
  page:any,
  pagination:any;
  historyList:any;
  buildingList:any;
  floorList:any;
  unitList:any;
  filterBuilding:any;
  filterFloor:any;
  filterUnit:any;
}

interface SS {
  id: any;
}

export default class PaymentHistoryController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getBuildingListForHistoryId:any
  getUnitListForHistoryId:any;
  getFloorListForHistoryId:any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    this.state = {
      page:1,
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
      historyList:[],
      buildingList:[],
      floorList:[],
      unitList:[],
      filterBuilding:"",
      filterFloor:"",
      filterUnit:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  managePaginationForHistory = (e:any,value:any) => {

  }

  getBuildingListForHistory = async () => {
    this.getBuildingListForHistoryId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/buiding_list`,
    });
    return true
  };

  getFloorListForHistory = async (buildingId:any) => {
    this.getFloorListForHistoryId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/floor_number?building_id=${buildingId}`,
    });
    return true
  };


  getUnitListForHistory = async (buildingId:any,floorId:any) => {
    this.getUnitListForHistoryId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/unit_list?building_management_id=${buildingId}&floor_number=${floorId}`,
    });
    return true
  };


  async receive(from: string, message: Message) {

  }

}
// Customizable Area End