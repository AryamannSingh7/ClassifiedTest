// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import * as Yup from "yup";


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  location:any;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  showDialog:boolean;
  loading:boolean;
  deleteModal:boolean
  setOpen:boolean;
  teamAddData:any;
  onGoingNomination:boolean;
  nominationTitle:any;
  nominationStartDate:any;
  nominationEndDate:any;
  nominationDescription:any;
  nominationTitleError:any;
  nominationStartDateError:any;
  nominationEndDateError:any;
  nominationDescriptionError:any;
  startDateType:any;
  endDateType:any;
  nominationsList:any;
  mainError:any;
}

interface SS {
  id: any;
}

export default class FriendListController extends BlockComponent<
  Props,
  S,
  SS
> {

  getNominationListId:string = ""
  createNominationId:string = ""
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
      showDialog:false,
      loading:false,
      deleteModal:false,
      setOpen:false,
      teamAddData:{},
      onGoingNomination:true,
      nominationDescription:"",
      nominationEndDate:"",
      nominationStartDate:"",
      nominationTitle:"",
      nominationDescriptionError:"",
      nominationEndDateError:"",
      nominationStartDateError:"",
      nominationTitleError:"",
      startDateType:"text",
      endDateType:"text",
      nominationsList:[],
      mainError:""
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  handleDeleteModal = () => {
    this.setState({
      deleteModal:!this.state.deleteModal
    })
  }

  async componentDidMount() {
    this.getNominationList()
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };

  AddTeamSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
          .email('Invalid email format')
          .strict(true)
          .lowercase(`Please enter all values in lowercase`)
          .trim()
          .required(`This field is required.`),
      usertype: Yup.string().required(`This field is required`),
      fullname: Yup.string().required(`This field is required`),
      phoneno: Yup.string().required(`This field is required`),
      building: Yup.string().required(`This field is required`),
      unit: Yup.string().required(`This field is required`),
    });
    return validations
  }

  addTeamData = (values: any) => {
    this.setState({teamAddData:values})
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

  handleValidation = () => {
    let titleValidation = false
    let startDateValidation = false
    let endDateValidation = false
    let DescriptionValidation = false

    if(this.state.nominationTitle){
      if(this.state.nominationTitle.length >=5){
        this.setState({
          nominationTitleError:""
        })
        titleValidation = true
      }else{
        this.setState({
          nominationTitleError:"Title not match the minimum requirements."
        })
      }
    }else{
      this.setState({
        nominationTitleError:"Title can't be empty."
      })
    }

    if(this.state.nominationStartDate){
      if(this.state.nominationStartDate !== ""){
        if(this.dateIsValid(this.state.nominationStartDate)){
          let today = new Date();
          today.setHours(0,0,0,0);
          let startDate = new Date(this.state.nominationStartDate)
          if (startDate <= today) {
            this.setState({nominationStartDateError: "You can not use previous date."})
          }else{
            this.setState({
              nominationStartDateError:""
            })
            startDateValidation = true
          }
        }else{
          this.setState({nominationStartDateError: "Invalid start date"})
        }
      }else{
        this.setState({nominationStartDateError: "Start Date can't be empty."})
      }
    }else{
      this.setState({nominationStartDateError: "Start Date can't be empty."})
    }

    if(this.state.nominationEndDate){
      if(this.dateIsValid(this.state.nominationEndDate)){
        let today = new Date();
        today.setHours(0,0,0,0);
        let endDate = new Date(this.state.nominationEndDate)
        let startDate = new Date(this.state.nominationEndDate)
        if (endDate <= today || endDate < startDate) {
          if(endDate <= today){
            this.setState({nominationEndDateError: "You can not use previous date."})
          }else{
            this.setState({nominationEndDateError: "You can not use previous date then start date"})
          }
        }else{
          this.setState({
            nominationEndDateError:""
          })
          endDateValidation = true
        }
      }else{
        this.setState({nominationEndDateError: "Invalid end date"})
      }

    }else{
      this.setState({nominationEndDateError: "End Date can't be empty."})
    }

    if(this.state.nominationDescription){
      if(this.state.nominationDescription.length >=5){
        this.setState({
          nominationDescriptionError:""
        })
        DescriptionValidation = true
      }else{
        this.setState({
          nominationDescriptionError:"Description not match the minimum requirements."
        })
      }
    }else{
      this.setState({nominationDescriptionError: "Description can't be empty"})
    }

    if(titleValidation && startDateValidation && endDateValidation && DescriptionValidation){
      return true
    }else{
      return false
    }
  }

  manageSubmit = () => {
    if(this.handleValidation()){
      const societyID = localStorage.getItem("society_id") || ""
      var formdata = new FormData();
      formdata.append("chairman_nomination[title]", this.state.nominationTitle);
      formdata.append("chairman_nomination[start_date]", this.state.nominationStartDate);
      formdata.append("chairman_nomination[end_date]", this.state.nominationEndDate);
      formdata.append("chairman_nomination[description]", this.state.nominationDescription);
      formdata.append("chairman_nomination[building_management_id]", societyID);
      this.createNomination(formdata)
    }
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getNominationListId === apiRequestCallId ){
        console.log("NOMINATION",responseJson,errorReponse)
        if(responseJson.hasOwnProperty("chairman_nominations") && responseJson.code === 200){
          this.setState({
            nominationsList:responseJson?.chairman_nominations?.data,
            loading:false
          })
        }
      }
      if(this.createNominationId === apiRequestCallId) {
        if(responseJson.meta.message === "Nomination created."){
          this.setState({
            setOpen:false
          })
          this.getNominationList()
        }else{
          this.setState({
            mainError:"Something Went wrong.!"
          })
        }
      }
    }
  }

  getNominationList = async () => {
    this.setState({
      loading:true
    })
    const societyID = localStorage.getItem("society_id")
    this.getNominationListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations`,
    });
  }

  createNomination = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createNominationId = await this.apiCall({
      method:"POST",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations`,
      body:data
    });
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    // console.log("Called 1",data);
    const token = localStorage.getItem('userToken') ;

    const header = {
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