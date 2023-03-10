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
  error: any;
  userType: string | null;
  allContries: [];
  selectCountry: string;
  allCity: [];
  selectCity: string;
  allBuilding: [];
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
  anchorEl: any;
  showDialog:boolean;
  showDialog1:boolean;
  showDialog2: boolean;
  profiledata:any;
  values:any,
  showDialogDelete:boolean,
  showError:boolean

  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  createManagerAccountApiCallId: any;
  createAccountOwnerApiCallId: any;
  createRequestManaulApiCallId: any;
  createRequestApiCallId: any;
  changeUserTypeApiCallId: any;
  updatePhoneApicallId:any;
  getCountryApiCallId: any;
  getComplexApiCallId: any;
  getCityApiCallId: any;
  verifyOtpApiCallId: any;
  getBuildingApiCallId: any;
  getUnitApiCallId: any;
  createVehicleApiCallId:any;
  deleteVehicleAPICallId:any;
  getProfileDataAPiCallId:any;
  updateChairmenProfileAPiId:any;
  chatSettingApiCallId:any;
  validationApiCallId: string = "";

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
      allBuilding: [],
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
  showError:false


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
        } else if (apiRequestCallId === this.createAccountApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            localStorage.setItem('res_token', responseJson.meta.token)
            localStorage.setItem('res_user', JSON.stringify(responseJson.data.attributes))
            localStorage.setItem('res_user_id', responseJson.data.id)
            localStorage.setItem('user_email', responseJson.data.attributes.email)
            //@ts-ignore
            //@ts-nocheck
            this.updateType()
            this.setState({ loading: false, error: null })

            //@ts-ignore
            //@ts-nocheck
            this.props.history.push('/otp')


          } else if (responseJson?.errors) {
            let error = responseJson.errors[0];
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.verifyOtpApiCallId) {
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
            let error =responseJson.errors[0].errors;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson.errors[0].errors || "Something went wrong!" });
            // this.parseApiCatchErrorResponse(this.state.error);
            this.setState({showError:true})

          }
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.updatePhoneApicallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.setState({ showDialogDelete: true, showDialog: false, loading: false })
          } 
          else if (responseJson?.errors) {

            let error = responseJson.errors;
            console.log('err',responseJson.errors)
            this.setState({ error },()=>console.log(this.state.error));
            // ApiCatchErrorResponse(error)
            this.setState({error:responseJson.errors,showError:true})

            // this.parseApiCatchErrorResponse(this.state.error);
            // this.parseApiCatchErrorResponse(errorReponse);
          } else {
            this.setState({ error: responseJson?.errors || "Something went wrong!" });
            // this.parseApiCatchErrorResponse(this.state.error);
            // this.parseApiCatchErrorResponse(errorReponse);
            this.setState({error:responseJson.errors,showError:true})

          }
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.chatSettingApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.handleClose('')
            this.getProfile()
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0];
            this.setState({ error });
            this.parseApiCatchErrorResponse(this.state.error);
            this.parseApiCatchErrorResponse(errorReponse);
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
            this.parseApiCatchErrorResponse(this.state.error);
            this.parseApiCatchErrorResponse(errorReponse);
          }
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.createVehicleApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
this.setState({loading:false})
            //@ts-ignore
            //@ts-nocheck

            this.props.history.push({
              pathname: '/profile'
            })


          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        }else if (apiRequestCallId === this.updateChairmenProfileAPiId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.getProfile()
this.setState({loading:false,showDialog:false})
          


          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.createRequestApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            // localStorage.setItem('res_token', responseJson.meta.token)
            // localStorage.setItem('res_user', responseJson.data.attributes)
            // localStorage.setItem('res_user_id', responseJson.data.id)
            // this.props.history.push('/selecttype')
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
        } if (apiRequestCallId === this.deleteVehicleAPICallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            //@ts-ignore
            //@ts-nocheck
            localStorage.removeItem('selectFamily')
            this.setState({ showDialogDelete: false, showDialog: false,loading:false })

            this.getProfile()

          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.createRequestManaulApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            // localStorage.setItem('res_token', responseJson.meta.token)
            // localStorage.setItem('res_user', responseJson.data.attributes)
            // localStorage.setItem('res_user_id', responseJson.data.id)
            // this.props.history.push('/selecttype')
            //@ts-ignore
            //@ts-nocheck

            this.props.history.push('/RegistrationRequestsignup')


          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.changeUserTypeApiCallId) {
          if (!responseJson.errors) {
            //@ts-ignore
            //@ts-nocheck
            this.setState({ loading: false })
            // localStorage.setItem('res_token', responseJson.meta.token)
            // localStorage.setItem('res_user', responseJson.data.attributes)
            // localStorage.setItem('res_user_id', responseJson.data.id)
            //@ts-ignore
            //@ts-nocheck
            this.props.history.push('/addressfill')


          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.getProfileDataAPiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson.data)
            this.setState({ profiledata: responseJson.data,selectCode3:`+${responseJson.data.attributes?.full_phone_number?.country_code}` }, () => console.log(this.state.profiledata))
            this.setState({ loading: false })

          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.getComplexApiCallId) {
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
        } else if (apiRequestCallId === this.getCityApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.setState({ allCity: responseJson.data.cities })
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.getBuildingApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.setState({ allBuilding: responseJson.data.buildings })
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.getUnitApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            let temp = [responseJson.data.unit_apartments]
            //@ts-ignore
            //@ts-nocheck

            this.setState({ allUnit: responseJson.data.unit_apartments }, () => console.log(this.state.allUnit[0]))
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
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
    this.createAccountApiCallId = requestMessage.messageId;
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
    this.createAccountApiCallId = requestMessage.messageId;
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

    if (e.target.value) {
      // @ts-ignore
      // @ts-nocheck
      this.setState({ ...this.state, [e.target.name]: e.target.value }, () => this.getData(e))
    }

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
      this.getUnit()

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
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getBuildingApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/building_list?society_management_id=${this.state.selectComplex}`
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

  getUnit() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getUnitApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      //@ts-ignore
      //@ts-nocheck
      `bx_block_address/apartment_list?id=${this.state.selectBuilding.id}`
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

  verifyOtp = (): boolean => {

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
    this.verifyOtpApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile/profiles/verify_otp?otp=111111`
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
  updateProfile = async(values: any) => {
    this.setState({ loading: true })
    try {
      const header = {

        token: localStorage.getItem("userToken")
      };
      const formData = new FormData();
      console.log("gender====",values.gender)
      formData.append("[data][attributes][full_name]", values.full_name)
      formData.append("[data][attributes][full_phone_number]", `${this.state.selectCode}${values.phone}`)
      formData.append("[data][attributes][gender]", values.gender=='Male' ? '0' : '1')
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
      console.log(values)
      if(values.bannerUrl.includes('ti1finalleap')){
        
        
      }else{

        let blob = await fetch(values.bannerUrl).then(r => r.blob());
        formData.append(
          "[data][attributes][image]",
          blob
        );
      }
      
      // formData.append("vehicle[color]", values.carColor)
      // let blob = await fetch(values.bannerUrl).then(r => r.blob());
      // formData.append(
      //   "[data][attributes][image]",
      //   blob
      // );
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createVehicleApiCallId = requestMessage.messageId;

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
  updateChairmenProfile = async(values: any) => {
    this.setState({ loading: true })
    console.log(values)
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
      if(values.bannerUrl){

      }else if(values.bannerUrl.includes('blob')){
        
        
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
      email: Yup.string().required(`This field is required`).trim(),
      DOB: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,`Invalid Date`).nullable(),
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
  handleClose = (item: any) => {
    if (item.id) {
      localStorage.setItem('selectFamily', JSON.stringify(item))
      // @ts-ignore
      // @ts-nocheck
      this.props.history.push("/editfamily")

    } else {
      this.setState({ anchorEl: item.currentTarget, showDialog: false })
    }
    // this.setState({ anchorEl:null,showDialog:false })
  };
  handleClose2 = (item: any) => {

      this.setState({ anchorEl: item.currentTarget, showDialog2: false })

    // this.setState({ anchorEl:null,showDialog:false })
  };
  deleteRequest() {
    this.setState({loading: true })
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
  checkPhone=(value:any)=>{


    let pettrn=/^5\d+$/
    
    if(value.includes('+'))
    {
      
      this.setState({error:'Please enter valid mobile number',showError:true})
      return false
    }else if(this.state.selectCode == '+966' ||this.state.selectCode == '+971' ){
    
          if(!(pettrn.test(value)))
          {
          
            this.setState({error:'Please enter valid mobile number',showError:true})
            return false
          }
          else{
          if(value.length==9){
    
    
            return true
          }else{
            this.setState({error:'Please enter valid mobile number',showError:true})
            return false
          }
    
          }
        }else {
          if(value.length==10){
    
    
            return true
          }else{
            this.setState({error:'Please enter valid mobile number',showError:true})
            return false
          }
    
        }
      }
  updatePhone=(values:any)=>{
if(this.checkPhone(values.phone)){
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
    return true;}

  }
  handleAddChip=(fn:any,data:any,values:any)=>{
    console.log('hi')
values.push(data)
fn('hobbies',values)
    console.log(values)

  }
  handleDeleteChip = (fn: any, data: any, values: any,index:any)=>{
    console.log('bye')
    values.splice(index, 1)
    fn('hobbies', values)
console.log(data,index)
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
  handleChangeCCode = (e: any) => {
    console.log(e)
    if (e) {
      // @ts-ignore
      // @ts-nocheck
      this.setState({selectCode: `+${e}` })
    }
  }


  // Customizable Area End
}
