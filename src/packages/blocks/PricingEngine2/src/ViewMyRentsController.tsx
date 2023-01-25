// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// import {toast} from "react-toastify";

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
  invoiceListing:any;
  paymentConfirmModal:boolean;
  isPartialPayment:boolean;
  paymentAmount:any;
  rentUpdateId:any;
  partialPayment:any;
  paymentMonth:any;
  buildingName:any;
  unitName:any;
  tenantName:any;
  partialPaymentError:any;
  mainBuildingName:any;
  mainUnitName:any;
  partialAmount:any;
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
  getRentUnitViseListId: string = "";
  partialPaymentUpdateId:string = "";
  fullPaymentUpdateId:string = "";

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
      invoiceListing:[],
      paymentConfirmModal:false,
      isPartialPayment:false,
      paymentAmount:0,
      partialPayment:0,
      paymentMonth:"",
      rentUpdateId:"",
      buildingName:"",
      unitName:"",
      tenantName:"",
      partialPaymentError:"",
      mainBuildingName:"",
      mainUnitName:"",
      partialAmount:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getRentUnitList()
  }

  handlePaymentClick= (item:any,isPartial:boolean) => {
    this.setState({
      paymentConfirmModal:true,
      isPartialPayment:isPartial,
      paymentAmount:item.attributes.rent_amount,
      rentUpdateId:item.id,
      paymentMonth:`${item?.attributes?.month} ${item?.attributes?.year}`,
      buildingName:item.attributes.building_name,
      unitName:item.attributes.apartment_name,
      tenantName:item.attributes.tenant_name,
      partialAmount:item.attributes.partial_payment,
    })
  }

  getRentUnitList = async () => {
    const {id} = this.props.match.params
    this.getRentUnitViseListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_rent_payment/monthly_payment/${id}`,
    });
  };

  UpdatePartialPayment = async (body:any) => {
    this.partialPaymentUpdateId = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `/bx_block_rent_payment/partial_payment/${this.state.rentUpdateId}`,
      body:JSON.stringify(body)
    });
  };

  UpdateFullPayment = async () => {
    this.fullPaymentUpdateId = await this.apiCall({
      contentType: "application/json",
      method: "PUT",
      endPoint: `/bx_block_rent_payment/full_payments/${this.state.rentUpdateId}`,
    });
  };


  managePayment = () => {
    if(this.state.partialPayment){
      if(this.state.partialPayment !== ""){
        const body = {
          "partial_payment": parseInt(this.state.partialPayment)
        }
        this.UpdatePartialPayment(body)
      }else{
        this.setState({
          partialPaymentError:"Please enter partial payment Amount"
        })
      }
    }else{
      this.UpdateFullPayment()
    }
  }

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

  handleCloseDeleteModal = () => {
    this.setState({
      paymentConfirmModal:false,
      paymentAmount:"",
      rentUpdateId:"",
      paymentMonth:``,
      buildingName:"",
      unitName:"",
      tenantName:"",
    })
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getRentUnitViseListId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            invoiceListing:responseJson.data,
            mainBuildingName:responseJson?.data[0]?.attributes?.building_name || "",
            mainUnitName:responseJson?.data[0]?.attributes?.unit_no || "",
          })
        }
      }
      if(this.fullPaymentUpdateId === apiRequestCallId){
        this.fullPaymentResponse(responseJson)
      }
      if(this.partialPaymentUpdateId === apiRequestCallId){
        this.partialPaymentResponse(responseJson)
      }
    }
  }
  fullPaymentResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      this.setState({
        paymentConfirmModal:false
      })
      this.getRentUnitList()
    }
  }

  partialPaymentResponse = (responseJson:any) => {
    if(responseJson.status === "SUCCESS"){
      this.setState({
        paymentConfirmModal:false
      })
      this.getRentUnitList()
    }
  }
  
  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };

  handleClose = () => {
    this.setState({anchorEl:null})
  };
}

// Customizable Area End
