//@ts-ignore
//@ts-nocheck


import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from 'yup';
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { valueContainerCSS } from "react-select/src/components/containers";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
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
  userType: string | null;
  error: string | null;
  loading: boolean;
  userTypeData:any;
  anchorEl :any ;
  anchorEl_1 :any ;
  getIncidentDetails : any;
  sortBy : any ;
  status : any;
  buildingName:any;
  statusDetail : any;
  providerWork:any;
  providerName:any;
  provider_id : any ;
  imageShowDialog:any;
  statusShowDialog:any;
  file:any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class IncidentManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;

  apicreateIncidentCallId: any;
  validationApiCallId: any;
  getIncidentListingApiCallId: any;
  getIncidentDetailsByIdApiCallId : any ;
  getBuildingNameApiCallId : any ;
  getUnitRelatedApiCallId:any ;
  getIncidentRelatedApiCallId:any;
  validationApiCallId: string = "";
  searchIncidentListingApiCallId:any

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

  currentCountryCode: any;
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
      userType:'',
      loading: false,
      commonAreaData:null,
      incidentRelatedData:null,
      incidentListing: null,
      anchorEl:null,
      anchorEl_1:null,
      getIncidentDetails:null,
      buildingName : " ",
      unitName : " ",
      status :" ",
      serachBuildingName:" ",
      statusDetail:" ",
      providerWork:" ",
      providerName :" ",
      provider_id:null,
      imageShowDialog:false,
      file:{},
      statusShowDialog:false
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

  // async componentDidUpdate(prevProps: any, prevState: any) {
  //   if (
  //     prevState.serachBuildingName !== this.state.serachBuildingName ||
  //     prevState.unitName !== this.state.unitName   ||
  //     prevState.status !== this.state.status       
  //   ) {
  //    this.getIncidentListing(this.state.serachBuildingName ,this.state.unitName,this.state.status)
  //   }
  // }

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

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.validationApiCallId) {
          this.arrayholder = responseJson.data;

          if (this.arrayholder && this.arrayholder.length !== 0) {
            let regexData = this.arrayholder[0];

            if (regexData.password_validation_regexp) {
              this.passwordReg = new RegExp(
                regexData.password_validation_regexp
              );
            }

            if (regexData.password_validation_rules) {
              this.setState({
                passwordHelperText: regexData.password_validation_rules
              });
            }

            if (regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        } 
        else if (apiRequestCallId === this.apiAssginProviderCallId) {
          if (responseJson && responseJson.data) {
            console.log("apiAssginProviderCallId===========>",responseJson)
            const id = localStorage.getItem("incidentManagementDetailId")
            this.getIncidentDetailsById(id);
            this.setState({loading: false})      
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.apiUpdateProviderCallId) {
          if (responseJson && responseJson.data) {
            console.log("apiUpdateProviderCallId===========>",responseJson)
            const id = localStorage.getItem("incidentManagementDetailId")
            this.getIncidentDetailsById(id);
            this.setState({loading: false})      
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
         
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
      else if (apiRequestCallId === this.apiUpdateStatusCallId) {
          if (responseJson && responseJson.data) {
            console.log("apiUpdateStatusCallId===========>",responseJson)
            this.setState({loading: false})      
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
         
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.searchIncidentListingApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("searchIncidentListingApiCallId ========================>",responseJson)
          this.setState({SearchIncident :responseJson?.data})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getProviderNameApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getProviderNameApiCallId ========================>",responseJson)
          this.setState({providerNameListing :responseJson?.data})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getProviderListingApiCallId) {
          if (responseJson || responseJson?.data ) {
          console.log("getProviderListingApiCallId ========================>",responseJson)
          this.setState({providerListing :responseJson})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getProviderNameApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getProviderNameApiCallId ========================>",responseJson)
          this.setState({providerNameListing :responseJson?.data})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getProviderListingApiCallId) {
          if (responseJson || responseJson?.data ) {
          console.log("getProviderListingApiCallId ========================>",responseJson)
          this.setState({providerListing :responseJson})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getIncidentListingApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getIncidentListingApiCallId ========================>",responseJson)
          this.setState({incidentListing :responseJson?.data})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getIncidentDetailsByIdApiCallId) {
          if (responseJson && responseJson?.data ) {
            const work_type = responseJson?.data?.attributes?.assign_incidents?.data?.attributes?.provider?.work_type;
            const apartment_management_id= responseJson?.data?.attributes?.apartment_management?.apartment_management_id;
            const providerWork =`${apartment_management_id},${work_type}`;
            const providerName = responseJson?.data?.attributes?.assign_incidents?.data?.attributes?.provider?.id;
            const statusDetail = responseJson?.data?.attributes?.incident_status;
          
         if(responseJson?.data?.attributes?.assign_incidents?.data === null )
              this.setState({getIncidentDetails : responseJson?.data , statusDetail}) 
         else
         {
          this.getProviderName(apartment_management_id , work_type)
          this.setState({getIncidentDetails : responseJson?.data , statusDetail , providerWork , providerName})
         }
            console.log("providerWork  providerName   statusDetail ========>",providerWork,providerName,statusDetail)
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            console.log("responseJson?.errors====>",responseJson?.errors)
            this.props.history.push("/IncidentManagementDetail")
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getUnitRelatedApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getUnitRelatedApiCallId  ========================>",responseJson)
         this.setState({unitNameData :responseJson?.data?.unit_apartments})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getBuildingNameApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getBuildingNameApiCallId  ========================>",responseJson)
          this.setState({buildingNameData :responseJson?.data?.buildings})
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );
      if (otpAuthTkn && otpAuthTkn.length > 0) {
        this.setState({ otpAuthToken: otpAuthTkn });
        runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
        runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
      }
    }

    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          countryCodeSelected:
            selectedCode.indexOf("+") > 0
              ? selectedCode.split("+")[1]
              : selectedCode
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
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


clear= () => {
  localStorage.clear()
  this.props.history.push("/");
}

getIncidentDetails= (id) => {
 localStorage.setItem("incidentManagementDetailIdId",id)
  this.props.history.push({
    pathname: "/IncidentManagementDetail",
});
}

serachHandle=()=>{
  this.getIncidentListing(this.state.serachBuildingName ,this.state.unitName,this.state.status)
}

onChange =(e)=>{
  if(e.target.name === 'buildingName'){
    const array = e.target?.value?.split(",");
    const id = array [0]
    const name = array[1] 
    this.getUnit(id)
    this.setState({ buildingName:e.target?.value})
    this.setState({ serachBuildingName:name})
  }
  else if(e.target.name === "statusDetail"){
    const  value = e.target.value
    this.setState({ [e.target.name]:e.target.value})
    // this.setState({ statusShowDialog: false })
    this.updateStatus(value);
  }
  else if(e.target.name === 'providerWork'){
    const array = e.target?.value?.split(",");
    const id = array [0]
    const name = array[1] 
    this.getProviderName(id , name)
    this.setState({ providerWork:e.target?.value})
  }
  // else if(e.target.name === 'ProviderName'){
  //   const array = e.target?.value?.split(",");
  //   const id = array [0] 
  //   this.setState({ provider_id:id})
  //   this.setState({ ProviderName:e.target?.value})
  // }
  else if(e.target.name === "statusDetail"){
    const  value = e.target.value
    this.setState({ [e.target.name]:e.target.value})
    // this.setState({ statusShowDialog: false })
    this.updateStatus(value);
  }
  else if(e.target.name === 'providerWork'){
    const array = e.target?.value?.split(",");
    const id = array [0]
    const name = array[1] 
    this.getProviderName(id , name)
    this.setState({ providerWork:e.target?.value})
  }
  // else if(e.target.name === 'ProviderName'){
  //   const array = e.target?.value?.split(",");
  //   const id = array [0] 
  //   this.setState({ provider_id:id})
  //   this.setState({ ProviderName:e.target?.value})
  // }
  else {
    this.setState({ [e.target.name]:e.target.value})
  }
}


  updateStatus = (val) => {
    
    const header = {
      token :localStorage.getItem("userToken")
    };
    const  id = localStorage.getItem("incidentManagementDetailId")
    const formData = new FormData();
    console.log("this.state?.statusDetail=========>",val)
   
    if(val ==="Resolved")
    formData.append('incident[mark_resolved_by_reporter]', true);
    else
    formData.append('incident[mark_resolved_by_reporter]', false);
   
    formData.append('incident[incident_status]', val);
   console.log("formData.getAll('description')==================>",formData.get('incident[mark_resolved_by_reporter]'))
   const httpBody = formData;
   
    this.setState({loading: true}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiUpdateStatusCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_custom_form/incidents/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      httpBody
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PatchAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

 
  getIncidentListing= (serachBuildingName : any , unitName : any, status:any)  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getIncidentListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });
     
     //const  url = `bx_block_custom_form/incidents`
     const  getSortByOrStatus = `bx_block_custom_form/incidents?search_building=${this.state?.serachBuildingName}&search_unit=${this.state?.unitName}&filter_by=${this.state?.status}`
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        getSortByOrStatus
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

  searchIncidentListing= (serachBuildingName : any ,unitName : any,status:any)  => {
    try {
      console.log("serachBuildingName unitName status ======>", status ,unitName ,serachBuildingName)
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.searchIncidentListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });
     
     const  getSortByOrStatus = `bx_block_custom_form/incidents?search_building=${serachBuildingName}&search_unit=${unitName}`
       
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        getSortByOrStatus
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
  
  getBuildingName = () => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      const society_id = localStorage.getItem("society_id")
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getBuildingNameApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_settings/building_managements`
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

  getUnit = (id) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getUnitRelatedApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_address/apartment_list?id=${id}`
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

  getIncidentDetailsById= (id : any ,) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getIncidentDetailsByIdApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_custom_form/incidents/${id}`
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
  
  updateProvider = (assign_incidentsi_id:any) => {
    
    const header = {
      token :localStorage.getItem("userToken")
    };
    const  incident_id = localStorage.getItem("incidentManagementDetailId")
    const formData = new FormData();
   
    formData.append('assign_incident[incident_id]', incident_id);
    formData.append('assign_incident[provider_id]',this.state.providerName);
   //console.log("formData.getAll('description')==================>",formData.get('incident[mark_resolved_by_reporter]'))
   const httpBody = formData;
   
    this.setState({loading: true,showDialog: false}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiUpdateProviderCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_custom_form/assign_incidents/${assign_incidentsi_id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      httpBody
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PatchAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  assginProvider= ()  => {
    const header = {
      token :localStorage.getItem("userToken")
    };
    const  id = localStorage.getItem("incidentManagementDetailId")
    const provider_id = this.state?.providerName;
    const formData = new FormData();
    console.log("asgin provide iiifh ============>",provider_id,id)
    formData.append('assign_incident[incident_id]',id);
    formData.append('assign_incident[provider_id]',provider_id);
   
    const httpBody = formData;
   
    this.setState({loading: true ,showDialog :false}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiAssginProviderCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_custom_form/assign_incidents`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      httpBody
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  getProviderName= (id :any , name : any)  => {
    try { 
      //this.setState({ showDialog: true }) 
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getProviderNameApiCallId = requestMessage.messageId;
      this.setState({ loading: true ,providerName:" "});
     const  providerList = `account_block/providers/work_provider_list?apartment_management_id=${id}&work_type=${name}`
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        providerList
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

  providerList= (id :any)  => {
    try { 

      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getProviderListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true,showDialog: true ,});
     
     const  providerList = `account_block/providers?apartment_management_id=${id}`
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        providerList
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
  // Customizable Area End
}
