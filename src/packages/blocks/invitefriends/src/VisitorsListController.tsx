// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

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
  getUnitListing:any;
  unitPagination:any;
  getUnitGeneralDetails:any;
  securityBuildingList:any;
  date:any;

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
  labelTitle: string = "";
  getVisitorListId:string = "";
  getUnitListId:string = "";
  getSecurityUnitListId:string =""
  getUnitId:string =""
  getBuildingListId:string ="";
  getUnitGeneralDetailsId="";
  getSecurityBuildingListId="";
  getUnitListVisitorId:string;
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
      count:10,
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
      },
      getUnitListing : [],
      unitPagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
      getUnitGeneralDetails:{},
      securityBuildingList:[],
      date:""
    };

    this.labelTitle = configJSON.labelTitle;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this)
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this)

  }

  async componentDidMount() {
    await this.getVisitorList(this.state.searchQuery,this.state.page)
    await this.getBuildingList()
    await this.getSecurityUnitList(this.state?.buildingID,this.state?.page,this.state?.searchQuery)
    await this.getSecurityBuildingList()
  }

  handleVistorPagination = (e:any,value:any) => {
    this.getVisitorList(this.state.searchQuery,value)
    this.setState({
      page:value
    })
  }

  handleUnitPagination = (e:any,value:any) => {
    this.getSecurityUnitList("",value,"")
    this.setState({
      page:value
    })
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
  unitSearch = (e:any) => {
    this.setState({
      searchQuery:e.target.value
    })
    this.getSecurityUnitList(this.state.buildingID,1,e.target.value)
  }

  manageSearch = (e:any) => {
    this.setState({
      searchQuery:e.target.value
    })
    this.getVisitorList(e.target.value,1)
  }

  unitListAPIResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("apartment_managements")){
      this.setState({
        getUnitListing:responseJson?.apartment_managements?.data,
        unitPagination:responseJson?.meta?.pagination,
      })
    }else{
      this.setState({
        getUnitListing:[]
      })
    }
  }

  securityListResponse = (responseJson:any) => {
    if(responseJson.data?.hasOwnProperty("buildings")){
      this.setState({
        securityBuildingList:responseJson?.data?.buildings,
      })
    }else{
      this.setState({
        securityBuildingList:[]
      })
    }
  }

  unitGeneralDetailsResponse = (responseJson:any) => {
        if(responseJson.hasOwnProperty("resident")){
          this.setState({
            getUnitGeneralDetails:responseJson,
          })
        }else{
          this.setState({
            getUnitGeneralDetails:{}
          })
        }
  }

  visiterListResponse = (responseJson:any) => {
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

  buildingListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("buildings")){
      this.setState({
        buildingList:responseJson.buildings
      })
    }
  }

  unitResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty('apartments')){
      this.setState({
        unitList:responseJson.apartments
      })
    }
  }

  getUnitListVisitorResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("units")){
      this.setState({
        unitList:responseJson?.units
      })
    }
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(this.getUnitListId === apiRequestCallId ){
        this.unitListAPIResponse(responseJson)
      }
      if(this.getSecurityBuildingListId === apiRequestCallId ){
        this.securityListResponse(responseJson)
      }
      if(this.getUnitGeneralDetailsId === apiRequestCallId ){
        this.unitGeneralDetailsResponse(responseJson)
      }
      if(this.getVisitorListId === apiRequestCallId ){
        this.visiterListResponse(responseJson)
      }
      if(this.getBuildingListId === apiRequestCallId){
        this.buildingListResponse(responseJson)
      }
      if(this.getUnitId === apiRequestCallId){
       this.unitResponse(responseJson)
      }
      if(this.getUnitListVisitorId === apiRequestCallId){
        this.getUnitListVisitorResponse(responseJson)
      }
    }
  }

  getSecurityUnitList = async (securityBuildingId : any,page:any,searchQuery : any ) => {
    console.log("DID I CALLED yes securityBuildingId?",securityBuildingId)
    const societyID = localStorage.getItem("society_id")
    this.getUnitListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint:`bx_block_settings/apartment_managements/unit_list?society_management_id=${societyID}&building_management_id=${securityBuildingId}&page=${page}&q=${searchQuery} `,
    });
  }
  getSecurityBuildingList = async () => {
    console.log("DID I CALLED yes buildingID?",this.state?.buildingID)
    const societyID = localStorage.getItem("society_id")
    this.getSecurityBuildingListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint:`bx_block_address/building_list?society_management_id=${societyID}`,
    });
  }

  getUnitList = async (page:any) => {
    console.log("DID I CALLED yes ?",)
    const societyID = localStorage.getItem("society_id")
    this.getUnitListId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint:`/bx_block_settings/apartment_managements/unit_list?society_management_id=${societyID}&building_management_id=&page=${page}`,
    });
  }

  getUnitVisitorList = async (e:any) => {
    console.log("CHECK IS WE GET HEREE ??")
    const societyID = localStorage.getItem("society_id")
    this.getUnitListVisitorId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint:`/bx_block_fees_payment/invoices/unit_list?building_management_id=${this.state.buildingID}`,
    });
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


  getUnitGeneralDetails = async (id:any ,ownerId:any) => {
    this.getUnitGeneralDetailsId = await this.apiCall({
      contentType:"application/json",
      method: "GET",
      endPoint: `bx_block_settings/apartment_managements/unit_details?id=${id}&owner_id=${ownerId}`,
    });
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
