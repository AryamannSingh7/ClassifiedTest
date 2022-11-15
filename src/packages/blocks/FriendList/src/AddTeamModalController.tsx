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
  editId:any;
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
  userId:any;
  roleId:any;
  userError:any;
  roleError:any;
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
  updateTeamMemberId:string = "";

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
      userId:"",
      roleId:"",
      selectedUser:{
        name:"",
        email:"",
        phone:"",
        buildingName:"",
        buildingId:"",
        unitName:"",
        unitId:""
      },
      roleError:"",
      userError:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  handleDeleteModal = () => {
    this.setState({
      deleteModal:!this.state.deleteModal
    })
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };


  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getUserList()
    this.getRolesList()
  }

  selectUser = (id:any) => {
    let updatedData = this.state.userList.filter((item:any) => item.id === id)
    console.log("CHECK",updatedData[0].attributes)
    this.setState({
      selectedUser:{
        name:updatedData[0].attributes.full_name,
        email:updatedData[0].attributes.email_address,
        phone:updatedData[0].attributes.phone_number,
        buildingName:updatedData[0].attributes.building_management.name,
        buildingId:updatedData[0].attributes.building_management.id,
        unitName:updatedData[0].attributes.apartment_management.apartment_name,
        unitId:updatedData[0].attributes.apartment_management.id
      },
      userId:id,
      userError:""
    })

  }

  handleSubmit = () => {
    if(this.state.userId !== "" && this.state.roleId !== ""){
      let formdata = new FormData();
      formdata.append("team_member[email]",  this.state.selectedUser.email);
      formdata.append("team_member[role_id]", this.state.roleId);
      formdata.append("team_member[phone_number]", this.state.selectedUser.phone);
      formdata.append("team_member[building_management_id]", this.state.selectedUser.buildingId);
      formdata.append("team_member[account_id]", this.state.userId);
      formdata.append("team_member[apartment_management_id]", this.state.selectedUser.unitId);
      if(this.props.editId){
        this.updateTeamMember(this.props.editId.id,this.state.roleId)
      }else{
        this.createTeamMember(formdata)
      }

    }else{
      if(this.state.userId !== ""){
        this.setState({
          userError:""
        })
      }else{
        this.setState({
          userError:"Please Select User"
        })
      }
      if(this.state.roleId !== ""){
        this.setState({
          roleError:""
        })
      }else{
        this.setState({
          roleError:"Please Select Role"
        })
      }
    }
  }

  getMyTeamList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getMyTeamListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `/bx_block_my_team/team_members?society_management_id=${societyID}`,
    });
  }

  getUserList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getUserListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_my_team/team_members/member_invite_user_list?society_id=${societyID}`,
    });
  }

  getRolesList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getRolesListId = await this.apiCall({
      contentType: "application/json",
      method:"GET",
      endPoint: `/bx_block_roles_permissions/roles`,
    });
  }

  createTeamMember = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createTeamMemberId = await this.apiCall({
      method:"POST",
      endPoint: `bx_block_my_team/team_members`,
      body:data
    });
  }

  updateTeamMember = async (user:any,role:any) => {
    const societyID = localStorage.getItem("society_id")
    this.updateTeamMemberId = await this.apiCall({
      method:"PUT",
      endPoint: `/bx_block_my_team/team_members/${user}`,
      body: JSON.stringify({role_id:role})
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

  addTeamData = (values: any) => {
    this.setState({teamAddData:values})
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
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
      if(apiRequestCallId === this.getRolesListId){
        if(responseJson.hasOwnProperty("data")){
          if(this.props.editId){
            this.setState({
              roleList:responseJson?.data?.roles,
              roleId:this.props.editId.roleId,
              selectedUser:{
                email:this.props.editId.email,
                phone:this.props.editId.phone,
                buildingName:this.props.editId.buildingName,
                buildingId:this.props.editId.buildingId,
                unitName:this.props.editId.unitName,
                unitId:this.props.editId.unitId
              },
              userId:this.props.editId.id,
            })
          }else{
            this.setState({
              roleList:responseJson?.data?.roles,
            })
          }
        }else{
          this.setState({
            roleList:[]
          })
        }
      }
      if(apiRequestCallId === this.createTeamMemberId){
        if(responseJson.hasOwnProperty("data")){
          this.sentMessage("TEAM_MEMBER_ADDED_SUCCESS")
        }else{
          console.log("Error",errorReponse,responseJson)
        }
      }
      if(apiRequestCallId === this.updateTeamMemberId){
        if(responseJson.hasOwnProperty("data")){
          this.sentMessage("TEAM_MEMBER_ADDED_SUCCESS")
        }else{
          console.log("Error",errorReponse,responseJson)
        }
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

  handleModalClose = () => {
      this.sentMessage("CLOSE_CREATE_TEAM_MODAL")
  }
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

  sentMessage (data:any) {
    const msg : Message = new Message(getName(MessageEnum.PostDetailDataMessage))
    msg.properties['text'] = data
    this.send(msg)
  }
}

// Customizable Area End