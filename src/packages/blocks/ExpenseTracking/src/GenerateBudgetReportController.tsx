// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

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
  budgetYear: any;
  budgetYearError:any;
  audienceModal:any;
  budgetItems:Array<any>;
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
  selectedAudienceId:any
  selectedAudienceName:any,
  audienceValidationError:any;
  deleteAudienceId:any;
  totalBudget:any
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
      budgetYear:"",
      budgetYearError:"",
      audienceModal:false,
      budgetItems: [
        {
          budgetCategory: "",
          budgetCategoryError:"",
          amount:"",
          amountError:"",
                   
          descriptionError:"",
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
      totalBudget:0,
      audienceList:[],
      selectedAudience:"",
      selectedAudienceId:"",
      selectedAudienceName:"",
      deleteAudienceId:"",
      audienceValidationError:"",
    };

    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

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
    if(localStorage.getItem("Report_Data")){
      const budgetPreview:any = JSON.parse(localStorage.getItem("Report_Data") || "")
      if(budgetPreview){
        let total = 0
        budgetPreview.budgetItems.map((item:any)=> {
          total = total + parseInt(item.amount)
        })
        await this.setState({
          budgetYear:budgetPreview.budgetYear,
          budgetItems:budgetPreview.budgetItems,
          totalBudget:total
        })
      }
      localStorage.removeItem("Survey_Data")
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
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
    }
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  onChangeTextEditor = (value:any,index:any) => {
    const updatedArray = this.state.budgetItems.map((item:any,key:any)=>{
      if(key === index){
        return{
          ...item,
          description:value,
        }
      }else{
        return item
      }
    })
    this.setState({budgetItems :updatedArray})
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

  handleTitleValidation = () => {
    let titleValidation = false
    if(this.state.budgetYear){
      if(this.state.budgetYear.length >=4){
        this.setState({
          SurveyTitleError:""
        })
        titleValidation = true
      }else{
        this.setState({
          pollTitleError:"Year not match the minimum requirements."
        })
      }
    }else{
      this.setState({
        pollTitleError:"Year can't be empty."
      })
    }
    return titleValidation
  }

  categoryValidation = (item:any) => {
    let categoryValidation = false
    if(item.budgetCategory !== ""){
      categoryValidation = true
    }
    return categoryValidation
  }

  amountValidation = (item:any) => {
    let amountValidation = false
    if(item.amount !== ""){
      amountValidation = true
    }
    return amountValidation
  }

  descriptionValidation = (item:any) => {
    let descriptionValidation = false
    if(item.description !== ""){
      descriptionValidation = true
    }
    return descriptionValidation
  }
  handleOptionValidation = () => {
    let optionValidation = false
    let updatedArray = this.state.budgetItems.map((item:any) => {
      let categoryValidation = false
      let amountValidation = false
      let descriptionValidation = false
      categoryValidation = this.categoryValidation(item)
      amountValidation = this.amountValidation(item)
      descriptionValidation = this.descriptionValidation(item)

      if(!categoryValidation || !amountValidation || !descriptionValidation)
      {
        let updatedObject = item
        if(!categoryValidation){
          updatedObject = {
            ...updatedObject,
            budgetCategoryError:"Category Can't be empty",
            error:true
          }
        }else{
          updatedObject =  {
            ...updatedObject,
            budgetCategoryError:""
          }
        }
        if(!amountValidation){
          updatedObject =  {
            ...updatedObject,
            amountError:"Please Enter Amount",
            error:true
          }
        }else{
          updatedObject =  {
            ...updatedObject,
            amountError:"",
          }
        }
        if(!descriptionValidation){
          updatedObject =  {
            ...updatedObject,
            descriptionError:"Please Enter Description",
            error:true
          }
        }else{
          updatedObject =  {
            ...updatedObject,
            descriptionError:"",
          }
        }
        return {
          ...updatedObject,
        }
      }else{
        if(categoryValidation && amountValidation && descriptionValidation){
          return {
            ...item,
            error:false
          }
        }else{
          return {
            ...item,
            error:true
          }
        }
      }
    })
    this.setState({
      budgetItems:updatedArray
    })
    optionValidation = this.manageOptionValidation(updatedArray)
    return optionValidation
  }

  manageOptionValidation = (updatedArray:any) => {
    let optionValidation = false
    updatedArray.forEach((item:any)=>{
      if(item.error){
        return
      }else{
        optionValidation = true
      }
    })
    return optionValidation
  }
  handleValidation(){
    let titleValidation = false
    let optionValidation = false

    titleValidation = this.handleTitleValidation()
    optionValidation = this.handleOptionValidation()

    if(titleValidation && optionValidation){
      return true
    }else{
      return false
    }
  }

  deleteQuestion = (mainKey:any) => {

    let updatedArray = this.state.budgetItems
    if (mainKey > -1) {
      updatedArray.splice(mainKey, 1)
    }
    console.log("UpdatedArray",updatedArray)
    this.setState({
      budgetItems:updatedArray
    })
  }

  handleDeleteModal (value:any) {
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


  handleBudgetCategory(index:any,event:any) {
    const updatedArray = this.state.budgetItems.map((item:any,key:any)=>{
      if(key === index){
        return{
          ...item,
          budgetCategory:event.target.value,
        }
      }else{
        return item
      }
    })
    this.setState({budgetItems :updatedArray})
  }

  handleBudgetAmount(index:any,event:any) {
    const updatedArray = this.state.budgetItems.map((item:any,key:any)=>{
      if(key === index){
        return{
          ...item,
          amount:event.target.value,
        }
      }else{
        return item
      }
    })
    this.setState({budgetItems :updatedArray})
  }


  addQuestionFields = () => {
    this.setState({budgetItems : [...this.state.budgetItems, {
        budgetCategory: "",
        budgetCategoryError:"",
        amount:"",
        amountError:"",
        description:"",
        descriptionError:"",
        error:false,
        _destroy: "false",
      }
      ]})
  }

  handlePreviewForm = () => {
    this.setState({
      isSubmitted:true
    })
    if(this.handleValidation()){
      localStorage.setItem('Report_Data', JSON.stringify({
        budgetYear:this.state.budgetYear,
        budgetItems:this.state.budgetItems,
      }))
      // @ts-ignore
      this.props.history.push("/GenerateBudgetReport")
    }
  }

  handlePriviewData = () => {
    this.setState({
      isSubmitted:true
    })
    if(this.handleValidation()){
      localStorage.setItem('Report_Data', JSON.stringify({
        budgetYear:this.state.budgetYear,
        budgetItems:this.state.budgetItems,
      }))
      // @ts-ignore
      this.props.history.push("/GenerateBudgetReportPreview")
    }
  }

  handleSurveyDataSubmit =  async (event:any,preview?:boolean) => {
    event.preventDefault()
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
    return requestMessage.messageId;
  };
  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };

  handleClose = (e?:any, v?:any) => {
    let sortBy : any ;
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
