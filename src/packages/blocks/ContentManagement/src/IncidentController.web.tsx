import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from 'yup';
import { withRouter, RouteComponentProps } from "react-router-dom";
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
  error: any;
  loading: boolean;
  userTypeData:any;
  anchorEl :any ;
  anchorEl_1 :any ;
  getIncidentDetails : any;
  sortBy : any ;
  status : any;
  myApartmentList:any;
  upload:any;
  notImageOrVideoError:any,
  sizeError:any,
  file : any,
  commonAreaData:any,
  incidentRelatedData:any,
  incidentListing:any,
  showDialog:any,
  showError:boolean
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class IncidentController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  apiupdateIncidentCallId:any;
  apicreateIncidentCallId: any;
  validationApiCallId: any;
  getIncidentListingApiCallId: any;
  getIncidentDetailsByIdApiCallId : any ;
  getCommonAreaApiCallId : any ;
  getIncidentRelatedApiCallId:any;
  getMyApartmentListApiCallId:any;
  createChatRoomAPIId:any;
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
      incidentListing: null,
      anchorEl:null,
      anchorEl_1:null,
      getIncidentDetails:null,
      sortBy : "" ,
      status : "",
      myApartmentList:[],
      upload:false,
      notImageOrVideoError:false,
      sizeError:false,
      file :{},
      showDialog:false,
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

  async componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevState.sortBy !== this.state.sortBy ||
      prevState.status !== this.state.status

    ) {
     this.getIncidentListing(this.state.sortBy ,this.state.status)
    }
  }

  showError = () => {
    if(this.state.error){
      this.setState({
        showError:true
      })
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
      else if (apiRequestCallId === this.apicreateIncidentCallId) {
          if (responseJson && responseJson.data) {
            console.log("apicreateIncidentCallId===========>",responseJson)
            localStorage.setItem("createIncidentId",responseJson.data.id)
            //@ts-ignore
            this.props.history.push("/IncidentReportedSuccessfully")
            this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0]
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          //this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false})
        }
        else if (apiRequestCallId === this.apiupdateIncidentCallId) {
          if (responseJson && responseJson.data) {
            console.log("apiupdateIncidentCallId===========>",responseJson)
               //@ts-ignore
              this.props.history.push("/IncidentListing")
            this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
         // this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false})
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
          this.showError()
         // this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false})
        }
        else if (apiRequestCallId === this.getIncidentDetailsByIdApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getIncidentDetailsByIdApiCallId ========================>",responseJson)
          this.setState({getIncidentDetails :responseJson?.data})
          console.log("responseJson getIncidentDetails========================>",this.state?.getIncidentDetails)
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
                     //@ts-ignore
                    //@ts-nocheck
              this.props.history.push("/IncidentListing")
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          //this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false})
        }
        else if (apiRequestCallId === this.getCommonAreaApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getCommonAreaApiCallId  ========================>",responseJson)
          this.setState({commonAreaData :responseJson?.data.common_areas})

          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          this.setState({loading: false})
        }
        else if (apiRequestCallId === this.getIncidentRelatedApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getIncidentRelatedApiCallId========================>",responseJson)
          this.setState({incidentRelatedData :responseJson?.data.incident_relateds})

          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          this.setState({loading: false})
        } else if (apiRequestCallId === this.createChatRoomAPIId) {
          if (responseJson && responseJson?.data) {
            console.log("createChatRoom ========================>", responseJson)
            localStorage.setItem('selectedChat', JSON.stringify(responseJson.data))
            this.props.history.push('/incidentchat')
            this.setState({ loading: false })
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          this.setState({ loading: false})
        }
        else if (apiRequestCallId === this.getMyApartmentListApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getMyApartmentListApiCallId========================>",responseJson)
          this.setState({myApartmentList :responseJson?.data})

          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.showError()
          this.setState({loading: false})
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

onSubmit =(values:any)=>{
  localStorage.setItem("incidentPreview", JSON.stringify(values))
  console.log("onsbumit=========>", values);
    this.setState({ loading: true })
    //@ts-ignore
    this.props.history.push("/IncidentPreview")
}
getIncidentDetails= (id :any) => {
   //@ts-ignore
  this.props.history.push({pathname: "/IncidentDetails",id});

  //this.getIncidentDetailsById(id)
}

confirmOrRejectIncident =(id : any,val : any)=>{
  const header = {
    token :localStorage.getItem("userToken")
  };
  const formData = new FormData();
  if(val === "confirm"){
     //@ts-ignore
    formData.append('incident[mark_resolved_by_reporter]', true);
    formData.append('incident[incident_status]', 'Resolved');
  }else{
     //@ts-ignore
    formData.append('incident[mark_resolved_by_reporter]', false);
    formData.append('incident[incident_status]', 'Unresolved');
  }


 console.log("formData.getAll('apartment_management_id')==================>",formData.get('incident[incident_status]'))
 const httpBody = formData;
 console.log("httpBody httpBody==================>",httpBody);

  this.setState({loading: true})
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.apiupdateIncidentCallId = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `${configJSON.updateIncident}${id}`
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

}



  createIncident = async(incidentFromData: any ,incidentRelated : any) => {
  try
   {
     const header = {
      token :localStorage.getItem("userToken")
    };
   // console.log("values create==================>",incidentFromData.media[0].file );
    const formData = new FormData();
   formData.append('incident[common_area_id]', incidentFromData?.commonArea?.id);
   formData.append('incident[incident_related_id]', incidentRelated[0]);
   formData.append('incident[incident_title]', incidentFromData.incidentTitle);
   formData.append('incident[description]', incidentFromData.description);
  //  formData.append('incident[attachments]', incidentFromData.media[0].file);
   formData.append('incident[apartment_management_id]', incidentFromData.myApartment.id);

   for (let j = 0; j < incidentFromData.media.length; j += 1) {
    let blob = await fetch(incidentFromData.media[j].url).then(r => r.blob());
      //@ts-ignore
     blob.name = incidentFromData.media[j].file.name
    console.log("bolb ==================>",blob);

    formData.append(
      "incident[attachments][]",
      blob
    );
    console.log("incident[attachments][] ==================>",incidentFromData.media[j].file);
  }

   console.log("formData.getAll('apartment_management_id')==================>",formData.get('incident[attachments][]'))
   const httpBody = formData;
    this.setState({loading: true})
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apicreateIncidentCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createIncident
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


  getIncidentListing= (sortBy : any ,status : any)  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const society_id = localStorage.getItem("society_id")
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getIncidentListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

     const  getSortByOrStatus = `bx_block_custom_form/incidents?society_management_id=${society_id}&sort_type=${sortBy}&filter_by=${status}`

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

  getMyApartmentList = () => {
    const society_id = localStorage.getItem("society_id")
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getMyApartmentListApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `account_block/my_apartments?society_management_id=${society_id}`
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

  getCommonArea = () => {
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
      this.getCommonAreaApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_custom_form/incidents/common_area_list?society_management_id=${society_id}`
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

  getIncidentRelated = () => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getIncidentRelatedApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.incidentRelated
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

  getIncidentDetailsById= (id : any) => {
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


  handleClick = (event:any) => {
    this.setState({anchorEl:event.currentTarget })
  };
  handleClose = (e:any, v:any) => {
    let sortBy : any ;
    console.log("v=========>",v)
    if(v === undefined || v === null){
      sortBy =this.state.sortBy
    }
    else {
      sortBy =v;
    }
    this.setState({anchorEl:null,sortBy : sortBy})
  };

  handleClick_1 = (event :any) => {
    this.setState({anchorEl_1:event.currentTarget})
  };

  handleClose_1 = (e:any, v:any) => {
   let status : any ;
    if(v === undefined || v === null){
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

createIncidentSchema() {
    const validations = Yup.object().shape({
      commonArea: Yup.string().required(`This field is required`).trim(),
      incidentRelated: Yup.string().required(`This field is required`).trim(),
      incidentTitle: Yup.string().required(`This field is required`).max(50, "Too Long!"),
      description: Yup.string().required(`This field is required`).max(200, "Too Long!"),
      myApartment:Yup.string().required(`This field is required`).trim(),
      //media: Yup.array()
      // .min(1, ("Atleast one image required"))
      // .required(`This field is required.`)
    });

    return validations ;
  }
  createChatRoom = async (id: any) => {
    console.log(id)

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
      formData.append("chat[chatable_type]", 'BxBlockCustomForm::Incident');
      // @ts-ignore
      formData.append("chat[chatable_id]", id);



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
  redirectToDashboard = () => {
    let userType = localStorage.getItem('userType')
    if (userType == 'Owner') {
      //@ts-ignore
      //@ts-nocheck
      this.props.history.push('/OwnerDashboard')
    } else {
      //@ts-ignore
      //@ts-nocheck
      this.props.history.push('/residentDashboard')
    }

  }

  // Customizable Area End
}
