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
  children?: any;
  index: any;
  value: any;
  TabValue:any;
  textEditorVal:any;
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
  getRecentPollsData: string;
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
      Year: '',
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
        {text: "",_destroy: "false"},
        {text: "",_destroy: "false"}
      ],
      dateSelection: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ],
      allPollsData: [],
      totalPollsCount: [],
      recentPolls: [],
      selectQuestion: [],
      PreViewPollData: [],
      loading: false,
      showDialog:false,
      children: '',
      index: '',
      value: '',
      TabValue:0,
      textEditorVal: ''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.handlePollDataChange = this.handlePollDataChange.bind(this)
    this.handlePollDataSubmit = this.handlePollDataSubmit.bind(this)

    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.onGetPolls();
    this.getTotalPollCount();
    this.getRecentPolls();
    // Customizable Area End
  }
    // Customizable Area Start

    getRecentPolls = async () => {
      this.getRecentPollsData = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: configJSON.getRecentPolls,
      });
    }

    //==============================================

    getTotalPollCount = async () => {
      this.totalPollsCount = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: configJSON.getTotalPollsCount,
      });
    }

    //==============================================

    onGetPolls = async () => {
      this.getAllPolls = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpGetMethod,
        endPoint: configJSON.getAllPolls,
      });
    }

    //==============================================

    addPollData = async (data:any) => {
      this.createPoll = await this.apiCall({
        contentType: configJSON.exampleApiContentType,
        method: configJSON.httpPostMethod,
        endPoint: configJSON.getAllPolls,
        body:JSON.stringify(data)
      });
    }

    //==============================================

    onChangeTextEditor = (value:any) => {
      this.setState({textEditorVal:value})
      this.state.PollData.description = this.state.textEditorVal
    };

    handleTabChange = (event:any, newValue: number) => {
      this.setState({TabValue:newValue});
    };
    

    handleQuestionSelect = (event:any) => {
      this.setState({selectQuestion: event.target.value})
    };
  

    handlePollDataChange = (event:any) => {
      this.setState({ PollData: {...this.state.PollData, [event.target.name] : event.target.value}}) 
    }

    handlePollDataSubmit = (event:any) => {
      event.preventDefault()
      console.log("Polls Data ==>", this.state.PollData)
      console.log("Options Data ==>", this.state.options)
        if(this.state.PreViewPollData.length || Object.keys(this.state.PreViewPollData).length){
          let reqPayload = {
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
          this.addPollData(reqPayload);
          console.log("reqPayload=========", reqPayload)
          this.setState({
            PollData: this.state.InitialPollData,
            options: this.state.Initialoptions,
            checked: this.state.checked
          })
        } else{

          let reqPayload = {
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
          this.addPollData(reqPayload);
          console.log("reqPayload----------", reqPayload)
          this.setState({
            PollData: this.state.InitialPollData,
            options: this.state.Initialoptions,
            checked: this.state.checked
          })
        }
        
    // console.log("reqPayload----------", reqPayload)
    localStorage.removeItem('Polls_Data');

    }

    handlePriviewData = () => {
       localStorage.setItem('Polls_Data', JSON.stringify({
       "PollFormData":this.state.PollData,
       "PollType":this.state.checked ,
       "PollOptions":this.state.options, 
       "PollDescription":this.state.textEditorVal
      }))
    }

    handleOptionsChange = (index:any, event:any) => {
      const optionsValuse = [...this.state.options];
      optionsValuse[index][event.target.name] = event.target.value;
      this.setState({options: optionsValuse})
    }

    addOptionsFields = () => {
      this.setState({options : [...this.state.options, {text: "",_destroy: "false"}]})
    }
    
    onChange = (editorState:any) => {
      this.setState({editorState});
    }

    handleDateChange = (date: Date | null) => {
      this.setState({selectedDate:  date});
    };
  
    handleChange = (event: any) => {
      // console.log('click', event.target.value)
      //this.setState({year: event.target.value});
    };
  
    
    // Customizable Area End


  //============================= API CALL BLOCK ==========================================================
  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    // console.log("Called 1",data);

    const token = localStorage.getItem('userToken') ;
    
    // const token = `eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjMsImV4cCI6MTY1ODE5OTI1NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.Gy8vGALd2bnW16xNt95zqusPOAzhSDfhw1w-f1Z7Vu2lvACKcHTmsj5SD0VqthWAOcqDgHuCvpiQrqmgOelSfA`;
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

    // console.log('responseJson>>>>',responseJson);
    
    if (responseJson || responseJson?.data) {
      if (apiRequestCallId === this.getAllPolls) {
         this.getPollSuccessResponse(responseJson)
         this.setState({loading: false})
      }
      if (apiRequestCallId === this.createPoll) {
        console.log('ADD Poll Data',responseJson);
        this.getCreatePollResponse(responseJson)
     }
     if(apiRequestCallId === this.totalPollsCount){
      // console.log('Total Polls Data => ',responseJson);
      this.getTotalPollsCountResponse(responseJson)
     }
     if(apiRequestCallId === this.getRecentPollsData) {
      // console.log("Recent Polls ==>>>", responseJson)
      this.getRecentPollsResponse(responseJson)
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
        console.log('ADD Poll Error Data',responseJson);
        
     }
      }
  }
    
    // Customizable Area End
  }


  
  /// Success Block

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
    // console.log('get Recent Polls Response',response);
    this.setState({recentPolls: response})
    console.log('get Recent Polls Response',this.state.recentPolls);
  }
  // Error Block
  
  getPollErrorResponse = async (response: any) => {
    console.log('Error',response);
    
    }
}
