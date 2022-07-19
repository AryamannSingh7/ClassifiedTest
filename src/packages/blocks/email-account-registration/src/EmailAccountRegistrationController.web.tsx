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
  error: string | null;
  userType: string | null;
  allContries: [];
  selectCountry: string;
  allCity: [];
  selectCity: string;
  allBuilding: [];
  selectBuilding: string;
  allUnit: [];
  selectUnit: string;
  selectCode: string;
  selectEmail: string;
  unitRegisterType: string;
  allComplex: [];
  selectComplex: any;
  loading: boolean;
  otp: any;



  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
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
  getCountryApiCallId: any;
  getComplexApiCallId: any;
  getCityApiCallId: any;
  verifyOtpApiCallId: any;
  getBuildingApiCallId: any;
  getUnitApiCallId: any;





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
      selectCode: '',
      selectEmail: '',
      unitRegisterType: '',
      allComplex: [],
      selectComplex: null,
      //@ts-ignore
      //@ts-nocheck
      loading: false,
      otp: '',
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
            this.setState({ loading: false })
            //@ts-ignore
            //@ts-nocheck
            this.props.history.push('/otp')


          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
            this.parseApiCatchErrorResponse(this.state.error);
          }
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.verifyOtpApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            //@ts-ignore
            //@ts-nocheck
            this.setState({ loading: false })
            //@ts-ignore
            //@ts-nocheck
            if (this.props.history.location.state?.data) {
              //@ts-ignore
              //@ts-nocheck
              this.props.history.push('/registerunit')
            } else {
              //@ts-ignore
              //@ts-nocheck
              this.props.history.push('/selecttype')
            }
            // //@ts-ignore
            // //@ts-nocheck
            // this.props.history.push('/selecttype')


          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
            this.parseApiCatchErrorResponse(this.state.error);
          }
          this.setState({ loading: false })

        } else if (apiRequestCallId === this.createManagerAccountApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            localStorage.setItem('res_token', responseJson.meta.token)
            localStorage.setItem('res_user', responseJson.data.attributes)
            localStorage.setItem('res_user_id', responseJson.data.id)
            //@ts-ignore
            //@ts-nocheck

            this.props.history.push('/otp')


          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.createAccountOwnerApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson.data.attributes.email)
            localStorage.setItem('res_token', responseJson.meta.token)
            localStorage.setItem('res_user', JSON.stringify(responseJson.data.attributes))
            localStorage.setItem('res_user_id', responseJson.data.id)
            localStorage.setItem('user_email', responseJson.data.attributes.email)
            //@ts-ignore
            //@ts-nocheck

            this.props.history.push({
              pathname: '/otp',
              state: {
                //@ts-ignore
                //@ts-nocheck
                data: this.props.history.location.state?.data,
              },
            })


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
        } else if (apiRequestCallId === this.getCountryApiCallId) {
          if (!responseJson.errors) {
            console.log(responseJson)
            this.setState({ allContries: responseJson.data.countries })
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

            this.setState({ allUnit: [...temp] }, () => console.log(this.state.allUnit))
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
      full_phone_number: "+" + 91 + attributes.phone,
      password_confirmation: attributes.confirm_password
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
      full_phone_number: "+" + 91 + attributes.phone,
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
    this.setState({ selectEmail: attributes.email })


    const attrs = {

      email: attributes.email,
      company_name: attributes.company_name,
      manager_full_name: attributes.managerName,
      owner_full_name: attributes.ownerName,
      owner_phone_number: attributes.owner_phone,
      owner_email: attributes.owner_email,
      password: attributes.password,
      full_phone_number: "+" + 91 + attributes.phone,
      password_confirmation: attributes.confirm_password
    };

    const data = {
      type: "email_account",
      user_type: this.state.userType,
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
    if (this.state.userType) {

      if (this.state.userType === 'Owner') {
        //@ts-ignore
        //@ts-nocheck

        this.props.history.push({
          pathname: '/registerowner',
          state: {
            data: this.state.userType,
          },
        })

      } else {
        //@ts-ignore
        //@ts-nocheck

        this.props.history.push({
          pathname: '/registermanager',
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
      `account_block/user_type?user_type=${this.state.userType}&id=${localStorage.getItem('res_user_id')}`
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
  handleChange = (e: any) => {
    console.log(e)
    console.log(e.target.name)
    console.log(e.target.value)


    // @ts-ignore
    // @ts-nocheck
    this.setState({ ...this.state, [e.target.name]: e.target.value }, () => this.getData(e))
  }
  //@ts-ignore
  //@ts-nocheck

  getData(e) {
    console.log(this.state)

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

  getCountry() {

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
      "token": localStorage.getItem('res_token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.getCountryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_address/country_list`
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
      "Content-Type": configJSON.contentTypeApiAddDetail
    };
    const httpBody = {
      otp: this.state?.otp || "111111",
      email: localStorage.getItem('user_email')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log(this.changeUserTypeApiCallId)
    console.log(requestMessage.messageId)
    //@ts-ignore
    //@ts-nocheck
    this.setState({ loading: true })
    this.verifyOtpApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/accounts/verify_user`
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
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;



  }

  addressSchema() {
    const validations = Yup.object().shape({

      selectCountry: Yup.string().required(`This field is required`).trim(),
      selectCity: Yup.string().required(`This field is required`).trim(),
      selectBuilding: Yup.string().required(`This field is required`).trim(),
      selectComplex: Yup.string().required(`This field is required`).trim(),
      selectUnit: Yup.string().required(`This field is required`).trim(),

    });
    return validations
  }
  addressSchemaManual() {
    const validations = Yup.object().shape({


      selectBuilding: Yup.string().required(`This field is required`).trim(),
      selectComplex: Yup.string().required(`This field is required`).trim(),
      selectUnit: Yup.string().required(`This field is required`).trim(),

    });
    return validations
  }
  signupSchema() {
    const validations = Yup.object().shape({

      full_name: Yup.string().required(`This field is required`).trim(),
      email: Yup.string().required(`This field is required`).trim(),
      phone: Yup.string().required(`This field is required`).trim(),
      password: Yup.string().required(`This field is required`).trim(),
      confirm_password: Yup.string().required(`This field is required`).trim(),

    });
    return validations
  }
  EmailSchema() {
    const validations = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("This field is required.")
    });
    return validations
  }
  // Customizable Area End
}
