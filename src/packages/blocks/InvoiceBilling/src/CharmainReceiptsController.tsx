// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { imgPasswordInVisible, imgPasswordVisible } from "../../dashboard/src/assets";
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
}

interface SS {
  id: any;
}

export default class CharmainInvoicesController extends CommonApiCallForBlockComponent<Props,S,SS> {
  getInvoiceBillingApiCallId: any
  getReceiptListId:any
  getBuildingListId:any
  getUnitListId:any;
  getFloorList:any;
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
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getBuildingList()
    this.getReceiptList({
      buildingId:this.state.filterBuilding,
      floorNo:this.state.filterFloor,
      unitId:this.state.filterUnit,
      paymentType:this.state.filterType,
      status:this.state.filterStatus,
      searchKey:this.state.searchKey,
      page:this.state.page,
    })
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getReceiptListId){
        if(responseJson.hasOwnProperty("receipts")){
          this.setState({
            receiptsList:responseJson?.receipts?.data,
            pagination:responseJson.meta.pagination,
          })
        }
      }
      if(apiRequestCallId === this.getBuildingListId){
        if(responseJson?.hasOwnProperty("buildings")){
          this.setState({
            buildingList:responseJson?.buildings
          })
        }
      }
      if(apiRequestCallId === this.getUnitListId){
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
    }
  }

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
      filterBuilding:e.target.value,
    })
    this.getUnitList(e.target.value)
  }

  getBuildingList = async () => {
    this.getBuildingListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/buiding_list`,
    });
    return true
  };

  getUnitList = async (buildingId:any) => {
    this.getUnitListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_fees_payment/invoices/unit_list?building_management_id=${buildingId}`,
    });
    return true
  };

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

    handleClick = (e: any) => {
        this.setState({anchorEl:e.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl:null});
    };

    handleModalOpen = () => {
        this.setState({openModal:true});
    };
    
    handleModalClose = () => {
      this.setState({openModal:false});
      console.log("close---->")
    };

    handleSelect = (e: any) => {
      console.log("select===>")
      this.setState({payment_type:e.target.value})
    }

}
// Customizable Area End