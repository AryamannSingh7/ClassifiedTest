// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import Chatbot6 from "../../blocks/Chatbot6/src/Chatbot6";
import EmailNotifications from "../../blocks/EmailNotifications/src/EmailNotifications";
import BroadcastMessage from "../../blocks/BroadcastMessage/src/BroadcastMessage";
import BulkUploading from "../../blocks/BulkUploading/src/BulkUploading";
import Location from "../../blocks/location/src/Location";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Invitefriends from "../../blocks/invitefriends/src/Invitefriends";
import ReviewAndApproval from "../../blocks/ReviewAndApproval/src/ReviewAndApproval";
import LanguageOptions from "../../blocks/LanguageOptions/src/LanguageOptions";
import Polling from "../../blocks/Polling/src/Polling";
import Customisableusersubscriptions from "../../blocks/customisableusersubscriptions/src/Customisableusersubscriptions";
import SubscriptionDetails from "../../blocks/customisableusersubscriptions/src/SubscriptionDetails";
import Interactivefaqs from "../../blocks/interactivefaqs/src/Interactivefaqs";
import AddInteractivefaqs from "../../blocks/interactivefaqs/src/AddInteractivefaqs";
import PhotoLibrary3 from "../../blocks/PhotoLibrary3/src/PhotoLibrary3";
import ExpenseTracking from "../../blocks/ExpenseTracking/src/ExpenseTracking";
import Search from "../../blocks/search/src/Search";
import MultipleCurrencySupport from "../../blocks/multiplecurrencysupport/src/MultipleCurrencySupport";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import Feedback from "../../blocks/Feedback/src/Feedback";
import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import TaskAllocator from "../../blocks/TaskAllocator/src/TaskAllocator";
import FriendList from "../../blocks/FriendList/src/FriendList";
import FormApprovalWorkflow from "../../blocks/FormApprovalWorkflow/src/FormApprovalWorkflow";
import AdminConsole3 from "../../blocks/AdminConsole3/src/AdminConsole3";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Maps from "../../blocks/maps/src/Maps";
import Notes from "../../blocks/Notes/src/Notes";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import TaxCalculator from "../../blocks/TaxCalculator/src/TaxCalculator";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import BudgetingForecasting from "../../blocks/BudgetingForecasting/src/BudgetingForecasting";
import Videos from "../../blocks/videos/src/Videos";
import ContentFlag from "../../blocks/ContentFlag/src/ContentFlag";
import StoreCredits from "../../blocks/StoreCredits/src/StoreCredits";
import InvoiceBilling from "../../blocks/InvoiceBilling/src/InvoiceBilling";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import ContentManagement from "../../blocks/ContentManagement/src/ContentManagement";
import PricingEngine2 from "../../blocks/PricingEngine2/src/PricingEngine2";
import Chat9 from "../../blocks/Chat9/src/Chat9";
import CollectTransactionFees from "../../blocks/CollectTransactionFees/src/CollectTransactionFees";
import Analytics from "../../blocks/analytics/src/Analytics";
import Customform from "../../blocks/customform/src/Customform";
import PhoneNumberInput from "../../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Settings5 from "../../blocks/Settings5/src/Settings5";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import RequestManagement from "../../blocks/RequestManagement/src/RequestManagement";
import LeadManagement from "../../blocks/LeadManagement/src/LeadManagement";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Notifications from "../../blocks/notifications/src/Notifications";
import MobileAccountLoginBlock from "../../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import Registration from "../../blocks/email-account-registration/src/Registration.web";
import OwnerRegistration from "../../blocks/email-account-registration/src/OwnerRegistration.web";
import ManagerRegistration from "../../blocks/email-account-registration/src/ManagerRegistration.web";
import SelectOwner from "../../blocks/email-account-registration/src/SelectOwner.web";


import VerifyOTP from "../../blocks/email-account-registration/src/VerifyOTP.web";
import SelectType from "../../blocks/email-account-registration/src/SelectType.web";
import UnitRegister from "../../blocks/email-account-registration/src/UnitRegister.web";
import RegisterUnitManually from "../../blocks/email-account-registration/src/RegisterUnitManually.web";
import RegisterAddressLink from "../../blocks/email-account-registration/src/RegisterAddressLink.web";

import RegistrationRequestSignup from "../../blocks/email-account-registration/src/RegistrationRequestSignup.web";


import SearchComplex from "../../blocks/email-account-registration/src/SearchComplex.web";


import Address from "../../blocks/email-account-registration/src/Address.web";

import  './assets/css/constants/base/global.scss'
import LandingPage from "../../blocks/landingpage/src/LandingPage.web";
import EmailAccountLogin from "../../blocks/email-account-login/src/EmailAccountLogin.web";
import ChairmanLogin from "../../blocks/email-account-login/src/ChairmanLogin.web";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword.web";
import ChairmanForgotPassword from "../../blocks/forgot-password/src/ChairmanForgotPassword.web";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP.web";
import ChairmanForgotPasswordOTP from "../../blocks/forgot-password/src/ChairmanForgotPasswordOTP.web";
import ChangePassword from "../../blocks/forgot-password/src/ChangePassword.web";
import ChairmanChangePassword from "../../blocks/forgot-password/src/ChairmanChangePassword.web";
import ChangeSuccessfully from "../../blocks/forgot-password/src/ChangeSuccessfully.web";
import ChairmanChangeSuccessfully from "../../blocks/forgot-password/src/ChairmanChangeSuccessfully.web";
import RegistrationRequest from "../../blocks/email-account-login/src/RegistrationRequest.web";
import DashboardGeneral from "../../blocks/dashboard/src/DashboardGeneral.web";
import DashboardTicket from "../../blocks/dashboard/src/DashboardTicket.web";
import DashboardActions from "../../blocks/dashboard/src/DashboardActions.web";
import DashboardBudget from "../../blocks/dashboard/src/DashboardBudget.web";
import BudgetDetails from "../../blocks/dashboard/src/BudgetDetails.web";
import CreatePolls from "../../blocks/Polling/src/CreatePolls.web";
import CreateSurveys from "../../blocks/Polling/src/CreateSurveys.web";
import PollPreview from "../../blocks/Polling/src/PollPreview.web";
import SurveyPreview from "../../blocks/Polling/src/SurveyPreview.web";
import PollsallData from "../../blocks/Polling/src/PollsallData.web";
import PollsSurvey from "../../blocks/Polling/src/PollsSurvey.web"
import SubmitPoll from "../../blocks/Polling/src/SubmitPoll.web"
const routeMap = {
  //done
  LandingPage: {
    component: LandingPage,
    path: '/',
    exact: true
  },
  LandingPage2: {
    component: LandingPage,
    path: '/owner',
    exact: true
  },
  //done
  ChairmanLogin: {
    component: ChairmanLogin,
    path: "/ChairmanLogin"
  },
  //done
  EmailAccountLogin: {
    component: EmailAccountLogin,
    path: "/EmailAccountLogin"
  },
  //done
  ChangeSuccessfully: {
    component: ChangeSuccessfully,
    path: '/ChangeSuccessfully',
    exact: true
  },
  ChairmanChangeSuccessfully: {
    component: ChairmanChangeSuccessfully,
    path: '/ChairmanChangeSuccessfully',
    exact: true
  },
  //done
  ChangePassword: {
    component: ChangePassword,
    path: '/ChangePassword',
    exact: true
  },
  ChairmanChangePassword: {
    component: ChairmanChangePassword,
    path: "/ChairmanChangePassword"
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: "/ForgotPassword"
  },
  ChairmanForgotPassword: {
    component: ChairmanForgotPassword,
    path: "/ChairmanForgotPassword"
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: "/ForgotPasswordOTP"
  },
  ChairmanForgotPasswordOTP: {
    component:ChairmanForgotPasswordOTP,
    path: "/ChairmanForgotPasswordOTP"
  },
  RegistrationRequest: {
    component: RegistrationRequest,
    path: "/RegistrationRequest"
  },
  RegistrationRequestSignup: {
    component: RegistrationRequestSignup,
    path: "/RegistrationRequestSignup"
  },
  RolesPermissions2: {
    component: RolesPermissions2,
    path: "/RolesPermissions2"
  },
  Chatbot6: {
    component: Chatbot6,
    path: "/Chatbot6"
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: "/EmailNotifications"
  },
  BroadcastMessage: {
    component: BroadcastMessage,
    path: "/BroadcastMessage"
  },
  BulkUploading: {
    component: BulkUploading,
    path: "/BulkUploading"
  },
  Location: {
    component: Location,
    path: "/Location"
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: "/SocialMediaAccountLoginScreen"
  },
  Invitefriends: {
    component: Invitefriends,
    path: "/Invitefriends"
  },
  ReviewAndApproval: {
    component: ReviewAndApproval,
    path: "/ReviewAndApproval"
  },
  LanguageOptions: {
    component: LanguageOptions,
    path: "/LanguageOptions"
  },
  Polling: {
    component: Polling,
    path: "/Polling"
  },

  CreatePolls: {
    component: CreatePolls,
    path: "/CreatePolls"
  },

  CreateSurveys: {
    component: CreateSurveys,
    path: "/CreateSurveys"
  },

  PollPreview: {
    component: PollPreview,
    path: "/PollPreview"
  },

  SurveyPreview: {
    component: SurveyPreview,
    path: "/SurveyPreview"
  },

  PollsallData: {
    component: PollsallData,
    path: "/PollsallData"
  },

  PollsSurvey: {
    component: PollsSurvey,
    path: "/PollsSurvey"
  },

  SubmitPoll: {
    component: SubmitPoll,
    path: "/SubmitPoll"
  },



  Customisableusersubscriptions: {
    component: Customisableusersubscriptions,
    path: "/Customisableusersubscriptions"
  },
  SubscriptionDetails: {
    component: SubscriptionDetails,
    path: "/SubscriptionDetails"
  },
  Interactivefaqs: {
    component: Interactivefaqs,
    path: "/Interactivefaqs"
  },
  AddInteractivefaqs: {
    component: AddInteractivefaqs,
    path: "/AddInteractivefaqs"
  },
  PhotoLibrary3: {
    component: PhotoLibrary3,
    path: "/PhotoLibrary3"
  },
  ExpenseTracking: {
    component: ExpenseTracking,
    path: "/ExpenseTracking"
  },
  Search: {
    component: Search,
    path: "/Search"
  },
  MultipleCurrencySupport: {
    component: MultipleCurrencySupport,
    path: "/MultipleCurrencySupport"
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: "/ForgotPassword"
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: "/ForgotPasswordOTP"
  },
  NewPassword: {
    component: NewPassword,
    path: "/NewPassword"
  },
  Feedback: {
    component: Feedback,
    path: "/Feedback"
  },
  Contactus: {
    component: Contactus,
    path: "/Contactus"
  },
  AddContactus: {
    component: AddContactus,
    path: "/AddContactus"
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: "/CountryCodeSelector"
  },
  TaskAllocator: {
    component: TaskAllocator,
    path: "/TaskAllocator"
  },
  FriendList: {
    component: FriendList,
    path: "/FriendList"
  },
  FormApprovalWorkflow: {
    component: FormApprovalWorkflow,
    path: "/FormApprovalWorkflow"
  },
  AdminConsole3: {
    component: AdminConsole3,
    path: "/AdminConsole3"
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: "/OTPInputAuth"
  },
  Maps: {
    component: Maps,
    path: "/Maps"
  },
  Notes: {
    component: Notes,
    path: "/Notes"
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: "/EmailAccountLoginBlock"
  },
  TaxCalculator: {
    component: TaxCalculator,
    path: "/TaxCalculator"
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: "/Pushnotifications"
  },
  BudgetingForecasting: {
    component: BudgetingForecasting,
    path: "/BudgetingForecasting"
  },
  Videos: {
    component: Videos,
    path: "/Videos"
  },

  ContentFlag: {
    component: ContentFlag,
    path: "/ContentFlag"
  },
  StoreCredits: {
    component: StoreCredits,
    path: "/StoreCredits"
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: "/InvoiceBilling"
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: "/EmailAccountRegistration"
  },
  ContentManagement: {
    component: ContentManagement,
    path: "/ContentManagement"
  },
  PricingEngine2: {
    component: PricingEngine2,
    path: "/PricingEngine2"
  },
  Chat9: {
    component: Chat9,
    path: "/Chat9"
  },
  CollectTransactionFees: {
    component: CollectTransactionFees,
    path: "/CollectTransactionFees"
  },
  Analytics: {
    component: Analytics,
    path: "/Analytics"
  },
  Customform: {
    component: Customform,
    path: "/Customform"
  },
  PhoneNumberInput: {
    component: PhoneNumberInput,
    path: "/PhoneNumberInput"
  },
  AdditionalDetailForm: {
    component: AdditionalDetailForm,
    path: "/AdditionalDetailForm"
  },
  Settings5: {
    component: Settings5,
    path: "/Settings5"
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: "/UserProfileBasicBlock"
  },
  RequestManagement: {
    component: RequestManagement,
    path: "/RequestManagement"
  },
  LeadManagement: {
    component: LeadManagement,
    path: "/LeadManagement"
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: "/SocialMediaAccountRegistrationScreen"
  },
  Notifications: {
    component: Notifications,
    path: "/Notifications"
  },
  MobileAccountLoginBlock: {
    component: MobileAccountLoginBlock,
    path: "/MobileAccountLoginBlock"
  },

  DashboardGeneral: {
    component: DashboardGeneral,
    path: "/DashboardGeneral"
  },


  DashboardTicket: {
    component: DashboardTicket,
    path: "/DashboardTicket"
  },

  DashboardActions: {
    component: DashboardActions,
    path: "/DashboardActions"
  },

  DashboardBudget: {
    component: DashboardBudget,
    path: "/DashboardBudget"
  },

  BudgetDetails: {
    component: BudgetDetails,
    path: "/BudgetDetails"
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: "/ForgotPassword"
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: "/ForgotPasswordOTP"
  },
  RolesPermissions2: {
    component: RolesPermissions2,
    path: "/RolesPermissions2"
  },
  Chatbot6: {
    component: Chatbot6,
    path: "/Chatbot6"
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: "/EmailNotifications"
  },
  BroadcastMessage: {
    component: BroadcastMessage,
    path: "/BroadcastMessage"
  },
  BulkUploading: {
    component: BulkUploading,
    path: "/BulkUploading"
  },
  Location: {
    component: Location,
    path: "/Location"
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: "/SocialMediaAccountLoginScreen"
  },
  Invitefriends: {
    component: Invitefriends,
    path: "/Invitefriends"
  },
  ReviewAndApproval: {
    component: ReviewAndApproval,
    path: "/ReviewAndApproval"
  },
  LanguageOptions: {
    component: LanguageOptions,
    path: "/LanguageOptions"
  },
  Polling: {
    component: Polling,
    path: "/Polling"
  },
  Customisableusersubscriptions: {
    component: Customisableusersubscriptions,
    path: "/Customisableusersubscriptions"
  },
  SubscriptionDetails: {
    component: SubscriptionDetails,
    path: "/SubscriptionDetails"
  },
  Interactivefaqs: {
    component: Interactivefaqs,
    path: "/Interactivefaqs"
  },
  AddInteractivefaqs: {
    component: AddInteractivefaqs,
    path: "/AddInteractivefaqs"
  },
  PhotoLibrary3: {
    component: PhotoLibrary3,
    path: "/PhotoLibrary3"
  },
  ExpenseTracking: {
    component: ExpenseTracking,
    path: "/ExpenseTracking"
  },
  Search: {
    component: Search,
    path: "/Search"
  },
  MultipleCurrencySupport: {
    component: MultipleCurrencySupport,
    path: "/MultipleCurrencySupport"
  },
  NewPassword: {
    component: NewPassword,
    path: "/NewPassword"
  },
  Feedback: {
    component: Feedback,
    path: "/Feedback"
  },
  Contactus: {
    component: Contactus,
    path: "/Contactus"
  },
  AddContactus: {
    component: AddContactus,
    path: "/AddContactus"
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: "/CountryCodeSelector"
  },
  TaskAllocator: {
    component: TaskAllocator,
    path: "/TaskAllocator"
  },
  FriendList: {
    component: FriendList,
    path: "/FriendList"
  },
  FormApprovalWorkflow: {
    component: FormApprovalWorkflow,
    path: "/FormApprovalWorkflow"
  },
  AdminConsole3: {
    component: AdminConsole3,
    path: "/AdminConsole3"
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: "/OTPInputAuth"
  },
  Maps: {
    component: Maps,
    path: "/Maps"
  },
  Notes: {
    component: Notes,
    path: "/Notes"
  },
  TaxCalculator: {
    component: TaxCalculator,
    path: "/TaxCalculator"
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: "/Pushnotifications"
  },
  BudgetingForecasting: {
    component: BudgetingForecasting,
    path: "/BudgetingForecasting"
  },
  Videos: {
    component: Videos,
    path: "/Videos"
  },
  ContentFlag: {
    component: ContentFlag,
    path: "/ContentFlag"
  },
  StoreCredits: {
    component: StoreCredits,
    path: "/StoreCredits"
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: "/InvoiceBilling"
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: "/EmailAccountRegistration"
  },
  ContentManagement: {
    component: ContentManagement,
    path: "/ContentManagement"
  },
  PricingEngine2: {
    component: PricingEngine2,
    path: "/PricingEngine2"
  },
  Chat9: {
    component: Chat9,
    path: "/Chat9"
  },
  CollectTransactionFees: {
    component: CollectTransactionFees,
    path: "/CollectTransactionFees"
  },
  // Analytics: {
  //   component: Analytics,
  //   path: "/Analytics"
  // },
  Customform: {
    component: Customform,
    path: "/Customform"
  },
  PhoneNumberInput: {
    component: PhoneNumberInput,
    path: "/PhoneNumberInput"
  },
  AdditionalDetailForm: {
    component: AdditionalDetailForm,
    path: "/AdditionalDetailForm"
  },
  Settings5: {
    component: Settings5,
    path: "/Settings5"
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: "/UserProfileBasicBlock"
  },
  RequestManagement: {
    component: RequestManagement,
    path: "/RequestManagement"
  },
  LeadManagement: {
    component: LeadManagement,
    path: "/LeadManagement"
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: "/SocialMediaAccountRegistrationScreen"
  },
  Notifications: {
    component: Notifications,
    path: "/Notifications"
  },
  MobileAccountLoginBlock: {
    component: MobileAccountLoginBlock,
    path: "/MobileAccountLoginBlock"
  },

  //   Home: {
  // component:Analytics,
  //     path: '/',
  //     exact: true
  //   },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },
  Register: {
    component: Registration,
    path: '/register'
  },
  OwnerRegister: {
    component: OwnerRegistration,
    path: '/registerowner'
  },
  OwnerSelect: {
    component: SelectOwner,
    path: '/selectowner'
  },
  ManagerRegister: {
    component: ManagerRegistration,
    path: '/registermanager'
  },
  UnitRegister: {
    component: UnitRegister,
    path: '/registerunit'
  },
  RegisterUnitManually: {
    component: RegisterUnitManually,
    path: '/registerunitmanually'
  },
  RegisterUnitLink: {
    component: RegisterAddressLink,
    path: '/RegisterUnitLink'
  },
  SearchComplex: {
    component: SearchComplex,
    path: '/searchComplex'
  },
  VerifyOTP: {
    component: VerifyOTP,
    path: '/otp'
  },
  SelectType: {
    component: SelectType,
    path: '/selecttype'
  },
  AddressFill: {
    component: Address,
    path: '/addressfill'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {

  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    return (
      <View style={{ height: '100%', width: '100%'}}>
        {/* <TopNav /> */}
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
