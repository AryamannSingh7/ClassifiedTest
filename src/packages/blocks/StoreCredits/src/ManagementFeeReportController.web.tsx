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
  buildingId:any;
  filterYear:any;
  filterMonth:any;
  status:any;
  searchUnit:any;
  feeListing:any;
  count:any;
  page:any;
  buildingList:any;
  pagination:any;
}

interface SS {
  id: any;
}

export default class ManagementFeeReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  getManagementFeeListId:string = "";
  getBuildingListId:string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      buildingId:"",
      filterYear:"",
      filterMonth:"",
      status:"",
      searchUnit:"",
      feeListing:[],
      count:10,
      page:1,
      buildingList:[],
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    await this.getManagementFeeList(this.state.status,this.state.filterYear,this.state.searchUnit,this.state.buildingId,this.state.filterMonth,this.state.page)
    await this.getBuildingList()
  }

  searchButtonManage = async () => {
    await this.getManagementFeeList(this.state.status,this.state.filterYear,this.state.searchUnit,this.state.buildingId,this.state.filterMonth,this.state.page)
  }

  manageDownload = async (id:any) => {
    const societyID = localStorage.getItem("society_id")
    await this.downloadPdf(`/society_managements/${societyID}bx_block_report/management_fees/${id}/download_report`,"ManagementFeeInvoice.pdf")
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getManagementFeeListId){
        if(responseJson.hasOwnProperty("management_fees")){
          this.setState({
            feeListing:responseJson?.management_fees?.data,
            pagination:responseJson?.meta?.pagination
          })
        }else{
          this.setState({
            feeListing:[]
          })
        }
      }
      if(apiRequestCallId === this.getBuildingListId){
        if(responseJson.hasOwnProperty("buildings")){
          this.setState({
            buildingList:responseJson?.buildings
          })
        }
      }
    }
  }

  manageUnitSearch = (e:any) => {
    this.setState({searchUnit:e.target.value})
    this.getManagementFeeList(this.state.status,this.state.filterYear,e.target.value,this.state.buildingId,this.state.filterMonth,this.state.page)
  }

  handleManagementFeePagination = (e:any,value:any) => {
    this.getManagementFeeList(this.state.status,this.state.filterYear,e.target.value,this.state.buildingId,this.state.filterMonth,value)
    this.setState({
      page:value
    })
  }

  getManagementFeeList = async (status:any,year:any,search:any,buildingId:any,month:any,page:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getManagementFeeListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/management_fees?search_building=${buildingId}&search_year=${year}&search_status=${status}&search_by_apartment=${search}&search_month=${month}&page=${page}`,
    });
  }

  getBuildingList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/management_fees/building_list`,
    });
  }

}
// Customizable Area End
