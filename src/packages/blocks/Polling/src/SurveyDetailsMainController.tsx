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
  SurveyPreviewAnswer:any;
  SurveyPreviewAnswerID:any;
  cautionWindow:any;
  dateWindow:boolean,
  descriptionWindow:boolean,
  textEditor:any;
  endDate:any;
  endDateError:any;
  descriptionError:any;
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
  surveyPreviewAnswerData:string = "";
  makeEndSurveyID:string = "";

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
      SurveyPreviewAnswer: {},
      SurveyPreviewAnswerID:"",
      cautionWindow:false,
      dateWindow:false,
      descriptionWindow:false,
      textEditor:"",
      endDate:"",
      endDateError:"",
      descriptionError:"",

    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;


    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    if(window.location.search !== ""){
      this.getSurveyPreviewAnswer()
    }
  }

  manageEnd = () => {
    this.setState({
      cautionWindow:true
    })
  }

  onChangeTextEditor = (value:any) => {
    this.setState({textEditor:value})
  }

  dateIsValid(dateStr:any) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
      return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }

    return date.toISOString().startsWith(dateStr);
  }

  validateEndDate = () => {
    let endDateValidation = false
    if(this.state.endDate){
      if(this.dateIsValid(this.state.endDate)){
        let today = new Date();
        today.setHours(0,0,0,0);
        let endDate = new Date(this.state.endDate)
        let startDate = new Date(this.state.SurveyPreviewAnswer?.start_date)
        if (endDate <= today || endDate < startDate) {
          if(endDate <= today){
            this.setState({endDateError: "You can not use previous date."})
          }else{
            this.setState({endDateError: "You can not use previous date then start date"})
          }
        }else{
          this.setState({
            endDateError:""
          })
          endDateValidation = true
        }
      }else{
        this.setState({endDateError: "Invalid end date"})
      }

    }else{
      this.setState({endDateError: "End Date can't be empty."})
    }
    return endDateValidation
  }

  validateDescription = () => {
    let DescriptionValidation = false
    if(this.state.textEditor){
      if(this.state.textEditor.length >=5){
        this.setState({
          descriptionError:""
        })
        DescriptionValidation = true
      }else{
        this.setState({
          descriptionError:"Description not match the minimum requirements."
        })
      }
    }else{
      this.setState({descriptionError: "Description can't be empty"})
    }
    return DescriptionValidation
  }

  updateEndDate = () => {
    if(this.validateEndDate()){
      const societyID = localStorage.getItem("society_id")
      const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
      this.makeEndSurvey(`/society_managements/${societyID}/bx_block_survey/surveys/${surveyID}/survey_preview_update?end_date=${this.state.endDate}`)
    }
  }

  updateDescription = () => {
    if(this.validateDescription()){
      const societyID = localStorage.getItem("society_id")
      const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
      this.makeEndSurvey(`/society_managements/${societyID}/bx_block_survey/surveys/${surveyID}/survey_preview_update?description=${this.state.textEditor}`)
    }
  }

  handleEndSurvey = () => {
    const societyID = localStorage.getItem("society_id")
    const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
    this.makeEndSurvey(`/society_managements/${societyID}/bx_block_survey/surveys/${surveyID}/survey_preview_update?end_survey=true`)
  }

  getSurveyPreviewAnswer = async () => {
    const societyID = localStorage.getItem("society_id")
    const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({SurveyPreviewAnswerID:surveyID})
    this.surveyPreviewAnswerData = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/surveys/${surveyID}/survey_preview`,
    });
  }

  makeEndSurvey = async (endPoint:any) => {
      const societyID = localStorage.getItem("society_id")
      const surveyID =  window.location.search ? window.location.search.split("=")[1] : null;
      this.setState({SurveyPreviewAnswerID:surveyID})
      this.makeEndSurveyID  = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpPutMethod,
        endPoint: endPoint,
      });
    }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
      if(this.surveyPreviewAnswerData === apiRequestCallId){
        console.log("RESPONSE OF SURVEY PREVIEW",responseJson?.survey?.data?.attributes)
        this.setState({
          SurveyPreviewAnswer:responseJson?.survey?.data?.attributes || {},
          textEditor:responseJson?.survey?.data?.attributes.description
        })
      }
      if(this.makeEndSurveyID === apiRequestCallId){
        this.setState({
          dateWindow:false,
          descriptionWindow:false,
          cautionWindow:false
        })
        this.getSurveyPreviewAnswer()
      }
    }
  }

  closeCautionModal = () => {
    this.setState({
      cautionWindow:false
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
