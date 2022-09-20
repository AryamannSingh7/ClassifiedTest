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
  textEditor:any;
  initialtextEditorVal:any;
  pollTitleError:string;
  pollDateError:string;
  pollEndDateError:string;
  pollDescriptionError:string;
  PreViewPollData:any;
  isAudienceEdit:any;
  deleteModal:boolean;
  isDataLoading:boolean;
  audienceList:any;
  selectedAudience:any;
  deleteAudienceId:any;
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
  getAudienceListId:string = "";
  deleteAudienceId:string = "";

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.PostDetailDataMessage)
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
          question_type: "",
          question_typeError:"",
          title:"",
          questionError:"",
          survey_options_attributes: [
            {text: "",_destroy: "false",error:""},
            {text: "",_destroy: "false",error:""}
          ],
          error:false,
          _destroy: "false",
        }
      ],
      audienceType:"",
      isSubmitted:false,
      SurveyTitleError:"",
      PreViewSurveyData: {},
      textEditor: '',
      initialtextEditorVal: '',
      pollDateError:"",
      pollEndDateError:"",
      pollDescriptionError:"",
      pollTitleError:"",
      PreViewPollData:"",
      isAudienceEdit:false,
      deleteModal:false,
      isDataLoading:false,
      audienceList:[],
      selectedAudience:[],
      deleteAudienceId:"",
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handlePollDataChange = this.handlePollDataChange.bind(this)
    this.handleSurveyDataSubmit = this.handleSurveyDataSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handlePriviewData = this.handlePriviewData.bind(this)
    this.handleOpenAudienceModal = this.handleOpenAudienceModal.bind(this)
    this.handleCloseAudienceModal = this.handleCloseAudienceModal.bind(this)
    this.handleOpenAudienceModalEditMode = this.handleOpenAudienceModalEditMode.bind(this)
    this.handleDeleteModal = this.handleDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)

  }

  async componentDidMount() {
    this.getAudienceList()
    if(localStorage.getItem("Survey_Data")){
      const surveyPreview:any = JSON.parse(localStorage.getItem("Survey_Data") || "")
      if(surveyPreview){
        await this.setState({
          textEditor:surveyPreview.PollDescription,
          SurveyData:surveyPreview.PollFormData,
          surveyQuestions:surveyPreview.PollOptions
        })
      }
      await localStorage.removeItem("Survey_Data")
    }
  }

  getAudienceList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isDataLoading:true,
    })
    this.getAudienceListId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences`,
    });
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.PostDetailDataMessage) === message.id){
      if(message.properties.text === "UPDATE_AUDIENCE_LIST"){
        this.getAudienceList()
      }
    }
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
      if(this.createSurvey === apiRequestCallId){
        if(responseJson.code === 200){
          this.setState({
            loading:false
          })
          this.props.history.push("/polling")
        }else{
          console.log("SOMETHING WENT WRONG")
        }
      }
      if(this.getAudienceListId === apiRequestCallId){
        if(responseJson.hasOwnProperty('data')){
          this.setState({
            audienceList:responseJson.data
          })
        }
      }
      if(this.deleteAudienceId === apiRequestCallId){
        if(responseJson.hasOwnProperty('data')){
          this.setState({
            deleteModal:false,
            deleteAudienceId:"",
          })
          this.getAudienceList()
        }
      }
    }
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  selectAudience(value:any){
    console.log("SELECTED",value)
    if(this.state.selectedAudience.find((item:any)=> item === value)){
      let updatedArray = this.removeItemOnce(this.state.selectedAudience,value)
      this.setState({
        selectedAudience:updatedArray
      })
    }else{
      this.setState({selectedAudience:[
          ...this.state.selectedAudience,
          value
        ]})
    }
    console.log("SELECTED",this.state.selectedAudience)
  }
  handlePollDataChange = (event:any) => {
    this.setState({ SurveyData: {...this.state.SurveyData, [event.target.name] : event.target.value}})
    if(this.state.isSubmitted){
      this.handleValidation()
    }
  }

  onChangeTextEditor = (value:any) => {
    this.setState({textEditor:value})
    if(this.state.isSubmitted){
      this.handleValidation()
    }
    this.state.SurveyData.description = this.state.textEditor
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
    let optionValidation = false
    console.log("THIS IS FROM DATA",this.state)
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
        let startDate = new Date(this.state.SurveyData?.startDate)
        if (endDate <= today || endDate < startDate) {
          if(endDate <= today){
            this.setState({pollEndDateError: "You can not use previous date."})
          }else{
            this.setState({pollEndDateError: "You can not use previous date then start date"})
          }
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

    let updatedArray = this.state.surveyQuestions.map((item:any) => {
       let question_typeValidation = false
       let questionValidation = false
       let optionsValidation = false
       if(item.question_type !== ""){
         question_typeValidation = true
       }
       if(item.title !== ""){
         questionValidation = true
       }
        let updatedArry = item.survey_options_attributes.map((item:any) => {
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
        updatedArry.forEach((item:any)=>{
          if(item.error !== ""){
            return
          }else{
            optionsValidation = true
          }
        })
       if(!questionValidation || !question_typeValidation)
       {
          let updatedObject = item
          if(!questionValidation){
            updatedObject = {
              ...updatedObject,
              questionError:"Question Can't be empty",
              error:true
            }
          }else{
            updatedObject =  {
              ...updatedObject,
              questionError:""
            }
          }
          if(!question_typeValidation){
            updatedObject =  {
              ...updatedObject,
              question_typeError:"Please select Question Type",
              error:true
            }
          }else{
            updatedObject =  {
              ...updatedObject,
              question_typeError:"",
            }
          }
          return {
            ...updatedObject,
            survey_options_attributes:updatedArry
          }
       }else{
         if(question_typeValidation && questionValidation && optionsValidation){
           return {
             ...item,
             survey_options_attributes:updatedArry,
             questionError:"",
             question_typeError:"",
             error:false
           }
         }else{
           if(item.question_type === "short_answers"){
             return {
               ...item,
               survey_options_attributes:updatedArry,
               questionError:"",
               question_typeError:"",
               error:false
             }
           }else{
             return {
               ...item,
               survey_options_attributes:updatedArry,
               questionError:"",
               question_typeError:"",
               error:true
             }
           }
         }
       }
    })
    console.log("THIS IS UPDATED ARRAY",updatedArray)
    this.setState({
      surveyQuestions:updatedArray
    })
    updatedArray.forEach((item:any)=>{
      if(item.error){
        return
      }else{
        optionValidation = true
      }
    })
    console.log("ARRAY",optionValidation)
    if(titleValidation && startDateValidation && endDateValidation && DescriptionValidation && optionValidation){
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
          survey_options_attributes:[
            // @ts-ignore
            ...item.survey_options_attributes,
            {text: "",_destroy: "false",error:""}
          ]
        }
      }else{
        return item
      }
    })
    this.setState({surveyQuestions :updatedArray})
  }

  handleDeleteModal (value:any) {
    console.log("DELETE",value)
    this.setState({
      deleteModal:true,
      deleteAudienceId:value
    })
  }

  closeDeleteModal () {
    this.setState({
      deleteModal:false,
      deleteAudienceId:""
    })
  }


  handleQuestionType(index:any,event:any) {
    const updatedArray = this.state.surveyQuestions.map((item:any,key:any)=>{
      if(key === index){
        return{
          ...item,
          question_type:event.target.value,
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
          title:event.target.value,
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
        const updateOptions = item.survey_options_attributes.map((item,key)=>{
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
          survey_options_attributes:updateOptions
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
        question_type: "",
        question_typeError:"",
        title:"",
        questionError:"",
        survey_options_attributes: [
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
      localStorage.setItem('Survey_Data', JSON.stringify({
        "PollFormData":this.state.SurveyData,
        "PollOptions":this.state.surveyQuestions,
        "PollDescription":this.state.textEditor
      }))
      // @ts-ignore
      this.props.history.push("/SurveyPreview")
    }
  }

  handleSurveyDataSubmit =  async (event:any,preview?:boolean) => {
    event.preventDefault()
    let societyID = localStorage.getItem("society_id")
    this.setState({
      isSubmitted: true,
    })
    if (this.handleValidation() || preview) {
      this.setState({
        loading:true
      })
      let reqPayload = {
        "society_id": societyID,
        "survey":
            {
              "type_name": "survey",
              "title": this.state.SurveyData.title,
              "description": this.state.SurveyData.description,
              "schedule": "1",
              "start_date": this.state.SurveyData.startDate,
              "end_date": this.state.SurveyData.endDate,
              "survey_questions_attributes": this.state.surveyQuestions,
            }
      }
      await this.addSurveyData(reqPayload);
      localStorage.removeItem("Survey_Data")
    }
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

  deleteAudience = async () => {
    const societyID = localStorage.getItem("society_id")
    this.deleteAudienceId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpDeleteMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences/${this.state.deleteAudienceId}`,
    });
  }

  handleCloseAudienceModal () {
    this.setState({
      audienceModal:false,
      isAudienceEdit:false,
    })
  }

  handleOpenAudienceModal () {
    this.setState({
      audienceModal:true
    })
  }

  handleOpenAudienceModalEditMode (value:any) {
    this.setState({
      audienceModal:true,
      isAudienceEdit:value,
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
