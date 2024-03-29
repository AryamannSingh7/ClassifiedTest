import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {Editor, EditorState} from 'draft-js';
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
  recentPolls: any,
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
  surveyQuestions:Array<Object>;
  audienceType:string;
  questionType:string;

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SurveyController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllPolls:string;
  createPoll:string;
  totalPollsCount: string;
  getRecentPollsData: string;
  getLivePolls: string;
  getOldPolls:string;
  pollPreviewAnswer: string;
  submitPollAnswer:string;
  getGenerateReport:string;
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
      surveyQuestions: [
        {
          questionType: "",
          questionTypeError:"",
          question:"",
          questionError:"",
          options: [
            {text: "",_destroy: "false",error:""},
            {text: "",_destroy: "false",error:""}
          ],
          _destroy: "false",
        }
      ],
      audienceType:"",
      questionType:"",
      // Customizable Area End

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handlePollDataChange = this.handlePollDataChange.bind(this)
    this.handlePollDataSubmit = this.handlePollDataSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handlePriviewData = this.handlePriviewData.bind(this)
    this.handleReportSearch = this.handleReportSearch.bind(this)
    this.handleReportPagination = this.handleReportPagination.bind(this)
    this.handleCloseFilterModal = this.handleCloseFilterModal.bind(this)
    this.handleOpenFilterModal = this.handleOpenFilterModal.bind(this)
    this.handleCloseAudienceModal = this.handleCloseAudienceModal.bind(this)
    this.handleOpenAudienceModal = this.handleOpenAudienceModal.bind(this)
    this.selectAudience = this.selectAudience.bind(this)
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start

    // this.onGetPolls(this.state.Year);
    // this.getTotalPollCount();
    // this.getRecentPolls();
    // this.apiCallFunction();
    //
    // Customizable Area End

  }
    // Customizable Area Start

    apiCallFunction = async () =>  {
      await this.livePollsData();
      await this.oldPollsData();
      if(window.location.search !== ""){
        await this.getPollPreviewAnswer();
        await this.getPollGenerateReport(this.state.currentReportPage)
      }
    }

    getRecentPolls = async () => {
      const societyID = localStorage.getItem("society_id")
      this.getRecentPollsData = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/recent_polls`
      });
    }

    //==============================================

    getTotalPollCount = async () => {
      const societyID = localStorage.getItem("society_id")
      this.totalPollsCount = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/total_polls`,
      });
    }

    //==============================================

    onGetPolls = async (filter:any) => {
      const societyID = localStorage.getItem("society_id")
      this.getAllPolls = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls?resolution=${filter}`,
      });
    }

    //==============================================

    addPollData = async (data:any) => {
      const societyID = localStorage.getItem("society_id")
      this.createPoll = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpPostMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls`,
        body:JSON.stringify(data)
      });
    }

    //==============================================

    oldPollsData = async () => {
      const societyID = localStorage.getItem("society_id")
      this.getOldPolls = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/old_polls`,
      });
    }

    //==============================================

    livePollsData = async () => {
      const societyID = localStorage.getItem("society_id")
      this.getLivePolls = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/live_polls`,
      });
    }

    //==============================================

    getPollPreviewAnswer = async () => {
      const societyID = localStorage.getItem("society_id")
      const pollID =  window.location.search ? window.location.search.split("=")[1] : null;
      this.setState({pollPreviewAnswerID:pollID})
      this.pollPreviewAnswer = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/${pollID}/poll_preview`,
      });
    }

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

    //==============================================

    getPollGenerateReport = async (page:any,search?:any) => {
      const societyID = localStorage.getItem("society_id")
      const pollID =  window.location.search ? window.location.search.split("=")[1] : null;
      this.setState({pollPreviewAnswerID:pollID})
      this.getGenerateReport = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: `/society_managements/${societyID}/bx_block_polling/polls/${pollID}/generate_report?search=${search || ""}&page=${page}`,
      });
    }
    

    //==============================================


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
      console.log("poll option answer##################", value)
      this.setState({pollOptionAnswer:value})
    }

    handlePollAnswerSubmited = () => {
      let reqPayload = {
        "answer":{
              "poll_id": this.state.pollPreviewAnswerID,
              "polling_option_id": this.state.pollOptionAnswer,
              "status": true
        }
      }
      this.addPollAnswerData(reqPayload);
      //@ts-ignore
      this.props.history.push("/PollResponseCompleted?id="+ this.state.pollPreviewAnswerID)
    }

    getFinalPollAnswerView = () => {
      //@ts-ignore
      this.props.history.push('/PollVoteView?id='+ this.state.pollPreviewAnswerID)
      this.getPollPreviewAnswer();
    }

    onChangeTextEditor = (value:any) => {
      this.setState({textEditorVal:value})
      if(this.state.isSubmitted){
        this.handleValidation()
      }
      this.state.PollData.description = this.state.textEditorVal
    };

    handleTabChange = (event:any, newValue: number) => {
      this.setState({TabValue:newValue});
    };
    

    handleQuestionSelect = (event:any) => {
      this.setState({selectQuestion: event.target.value})
    };

    createPollValidate = () => {
      let isValidate = true;
      const {title, startDate, endDate, description, question} = this.state.PollData;
      if(title == ""){
        this.setState({pollTitleError: "Title can't be empty"})
        isValidate =  false
      }else{
        this.setState({pollTitleError: ""})
        isValidate =  true
      }
      if(description == "" || description.length >= 200){
        this.setState({pollDescriptionError: "description can't be empty"})
        isValidate =  false
      }else{
        this.setState({pollTitleError: ""})
        isValidate =  true
      }
      if(question == "" || question.length >= 50){
        this.setState({pollQuestionError: "question can't be empty"})
        isValidate =  false
      }else{
        this.setState({pollTitleError: ""})
        isValidate =  true
      }
      if(startDate == "" || endDate == ""){
        this.setState({pollDateError: "Date can't be empty"})
        isValidate =  false
      }else{
        this.setState({pollTitleError: ""})
        isValidate =  true
      }
      // if(this.state.options.text == ""){
      //   this.setState({pollOptionasError: "Options can't be empty"})
      //   isValidate =  false
      // }else{
      //   this.setState({pollTitleError: ""})
      //   isValidate =  true
      // }
      return isValidate;
    }
  

    handlePollDataChange = (event:any) => {
      this.setState({ PollData: {...this.state.PollData, [event.target.name] : event.target.value}})
      if(this.state.isSubmitted){
        this.handleValidation()
      }
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

    handleValidation(){
      let titleValidation = false
      let startDateValidation = false
      let endDateValidation = false
      let DescriptionValidation = false
      let questionValidation = false
      let optionValidation = false
      if(this.state.PollData.title){
        if(this.state.PollData.title.length >=5){
          this.setState({
            pollTitleError:""
          })
          titleValidation = true
        }else{
          this.setState({
            pollTitleError:"Title not match the minimum requirements."
          })
        }
      }else{
        this.setState({
          pollTitleError:"Title can't be empty."
        })
      }

      if(this.state.PollData?.startDate){
        if(this.state.PollData?.startDate !== ""){
          if(this.dateIsValid(this.state.PollData.startDate)){
            let today = new Date();
            today.setHours(0,0,0,0);
            let startDate = new Date(this.state.PollData?.startDate)
            if (startDate <= today) {
              this.setState({pollDateError: "You can not use previous date."})
            }else{
              this.setState({
                pollDateError:""
              })
              startDateValidation = true
            }
          }else{
            this.setState({pollDateError: "Invalid start date"})
          }
        }else{
          this.setState({pollDateError: "Start Date can't be empty."})
        }
      }else{
        this.setState({pollDateError: "Start Date can't be empty."})
      }

      if(this.state.PollData?.endDate){
        if(this.dateIsValid(this.state.PollData.endDate)){
          let today = new Date();
          today.setHours(0,0,0,0);
          let endDate = new Date(this.state.PollData?.endDate)
          if (endDate <= today) {
            this.setState({pollEndDateError: "You can not use previous date."})
          }else{
            this.setState({
              pollEndDateError:""
            })
            endDateValidation = true
          }
        }else{
          this.setState({pollEndDateError: "Invalid end date"})
        }

      }else{
        this.setState({pollEndDateError: "End Date can't be empty."})
      }

      if(this.state.PollData?.description){
        if(this.state.PollData.description.length >=5){
          this.setState({
            pollDescriptionError:""
          })
          DescriptionValidation = true
        }else{
          this.setState({
            pollDescriptionError:"Description not match the minimum requirements."
          })
        }
      }else{
        this.setState({pollDescriptionError: "description can't be empty"})
      }

      if(this.state.PollData?.question){
        if(this.state.PollData.question.length >=5){
          this.setState({
            pollQuestionError:""
          })
          questionValidation = true
        }else{
          this.setState({
            pollQuestionError:"Question not match the minimum requirements."
          })
        }
      }else{
        this.setState({pollQuestionError: "question can't be empty"})
      }

      let updatedArry = this.state.options.map((item:any) => {
          if(item?.text === ""){
            return{
              ...item,
              error:"Option can't be blank"
            }
          }else{
            return{
              ...item,
              error:""
            }
          }
      })
      this.setState({
        options:updatedArry
      })
      updatedArry.forEach((item:any)=>{
        if(item.error !== ""){
          return
        }else{
          optionValidation = true
        }
      })

      console.log("ARRAY",optionValidation)


      if(titleValidation && startDateValidation && endDateValidation && DescriptionValidation && questionValidation && optionValidation){
        return true
      }else{
        return false
      }
    }

    handlePollDataSubmit =  async (event:any,preview?:boolean) => {
      event.preventDefault()
        let societyID = localStorage.getItem("society_id")
          this.setState({
            isSubmitted:true
          })
          if(this.handleValidation() || preview){
            if(this.state.PreViewPollData.length || Object.keys(this.state.PreViewPollData).length){
              let reqPayload = {
                "society_id": societyID,
                "poll":
                    {
                      "title": this.state.PreViewPollData.PollFormData.title,
                      "description": this.state.PreViewPollData.PollFormData.description,
                      "poll_type": this.state.PreViewPollData.PollType,
                      "schedule": "1",
                      "start_date": this.state.PreViewPollData.PollFormData.startDate,
                      "end_date": this.state.PreViewPollData.PollFormData.endDate,
                      "question": this.state.PreViewPollData.PollFormData.question,
                      "polling_options_attributes": this.state.PreViewPollData.PollOptions,
                    }
              }
              await this.addPollData(reqPayload);
              //@ts-ignore
              // await this.props.history.push("/Polling")
              this.setState({
                PollData: this.state.InitialPollData,
                options: this.state.Initialoptions,
                checked: this.state.checked,
                textEditorVal : this.state.initialtextEditorVal,
              })
            } else{

              let reqPayload = {
                "society_id": societyID,
                "poll":
                    {
                      "title": this.state.PollData.title,
                      "description": this.state.PollData.description,
                      "poll_type": this.state.checked,
                      "schedule": "1",
                      "start_date": this.state.PollData.startDate,
                      "end_date": this.state.PollData.endDate,
                      "question": this.state.PollData.question,
                      "polling_options_attributes": this.state.options,
                    }
              }
              await this.addPollData(reqPayload);
              //@ts-ignore
              // await this.props.history.push("/Polling")
              this.setState({
                PollData: this.state.InitialPollData,
                options: this.state.Initialoptions,
                checked: this.state.checked,
                textEditorVal : this.state.initialtextEditorVal,
              })
            }
          }
          await localStorage.removeItem('Polls_Data');
    }

    handlePriviewData = () => {
      this.setState({
        isSubmitted:true
      })
       if(this.handleValidation()){
         localStorage.setItem('Polls_Data', JSON.stringify({
           "PollFormData":this.state.PollData,
           "PollType":this.state.checked ,
           "PollOptions":this.state.options,
           "PollDescription":this.state.textEditorVal
         }))
         // @ts-ignore
         this.props.history.push("/PollPreview")
       }
    }

    addOptionsFields = (index:any) => {
      const updatedArray = this.state.surveyQuestions.map((item,key)=>{
        if(key === index){
          return{
            ...item,
            options:[
                // @ts-ignore
                ...item.options,
                {text: "",_destroy: "false",error:""}
            ]
          }
        }else{
          return item
        }
      })
      this.setState({surveyQuestions :updatedArray})
    }

    handleQuestionType(index:any,event:any) {
      const updatedArray = this.state.surveyQuestions.map((item,key)=>{
        if(key === index){
          return{
            ...item,
            questionType:event.target.value,
          }
        }else{
          return item
        }
      })
      this.setState({surveyQuestions :updatedArray})
    }

  handleQuestion(index:any,event:any) {
    const updatedArray = this.state.surveyQuestions.map((item,key)=>{
      if(key === index){
        return{
          ...item,
          question:event.target.value,
        }
      }else{
        return item
      }
    })
    console.log("updated Question",updatedArray)
    this.setState({surveyQuestions :updatedArray})
  }

    handleOptionsChange = (mainIndex:any,subIndex:any, event:any) => {
      // const optionsValuse = [...this.state.options];
      // optionsValuse[index][event.target.name] = event.target.value;
      // this.setState({options: optionsValuse})
      // if(this.state.isSubmitted){
      //   this.handleValidation()
      // }
      const updatedArray = this.state.surveyQuestions.map((item,key)=>{
        if(key === mainIndex){
          // @ts-ignore
          const updateOptions = item.options.map((item,key)=>{
            if(key === subIndex){
              return{
                ...item,
                text:event.target.value,
              }
            }else{
              return item
            }
          })
          return{
            ...item,
            options:updateOptions
          }
        }else{
          return item
        }
      })
      console.log("UPDATED OPTION ARRAY :",updatedArray)
      this.setState({surveyQuestions :updatedArray})
    }

    addQuestionFields = () => {
      this.setState({surveyQuestions : [...this.state.surveyQuestions, {
          questionType: "",
          question:"",
          options: [
            {text: "",_destroy: "false",error:""},
            {text: "",_destroy: "false",error:""}
          ],
          _destroy: "false",
          error:""
        }
        ]})
    }
    
    onChange = (editorState:any) => {
      this.setState({editorState});
    }

    handleDateChange = (date: Date | null) => {
      this.setState({selectedDate:  date});
    };
  
    handleChange = (event:any) => {
      console.log("year", event.target.value)
      this.setState({Year: event.target.value});
      this.onGetPolls(event.target.value)
    };
  
    
    // Customizable Area End


  //============================= API CALL BLOCK ==========================================================
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
     if(apiRequestCallId === this.getRecentPollsData) {
      this.getRecentPollsResponse(responseJson)
     }
     if(apiRequestCallId === this.getOldPolls) {
      this.getOldPollsData(responseJson)
     }
     if(apiRequestCallId === this.getLivePolls) {
      this.getLivePollsData(responseJson)
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
         console.log("Details for pagination",responseJson.meta)
         this.setState({
            reportPagination:responseJson.meta
         })
       }
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

  handleReportSearch (e:any) {
    this.setState({
      reportSearch:e.target.value
    })
    this.getPollGenerateReport(this.state.currentReportPage,e.target.value)
  }
  getCreatePollResponse = async (response: any) => {
    // console.log('Success',response);
    this.setState({PreViewPollData: response})
  }

  getPollSuccessResponse = async (response: any) => {
    // console.log('Success',response);
    this.setState({allPollsData: response})
    console.log("allPollsData==========",  this.state.allPollsData)
  }

  getTotalPollsCountResponse = async (response: any) => {
    // console.log('get Total Polls Count Response',response);
    this.setState({totalPollsCount: response})
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
    // console.log('get poll answer Response==>>>',this.state.finalPollAnswer);
  }

  getGeneratePollReport = async (response: any) => {
    this.setState({generatePollReport: response})
    console.log('get generatePollReport Response==>>>',this.state.generatePollReport);
  }

  handleDownload () {
    const pollID =  window.location.search ? window.location.search.split("=")[1] : null;
    console.log("THIS IS BASE URL",`${baseURL}/society_managements/4/bx_block_polling/polls/${pollID}/download_report.pdf`)
      window.open(`${baseURL}/society_managements/4/bx_block_polling/polls/${pollID}/download_report.pdf`,'_blank')
  }

  handleReportPagination (e:any,newVal:any) {
    this.setState({
      currentReportPage:newVal
    })
    this.getPollGenerateReport(newVal)
  }


  // Error Block
  
  getPollErrorResponse = async (response: any) => {
    console.log('Error',response);
    
    }
}
