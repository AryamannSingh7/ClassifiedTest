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
  allSurveyData: any;
  Year:any;
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
  getAllSurveys:string = "";

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
      allSurveyData:[],
      Year:'This Month',
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.onGetPolls(this.state.Year)
  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
      if(this.getAllSurveys === apiRequestCallId){
        console.log("THIS IS THE DATA",responseJson.surveys.data)
        this.setState({
          allSurveyData:responseJson?.surveys?.data
        })
      }
    }
  }


  handleChange = (event:any) => {
    console.log("year", event.target.value)
    this.setState({Year: event.target.value});
    this.onGetPolls(event.target.value)
  };

  onGetPolls = async (filter:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getAllSurveys = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/surveys?resolution=${filter}`,
    });
  }


  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    // console.log("Called 1",data);

    const token = localStorage.getItem('userToken') ;

    const header = {
      "Content-Type": contentType,
      token
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
    body && requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // console.log("Called",requestMessage);
    return requestMessage.messageId;
  };
}

// Customizable Area End