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
  VisitorDetails:any;
  deleteConfirmModal:boolean;
  count:any;
  page:any;
  visitorList:any;
  searchQuery:string;
  buildingID:any;
  unitId:any;
  buildingList:any;
  unitList:any;
  pagination:any;

}

interface SS {
  id: any;
}

export default class VisitorDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {

  apiEmailLoginCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getVisitorListId:string = "";
  getUnitId:string =""
  getBuildingListId:string ="";
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
      VisitorDetails:{
          id:"1",
          name:"Sean K. Wilt",
          profilePic:"https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
          time:"16:30",
          date:"10-03-2022",
          building:"Green Villa",
          phoneNo:"+966-1234567890"
        },
      visitorList:[],
      deleteConfirmModal:false,
      count:20,
      page:1,
      buildingID:"",
      searchQuery:"",
      unitId:"",
      buildingList:[],
      unitList:[],
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      }
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this)
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this)

  }

  async componentDidMount() {
    await this.getVisitorList(this.state.searchQuery,this.state.page)
    await this.getBuildingList()
  }

  handleCloseDeleteModal() {
    this.setState({
      deleteConfirmModal:false
    })
  }

  handleOpenDeleteModal() {
    this.setState({
      deleteConfirmModal:true
    })
  }

  manageSearch = (e:any) => {
    this.setState({
      searchQuery:e.target.value
    })
    this.getVisitorList(e.target.value,1)
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(this.getVisitorListId === apiRequestCallId ){
        console.log(responseJson,errorReponse)
        if(responseJson.hasOwnProperty("visitors")){
          this.setState({
            visitorList:responseJson.visitors.data,
            pagination:responseJson.meta.pagination,
          })
        }else{
          this.setState({
            visitorList:[]
          })
        }
      }
      if(this.getBuildingListId === apiRequestCallId){
        if(responseJson.hasOwnProperty("buildings")){
          this.setState({
            buildingList:responseJson.buildings
          })
        }
      }if(this.getUnitId === apiRequestCallId){
        console.log("UNIT LIST",responseJson)
        if(responseJson.hasOwnProperty('apartments')){
          this.setState({
            unitList:responseJson.apartments
          })
        }
      }
    }
  }

  getVisitorList = async (search:any,page:any) => {
    console.log("DID I CALLED ?",search)
    const societyID = localStorage.getItem("society_id")
    this.getVisitorListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/manager_index?q=${search}&building_management_id=${this.state.unitId}&apartment_management_id=${this.state.buildingID}&count=${this.state.count}&page=${page}`,
    });
  }

  getBuildingList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getBuildingListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_meeting/find_building`,
    });
  }


  getUnitList = async (id:any) => {
    const societyID = localStorage.getItem("society_id")
    this.getUnitId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `/society_managements/${societyID}/bx_block_visitor/visitors/find_unit?building_management_id=${id}`,
    });
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
