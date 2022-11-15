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
  visitorId:any;
  visitorDetails:any;
  inputType1:any;
  inputType2:any;
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
  createVisitorId:string = "";
  visitorDetailsId:string = "";
  updateVisitorId:string = "";
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
      visitorId:"",
      visitorDetails:{},
      inputType1:"text",
      inputType2:"text",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getVisitorDetails()
  }

  handleChange = (e: any) => {
    if (e.target.value) {
      this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
  }

  getVisitorDetails = async () => {
    const visitorId = this.props.match.params.id
    if(visitorId){
      this.setState({visitorId:visitorId})
      const societyID = localStorage.getItem("society_id")
      this.visitorDetailsId = await this.apiCall({
        contentType: "application/json",
        method: "GET",
        endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/${visitorId}`,
      });
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.createVisitorId === apiRequestCallId ){
        console.log("API RESPONSE WHEN CREATE",responseJson,errorReponse)
        if(responseJson.message === "Successfully created"){
          this.props.history.push("/VisitorAddSuccess")
        }
      }
      if(this.visitorDetailsId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("visitor")){
          this.setState({
            visitorDetails:responseJson.visitor.data.attributes,
            selectCode:`+${responseJson.visitor.data.attributes.mobile_number.country_code}`
          })
        }else{
          window.history.back()
        }
      }
      if(this.updateVisitorId === apiRequestCallId){
        if(responseJson.message === "Successfully updated"){
          this.props.history.push("/VisitorUpdateSuccess")
        }
      }
    }
  }

  visitorAddSchema() {
    const validations = Yup.object().shape({
      full_name: Yup.string().required(`Name is required`).trim().matches(/^[a-zA-Z\-]+$/,"Only characters are allowed in name"),
      phone: Yup.number()
          .typeError("Only numbers are allowed.")
          .required("Mobile number is required.")
          .positive("Negative numbers are not allowed.")
          .integer("Number can't contain a decimal.")
          .min(100000000, "Minimum 9 digits are required.")
          .max(1000000000, "Maximum 9 digits are allowed."),
      photo: Yup.mixed(),
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
      withCar:Yup.boolean().required("Please select Visitor will come with Vehicle or not"),
      carPlateNo:Yup.string().when("withCar",{
        is: true,
        then:Yup.string().required("Please enter Car plate Number")
      })
    });
    return validations
  }

  createVisitorRequest(values:any){
    console.log("Values",values)
    let formData = new FormData()
    formData.append('visitor[name]',values.visitorName)
    formData.append('visitor[mobile_number]', this.state.selectCode+values.phone)
    formData.append('visitor[schedule_date]', values.date)
    formData.append('visitor[schedule_time]',values.time)
    if(values.photo !== ""){
      formData.append('visitor[image]',values.photo,values.photo.name)
    }
    formData.append('visitor[comming_with_vehicle]', values.withCar)
    formData.append('visitor[vehicle_detail][car_number]', values.carPlateNo)
    if(this.state.visitorId){
      this.updateVisitor(formData)
    }else{
      this.createVisitor(formData)
    }
  }

  createVisitor = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createVisitorId = await this.apiCall({
      contentType: "multipart/form-data",
      method: "POST",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors`,
      body:data
    });
  }

  updateVisitor = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.updateVisitorId = await this.apiCall({
      contentType: "multipart/form-data",
      method: "PUT",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/${this.state.visitorId}`,
      body:data
    });
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    // console.log("Called 1",data);

    const token = localStorage.getItem('userToken') ;

    const header = {
      token
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        header
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // console.log("Called",requestMessage);
    return requestMessage.messageId;
  };

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
