import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from "yup";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  passwordSchema: any;
  accountStatus: any;
  passwordRules: any;
  emailValue: any;
  phoneValue: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: Boolean;
  btnConfirmPasswordShowHide: Boolean;
  error: string | null;
  emailOtp:any
  otp:any;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordInvisibleImage = require("../assets/ic_password_invisible.png");
const passwordVisibleImage = require("../assets/ic_password_visible.png");
// Customizable Area End

export default class ChairmanForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  checkUserApiCallId:any
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  sendEmailOtpCallId:any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  otpToken: any;
  isChangePassword: boolean;
  verifyOtpApiCallId:any;

  //Properties from config
  labelTextIsAccountRecovery: string = configJSON.labelTextIsAccountRecovery;
  secondLabelText: string = configJSON.secondLabelText;
  thirdLabelText: string = configJSON.thirdLabelText;
  forthLabelText: string = configJSON.forthLabelText;
  fifthLabelText: string = configJSON.fifthLabelText;
  sixthLabelText: string = configJSON.sixthLabelText;
  firstInputAutoCompleteType: any = configJSON.firstInputAutoCompleteType;
  firstInputKeyboardStyle: any = configJSON.firstInputKeyboardStyle;
  firstInputPlaceholder: string = configJSON.firstInputPlaceholder;
  firstInputErrorColor: any = configJSON.firstInputErrorColor;
  buttonTextIsNext: string = configJSON.buttonTextIsNext;
  buttonColorForNextButton: any = configJSON.buttonColorForNextButton;
  secondInputAutoCompleteType: any = configJSON.secondInputAutoCompleteType;
  secondInputKeyboardType: any = configJSON.secondInputKeyboardType;
  secondInputPlaceholder: string = configJSON.secondInputPlaceholder;
  secondInputErrorColor: any = configJSON.secondInputErrorColor;
  thirdInputPlaceholder: string = configJSON.thirdInputPlaceholder;
  thirdInputErrorColor: any = configJSON.thirdInputErrorColor;
  buttonTitleIsSMSPhoneAccount: string =
    configJSON.buttonTitleIsSMSPhoneAccount;
  buttonTitleIsEmailAccount: string = configJSON.buttonTitleIsEmailAccount;
  labelTextIsPleaseEnterYourNewPassword: string =
    configJSON.labelTextIsPleaseEnterYourNewPassword;
  labelTextIsYourPasswordHasBeenSuccessfullyChanged: string =
    configJSON.labelTextIsYourPasswordHasBeenSuccessfullyChanged;
  placeholderIsPassword: string = configJSON.placeholderIsPassword;
  passwordVisibleImage: any = passwordVisibleImage;
  passwordInvisibleImage: any = passwordInvisibleImage;
  placeholderIsReTypePassword: string = configJSON.placeholderIsReTypePassword;
  buttonTitleIsOk: string = configJSON.buttonTitleIsOk;
  buttonColorForOkButton: any = configJSON.buttonColorForOkButton;
  countryCodeSelectorPlaceholder: string =
    configJSON.countryCodeSelectorPlaceholder;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    //email schema
    let emailSchema = {
      email: Yup.string()
        .email(configJSON.pleaseEnterAValidEmail)
        .required(configJSON.emailIsRequired)
    };

    //phone schema
    let phoneSchema = {
      // countryCode: Yup.number()
      // .required("Country code is required"),

      phone: Yup.string()
        .matches(phoneRegExp, configJSON.phoneNumberIsNotValid)
        .required(configJSON.phoneNumberIsRequired)
    };

    //otpSchema
    let otpSchema = {
      otpCode: Yup.number()
        .min(4)
        .required(configJSON.otpCodeIsRequired)
    };

    //passwordSchema
    let passwordSchema = {
      password: Yup.string()
        .required(configJSON.pleaseEnterAPassword)
        .min(2, configJSON.passwordMustBeAtLeast2Characters),
      confirmPassword: Yup.string()
        .required(configJSON.pleaseConfirmYourPassword)
        .when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            configJSON.passwordsMustMatch
          )
        })
    };

    this.state = {
      accountType: "sms",
      accountStatus: "ChooseAccountType",
      emailValue: "",
      phoneValue: "",
      countryCodeSelected: "",
      passwordRules: "",
      emailSchema: emailSchema,
      phoneSchema: phoneSchema,
      otpSchema: otpSchema,
      passwordSchema: passwordSchema,
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      error: null,
      emailOtp:null,
      otp:null,
      loading:false
    };
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    //this.validationRulesRequest();
  }

  validationRulesRequest = () => {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.profileValidationSettingsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.sendEmailOtpCallId !== null &&
      this.sendEmailOtpCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      // console.log("entered email!!!!");
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (
        responseJson !== undefined &&
        responseJson.meta &&
        responseJson.meta.token
      ) {
        //this.otpToken = responseJson.meta.token;
        console.log("checuser==============================>,",responseJson)
       // this.setState({ token:responseJson.meta.token, emailOtp:responseJson.email_otp });
       localStorage.setItem("otpToken", responseJson?.meta?.token)
       localStorage.setItem("emailOtp", responseJson?.email_otp)
       this.setState({loading: false})
       //@ts-ignore
        this.props.history.push("/ChairmanForgotPasswordOTP")
            }
      //error handling
      
      else if (responseJson?.errors) {
        //Check Error Response
        let error = Object.values(responseJson.errors[0])[0] as string;
        this.setState({ error });
      } else {
        this.setState({ error: responseJson?.error || "Something went wrong!" });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
      
    }  else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.verifyOtpApiCallId !== null &&
      this.verifyOtpApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson?.messages) {
        console.log('responseJson===========> successflll',responseJson)
        // let params = new URL(document.location as any).searchParams;
        // let token = params.get("token");
        //window.location = "/new-password?token=" + token as any;
        this.setState({loading: false})
          //@ts-ignore
          this.props.history.push("/ChairmanChangePassword")
        //  window.location ="/ChairmanChangePassword" as any
      } else if (responseJson?.errors) {
          let error = responseJson?.errors[0]?.pin as string;
          this.setState({ error });
      } else {
          this.setState({ error: responseJson?.error || 'Something went wrong!' });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
    }
     else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.requestChangePasswordCallId !== null &&
      this.requestChangePasswordCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      // console.log("entered 3");
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson?.data) {
        this.setState({loading: false})
        //@ts-ignore
        this.props.history.push("/ChairmanChangeSuccessfully")
        //window.location ="/ChairmanChangeSuccessfully" as any
       //window.location.replace("/ChangePassword") 
      } else if (responseJson?.message) {
        this.setState({ error: responseJson?.message });
      } else if (responseJson?.errors) {
          let error = `${Object.values(responseJson.errors[0])[0]}` as string;
          this.setState({ error });
      } else {
        console.log("Something responseJson  ===========>",responseJson)
          this.setState({ error: responseJson?.error || 'Something went wrong!' });
      }
      this.parseApiCatchErrorResponse(this.state.error);
      this.setState({loading: false , error:null})
    } 
  }

  startForgotPassword(accountType: String) {
    this.setState({
      accountStatus: accountType === "sms" ? "EnterPhone" : "EnterEmail"
    });
  }

  goToOtpAfterEmailValidation(values: { accountType: string; email: string }) {
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestEmailOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      emailValue: values.email ? values.email : ""
    });

    const data = {
      attributes: {
        email: values.email
      }
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToOtpAfterPhoneValidation(values: { phone: string }) {
    // console.log("entered phone validation code");
    if (
      !this.state.countryCodeSelected ||
      this.state.countryCodeSelected.length === 0
    ) {
      this.showAlert(
        configJSON.goToOtpAfterPhoneValidationErrorTitle,
        configJSON.goToOtpAfterPhoneValidationErrorBody
      );
      return;
    }
    console.log(this.state.countryCodeSelected);
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestPhoneOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      phoneValue:
        this.state.countryCodeSelected && values.phone
          ? this.state.countryCodeSelected + values.phone
          : ""
    });

    const data = {
      type: "sms_account",
      attributes: {
        full_phone_number: this.state.phoneValue
      }
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToChangePasswordAfterOtp(values: { otpCode: string }) {
    //change status to change password
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestChangePasswordCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryConfirmOtpAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      otp_code: values.otpCode ? values.otpCode : ""
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToConfirmationAfterPasswordChange(values: {
    password: any;
    confirmPassword: any;
  }) {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestGoToConfirmationCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryChangePasswordAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      new_password: values.password
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToHome() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  EmailSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("This field is required.")
    });
    return validations
  }

  maskCodeEmail =(email : any )=>{
    let str : any = email
    str = str.split('');
    let finalArr :any=[];
    let len = str.indexOf('@');
    str.forEach((item : any,pos : any)=>{
    (pos>=3 && pos<=len-2) ? finalArr.push('*') : finalArr.push(str[pos]);
  })
    return finalArr.join('');
  }
  maskCodePhone =(email : any )=>{
    let str : any = email
    str = str.split('');
    let finalArr :any=[];
    let len = str.length;
    str.forEach((item : any,pos : any)=>{
    (pos>=0 && pos<=len-4) ? finalArr.push('*') : finalArr.push(str[pos]);
  })
    return finalArr.join('');
  }

  checkUser = (values: any): boolean => {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };

    let attrs :any;

    if(values.email.includes("@")){
      localStorage.removeItem("phoneNumberMask")
      const emailMask  :any = this.maskCodeEmail(values.email)
      localStorage.setItem("emailMask", emailMask)
  
    attrs = {
        email: values.email,
      };
    }
   else{
    localStorage.removeItem("emailMask")
    const phoneNumberMask  :any = this.maskCodePhone(values.email)
    localStorage.setItem("phoneNumberMask", phoneNumberMask)
     attrs = {
      full_phone_number: values.email,
    };
   }

    const data = {
      attributes: attrs
    };

    const httpBody = {
      data: data
    };
    this.setState({loading: true})
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.sendEmailOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_forgot_password/otps"
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
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  verifyOtp = (attributes: any): boolean => {
         console.log("this.state.token=========>",localStorage.getItem("emailOtp"),this.state.otp)  
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
      token:localStorage.getItem("otpToken")
    };
    // attributes.pin =this.state.otp
    const attrs = {
      data: {
        otp_code: this.state?.otp || "111111",
      }
    };

    const httpBody = attrs;
    this.setState({loading: true})
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.verifyOtpApiCallId = requestMessage.messageId;
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_forgot_password/otp_confirmations"
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
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  PhoneOtpSchema() {
    const validations  = Yup.object().shape({
      input1: Yup.number()
        .required("This field is required."),
        input2: Yup.number()
        .required("This field is required."),
    });
    return validations
  }
  changePasswordValidations() {  
    const validations = Yup.object().shape({
      newPassword: Yup
        .string()
        .min(8, `Minimum Password length is 8.`)
        .required(`New Password is required.`)
         .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
          `Password must contain atleast a capital letter, a lowercase letter, a number and a special character.`
        ),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("newPassword"), null], `Password must match` )
        .required(`Confirm Password is required.` ),
    });

    return validations;
  }
  changePassword = (values: any) => {
    try {
      const token : any =localStorage.getItem("otpToken")
      const header = {
        "Content-Type": configJSON.forgotPasswordAPiContentType,
      };
     
      const httpBody = {
        data: {
          token:token,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        },
      };
    
      this.setState({loading: true})
   
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.requestChangePasswordCallId = requestMessage.messageId;
     
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.updatePasswordAPIEndPoint}`
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
        configJSON.httpPostMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = (otp:any) => this.setState({ otp });

}
