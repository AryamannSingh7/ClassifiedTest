// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";
import moment from "moment";
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
  pollListing:any;
  selectCode:any;
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
  upload: any;
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
      selectCode:"+966",

    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {

  }

  handleChange = (e: any) => {
    if (e.target.value) {
      this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
    }
  }

  visitorAddSchema() {
    const validations = Yup.object().shape({
      visitorName: Yup.string().required(`This field is required`).trim(),
      phone: Yup.number()
          .typeError("Only numbers are allowed.")
          .required("Mobile number is required.")
          .positive("Negative numbers are not allowed.")
          .integer("Number can't contain a decimal.")
          .min(10000000, "Minimum 5 digits are required.")
          .max(99999999999, "Maximum 11 digits are allowed."),
      photo: Yup.mixed().required("Required"),
      date: Yup.string()
          .required("Required")
          .matches(/\S/, "Required"),
      time: Yup.string()
          .required("Required")
          .matches(/\S/, "Required")
          .when("date", (date:any, schema:any) => {
            const newDate = date && moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
            return schema.test({
              test: (time: any) => {
                if (date && time) {
                  const test = moment(newDate + ` ${time}`, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
                  return moment(test).isAfter(new Date());
                }
                return true;
              },
              message: "You have entered past time",
            });
          }),
    });
    return validations
  }

  createVisitorRequest(values:any){
    console.log("Values",values)
  }

  doEmailLogIn(data:any): boolean {
    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };

  handleClose = (e?:any, v?:any) => {
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

  handleClick_1 = (event:any) => {
    this.setState({anchorEl_1:event.currentTarget})
  };

  handleClose_1 = (e?:any, v?:any) => {
    let status : any ;
    if(v === undefined || v === null){
      status =this.state.status;
    }
    else {
      status =v;
    }
    this.setState({anchorEl_1:null ,status :status})
  };
}

// Customizable Area End
