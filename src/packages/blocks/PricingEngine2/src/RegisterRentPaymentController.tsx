// Customizable Area Start
import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import MessageEnum, {getName} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  match:any;
  location:any; 
}

interface S {
  anchorEl :any ;
  anchorEl_1 :any ;
  loading: boolean;
  sortBy:any;
  status:any;
  pollListing:any;
  selectedTab:any;
  paymentType:any;
  UnitListing:any;
  BuildingListing:any;
  selectedBuilding:any;
  selectedUnit:any;
  selectedMonth:any;
  partialPaymentAmount:any;
  tenantName:any;
  rentAmount:any;
  partialPaidAmount:any;
  currency:any;
  amountError:any;
  showError:boolean;
  error:any;
  contractId:any;
  monthList:any;
  successMessage:any;
  showSuccess:boolean;
}

interface SS {
  id: any;
}

export default class RegisterRentPaymentController extends CommonApiCallForBlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getRentBuildingListId: string = "";
  getRentUnitListId: string = "";
  RegisterRentPaymentId:string = "";
  getRentDueAmountId:string = "";
  getRentMonthListId:string = "";
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      anchorEl:null,
      anchorEl_1:null,
      loading:false,
      sortBy : "" ,
      status:"",
      pollListing:[],
      selectedTab:"MyInvoices",
      paymentType:"",
      UnitListing:[],
      BuildingListing:[],
      selectedBuilding:"",
      selectedUnit:"",
      selectedMonth:"",
      partialPaymentAmount:0,
      tenantName:"",
      rentAmount:"",
      partialPaidAmount:"",
      currency:"",
      amountError:"",
      showError:false,
      error:"",
      contractId:"",
      monthList:[],
      successMessage:"",
      showSuccess:false,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getRentBuildingList()
    this.getRentMonthList()
  }

  manageSelectBuilding = (e:any) => {
    this.setState({
      selectedBuilding:e.target.value
    },
      this.getAmountDue
    )
    this.getRentUnitList(e.target.value)
  }

  unitListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      this.setState({
        UnitListing:responseJson.data
      })
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      console.log("ERROR",errorReponse)
      if (this.getRentUnitListId === apiRequestCallId) {
        this.unitListResponse(responseJson)
      }
      if (this.getRentBuildingListId === apiRequestCallId) {
        this.rentBuildingList(responseJson)
      }
      if(this.RegisterRentPaymentId === apiRequestCallId){
        this.registerPaymentResponse(responseJson)
      }
      if(this.getRentDueAmountId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            tenantName:responseJson.data?.attributes?.tenant_name,
            rentAmount:responseJson.data?.attributes?.rent_amount,
            partialPaidAmount:responseJson?.data?.attributes?.partial_payment || 0,
            currency:responseJson.data?.attributes?.currency,
            contractId:responseJson.data?.attributes?.contract_id
          })
        }
      }
      if(this.getRentMonthListId === apiRequestCallId){
        if(responseJson.hasOwnProperty("month")){
          this.setState({
            monthList:responseJson.month
          })
        }
      }
    }
  }

  handleSuccessClose = () => {
    this.setState({
      showSuccess:false,
      rentAmount:"",
      tenantName:"",
      selectedUnit:"",
      selectedBuilding:"",
      selectedMonth:"",
      paymentType:"",
      currency:"",
    })
  }

  amountFormatConvert = (amount:any) => {
    const amt = amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return amt
  }
  rentBuildingList = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      this.setState({
        BuildingListing:responseJson.data
      })
    }
  }
  registerPaymentResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      this.setState({
        successMessage:"Rent payment Updated Successfully!!",
        showSuccess:true,
      })
    }else{
      this.setState({
        error:"Something went wrong"
      })
      this.showError()
    }
  }

  getAmountDue = async () => {
    if(this.state.selectedUnit && this.state.selectedBuilding && this.state.selectedMonth){
      this.getRentDueAmountId = await this.apiCall({
        contentType: "application/json",
        method: "GET",
        endPoint: `bx_block_rent_payment/due_amount?month=${this.state.selectedMonth}&apartment_id=${this.state.selectedUnit}`,
      });
    }
  }

  getRentBuildingList = async () => {
    this.getRentBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/buildings`,
    });
    return true
  };

  getRentMonthList = async () => {
    this.getRentMonthListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/rent_payments/month_list`,
    });
    return true
  };


  getRentUnitList = async (id:any) => {
    console.log("BuildingID",id)
    this.getRentUnitListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/apartments/${id}`,
    });
    return true
  };

  createPayment = () => {
    let create ={}
    if(this.state.paymentType === "" || this.state.selectedMonth === "" || this.state.selectedUnit === "" || this.state.selectedBuilding === ""){
      if(this.state.selectedMonth === ""){
        this.setState({
          showError:true,
          error:"Please select payment month"
        })
        return
      }else if(this.state.selectedBuilding === ""){
        this.setState({
          showError:true,
          error:"Please select Building"
        })
        return
      }else if(this.state.selectedUnit === ""){
        this.setState({
          showError:true,
          error:"Please select Unit No."
        })
        return
      }else if(this.state.paymentType === "" ){
        this.setState({
          showError:true,
          error:"Please select payment type"
        })
        return
      }
    }else{
      if(this.state.paymentType ==="full"){
        create={
          month:this.state.selectedMonth,
          building_management_id:this.state.selectedBuilding,
          apartment_management_id:this.state.selectedUnit
        }
        this.registerPayment(create)
      }else {
        if(this.state.rentAmount >= this.state.partialPaymentAmount){
          if(this.state.partialPaymentAmount !== 0){
            create = {
              month:this.state.selectedMonth,
              building_management_id:this.state.selectedBuilding,
              apartment_management_id:this.state.selectedUnit,
              partial_payment:this.state.partialPaymentAmount
            }
            this.registerPayment(create)
          }else{
            this.setState({
              showError:true,
              error:"Please enter partial payment amount"
            })
          }
        }else{
          this.setState({
            amountError:"Amount should not greater then rent amount"
          })
        }
      }
    }
  }

  registerPayment = async (body:any) => {
    this.RegisterRentPaymentId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_rent_payment/rent_payments`,
      body:JSON.stringify(body)
    });
  };

  showError = () => {
    if(this.state.error){
      this.setState({
        showError:true
      })
    }
  }

}

// Customizable Area End
