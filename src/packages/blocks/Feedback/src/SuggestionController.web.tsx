import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from 'yup';
import {  RouteComponentProps } from "react-router-dom";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props extends RouteComponentProps {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  suggestionList:any
  loading:boolean
  error: string | null;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SuggestionController extends BlockComponent<
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
  getSuggestionListingApiCallId: any;
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
      suggestionList:[],
      loading:false,
      error: null,
      // Customizable Area End
    };

    // Customizable Area Start
 
    // Customizable Area End
  }



  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      

      if (apiRequestCallId && responseJson) {
        
    
         if (apiRequestCallId === this.getSuggestionListingApiCallId) {
          if (responseJson?.data ) {
          console.log("getIncidentListingApiCallId ========================>",responseJson)
          this.setState({suggestionList :responseJson?.data})
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

  isNonNullAndEmpty(value: string) {
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
      

      //@ts-ignore
      this.txtInputLastNamePrpos.value = text;
    }
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
    

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    }
  };

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
     

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
     

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



 


  getSuggtionListing= ()  => {
    try {
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token :localStorage.getItem("userToken")
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getSuggestionListingApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

     const  getSortByOrStatus = `bx_block_suggestion/suggestions`

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

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getMyApartmentListApiCallId = requestMessage.messageId;
      this.setState({ loading: true });

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `account_block/accounts/my_apartments`
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


  

createIncidentSchema() {
    const validations = Yup.object().shape({
      commonArea: Yup.string().required(`This field is required`).trim(),
      incidentRelated: Yup.string().required(`This field is required`).trim(),
      incidentTitle: Yup.string().required(`This field is required`).max(50, "Too Long!"),
      description: Yup.string().required(`This field is required`).max(200, "Too Long!"),
      myApartment:Yup.string().required(`This field is required`).trim(),
     
    });

    return validations ;
  }
  createChatRoom = async (id: any) => {

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
      formData.append("chat[chatable_id]", this.props.history.location?.id);



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
