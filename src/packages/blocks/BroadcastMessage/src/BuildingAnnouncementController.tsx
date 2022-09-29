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
  categoryList:any;
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
  getAnnouncementListId:string = "";
  getCategoryListId:string = "";
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
      announcementList:[],
      categoryList:[],
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
    this.getAnnouncementBuildingList()
    this.onGetCategoryList()
  }

  getAnnouncementBuildingList = async () => {
    const societyID = localStorage.getItem("society_id")
    const buildingId =  window.location.search ? window.location.search.split("=")[1] : null;
    this.getAnnouncementListId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcements/Resident_announcement_list`,
    });
  }

  onGetCategoryList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getCategoryListId = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcement_categories`,
    });
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
      if(this.getAnnouncementListId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("announcement")){
          this.setState({
            announcementList:responseJson.announcement.data
          })
        }
      }
      if(apiRequestCallId === this.getCategoryListId){
        if(responseJson.code === 200){
          this.setState({
            categoryList:responseJson.announcement_categories.data
          })
        }
      }
    }
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
    // console.log("Called",requestMessage);
    return requestMessage.messageId;
  };


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
