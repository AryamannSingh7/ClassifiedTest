import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
import {search} from "components/dist/blocks/email-account-registration/src/assets";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  classes: any;
  history: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isWithdrawAnnouncementModalOpen: boolean;
  isCreateAnnouncementModalOpen: boolean;
  buildingList:any;
  categoryList:any;
  yearArray:any;
  filterCategory:any;
  filerYear:any;
  shortBy:any;
  selectedBuilding:any,
  selectedTitle:any,
  selectedCategory:any,
  selectedDescription:any,
  selectedImage:any,
  isSubmitLoading:boolean;
  titleError:any;
  descriptionError:any;
  categoryError:any;
  announcementList:any;
  searchKey:any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnnouncementsController extends BlockComponent<Props, S, SS> {
  upload: any;
  getBuildingListId:string = "";
  getCategoryListId:string = "";
  getAnnouncementListId:string = "";
  createAnnouncementId:string = "";
  getAnnouncementListSearchId:string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];

    this.state = {
      isWithdrawAnnouncementModalOpen: false,
      isCreateAnnouncementModalOpen: false,
      buildingList:[],
      categoryList:[],
      yearArray:[0,1,2],
      filterCategory:"",
      filerYear:"",
      shortBy:"",
      selectedBuilding:"",
      selectedCategory:"",
      selectedDescription:"",
      selectedImage:"",
      selectedTitle:"",
      isSubmitLoading:false,
      titleError:"",
      descriptionError:"",
      categoryError:"",
      announcementList:[],
      searchKey:"",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    await this.onGetCategoryList()
    await this.onGetBuildingList()
    await this.onGetAnnouncementList(this.state.filterCategory,this.state.filerYear,this.state.shortBy)
  }

  shortByAction = async (e:any) => {
    this.setState({
      shortBy:e.target.value
    })
    await this.onGetAnnouncementList(this.state.filterCategory || "",this.state.filerYear || "",e.target.value)
  }

  handleFilterBy = () => {
      this.onGetAnnouncementList(this.state.filterCategory,this.state.filerYear,this.state.shortBy)
  }

  handleSearch = (e:any) => {
    this.setState({
      searchKey:e.target.value
    })
    this.onGetAnnouncementBySearchList(e.target.value,this.state.filterCategory,this.state.filerYear,this.state.shortBy)
  }


  handleValidate = () => {
    console.log("STATE", this.state)
    let title = false
    let description = false
    let category = false
    if(this.state.selectedTitle !== ""){
      title = true
      this.setState({
        titleError:""
      })
    }else{
      this.setState({
        titleError:"Title Can't be empty"
      })
      title = false
    }
    if(this.state.selectedDescription !== ""){
      this.setState({
        descriptionError:""
      })
      description = true
    }else{
      this.setState({
        descriptionError:"Description Can't be empty"
      })
      description = false
    }
    if(this.state.selectedCategory !== ""){
      category = true
      this.setState({
        categoryError:""
      })
    }else{
      this.setState({
        categoryError:"Description Can't be empty"
      })
      category = false
    }
    if(title && category && description){
      return true
    }else {
      return false
    }
  }

  handleSubmit = async () => {
      let formData = new FormData()
      formData.append('announcement[title]', this.state.selectedTitle)
      formData.append('announcement[description]', this.state.selectedDescription)
      formData.append('announcement[category_id]', this.state.selectedCategory)
      if(this.state.selectedImage !== ""){
        formData.append('announcement[image]', this.state.selectedImage,this.state.selectedImage.name)
      }
      formData.append('announcement[building_management_id][]', this.state.selectedBuilding)
      console.log("FORM DATA CHECK ",formData)
      await this.createAnnouncement(formData)
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if(apiRequestCallId === this.getCategoryListId){
        if(responseJson.code === 200){
          this.setState({
            categoryList:responseJson.announcement_categories.data
          })
        }
      }
      if(apiRequestCallId === this.getBuildingListId){
        if(responseJson.hasOwnProperty("buildings")){
          this.setState({
            buildingList:responseJson.buildings
          })
        }
      }
      if(apiRequestCallId === this.getAnnouncementListId){
        if(responseJson.hasOwnProperty("announcement")){
          this.setState({
            announcementList:responseJson.announcement.data
          })
        }
      }
      if(apiRequestCallId === this.getAnnouncementListSearchId){
        if(responseJson.hasOwnProperty("announcements")){
          this.setState({
            announcementList:responseJson.announcements.data
          })
        }else{
          this.setState({
            announcementList:[]
          })
        }
      }
      if(apiRequestCallId === this.createAnnouncementId){
        console.log("DATA",responseJson)
        if(responseJson.message === "Successfully created"){
          this.setState({
            isCreateAnnouncementModalOpen:false,
            selectedDescription:"",
            selectedTitle:"",
            selectedCategory:"",
            selectedBuilding:"",
            selectedImage:"",
          })
          this.onGetAnnouncementList(this.state.filterCategory,this.state.filerYear,this.state.shortBy)
        }
      }
    }
    // Customizable Area End
  }



  // Customizable Area Start
  onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    let file = event.target.files[0];
    this.setState({
      selectedImage:file
    })
  };

  onGetBuildingList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getBuildingListId = await this.apiCall({
      contentType: configJSON.contentTypeApiGetUserProfile,
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcements/building_list`,
    });
  }

  onGetAnnouncementList = async (category:string,year:string,shortBy:string) => {
    const societyID = localStorage.getItem("society_id")
    this.getAnnouncementListId = await this.apiCall({
      contentType: configJSON.contentTypeApiGetUserProfile,
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcements?category=${category}&year=${year}&sort_by=${shortBy}`,
    });
  }

  onGetAnnouncementBySearchList = async (search:string,category:string,year:string,shortBy:string) => {
    const societyID = localStorage.getItem("society_id")
    this.getAnnouncementListSearchId = await this.apiCall({
      contentType: configJSON.contentTypeApiGetUserProfile,
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcements/search_by_title?search=${search}`,
    });
  }

  onGetCategoryList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getCategoryListId = await this.apiCall({
      contentType: configJSON.contentTypeApiGetUserProfile,
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcement_categories`,
    });
  }

  createAnnouncement = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.setState({
      isSubmitLoading:true
    })
    this.createAnnouncementId = await this.apiCall({
      contentType: "multipart/form-data",
      method: configJSON.callTypeApiValidateMobileNo,
      endPoint: `/society_managements/${societyID}/bx_block_announcement/announcements`,
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
        header
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        method
    );
   requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
   );
   console.log("REQUEST INIT",requestMessage)
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // console.log("Called",requestMessage);
    return requestMessage.messageId;
  };

  handleWithdrawModal = () => {
    this.setState({
      isWithdrawAnnouncementModalOpen: !this.state.isWithdrawAnnouncementModalOpen,
    });
  };
  
  handleCreateAnnouncementModal = () => {
    this.setState({
      isCreateAnnouncementModalOpen: !this.state.isCreateAnnouncementModalOpen,
    });
  };
  // Customizable Area End
}
