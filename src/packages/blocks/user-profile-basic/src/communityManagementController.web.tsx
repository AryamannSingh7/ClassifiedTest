import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from 'yup';
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { ContactSupportOutlined } from "@material-ui/icons";
import { ApiCatchErrorResponse, ApiErrorResponse } from "../../../components/src/APIErrorResponse";
// Customizable Area End

export const configJSON = require("./config");

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  countryCodeSelected: string;
  phone: string;
  error: string | null;
  userType: string | null;
  allContries: [];
  selectCountry: string;
  allCity: [];
  selectCity: string;
  allProfile: [];
  selectBuilding: string;
  allUnit: [];
  selectUnit: string;
  selectEmail: string;
  unitRegisterType: string;
  allComplex: [];
  selectComplex: any;
  loading: boolean;
  otp: any;
  selectCode: string;
  selectCode2: string;
  selectCode3:string;
  showDialog:boolean;
  showDialog1:boolean;
  showDialog2: boolean;
  profiledata:any;
  values:any,
  showDialogDelete:boolean,
  allUserType:any
  openToolTip: boolean;
  anchorEl:any;
  popUPText:string;
  setOpen:boolean;
  invitationData:any;
  allInvitation:any;
  setAcceptOpen:any;
  setRejectOpen:boolean;
  selectInvitation:any
  anchorEl1:any;
  setDeleteRequest:boolean;
  setRequestOpen:boolean;
  allBuilding:any;
  selectedBUilding:any;
  selectedBUildingId:any;
  selctedUnit:any;
  selectedUserType:any;
  query:any;
  allProfileKeys:any;
  invitatonCount:any;
  open:boolean;
  open2:boolean;
  open3:boolean;



  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class CommunityUserProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  getUserTypeAPICall: any;
  createManagerAccountApiCallId: any;
  createAccountOwnerApiCallId: any;
  createRequestManaulApiCallId: any;
  createRequestApiCallId: any;
  changeUserTypeApiCallId: any;
  updatePhoneApicallId:any;
  getCountryApiCallId: any;
  acceptInvitationAPICallId:any;
  getInvitationAPICall:any;
  getComplexApiCallId: any;
  getCityApiCallId: any;
  verifyOtpApiCallId: any;
  getBuildingApiCallId: any;
  createChatRoomAPIId:any;
  getUnitApiCallId: any;
  getUnitApiCallId2: any;
  createVehicleApiCallId:any;
  deleteVehicleAPICallId:any;
  getProfileDataAPiCallId:any;
  updateChairmenProfileAPiId:any;
  chatSettingApiCallId:any;
  validationApiCallId: string = "";
  createInvitationAPICallId:any='';
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  getInvitationCountApiCallId:any
  currentCountryCode: any;
  getRequestDataAPICall:any
  // createInvitationAPICallId:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);


const profileData = JSON.parse(localStorage.getItem('profileData') ||'{}')
    this.state = {
      // Customizable Area Start
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      error: null,
      enableReTypePasswordField: true,
      countryCodeSelected: "",
      phone: "",
      userType: '',
      allContries: [],
      selectCountry: '',
      allCity: [],
      selectCity: '',
      allProfile: [],
      selectBuilding: '',
      allUnit: [],
      selectUnit: '',
      selectCode: `+${profileData?.attributes?.full_phone_number?.country_code}` || '+966' ,
      selectCode2: `+${profileData?.attributes?.full_phone_number?.country_code}` || '+966',
      selectCode3:'+966',
      selectEmail: '',
      unitRegisterType: '',
      allComplex: [],
      selectComplex: null,
      //@ts-ignore
      //@ts-nocheck
      loading: false,
      otp: '',
      anchorEl:null,
      showDialog:false,
      showDialog2: false,
      profiledata:null,
      values:null,
      showDialogDelete:false,
  showDialog1:false,
  allUserType:[],
  openToolTip: false,
  popUPText:"",
  setOpen:false,
  invitationData:"",
  allInvitation:[],
  setAcceptOpen:"",
  setRejectOpen:false,
  selectInvitation:null,
  anchorEl1:null,
  setDeleteRequest:false,
  setRequestOpen:false,
  allBuilding:[],
  selectedBUilding:null,
  selectedBUildingId:null,
  selctedUnit:null,
  selectedUserType:null,
  query:null,
  allProfileKeys:[],
  invitatonCount:null,
  open:false,
  open2:false,
  open3:false,



      // Customizable Area End
    };

    // Customizable Area Start
    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");

    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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

  
       if (apiRequestCallId === this.verifyOtpApiCallId) {
        this.verifyOTPRes(responseJson,errorReponse)
        }
         else if (apiRequestCallId === this.getInvitationCountApiCallId) {
          this.getInvitationCountRes(responseJson,errorReponse)

        } else if (apiRequestCallId === this.createInvitationAPICallId) {
          this.createInvitationRes(responseJson,errorReponse)
       
        }else if (apiRequestCallId === this.updateChairmenProfileAPiId) {
          this.updateChairmenProfileRes(responseJson,errorReponse)
       
        } else if (apiRequestCallId === this.createRequestApiCallId) {
          this.createRequestRes(responseJson,errorReponse)
        
        }else if (apiRequestCallId === this.getProfileDataAPiCallId) {
          this.getProfileDataRes(responseJson,errorReponse)
         
        }   else if(apiRequestCallId === this.createChatRoomAPIId){
          this.createChatRoomRes(responseJson)
       
        } else if (apiRequestCallId === this.getInvitationAPICall) {
          this.getInvitationRes(responseJson,errorReponse)
         
        } else if (apiRequestCallId === this.changeUserTypeApiCallId) {
          this.changeUserTypeRes(responseJson)
      
        } else if (apiRequestCallId === this.acceptInvitationAPICallId) {
          this.acceptInvitationRes(responseJson,errorReponse)
         
        } 
        this.receive2(apiRequestCallId,responseJson,errorReponse)
    
    }
    // Customizable Area End
  }

  // Customizable Area Start
  receive2(apiRequestCallId:any ,responseJson:any,errorReponse:any){
   if (apiRequestCallId === this.getUserTypeAPICall) {
      this.getUserTypeRes(responseJson,errorReponse)
     
    } else if (apiRequestCallId === this.getComplexApiCallId) {
      this.getComplexApiRes(responseJson,errorReponse)
      
    } else if (apiRequestCallId === this.getCityApiCallId) {
      this.getCityRes(responseJson,errorReponse)
     
    } else if (apiRequestCallId === this.getBuildingApiCallId) {
      this.getBuildingRes(responseJson,errorReponse)
   
    }  
    else if (apiRequestCallId === this.getUnitApiCallId) {
      this.getUnitApiRes(responseJson,errorReponse)
      
    }
    else if (apiRequestCallId === this.deleteVehicleAPICallId) {
      this.deleteReqRes(responseJson,errorReponse)
      
    }else if(apiRequestCallId ===this.getRequestDataAPICall){
      
        this.getRequestDataRes(responseJson,errorReponse)
      }
      else if (apiRequestCallId === this.getUnitApiCallId2) {
        this.getUnitApiRes2(responseJson,errorReponse)
        
      }
  }
  deleteReqRes(responseJson:any,errorReponse:any){
    window.location.reload()

  }
  getRequestDataRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      this.setState({allInvitation:responseJson.data,loading:false},()=>console.log(this.state.allInvitation))
      
      
                } else {
                  //Check Error Response
                  this.parseApiErrorResponse(responseJson);
                }
      
                this.parseApiCatchErrorResponse(errorReponse);

  }
  verifyOTPRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
         //@ts-ignore
      //@ts-nocheck
      let profileData:any = JSON.parse(localStorage.getItem('profileData'))
      if(profileData){

        profileData.attributes.full_phone_number.phone_number = responseJson.phone_number
        profileData.attributes.full_phone_number.country_code = responseJson.country_code
        localStorage.setItem('profileData',JSON.stringify(profileData))
      }
      this.setState({ selectCode: responseJson.country_code })
      this.setState({ selectCode3: responseJson.country_code })

      location.reload();

    } else if (responseJson?.errors) {
      let error = responseJson.errors[0];
      this.setState({ error });
    } else {
      this.setState({ error: responseJson?.error || "Something went wrong!" });
      this.parseApiCatchErrorResponse(this.state.error);
    }
    this.setState({ loading: false })

  }
  getInvitationCountRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      this.setState({ invitatonCount:responseJson,loading: false },()=>console.log('123',this.state.invitatonCount))
    } 
    else if (responseJson?.errors) {

      let error = responseJson.errors;
      this.setState({ error },()=>console.log(this.state.error));
      ApiCatchErrorResponse(error)
    
    } else {
      this.setState({ error: responseJson?.error || "Something went wrong!" });
      this.parseApiCatchErrorResponse(this.state.error);
      this.parseApiCatchErrorResponse(errorReponse);
    }
    this.setState({ loading: false })

  }
  createInvitationRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
this.setState({loading:false,setOpen:false,setDeleteRequest:false},()=>this.getCount())
      //@ts-ignore
      //@ts-nocheck

      

    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  updateChairmenProfileRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      this.getProfile()
this.setState({loading:false,showDialog:false})
    


    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  createRequestRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
     
      //@ts-ignore
      //@ts-nocheck

      this.props.history.push('/RegistrationRequestsignup')
      //@ts-ignore
      //@ts-nocheck
      this.setState({ showDialog: false })


    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);

  }
  getProfileDataRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      //@ts-ignore
      //@ts-nocheck
     this.setState({allProfile:responseJson,loading:false,allProfileKeys:Object.keys(responseJson)},()=>console.log(this.state.allProfileKeys))

    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  createChatRoomRes(responseJson:any){
    if(responseJson.hasOwnProperty("data")){
      localStorage.setItem('selectedChat',JSON.stringify(responseJson.data))
      
      this.props.history.push({
        pathname: '/chairmanchat',
        state: { data: responseJson.data }
      })
    }
    
  }
  getInvitationRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      this.setState({allInvitation:responseJson.member_invitations.data,loading:false},()=>console.log('123h',this.state.allInvitation))
      
      
                } else {
                  //Check Error Response
                  this.parseApiErrorResponse(responseJson);
                }
      
                this.parseApiCatchErrorResponse(errorReponse);
  }
  changeUserTypeRes(responseJson:any){
    if (!responseJson.errors) {
      //@ts-ignore
      //@ts-nocheck
      this.setState({ loading: false })
      //@ts-ignore
      //@ts-nocheck
      this.props.history.push('/addressfill')


    } 

  
  }
  acceptInvitationRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log("user data===============>",responseJson.data)

      
      this.setState({ loading: false,setAcceptOpen:'',setRejectOpen:false })
      this.getRequest()

    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getUserTypeRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log("user data===============>",responseJson.data.roles)
      this.setState({ allUserType: responseJson.data}, () => console.log(this.state.allUserType))
      this.setState({ loading: false })

    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getCityRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      this.setState({ allCity: responseJson.data.cities })
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getBuildingRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      this.setState({ allBuilding: responseJson.data.buildings },()=>console.log(this.state.allBuilding))
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getComplexApiRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      //@ts-ignore
      //@ts-nocheck
      let temp = []
      responseJson.data.housing_complexes.map((item: any) =>
        temp.push({ value: item.id, label: item.name })
      )
      // @ts-ignore
      this.setState({ allComplex: temp }, () => console.log(this.state.allComplex))
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getUnitApiRes(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      //@ts-ignore
      //@ts-nocheck

      this.setState({ allUnit: responseJson.data?.unit_apartments })
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  getUnitApiRes2(responseJson:any,errorReponse:any){
    if (!responseJson.errors) {
      console.log(responseJson)
      //@ts-ignore
      //@ts-nocheck

      this.setState({ allUnit: responseJson?.apartment_managements.data})
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
    }

    this.parseApiCatchErrorResponse(errorReponse);
  }
  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  handleOpen = () => {
    this.setState({setOpen:true});
  };

  handleToolTip = (e:any,text:any) => {
this.setState({openToolTip:!this.state.openToolTip})
  }

  invitationData = (value:any) => {

  }


  createAccount(): boolean {
    if (
      this.isStringNullOrBlank(this.state.firstName) ||
      this.isStringNullOrBlank(this.state.lastName) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.password) ||
      this.isStringNullOrBlank(this.state.reTypePassword)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    }

    var phoneNumberError = this.validateCountryCodeAndPhoneNumber(
      this.state.countryCodeSelected,
      this.state.phone
    );

    if (phoneNumberError) {
      this.showAlert(configJSON.errorTitle, phoneNumberError);
      return false;
    }

    if (!this.isValidEmail(this.state.email)) {
      this.showAlert(configJSON.errorTitle, configJSON.errorEmailNotValid);
      return false;
    }

    if (!this.passwordReg.test(this.state.password)) {
      this.showAlert(configJSON.errorTitle, configJSON.errorPasswordNotValid);
      return false;
    }

    if (this.state.password !== this.state.reTypePassword) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorBothPasswordsNotSame
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };

    const attrs = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      full_phone_number: "+" + this.state.countryCodeSelected + this.state.phone
    };

    const data = {
      type: "email_account",
      attributes: attrs
    };

    const httpBody = {
      data: data,
      token: this.state.otpAuthToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    // this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (!this.isNonNullAndEmpty(String(countryCode))) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (this.isNonNullAndEmpty(countryCode)) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  imgEnableRePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField
      });
      this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
        .enableReTypePasswordField;
      this.imgEnableRePasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnSignUpProps = {
    onPress: () => this.createAccount()
  };

  btnLegalPrivacyPolicyProps = {
    onPress: () => this.goToPrivacyPolicy()
  };

  btnLegalTermsAndConditionProps = {
    onPress: () => this.goToTermsAndCondition()
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    }
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address"
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  txtPhoneNumberWebProps = {
    onChangeText: (text: string) => {
      this.setState({ phone: text });

      //@ts-ignore
      this.txtPhoneNumberProps.value = text;
    }
  };

  txtPhoneNumberMobileProps = {
    ...this.txtPhoneNumberWebProps,
    autoCompleteType: "tel",
    keyboardType: "phone-pad"
  };

  txtPhoneNumberProps = this.isPlatformWeb()
    ? this.txtPhoneNumberWebProps
    : this.txtPhoneNumberMobileProps;

  txtInputLastNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNamePrpos.value = text;
    }
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    }
  };

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePassword: text });

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  createAccoun(attributes: any): boolean {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };
    //@ts-ignore
    //@ts-nocheck
    this.setState({ selectEmail: attributes.email, loading: true })

    const attrs = {
      full_name: attributes.full_name,
      last_name: attributes.lastName,
      email: attributes.email,
      password: attributes.password,
      full_phone_number: this.state.selectCode + attributes.phone,
      password_confirmation: attributes.confirm_password
    };

    const data = {
      type: "email_account",
      // @ts-ignore
      // @ts-nocheck
      "user_type": this.props.history.location.state?.data,
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    // this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;



  }
  createAccountOwner(attributes: any): boolean {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };
    this.setState({ selectEmail: attributes.email })

    const attrs = {

      full_name: attributes.full_name,
      last_name: attributes.lastName,
      email: attributes.email,
      password: attributes.password,
      full_phone_number: this.state.selectCode + attributes.phone,
      password_confirmation: attributes.confirm_password
    };

    const data = {
      type: "email_account",
      // @ts-ignore
      // @ts-nocheck
      "user_type": this.props.history.location.state?.data,
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountOwnerApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;



  }

  createAccountManager = (attributes: any) => {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };
    this.setState({ selectEmail: attributes.email, loading: true })

    console.log(attributes)
    const attrs = {

      email: attributes.email,
      company_name: attributes.company_name,
      manager_full_name: attributes.managerName,
      owner_full_name: attributes.ownerName,
      owner_phone_number: this.state.selectCode + attributes.owner_phone,
      owner_email: attributes.owner_email,
      password: attributes.password,
      full_phone_number: this.state.selectCode + attributes.phone,
      password_confirmation: attributes.confirm_password
    };

    const data = {
      type: "email_account",
      // @ts-ignore
      // @ts-nocheck
      "user_type": this.props.history.location.state?.data,
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createManagerAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;


  }

  createRequest = (attributes: any): boolean => {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };

    const attrs = {
      country: this.state.selectCountry,
      city: this.state.selectCity,
      //@ts-ignore
      //@ts-nocheck
      building_management_id: this.state.selectBuilding.id,
      //@ts-ignore
      //@ts-nocheck
      apartment_management_id: this.state.selectUnit.id,
      society_management_id: this.state.selectComplex
    };

    const data = {
      attributes: attrs
    };

    const httpBody = {
      data: attrs
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createRequestApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_request_management/requests'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;



  }
  updateTypeOwner = () => {
    console.log(this.state.userType)
    if (this.state.userType) {

      if (this.state.userType === 'Owner') {
        this.props.history.push({
          pathname: '/registerowner',
          state: {
            data: this.state.userType,
          },
        })

      }
      if (this.state.userType === 'Property Manager') {
        //@ts-ignore
        //@ts-nocheck

        this.props.history.push({
          pathname: '/registermanager',
          state: {
            data: this.state.userType,
          },
        })

      }
      if (this.state.userType === 'Tenant') {
        //@ts-ignore
        //@ts-nocheck
        this.props.history.push({
          pathname: '/register',
          state: {
            data: this.state.userType,
          },
        })

      }
      if (this.state.userType === 'Owner Resident') {
        //@ts-ignore
        //@ts-nocheck
        this.props.history.push({
          pathname: '/register',
          state: {
            data: this.state.userType,
          },
        })

      }
    }
  }
  updateType = (): boolean => {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log(this.changeUserTypeApiCallId)
    console.log(requestMessage.messageId)
    //@ts-ignore
    //@ts-nocheck
    this.setState({ loading: true })
    this.changeUserTypeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      // @ts-ignore
      // @ts-nocheck
      `account_block/user_type?user_type=${this.props.history.location.state?.data}&id=${localStorage.getItem('res_user_id')}`
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

  changeType(value: any) {
    this.setState({ userType: value })

  }

  changeUnitType(value: any) {
    this.setState({ unitRegisterType: value })

  }
  handleChange2 = (e: any) => {

    if (e.target.value) {
      // @ts-ignore
      // @ts-nocheck
      this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

  }
  handleChange = (e: any) => {
    
      console.log(e.target.value)
      // @ts-ignore
      // @ts-nocheck
      this.setState({ ...this.state, [e.target.name]: e.target.value }, () => this.getUnit(e))
    

  }
  //@ts-ignore
  //@ts-nocheck

  getData(e) {


    if (e.target.name == 'selectCountry') {
      this.getCity()

    } else if (e.target.name == 'selectCity') {
      this.getComplexbyCity()

    } else if (e.target.name == 'selectComplex') {
      this.getBuilding()

    } else if (e.target.name == 'selectBuilding') {
      // this.getUnit()

    }

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

  getCity() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getCityApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/city_list?country=${this.state.selectCountry}`
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

  getBuilding() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getBuildingApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/building_list?society_management_id=${localStorage.getItem('society_id')}`
      // `bx_block_address/building_list?society_management_id=11`

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

  getUnit(value:any) {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getUnitApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      //@ts-ignore
      //@ts-nocheck
      //  `bx_block_settings/apartment_managements/unit_list?society_management_id=${localStorage.getItem('society_id')}&building_management_id=${this.state.selectedBUilding}`
      `bx_block_address/apartment_list?id=${this.state.selectedBUilding}`

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
  getUnit2(value:any) {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getUnitApiCallId2 = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      //@ts-ignore
      //@ts-nocheck
      //  `bx_block_address/apartment_list?id=${value}`
       `bx_block_settings/apartment_managements/apartment_list?building_management_id=${value}&status=No-Own`
      // `bx_block_address/apartment_list?id=${this.state.selectBuilding.id}`

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
  registerUnit = () => {
    if (this.state.unitRegisterType) {
      if (this.state.unitRegisterType == 'Manual') {
        //@ts-ignore
        //@ts-nocheck

        this.props.history.push('/registerunitmanually')
      } else {
        //@ts-ignore
        //@ts-nocheck

        this.props.history.push('/RegisterUnitLink')


      }
    }
  }
  getComplex() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getComplexApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/society_managements`
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
  getComplexbyCity() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getComplexApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/housing_complex_list?city=${this.state.selectCity}`
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
  handleInputChange = (newValue: string) => {
    // localStorage.setItem('selectComplex', JSON.stringify(newValue))
    this.setState({ selectComplex: newValue })



  };
  handleInputChangeCOm = (newValue: any) => {
    console.log(newValue)

    this.setState({ selectComplex: newValue.value }, () => this.getData({ target: { name: 'selectComplex' } }))



  };
  createRequestManual = (attributes: any) => {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    console.log(this.state)
    const attrs = {//@ts-ignore
      //@ts-nocheck
      building_management_id: this.state.selectBuilding.id,
      country: this.state.selectCountry,
      city: this.state.selectCity,
      //@ts-ignore
      //@ts-nocheck
      unit_name: this.state.selectUnit,
      society_management_id: this.state.selectComplex
    };

    const data = {

      attributes: attrs
    };

    const httpBody = {
      data: attrs
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createRequestManaulApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_request_management/requests'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }
  handleChangeOTP = (otp: any) => this.setState({ otp });

  getCount = (): boolean => {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      token: localStorage.getItem("userToken")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    //@ts-ignore
    //@ts-nocheck
    this.setState({ loading: true })
    this.getInvitationCountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/member_invitations/request_count?society_id=${localStorage.getItem('society_id')}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;



  }
  acceptInvitation = async(id: any) => {
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken"),
        "content-type":'application/json'
      };
      const httpBody={
        "status":1
      }
      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.acceptInvitationAPICallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/requests/${id}/update_status`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
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
  rejectInvitation = async(id: any) => {
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken"),
        "content-type":'application/json'
      };
      const httpBody={
        "status":2
      }
      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.acceptInvitationAPICallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/requests/${id}/update_status`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
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
  updateChairmenProfile = async(values: any) => {
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("[data][attributes][full_name]", values.full_name)
      formData.append("[data][attributes][full_phone_number]", `${this.state.selectCode}${values.phone}`)
      formData.append("[data][attributes][gender]", values.male ? '0' : '1')
      formData.append("[data][attributes][date_of_birth]", values.DOB)
      formData.append("[data][attributes][profile_bio]", values.bio)
      formData.append("[data][attributes][twitter_link]", values.twitter)
      formData.append("[data][attributes][fb_link]", values.fb)
      formData.append("[data][attributes][instagram_link]", values.insta)
      formData.append("[data][attributes][snapchat_link]", values.snap)
      console.log(values.hobbies)
      values.hobbies.map((item:any)=>{
        formData.append('[data][attributes][hobbies][]',item)
      })


      // formData.append("vehicle[color]", values.carColor)
      if(values.bannerUrl.includes('blob')){
        
        
      }else{

        let blob = await fetch(values.bannerUrl).then(r => r.blob());
        formData.append(
          "[data][attributes][image]",
          blob
        );
      }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.updateChairmenProfileAPiId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_profile/profiles_update'
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
  profileSchema=()=>{
    const validations = Yup.object().shape({

      full_name: Yup.string().required(`This field is required`).trim(),
      phone: Yup.number()
        .typeError("Only numbers are allowed.")
        .required("Mobile number is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(10000000, "Minimum 8 digits are required.")
        .max(99999999999, "Maximum 11 digits are allowed."),
      email: Yup.string().required(`This field is required`).trim(),
      DOB: Yup.date().required(`This field is required`),
      hobbies: Yup.string().required(`This field is required`).nullable(),
      fb: Yup.string().matches(/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/, `Invalid facebook URL`).nullable(),
      insta: Yup.string().matches(/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im, `Invalid instagram URL`).nullable(),
      twitter: Yup.string().matches(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/, `Invalid twitter URL`).nullable(),
      snap: Yup.string().matches(/http(?:s)?:\/\/(?:www\.)?snapchat\.com\/([a-zA-Z0-9_]+)/, `Invalid snapchat URL`).nullable(),


    });
    return validations
  }
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget, showDialog: true })
  };
  handleClick2 = (event: any) => {
    this.setState({ anchorEl: event.currentTarget, showDialog2: true })
  };

  deleteRequest=()=> {
    this.setState({loading: true })
    console.log(this.state.selectInvitation)
    const header = {

      "token": localStorage.getItem('userToken')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteVehicleAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_request_management/member_invitations/${this.state.selectInvitation.id}`
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
  updatePublicProfile=(values:any)=>{
    console.log(values)
    if(!values.full_name){
      this.setState({showDialog:true,values:values})
    }else{
      this.setState({ values: values })

      this.publicViewAPI()
    }
  }

  publicViewAPI=()=>{
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken"),
        'content-type': 'application/json'
      };
      const data = {
        "data": {
          "attributes": {
            name_public: this.state.values.full_name,
            email_public: this.state.values.email,
            apartment_no_public: this.state.values.unit,
            phone_no_public: this.state.values.phone,
            gender_public: this.state.values.gender,
            date_of_birth_public: this.state.values.DOB,
            hobbies_public: this.state.values.hobbies,
            twitter_public: this.state.values.twitter,
            facebook_public: this.state.values.full_fbname,
            instagram_public: this.state.values.insta,
            snapchat_public: this.state.values.snap,
            family_details_public: this.state.values.family

          }
        }

      }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createVehicleApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_profile/profiles/public_profile'
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
        'PUT'
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    } catch (error) {
      // this.setState({ loading: false })
      console.log(error);
    }

  }
  addPhoneSchema=()=>{
    const validations = Yup.object().shape({
      phone: Yup.number()
        .typeError("Only numbers are allowed.")
        .required("Mobile number is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(10000000, "Minimum 8 digits are required.")
        .max(99999999999, "Maximum 11 digits are allowed.")


    });
    return validations
  }
  updatePhone=(values:any)=>{

this.setState({loading:true,error:null})
    const header = {
      "token": localStorage.getItem('userToken'),

    };
    const formData = new FormData();
    formData.append("new_phone_number", `${values.phone}`)
    formData.append("country_code", `${this.state.selectCode}`)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updatePhoneApicallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_profile/profiles/verify_number'
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
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  disablechat=()=>{

    this.setState({ loading: true })
    const header = {
      "token": localStorage.getItem('userToken'),

    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.chatSettingApiCallId = requestMessage.messageId;
    let value = this.state.profiledata.attributes.disable_chat
    console.log(!value)
    console.log(this.state.profiledata.attributes.disable_chat)

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

  redirectToDashboard=()=>{
let userType=localStorage.getItem('userType')
    if (userType == 'Owner'){
      //@ts-ignore
      //@ts-nocheck
      this.props.history.push('/OwnerDashboard')
    }else{
      //@ts-ignore
      //@ts-nocheck
      this.props.history.push('/residentDashboard')
    }

  }
  getUserType = () => {
    console.log('i\'m new user')
    try {
      const header = {

      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getUserTypeAPICall = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_roles_permissions/roles`
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
    } catch (error) {
      console.log(error);
    }
  };
  getInvitation = () => {

    try {
      const header = {
        token: localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getInvitationAPICall = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/member_invitations?search_unit=${this.state.selctedUnit?this.state.selctedUnit:''}&search_building=${this.state.selectedBUilding? this.state.selectedBUilding :''}&user_type=${this.state.selectedUserType ? this.state.selectedUserType:''}&society_management_id=${localStorage.getItem('society_id')}`
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
    } catch (error) {
      console.log(error);
    }
  };
  getRequest = () => {

    try {
      const header = {
        token: localStorage.getItem("userToken")
      };

      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getRequestDataAPICall = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/bx_block_request_management/request_data?society_management_id=${localStorage.getItem('society_id')}`
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
    } catch (error) {
      console.log(error);
    }
  };
  InvitationSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .strict(true)
        .lowercase(`Please enter all values in lowercase`)
        .trim()
        .required(`This field is required.`),
      usertype: Yup.string().required(`This field is required`),
      fullname: Yup.string().required(`This field is required`),
      phoneno: Yup.number()
        .typeError("Only numbers are allowed.")
        .required("Mobile number is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(100000000, "Minimum 9 digits are required.")
        .max(1000000000, "Maximum 9 digits are allowed.")
    });
    return validations
  }


  handleClose = () => {
    this.setState({setOpen:false});
  };
  createInvitation=(values:any)=>{
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("member_invitation[full_name]]", values.fullname)
      formData.append("member_invitation[email_address]", values.email)
      formData.append("member_invitation[phone_number]", this.state.selectCode+values.phoneno)
      formData.append("member_invitation[role_id]", values.usertype)
      formData.append("member_invitation[building_management_id]", values.building)
      formData.append("member_invitation[apartment_management_id]", values.unit)
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createInvitationAPICallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_request_management/member_invitations'
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
        'POST'
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    } catch (error) {
      // this.setState({ loading: false })
      console.log(error);
    }
  }
  updateInvitation=(values:any)=>{
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      formData.append("member_invitation[full_name]]", values.fullname)
      formData.append("member_invitation[email_address]", values.email)
      formData.append("member_invitation[phone_number]", values.phoneno)
      formData.append("member_invitation[role_id]", values.usertype)
      formData.append("member_invitation[building_management_id]", values.building)
      formData.append("member_invitation[apartment_management_id]", values.unit)
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createInvitationAPICallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_request_management/member_invitations'
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
  handleAcceptClose = () => {
    this.setState({setAcceptOpen:false});
  };
  handleRejectOpen = (data:any) => {
    this.setState({selectInvitation:data,setRejectOpen:true
    },()=>console.log(this.state.selectInvitation));
  };

  handleRejectClose = () => {
    this.setState({setRejectOpen:false});
  };

  handleAcceptOpen = (data:any) => {
    this.setState({setAcceptOpen:true,selectInvitation:data});
  };
  handleResendRequest = (data:any) => {
    console.log(data)
    
    this.setState({setRequestOpen:true,selectInvitation:data})
    this.setState({anchorEl1:null});
  }
  handleDeleteRequestOpen = (data:any) => {
    console.log(data)
    this.getUnit2(data?.attributes?.building_management?.id)
    this.setState({setDeleteRequest:true,selectInvitation:data})
    this.setState({anchorEl1:null});
  }

  handleDeleteRequestClose = () => {
    this.setState({setDeleteRequest:false})
  }
  handleMoreClose = () => {
    this.setState({anchorEl1:null});
  }
  handleRequestClose = () => {
    this.setState({setRequestOpen:false})
  }
  handleMoreClick = (e: any) => {
    this.setState({anchorEl1:e.currentTarget});
  }
  getUserProfile=()=>{
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
      `bx_block_profile/profiles?society_management_id=${localStorage.getItem('society_id')}&apartment_management_id=${this.state.selctedUnit?this.state.selctedUnit:''}&building_management_id=${this.state.selectedBUilding? this.state.selectedBUilding :''}&user_type=${this.state.selectedUserType ? this.state.selectedUserType:''}`
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
  getUserProfileSearch=(value:any)=>{
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
      `bx_block_profile/profiles?society_management_id=${localStorage.getItem('society_id')}&apartment_management_id=${this.state.selctedUnit?this.state.selctedUnit:''}&building_management_id=${this.state.selectedBUilding? this.state.selectedBUilding :''}&user_type=${this.state.selectedUserType ? this.state.selectedUserType:''}&q=${value}`
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
  getUserProfileSearchWithType=(value:any,type:any)=>{
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
      `bx_block_profile/profiles?society_management_id=${localStorage.getItem('society_id')}&apartment_management_id=${this.state.selctedUnit?this.state.selctedUnit:''}&building_management_id=${this.state.selectedBUilding? this.state.selectedBUilding :''}&user_type=${type}&q=${value}`
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
  getUserTypeProfile=(role:any)=>{
    let roleName =window.location.pathname
    console.log(roleName)
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
      `bx_block_profile/profiles?society_management_id=${localStorage.getItem('society_id')}`
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
  openChat=(data:any)=>{
    
    
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
      formData.append("chat[chat_with_account]", data);



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
  handleTooltipClose=(value:any)=>{
    if(value===1){
      this.setState({open:false})
    }else if(value==2){
      this.setState({open2:false})
    
    }else{
      this.setState({open3:false})
    
    }
  }
  handleTooltipOpen=(value:any)=>{
if(value===1){
  this.setState({open:true})
}else if(value==2){
  this.setState({open2:true})

}else{
  this.setState({open3:true})

}
  }
  // Customizable Area End
}
