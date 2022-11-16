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
import moment from "moment";


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
  setVoting:boolean;
  voted:boolean;
  startVotingModal:boolean;
  voteConfirmModal:boolean;
  votingStatus:any;
  selectedTab:any;
  detailsModal:any;
  nominateMySelf:boolean;
  nominationId:any;
  nominationData:any;
  nomineeList:any;
  detailsForModal:any;
  myProfile:any;
  updateName:any;
  updateStartDate:any;
  updateEndDate:any;
  updateDescription:any;
  nominationTitleError:any;
  nominationStartDateError:any;
  nominationEndDateError:any;
  nominationDescriptionError:any;
  myNominationDescription:any;
  myNominationDescriptionError:any;
  myNominationAs:any;
  myNominationAsError:any;
  nominatedSelf:boolean,
  vote:{voteId:any,role:any,name:any};
  myDetails:any;
  myNominateId:any
}

interface SS {
  id: any;
}

export default class FriendListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getNominationDetailsId:string = "";
  nominatedMemberListId:string = "";
  myProfileId:string = "";
  updateNominationId:string = "";
  nominateMySelfId:string = "";
  startVotingCallId:string = "";
  endVotingCallId:string = "";
  nominateId:string = "";
  cancelMyNominationId:string = "";
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
      setVoting:false,
      voted:false,
      startVotingModal:false,
      voteConfirmModal:false,
      votingStatus:"open",
      selectedTab:"Chairman",
      detailsModal:false,
      nominateMySelf:false,
      nominationId:"",
      nominationData:{},
      nomineeList:[],
      detailsForModal:{
        description: "",
        nominate_as: "",
        name: "",
        role: "",
        unit_number: []
      },
      updateName:"",
      nominationTitleError:"",
      updateStartDate:"",
      nominationStartDateError:"",
      updateEndDate:"",
      nominationEndDateError:"",
      updateDescription:"",
      nominationDescriptionError:"",
      myProfile:{},
      myNominationDescription:"",
      myNominationDescriptionError:"",
      myNominationAs:[],
      myNominationAsError:"",
      nominatedSelf:false,
      vote:{
        voteId:"",
        role:"",
        name:"",
      },
      myDetails:{},
      myNominateId:""

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.nominatedMemberList();
    this.getNominationDetails();
    this.myProfile();
  }

  manageNominate = () => {
    const data = {
      "nominate_myself":
          {
            "description": this.state.myNominationDescription,
            "nominate_as": this.state.myNominationAs.length > 1 ? "2" : this.state.myNominationAs[0]

      }
    }
    if(this.state.nominatedSelf){
      this.updateNomination(data)
    }else{
      this.nominateMySelf(data)
    }

  }

  handleDeleteModal = () => {
    this.setState({
      deleteModal:!this.state.deleteModal
    })
  }
  startVoting = () => {
    this.setState({
      setVoting:true,
      startVotingModal:false
    })
    this.startVotingCall()
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  manageSelectRole = (e:any) => {
    let selectedRole = this.state.myNominationAs
    if(selectedRole.find((item:any)=> item === e.target.value)){
      let updatedArray = this.removeItemOnce(selectedRole,e.target.value)
      this.setState({
        myNominationAs:updatedArray
      })
    }else{
      this.setState({myNominationAs:[
          ...selectedRole,
          e.target.value
        ]})
    }
  }

  confirmVote = () => {
    this.nominate(this.state.vote.voteId,this.state.vote.role)
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };

  handleOpenDetailsModal = (data:any) => {
    this.setState({detailsModal:true,detailsForModal:data});
  }

  handleCloseDetailsModal = () => {
    this.setState({detailsModal:false});
  }

  handleOpenMySelfModal = () => {
    this.setState({nominateMySelf:true});
  }

  handleCloseMySelfModal = () => {
    this.setState({nominateMySelf:false});
  }

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

  manageVote = (id:any,voteAs:any,name:any) => {
    this.setState({
      voteConfirmModal:true,
      vote:{
        voteId:id,
        role:voteAs,
        name:name,
      }
    })
  }

  getNominationDetails = async () => {
    const societyID = localStorage.getItem("society_id")
    const nominationId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.setState({
      loading:true,
      nominationId
    })
    this.getNominationDetailsId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations/${nominationId}`,
    });
  }

  nominatedMemberList = async () => {
    const societyID = localStorage.getItem("society_id")
    const nominationId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.nominatedMemberListId = await this.apiCall({
      method:"GET",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations/${nominationId}/nominated_team_member_list`,
    });
  }

  cancelMyNomination = async () => {
    const societyID = localStorage.getItem("society_id")
    const nominationId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.cancelMyNominationId = await this.apiCall({
      method:"DELETE",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations/${nominationId}/cancel_my_nomination?status=true`,
    });
  }

  myProfile = async () => {
    const societyID = localStorage.getItem("society_id")
    const nominationId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.myProfileId = await this.apiCall({
      method:"GET",
      endPoint: `/society_managements/${societyID}/bx_block_my_team/chairman_nominations/current_user_details`,
    });
  }


  startVotingCall = async () => {
    const societyID = localStorage.getItem("society_id")
    const id =  window.location.search ? window.location.search.split("=")[1] : null;
    this.startVotingCallId = await this.apiCall({
      method:"PUT",

      endPoint: `/society_managements/${societyID}/bx_block_my_team/chairman_nominations/${id}/start_voting?start_voting=true`,
    });
  }

  endVotingCall = async () => {
    const societyID = localStorage.getItem("society_id")
    const startVotingId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.endVotingCallId = await this.apiCall({
      method:"PUT",
      endPoint: `/society_managements/${societyID}/bx_block_my_team/chairman_nominations/${startVotingId}/close_voting?end_voting=true`,
    });
  }

  updateNomination = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.updateNominationId = await this.apiCall({
      method:"PUT",
      endPoint: `society_managements/${societyID}/bx_block_my_team/chairman_nominations/${this.state.nominationId}/update_my_nomination`,
      body:JSON.stringify(data)
    });
  }

  nominateMySelf = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.nominateMySelfId = await this.apiCall({
      method:"POST",
      endPoint: `/society_managements/${societyID}/bx_block_my_team/chairman_nominations/${this.state.nominationId}/nominate_myself`,
      body:JSON.stringify(data)
    });
  }

  nominate = async (id:any,voteAs:any) => {
    const societyID = localStorage.getItem("society_id")
    this.nominateId = await this.apiCall({
      method:"POST",
      endPoint: `/society_managements/${societyID}/bx_block_my_team/chairman_nominations/${this.state.nominationId}/voting?nominated_member_id=${id}&vote_as=${voteAs}`,
    });
  }



  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = localStorage.getItem('userToken') ;

    const header = {
      "content-type": "application/json",
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
    runEngine.debugLog("Message Recived", message);
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(apiRequestCallId === this.getNominationDetailsId){
        if(responseJson.hasOwnProperty("chairman_nominations")){
          this.setState({
              loading:false,
              nominationData:responseJson.chairman_nominations.data.attributes,
              updateName:responseJson.chairman_nominations.data.attributes.title,
              updateDescription:responseJson.chairman_nominations.data.attributes.description,
              updateEndDate:moment(responseJson.chairman_nominations.data.attributes.end_date).format("YYYY-MM-DD"),
              updateStartDate:moment(responseJson.chairman_nominations.data.attributes.start_date).format("YYYY-MM-DD"),
          })
        }
      }
      if(apiRequestCallId === this.nominatedMemberListId){
        if(responseJson?.hasOwnProperty("nominated_members")){
          const userId = localStorage.getItem("userId")
          const findIf = responseJson.nominated_members.data.find((item:any)=> {
            return item.attributes.account_id == userId
          })
          console.log("THIS IS FIND IF",findIf)
          this.setState({
            loading:false,
            nomineeList:responseJson.nominated_members.data,
            nominatedSelf:findIf ? true : false,
            myDetails:findIf.attributes,
            myNominateId:findIf.id
          })
          if(findIf){
            let roleType:any = []
            if(findIf.attributes.nominate_as === "All"){
              roleType=['0','1']
            }else{
              if(findIf.attributes.nominate_as === "Chairman"){
                roleType=['0']
              }else{
                roleType=['1']
              }
            }
            this.setState({
              myNominationDescription:findIf.attributes.description,
              myNominationAs:roleType
            })
          }
        }
      }
      if(apiRequestCallId === this.nominateId){
        console.log("RESPONSE",responseJson )
        if(responseJson.message === "Voted successfully"){
          this.setState({
            voteConfirmModal:false
          })
          this.getNominationDetails()
          this.nominatedMemberList()
        }
      }
      if(apiRequestCallId === this.myProfileId){
        if(responseJson.hasOwnProperty("user_data")){
          this.setState({
            myProfile:responseJson.user_data.data.attributes
          })
        }
      }
      if(apiRequestCallId === this.nominateMySelfId){
        if(responseJson.message === "Member Nominated successfully"){
          this.props.history.push("/NominationSuccess")
        }
      }
      if(this.updateNominationId === apiRequestCallId){
        if(responseJson.message === "Member update successfully"){
          this.props.history.push("/NominationUpdated")
        }
      }
      if(apiRequestCallId === this.cancelMyNominationId){
        console.log("CHECK ",responseJson)
        if(responseJson.message === "Succesfull cancelled"){
          window.history.back()
        }
      }
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

  handleValidation = () => {
    let titleValidation = false
    let startDateValidation = false
    let endDateValidation = false
    let DescriptionValidation = false

    if(this.state.updateName){
      if(this.state.updateName.length >=5){
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

    if(this.state.updateStartDate){
      if(this.state.updateStartDate !== ""){
        if(this.dateIsValid(this.state.updateStartDate)){
          let today = new Date();
          today.setHours(0,0,0,0);
          let startDate = new Date(this.state.updateStartDate)
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

    if(this.state.updateEndDate){
      if(this.dateIsValid(this.state.updateEndDate)){
        let today = new Date();
        today.setHours(0,0,0,0);
        let endDate = new Date(this.state.updateEndDate)
        let startDate = new Date(this.state.updateEndDate)
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

    if(this.state.updateDescription){
      if(this.state.updateDescription.length >=5){
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

  updateNominationData = () => {
    if(this.handleValidation()){
      const data = {
        nominate_myself:{
          "start_date":this.state.updateStartDate,
          "end_date":this.state.updateEndDate,
          "title":this.state.updateName,
          "description":this.state.updateDescription
        }
      }
      this.updateNomination(data)
    }
  }


  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };
}

// Customizable Area End