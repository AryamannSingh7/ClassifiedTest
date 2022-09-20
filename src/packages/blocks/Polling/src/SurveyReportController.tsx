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
  audienceModal:boolean;
  surveyPreviewAnswerID:any;
  surveyReport:any;
  reportSearch:string;
  currentReportPage:any;
  reportPagination:{
    page:any,
    total_count:any
  };
  responseModalData:any;
  surveyName:any;
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
  getGenerateReport: string = "";

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
      audienceModal:false,
      surveyPreviewAnswerID:"",
      surveyReport:[],
      reportSearch:"",
      currentReportPage:1,
      reportPagination:{
        page:1,
        total_count:""
      },
      responseModalData:{},
      surveyName:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    this.handleCloseAudienceModal = this.handleCloseAudienceModal.bind(this)
    this.handleOpenAudienceModal = this.handleOpenAudienceModal.bind(this)

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.getSurveyGenerateReport(this.state.currentReportPage)
  }


  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      let errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
      if(this.getGenerateReport === apiRequestCallId){
        console.log("REPORT RESPONSE",responseJson.report?.data?.attributes?.name_and_option?.responses)
        this.setState({
          reportPagination:responseJson.meta,
          surveyReport:responseJson.report?.data?.attributes?.name_and_option?.responses,
          surveyName:responseJson.report?.data?.attributes?.name_and_option?.survey_name,
        })
      }
    }
  }

  getSurveyGenerateReport = async (page:any,search?:any) => {
    const societyID = localStorage.getItem("society_id")
    const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({surveyPreviewAnswerID:surveyID})
    this.getGenerateReport = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/surveys/${surveyID}/generate_report?search=${search || ""}&page=${page}`,
    });
  }

  handleOpenAudienceModal (res:any) {
    console.log("RESPONSE",res)
    this.setState({
      audienceModal:true,
      responseModalData:res,
    })
  }

  handleCloseAudienceModal () {
    this.setState({
      audienceModal:false
    })
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
