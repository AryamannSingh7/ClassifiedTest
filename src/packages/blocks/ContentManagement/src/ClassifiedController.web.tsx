import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from 'yup';
import moment from "moment";
import {RouteComponentProps} from 'react-router';
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { valueContainerCSS } from "react-select/src/components/containers";
import { truncateSync } from "fs";
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
  userType: string | null;
  error: string | null;
  loading: boolean;
  userTypeData:any;
  anchorEl :any ;
  anchorEl_1 :any ;
  getClassifiedDetails : any;
  sortBy : any ;
  status : any;
  getCurrencyList:any;
  upload:any;
  notImageOrVideoError:any,
  sizeError:any,
  file : any,
  commonAreaData:any,
  incidentRelatedData:any,
  classifiedListing:any,
  showDialog:any;
  deleteShowDialog:any;
  classifiedId:any;
  myOrAllClassified:boolean;
  // Customizable Area End
}
  
export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ClassifiedController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  deleteClassifiedApiCallId:any;
  createClassifiedApiCallId: any;
  validationApiCallId: any;
  getClassifiedListingApiCallId: any;
  getClassifiedDetailsByIdApiCallId : any ;
  getMyClassifiedListApiCallId : any ;
  updateClassifiedApiCallId:any;
  getCurrencyListApiCallId:any;

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
  //@ts-ignore
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
      classifiedListing: null,
      anchorEl:null,
      anchorEl_1:null,
      getClassifiedDetails:null,
      sortBy : "" ,
      status : "",
      getCurrencyList:[],
      upload:false,
      notImageOrVideoError:false,
      sizeError:false,
      file :{},
      showDialog:false,
      deleteShowDialog:false,
      classifiedId:null,
      myOrAllClassified:true,
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

  async componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevState.status !== this.state.status 
    ) {
     this.getClassifiedListing(this.state.status)
    }
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
      else if (apiRequestCallId === this.createClassifiedApiCallId) {
          if (responseJson && responseJson.data) {
            console.log("createClassifiedApiCallId===========>",responseJson)
            //@ts-ignore
            this.props.history.push("/ClassifiedReportedSuccessfully")
            this.setState({loading: false})      
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0]
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
         
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.deleteClassifiedApiCallId) {
          if (responseJson?.message === 'Successfully deleted' && responseJson?.code === 200) {
            console.log("deleteClassifiedApiCallId===========>",responseJson)
            this.setState({loading: false, deleteShowDialog: false,classifiedId:null}) 
               //@ts-ignore
              this.props.history.push("/ClassifiedListing")     
          } else if (responseJson?.errors) {
            let error =responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
         
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getClassifiedListingApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getClassifiedListingApiCallId ========================>",responseJson)
          this.setState({classifiedListing :responseJson?.data,loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getClassifiedDetailsByIdApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getClassifiedDetailsByIdApiCallId ========================>",responseJson)
          this.setState({getClassifiedDetails :responseJson?.data})
          console.log("responseJson getClassifiedDetails========================>",this.state?.getClassifiedDetails)
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
                     //@ts-ignore
                    //@ts-nocheck
              this.props.history.push("/ClassifiedListing")
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getMyClassifiedListApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getMyClassifiedListApiCallId  ========================>",responseJson)
          this.setState({classifiedListing :responseJson?.data,loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.updateClassifiedApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("updateClassifiedApiCallId========================>",responseJson)
          this.setState({incidentRelatedData :responseJson?.data,loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getCurrencyListApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getCurrencyListApiCallId========================>",responseJson)
          this.setState({getCurrencyList :responseJson?.data})
        
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
      //@ts-ignore
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
  //@ts-ignore
  this.props.history.push("/");
}
changeType(value: any) {
    this.setState({ userType: value })

  }

nextBtn = (val:any)=>{
  localStorage.setItem("classifiedUserType",val)
  console.log("nextBtn=========>", val);
    this.setState({ loading: true })
    //@ts-ignore
    this.props.history.push("/CreateClassified")
}  
onSubmit =(values:any)=>{
  localStorage.setItem("classifiedPreview", JSON.stringify(values))
  console.log("onsbumit=========>", values);
    this.setState({ loading: true })
    //@ts-ignore
    this.props.history.push("/ClassifiedPreview")
}
getIncidentDetails= (id :any) => {
   //@ts-ignore
  this.props.history.push({
    pathname: "/ClassifiedDetails",
     //@ts-ignore
    id,
});
  
  this.getClassifiedDetailsById(id)
}

deleteClassified =()=>{
  const header = {
    token :localStorage.getItem("userToken")
  };
  const id =this.state?.classifiedId
  console.log("id deleteClassified==============>",id)
  this.setState({loading: true}) 
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.deleteClassifiedApiCallId = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `bx_block_posts/classifieds/${id}`
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    `DELETE`
  );

  runEngine.sendMessage(requestMessage.id, requestMessage);

  return true;

}

createClassified = async(classifiedFromData: any ,classifiedUserType : any) => {
  try   
   {
     const header = {
      token :localStorage.getItem("userToken")
    };
   // console.log("values create==================>",classifiedFromData.media[0].file );
    const formData = new FormData();
   formData.append('classified[classified_type]', classifiedUserType);
   formData.append('classified[full_phone_number]', classifiedFromData?.phone);
   formData.append('classified[email]', classifiedFromData.email);
   formData.append('classified[title]', classifiedFromData.classifiedTitle);
   formData.append('classified[description]', classifiedFromData.description);
   formData.append('classified[currency_id]', classifiedFromData.currency);
   formData.append('classified[duration_from]', classifiedFromData.startDate);
   formData.append('classified[duration_to]', classifiedFromData.endDate);

   for (let j = 0; j < classifiedFromData.media.length; j += 1) {
    let blob = await fetch(classifiedFromData.media[j].url).then(r => r.blob());
      //@ts-ignore
    // blob.name = classifiedFromData.media[j].file.name
    console.log("bolb ==================>",blob);

    formData.append(
      "classified[attachments][]",
      blob
    );
    //console.log("classified[attachments][] ==================>",classifiedFromData.media[j].file);
  }
  if(classifiedUserType==='generic'){
    formData.append('classified[payment_detail]', classifiedFromData.paymentDetail);
    formData.append('classified[time_from]', classifiedFromData.timeFrom);
    formData.append('classified[time_to]', classifiedFromData.timeTo);
  }
  else if(classifiedUserType==='buyer'){
    formData.append('classified[price_from]', classifiedFromData.priceFrom);
    formData.append('classified[price_to]', classifiedFromData.priceTo);
  }
  else {
    formData.append('classified[price]', classifiedFromData.price);
  }
  
   const httpBody = formData;
    this.setState({loading: true}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createClassifiedApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_posts/classifieds`
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
    }
    catch (error) {
      this.setState({loading: false})
      console.log(error);
    }
  };

 
  getClassifiedListing= (status : any)  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getClassifiedListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true , myOrAllClassified:true});
     
     const  getSortByOrStatus =`bx_block_posts/classifieds?filter_by=${status}`
       
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
  
  getCurrencyList = () => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getCurrencyListApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_posts/classifieds/currency_list`
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

  getMyClassifiedList = () => {
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
      this.getMyClassifiedListApiCallId = requestMessage.messageId;
      this.setState({ loading: true ,myOrAllClassified:false });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_posts/classifieds/my_classified_list`
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

  updateClassified =async (classifiedFromData:any,) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      const formData = new FormData();
      const classifiedUserType = this.state?.getClassifiedDetails?.attributes?.classified_type
      //formData.append('classified[classified_type]', classifiedUserType);
      formData.append('classified[full_phone_number]', classifiedFromData?.phone);
      formData.append('classified[email]', classifiedFromData.email);
      formData.append('classified[title]', classifiedFromData.classifiedTitle);
      formData.append('classified[description]', classifiedFromData.description);
      formData.append('classified[currency_id]', classifiedFromData.currency);
      formData.append('classified[duration_from]', classifiedFromData.startDate);
      formData.append('classified[duration_to]', classifiedFromData.endDate);
   
      for (let j = 0; j < classifiedFromData.media.length; j += 1) {
       let blob = await fetch(classifiedFromData.media[j].url).then(r => r.blob());
         //@ts-ignore
       // blob.name = classifiedFromData.media[j].file.name
       console.log("bolb ==================>",blob);
   
       formData.append(
         "classified[attachments][]",
         blob
       );
       //console.log("classified[attachments][] ==================>",classifiedFromData.media[j].file);
     }
     if(classifiedUserType ==='generic'){
       formData.append('classified[payment_detail]', classifiedFromData.paymentDetail);
       formData.append('classified[time_from]', classifiedFromData.timeFrom);
       formData.append('classified[time_to]', classifiedFromData.timeTo);
     }
     else if(classifiedUserType==='buyer'){
       formData.append('classified[price_from]', classifiedFromData.priceFrom);
       formData.append('classified[price_to]', classifiedFromData.priceTo);
     }
     else {
       formData.append('classified[price]', classifiedFromData.price);
     }
     
      const httpBody = formData;
      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.updateClassifiedApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_posts/classifieds/${classifiedFromData?.id}`
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
    } catch (error) {
      console.log(error);
    }
  };

  getClassifiedDetailsById= (id : any) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getClassifiedDetailsByIdApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_posts/classifieds/${id}`
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
  
  
  handleClick = (event:any,id:any) => {
    console.log("id=========>",id)
    this.setState({anchorEl:event.currentTarget ,classifiedId:id })
  };
  handleClose = (e:any, v:any) => {
    console.log("v=========>",v)
    let anchorEl :any ;
    if(v === undefined || v === null){
      anchorEl=null
    }
    else if (v === "edit"){
      localStorage.removeItem("classifiedUserType");
      this.props.history.push({
        pathname: "/CreateClassified",
         //@ts-ignore
        id:this.state?.classifiedId
    });
    }
   else if (v === "delete"){
     {
      console.log("classifiedId=============>",this.state?.classifiedId)
      this.setState({deleteShowDialog: true}) }
     }

     this.setState({anchorEl}) 
  };
  
  handleClick_1 = (event :any) => {
    this.setState({anchorEl_1:event.currentTarget})
  };
   
  handleClose_1 = (e:any, v:any) => {
   let status : any ;
    if(v === undefined || v === null){
      console.log("v=========>",v)
      status =this.state.status;
    }
    else {
      status =v;
    }
    this.setState({anchorEl_1:null ,status :status})
  };
  
  handleSelectMedia  =   (
    e: any,
    existingMedia: any[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    setFieldError: (field: string, message: string) => void
  ) => {
    let media = [];
    let files = e.target.files;
    console.log("filessss=====>",files);
  
    
if(files.length !== 0){
  for (let i = 0; i < files.length; i += 1) {
    if(files[i] && !["image/jpg", "image/jpeg", "image/gif", "image/png","video/mp4","video/x-m4v" ].includes(files[i].type))
    {
      console.log("type=====>",files[i].type);
      this.setState({upload: false,sizeError : false,notImageOrVideoError:true});
       return ;
    } 
    else if(files[i] && files[i].size >= 10e6)
    {
       console.log("size=====>",files[i].size);
       this.setState({upload: false , sizeError : true ,notImageOrVideoError:false});
      return ;
    }
    console.log("media push =====>",files[i]);
    media.push({
      file: {
        lastModified: files[i].lastModified,
        lastModifiedDate: files[i].lastModifiedDate,
        name: files[i].name,
        size: files[i].size,
        type: files[i].type
      },
      url: URL.createObjectURL(files[i])
    });
  }
  e.target.value = "";
  this.setState({upload: true ,sizeError : false,notImageOrVideoError:false});
  console.log("media======>",media)
  setFieldValue("media", media);
}
else {
  this.setState({upload: false,sizeError : false,notImageOrVideoError:false});
}
   
  };
  
createClassifiedSchemaGerenic() {
    const validations = Yup.object().shape({
      phone: Yup.number()
      .typeError("Only numbers are allowed.")
      .positive("Negative numbers are not allowed.")
      .integer("Number can't contain a decimal.")
      .min(10000000, "Minimum 8 digits are required.")
      .max(9999999999999, "Maximum 11 digits are allowed.")
      .required("Mobile number is required")
     ,
      email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
      classifiedTitle: Yup.string().max(50, "Too Long!").required("Title is required"),
      description: Yup.string().max(200, "Too Long!").required("Description is required"),
      currency:Yup.string().trim().required("Currency is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required(" End Date is required")
                         .test("is-greater", "End date should be greater than Star date", function(value) {
                         const { startDate } = this.parent;
      return moment(value, "DD/MM/YYYY").isSameOrAfter(moment(startDate, "DD/MM/YYYY"));
      })
      ,
    timeFrom:Yup.string().required("Start time is required"),
    timeTo:Yup.string().required("End time is required")
    .test("is-greater", "End time should be greater than Star time", function(value) {
      const { timeFrom } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(timeFrom, "HH:mm"));
    })
    ,
    paymentDetail:Yup.string().required("Payment Detail is required"),
    });
       
    return validations ;
  }
  createClassifiedSchemaBuy() {
    const validations = Yup.object().shape({
      phone: Yup.number()
      .typeError("Only numbers are allowed.")
      .positive("Negative numbers are not allowed.")
      .integer("Number can't contain a decimal.")
      .min(10000000, "Minimum 8 digits are required.")
      .max(9999999999999, "Maximum 11 digits are allowed.")
      .required("Mobile number is required")
     ,
      email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
      classifiedTitle: Yup.string().max(50, "Too Long!").required("Title is required"),
      description: Yup.string().max(200, "Too Long!").required("Description is required"),
      currency:Yup.string().trim().required("Currency is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required(" End Date is required")
                         .test("is-greater", "End date should be greater than Star date", function(value) {
                         const { startDate } = this.parent;
      return moment(value, "DD/MM/YYYY").isSameOrAfter(moment(startDate, "DD/MM/YYYY"));
      })
      ,
    priceFrom:Yup.number()
             .typeError("Only numbers are allowed.")
             .positive("Negative numbers are not allowed.")
             .integer("Number can't contain a decimal."),
    priceTo:Yup.number()
           .typeError("Only numbers are allowed.")
           .positive("Negative numbers are not allowed.")
           .integer("Number can't contain a decimal.")
           .test("priceFrom ", "Value sholud be greater than From price", function(value : number) {
            const { priceFrom } = this.parent;
            return value > priceFrom ;
          }),
    });
       
    return validations ;
  }
  createClassifiedSchemaSell() {
    const validations = Yup.object().shape({
      phone: Yup.number()
      .typeError("Only numbers are allowed.")
      .positive("Negative numbers are not allowed.")
      .integer("Number can't contain a decimal.")
      .min(10000000, "Minimum 8 digits are required.")
      .max(9999999999999, "Maximum 11 digits are allowed.")
      .required("Mobile number is required")
     ,
      email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
      classifiedTitle: Yup.string().max(50, "Too Long!").required("Title is required"),
      description: Yup.string().max(200, "Too Long!").required("Description is required"),
      currency:Yup.string().trim().required("Currency is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required(" End Date is required")
                         .test("is-greater", "End date should be greater than Star date", function(value) {
                         const { startDate } = this.parent;
      return moment(value, "DD/MM/YYYY").isSameOrAfter(moment(startDate, "DD/MM/YYYY"));
      })
      ,
      price:Yup.number()
      .required("Price is required")
      .typeError("Only numbers are allowed.")
      .positive("Negative numbers are not allowed.")
      .integer("Number can't contain a decimal."),
    });
       
    return validations ;
  }
  // Customizable Area End
}
