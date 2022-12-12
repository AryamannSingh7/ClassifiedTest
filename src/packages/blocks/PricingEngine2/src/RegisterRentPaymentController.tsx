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
}

interface SS {
  id: any;
}

export default class CoverImageController extends BlockComponent<
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
      partialPaymentAmount:""
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
      if (this.getRentUnitListId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            UnitListing:responseJson.data
          })
        }
      }
      if (this.getRentBuildingListId === apiRequestCallId) {
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            BuildingListing:responseJson.data
          })
        }
      }
      if(this.RegisterRentPaymentId === apiRequestCallId){
        if(responseJson.hasOwnProperty("data")){
          window.history.back()
        }
      }
    }
  }

  getAmountDue = async () => {
    if(this.state.selectedUnit && this.state.selectedBuilding && this.state.selectedMonth){
      this.getRentDueAmountId = await this.apiCall({
        contentType: "application/json",
        method: "GET",
        endPoint: `bx_block_rent_payment/due_amount?building_name=${this.state.selectedBuilding}&month=${this.state.selectedMonth}&unit_name=${this.state.selectedUnit}`,
      });
    }
  }

  getRentBuildingList = async () => {
    this.getRentBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/buildings`,
    });
  };

  getRentUnitList = async (id:any) => {
    console.log("BuildingID",id)
    this.getRentUnitListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/apartments/${id}`,
    });
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
  
  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };

  handleClose = () => {
    this.setState({anchorEl:null})
  };
}

// Customizable Area End
