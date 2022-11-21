// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';

import { ROLE } from '../../framework/src/Enum';
import { Toaster } from 'react-hot-toast';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
// import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import Chatbot6 from '../../blocks/Chatbot6/src/Chatbot6';
import EmailNotifications from '../../blocks/EmailNotifications/src/EmailNotifications';
import BroadcastMessage from '../../blocks/BroadcastMessage/src/BroadcastMessage';
// import BulkUploading from "../../blocks/BulkUploading/src/BulkUploading";
import Location from '../../blocks/location/src/Location';
import SocialMediaAccountLoginScreen from '../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import Invitefriends from '../../blocks/invitefriends/src/Invitefriends';
// import ReviewAndApproval from '../../blocks/ReviewAndApproval/src/ReviewAndApproval';
import LanguageOptions from '../../blocks/LanguageOptions/src/LanguageOptions';
import Polling from '../../blocks/Polling/src/Polling';
import Customisableusersubscriptions from '../../blocks/customisableusersubscriptions/src/Customisableusersubscriptions';
import SubscriptionDetails from '../../blocks/customisableusersubscriptions/src/SubscriptionDetails';
import Interactivefaqs from '../../blocks/interactivefaqs/src/Interactivefaqs';
import AddInteractivefaqs from '../../blocks/interactivefaqs/src/AddInteractivefaqs';
import PhotoLibrary3 from '../../blocks/PhotoLibrary3/src/PhotoLibrary3';
// import ExpenseTracking from '../../blocks/ExpenseTracking/src/ExpenseTracking';
import Search from '../../blocks/search/src/Search';
import MultipleCurrencySupport from '../../blocks/multiplecurrencysupport/src/MultipleCurrencySupport';
import NewPassword from '../../blocks/forgot-password/src/NewPassword';
import Feedback from '../../blocks/Feedback/src/Feedback';
// import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from '../../blocks/contactus/src/AddContactus';
import CountryCodeSelector from '../../blocks/country-code-selector/src/CountryCodeSelector';
// import TaskAllocator from '../../blocks/TaskAllocator/src/TaskAllocator';
import FriendList from '../../blocks/FriendList/src/FriendList';
import FormApprovalWorkflow from '../../blocks/FormApprovalWorkflow/src/FormApprovalWorkflow';
import AdminConsole3 from '../../blocks/AdminConsole3/src/AdminConsole3';
import OTPInputAuth from '../../blocks/otp-input-confirmation/src/OTPInputAuth';
import Maps from '../../blocks/maps/src/Maps';
// import Notes from "../../blocks/Notes/src/Notes";
import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlock';
import TaxCalculator from '../../blocks/TaxCalculator/src/TaxCalculator';
import Pushnotifications from '../../blocks/pushnotifications/src/Pushnotifications';
import BudgetingForecasting from '../../blocks/BudgetingForecasting/src/BudgetingForecasting';
import Videos from '../../blocks/videos/src/Videos';
import ContentFlag from '../../blocks/ContentFlag/src/ContentFlag';
import StoreCredits from '../../blocks/StoreCredits/src/StoreCredits';
import InvoiceBilling from '../../blocks/InvoiceBilling/src/InvoiceBilling';
import EmailAccountRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistration';
// import ContentManagement from '../../blocks/ContentManagement/src/ContentManagement';
import PricingEngine2 from '../../blocks/PricingEngine2/src/PricingEngine2';
import Chat9 from '../../blocks/Chat9/src/Chat9';
import CollectTransactionFees from '../../blocks/CollectTransactionFees/src/CollectTransactionFees';
import Analytics from '../../blocks/analytics/src/Analytics';
import Customform from '../../blocks/customform/src/Customform';
import PhoneNumberInput from '../../blocks/mobile-account-registration/src/PhoneNumberInput';
import AdditionalDetailForm from '../../blocks/mobile-account-registration/src/AdditionalDetailForm';
import Settings5 from '../../blocks/Settings5/src/Settings5';
import UserProfileBasicBlock from '../../blocks/user-profile-basic/src/UserProfileBasicBlock';
import './assets/css/constants/base/global.scss';
import LandingPage from '../../blocks/landingpage/src/LandingPage.web';
import EmailAccountLogin from '../../blocks/email-account-login/src/EmailAccountLogin.web';
import ChairmanLogin from '../../blocks/email-account-login/src/ChairmanLogin.web';
import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword.web';
import ChairmanForgotPassword from '../../blocks/forgot-password/src/ChairmanForgotPassword.web';
import ForgotPasswordOTP from '../../blocks/forgot-password/src/ForgotPasswordOTP.web';
import ChairmanForgotPasswordOTP from '../../blocks/forgot-password/src/ChairmanForgotPasswordOTP.web';
import ChangePassword from '../../blocks/forgot-password/src/ChangePassword.web';
import ChairmanChangePassword from '../../blocks/forgot-password/src/ChairmanChangePassword.web';
import ChangeSuccessfully from '../../blocks/forgot-password/src/ChangeSuccessfully.web';
import ChairmanChangeSuccessfully from '../../blocks/forgot-password/src/ChairmanChangeSuccessfully.web';
import RegistrationRequest from '../../blocks/email-account-login/src/RegistrationRequest.web';
import ChairmanRegistrationRequest from '../../blocks/email-account-login/src/ChairmanRegistrationRequest.web';
import DashboardGeneral from '../../blocks/dashboard/src/DashboardGeneral.web';
import DashboardTicket from '../../blocks/dashboard/src/DashboardTicket.web';
import DashboardActions from '../../blocks/dashboard/src/DashboardActions.web';
import DashboardBudget from '../../blocks/dashboard/src/DashboardBudget.web';
import BudgetDetails from '../../blocks/dashboard/src/BudgetDetails.web';
import CreatePolls from '../../blocks/Polling/src/CreatePolls.web';
import CreateSurveys from '../../blocks/Polling/src/CreateSurveys.web';
import PollPreview from '../../blocks/Polling/src/PollPreview.web';
import SurveyPreview from '../../blocks/Polling/src/SurveyPreview.web';
import SurveyParticipate from '../../blocks/Polling/src/SurveyParticipate.web';
import SurveyDetailsMain from '../../blocks/Polling/src/SurveryDetailsMain.web';
import PollsallData from '../../blocks/Polling/src/PollsallData.web';
import SurveyallData from '../../blocks/Polling/src/SurveyallData.web';
import PollsSurvey from '../../blocks/Polling/src/PollsSurvey.web';
import SurveyReport from '../../blocks/Polling/src/SurveyReport.web';
import SubmitPoll from '../../blocks/Polling/src/SubmitPoll.web';
import SurveyInitial from '../../blocks/Polling/src/SurveyInitial.web';
import OwnerDashboard from '../../blocks/dashboard/src/OwnerDashboard.web';
import ResidentDashboard from '../../blocks/dashboard/src/ResidentDashboard.web';
import PollVoteSubmitted from '../../blocks/Polling/src/PollVoteSubmitted.web';
import PollResponseCompleted from '../../blocks/Polling/src/PollResponseCompleted.web';
import SurveyMyResponse from '../../blocks/Polling/src/SurveyMyResponse.web';
import SurveySubmitted from '../../blocks/Polling/src/SurveySubmitted';
import VeichleList from '../../blocks/customform/src/VeichleList.web';
import NewVeichleList from '../../blocks/customform/src/NewVehicle.web';
import NewFamily from '../../blocks/customform/src/NewFamily.web';
import EditVeichleList from '../../blocks/customform/src/EditVehicle.web';
import EditFamily from '../../blocks/customform/src/EditFamily.web';
import EditRequest from '../../blocks/customform/src/EditRequest.web';
import NewRequest from '../../blocks/customform/src/NewRequest.web';
import ManagerList from '../../blocks/customform/src/ManagerList.web';
import Inbox from '../../blocks/customform/src/Inbox.web';
import IncidentChat from '../../blocks/customform/src/IncidentChat.web';
import ChairmanChat from '../../blocks/customform/src/ChairmanChat.web';

import Chatbox from '../../blocks/customform/src/Chatbox.web';
// import RequestManagement from "../../blocks/RequestManagement/src/RequestManagement";
import LeadManagement from '../../blocks/LeadManagement/src/LeadManagement';
import SocialMediaAccountRegistrationScreen from '../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
// import Notifications from '../../blocks/notifications/src/Notifications';
import MobileAccountLoginBlock from '../../blocks/mobile-account-login/src/MobileAccountLoginBlock';
import Registration from '../../blocks/email-account-registration/src/Registration.web';
import OwnerRegistration from '../../blocks/email-account-registration/src/OwnerRegistration.web';
import ManagerRegistration from '../../blocks/email-account-registration/src/ManagerRegistration.web';
import SelectOwner from '../../blocks/email-account-registration/src/SelectOwner.web';

import VerifyOTP from '../../blocks/email-account-registration/src/VerifyOTP.web';
import SelectType from '../../blocks/email-account-registration/src/SelectType.web';
import UnitRegister from '../../blocks/email-account-registration/src/UnitRegister.web';
import RegisterUnitManually from '../../blocks/email-account-registration/src/RegisterUnitManually.web';
import RegisterAddressLink from '../../blocks/email-account-registration/src/RegisterAddressLink.web';

import RegistrationRequestSignup from '../../blocks/email-account-registration/src/RegistrationRequestSignup.web';

import SearchComplex from '../../blocks/email-account-registration/src/SearchComplex.web';

import Address from '../../blocks/email-account-registration/src/Address.web';

import ViewVeichle from '../../blocks/customform/src/ViewVehicle.web';
import FamilyList from '../../blocks/customform/src/FamilyList.web';

import ManagerViewVehicle from '../../blocks/customform/src/ManagerViewVehicle.web';

import PollDetails from '../../blocks/Polling/src/PollDetails.web';
import PollReport from '../../blocks/Polling/src/PollReport.web';
import CreateIncident from '../../blocks/ContentManagement/src/CreateIncident.web';
import IncidentDetails from '../../blocks/ContentManagement/src/IncidentDetails.web';
import IncidentListing from '../../blocks/ContentManagement/src/IncidentListing.web';
import IncidentReportedSuccessfully from '../../blocks/ContentManagement/src/IncidentReportedSuccessfully.web';
import IncidentPreview from '../../blocks/ContentManagement/src/IncidentPreview.web';
import IncidentManagement from '../../blocks/ContentManagement/src/IncidentManagement.web';
import IncidentManagementDetail from '../../blocks/ContentManagement/src/IncidentManagementDetail.web';

import ClassifiedManagerListing from '../../blocks/ContentManagement/src/ClassifiedManagerListing.web';
import ClassifiedManagerDetail from '../../blocks/ContentManagement/src/ClassifiedManagerDetail.web';
import CreateClassified from '../../blocks/ContentManagement/src/CreateClassified.web';
import ClassifiedType from '../../blocks/ContentManagement/src/ClassifiedType.web';
import ClassifiedListing from '../../blocks/ContentManagement/src/ClassifiedListing.web';
import ClassifiedReportedSuccessfully from '../../blocks/ContentManagement/src/ClassifiedReportedSuccessfully.web';
import ClassifiedPreview from '../../blocks/ContentManagement/src/ClassifiedPreview.web';
import ClassifiedDetails from '../../blocks/ContentManagement/src/ClassifiedDetails.web';
import ClassifiedEditSuccessfully from '../../blocks/ContentManagement/src/ClassifiedEditSuccessfully.web';

import NeighboursDetails from '../../blocks/search/src/NeighboursDetails.web';
import NeighboursListing from '../../blocks/search/src/NeighboursListing.web';

import FacilityReservationListing from '../../blocks/RequestManagement/src/FacilityReservationListing.web';
import FacilityReservationDetails from '../../blocks/RequestManagement/src/FacilityReservationDetails.web';
import FacilityReservation from '../../blocks/RequestManagement/src/FacilityReservation.web';
import FacilityReservationReportedSuccessfully from '../../blocks/RequestManagement/src/FacilityReservationReportedSuccessfully.web';
import CreateFacilityReservation from '../../blocks/RequestManagement/src/CreateFacilityReservation.web';

import FacilityManagerDetail from '../../blocks/RequestManagement/src/FacilityManagerDetail.web';
import ManagerFacilityReservation from '../../blocks/RequestManagement/src/ManagerFacilityReservation.web';


// Help
import FaqChairman from '../../blocks/contactus/src/FaqChairman.web';
import FaqOwner from '../../blocks/contactus/src/FaqOwner.web';
import FaqResident from '../../blocks/contactus/src/FaqResident.web';
import ContactUsChairman from '../../blocks/contactus/src/ContactUs.web';
import SubscriptionDetail from '../../blocks/contactus/src/SubscriptionDetails.web';

// Document
import DocumentChairman from '../../blocks/Notes/src/DocumentChairman.web';
import DocumentListChairman from '../../blocks/Notes/src/DocumentListChairman.web';
import DocumentViewChairman from '../../blocks/Notes/src/DocumentViewChairman.web';
import PersonalDocument from '../../blocks/Notes/src/PersonalDocuments.web';
import PersonalDocumentList from '../../blocks/Notes/src/PersonalDocumentList.web';
import ViewPersonalDocument from '../../blocks/Notes/src/ViewPersonalDocument.web';
import BuildingDocuments from '../../blocks/Notes/src/BuildingDocuments.web';
import BuildingDocumentList from '../../blocks/Notes/src/BuildingDocumentList.web';
import ViewBuildingDocument from '../../blocks/Notes/src/ViewBuildingDocument.web';

// Contract
import ContractsList from '../../blocks/RolesPermissions2/src/ContractsList.web';
import ContractDetail from '../../blocks/RolesPermissions2/src/ContractDetail.web';
import TemplateDetail from '../../blocks/RolesPermissions2/src/TemplateDetail.web';
import IssueContract from '../../blocks/RolesPermissions2/src/IssueContract.web';
import IssueLease from '../../blocks/RolesPermissions2/src/IssueLease.web';
import SelectedTemplate from '../../blocks/RolesPermissions2/src/SelectedTemplate.web';
import LeaseForm from '../../blocks/RolesPermissions2/src/LeaseForm.web';
import ChangedSelectedTemplate from '../../blocks/RolesPermissions2/src/ChangedSelectedTemplate.web';
import ReviewTemplate from '../../blocks/RolesPermissions2/src/ReviewTemplate.web';
import AddCondition from '../../blocks/RolesPermissions2/src/AddCondition.web';
import RenewContract from '../../blocks/RolesPermissions2/src/RenewContract.web';

// Meetings
import ChairmanScheduledMeeting from '../../blocks/BulkUploading/src/ScheduledMeeting.web';
import ScheduledMeetingDetails from '../../blocks/BulkUploading/src/ScheduledMeetingDetails.web';
import ChairmanMeetingMinutes from '../../blocks/BulkUploading/src/MeetingMinutes.web';
import MeetingMinuteDetails from '../../blocks/BulkUploading/src/MeetingMinuteDetails.web';
import MyMeetings from '../../blocks/BulkUploading/src/MyMeetings.web';
import MyMeetingDetail from '../../blocks/BulkUploading/src/MyMeetingDetail.web';
import MyMeetingMinuteDetail from '../../blocks/BulkUploading/src/MyMeetingMinuteDetail.web';
import MeetingMinuteNote from '../../blocks/BulkUploading/src/MeetingMinuteNote.web';

import ViewInvoices from '../../blocks/InvoiceBilling/src/ViewInvoices.web';
import ViewReceipt from '../../blocks/InvoiceBilling/src/ViewReceipt.web';
import InvoicesDetails from '../../blocks/InvoiceBilling/src/InvoicesDetails.web';
import ReceiptsDetails from '../../blocks/InvoiceBilling/src/ReceiptsDetails.web';
import CharmainInvoices from '../../blocks/InvoiceBilling/src/CharmainInvoices.web';

import ChairmanProfile from '../../blocks/Settings5/src/ChairmanProfile.web';
import Profile from '../../blocks/user-profile-basic/src/Profile.web';
import ChairmenProfile from '../../blocks/user-profile-basic/src/ChairmenProfile.web';

import EditProfile from '../../blocks/user-profile-basic/src/EditProfile.web';
import PublicView from '../../blocks/user-profile-basic/src/PublicView.web';

import CommunityUserProfile from '../../blocks/user-profile-basic/src/CommunityUserProfile.web';
import GaMembers from '../../blocks/user-profile-basic/src/GaMembers';
import ResidentsProfile from '../../blocks/user-profile-basic/src/ResidentsProfile.web';
import PropertysManager from '../../blocks/user-profile-basic/src/PropertysManager.web';
import Suggestions from '../../blocks/user-profile-basic/src/Suggestions.web';
import SuggestionDetails from '../../blocks/user-profile-basic/src/SuggestionDetails.web';
import Announcements from '../../blocks/user-profile-basic/src/Announcements.web';
import AnnouncementDetails from '../../blocks/user-profile-basic/src/AnnouncementDetails.web';
import CommunityRequestManagement from '../../blocks/user-profile-basic/src/CommunityRequestManagement.web';

import SentInvitation from '../../blocks/user-profile-basic/src/SentInvitation.web';
import PendingRequest from '../../blocks/user-profile-basic/src/PendingRequest.web';
import AwaitingAcceptece from '../../blocks/user-profile-basic/src/AwaitingAcceptece.web';
import UserDetailedProfile from '../../blocks/user-profile-basic/src/UserDetailedProfile.web';

// Announcement Imports
import Announcement from '../../blocks/BroadcastMessage/src/Announcement.web';
import BuildingAnnouncement from '../../blocks/BroadcastMessage/src/BuildingAnnouncement.web';
import AnnouncementInfo from '../../blocks/BroadcastMessage/src/AnnouncementDetails.web';

// Complex and Appartment
import Buildings from '../../blocks/LeadManagement/src/Buildings.web';
import Complex from '../../blocks/LeadManagement/src/Complex.web';
import UnitDetails from '../../blocks/LeadManagement/src/UnitDetails.web';
import SharedArea from '../../blocks/LeadManagement/src/SharedArea.web';
import OwnerComplex from '../../blocks/LeadManagement/src/OwnerComplex.web';
import OwnerBuildings from '../../blocks/LeadManagement/src/OwnerBuildings.web';

// Visitor Imports
import Visitors from '../../blocks/invitefriends/src/Visitors.web';
import PastVisitors from '../../blocks/invitefriends/src/PastVisitors.web';
import ScheduledVisitors from '../../blocks/invitefriends/src/ScheduledVisitors.web';
import VisitorDetails from '../../blocks/invitefriends/src/VisitorDetails.web';
import VisitorAddSuccess from '../../blocks/invitefriends/src/VisitorAdded';
import VisitorUpdateSuccess from '../../blocks/invitefriends/src/VisitorUpdated';
import VisitorAdd from '../../blocks/invitefriends/src/VisitorAdd.web';
import VisitorList from '../../blocks/invitefriends/src/VisitorsList.web';
import Unit from '../../blocks/invitefriends/src/Unit.web';
import UnitGeneralDetails from '../../blocks/invitefriends/src/UnitGeneralDetails.web';

import VisitorsDetails from '../../blocks/invitefriends/src/VisitorDetailsManager.web';

// Register Tenant
import TenantList from '../../blocks/RequestManagement/src/TenantList.web';
import TenantDetails from '../../blocks/RequestManagement/src/TenantDetails.web';
import RegisterTenant from '../../blocks/RequestManagement/src/RegisterTenant.web';
import EditTenant from '../../blocks/RequestManagement/src/EditTenant.web';

// My Team Imports
import MyTeam from '../../blocks/FriendList/src/MyTeam.web';
import MyTeamCore from '../../blocks/FriendList/src/MyTeamCore.web';
import MyTeamUserDetails from '../../blocks/FriendList/src/MyTeamUserDetails.web';
import ChairmanNominationMain from '../../blocks/FriendList/src/ChairmanNominationMain.web';
import NominationDetails from '../../blocks/FriendList/src/NominationDetails.web';
import NominationSuccess from '../../blocks/FriendList/src/NominationAdded';
import NominationUpdated from '../../blocks/FriendList/src/NominationUpdated';
import ChairmanNominations from '../../blocks/FriendList/src/ChairmanNomination';
import ChairmanNominationDetails from '../../blocks/FriendList/src/ChairmanNominationDetails.web';
import NominateMySelf from '../../blocks/FriendList/src/NominateMySelf.web';
import MyNomination from '../../blocks/FriendList/src/MyNomination.web';
import TaskManagement from '../../blocks/FriendList/src/TaskManagement.web';

// Fees & Payment Imports
import FeesAndPayment from '../../blocks/CollectTransactionFees/src/FeesAndPayments.web';
import ViewMyInvoices from '../../blocks/CollectTransactionFees/src/ViewMyInvoices.web';
import InvoiceDetails from '../../blocks/CollectTransactionFees/src/InvoiceDetails.web';
import ViewMyReceipts from '../../blocks/CollectTransactionFees/src/ViewMyReceipts.web';
import ReceiptDetails from '../../blocks/CollectTransactionFees/src/ReceiptDetails.web';
import PreviousPayments from '../../blocks/CollectTransactionFees/src/PreviousPayments.web';
import PaymentDetails from '../../blocks/CollectTransactionFees/src/PaymentDetails.web';
import BudgetSpending from '../../blocks/CollectTransactionFees/src/BudgetSpending.web';
import BudgetSpendingDetails from '../../blocks/CollectTransactionFees/src/SpentDetails.web';
import BuildingBudget from '../../blocks/CollectTransactionFees/src/BuildingBudget.web';
import MyManagementFee from '../../blocks/CollectTransactionFees/src/ManagementFee.web';

// Owner Side
import MyInvoicesAndReceipts from '../../blocks/CollectTransactionFees/src/MyInvoicesAndReceipts.web';
import MyInvoices from '../../blocks/CollectTransactionFees/src/MyInvoices.web';
import MyInvoiceDetails from '../../blocks/CollectTransactionFees/src/MyInvoiceDetails.web';
import MyReceipts from '../../blocks/CollectTransactionFees/src/MyReceipts.web';
import MyReceiptsDetails from '../../blocks/CollectTransactionFees/src/MyReceiptsDetails.web';

// Chairman Side
import CharmainReceipts from '../../blocks/InvoiceBilling/src/CharmainReceipts.web';

// Rent Payments
import RentPayments from '../../blocks/PricingEngine2/src/RentPayments.web';
import RentUnitLists from '../../blocks/PricingEngine2/src/RentUnitLists.web';
import ViewMyRents from '../../blocks/PricingEngine2/src/ViewMyRents.web';
import RentDetails from '../../blocks/PricingEngine2/src/RentDetails.web';
import AddRentPayment from '../../blocks/PricingEngine2/src/RegisterRentPayment.web';

// Reports
import ReportDashboard from '../../blocks/ExpenseTracking/src/ReportDashboard.web';
import BudgetReport from '../../blocks/ExpenseTracking/src/BudgetReport.web';
import ExpenseReport from '../../blocks/ExpenseTracking/src/ExpenseReport.web';
import AuditReport from '../../blocks/ExpenseTracking/src/AuditReport.web';
import ManagementFeeReport from '../../blocks/ExpenseTracking/src/ManagementFeeReport.web';

// My Unit
import MyUnitList from '../../blocks/TaskAllocator/src/MyUnitList.web';
import RegisterMyUnit from '../../blocks/TaskAllocator/src/RegisterUnit.web';
import RegisterMyUnitSuccess from '../../blocks/TaskAllocator/src/RegisterUnitSuccess.web';
import MyUnitDetails from '../../blocks/TaskAllocator/src/UnitDetails.web';
import RentHistory from '../../blocks/TaskAllocator/src/RentHistory.web';
import EditMyUnit from '../../blocks/TaskAllocator/src/EditUnit.web';
import TenantProfile from '../../blocks/TaskAllocator/src/TenantProfile.web';

// Property Manager
import PropertyManagerList from '../../blocks/ReviewAndApproval/src/PropertyManagerList.web';
import RegisterPropertyManager from '../../blocks/ReviewAndApproval/src/RegisterPropertyManager.web';
import RegisterPropertyManagerSuccess from '../../blocks/ReviewAndApproval/src/PropertyManagerSuccess.web';
import PropertyManagerDetails from '../../blocks/ReviewAndApproval/src/PropertyManagerDetails.web';
import PropertyManagerRequest from '../../blocks/ReviewAndApproval/src/PropertyManagerRequest.web';
import EditPropertyManager from '../../blocks/ReviewAndApproval/src/EditPropertyManager.web';

// My Lease
import MyLeaseList from '../../blocks/ContentManagement/src/MyLeaseList.web';

// Notification
import OwnerNotification from '../../blocks/notifications/src/OwnerNotification.web';
import ResidentNotification from '../../blocks/notifications/src/ResidentNotification.web';
import ChairmanNotification from '../../blocks/notifications/src/ChairmanNotification.web';
import ManagerNotification from '../../blocks/notifications/src/ManagerNotification.web';

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
    exact: true
    // roles: [ROLE.PRIVATE]
  },
  ChairmenProfile: {
    component: ChairmenProfile,
    path: '/ChairmenProfile',
    exact: true
    // roles: [ROLE.PRIVATE]
  },
  IncidentChat: {
    component: IncidentChat,
    path: '/IncidentChat',
    exact: true
    // roles: [ROLE.PRIVATE]
  },
  PublicView: {
    component: PublicView,
    path: '/PublicView',
    exact: true
    // roles: [ROLE.PRIVATE]
  },
  EditProfile: {
    component: EditProfile,
    path: '/editprofile',
    exact: true
    // roles: [ROLE.PRIVATE]
  },
  Inbox: {
    component: Inbox,
    path: '/inbox',
    exact: true
  },
  ChairmanChat: {
    component: ChairmanChat,
    path: '/ChairmanChat',
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
  CharmainReceipts: {
    component: CharmainReceipts,
    path: '/CharmainReceipts',
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
  ClassifiedManagerListing: {
    component: ClassifiedManagerListing,
    path: '/ClassifiedManagerListing',
    exact: true
  },
  ClassifiedManagerDetail: {
    component: ClassifiedManagerDetail,
    path: '/ClassifiedManagerDetail',
    exact: true
  },
  CreateClassified: {
    component: CreateClassified,
    path: '/CreateClassified',
    exact: true
  },
  ClassifiedType: {
    component: ClassifiedType,
    path: '/ClassifiedType',
    exact: true
  },
  ClassifiedDetails: {
    component: ClassifiedDetails,
    path: '/ClassifiedDetails',
    exact: true
  },
  ClassifiedListing: {
    component: ClassifiedListing,
    path: '/ClassifiedListing',
    exact: true
  },
  ClassifiedPreview: {
    component: ClassifiedPreview,
    path: '/ClassifiedPreview',
    exact: true
  },
  ClassifiedReportedSuccessfully: {
    component: ClassifiedReportedSuccessfully,
    path: '/ClassifiedReportedSuccessfully',
    exact: true
  },

  ClassifiedEditSuccessfully: {
    component: ClassifiedEditSuccessfully,
    path: '/ClassifiedEditSuccessfully',
    exact: true
  },
  FacilityReservationListing: {
    component: FacilityReservationListing,
    path: '/FacilityReservationListing',
    exact: true
  },
  FacilityReservationDetails: {
    component: FacilityReservationDetails,
    path: '/FacilityReservationDetails',
    exact: true
  },
  FacilityReservation: {
    component: FacilityReservation,
    path: '/FacilityReservation',
    exact: true
  },
  CreateFacilityReservation: {
    component: CreateFacilityReservation,
    path: '/CreateFacilityReservation',
    exact: true
  },
  FacilityReservationReportedSuccessfully: {
    component: FacilityReservationReportedSuccessfully,
    path: '/FacilityReservationReportedSuccessfully',
    exact: true
  },

  FacilityManagerDetail: {
    component: FacilityManagerDetail,
    path: '/FacilityManagerDetail',
    exact: true
  },
 
  ManagerFacilityReservation: {
    component: ManagerFacilityReservation,
    path: '/ManagerFacilityReservation',
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
  // ReviewAndApproval: {
  //   component: ReviewAndApproval,
  //   path: '/ReviewAndApproval'
  // },
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
    path: '/CreatePolls'
  },

  TakeSurvey: {
    component: SurveyInitial,
    path: '/TakeSurvey'
  },

  SurveyFill: {
    component: SurveyParticipate,
    path: '/SurveyParticipate'
  },

  SurveyResponse: {
    component: SurveyMyResponse,
    path: '/SurveyResponse'
  },

  SurveySuccess: {
    component: SurveySubmitted,
    path: '/SurveySuccess'
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

  SurveyDetails: {
    component: SurveyDetailsMain,
    path: '/SurveyDetails'
  },

  SurveyReport: {
    component: SurveyReport,
    path: '/SurveyReport'
  },

  PollReport: {
    component: PollReport,
    path: '/PollReport'
  },

  PollResponseCompleted: {
    component: PollResponseCompleted,
    path: '/PollResponseCompleted'
  },

  OwnerDashboard: {
    component: OwnerDashboard,
    path: '/OwnerDashboard',
    exact: true,
    roles: [ROLE.OWNER, ROLE.PROPERTY_MANAGER]
  },
  ResidentDashboard: {
    component: ResidentDashboard,
    path: '/ResidentDashboard',
    exact: true,
    roles: [ROLE.OWNER_RESIDENT, ROLE.TENANT]
  },
  // Chairman - Help
  FaqChairman: {
    component: FaqChairman,
    path: '/FaqChairman',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  FaqOwner: {
    component: FaqOwner,
    path: '/FaqOwner',
    exact: true,
    roles: [ROLE.OWNER, ROLE.PROPERTY_MANAGER]
  },
  FaqResident: {
    component: FaqResident,
    path: '/FaqResident',
    exact: true,
    roles: [ROLE.OWNER_RESIDENT, ROLE.TENANT]
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
  RenewContract: {
    component: RenewContract,
    path: '/Contract/:id/Renew',
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
  // SelectedTemplate: {
  //   component: SelectedTemplate,
  //   path: '/IssueLease/:templateId',
  //   exact: true
  // },
  SelectedTemplateTwo: {
    component: SelectedTemplate,
    path: '/IssueContract/:templateId',
    exact: true
  },
  LeaseFormIssueLease: {
    component: LeaseForm,
    path: '/IssueContract/:templateId/LeaseForm',
    exact: true
  },
  ChangedSelectedTemplate: {
    component: ChangedSelectedTemplate,
    path: '/IssueContract/:templateId/LeaseForm/Template',
    exact: true
  },
  AddCondition: {
    component: AddCondition,
    path: '/IssueContract/:templateId/LeaseForm/Template/AddCondition',
    exact: true
  },
  ReviewTemplate: {
    component: ReviewTemplate,
    path: '/IssueContract/:templateId/LeaseForm/Template/Review',
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
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  ChairmanScheduledMeetingDetails: {
    component: ScheduledMeetingDetails,
    path: '/ScheduledMeeting/:id',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  ChairmanMeetingMinutes: {
    component: ChairmanMeetingMinutes,
    path: '/MeetingMinutes',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  ChairmanMeetingMinuteDetails: {
    component: MeetingMinuteDetails,
    path: '/MeetingMinute/:id',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  MeetingMinuteNote: {
    component: MeetingMinuteNote,
    path: '/MeetingMinute/:id/Note',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  ScheduleMeetingMinuteNote: {
    component: MeetingMinuteNote,
    path: '/ScheduledMeeting/:id/Note',
    exact: true,
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
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
  // ExpenseTracking: {
  //   component: ExpenseTracking,
  //   path: '/ExpenseTracking'
  // },
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
  // TaskAllocator: {
  //   component: TaskAllocator,
  //   path: '/TaskAllocator'
  // },
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
  // ContentManagement: {
  //   component: ContentManagement,
  //   path: '/ContentManagement'
  // },
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
  // RequestManagement: {
  //   component: RequestManagement,
  //   path: '/RequestManagement'
  // },
  LeadManagement: {
    component: LeadManagement,
    path: '/LeadManagement'
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  // Notifications: {
  //   component: Notifications,
  //   path: '/Notifications'
  // },
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
  // ReviewAndApproval: {
  //   component: ReviewAndApproval,
  //   path: '/ReviewAndApproval'
  // },
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
  // ExpenseTracking: {
  //   component: ExpenseTracking,
  //   path: '/ExpenseTracking'
  // },
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
  // TaskAllocator: {
  //   component: TaskAllocator,
  //   path: '/TaskAllocator'
  // },
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
  // ContentManagement: {
  //   component: ContentManagement,
  //   path: '/ContentManagement'
  // },
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
  // RequestManagement: {
  //   component: RequestManagement,
  //   path: '/RequestManagement'
  // },
  LeadManagement: {
    component: LeadManagement,
    path: '/LeadManagement'
  },

  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  // Notifications: {
  //   component: Notifications,
  //   path: '/Notifications'
  // },
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
  CommunityUserProfile: {
    component: CommunityUserProfile,
    path: '/CommunityUserProfile'
  },
  GaMembers: {
    component: GaMembers,
    path: '/ga_member'
  },
  resident: {
    component: GaMembers,
    path: '/resident'
  },
  owner: {
    component: GaMembers,
    path: '/owner'
  },
  property_manager: {
    component: GaMembers,
    path: '/property_manager'
  },
  ResidentsProfile: {
    component: ResidentsProfile,
    path: '/ResidentsProfile'
  },
  PropertysManager: {
    component: PropertysManager,
    path: '/PropertysManager'
  },
  Suggestions: {
    component: Suggestions,
    path: '/Suggestions',
    exact: true
  },
  SuggestionDetails: {
    component: SuggestionDetails,
    path: '/SuggestionDetails',
    exact: true
  },

  Announcement: {
    component: Announcement,
    path: '/Announcement',
    exact: true
  },

  BuildingAnnouncement: {
    component: BuildingAnnouncement,
    path: '/BuildingAnnouncement',
    exact: true
  },

  AnnouncementInfo: {
    component: AnnouncementInfo,
    path: '/AnnouncementInfo',
    exact: true
  },

  Announcements: {
    component: Announcements,
    path: '/Announcements',
    exact: true
  },

  AnnouncementDetails: {
    component: AnnouncementDetails,
    path: '/AnnouncementDetails',
    exact: true
  },

  Visitors: {
    component: Visitors,
    path: '/visitors',
    exact: true
  },

  VisitorAdd: {
    component: VisitorAdd,
    path: '/AddVisitor',
    exact: true
  },

  VisitorEdit: {
    component: VisitorAdd,
    path: '/UpdateVisitor/:id',
    exact: true
  },

  PastVisitors: {
    component: PastVisitors,
    path: '/PastVisitors',
    exact: true
  },

  VisitorList: {
    component: VisitorList,
    path: '/VisitorList',
    exact: true
  },
  Unit: {
    component: Unit,
    path: '/Unit',
    exact: true
  },
  UnitGeneralDetails: {
    component: UnitGeneralDetails,
    path: '/UnitGeneralDetails',
    exact: true
  },
  ScheduledVisitors: {
    component: ScheduledVisitors,
    path: '/ScheduledVisitors',
    exact: true
  },

  VisitorDetails: {
    component: VisitorDetails,
    path: '/VisitorDetails',
    exact: true
  },

  VisitorDetailsPast: {
    component: VisitorDetails,
    path: '/VisitorDetails/:type',
    exact: true
  },

  VisitorsDetails: {
    component: VisitorsDetails,
    path: '/VisitorsDetails',
    exact: true
  },

  VisitorAddSuccess: {
    component: VisitorAddSuccess,
    path: '/VisitorAddSuccess',
    exact: true
  },

  VisitorUpdateSuccess: {
    component: VisitorUpdateSuccess,
    path: '/VisitorUpdateSuccess',
    exact: true
  },

  // My Team

  MyTeam: {
    component: MyTeam,
    path: '/TeamMembers',
    exact: true
  },

  MyTeamCore: {
    component: MyTeamCore,
    path: '/TeamMembers/:type',
    exact: true
  },

  TeamUserDetails: {
    component: MyTeamUserDetails,
    path: '/TeamMember/userDetails',
    exact: true
  },

  ChairmanNominationMain: {
    component: ChairmanNominationMain,
    path: '/Nominations',
    exact: true
  },

  NominationDetails: {
    component: NominationDetails,
    path: '/NominationDetails',
    exact: true
  },

  ChairmanNominations: {
    component: ChairmanNominations,
    path: '/ChairmanNominations',
    exact: true
  },

  ChairmanNominationDetails: {
    component: ChairmanNominationDetails,
    path: '/ChairmanNominationDetails',
    exact: true
  },

  NominateMySelf: {
    component: NominateMySelf,
    path: '/NominateMySelf',
    exact: true
  },

  MyNomination: {
    component: MyNomination,
    path: '/MyNomination',
    exact: true
  },

  NominationSuccess: {
    component: NominationSuccess,
    path: '/NominationSuccess',
    exact: true
  },

  NominationUpdated: {
    component: NominationUpdated,
    path: '/NominationUpdated',
    exact: true
  },

  TaskManagement: {
    component: TaskManagement,
    path: '/TaskManagement',
    exact: true
  },

  // RentPayments

  RentPayments: {
    component: RentPayments,
    path: '/RentPayments',
    exact: true
  },

  RentUnitLists: {
    component: RentUnitLists,
    path: '/RentUnitList/:id',
    exact: true
  },

  UnitRentList: {
    component: ViewMyRents,
    path: '/UnitRentList/:id',
    exact: true
  },

  RentDetails: {
    component: RentDetails,
    path: '/RentDetails/:id',
    exact: true
  },

  // Fees & Payment

  FeesAndPayment: {
    component: FeesAndPayment,
    path: '/FeesAndPayment',
    exact: true
  },

  ViewMyInvoices: {
    component: ViewMyInvoices,
    path: '/MyInvoices',
    exact: true
  },

  InvoiceDetails: {
    component: InvoiceDetails,
    path: '/Invoice/:id',
    exact: true
  },

  ViewMyReceipts: {
    component: ViewMyReceipts,
    path: '/MyReceipts',
    exact: true
  },

  ReceiptDetails: {
    component: ReceiptDetails,
    path: '/Receipt/:id',
    exact: true
  },

  PreviousPayments: {
    component: PreviousPayments,
    path: '/PreviousPayments',
    exact: true
  },

  PaymentDetails: {
    component: PaymentDetails,
    path: '/Payment/:id',
    exact: true
  },

  BudgetSpending: {
    component: BudgetSpending,
    path: '/BudgetSpending',
    exact: true
  },

  BudgetSpendingDetails: {
    component: BudgetSpendingDetails,
    path: '/Spent/:id',
    exact: true
  },

  BuildingBudget: {
    component: BuildingBudget,
    path: '/BuildingBudget',
    exact: true
  },
  MyManagementFee: {
    component: MyManagementFee,
    path: '/MyManagementFee',
    exact: true
  },

  MyInvoicesAndReceipts: {
    component: MyInvoicesAndReceipts,
    path: '/InvoicesAndReceipts',
    exact: true
  },

  MyInvoices: {
    component: MyInvoices,
    path: '/Owner/MyInvoices',
    exact: true
  },

  MyInvoiceDetails: {
    component: MyInvoiceDetails,
    path: '/Owner/MyInvoices/:id',
    exact: true
  },

  MyReceipts: {
    component: MyReceipts,
    path: '/Owner/MyReceipts',
    exact: true
  },

  AddRentPayment: {
    component: AddRentPayment,
    path: '/AddRentPayment',
    exact: true
  },

  MyReceiptsDetails: {
    component: MyReceiptsDetails,
    path: '/Owner/MyReceipts/:id',
    exact: true
  },

  CommunityRequestManagement: {
    component: CommunityRequestManagement,
    path: '/CommunityRequestManagement'
  },
  SentInvitation: {
    component: SentInvitation,
    path: '/SentInvitation'
  },
  PendingRequest: {
    component: PendingRequest,
    path: '/PendingRequest'
  },
  AwaitingAcceptece: {
    component: AwaitingAcceptece,
    path: '/AwaitingAcceptece'
  },
  UserDetailedProfile: {
    component: UserDetailedProfile,
    path: '/UserDetailedProfile'
  },
  // Building and Complex
  Buildings: {
    component: Buildings,
    path: '/Building/:id',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  Complex: {
    component: Complex,
    path: '/Complex',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  UnitDetails: {
    component: UnitDetails,
    path: '/UnitDetail/:id',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  SharedArea: {
    component: SharedArea,
    path: '/SharedArea/:id',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER]
  },
  OwnerComplex: {
    component: OwnerComplex,
    path: '/ComplexDetails',
    roles: [ROLE.OWNER, ROLE.OWNER_RESIDENT, ROLE.TENANT]
  },
  OwnerBuildings: {
    component: OwnerBuildings,
    path: '/BuildingDetails/:id',
    roles: [ROLE.OWNER, ROLE.OWNER_RESIDENT, ROLE.TENANT]
  },
  // My Tenant
  TenantList: {
    component: TenantList,
    path: '/Tenants',
    roles: [ROLE.OWNER]
  },
  TenantDetails: {
    component: TenantDetails,
    path: '/Tenant/:id',
    roles: [ROLE.OWNER]
  },
  RegisterTenant: {
    component: RegisterTenant,
    path: '/RegisterTenant',
    roles: [ROLE.OWNER],
    exact: true
  },
  EditTenant: {
    component: EditTenant,
    path: '/EditTenant/:id',
    roles: [ROLE.OWNER],
    exact: true
  },
  // My Unit
  MyUnitList: {
    component: MyUnitList,
    path: '/MyUnitList',
    roles: [ROLE.OWNER],
    exact: true
  },
  RegisterMyUnit: {
    component: RegisterMyUnit,
    path: '/RegisterMyUnit',
    roles: [ROLE.OWNER],
    exact: true
  },
  RegisterMyUnitSuccess: {
    component: RegisterMyUnitSuccess,
    path: '/RegisterMyUnit/Success',
    roles: [ROLE.OWNER],
    exact: true
  },
  MyUnitDetails: {
    component: MyUnitDetails,
    path: '/MyUnitDetails/:id',
    roles: [ROLE.OWNER],
    exact: true
  },
  EditMyUnit: {
    component: EditMyUnit,
    path: '/MyUnitDetails/Edit/:id',
    roles: [ROLE.OWNER],
    exact: true
  },
  RentHistory: {
    component: RentHistory,
    path: '/MyUnitDetails/:id/RentHistory',
    roles: [ROLE.OWNER],
    exact: true
  },
  TenantProfile: {
    component: TenantProfile,
    path: '/TenantProfile/:id',
    roles: [ROLE.PUBLIC],
    exact: true
  },
  // Property Manager
  PropertyManagerList: {
    component: PropertyManagerList,
    path: '/PropertyManagers',
    roles: [ROLE.OWNER],
    exact: true
  },
  PropertyManagerRequest: {
    component: PropertyManagerRequest,
    path: '/PropertyManagers/Request',
    roles: [ROLE.OWNER],
    exact: true
  },
  PropertyManagerDetails: {
    component: PropertyManagerDetails,
    path: '/PropertyManager/:id',
    roles: [ROLE.OWNER],
    exact: true
  },
  EditPropertyManager: {
    component: EditPropertyManager,
    path: '/PropertyManager/Edit/:id',
    roles: [ROLE.OWNER],
    exact: true
  },
  RegisterPropertyManager: {
    component: RegisterPropertyManager,
    path: '/RegisterPropertyManagers',
    roles: [ROLE.OWNER],
    exact: true
  },
  RegisterPropertyManagerSuccess: {
    component: RegisterPropertyManagerSuccess,
    path: '/RegisterPropertyManagers/Success',
    roles: [ROLE.OWNER],
    exact: true
  },
  // Reports
  ReportDashboard: {
    component: ReportDashboard,
    path: '/Reports',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER],
    exact: true
  },
  BudgetReport: {
    component: BudgetReport,
    path: '/BudgetReports',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER],
    exact: true
  },
  ExpenseReport: {
    component: ExpenseReport,
    path: '/ExpenseReports',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER],
    exact: true
  },
  AuditReport: {
    component: AuditReport,
    path: '/AuditReports',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER],
    exact: true
  },
  ManagementFeeReport: {
    component: ManagementFeeReport,
    path: '/ManagementFeeReports',
    roles: [ROLE.CHAIRMAN, ROLE.MANAGER],
    exact: true
  },
  // My Lease
  MyLeaseList: {
    component: MyLeaseList,
    path: '/MyLeaseList',
    roles: [ROLE.TENANT, ROLE.OWNER_RESIDENT],
    exact: true
  },
  // Notification
  OwnerNotification: {
    component: OwnerNotification,
    path: '/OwnerNotifications',
    roles: [ROLE.OWNER, ROLE.PROPERTY_MANAGER],
    exact: true
  },
  ResidentNotification: {
    component: ResidentNotification,
    path: '/ResidentNotifications',
    roles: [ROLE.TENANT, ROLE.OWNER_RESIDENT],
    exact: true
  },
  ChairmanNotification: {
    component: ChairmanNotification,
    path: '/ChairmanNotification',
    roles: [ROLE.CHAIRMAN],
    exact: true
  },
  ManagerNotification: {
    component: ManagerNotification,
    path: '/ManagerNotification',
    roles: [ROLE.MANAGER],
    exact: true
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
