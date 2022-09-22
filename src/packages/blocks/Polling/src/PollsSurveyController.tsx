import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {Editor, EditorState} from 'draft-js';
import { addDays } from 'date-fns'
import Parser from 'html-react-parser';
// Customizable Area End
const {baseURL} = require("../../../framework/src/config")
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  Year: string;
  selectedDate:any,
  checked: boolean,
  editorState:any,
  PollData: any,
  InitialPollData: any,
  Initialoptions:any,
  options: any,
  allPollsData: any,
  dateSelection:any,
  totalPollsCount: any,
  totalSurveyCount: any,
  recentPolls: any,
  recentSurveys:any,
  selectQuestion: any,
  PreViewPollData:any,
  loading: boolean;
  showDialog:boolean;
  dialogText:any;
  dialogCount:any;
  children?: any;
  index: any;
  value: any;
  TabValue:any;
  textEditorVal:any;
  initialtextEditorVal:any;
  livePollsData:any;
  oldPollsData:any;
  pollPreviewAnswer:any;
  submitPollOption:any;
  pollOptionAnswer:any;
  pollPreviewAnswerID:any;
  finalPollAnswer:any;
  pollDateError: String;
  pollEndDateError:String;
  pollTitleError: String;
  pollDescriptionError: String;
  pollQuestionError: String;
  pollOptionasError: String;
  generatePollReport:Array<Object>;
  isSubmitted:boolean;
  validationErrors:Object;
  reportPagination:{
    page:any,
    total_count:any
  };
  reportSearch:any;
  currentReportPage:any;
  filterModal:boolean;
  audienceModal:boolean;
  surveyOptions:Array<Object>;
  audienceType:"";
  selectedFilter:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PollingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllPolls:string;
  createPoll:string;
  totalPollsCount: string;
  totalSurveyCount:string;
  getRecentPollsData: string;
  getRecentSurveyData:string;
  getLivePolls: string;
  getOldPolls:string;
  pollPreviewAnswer: string;
  submitPollAnswer:string;
  getGenerateReport:string;
  getLivePollsSurveys: string;
  getOldPollsSurveys:string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      Year: 'This Month',
      selectedDate: new Date(),
      checked: false,
      editorState: EditorState.createEmpty(),
      InitialPollData: { 
        title:'',
        startDate:'', 
        endDate:'', 
        description:'',
        question:'',
      },
      Initialoptions:[
        {text: "",_destroy: "false"},
        {text: "",_destroy: "false"}
      ],
      PollData: { 
        title:'',
        startDate:'', 
        endDate:'', 
        description:'',
        question:'',
      },
      options: [ 
        {text: "",_destroy: "false",error:""},
        {text: "",_destroy: "false",error:""}
      ],
      dateSelection: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ],
      submitPollOption: [],
      allPollsData: [],
      totalPollsCount: [],
      recentPolls: [],
      recentSurveys: [],
      selectQuestion: [],
      PreViewPollData: [],
      livePollsData:[],
      oldPollsData:[],
      pollPreviewAnswer:[],
      pollOptionAnswer: "",
      // [
      //   {poll_id: "", polling_option_id: ""}
      // ]
      finalPollAnswer:[],
      pollPreviewAnswerID: "",
      loading: false,
      showDialog:false,
      children: '',
      index: '',
      value: '',
      TabValue:0,
      textEditorVal: '',
      initialtextEditorVal: '',
      pollDateError: "",
      pollEndDateError:"",
      pollTitleError: "",
      pollDescriptionError: "",
      pollQuestionError: "",
      pollOptionasError: "",
      generatePollReport:[],
      dialogText:"",
      dialogCount:"",
      isSubmitted:false,
      validationErrors:{
        title:null,
        startDate:null,
        endDate:null,
        description:null,
        question:null,
        option:null,
      },
      reportPagination:{
        page:1,
        total_count:""
      },
      reportSearch:"",
      currentReportPage:1,
      filterModal:false,
      audienceModal:false,
      surveyOptions: [
        {
          questionType: "",
          description:"",
          question:"",
          options: [
            {text: "",_destroy: "false",error:""},
            {text: "",_destroy: "false",error:""}
          ],
          _destroy: "false",
          error:""
        }
      ],
      audienceType:"",
      selectedFilter:"",
      totalSurveyCount:"",
      // Customizable Area End

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handleCloseFilterModal = this.handleCloseFilterModal.bind(this)
    this.handleOpenFilterModal = this.handleOpenFilterModal.bind(this)
    this.handleCloseAudienceModal = this.handleCloseAudienceModal.bind(this)
    this.handleOpenAudienceModal = this.handleOpenAudienceModal.bind(this)
    this.selectAudience = this.selectAudience.bind(this)
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.apiCallFunction();
    // Customizable Area End

  }
    // Customizable Area Start

    apiCallFunction = async () =>  {
      this.livePollsSurveysData();
      this.oldPollsSurveysData();
    }

    applyFilter = () => {
      this.handleCloseFilterModal()
      this.livePollsSurveysData();
      this.oldPollsSurveysData();
    }

  //==============================================

  oldPollsSurveysData = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getOldPollsSurveys = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_polling/poll_surveys/old_polls_surveys?type=${this.state.selectedFilter}`,
    });
  }

  //==============================================

  livePollsSurveysData = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getLivePollsSurveys = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_polling/poll_surveys/live_polls_surveys?type=${this.state.selectedFilter}`,
    });
  }

    //==============================================

    //==============================================

    addPollAnswerData = async (data:any) => {
      const societyID = localStorage.getItem("society_id")
      this.submitPollAnswer = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpPostMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/answers`,
        body:JSON.stringify(data)
      });
    }


  handlePollSurveyNavigation (isTaken:any,type:any,id:any) {
    if(isTaken && type === "poll"){
      // @ts-ignore
      this.props.history.push("/PollVoteView?id="+id)
    }
    if(!isTaken && type === "poll"){
      // @ts-ignore
      this.props.history.push("/SubmitPoll?id="+id)
    }
    if(type === "survey") {
      // @ts-ignore
      this.props.history.push("/TakeSurvey?id="+id)
    }
    // if(isTaken && type === poll)
    // item?.attributes?.flag ? this.props.history.push("/PollVoteView?id="+item.id) : this.props.history.push("/SubmitPoll?id="+item.id)
  }

    //==============================================

  handlePollSurveyNavigationOld (isTaken:any,type:any,id:any) {
    if(type === "poll"){
      // @ts-ignore
      this.props.history.push("/PollVoteView?id="+id)
    }
    if(type === "survey") {
      // @ts-ignore
      this.props.history.push(`/TakeSurvey?id=${id}`)
    }
    // if(isTaken && type === poll)
    // item?.attributes?.flag ? this.props.history.push("/PollVoteView?id="+item.id) : this.props.history.push("/SubmitPoll?id="+item.id)
  }


    handleCloseFilterModal () {
      this.setState({
        filterModal:false
      })
    }

  handleOpenFilterModal () {
    this.setState({
      filterModal:true
    })
  }

  handleCloseAudienceModal () {
    this.setState({
      audienceModal:false
    })
  }

  handleOpenAudienceModal () {
    this.setState({
      audienceModal:true
    })
  }

  selectAudience(type:any){
    this.setState({
      audienceType:type,
    })
  }

    getPollSelectedAnswer = (value:any) => {
      this.setState({pollOptionAnswer:value})
    }


    handleTabChange = (event:any, newValue: number) => {
      this.setState({TabValue:newValue});
    };
    

    handleQuestionSelect = (event:any) => {
      this.setState({selectQuestion: event.target.value})
    };
  
    
    // Customizable Area End


  //============================= API CALL BLOCK ==========================================================
  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
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


  async receive(from: string, message: Message) {
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
    // Customizable Area Start

    
    if (responseJson || responseJson?.data) {
      if (apiRequestCallId === this.getAllPolls) {
         this.getPollSuccessResponse(responseJson)
         this.setState({loading: false})
      }
      if (apiRequestCallId === this.createPoll) {
        this.getCreatePollResponse(responseJson)
        // @ts-ignore
        this.props.history.push("/Polling")
     }
     if(apiRequestCallId === this.totalPollsCount){
      this.getTotalPollsCountResponse(responseJson)
     }
      if(apiRequestCallId === this.totalSurveyCount){
        this.getTotalSurveyCountResponse(responseJson)
      }

     if(apiRequestCallId === this.getRecentPollsData) {
      this.getRecentPollsResponse(responseJson)
     }
     if(apiRequestCallId === this.getOldPolls) {
      // this.getOldPollsData(responseJson)
     }
     if(apiRequestCallId === this.getLivePolls) {
      // this.getLivePollsData(responseJson)
     }
     if(apiRequestCallId === this.pollPreviewAnswer) {
      this.getPollPreviewAnswerData(responseJson)
     }
     if(apiRequestCallId === this.submitPollAnswer) {
      this.getSubmitPollAnswer(responseJson)
     }
     if(apiRequestCallId === this.getGenerateReport) {
       if(responseJson.hasOwnProperty("report")){
         this.getGeneratePollReport(responseJson?.report?.data)
         this.setState({
            reportPagination:responseJson.meta
         })
       }
     }
     if(apiRequestCallId === this.getRecentSurveyData){
      if(responseJson?.surveys?.data){
        this.setState({
          recentSurveys:responseJson?.surveys?.data
        })
      }else{
        console.log("ERROR!!",responseJson)
      }
     }
     if(apiRequestCallId === this.getLivePollsSurveys){
       this.setState({livePollsData: responseJson.polls_survey.data})
     }
      if(apiRequestCallId === this.getOldPollsSurveys){
        this.setState({oldPollsData: responseJson.polls_survey.data})
      }
    }
//Error Block    
    else if (responseJson && responseJson?.error || responseJson?.errors) {
      // if (responseJson?.errors[0]?.token == "Token has Expired" || responseJson?.errors[0]?.token == "Invalid token") {
      //   localStorage.clear();
      //   window.location.href = '/';
      // };
      if (apiRequestCallId === this.getAllPolls) {
        this.getPollErrorResponse(responseJson)
       }
       if (apiRequestCallId === this.createPoll) {
        // console.log('ADD Poll Error Data',responseJson);  
      }
      }
  }
    
    // Customizable Area End
  }


  
  /// Success Block
  getCreatePollResponse = async (response: any) => {
    this.setState({PreViewPollData: response})
  }

  getPollSuccessResponse = async (response: any) => {
    this.setState({allPollsData: response})
  }

  getTotalPollsCountResponse = async (response: any) => {
    this.setState({totalPollsCount: response})
  }

  getTotalSurveyCountResponse = async (response: any) => {
    this.setState({totalSurveyCount: response})
  }

  getRecentPollsResponse = async (response: any) => {
    this.setState({recentPolls: response})
  }

  getLivePollsData = async (response: any) => {
    this.setState({livePollsData: response.polls?.data})
  }

  getOldPollsData = async (response: any) => {
    this.setState({oldPollsData: response.polls?.data})
  }

  getPollPreviewAnswerData = async (response: any) => {
    this.setState({pollPreviewAnswer: response})
  }

  getSubmitPollAnswer = async (response: any) => {
    this.setState({finalPollAnswer: response})
  }

  getGeneratePollReport = async (response: any) => {
    this.setState({generatePollReport: response})
  }

  handleDownload () {
    const pollID =  window.location.search ? window.location.search.split("=")[1] : null;
      window.open(`${baseURL}/society_managements/4/bx_block_polling/polls/${pollID}/download_report.pdf`,'_blank')
  }
  // Error Block
  
  getPollErrorResponse = async (response: any) => {
    
  }
}
