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
  pollListing:any;
  filterModal:any;
  deleteSelectFlag:boolean;
  selectedAnnoucment:Array<any>;
  deleteConfirmModal:boolean;
  announcementList:any;
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

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ]
    
    this.state = {
      anchorEl:null,
      anchorEl_1:null,
      loading:false,
      sortBy : "" ,
      status:"",
      pollListing:[],
      filterModal:false,
      deleteSelectFlag:false,
      selectedAnnoucment:[],
      deleteConfirmModal:false,
      announcementList:[
        {
          id:"1",
          title:"Swimming Pool will be closed till 28/03/22",
          description:"Swimming pool will be closed till 28/03/2022 due to covid 19 cases."
        },
        {
          id:"2",
          title:"Home isolation regulations updated",
          description:"Home isolation regulations have been updated with increased covid."
        },
        {
          id:"3",
          title:"New manager has been appointed",
          description:"Mr. Imran Ali has been appointed as new chairman."
        },
        {
          id:"4",
          title:"Management fee details email sent to all owners",
          description:"Management fee details email has been sent to all owners.Kindly pay before due date to avoid any penalty."
        },
      ]
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.handleCloseFilterModal = this.handleCloseFilterModal.bind(this);
    this.handleOpenFilterModal = this.handleOpenFilterModal.bind(this);
    this.DeleteFlagTrue = this.DeleteFlagTrue.bind(this);
    this.DeleteFlagFalse = this.DeleteFlagFalse.bind(this);
    this.selectAllDelete = this.selectAllDelete.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
  }

  async componentDidMount() {

  }

  DeleteFlagTrue() {
    this.setState({
      deleteSelectFlag:true
    })
  }

  DeleteFlagFalse() {
    this.setState({
      deleteSelectFlag:false
    })
  }

  handleCloseFilterModal () {
    this.setState({
      filterModal:false
    })
  }

  handleOpenFilterModal () {
    this.setState({
      filterModal:true
    })
  }

  handleCloseDeleteModal () {
    this.setState({
      deleteConfirmModal:false
    })
  }

  handleOpenDeleteModal () {
    this.setState({
      deleteConfirmModal:true
    })
  }

  handleChecked (value:any) {
    console.log("CHECKED", value)
  }

  removeItemOnce(arr:any, value:any) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  manageRedirect(value:any) {
    if(this.state.deleteSelectFlag){
      if(this.state.selectedAnnoucment.find((item:any)=> item === value)){
        let updatedArray = this.removeItemOnce(this.state.selectedAnnoucment,value)
        this.setState({
          selectedAnnoucment:updatedArray
        })
      }else{
        this.setState({selectedAnnoucment:[
            ...this.state.selectedAnnoucment,
            value
          ]})
      }
    }else{
      this.props.history.push("/AnnouncementInfo?id="+value)
    }
  }

  selectAllDelete() {
    const updatedArray = this.state.announcementList.map((item:any)=>{
      return item.id
    })
    console.log("UPDATED",updatedArray)
    this.setState({
      selectedAnnoucment:updatedArray
    })
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.apiEmailLoginCallId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
      }
    }
  }

  doEmailLogIn(data:any): boolean {
    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
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
