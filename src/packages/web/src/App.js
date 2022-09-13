// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import { ROLE } from '../../framework/src/Enum';
import { Toaster } from 'react-hot-toast';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
// import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import Chatbot6 from "../../blocks/Chatbot6/src/Chatbot6";
import EmailNotifications from "../../blocks/EmailNotifications/src/EmailNotifications";
import BroadcastMessage from "../../blocks/BroadcastMessage/src/BroadcastMessage";
// import BulkUploading from "../../blocks/BulkUploading/src/BulkUploading";
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
// import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import TaskAllocator from "../../blocks/TaskAllocator/src/TaskAllocator";
import FriendList from "../../blocks/FriendList/src/FriendList";
import FormApprovalWorkflow from "../../blocks/FormApprovalWorkflow/src/FormApprovalWorkflow";
import AdminConsole3 from "../../blocks/AdminConsole3/src/AdminConsole3";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Maps from "../../blocks/maps/src/Maps";
// import Notes from "../../blocks/Notes/src/Notes";
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
import ChairmanRegistrationRequest from "../../blocks/email-account-login/src/ChairmanRegistrationRequest.web";
import DashboardGeneral from "../../blocks/dashboard/src/DashboardGeneral.web";
import DashboardTicket from "../../blocks/dashboard/src/DashboardTicket.web";
import DashboardActions from "../../blocks/dashboard/src/DashboardActions.web";
import DashboardBudget from "../../blocks/dashboard/src/DashboardBudget.web";
import BudgetDetails from "../../blocks/dashboard/src/BudgetDetails.web";
import CreatePolls from "../../blocks/Polling/src/CreatePolls.web";
import CreateSurveys from "../../blocks/Polling/src/CreateSurveys.web";
import PollPreview from "../../blocks/Polling/src/PollPreview.web";
import SurveyPreview from "../../blocks/Polling/src/SurveyPreview.web";
import SurveyParticipate from "../../blocks/Polling/src/SurveyParticipate.web"
import SurveyDetailsMain from "../../blocks/Polling/src/SurveryDetailsMain.web"
import PollsallData from "../../blocks/Polling/src/PollsallData.web";
import SurveyallData from "../../blocks/Polling/src/SurveyallData.web";
import PollsSurvey from "../../blocks/Polling/src/PollsSurvey.web"
import SurveyReport from "../../blocks/Polling/src/SurveyReport.web"
import SubmitPoll from "../../blocks/Polling/src/SubmitPoll.web"
import SurveyInitial from "../../blocks/Polling/src/SurveyInitial.web"
import OwnerDashboard from "../../blocks/dashboard/src/OwnerDashboard.web"
import ResidentDashboard from "../../blocks/dashboard/src/ResidentDashboard.web"
import PollVoteSubmitted from "../../blocks/Polling/src/PollVoteSubmitted.web"
import PollResponseCompleted from "../../blocks/Polling/src/PollResponseCompleted.web"
import VeichleList from "../../blocks/customform/src/VeichleList.web"
import NewVeichleList from "../../blocks/customform/src/NewVehicle.web"
import NewFamily from "../../blocks/customform/src/NewFamily.web"
import EditVeichleList from "../../blocks/customform/src/EditVehicle.web"
import EditFamily from "../../blocks/customform/src/EditFamily.web"
import EditRequest from "../../blocks/customform/src/EditRequest.web"
import NewRequest from "../../blocks/customform/src/NewRequest.web"
import ManagerList from "../../blocks/customform/src/ManagerList.web"
import Inbox from "../../blocks/customform/src/Inbox.web"
import Chatbox from "../../blocks/customform/src/Chatbox.web"



import ViewVeichle from "../../blocks/customform/src/ViewVehicle.web"
import FamilyList from "../../blocks/customform/src/FamilyList.web"

import ManagerViewVehicle from "../../blocks/customform/src/ManagerViewVehicle.web"


import PollDetails from "../../blocks/Polling/src/PollDetails.web"
import PollReport from "../../blocks/Polling/src/PollReport.web"
import CreateIncident from "../../blocks/ContentManagement/src/CreateIncident.web";
import IncidentDetails from "../../blocks/ContentManagement/src/IncidentDetails.web";
import IncidentListing from "../../blocks/ContentManagement/src/IncidentListing.web";
import IncidentReportedSuccessfully from "../../blocks/ContentManagement/src/IncidentReportedSuccessfully.web";
import IncidentPreview from "../../blocks/ContentManagement/src/IncidentPreview.web";
import IncidentManagement from "../../blocks/ContentManagement/src/IncidentManagement.web";
import IncidentManagementDetail from "../../blocks/ContentManagement/src/IncidentManagementDetail.web";

import NeighboursDetails from '../../blocks/search/src/NeighboursDetails.web';
import NeighboursListing from '../../blocks/search/src/NeighboursListing.web';

import FaqChairman from "../../blocks/contactus/src/FaqChairman.web";
import FaqOwner from "../../blocks/contactus/src/FaqOwner.web";
import FaqResident from "../../blocks/contactus/src/FaqResident.web";
import ContactUsChairman from "../../blocks/contactus/src/ContactUs.web";
import SubscriptionDetail from "../../blocks/contactus/src/SubscriptionDetails.web";

import DocumentChairman from "../../blocks/Notes/src/DocumentChairman.web";
import DocumentListChairman from "../../blocks/Notes/src/DocumentListChairman.web";
import DocumentViewChairman from "../../blocks/Notes/src/DocumentViewChairman.web";
import PersonalDocument from "../../blocks/Notes/src/PersonalDocuments.web";
import PersonalDocumentList from "../../blocks/Notes/src/PersonalDocumentList.web";
import ViewPersonalDocument from "../../blocks/Notes/src/ViewPersonalDocument.web";
import BuildingDocuments from "../../blocks/Notes/src/BuildingDocuments.web";
import BuildingDocumentList from "../../blocks/Notes/src/BuildingDocumentList.web";
import ViewBuildingDocument from "../../blocks/Notes/src/ViewBuildingDocument.web";

import ContractsList from "../../blocks/RolesPermissions2/src/ContractsList.web";
import ContractDetail from "../../blocks/RolesPermissions2/src/ContractDetail.web";
import TemplateDetail from "../../blocks/RolesPermissions2/src/TemplateDetail.web";
import IssueContract from "../../blocks/RolesPermissions2/src/IssueContract.web";
import IssueLease from "../../blocks/RolesPermissions2/src/IssueLease.web";
import SelectedTemplate from "../../blocks/RolesPermissions2/src/SelectedTemplate.web";
import LeaseForm from "../../blocks/RolesPermissions2/src/LeaseForm.web";
import ChangedSelectedTemplate from "../../blocks/RolesPermissions2/src/ChangedSelectedTemplate.web";
import ReviewTemplate from "../../blocks/RolesPermissions2/src/ReviewTemplate.web";
import AddCondition from "../../blocks/RolesPermissions2/src/AddCondition.web";

import ChairmanScheduledMeeting from "../../blocks/BulkUploading/src/ScheduledMeeting.web";
import ScheduledMeetingDetails from "../../blocks/BulkUploading/src/ScheduledMeetingDetails.web";
import ChairmanMeetingMinutes from "../../blocks/BulkUploading/src/MeetingMinutes.web";
import MeetingMinuteDetails from "../../blocks/BulkUploading/src/MeetingMinuteDetails.web";
import MyMeetings from "../../blocks/BulkUploading/src/MyMeetings.web";
import MyMeetingDetail from "../../blocks/BulkUploading/src/MyMeetingDetail.web";
import MyMeetingMinuteDetail from "../../blocks/BulkUploading/src/MyMeetingMinuteDetail.web";
import MeetingMinuteNote from "../../blocks/BulkUploading/src/MeetingMinuteNote.web";

import ViewInvoices from '../../blocks/InvoiceBilling/src/ViewInvoices.web';
import ViewReceipt from '../../blocks/InvoiceBilling/src/ViewReceipt.web';
import InvoicesDetails from '../../blocks/InvoiceBilling/src/InvoicesDetails.web';
import ReceiptsDetails from '../../blocks/InvoiceBilling/src/ReceiptsDetails.web';
import CharmainInvoices from '../../blocks/dashboard/src/CharmainInvoices.web';

import ChairmanProfile from '../../blocks/Settings5/src/ChairmanProfile.web';
import Profile from '../../blocks/user-profile-basic/src/Profile.web';
import EditProfile from '../../blocks/user-profile-basic/src/EditProfile.web';
import PublicView from '../../blocks/user-profile-basic/src/PublicView.web';

import CommunityUserProfile from '../../blocks/user-profile-basic/src/CommunityUserProfile.web';
import GaMembers from  '../../blocks/user-profile-basic/src/GaMembers';
import ResidentsProfile from '../../blocks/user-profile-basic/src/ResidentsProfile.web';
import PropertysManager from '../../blocks/user-profile-basic/src/PropertysManager.web';

const routeMap = {
  //done
  LandingPage: {
    component: LandingPage,
    path: '/',
    exact: true,
    roles: [ROLE.PRIVATE]
  },
  Profile: {
    component: Profile,
    path: '/profile',
    exact: true,
    // roles: [ROLE.PRIVATE]
  },
  PublicView: {
    component: PublicView,
    path: '/PublicView',
    exact: true,
    // roles: [ROLE.PRIVATE]
  },
  EditProfile: {
    component: EditProfile,
    path: '/editprofile',
    exact: true,
    // roles: [ROLE.PRIVATE]
  },
  Inbox: {
    component: Inbox,
    path: '/inbox',
    exact: true
  },
  Chatbox: {
    component: Chatbox,
    path: '/Chatbox',
    exact: true
  },
  LandingPage2: {
    component: LandingPage,
    path: '/owner',
    exact: true
  },
  NeighboursListing: {
    component: NeighboursListing,
    path: '/NeighboursListing',
    exact: true
  },
  NeighboursDetails: {
    component: NeighboursDetails,
    path: '/NeighboursDetails',
    exact: true
  },
  VeichleList: {
    component: VeichleList,
    path: '/VeichleList',
    exact: true
  },
  FamilyList: {
    component: FamilyList,
    path: '/FamilyList',
    exact: true
  },
  NewVeichleList: {
    component: NewVeichleList,
    path: '/NewVeichleList',
    exact: true
  },
  NewFamily: {
    component: NewFamily,
    path: '/NewFamily',
    exact: true
  },
  EditVeichleList: {
    component: EditVeichleList,
    path: '/editVehicle',
    exact: true
  },
  EditFamily: {
    component: EditFamily,
    path: '/EditFamily',
    exact: true
  },
  EditRequest: {
    component: EditRequest,
    path: '/editRequest',
    exact: true
  },
  NewRequest: {
    component: NewRequest,
    path: '/NewRequest',
    exact: true
  },
  ManagerList: {
    component: ManagerList,
    path: '/mv',
    exact: true
  },
  ManagerViewVehicle: {
    component: ManagerViewVehicle,
    path: '/mvv',
    exact: true
  },
  ViewVeichle: {
    component: ViewVeichle,
    path: '/viewVehicle',
    exact: true
  },
  //done
  ChairmanLogin: {
    component: ChairmanLogin,
    path: '/ChairmanLogin',
    roles: [ROLE.PRIVATE]
  },
  //done
  EmailAccountLogin: {
    component: EmailAccountLogin,
    path: '/EmailAccountLogin'
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
  //done0
  ChangePassword: {
    component: ChangePassword,
    path: '/ChangePassword',
    exact: true
  },
  ChairmanChangePassword: {
    component: ChairmanChangePassword,
    path: '/ChairmanChangePassword'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword'
  },
  ChairmanForgotPassword: {
    component: ChairmanForgotPassword,
    path: '/ChairmanForgotPassword'
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP'
  },
  ChairmanForgotPasswordOTP: {
    component: ChairmanForgotPasswordOTP,
    path: '/ChairmanForgotPasswordOTP'
  },
  RegistrationRequest: {
    component: RegistrationRequest,
    path: '/RegistrationRequest'
  },
  ChairmanRegistrationRequest: {
    component: ChairmanRegistrationRequest,
    path: '/ChairmanRegistrationRequest'
  },
  RegistrationRequestSignup: {
    component: RegistrationRequestSignup,
    path: '/RegistrationRequestSignup'
  },
  CreateIncident: {
    component: CreateIncident,
    path: '/CreateIncident',
    exact: true
  },
  IncidentDetails: {
    component: IncidentDetails,
    path: '/IncidentDetails',
    exact: true
  },
  ViewInvoices: {
    component: ViewInvoices,
    path: '/ViewInvoices',
    exact: true
  },
  ViewReceipt: {
    component: ViewReceipt,
    path: '/ViewReceipt',
    exact: true
  },
  InvoicesDetails: {
    component: InvoicesDetails,
    path: '/InvoicesDetails',
    exact: true
  },
  ReceiptsDetails: {
    component: ReceiptsDetails,
    path: '/ReceiptsDetails',
    exact: true
  },
  CharmainInvoices: {
    component: CharmainInvoices,
    path: '/CharmainInvoices',
    exact: true
  },
  IncidentListing: {
    component: IncidentListing,
    path: '/IncidentListing',
    exact: true
  },
  IncidentPreview: {
    component: IncidentPreview,
    path: '/IncidentPreview',
    exact: true
  },
  IncidentReportedSuccessfully: {
    component: IncidentReportedSuccessfully,
    path: '/IncidentReportedSuccessfully',
    exact: true
  },
  IncidentManagement: {
    component: IncidentManagement,
    path: '/IncidentManagement',
    exact: true
  },
  IncidentManagementDetail: {
    component: IncidentManagementDetail,
    path: '/IncidentManagementDetail',
    exact: true
  },
  // RolesPermissions2: {
  //   component: RolesPermissions2,
  //   path: '/RolesPermissions2'
  // },
  Chatbot6: {
    component: Chatbot6,
    path: '/Chatbot6'
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: '/EmailNotifications'
  },
  BroadcastMessage: {
    component: BroadcastMessage,
    path: '/BroadcastMessage'
  },
  // BulkUploading: {
  //   component: BulkUploading,
  //   path: '/BulkUploading'
  // },
  Location: {
    component: Location,
    path: '/Location'
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: '/SocialMediaAccountLoginScreen'
  },
  Invitefriends: {
    component: Invitefriends,
    path: '/Invitefriends'
  },
  ReviewAndApproval: {
    component: ReviewAndApproval,
    path: '/ReviewAndApproval'
  },
  LanguageOptions: {
    component: LanguageOptions,
    path: '/LanguageOptions'
  },
  Polling: {
    component: Polling,
    path: '/Polling'
  },

  CreatePolls: {
    component: CreatePolls,
    path: "/CreatePolls"
  },


  TakeSurvey: {
    component: SurveyInitial,
    path: "/TakeSurvey"
  },

  SurveyFill: {
    component: SurveyParticipate,
    path: "/SurveyFill"
  },

  CreateSurveys: {
    component: CreateSurveys,
    path: '/CreateSurveys'
  },

  PollPreview: {
    component: PollPreview,
    path: '/PollPreview'
  },

  SurveyPreview: {
    component: SurveyPreview,
    path: '/SurveyPreview'
  },

  PollsallData: {
    component: PollsallData,
    path: '/PollsallData'
  },

  SurveyallData: {
    component: SurveyallData,
    path: '/SurveyallData'
  },



  PollsSurvey: {
    component: PollsSurvey,
    path: '/PollsSurvey'
  },

  SubmitPoll: {
    component: SubmitPoll,
    path: '/SubmitPoll'
  },

  PollVoteSubmitted: {
    component: PollVoteSubmitted,
    path: '/PollVoteView'
  },

  PollDetails: {
    component: PollDetails,
    path: '/PollDetails'
  },

  SurveyDetails:{
    component: SurveyDetailsMain,
    path: '/SurveyDetails'
  },

  SurveyReport:{
    component: SurveyReport,
    path: '/SurveyReport'
  },

  PollReport: {
    component: PollReport,
    path: "/PollReport"
  },

  PollResponseCompleted: {
    component: PollResponseCompleted,
    path: '/PollResponseCompleted'
  },

  OwnerDashboard: {
    component: OwnerDashboard,
    path: '/OwnerDashboard'
  },
  ResidentDashboard: {
    component: ResidentDashboard,
    path: '/ResidentDashboard'
  },
  // Chairman - Help
  FaqChairman: {
    component: FaqChairman,
    path: '/FaqChairman'
  },
  FaqOwner: {
    component: FaqOwner,
    path: '/FaqOwner'
  },
  FaqResident: {
    component: FaqResident,
    path: '/FaqResident'
  },
  ContactUsChairman: {
    component: ContactUsChairman,
    path: '/ContactUsChairman'
  },
  SubscriptionDetail: {
    component: SubscriptionDetail,
    path: '/SubscriptionDetail'
  },
  // Chairman - Document
  DocumentChairman: {
    component: DocumentChairman,
    path: '/DocumentChairman',
    exact: true
  },
  DocumentListChairman: {
    component: DocumentListChairman,
    path: '/DocumentChairman/:name',
    exact: true
  },
  DocumentViewChairman: {
    component: DocumentViewChairman,
    path: '/DocumentChairman/:name/:id/view',
    exact: true
  },
  // Owner, Resident - Personal Document, Building Document
  PersonalDocument: {
    component: PersonalDocument,
    path: '/PersonalDocument',
    exact: true
  },
  PersonalDocumentList: {
    component: PersonalDocumentList,
    path: '/PersonalDocument/:name',
    exact: true
  },
  ViewPersonalDocument: {
    component: ViewPersonalDocument,
    path: '/PersonalDocument/:name/:id/view',
    exact: true
  },
  BuildingDocuments: {
    component: BuildingDocuments,
    path: '/BuildingDocuments',
    exact: true
  },
  BuildingDocumentList: {
    component: BuildingDocumentList,
    path: '/BuildingDocuments/:name',
    exact: true
  },
  ViewBuildingDocument: {
    component: ViewBuildingDocument,
    path: '/BuildingDocuments/:name/:id/view',
    exact: true
  },
  // Owner - Contract
  ContractsList: {
    component: ContractsList,
    path: '/Contracts',
    exact: true
  },
  ContractDetail: {
    component: ContractDetail,
    path: '/Contract/:id',
    exact: true
  },
  TemplateDetail: {
    component: TemplateDetail,
    path: '/Template/:id',
    exact: true
  },
  IssueContract: {
    component: IssueContract,
    path: '/IssueContract',
    exact: true
  },
  IssueLease: {
    component: IssueLease,
    path: '/IssueLease',
    exact: true
  },
  SelectedTemplate: {
    component: SelectedTemplate,
    path: '/IssueLease/:id',
    exact: true
  },
  SelectedTemplateTwo: {
    component: SelectedTemplate,
    path: '/IssueContract/:id',
    exact: true
  },
  LeaseFormIssueLease: {
    component: LeaseForm,
    path: '/IssueLease/:id/LeaseForm',
    exact: true
  },
  LeaseFormIssueContract: {
    component: LeaseForm,
    path: '/IssueContract/:id/LeaseForm',
    exact: true
  },
  ChangedSelectedTemplate: {
    component: ChangedSelectedTemplate,
    path: '/IssueContract/:id/LeaseForm/Template',
    exact: true
  },
  AddCondition: {
    component: AddCondition,
    path: '/IssueContract/:id/LeaseForm/Template/AddCondition',
    exact: true
  },
  ReviewTemplate: {
    component: ReviewTemplate,
    path: '/IssueContract/:id/LeaseForm/Template/Review',
    exact: true
  },
  // LeaseForm: {
  //   component: LeaseForm,
  //   path: '/LeaseForm',
  //   exact: true
  // },
  // Chairman - Meetings
  ChairmanScheduledMeeting: {
    component: ChairmanScheduledMeeting,
    path: '/ScheduledMeetings',
    exact: true
  },
  ChairmanScheduledMeetingDetails: {
    component: ScheduledMeetingDetails,
    path: '/ScheduledMeeting/:id',
    exact: true
  },
  ChairmanMeetingMinutes: {
    component: ChairmanMeetingMinutes,
    path: '/MeetingMinutes',
    exact: true
  },
  ChairmanMeetingMinuteDetails: {
    component: MeetingMinuteDetails,
    path: '/MeetingMinute/:id',
    exact: true
  },
  MeetingMinuteNote: {
    component: MeetingMinuteNote,
    path: '/MeetingMinute/:id/Note',
    exact: true
  },
  ScheduleMeetingMinuteNote: {
    component: MeetingMinuteNote,
    path: '/ScheduledMeeting/:id/Note',
    exact: true
  },
  // Owner - Meetings
  OwnerMeetingsList: {
    component: MyMeetings,
    path: '/MyMeetings',
    exact: true
  },
  OwnerMyMeetingDetail: {
    component: MyMeetingDetail,
    path: '/MyMeeting/:id',
    exact: true
  },
  OwnerMyMeetingMinuteDetail: {
    component: MyMeetingMinuteDetail,
    path: '/MeetingMinuteDetail/:id',
    exact: true
  },
  // Chairman - Profile
  ChairmanProfile: {
    component: ChairmanProfile,
    path: '/ChairmanProfile',
    exact: true
  },
  Customisableusersubscriptions: {
    component: Customisableusersubscriptions,
    path: '/Customisableusersubscriptions'
  },
  SubscriptionDetails: {
    component: SubscriptionDetails,
    path: '/SubscriptionDetails'
  },
  Interactivefaqs: {
    component: Interactivefaqs,
    path: '/Interactivefaqs'
  },
  AddInteractivefaqs: {
    component: AddInteractivefaqs,
    path: '/AddInteractivefaqs'
  },
  PhotoLibrary3: {
    component: PhotoLibrary3,
    path: '/PhotoLibrary3'
  },
  ExpenseTracking: {
    component: ExpenseTracking,
    path: '/ExpenseTracking'
  },
  Search: {
    component: Search,
    path: '/Search'
  },
  MultipleCurrencySupport: {
    component: MultipleCurrencySupport,
    path: '/MultipleCurrencySupport'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword'
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP'
  },
  NewPassword: {
    component: NewPassword,
    path: '/NewPassword'
  },
  Feedback: {
    component: Feedback,
    path: '/Feedback'
  },
  // Contactus: {
  //   component: Contactus,
  //   path: '/Contactus'
  // },
  AddContactus: {
    component: AddContactus,
    path: '/AddContactus'
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: '/CountryCodeSelector'
  },
  TaskAllocator: {
    component: TaskAllocator,
    path: '/TaskAllocator'
  },
  FriendList: {
    component: FriendList,
    path: '/FriendList'
  },
  FormApprovalWorkflow: {
    component: FormApprovalWorkflow,
    path: '/FormApprovalWorkflow'
  },
  AdminConsole3: {
    component: AdminConsole3,
    path: '/AdminConsole3'
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: '/OTPInputAuth'
  },
  Maps: {
    component: Maps,
    path: '/Maps'
  },
  // Notes: {
  //   component: Notes,
  //   path: '/Notes'
  // },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: '/EmailAccountLoginBlock'
  },
  TaxCalculator: {
    component: TaxCalculator,
    path: '/TaxCalculator'
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: '/Pushnotifications'
  },
  BudgetingForecasting: {
    component: BudgetingForecasting,
    path: '/BudgetingForecasting'
  },
  Videos: {
    component: Videos,
    path: '/Videos'
  },

  ContentFlag: {
    component: ContentFlag,
    path: '/ContentFlag'
  },
  StoreCredits: {
    component: StoreCredits,
    path: '/StoreCredits'
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: '/InvoiceBilling'
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: '/EmailAccountRegistration'
  },
  ContentManagement: {
    component: ContentManagement,
    path: '/ContentManagement'
  },
  PricingEngine2: {
    component: PricingEngine2,
    path: '/PricingEngine2'
  },
  Chat9: {
    component: Chat9,
    path: '/Chat9'
  },
  CollectTransactionFees: {
    component: CollectTransactionFees,
    path: '/CollectTransactionFees'
  },
  Analytics: {
    component: Analytics,
    path: '/Analytics'
  },
  Customform: {
    component: Customform,
    path: '/Customform'
  },
  PhoneNumberInput: {
    component: PhoneNumberInput,
    path: '/PhoneNumberInput'
  },
  AdditionalDetailForm: {
    component: AdditionalDetailForm,
    path: '/AdditionalDetailForm'
  },
  Settings5: {
    component: Settings5,
    path: '/Settings5'
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: '/UserProfileBasicBlock'
  },
  RequestManagement: {
    component: RequestManagement,
    path: '/RequestManagement'
  },
  LeadManagement: {
    component: LeadManagement,
    path: '/LeadManagement'
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  Notifications: {
    component: Notifications,
    path: '/Notifications'
  },
  MobileAccountLoginBlock: {
    component: MobileAccountLoginBlock,
    path: '/MobileAccountLoginBlock'
  },

  DashboardGeneral: {
    component: DashboardGeneral,
    path: '/DashboardGeneral',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },

  DashboardTicket: {
    component: DashboardTicket,
    path: '/DashboardTicket'
  },

  DashboardActions: {
    component: DashboardActions,
    path: '/DashboardActions'
  },

  DashboardBudget: {
    component: DashboardBudget,
    path: '/DashboardBudget'
  },

  BudgetDetails: {
    component: BudgetDetails,
    path: '/BudgetDetails'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword'
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP'
  },
  // RolesPermissions2: {
  //   component: RolesPermissions2,
  //   path: '/RolesPermissions2'
  // },
  Chatbot6: {
    component: Chatbot6,
    path: '/Chatbot6'
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: '/EmailNotifications'
  },
  BroadcastMessage: {
    component: BroadcastMessage,
    path: '/BroadcastMessage'
  },
  // BulkUploading: {
  //   component: BulkUploading,
  //   path: '/BulkUploading'
  // },
  Location: {
    component: Location,
    path: '/Location'
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: '/SocialMediaAccountLoginScreen'
  },
  Invitefriends: {
    component: Invitefriends,
    path: '/Invitefriends'
  },
  ReviewAndApproval: {
    component: ReviewAndApproval,
    path: '/ReviewAndApproval'
  },
  LanguageOptions: {
    component: LanguageOptions,
    path: '/LanguageOptions'
  },
  Polling: {
    component: Polling,
    path: '/Polling'
  },
  Customisableusersubscriptions: {
    component: Customisableusersubscriptions,
    path: '/Customisableusersubscriptions'
  },
  SubscriptionDetails: {
    component: SubscriptionDetails,
    path: '/SubscriptionDetails'
  },
  Interactivefaqs: {
    component: Interactivefaqs,
    path: '/Interactivefaqs'
  },
  AddInteractivefaqs: {
    component: AddInteractivefaqs,
    path: '/AddInteractivefaqs'
  },
  PhotoLibrary3: {
    component: PhotoLibrary3,
    path: '/PhotoLibrary3'
  },
  ExpenseTracking: {
    component: ExpenseTracking,
    path: '/ExpenseTracking'
  },
  Search: {
    component: Search,
    path: '/Search'
  },
  MultipleCurrencySupport: {
    component: MultipleCurrencySupport,
    path: '/MultipleCurrencySupport'
  },
  NewPassword: {
    component: NewPassword,
    path: '/NewPassword'
  },
  Feedback: {
    component: Feedback,
    path: '/Feedback'
  },
  // Contactus: {
  //   component: Contactus,
  //   path: '/Contactus'
  // },
  AddContactus: {
    component: AddContactus,
    path: '/AddContactus'
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: '/CountryCodeSelector'
  },
  TaskAllocator: {
    component: TaskAllocator,
    path: '/TaskAllocator'
  },
  FriendList: {
    component: FriendList,
    path: '/FriendList'
  },
  FormApprovalWorkflow: {
    component: FormApprovalWorkflow,
    path: '/FormApprovalWorkflow'
  },
  AdminConsole3: {
    component: AdminConsole3,
    path: '/AdminConsole3'
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: '/OTPInputAuth'
  },
  Maps: {
    component: Maps,
    path: '/Maps'
  },
  // Notes: {
  //   component: Notes,
  //   path: '/Notes'
  // },
  TaxCalculator: {
    component: TaxCalculator,
    path: '/TaxCalculator'
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: '/Pushnotifications'
  },
  BudgetingForecasting: {
    component: BudgetingForecasting,
    path: '/BudgetingForecasting'
  },
  Videos: {
    component: Videos,
    path: '/Videos'
  },
  ContentFlag: {
    component: ContentFlag,
    path: '/ContentFlag'
  },
  StoreCredits: {
    component: StoreCredits,
    path: '/StoreCredits'
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: '/InvoiceBilling'
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: '/EmailAccountRegistration'
  },
  ContentManagement: {
    component: ContentManagement,
    path: '/ContentManagement'
  },
  PricingEngine2: {
    component: PricingEngine2,
    path: '/PricingEngine2'
  },
  Chat9: {
    component: Chat9,
    path: '/Chat9'
  },
  CollectTransactionFees: {
    component: CollectTransactionFees,
    path: '/CollectTransactionFees'
  },
  // Analytics: {
  //   component: Analytics,
  //   path: "/Analytics"
  // },
  Customform: {
    component: Customform,
    path: '/Customform'
  },
  PhoneNumberInput: {
    component: PhoneNumberInput,
    path: '/PhoneNumberInput'
  },
  AdditionalDetailForm: {
    component: AdditionalDetailForm,
    path: '/AdditionalDetailForm'
  },
  Settings5: {
    component: Settings5,
    path: '/Settings5'
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: '/UserProfileBasicBlock'
  },
  RequestManagement: {
    component: RequestManagement,
    path: '/RequestManagement'
  },
  LeadManagement: {
    component: LeadManagement,
    path: '/LeadManagement'
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  Notifications: {
    component: Notifications,
    path: '/Notifications'
  },
  MobileAccountLoginBlock: {
    component: MobileAccountLoginBlock,
    path: '/MobileAccountLoginBlock'
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
  //community-managment
  CommunityUserProfile:{
    component: CommunityUserProfile,
    path: '/CommunityUserProfile'
  },
  GaMembers:{
    component:GaMembers,
    path:'/GaMembers'
  },
  ResidentsProfile:{
    component:ResidentsProfile,
    path:"/ResidentsProfile"
  },
  PropertysManager:{
    component:PropertysManager,
    path:"/PropertysManager"
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  render() {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    return (
      <View style={{ height: '100%', width: '100%' }}>
        <Toaster className="toast" position="top-right" reverseOrder={false} />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
