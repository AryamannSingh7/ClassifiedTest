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
  error: string | null;
  loading: boolean;
  userTypeData:any;
  anchorEl :any ;
  anchorEl_1 :any ;
  getFacilityReservationDetails : any;
  sortBy : any ;
  status : any;
  myApartmentList:any;
  upload:any;
  notImageOrVideoError:any,
  sizeError:any,
  file : any,
  commonAreaData:any,
  incidentRelatedData:any,
  facilityReservationListing:any,
  showDialog:any;
  deleteShowDialog:any;
  facilityCount:any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class FacilityReservationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  apiCancelUpcomingFacilityReservationCallId:any;
  CreateFacilityReservationapiCallId: any;
  updateFacilityReservationapiCallId:any;
  validationApiCallId: any;
  getFacilityReservationListingApiCallId: any;
  getFacilityReservationCountApiCallId:any;
  getFacilityReservationDetailsByIdApiCallId : any ;
  getCommonAreaApiCallId : any ;
  getIncidentRelatedApiCallId:any;
  getMyApartmentListApiCallId:any;
  createChatRoomAPIId:any;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  deleteFacilityReservationsApiCallId:any;

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
      facilityReservationListing: null,
      anchorEl:null,
      anchorEl_1:null,
      getFacilityReservationDetails:null,
      sortBy : "" ,
      status : "",
      myApartmentList:[],
      upload:false,
      notImageOrVideoError:false,
      sizeError:false,
      file :{},
      showDialog:false,
      deleteShowDialog:false,
      facilityCount:{},
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
      prevState.sortBy !== this.state.sortBy
    ) {
     this.getFacilityReservationListing(this.state.sortBy)
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
      else if (apiRequestCallId === this.CreateFacilityReservationapiCallId) {
          if (responseJson && responseJson.data) {
            console.log("CreateFacilityReservationapiCallId===========>",responseJson)
            const id = responseJson?.data?.id
            //@ts-ignore
            this.props.history.push("/FacilityReservationReportedSuccessfully")
            this.props.history.push({pathname: "/FacilityReservationReportedSuccessfully",   //@ts-ignore
             id})
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
        else if (apiRequestCallId === this.updateFacilityReservationapiCallId) {
          if (responseJson && responseJson.data) {
            console.log("updateFacilityReservationapiCallId===========>",responseJson)
               //@ts-ignore
              this.props.history.push("/FacilityReservationListing")
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
     
        else if (apiRequestCallId === this.apiCancelUpcomingFacilityReservationCallId) {
          if (responseJson && responseJson.data) {
            this.setState({loading: false})
            console.log("apiCancelUpcomingFacilityReservationCallId===========>",responseJson)
               //@ts-ignore
              this.props.history.push("/FacilityReservation")
            
          } else if (responseJson?.errors) {
            let error = Object.values(responseJson.errors[0])[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }

          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        
        else if (apiRequestCallId === this.getFacilityReservationCountApiCallId) {
          if (responseJson || responseJson?.data ) {
          console.log("getFacilityReservationCountApiCallId ========================>",responseJson)
          this.setState({facilityCount : responseJson})
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
        else if (apiRequestCallId === this.getFacilityReservationListingApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getFacilityReservationListingApiCallId ========================>",responseJson)
          this.setState({facilityReservationListing :responseJson?.data})
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
        else if (apiRequestCallId === this.getFacilityReservationDetailsByIdApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getFacilityReservationDetailsByIdApiCallId ========================>",responseJson)
          this.setState({getFacilityReservationDetails :responseJson?.data})
          console.log("responseJson getFacilityReservationDetails========================>",this.state?.getFacilityReservationDetails)
          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
                     //@ts-ignore
                    //@ts-nocheck
              this.props.history.push("/FacilityReservation")
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
        }
        else if (apiRequestCallId === this.getCommonAreaApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getCommonAreaApiCallId  ========================>",responseJson)
          this.setState({commonAreaData :responseJson?.data})

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
        else if (apiRequestCallId === this.deleteFacilityReservationsApiCallId) {
          if (responseJson || responseJson?.data ) {
            this.props.history.push('/FacilityReservationListing')
          console.log("deleteFacilityReservationsApiCallId========================>",responseJson)
          //this.setState({incidentRelatedData :responseJson?.data.incident_relateds})

          this.setState({loading: false})
          } else if (responseJson?.errors) {
            let error = responseJson.errors[0] as string;
            this.setState({ error });
          } else {
            this.setState({ error: responseJson?.error || "Something went wrong!" });
          }
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({loading: false , error:null})
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
          this.parseApiCatchErrorResponse(this.state.error);
          this.setState({ loading: false, error: null })
        }
        else if (apiRequestCallId === this.getMyApartmentListApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getMyApartmentListApiCallId========================>",responseJson)
          this.setState({myApartmentList :responseJson?.data?.buildings})
          const id =responseJson?.data?.buildings[0]?.id;
          this.getCommonArea(id) ;
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

// onSubmit =(values:any)=>{
//   localStorage.setItem("incidentPreview", JSON.stringify(values))
//   console.log("onsbumit=========>", values);
//     this.setState({ loading: true })
//     //@ts-ignore
//     this.props.history.push("/IncidentPreview")
// }

getFacilityReservationDetails= (idOrName :any) => {
  if(idOrName ==="Upcoming"){
  //@ts-ignore
  localStorage.setItem("idOrName", idOrName);
  this.props.history.push({pathname: "/FacilityReservationListing"})
  }
  else if(idOrName ==="Pending"){
     //@ts-ignore
  localStorage.setItem("idOrName", idOrName);
  this.props.history.push({pathname: "/FacilityReservationListing"})   
}
  else if(idOrName ==="Previous"){
     //@ts-ignore
  localStorage.setItem("idOrName", idOrName);
  this.props.history.push({pathname: "/FacilityReservationListing"}) }
 
  else if(idOrName ==="Rejected"){
    //@ts-ignore
 localStorage.setItem("idOrName", idOrName);
 this.props.history.push({pathname: "/FacilityReservationListing"}) }
 
 else if(idOrName ==="Cancelled"){
  //@ts-ignore
localStorage.setItem("idOrName", idOrName);
this.props.history.push({pathname: "/FacilityReservationListing"}) }

  else{
      //@ts-ignore
  localStorage.setItem("facilityReservationId",idOrName);
  this.props.history.push({pathname: "/FacilityReservationDetails"});
  //this.getIncidentDetailsById(id)
  }
   
}

cancelUpcomingFacilityReservation =(id : any,val : any)=>{
  const header = {
    token :localStorage.getItem("userToken")
  };
  
  const formData = new FormData();
  if(val === "Cancel"){
    console.log("if ke andaer he val ==================>", val)

     //@ts-ignore
    formData.append('facility_reservation[status]','Cancelled');
  }
 const httpBody = formData;
 console.log("httpBody httpBody==================>",httpBody.get('facility_reservation'), val);
 this.setState({ showDialog: false ,loading: true })

  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.apiCancelUpcomingFacilityReservationCallId = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `bx_block_society_management/facility_reservations/${id}`
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
    "PATCH"
  );

  runEngine.sendMessage(requestMessage.id, requestMessage);

  return true;

}
 
CreateFacilityReservation = async(val :any) => {
  try
   {
     const header = {
      token :localStorage.getItem("userToken")
    };
    console.log("values create==================>",val );
    const formData = new FormData();
   formData.append('facility_reservation[building_management_id]',val?.buildingName);
   formData.append('facility_reservation[common_area_id]',val?.areaReserve);
   formData.append('facility_reservation[date]', val?.date);
   formData.append('facility_reservation[time_from]', val?.timeFrom);
   formData.append('facility_reservation[time_to]', val?.timeTo);
   //formData.append('facility_reservation[apartment_management_id]', val?.);

      const httpBody = formData;
    this.setState({loading: true})

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.CreateFacilityReservationapiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/facility_reservations`
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

  updateFacilityReservation = async(val :any) => {
    try
     {
       const header = {
        token :localStorage.getItem("userToken")
      };
      console.log("values create==================>",val );
      const formData = new FormData();
     formData.append('facility_reservation[building_management_id]',val?.buildingName);
     formData.append('facility_reservation[common_area_id]',val?.areaReserve);
     formData.append('facility_reservation[date]', val?.date);
     formData.append('facility_reservation[time_from]', val?.timeFrom);
     formData.append('facility_reservation[time_to]', val?.timeTo);
     //formData.append('facility_reservation[apartment_management_id]', val?.);
  
        const httpBody = formData;
      this.setState({loading: true})
  
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.updateFacilityReservationapiCallId = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_society_management/facility_reservations/${val?.id}`
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
        `PATCH`
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return true;
      }
      catch (error) {
        this.setState({loading: false})
        console.log(error);
      }
    };
  
  getFacilityReservationListing = (sortBy : any)  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getFacilityReservationListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });
      const  getSortByOrStatus = `bx_block_society_management/facility_reservations?sort_type=${sortBy}`
    // const  getSortByOrStatus = `bx_block_custom_form/incidents?sort_type=${sortBy}&filter_by=${status}`

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
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      const id = localStorage.getItem("society_id");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getMyApartmentListApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_address/building_list?society_management_id=${id}`
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

  getCommonArea = (id :any) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      console.log("id =====================>",id)
    // const society_id = localStorage.getItem("society_id")
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getCommonAreaApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_society_management/facility_reservations/common_area_list?building_management_id=${id}`
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

  getFacilityReservationDetailsById= (id : any) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getFacilityReservationDetailsByIdApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `/bx_block_society_management/facility_reservations/${id}`
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


  deleteFacility =(id:any)=>{
    const header = {
      token :localStorage.getItem("userToken")
    };
    //const id =this.state?.
    console.log("id deleteFacilityReservations==============>",id)
    this.setState({loading: true}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.deleteFacilityReservationsApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_society_management/facility_reservations/${id}`
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
  getFacilityReservationCount = ()  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getFacilityReservationCountApiCallId = requestMessage.messageId;
      this.setState({ loading: true });
      const  getSortByOrStatus = `/bx_block_society_management/facility_reservations/reservation_list_count`
    // const  getSortByOrStatus = `bx_block_custom_form/incidents?sort_type=${sortBy}&filter_by=${status}`

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


  CreateFacilityReservationSchema() {
    const validations = Yup.object().shape({
      areaReserve: Yup.string().trim(),
      buildingName:Yup.string().required(`This field is required`).trim(),
      date: Yup.date().required("Date is required"),
      timeFrom:Yup.string().required("Start time is required"),
      timeTo:Yup.string().required("End time is required")
    .test("is-greater", "End time should be greater than Start time", function(value) {
      //@ts-ignore
      const { timeFrom } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(timeFrom, "HH:mm"));
    })
       });

    return validations ;
  }

  // Customizable Area End
}
