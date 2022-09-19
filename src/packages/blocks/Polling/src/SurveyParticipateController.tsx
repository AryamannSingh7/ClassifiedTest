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
  surveyTitle:any;
  SurveyQuestions:any;
  SurveyPreviewAnswerID:any;
  totalQuestion:any;
  currentQuestion:any;
  SurveyAns:any;
  questionOptionAnswer:Array<any>;
  questionShortAns:any;
  answers:any;
}

interface SS {
  id: any;
}

export default class SurveyParticipateController extends BlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  surveyPreviewAnswerData:string = "";
  createSurveyResponse:string = "";
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      anchorEl:null,
      anchorEl_1:null,
      loading:true,
      sortBy : "" ,
      status:"",
      surveyTitle:"",
      SurveyQuestions: [],
      SurveyPreviewAnswerID:"",
      totalQuestion:0,
      currentQuestion:0,
      SurveyAns:[],
      questionOptionAnswer:[],
      questionShortAns:"",
      answers:[],
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

  addSurveyResponse = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createSurveyResponse = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpPostMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_answers`,
      body:JSON.stringify(data)
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
        this.setState({
          surveyTitle:responseJson?.poll?.data?.attributes?.title,
          SurveyQuestions:responseJson?.poll?.data?.attributes?.survey_questions || [],
          totalQuestion:responseJson?.poll?.data?.attributes?.survey_questions.length - 1,
          loading:false
        })
      }
      if(this.createSurveyResponse === apiRequestCallId){
        if(responseJson.code === 200){
          this.props.history.push("/SurveySuccess")
        }
      }
    }
  }

  getPollSelectedAnswer = (value:any) => {
    console.log("poll option answer##################", value)
    this.setState({questionOptionAnswer:[value]})
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  getPollSelectedMultiAns = (value:any) => {
    if(this.state.questionOptionAnswer.find((item:any)=> item === value)){
      let updatedArray = this.removeItemOnce(this.state.questionOptionAnswer,value)
      this.setState({
        questionOptionAnswer:updatedArray
      })
    }else{
      this.setState({questionOptionAnswer:[
          ...this.state.questionOptionAnswer,
          value
        ]})
    }
  }

  handleShortAns = (e:any) => {
    this.setState({questionShortAns:e.target.value})
  }

  handleNext = () => {
    const questionID = this.state.SurveyQuestions[this.state.currentQuestion]?.id;
    let finalData = {}
    if(this.state.SurveyQuestions[this.state.currentQuestion]?.question_type === "short_answers"){
      finalData = {
        survey_id:this.state.SurveyPreviewAnswerID,
        survey_question_id:questionID,
        concern:this.state.questionShortAns
      }
    }else{
      finalData = {
        survey_id:this.state.SurveyPreviewAnswerID,
        survey_question_id:questionID,
        concern:this.state.questionShortAns,
        survey_option_id:this.state.questionOptionAnswer
      }
    }
    if(this.state.answers.find((item:any)=> item.survey_question_id === questionID)){
      let arrayUpdate = this.state.answers.map((item:any)=> {
        if(item.survey_question_id === questionID){
          return finalData
        }else{
          return item
        }
      })
      this.setState({
        currentQuestion:this.state.currentQuestion + 1,
        answers:arrayUpdate,
        questionShortAns:"",
        questionOptionAnswer:[]
      })
    }else{
      this.setState({
        currentQuestion:this.state.currentQuestion + 1,
        answers:[
          ...this.state.answers,
          finalData
        ],
        questionShortAns:"",
        questionOptionAnswer:[]
      })
    }
    this.state.answers.map((item:any)=>{
      if(item.survey_question_id === this.state.SurveyQuestions[this.state.currentQuestion+1].id){
        this.setState({
          questionShortAns:item.concern,
          questionOptionAnswer:item?.survey_option_id || [],
        })
      }
    })
  }

  handlePrevious = (e:any) => {
    this.state.answers.map((item:any)=>{
      if(item.survey_question_id === this.state.SurveyQuestions[this.state.currentQuestion-1].id){
        this.setState({
          questionShortAns:item.concern,
          questionOptionAnswer:item?.survey_option_id || [],
          currentQuestion:this.state.currentQuestion - 1
        })
      }
    })
  }

  handleSubmit = (e:any) => {
    const questionID = this.state.SurveyQuestions[this.state.currentQuestion]?.id;
    let finalData = {}
    if(this.state.SurveyQuestions[this.state.currentQuestion]?.question_type === "short_answers"){
      finalData = {
        survey_id:this.state.SurveyPreviewAnswerID,
        survey_question_id:questionID,
        concern:this.state.questionShortAns
      }
    }else{
      finalData = {
        survey_id:this.state.SurveyPreviewAnswerID,
        survey_question_id:questionID,
        concern:this.state.questionShortAns,
        survey_option_id:this.state.questionOptionAnswer
      }
    }

    const survey_ans = {
      survey_answer:{
        answers:[
          ...this.state.answers,
          finalData
        ]
      }
    }
    this.addSurveyResponse(survey_ans)
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
