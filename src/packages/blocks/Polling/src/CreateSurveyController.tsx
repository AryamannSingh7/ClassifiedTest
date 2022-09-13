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
  SurveyData: any;
  audienceModal:any;
  surveyQuestions:any;
  audienceType:any;
  isSubmitted:any;
  PreViewSurveyData:any;
  SurveyTitleError:any;
  textEditorVal:any;
  initialtextEditorVal:any;
  pollTitleError:string;
  pollDateError:string;
  pollEndDateError:string;
  pollDescriptionError:string;
  PreViewPollData:any;
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
  createSurvey:string = "";

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
      SurveyData: {
        title:'',
        startDate:'',
        endDate:'',
        description:'',
        question:'',
      },
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
      isSubmitted:false,
      SurveyTitleError:"",
      PreViewSurveyData: {},
      textEditorVal: '',
      initialtextEditorVal: '',
      pollDateError:"",
      pollEndDateError:"",
      pollDescriptionError:"",
      pollTitleError:"",
      PreViewPollData:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handlePollDataChange = this.handlePollDataChange.bind(this)
    this.handlePollDataSubmit = this.handlePollDataSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handlePriviewData = this.handlePriviewData.bind(this)

  }

  async componentDidMount() {

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

  handlePollDataChange = (event:any) => {
    this.setState({ SurveyData: {...this.state.SurveyData, [event.target.name] : event.target.value}})
    if(this.state.isSubmitted){
      this.handleValidation()
    }
  }

  onChangeTextEditor = (value:any) => {
    this.setState({textEditorVal:value})
    if(this.state.isSubmitted){
      this.handleValidation()
    }
    this.state.SurveyData.description = this.state.textEditorVal
  };

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
    if(this.state.SurveyData.title){
      if(this.state.SurveyData.title.length >=5){
        this.setState({
          SurveyTitleError:""
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

    if(this.state.SurveyData?.startDate){
      if(this.state.SurveyData?.startDate !== ""){
        if(this.dateIsValid(this.state.SurveyData.startDate)){
          let today = new Date();
          today.setHours(0,0,0,0);
          let startDate = new Date(this.state.SurveyData?.startDate)
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

    if(this.state.SurveyData?.endDate){
      if(this.dateIsValid(this.state.SurveyData.endDate)){
        let today = new Date();
        today.setHours(0,0,0,0);
        let endDate = new Date(this.state.SurveyData?.endDate)
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

    if(this.state.SurveyData?.description){
      if(this.state.SurveyData.description.length >=5){
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

    let updatedArry = this.state.surveyQuestions.map((item:any) => {
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
    // this.setState({
    //   surveyOptions:updatedArry
    // })
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

  addOptionsFields = (index:any) => {
    const updatedArray = this.state.surveyQuestions.map((item:any,key:any)=>{
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
    const updatedArray = this.state.surveyQuestions.map((item:any,key:any)=>{
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
    const updatedArray = this.state.surveyQuestions.map((item:any,key:any)=>{
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
    const updatedArray = this.state.surveyQuestions.map((item:any,key:any)=>{
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
        questionTypeError:"",
        question:"",
        questionError:"",
        options: [
          {text: "",_destroy: "false",error:""},
          {text: "",_destroy: "false",error:""}
        ],
        _destroy: "false",
      }
      ]})
  }

  handlePriviewData = () => {
    this.setState({
      isSubmitted:true
    })
    if(this.handleValidation()){
      localStorage.setItem('Polls_Data', JSON.stringify({
        "PollFormData":this.state.SurveyData,
        "PollOptions":this.state.surveyQuestions,
        "PollDescription":this.state.textEditorVal
      }))
      // @ts-ignore
      this.props.history.push("/PollPreview")
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
                "type_name":"poll",
                "title": this.state.PreViewSurveyData.PollFormData.title,
                "description": this.state.PreViewSurveyData.PollFormData.description,
                "poll_type": this.state.PreViewSurveyData.PollType,
                "schedule": "1",
                "start_date": this.state.PreViewSurveyData.PollFormData.startDate,
                "end_date": this.state.PreViewSurveyData.PollFormData.endDate,
                "question": this.state.PreViewSurveyData.PollFormData.question,
                "polling_options_attributes": this.state.PreViewSurveyData.PollOptions,
              }
        }
        await this.addSurveyData(reqPayload);
        //@ts-ignore
        // await this.props.history.push("/Polling")
        this.setState({
          SurveyData: this.state.SurveyData,
          surveyQuestions: this.state.surveyQuestions,
          textEditorVal : this.state.initialtextEditorVal,
        })
      } else{

        let reqPayload = {
          "society_id": societyID,
          "poll":
              {
                "type_name":"poll",
                "title": this.state.SurveyData.title,
                "description": this.state.SurveyData.description,
                "schedule": "1",
                "start_date": this.state.SurveyData.startDate,
                "end_date": this.state.SurveyData.endDate,
                "question": this.state.SurveyData.question,
                "survey_questions_attributes": this.state.surveyQuestions,
              }
        }
        await this.addSurveyData(reqPayload);
        //@ts-ignore
        // await this.props.history.push("/Polling")
        // this.setState({
        //   SurveyData: this.state.InitialPollData,
        //   options: this.state.Initialoptions,
        //   checked: this.state.checked,
        //   textEditorVal : this.state.initialtextEditorVal,
        // })
      }
    }
    await localStorage.removeItem('Polls_Data');
  }

  addSurveyData = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createSurvey = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpPostMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/surveys`,
      body:JSON.stringify(data)
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
