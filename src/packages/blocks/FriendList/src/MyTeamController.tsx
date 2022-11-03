// Customizable Area Start
import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import {BlockComponent} from "../../../framework/src/BlockComponent";
import MessageEnum, {getName,} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";


import {imgPasswordInVisible, imgPasswordVisible} from "./assets";
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
  roleList:any;
  userList:any;
  selectedUser:any;
  pendingReq:any;
  coreMembers:any;
  subTeam:any;
  providers:any;
}

interface SS {
  id: any;
}

export default class FriendListController extends BlockComponent<
  Props,
  S,
  SS
> {

  getMyTeamListId:string = "";
  getRolesListId:string = "";
  createTeamMemberId:string = "";
  getUserListId:string = "";
  manageApprovalId:string = "";
  deleteMemberId:string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.PostDetailDataMessage)
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
      roleList:[],
      userList:[],
      selectedUser:{

      },
      coreMembers:[],
      pendingReq:[],
      providers:[],
      subTeam:[],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  handleDeleteModal = (id:any) => {
    console.log("data",id)
    this.setState({
      deleteModal:!this.state.deleteModal
    })
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };


  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getMyTeamList()
  }

  getMyTeamList = async () => {
    this.setState({
      loading:true
    })
    const societyID = localStorage.getItem("society_id")
    this.getMyTeamListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_my_team/team_members?society_management_id=${societyID}`,
    });
  }

  manageApproval = async (data:any,id:any) => {
    const societyID = localStorage.getItem("society_id")
    this.manageApprovalId = await this.apiCall({
      contentType: "application/json",
      method: "PATCH",
      endPoint: `/bx_block_my_team/team_members/${id}`,
      body:data
    });
  }

  deleteMember = async (id:any) => {
    const societyID = localStorage.getItem("society_id")
    this.deleteMemberId = await this.apiCall({
      contentType: "application/json",
      method: "DELETE",
      endPoint: `/bx_block_my_team/team_members/${societyID}`,
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

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if(getName(MessageEnum.PostDetailDataMessage)=== message.id){
      if(message.properties.text === "CLOSE_CREATE_TEAM_MODAL"){
        this.setState({
          setOpen:false
        })
      }
      if(message.properties.text === "TEAM_MEMBER_ADDED_SUCCESS"){
        this.getMyTeamList()
        this.setState({
          setOpen:false
        })
      }
    }
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(apiRequestCallId === this.getUserListId){
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            userList:responseJson?.data
          })
        }else{
          this.setState({
            userList:[]
          })
        }
      }
      if(apiRequestCallId === this.getMyTeamListId){
        console.log("Team LIST",responseJson)
        if(responseJson.hasOwnProperty("data")){
          const pendingReq = responseJson.data.filter((item:any)=> {
            if(item.attributes.status === "Pending Approval"){
              return item
            }
          })
          const coreMembers = responseJson.data.filter((item:any)=> {
            if(item.attributes.team_member_type === "CoreMember" && item.attributes.status !== "Pending Approval"){
              return item
            }
          })
          const subTeam = responseJson.data.filter((item:any)=> {
            if(item.attributes.team_member_type === "SubTeam" && item.attributes.status !== "Pending Approval"){
              return item
            }
          })
          const ServiceProvider = responseJson.data.filter((item:any)=> {
            if(item.attributes.team_member_type === "ServiceProvider" && item.attributes.status !== "Pending Approval"){
              return item
            }
          })
          console.log("Pending Request",pendingReq)
          console.log("coreMembers",coreMembers)
          console.log("subTeam",subTeam)
          console.log("ServiceProvider",ServiceProvider)

          this.setState({
            coreMembers:coreMembers,
            subTeam:subTeam,
            providers:ServiceProvider,
            pendingReq:pendingReq,
            loading:false,
          })
        }
      }
      if(apiRequestCallId === this.getRolesListId){
        if(responseJson.hasOwnProperty("data")){
          this.setState({
            roleList:responseJson?.data?.roles
          })
        }else{
          this.setState({
            roleList:[]
          })
        }
      }
      if(apiRequestCallId === this.createTeamMemberId){
        console.log("TEAM Member created",responseJson)
      }
    }
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
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