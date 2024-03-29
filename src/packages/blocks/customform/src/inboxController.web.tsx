import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import * as Yup from 'yup';
export const Colors = {
  inputLabel: "rgba(31, 31, 34, 0.6)",
  inputTextColor: "rgb(31, 31, 34)",
  borderGrey: "rgba(28, 28, 30, 0.3)",
  borderYellow: "rgb(205, 149, 12)",
  white: "#FFFFFF",
  modalBg: "rgb(243, 243, 243)",
};

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};
// Customizable Area End

export const configJSON = require("./config");

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  getSellerDetailsMessageId: any;
  postSellerDetailsMessageId: any;
  sellerID: any;
  shopName: string;
  address: string;
  gstin: string;
  selectedServices: number[];
  showSuccessModal: boolean;
  token: string;
  lat: any;
  long: any;
  error: string | null;
  loading: boolean;
  allVehcile: any[];
  showDialog: boolean;
  anchorEl: any;
  allRelation: any[];
  allIdType: any[];
  allInbox:any[];
  allInboxKey: any[];
  isSearch:boolean;
  newMessage:any;
  singleChatRoom:any[];
  selectedMedia:any;
  accept: boolean;
  file:any;
  selectedChatRoomId:any;
  profileData:any;
  selectedChatRoom:any;
  switchVaule:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class InboxController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  createVehicleApiCallId: string = '';
  updateVehicleApiCallId: string = '';
  getVehicleListApiCallId: string = '';
  deleteVehicleAPICallId: string = '';
  getRelationListApiCallId: string = '';
  getIDTypeListApiCallId: string = ''
  getInboxApiCallId:string ='';
  getSingleInboxApiCallId:string='';
  getCreateMessagesApiCallId: any = "";
  chatSettingApiCallId:any='';
  getProfileDataAPiCallId:any='';
  markUnreadAPIcallId:any='';
  // Customizable Area End
  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.CreateNewMessage = this.CreateNewMessage.bind(this)
    this.handleFile2 = this.handleFile2.bind(this)

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];
    this.state = {
      getSellerDetailsMessageId: "",
      postSellerDetailsMessageId: "",
      sellerID: "",
      shopName: "",
      address: "",
      gstin: "",
      selectedServices: [],
      token: "",
      showSuccessModal: false,
      lat: 0,
      long: 0,
      error: null,
      loading: false,
      allVehcile: [],
      showDialog: false,
      anchorEl: null,
      allRelation: [],
      allIdType: [],
      allInbox:[],
      singleChatRoom:[],
      allInboxKey:[],
      isSearch:false,
      newMessage:'',
      selectedMedia:null,
      accept:false,
      file:null,
      selectedChatRoomId:null,
      profileData:null,
      selectedChatRoom:null,
      switchVaule:false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getSellerDetail(token)
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );





         if (apiRequestCallId === this.getInboxApiCallId) {
          this.getInboxRes(responseJson,errorReponse)
          
        } 
        if (apiRequestCallId === this.chatSettingApiCallId) {
          this.chatSettingRes(responseJson,errorReponse)
  
        } 
        if (apiRequestCallId === this.getProfileDataAPiCallId) {
          this.getProfileDataRes(responseJson,errorReponse)
      
        }
        if (apiRequestCallId === this.getCreateMessagesApiCallId) {
          this.getCreateMessages(responseJson,errorReponse)
          
        }
        if (apiRequestCallId === this.getSingleInboxApiCallId) {
          this.getSingleInboxRes(responseJson,errorReponse)
          
        }
        if (apiRequestCallId === this.markUnreadAPIcallId) {
          this.markUnreadRes(responseJson,errorReponse)
         
        }
        
     
    }
    // Customizable Area End
  }

  // Customizable Area Start
  chatSettingRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      if (responseJson) {
        window.location.reload();
     
      }
    } else {
      //Check Error Response
      // this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getInboxRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
           
      if (responseJson.data) {

        this.setState({ allInbox: responseJson.data,loading:false,switchVaule: responseJson.data[0]?.attributes?.chat_with_account?.id == localStorage.getItem('userId') ?responseJson.data[0]?.attributes?.chat_with_account?.attributes?.disable_chat : responseJson.data[0]?.attributes?.chatable?.attributes?.disable_chat},()=>this.openChat2(this.state.allInbox[0]))

      }
    } else {
      //Check Error Response
      // this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  markUnreadRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
            
      this.forceUpdate()
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getSingleInboxRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson.data)
      this.setState({ singleChatRoom: responseJson.data[0].attributes.messages })
this.setState({ singleChatRoom: responseJson.data[0].attributes.messages, selectedChatRoomId: responseJson.data[0].id, allInboxKey: Object.keys(responseJson.data[0].attributes.messages) }, () => console.log("djhjskjhdksj",this.state.allInboxKey))

      localStorage.setItem('selectedChat', JSON.stringify(responseJson.data[0]))
      this.forceUpdate()
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getCreateMessages(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      this.getSingleInbox()
     
      this.setState({  newMessage: '' });
    } else {
      //Check Error Response
      // this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getProfileDataRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      this.setState({ profileData: responseJson.data,loading:false }, () => console.log(this.state.profileData))
    } else {
      //Check Error Response
      // this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };


  labelShopName: string = "Name of Shop";
  labelAddress: string = "Address";
  labelGstin: string = "GSTIN";
  labelAbout: string = "About Us";
  labelServiceProvided: string = "Services Provided";
  labelDealsIn: string = "Deals in";
  labelShopPhotos: string = "Shop Photos(Min 1 - Max 8)";
  labelVisitingCard: string = "Upload Visiting Card";
  btnLabel: string = "Submit";
  btnContinueLabel: string = "Continue";

  services = [
    { label: "Wholesaler", value: 1 },
    { label: "Manufacturer", value: 2 },
    { label: "Hallmarker", value: 3 },
    { label: "Retailer", value: 4 },
  ];

  getSellerDetail = async (token: string) => {

    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setState({
      getSellerDetailsMessageId: requestMessage.messageId,
    });

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sellersAPIEndPoint + "/1"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  

  onChangeInput = (name: string, value: any) => {
    // @ts-ignore
    this.setState({ [name]: value });
  };

  txtInputProps = (key: string) => ({
    // @ts-ignore
    value: this.state[key],
    onChangeText: (text: string) => {
      this.onChangeInput(key, text);
    },
  });

  inputLabelProps = {
    fontSize: 14,
    color: Colors.inputLabel,
    lineHeight: 16,
  };

  onServiceSelected = (serviceId: number) => {
    if (!this.state.selectedServices.includes(serviceId)) {
      this.setState({
        selectedServices: this.state.selectedServices.concat(serviceId),
      });
    }
  };

  onServiceUnSelected = (serviceId: number) => {
    this.setState({
      selectedServices: this.state.selectedServices.filter(
        (selectedService) => selectedService !== serviceId
      ),
    });
  };

  showModal = () => {
    this.setState({ showSuccessModal: true });
  };

  hideModal = () => {
    this.setState({ showSuccessModal: false }, () => {
    });
  };

  addVehicleSchema() {
    const validations = Yup.object().shape({

      full_name: Yup.string().required(`This field is required`).trim(),
      relation: Yup.string().required(`This field is required`).trim(),
      IDoption: Yup.string().required(`This field is required`).trim(),
      IDnumber: Yup.string().required(`This field is required`).trim(),
      //   carColor: Yup.string().required(`This field is required`).trim(),
      // banner: Yup.mixed(),
      // bannerUrl: Yup.string().nullable(true).required(`Please select banner image.`)

    });
    return validations
  }

  createVehicle = async (values: any) => {
    console.log(values)
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("name", values.full_name)
      formData.append("relation_id", values.relation)
      formData.append("id_proof_id", values.IDoption)
      formData.append("id_number", values.IDnumber)
      // formData.append("vehicle[color]", values.carColor)
      // let blob = await fetch(values.bannerUrl).then(r => r.blob());
      // formData.append(
      //   "vehicle[registration_card_copy]",
      //   blob
      // );
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createVehicleApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_family/families'
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    } catch (error) {
      // this.setState({ loading: false })
      console.log(error);
    }

  }

  updateVehicle = async (values: any) => {
    console.log(values)
    let item = JSON.parse(localStorage.getItem('selectFamily')||'{}')
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("name", values.full_name)
      formData.append("relation_id", values.relation)
      formData.append("id_proof_id", values.IDoption)
      formData.append("id_number", values.IDnumber)
      // formData.append("vehicle[owner_name]", values.full_name)
      // formData.append("vehicle[plate_number]", values.plateNumber)
      // formData.append("vehicle[company_name]", values.carManufacturer)
      // formData.append("vehicle[model_number]", values.carModle)
      // formData.append("vehicle[color]", values.carColor)
      // let blob = await fetch(values.bannerUrl).then(r => r.blob());
      // formData.append(
      //   "vehicle[registration_card_copy]",
      //   blob
      // );
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.updateVehicleApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_family/families/${item.id}`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'PUT'
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    } catch (error) {
      // this.setState({ loading: false })
      console.log(error);
    }

  }
  handleSelectBanner = (
    e: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    setFieldError: (field: string, message: string) => void,
  ) => {

    let file = e?.target?.files[0];

    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      return setFieldError('banner', 'Only png and jpeg are supported.')
    }

    setFieldValue("banner", file ? {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type
    } : '');
    console.log('file', URL.createObjectURL(file))
    setFieldValue("bannerUrl", file ? URL.createObjectURL(file) : "");
    if (file) {
      e.target.value = "";

    }

  };
  getInbox() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getInboxApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats?chatable_id=${localStorage.getItem('userId')}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  markUnread() {
 
    const item = JSON.parse(localStorage.getItem('selectedChat') || '{}')
    console.log('jdsahkj',item)
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.markUnreadAPIcallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/read_messages?chat_id=${item.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getInboxBySearch(value:any) {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getInboxApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/chats?q=${value}&chatable_id=${localStorage.getItem('userId')}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  addVehicle(item: any) {

    localStorage.setItem('selectCar', JSON.stringify(item))
    // @ts-nocheck
    // @ts-ignore
    this.props.history.push('/viewVehicle')

  }
  getCar() {
    // @ts-nocheck
    // @ts-ignore
    let item = JSON.parse(localStorage.getItem('selectCar'))
    if (item) {

    }
  }

  deleteRequest() {
    // @ts-nocheck
    // @ts-ignore
    let item = JSON.parse(localStorage.getItem('selectFamily'))
    const header = {

      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.deleteVehicleAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_family/families/${item.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'DELETE'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleClick = (event:any) => {
    this.setState({ anchorEl: event.currentTarget, showDialog: true })
  };

  handleClose = (item:any) => {
    if (item.id) {
      localStorage.setItem('selectFamily', JSON.stringify(item))
      this.props.history.push("/editfamily")

    } else {
      this.setState({ anchorEl: item.currentTarget, showDialog: false })
    }
    // this.setState({ anchorEl:null,showDialog:false })
  };

  openChat=(item:any)=>{

    localStorage.setItem('selectedChat',JSON.stringify(item))
    this.props.history.push('/chatbox')

  }
  openChat2=(item:any)=>{

    localStorage.setItem('selectedChat',JSON.stringify(item))
    this.setState({
      selectedChatRoom:item
    },()=>this.getSingleInbox())


  }
  CreateNewMessage(value:any) {
    let data = value.target.value;
    this.setState({ newMessage: data })
  }

  createMessages = async () => {
    const item= JSON.parse(localStorage.getItem('selectedChat') || '{}')

    const message = this.state.newMessage;

    if (!message.trim() || !message) {
      return null;
    }

    try {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getCreateMessagesApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_chat/messages?chat_id=${item.id}`
      );

      const header = {
        token: localStorage.getItem("userToken"),
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const formData = new FormData();
      formData.append("message[message]", message);

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
  getAllChat(){

    const item = JSON.parse(localStorage.getItem('selectedChat') || '{}')
    console.timeLog(item)
    this.setState({ singleChatRoom: item.attributes.messages, selectedChatRoomId: item.id, allInboxKey: Object.keys(item.attributes.messages) }, () => console.log(this.state.singleChatRoom))
  }


  handleSelectFile = (
    file: any
  ) => {


    if (file && !['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)) {
      return alert('Only png and jpeg are supported.')
    }



    this.createFileMessages(file)
  };
  createFileMessages = async (file:any) => {
    const message = this.state.newMessage;
    const chatRoomId = this.state.selectedChatRoomId;

    try {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getCreateMessagesApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_chat/messages?chat_id=${chatRoomId}`
      );

      const header = {
        token: localStorage.getItem("userToken"),
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const formData = new FormData();



      const blob = await fetch(file).then(r => r.blob());

      formData.append("message[message]", "‎");
      formData.append("message[attachments][]", file);

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
  disablechat = () => {

    this.setState({ loading: true })
    const header = {
      "token": localStorage.getItem('userToken'),

    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.chatSettingApiCallId = requestMessage.messageId;
    let value =   
      this.state.allInbox[0]?.attributes?.chat_with_account?.id == localStorage.getItem('userId')  ? 
      this.state.allInbox[0]?.attributes?.chat_with_account?.attributes?.disable_chat
      :
      this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat
     


    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/chats/disable_enable_chat?disable_chat=${!value}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'PATCH'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }
  handlesearchIcon=()=>{
    this.setState({isSearch:!this.state.isSearch},()=>{
      if (!this.state.isSearch)
        this.getInbox()
    })

  }
  getSingleInbox() {
    const item = JSON.parse(localStorage.getItem('selectedChat')||'{}')
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getSingleInboxApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/chats/${item.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getProfile() {
    this.setState({loading:true})
        const header = {
          "Content-Type": configJSON.contentTypeApiAddDetail,
          "token": localStorage.getItem('userToken')
        };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
    
        this.getProfileDataAPiCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `bx_block_profile/my_profile`
        );
    
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
    
    
    
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.validationApiMethodType
        );
    
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
      }
      updateChatRoom=()=>{
        this.setState({singleChatRoom: window.history?.state?.state?.data.attributes.messages ,selectedChatRoom:window.history?.state?.state?.data,allInboxKey: Object.keys(window.history?.state?.state?.data.attributes.messages)},()=>console.log('mystate',this.state))
      }

     
    
      handleFile2(file:any) {
        //@ts-ignore
    //@ts-nocheck
    if (file && !['image/png', 'image/jpeg', 'image/jpg',].includes(file.type)) {
      return alert('Only png and jpeg are supported.')
    }
    else{
    
      this.setState({ selectedMedia: { url: URL.createObjectURL(file), mimetype: file.type }, accept: true, file: file },)
    }
    
      }

      redirectToList(){

     if(localStorage.getItem('userType')=='Owner' ||localStorage.getItem('userType')=='Resident' ){

    this.props.history.push('/incidentListing')
      

     }else{
      console.log('123',this.props)
      // @ts-ignore
      this.props.onClose()

     }

      }

  // Customizable Area End
}
