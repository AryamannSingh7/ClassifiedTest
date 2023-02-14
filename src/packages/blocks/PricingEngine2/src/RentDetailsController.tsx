// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

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
  rentDetails:any;
}

interface SS {
  id: any;
}

export default class CoverImageController extends CommonApiCallForBlockComponent<
  Props,
  S,
  SS
> {
  emailReg: RegExp;
  labelTitle: string = "";
  getMonthRentId:string = "";
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
      rentDetails:{},
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getRentUnitList()
  }

  getRentUnitList = async () => {
    const {id} = this.props.match.params
    this.getMonthRentId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_rent_payment/rent_payments/${id}`,
    });
  };

  manageDownloadReceipt = async () => {
    const {id} = this.props.match.params
    await this.downloadPdf(`/bx_block_rent_payment/download_rent_receipt/${id}`,`Receipt-${id}.pdf`)
  }

  manageDownloadInvoice = async () => {
    const {id} = this.props.match.params
    await this.downloadPdf(`/bx_block_rent_payment/download_rent_invoice/${id}`,`Invoice-${id}.pdf`)
  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getMonthRentId === apiRequestCallId){
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            rentDetails:responseJson?.data?.attributes
          })
        }
      }
    }
  }

}

// Customizable Area End
