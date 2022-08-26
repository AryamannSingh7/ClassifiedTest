// Customizable Area Start
//@ts-ignore
//@ts-nocheck
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
    // Customizable Area Start
    // Customizable Area End
  }

interface S {
myReceiptList: any;
loading: boolean;
anchorEl :any;
anchorEl_1 :any;
sortBy : any;
status : any;
getReceiptsDetails : any;
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ViewReceiptController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getReceiptBillingApiCallId: any
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      anchorEl:null,
      anchorEl_1:null,
      sortBy : "" ,
      status : "",
      loading: false,
      myReceiptList: [],
      getReceiptsDetails:null
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getReceiptBilling();
    console.log("receive----->", this.props)
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

     var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

    if(apiRequestCallId === this.getReceiptBillingApiCallId){
    if (responseJson && responseJson?.receipts.data ) {
        console.log("getMyApartment========================>",responseJson.receipts.data)
    this.setState({myReceiptList :responseJson?.receipts?.data})

    this.setState({loading: false})
    } else if (responseJson?.errors) {
        let error = Object.values(responseJson.errors[0])[0] as string;
        this.setState({ error });
    } else {
        this.setState({ error: responseJson?.error || "Something went wrong!" });
    }
    this.parseApiCatchErrorResponse(this.state.error);
    this.setState({loading: false , error:null})
    }

    if (apiRequestCallId === this.getReceiptDetailsApiCallId) {
      console.log("enter initially-->")
      console.log("getReceiptDetailsApiCallId ========================>",responseJson)
      if (responseJson && responseJson.receipt.data ) {
      this.setState({getReceiptsDetails :responseJson.receipt.data})
      console.log("responseJson getIncidentDetails========================>",this.state?.getReceiptsDetails)
      this.setState({loading: false})
      } else if (responseJson?.errors) {
        let error = responseJson.errors[0] as string;
          this.props.history.push("/ViewReceipt")
        this.setState({ error });
      } else {
        this.setState({ error: responseJson?.error || "Something went wrong!" });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
    }
  }
  }

  getReceiptBilling = () => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getReceiptBillingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_fees_payment/receipts`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  getDetailsReceiptBilling= (id : any) => {
    console.log("enter------>")
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getReceiptDetailsApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_fees_payment/receipts/${id}`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = (event: any) => {
    this.setState({anchorEl:event.currentTarget })
  };
  handleClose = (e: any, v: any) => {
    let sortBy : any ;
    console.log("v=========>",v)
    if(v === undefined || v === null){
      sortBy =this.state.sortBy
    }
    else {
      sortBy =v;
    }
    this.setState({anchorEl:null,sortBy : sortBy})
  };
  
  handleClick_1 = (event: any) => {
    this.setState({anchorEl_1:event.currentTarget})
  };
   
  handleClose_1 = (e: any, v: any) => {
   let status : any ;
    if(v === undefined || v === null){
      status =this.state.status;
    }
    else {
      status =v;
    }
    this.setState({anchorEl_1:null ,status :status})
  };

  getReceiptsDetails= (id) => {
    console.log("id---===>", this.props)
    this.props.history.push({
      pathname: "/ReceiptsDetails",
      id,
    });
  }
}
 // Customizable Area End