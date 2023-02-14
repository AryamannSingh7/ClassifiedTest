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
  invoicesList:any;
  invoiceData:any;
  filterBuilding:any;
  filterFloor:any;
  filterUnit:any;
  filterStatus:any;
  filterType:any;
  searchKey:any;
  buildingList:any;
  unitList:any;
  floorList:any;
  page:any
  count:any;
  pagination:any;
  invoiceDetails:any;
  downloadId:any;
  partialPaymentAmount:any;
  showError:boolean;
  error:any;
  showSuccess:boolean;
  successMessage:any;
}

interface SS {
  id: any;
}

export default class CharmainInvoicesController extends CommonApiCallForBlockComponent<Props,S,SS> {
  getInvoiceBillingApiCallId: any
  getInvoiceListId:any
  getBuildingListId:any
  getUnitListId:any;
  getFloorListId:any;
  getInvoiceDetailsId:any;
  registerFullPaymentId:any;
  registerPartialPaymentId:any;
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
      invoicesList:[],
      invoiceData:{},
      filterBuilding:"",
      filterFloor:"",
      filterStatus:"",
      filterType:"",
      filterUnit:"",
      searchKey:"",
      buildingList:[],
      floorList:[],
      unitList:[],
      page:1,
      count:10,
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
      invoiceDetails:{},
      downloadId:"",
      partialPaymentAmount:"",
      showError:false,
      error:"",
      showSuccess:false,
      successMessage:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getBuildingList()
    this.getInvoiceList({
      buildingId:this.state.filterBuilding,
      floorNo:this.state.filterFloor,
      unitId:this.state.filterUnit,
      paymentType:this.state.filterType,
      status:this.state.filterStatus,
      searchKey:this.state.searchKey,
      page:this.state.page,
    })
  }

  handleInvoicesPagination = (e:any,value:any) => {
    this.getInvoiceList({
      buildingId:this.state.filterBuilding,
      floorNo:this.state.filterFloor,
      unitId:this.state.filterUnit,
      paymentType:this.state.filterType,
      status:this.state.filterStatus,
      searchKey:this.state.searchKey,
      page:value,
    })
    this.setState({
      page:value
    })
  }

  handleFilterBy = () => {
    this.getInvoiceList({
      buildingId:this.state.filterBuilding,
      floorNo:this.state.filterFloor,
      unitId:this.state.filterUnit,
      paymentType:this.state.filterType,
      status:this.state.filterStatus,
      searchKey:this.state.searchKey,
      page:this.state.page,
    })
  }

  getInvoicesListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("invoices")){
      this.setState({
        invoicesList:responseJson.invoices.data,
        pagination:responseJson.meta.pagination,
      })
    }
  }

  getBuildingListResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("buildings")){
      this.setState({
        buildingList:responseJson?.buildings
      })
    }
  }

  getUnitListResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("units")){
      this.setState({
        unitList:responseJson.units
      })
    }else{
      this.setState({
        unitList:[]
      })
    }
  }

  getFloorListResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("floors")){
      this.setState({
        floorList:responseJson.floors
      })
    }else{
      this.setState({
        floorList:[]
      })
    }
  }

  registerPaymentConfirmation = () => {
    console.log("DID i Came ?")
    if(this.state.paymentType === "partial" || this.state.paymentType === "full"){
      if(this.state.paymentType === "partial"){
          if(this.state.partialPaymentAmount){
            this.setState({confirmPaymentModal:true})
          }else{
            this.setState({
              showError:true,
              error:"Please enter partial payment amount"
            })
          }
      }else{
        this.setState({confirmPaymentModal:true})
      }
    }else{
      this.setState({
        showError:true,
        error:"Please Select Payment Type"
      })
    }
  }

  manageDownload = async (id:any) => {
    await this.downloadPdf(`/bx_block_fees_payment/invoices/${id}/download_invoice`,`Invoice-${id}.pdf`)
  }

  getInvoiceDetailsResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("report")){
      this.setState({
        invoiceDetails:responseJson?.report?.data?.attributes,
        downloadId:responseJson?.report?.data?.id
      })
    }
  }

  registerFullPaymentResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("data")){
      this.setState({
        confirmPaymentModal:false,
        openModal:false,
        showSuccess:true,
        successMessage:"Full Payment Updated Successfully!"
      })
    }else{
      this.setState({
        error:"Something Went Wrong",
        showError:true
      })
    }
  }

  registerPartialPaymentResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("data")){
      this.setState({
        confirmPaymentModal:false,
        openModal:false,
        showSuccess:true,
        successMessage:`Partial payment ${responseJson.data.attributes.currency} ${responseJson.data.attributes.partial_paid_amount} Updated Successfully!`
      })
    }else{
      this.setState({
        error:"Something Went Wrong",
        showError:true
      })
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getInvoiceListId){
        this.getInvoicesListResponse(responseJson)
      }
      if(apiRequestCallId === this.getBuildingListId){
        this.getBuildingListResponse(responseJson)
      }
      if(apiRequestCallId === this.getUnitListId){
        this.getUnitListResponse(responseJson)
      }
      if(apiRequestCallId === this.getInvoiceDetailsId){
        this.getInvoiceDetailsResponse(responseJson)
      }
      if(apiRequestCallId === this.registerFullPaymentId){
        this.registerFullPaymentResponse(responseJson)
      }
      if(apiRequestCallId === this.registerPartialPaymentId){
        this.registerPartialPaymentResponse(responseJson)
      }
      if(apiRequestCallId === this.getFloorListId){
        this.getFloorListResponse(responseJson)
      }
    }
  }

  selectBuilding = (e:any) => {
    this.setState({
      filterBuilding:e.target.value,
    })
    this.getUnitList(e.target.value,"")
    this.getFloorList(e.target.value)
  }

  selectFloor = (e:any) => {
    this.setState({
      filterFloor:e.target.value,
    })
    this.getUnitList(this.state.filterBuilding,e.target.value)
  }

  paymentRegistration = () => {
    if(this.state.paymentType === "partial"){
      this.registerPartialPayment(this.state.downloadId,this.state.partialPaymentAmount)
    }else{
      this.registerFullPayment(this.state.downloadId)
    }
  }

  getInvoiceList = async (data:any) => {
    const {buildingId,floorNo,unitId,paymentType,status,searchKey,page} = data
    this.getInvoiceListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_fees_payment/invoices?search=${searchKey|| ""}&unit_id=${unitId|| ""}&building_id=${buildingId|| ""}&floor_number=${floorNo|| ""}&select_status=${status|| ""}&select_type=${paymentType|| ""}&page=${page || 1}`,
    });
    return true
  };

  getBuildingList = async () => {
    this.getBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/buiding_list`,
    });
    return true
  };

  getInvoiceDetails = async (id:any) => {
    this.getInvoiceDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/${id}/generate_invoice`,
    });
    return true
  };

  getUnitList = async (buildingId:any,floorId:any) => {
    this.getUnitListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/unit_list?building_management_id=${buildingId}&floor_number=${floorId}`,
    });
    return true
  };

  getFloorList = async (buildingId:any) => {
    this.getFloorListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/floor_number?building_id=${buildingId}`,
    });
    return true
  };

  registerFullPayment = async (Id:any) => {
    this.registerFullPaymentId = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `/bx_block_fees_payment/invoices/${Id}/invoice_register_full_payment`,
    });
    return true
  };

  registerPartialPayment = async (Id:any,partialAmount:any) => {
    this.registerPartialPaymentId = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `/bx_block_fees_payment/invoices/${Id}/invoice_register_partial_payment?partial_amount=${partialAmount}`,
    });
    return true
  };

  handleSearch = (e:any) => {
    this.setState({
      searchKey:e.target.value
    })
    this.getInvoiceList({
      buildingId:this.state.filterBuilding,
      floorNo:this.state.filterFloor,
      unitId:this.state.filterUnit,
      paymentType:this.state.filterType,
      status:this.state.filterStatus,
      searchKey:e.target.value,
      page:this.state.page,
    })
  }

    handleModalOpen = (id:any) => {
        this.setState({openModal:true});
        this.getInvoiceDetails(id)
    };
    
    handleModalClose = () => {
      this.setState({openModal:false,invoiceDetails:{}});
      console.log("close---->")
    };

    handleSelect = (e: any) => {
      console.log("select===>")
      this.setState({payment_type:e.target.value})
    }

}
// Customizable Area End