import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import {RouteComponentProps} from 'react-router';
import * as Yup from 'yup';
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { valueContainerCSS } from "react-select/src/components/containers";
// Customizable Area End

export const configJSON = require("./config");

export interface Props extends RouteComponentProps{
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
  commonAreaData:any;
  incidentRelatedData:any;
  facilityListing:any;
  unitName : any;
  serachBuildingName:any;
  SearchIncident:any;
  showDialog:any;
  unitNameData:any;
  providerNameListing:any;
  providerListing:any;
  buildingNameData:any;
  areaReserve:any;
  addNote:any;
  getFacilityDetails:any;
  ignoreShowDialog:any;
  UnpublishedShowDialog:any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}
export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
}

export default class FacilityManagerContorller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;


  validationApiCallId: any;
  getFacilityReservationListingApiCallId: any;
  getFacilityDetailsByIdApiCallId : any ;
  getBuildingNameApiCallId : any ;
  getUnitRelatedApiCallId:any ;
  searchIncidentListingApiCallId:any;
  rejectedOrPublishedAPICallId:any;

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
      anchorEl:null,
      anchorEl_1:null,
      getIncidentDetails:null,
      buildingName : " ",
      unitName : " ",
      status :" ",
      serachBuildingName:" ",
      statusDetail:" ",
      imageShowDialog:false,
      file:{},
      statusShowDialog:false,
      SearchIncident:null,
      showDialog:false,
      unitNameData:null,
      buildingNameData:null,
      areaReserve: " ",
      facilityListing:null,
      addNote:"",
      getFacilityDetails:null,
      ignoreShowDialog:false,
      UnpublishedShowDialog:false,
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
        } 
        else if (apiRequestCallId === this.rejectedOrPublishedAPICallId) {
          if (responseJson && responseJson.data) {
            console.log("rejectedOrPublishedAPICallId===========>",responseJson)
            const id = localStorage.getItem("FacilityDetailsManagerId")
            this.getFacilityDetailsById(id);
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
        else if (apiRequestCallId === this.getFacilityReservationListingApiCallId) {
          if (responseJson && responseJson?.data ) {
          console.log("getFacilityReservationListingApiCallId ========================>",responseJson)
          this.setState({facilityListing :responseJson?.data})
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
        else if (apiRequestCallId === this.getFacilityDetailsByIdApiCallId) {
          if (responseJson && responseJson?.data ) {
             const statusDetail = responseJson?.data?.attributes?.classified_status;
            this.setState({loading: false,statusDetail ,getFacilityDetails :responseJson?.data})
          } else if (responseJson?.errors) {
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
         this.setState({unitNameData :responseJson?.data})
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
            let error = responseJson.errors[0] as string;
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

getFacilityDetails= (id :any) => {
 localStorage.setItem("FacilityDetailsManagerId",id)
 //@ts-ignore
  this.props.history.push({
    pathname: "/FacilityManagerDetail",
});
}

serachHandle=()=>{
console.log("this.state?.buildingName ,this.state?.status ,this.state?.areaReserve",this.state?.buildingName ,this.state?.status ,this.state?.areaReserve)
  this.getFacilityReservationListing(this.state?.buildingName ,this.state?.status ,this.state?.areaReserve)
}

onChange =(e :any)=>{
  if(e.target.name === 'buildingName'){
    const id = e.target?.value
    this.setState({ buildingName:id})
    this.getUnit(id)
  }
  else {
    //@ts-ignore
    this.setState({ [e.target.name]:e.target.value}) 
  }
}

  getFacilityReservationListing= (buildingName:any,status:any,areaReserve:any)  => {
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
     
     //const  url = `bx_block_custom_form/incidents`
     //const  getSortByOrStatus = `bx_block_posts/classifieds/classified_list?search_building=${this.state?.serachBuildingName}&filter_by=${this.state.classifiedType}&classified_status=${this.state?.status}`
     const  getSortByOrStatus =`bx_block_society_management/facility_reservations?search_building=${buildingName}&search_status=${status}&search_by_facility=${areaReserve}`
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
        `bx_block_address/building_list?society_management_id=${society_id}`
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

  getUnit = (id :any) => {
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

  getFacilityDetailsById= (id : any ,) => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };
      //const id = localStorage.getItem("userId");
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getFacilityDetailsByIdApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

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
        configJSON.validationApiMethodType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  rejectedOrCompleted = (val : any) =>{
    if(val ==="Completed")
    this.updateStatus("Completed")
    else if(val ==="Cancel")
    this.updateStatus("Cancelled")
    else if(val ==="Rejected")
    this.updateStatus("Rejected")
    else
    this.updateStatus("Upcoming")
  }

  updateStatus= (val :any)  => {
    const header = {
      token :localStorage.getItem("userToken")
    };
    const  id : any= localStorage.getItem("FacilityDetailsManagerId")
    const formData = new FormData();
    if(val ==="Upcoming"){
    formData.append('facility_reservation[status]',val)
    this.setState({statusShowDialog :false})   
  }
  else if(val ==="Cancelled"){
    formData.append('facility_reservation[status]',val)
    formData.append('facility_reservation[note]',this.state?.addNote)
    this.setState({ignoreShowDialog :false })
  }
  else {
    formData.append('facility_reservation[status]',val);
    formData.append('facility_reservation[note]',this.state?.addNote)
    this.setState({showDialog :false}) 
  }

    const httpBody = formData;
   
    this.setState({loading: true}) 
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.rejectedOrPublishedAPICallId = requestMessage.messageId;
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
  };


  // Customizable Area End
}
