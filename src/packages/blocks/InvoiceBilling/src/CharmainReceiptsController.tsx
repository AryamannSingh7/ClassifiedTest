// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";


export const configJSON = require("../../dashboard/src/config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  loading: boolean;
  anchorEl: any;
  openModal: boolean;
  payment_type:any;
  generateReceipt:boolean;
  paymentType:any;
  confirmPaymentModal:boolean;
  paymentAmount:any;
  receiptsList:any;
  invoiceData:any;
  filterReceiptBuilding:any;
  filterReceiptFloor:any;
  filterReceiptUnit:any;
  filterReceiptStatus:any;
  filterReceiptType:any;
  searchReceiptKey:any;
  buildingReceiptList:any;
  unitReceiptList:any;
  floorReceiptList:any;
  page:any
  count:any;
  pagination:any;
  receiptDetails:any;
  downloadId:any
}

interface SS {
  id: any;
}

export default class CharmainInvoicesController extends CommonApiCallForBlockComponent<Props,S,SS> {
  getInvoiceBillingApiCallId: any
  getReceiptListId:any
  getBuildingListReceiptId:any
  getUnitListReceiptId:any;
  getFloorReceiptList:any;
  getReceiptDetailsId:any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
    ];
    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      loading: false,
      anchorEl:null,
      openModal: true,
      payment_type:'fullpayment',
      generateReceipt:true,
      paymentType:"",
      confirmPaymentModal:false,
      paymentAmount:"",
      receiptsList:[],
      invoiceData:{},
      filterReceiptBuilding:"",
      filterReceiptFloor:"",
      filterReceiptStatus:"",
      filterReceiptType:"",
      filterReceiptUnit:"",
      searchReceiptKey:"",
      buildingReceiptList:[],
      floorReceiptList:[],
      unitReceiptList:[],
      page:1,
      count:10,
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
      receiptDetails:{},
      downloadId:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getBuildingList()
    this.getReceiptList({
      buildingId:this.state.filterReceiptBuilding,
      floorNo:this.state.filterReceiptFloor,
      unitId:this.state.filterReceiptUnit,
      paymentType:this.state.filterReceiptType,
      status:this.state.filterReceiptStatus,
      searchKey:this.state.searchReceiptKey,
      page:this.state.page,
    })
  }

  getReceiptListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("receipts")){
      this.setState({
        receiptsList:responseJson?.receipts?.data,
        pagination:responseJson.meta.pagination,
      })
    }
  }

  getBuildingListReceiptResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("buildings")){
      this.setState({
        buildingReceiptList:responseJson?.buildings
      })
    }
  }

  getUnitListReceiptResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("units")){
      this.setState({
        unitReceiptList:responseJson.units
      })
    }else{
      this.setState({
        unitReceiptList:[]
      })
    }
  }

  getReceiptDetailsResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("receipt")){
      this.setState({
        receiptDetails:responseJson?.receipt?.data?.attributes,
        downloadId:responseJson?.receipt?.data?.id
      })
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getReceiptListId){
        this.getReceiptListResponse(responseJson)
      }
      if(apiRequestCallId === this.getBuildingListReceiptId){
        this.getBuildingListReceiptResponse(responseJson)
      }
      if(apiRequestCallId === this.getUnitListReceiptId){
        this.getUnitListReceiptResponse(responseJson)
      }
      if(apiRequestCallId === this.getReceiptDetailsId){
        this.getReceiptDetailsResponse(responseJson)
      }
    }
  }

  getReceiptDetails = async (id:any) => {
    this.getReceiptDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/receipts/${id}/generate_receipt`,
    });
    return true
  };


  getReceiptList = async (data:any) => {
    const {buildingId,floorNo,unitId,paymentType,status,searchKey,page} = data
    console.log("Page",page)
    this.getReceiptListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/receipts?search=${searchKey|| ""}&unit_id=${unitId|| ""}&building_id=${buildingId|| ""}&floor_number=${floorNo|| ""}&select_status=${status|| ""}&select_type=${paymentType|| ""}&page=${page}`,
    });
    return true
  };

  selectBuilding = (e:any) => {
    this.setState({
      filterReceiptBuilding:e.target.value,
    })
    this.getUnitList(e.target.value)
  }

  manageDownloadReceipt = async (id:any) => {
    await this.downloadPdf(`/bx_block_fees_payment/invoices/${id}/download_invoice`,`Invoice-${id}.pdf`)
  }

  getBuildingList = async () => {
    this.getBuildingListReceiptId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/buiding_list`,
    });
    return true
  };

  getUnitList = async (buildingId:any) => {
    this.getUnitListReceiptId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/unit_list?building_management_id=${buildingId}`,
    });
    return true
  };

    handleClickReceipt = (e: any) => {
        this.setState({anchorEl:e.currentTarget});
    };

    handleCloseReceipt = () => {
        this.setState({anchorEl:null});
    };

    handleModalOpenReceipt = (id:any) => {
        this.setState({openModal:true});
        this.getReceiptDetails(id)
    };
    
    handleModalCloseReceipt = () => {
      this.setState({openModal:false});
      console.log("close---->")
    };
}
// Customizable Area End