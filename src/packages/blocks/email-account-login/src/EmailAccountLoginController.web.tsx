import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End
import * as Yup from 'yup';
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  error: string | null;
  loading: boolean;
  registrationRequest:any;
  requestdeleteId:any;
  showDialog:any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  apiRegistrationRequestCallId: string = "";
  deleteRequestCallId:string="";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);
  
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]
    
    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      error: null,
      loading: false,
      registrationRequest:null,
      requestdeleteId:null,
      showDialog:false,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin()
  };

  btnEmailLogInProps = {
    color: "#6200EE",
    onPress: () => this.doEmailLogIn()
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword()
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    }
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    }
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start

    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      const countryCode = message.getData(
        getName(MessageEnum.LoginCountryCode)
      );

      if (!countryCode && userName && password) {
        this.setState({
          email: userName,
          password: password,
          checkedRememberMe: true
        });

        //@ts-ignore
        this.txtInputEmailProps.value = userName;

        //@ts-ignore
        this.txtInputPasswordProps.value = password;

        this.CustomCheckBoxProps.isChecked = true;
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          var arrayholder = responseJson.data;

          if (arrayholder && arrayholder.length !== 0) {
            let regexData = arrayholder[0];

            if (regexData && regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        }

        if (apiRequestCallId === this.apiEmailLoginCallId) {
          if (responseJson && responseJson.meta && responseJson.meta.token) {
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
            this.saveLoggedInUserData(responseJson);
            this.sendLoginSuccessMessage();
            // this.openInfoPage();
            localStorage.setItem("userToken", responseJson?.meta?.token)
            localStorage.setItem("userId", responseJson?.meta?.id)
           window.location.replace("/RegistrationRequest");
           this.setState({loading: false})
          
          } else if (responseJson?.errors) {
            //Check Error Response
            // this.parseApiErrorResponse(responseJson);
            // this.sendLoginFailMessage();
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
            this.setState({loading: false})
          } else {
            this.setState({loading: false})
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }

          this.parseApiCatchErrorResponse(this.state.error);
        }
       else if (apiRequestCallId === this.deleteRequestCallId) {
          if (responseJson && responseJson?.data ) {
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
           window.location.replace("/");
          
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
            this.setState({loading: false})
          } else {
            this.setState({loading: false})
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
        }

        else if (apiRequestCallId === this.apiRegistrationRequestCallId) {
          if (responseJson && responseJson?.data ) {
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
            // this.saveLoggedInUserData(responseJson);
            // this.sendLoginSuccessMessage();
            // this.openInfoPage();
            // localStorage.setItem("userToken", responseJson?.meta?.token)
            // localStorage.setItem("userId", responseJson?.meta?.id)
         const  registrationRequest = responseJson?.data[0]
         console.log("registrationRequest?.type========>",registrationRequest?.type)
           if(registrationRequest?.type === "request"){
            this.setState({registrationRequest, requestdeleteId :registrationRequest.id,loading: false})
          }
           else {
            //window.location.replace("/DashboardGeneral");
           }
           //window.location.replace("/DashboardGeneral");
          
          } else if (responseJson?.errors) {
            //Check Error Response
            // this.parseApiErrorResponse(responseJson);
            // this.sendLoginFailMessage();
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
            this.setState({loading: false})
          } else {
            this.setState({loading: false})
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }

          this.parseApiCatchErrorResponse(this.state.error);
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }
  
  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password
    };

    const data = {
      type: "email_account",
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    
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

  doLogIn = (values: any): boolean => {
    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const attrs = {
      email: values.email,
      password: values.password
    };

    const data = {
      type: "email_account",
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    this.setState({loading: true}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.signinAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  LoginSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
        .strict(true)
        .lowercase(`Please enter all values in lowercase`)
        .trim()
        .required(`This field is required.`),
      password: Yup.string().required(`This field is required`)
    });
    return validations
  }

  getRegistrationRequest = () => {
    try {
      const header = {
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.apiRegistrationRequestCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/requests`
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

  deleteRequestById = () => {
    try {
      const header = {
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.deleteRequestCallId = requestMessage.messageId;
      this.setState({ loading: true ,showDialog: false});

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_request_management/requests/${this.state?.requestdeleteId}`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpDelete
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

}
