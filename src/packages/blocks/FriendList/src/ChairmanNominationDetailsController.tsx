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
  nomineeList:any
  nominationData:any;

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
      votingStatus:"active",
      selectedTab:"Chairman",
      detailsModal:false,
      nominateMySelf:false,
      nominationId:"",
      nominationData:{},
      nomineeList:[],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getNominationDetails();
    this.nominatedMemberList();
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
  }

  confirmVote = () => {
    this.setState({
      voted:true,
      voteConfirmModal:false
    })
  }

  handleClose = () => {
    this.setState({setOpen:false});
  };

  handleOpenDetailsModal = () => {
    this.setState({detailsModal:true});
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
          })
        }
      }
      if(apiRequestCallId === this.nominatedMemberListId){
        if(responseJson?.hasOwnProperty("nominated_members")){
          this.setState({
            loading:false,
            nomineeList:responseJson.nominated_members.data
          })
        }
      }
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

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
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

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };
}

// Customizable Area End