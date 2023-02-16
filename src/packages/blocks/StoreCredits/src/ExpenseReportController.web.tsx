// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import CommonApiCallForBlockComponent from "../../../components/src/ApiCallCommon.web";

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  history:any;
  location:any;
  match:any;
  classes: any;
}

interface S {
  openModal:boolean;
  selectedFile:any;
  title:any;
  titleError:any;
  building:any;
  buildingError:any;
  category:any;
  categoryError:any;
  amount:any;
  amountError:any;
  fileUploadError:any;
  description:any;
  descriptionError:any;
  buildingExpenseList:any;
  categoryExpenseList:any;
  expenseList:any;
  filterBuilding:any;
  filterCategory:any;
  filterYear:any;
  filterShort:any;
  filterSearch:any;
  page:any;
  pagination:any;
  showSuccess:boolean;
  showError:boolean;
  error:any;
  successMessage:any;
}

interface SS {
  id: any;
}

export default class ExpenseReportController extends CommonApiCallForBlockComponent<Props, S, SS> {
  upload: any;
  getBuildingListDropdownId:any;
  getCategoryDropdownListId:any;
  getExpenseListId:any;
  createExpenseAPICallId:any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage), getName(MessageEnum.RestAPIRequestMessage)];
    this.state = {
      openModal:false,
      selectedFile:"",
      fileUploadError:"",
      title:"",
      titleError:"",
      building:"",
      buildingError:"",
      category:"",
      categoryError:"",
      amount:0,
      amountError:"",
      description:"",
      descriptionError:"",
      buildingExpenseList:[],
      categoryExpenseList:[],
      expenseList:[],
      filterBuilding:"",
      filterCategory:"",
      filterYear:"",
      filterShort:"",
      filterSearch:"",
      page:1,
      pagination:{
        current_page:1,
        total_count:0,
        total_pages:1,
      },
      error:"",
      showError:false,
      showSuccess:false,
      successMessage:"",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    this.getBuildingListDropdownList()
    this.getCategoryDropdownList()
    this.getExpenseList({
      filterBuilding:this.state.filterBuilding,
      category:this.state.filterCategory,
      page:this.state.page,
      year:this.state.filterYear,
      shortBy:this.state.filterShort,
      expenseNo:this.state.filterSearch,
    })
  }

  handleSearch = () => {
    this.getExpenseList({
      filterBuilding:this.state.filterBuilding,
      category:this.state.filterCategory,
      page:1,
      year:this.state.filterYear,
      shortBy:this.state.filterShort,
      expenseNo:this.state.filterSearch,
    })
  }


  handleExpenseSearch = (e:any) => {
    this.getExpenseList({
      filterBuilding:this.state.filterBuilding,
      category:this.state.filterCategory,
      page:1,
      year:this.state.filterYear,
      shortBy:this.state.filterShort,
      expenseNo:e.target.value,
    })
    this.setState({
      filterSearch:e.target.value
    })
  }

  handleShorting = (e:any) => {
    this.getExpenseList({
      filterBuilding:this.state.filterBuilding,
      category:this.state.filterCategory,
      page:1,
      year:this.state.filterYear,
      shortBy:e.target.value,
      expenseNo:this.state.filterSearch,
    })
    this.setState({
      filterShort:e.target.value
    })
  }

  createExpenseReport(){
    let formdata = new FormData()
    formdata.append("expence_report[pdf]", this.state.selectedFile,this.state.selectedFile.name);
    formdata.append("expence_report[title]", this.state.title);
    formdata.append("expence_report[description]", this.state.description);
    formdata.append("expence_report[Amount]", this.state.amount);
    formdata.append("expence_report[building_management_id]", this.state.building);
    formdata.append("expence_report[facility_id]", this.state.category);
    this.createExpenseAPICall(formdata)
  }

  createExpenseAPICall = async (data:any) => {
    const societyID = localStorage.getItem("society_id")
    this.createExpenseAPICallId = await this.apiCallForFileUpload({
      method: "POST",
      endPoint: `society_managements/${societyID}/bx_block_report/expence_reports`,
      body:data
    });
  }

  getBuildingListDropdownResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("buildings")){
      this.setState({
        buildingExpenseList:responseJson?.buildings
      })
    }
  }

  getCategoryDropdownListResponse = (responseJson:any) => {
    if(responseJson.hasOwnProperty("facilities")){
      this.setState({
        categoryExpenseList:responseJson?.facilities
      })
    }
  }

  createExpenseResponse = (responseJson:any) => {
    if(responseJson?.hasOwnProperty("expence_report")){
     this.setState({
       openModal:false,
       showSuccess:true,
       successMessage:"Expense added successfully!"
     })
     this.handleSearch()
    }else{
      this.setState({
        showError:true,
        error:"Something went wrong please try again!"
      })
    }
  }

  manageExpenseDownload = (id:any,name:any) => {
    const societyID = localStorage.getItem("society_id")
    this.downloadPdf(`/society_managements/${societyID}/bx_block_report/expence_reports/${id}/download_report.pdf`,`ExpenseAttachment-${name}.pdf`)
  }

  async receive(from: string, message: Message) {
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if(apiRequestCallId === this.getExpenseListId){
        if(responseJson.hasOwnProperty("expence_report")){
          this.setState({
            expenseList:responseJson?.expence_report?.data,
            pagination:responseJson.meta.pagination
          })
        }else{
          this.setState({
            expenseList:""
          })
        }
      }
      if(apiRequestCallId === this.getBuildingListDropdownId){
        this.getBuildingListDropdownResponse(responseJson)
      }
      if(apiRequestCallId === this.getCategoryDropdownListId){
        this.getCategoryDropdownListResponse(responseJson)
      }
      if(apiRequestCallId === this.createExpenseAPICallId){
        this.createExpenseResponse(responseJson)
      }
    }
  }


  handleExpenseReportPagination = (e:any,value:any) => {
    this.getExpenseList({
      filterBuilding:this.state.filterBuilding,
      category:this.state.filterCategory,
      page:value,
      year:this.state.filterYear,
      shortBy:this.state.filterShort,
      expenseNo:e.target.value,
    })
    this.setState({
      page:value
    })
  }

  getExpenseList = async (data:any) => {
    const{filterBuilding,category,page,year,shortBy,expenseNo} = data
    const societyID = localStorage.getItem("society_id")
    this.getExpenseListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/expence_reports?search_building=${filterBuilding}&search_facility=${category}&page=${page}&search_year=${year}&sort_by=${shortBy}&expence_number=${expenseNo}`,
    });
  }

  getBuildingListDropdownList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getBuildingListDropdownId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/management_fees/building_list`,
    });
  }

  getCategoryDropdownList = async () => {
    const societyID = localStorage.getItem("society_id")
    this.getCategoryDropdownListId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `society_managements/${societyID}/bx_block_report/expence_reports/facility_list`,
    });
  }


  titleValidation = () => {
    if(this.state.title){
      this.setState({
        titleError:""
      })
      return true
    }else{
      this.setState({
        titleError:"Title Can not be empty!"
      })
      return false
    }
  }

  buildingValidation = () => {
    if(this.state.building){
      this.setState({
        buildingError:""
      })
      return true
    }else{
      this.setState({
        buildingError:"Please select building!"
      })
      return false
    }
  }

  categoryValidation = () => {
    if(this.state.category){
      this.setState({
        categoryError:""
      })
      return true
    }else{
      this.setState({
        categoryError:"Please select category!"
      })
      return false
    }
  }

  amountValidation = () => {
    if(this.state.amount){
      this.setState({
        amountError:""
      })
      return true
    }else{
      this.setState({
        amountError:"Please enter expense amount!"
      })
      return false
    }
  }

  fileValidation = () => {
    let fileValidation = false
    if(this.state.selectedFile){
      this.setState({
        fileUploadError:""
      })
      fileValidation = true
    }else{
      this.setState({
        fileUploadError:"Please upload file"
      })
      fileValidation = true
    }
    return fileValidation
  }

  descriptionValidation = () => {
    let descriptionValidation = false
    if(this.state.description){
      this.setState({
        descriptionError:""
      })
      descriptionValidation = true
    }else{
      this.setState({
        descriptionError:"Please Enter description of the expense"
      })
      descriptionValidation = true
    }
    return descriptionValidation
  }

  handleValidation = () => {
    const titleValidation = this.titleValidation()
    const amountValidation = this.amountValidation()
    const buildingValidation = this.buildingValidation()
    const fileValidation = this.fileValidation()
    const categoryValidation = this.categoryValidation()
    const descriptionValidation = this.descriptionValidation()
    if(titleValidation && amountValidation && buildingValidation && fileValidation && categoryValidation && descriptionValidation){
      this.createExpenseReport()
    }
  }
}
// Customizable Area End
