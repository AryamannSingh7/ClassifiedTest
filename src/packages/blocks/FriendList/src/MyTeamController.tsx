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
  match:any;
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
  deleteId:any;
  editId:any;
  teamList:any;
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
  createChatRoomAPIId:any='';
  getUserListId:string = "";
  manageApprovalId:string = "";
  deleteMemberId:string = "";
  getMySelectedTeamListId:string = "";
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
      deleteId:"",
      editId:"",
      teamList:[],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  handleDeleteModal = (id:any) => {
    this.setState({
      deleteModal:!this.state.deleteModal,
      deleteId:id
    })
  }

  handleEdit = (user:any) => {
    const editData = {
      id:user?.id,
      roleId:user?.role_id,
      email:user?.email,
      phone:user?.phone_number,
      userId:user?.account?.id,
    }
    this.setState({
      setOpen:true,
      editId:editData
    })
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };


  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getMyTeamList()
  }

  approvalFnc = (type:any,id:any) => {
    let formdata = new FormData();
    formdata.append("team_member[status]", type);
    this.manageApproval(formdata,id)
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

  getMySelectedTeamList = async () => {
    const type = this.props.match.params.type
    this.setState({
      loading:true
    })
    const societyID = localStorage.getItem("society_id")
    this. getMySelectedTeamListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_my_team/team_members?society_management_id=${societyID}&team_member_type=${type}`,
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
      endPoint: `/bx_block_my_team/team_members/${id}`,
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

  getUserListResponse = (responseJson:any) => {
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

  manageDataFilter = (item:any,teamType:any) => {
    if(item.attributes.team_member_type === teamType && item.attributes.status !== "Pending Approval"){
      console.log("DID I CAME HERE ?",item,teamType)
      return item
    }
  }

  getMyTeamListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      if(this.props.match.params.type) {
        this.getMyTeamList()
        const teamList = responseJson.data.filter((item:any)=> {
          return this.manageDataFilter(item,this.props.match.params.type)
        })
        this.setState({
          teamList:teamList,
          loading:false
        })
      }else{
        const pendingReq = responseJson.data.filter((item:any)=> {
          if(item.attributes.status === "Pending Approval"){
            return item
          }
        })
        const coreMembers = responseJson.data.filter((item:any)=> {
          return this.manageDataFilter(item,"Core_member")
        })
        const subTeam = responseJson.data.filter((item:any)=> {
          return this.manageDataFilter(item,"Sub_team")
        })
        const ServiceProvider = responseJson.data.filter((item:any)=> {
          return this.manageDataFilter(item,"Service_provider")
        })
        this.setState({
          coreMembers:coreMembers,
          subTeam:subTeam,
          providers:ServiceProvider,
          pendingReq:pendingReq,
          loading:false,
        })
      }

    }
  }

  getRolesListResponse = (responseJson:any) => {
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

  createChatRoomAPIResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      localStorage.setItem('selectedChat',JSON.stringify(responseJson.data))
      //
      this.props.history.push({
        pathname: '/chairmanchat',
        state: { data: responseJson.data }
      })
    }else{
      //
    }
  }

  manageApprovalResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty('data')){
      this.getMyTeamList()
    }
  }

  deleteMemberResponse = (responseJson:any) => {
    if(responseJson.message === "Successfully deleted"){
      if(this.props.match.params.type){
        this.getMySelectedTeamList()
      }else{
        this.getMyTeamList()
      }
      this.setState({
        deleteModal:false,
        deleteId:""
      })
    }
  }

  getMySelectedTeamListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("data")){
      this.setState({
        loading:false,
        teamList:responseJson.data,
      })
    }
  }

  manageMessage = (message:any) => {
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

  restAPIResponse = (message:any) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if(apiRequestCallId === this.getUserListId){
      this.getUserListResponse(responseJson)
    }
    if(apiRequestCallId === this.getMyTeamListId){
      this.getMyTeamListResponse(responseJson)
    }
    if(apiRequestCallId === this.getMySelectedTeamListId){
      this.getMySelectedTeamListResponse(responseJson)
    }
    if(apiRequestCallId === this.getRolesListId){
      this.getRolesListResponse(responseJson)
    }
    if(apiRequestCallId === this.createChatRoomAPIId){
      this.createChatRoomAPIResponse(responseJson)
    }
    if(this.manageApprovalId === apiRequestCallId){
      this.manageApprovalResponse(responseJson)
    }
    if(this.deleteMemberId === apiRequestCallId){
      this.deleteMemberResponse(responseJson)
    }
  }
  async receive(from: string, message: Message) {
    if(getName(MessageEnum.PostDetailDataMessage)=== message.id){
      this.manageMessage(message)
    }
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.restAPIResponse(message)
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

  openChat=(data:any)=>{
    console.log(data)
    
    try {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.createChatRoomAPIId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_chat/chats`
      );

      const header = {
        token: localStorage.getItem("userToken"),
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const formData = new FormData();
      formData.append("chat[chatable_type]", 'AccountBlock::Account');
      formData.append("chat[chatable_id]", localStorage.getItem('userId') || '{}');
      formData.append("chat[chat_with_account]", data.id);



      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );


      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'POST'
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  sentMessage (data:any) {
    const msg : Message = new Message(getName(MessageEnum.PostDetailDataMessage))
    msg.properties['text'] = data
    this.send(msg)
  }

}

// Customizable Area End