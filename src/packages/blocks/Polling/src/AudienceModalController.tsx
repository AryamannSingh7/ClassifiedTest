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
  handleClose:any;
  isEdit:any
}

interface S {
  audienceData:Array<Object>;
  selectedAudience:Array<any>;
  selectBuilding:any;
  floorNumber:any;
  searchText:any;
  userType:any;
  error:any;
  audienceName:any;
  isDataLoading:boolean;
  isSubmitLoading:boolean;
  listOfBuilding:any;
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
  getAudienceDataId :string = "";
  getAudienceEditDataId :string = "";
  createAudienceId:string = "";
  updateAudienceId:string = "";
  getBuldingDataId:string = "";
  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      audienceData:[],
      selectedAudience:[],
      selectBuilding:"",
      floorNumber:"",
      searchText:"",
      userType:"",
      audienceName:"",
      error:"",
      isDataLoading:false,
      isSubmitLoading:false,
      listOfBuilding:[],
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleCreate = this.handleCreate.bind(this)

  }

  async componentDidMount() {
    if(this.props.isEdit){
      this.getAudienceEditData(this.props.isEdit)
    }
    this.getBuldingData()
    this.getAudienceData()
  }

  getAudienceData = async () => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isDataLoading:true,
      selectedAudience:[]
    })
    this.getAudienceDataId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences/add_audience_member?search_building=${this.state.selectBuilding}&search_floor_number=${this.state.floorNumber}&user_type=${this.state.userType}&unit_number=${this.state.searchText}`,
    });
  }

  getBuldingData = async () => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isDataLoading:true,
      selectedAudience:[]
    })
    this.getBuldingDataId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences/buiding_list`,
    });
  }

  getAudienceEditData = async (value:any) => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isDataLoading:true,
    })
    this.getAudienceEditDataId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences/${value}`,
    });
  }

  createAudience = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isSubmitLoading:true
    })
    this.createAudienceId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpPostMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences`,
      body:JSON.stringify(data)
    });
  }

  updateAudience = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isSubmitLoading:true
    })
    this.updateAudienceId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.httpPutMethod,
      endPoint: `/society_managements/${societyID}/bx_block_survey/survey_audiences/${this.props.isEdit}`,
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
      if(this.getAudienceDataId === apiRequestCallId){
        if(responseJson.hasOwnProperty('data')){
          this.setState({
            audienceData:responseJson.data.data,
            isDataLoading:false
          })
        }else{
          console.log("ERROR",responseJson)
          this.setState({
            isDataLoading:false
          })
        }
      }
      if(this.createAudienceId === apiRequestCallId){
        if(responseJson.hasOwnProperty('data')){
          this.sentMessage("UPDATE_AUDIENCE_LIST")
          this.props.handleClose()
        }else{
          this.setState({
            isSubmitLoading:false,
            error:"Something went wrong."
          })
        }
      }
      if(this.getAudienceEditDataId === apiRequestCallId){
        if(responseJson.hasOwnProperty("data")){
          console.log("AUDIENCE EDIT",responseJson.data.attributes)
        }
        const updatedArray = responseJson.data.attributes?.accounts.map((item:any)=> {
          return item.id.toString()
        })
        this.setState({
          selectedAudience:updatedArray,
          audienceName:responseJson.data.attributes.audience_name
        })
      }if(this.getBuldingDataId === apiRequestCallId){
        console.log("BUILDINGS",responseJson)
        if(responseJson.hasOwnProperty('buildings')){
          this.setState({
            listOfBuilding:responseJson?.buildings
          })
        }else{
          console.log("Error",responseJson)
        }
      }
      if(this.updateAudienceId === apiRequestCallId){
        if(responseJson.hasOwnProperty('data')){
          this.sentMessage("UPDATE_AUDIENCE_LIST")
          this.props.handleClose()
        }else{
          this.setState({
            isSubmitLoading:false,
            error:"Something went wrong."
          })
        }
      }
    }
  }

  handleSelectAll (e:any) {
    console.log("SELECT ALL", e.target.checked)
    if(e.target.checked){
      const ids = this.state.audienceData.map((item:any)=>{
        return item.id
      })
      this.setState({
        selectedAudience:ids,
        error:""
      })
    }else{
      this.setState({
        selectedAudience:[],
        error:""
      })
    }
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  handleCheck (value:any) {
    if(this.state.selectedAudience.find((item:any)=> item === value)){
      let updatedArray = this.removeItemOnce(this.state.selectedAudience,value)
      this.setState({
        selectedAudience:updatedArray
      })
    }else{
      this.setState({selectedAudience:[
          ...this.state.selectedAudience,
          value
        ],
        error:""
      })
    }
  }

  handleCreate(){
    if(this.state.audienceName !== "" && this.state.selectedAudience.length > 0 ){
      if(this.props.isEdit){
        const response = {
          survey_audience:{
            audience_name:this.state.audienceName,
            account_ids:this.state.selectedAudience,
          }
        }
        this.setState({
          error:""
        })
        this.updateAudience(response)
      }else{
        const response = {
          survey_audience:{
            audience_name:this.state.audienceName,
            account_ids:this.state.selectedAudience,
          }
        }
        this.setState({
          error:""
        })
        this.createAudience(response)
      }

    }else{
      if(this.state.audienceName === "" && this.state.selectedAudience.length <= 0){
        this.setState({
          error:"Please At-least One User and Enter Audience Name"
        })
      }else{
        if(this.state.audienceName === ""){
          this.setState({
            error:"Please Enter Audience Name."
          })
        }else {
          this.setState({
            error:"Please Select At-least One User."
          })
        }
      }
    }
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

  sentMessage (data:any) {
    const msg : Message = new Message(getName(MessageEnum.PostDetailDataMessage))
    msg.properties['text'] = data
    this.send(msg)
  }
}

// Customizable Area End
