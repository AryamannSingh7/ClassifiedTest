// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

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
}

interface SS {
  id: any;
}

export default class RegisterRentPaymentController extends BlockComponent<
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
      partialPaymentAmount:"",
      tenantName:"",
      rentAmount:"",
      partialPaidAmount:"",
      currency:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getRentBuildingList()
  }

  manageSelectBuilding = (e:any) => {
    this.setState({
      selectedBuilding:e.target.value
    },
      this.getAmountDue
    )
    this.getRentUnitList(e.target.value)
  }
  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      console.log("ERROR",errorReponse)
      if (this.getRentUnitListId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            UnitListing:responseJson.data
          })
        }
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
            rentAmount:responseJson.data?.attributes?.amount,
            partialPaidAmount:responseJson?.data?.attributes?.partial_payment,
            currency:responseJson.data?.attributes.currency,
          })
        }
      }
    }
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
      window.history.back()
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
    if(this.state.paymentType ==="full"){
      create={
        month:this.state.selectedMonth,
        building_management_id:this.state.selectedBuilding,
        apartment_management_id:this.state.selectedUnit
      }
    }else {
      create = {
        month:this.state.selectedMonth,
        building_management_id:this.state.selectedBuilding,
        apartment_management_id:this.state.selectedUnit,
        partial_payment:this.state.partialPaymentAmount
      }
    }
    this.registerPayment(create)

  }

  registerPayment = async (body:any) => {
    this.RegisterRentPaymentId = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: `/bx_block_rent_payment/rent_payments`,
      body:JSON.stringify(body)
    });
  };

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;

    const token = localStorage.getItem("userToken");

    const header = {
      "Content-Type": contentType,
      token,
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), endPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    body && requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
}

// Customizable Area End
