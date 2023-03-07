import * as React from "react";
import {
  Button,
  Grid,
  Box,
  withStyles,
  Container,
  Link,
  Typography,
  IconButton,
  // MenuItem,
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  BuildingLogo,
  hamburgerIcon,
  globalIcon,
  notification,
  chatIcon,
  keyhand,
  SidebarEmail,
  SidebarFaq,
  SidebarFee,
  SidebarLogout,
  SidebarNeighbor,
  SidebarProfile,
  SidebarUnit,
  SidebarLogoutDialog,
  DashboardUnit,
  DashboardExpense,
  DashboardTenant,
  DashboardContract,
  DashboardMeeting,
  DashboardPoll,
  DashboardDocument,
  DashboardIncident,
  DashboardAnnouncement,
  DashboardExpenseDollar,
  DashboardInfo,
  DashboardVehicle,
  DashboardVisitor,
  DashboardSuggestion,
  DashboardInvoice,
  DashboardReport,
  DashboardManager,
  voting,
  NotificationGreen,
  ExclamationIcon,
  NewNotification,
} from "./assets";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import DashboardCard from "../../../components/src/DashboardCard";
import DashboardBigCard from "../../../components/src/DashboardCard/DashboardBigCard.web";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import DashboardController, { Props } from "./DashboardController.web";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
//@ts-ignore
import Slider from "react-slick";
import moment from "moment";

const MenuList = [
  {
    name: "Profile",
    url: "/profile",
    img: SidebarProfile,
  },
  {
    name: "Fees & Payments",
    url: "",
    img: SidebarFee,
  },
  {
    name: "My Units",
    url: "/MyUnitList",
    img: SidebarUnit,
  },
  {
    name: "My Neighbours",
    url: "/NeighboursListing",
    img: SidebarNeighbor,
  },
  {
    name: "Email Alerts",
    url: "/EmailAlerts",
    img: SidebarEmail,
  },
  {
    name: "FAQ",
    url: "/FaqOwner",
    img: SidebarFaq,
  },
];

const settings = {
  swipeToSlide: true,
  // dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class OwnerDashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  toggleDrawer = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  handleLogoutModal = () => {
    this.setState({ isLogoutModalOpen: !this.state.isLogoutModalOpen });
  };

  handleEngLngChange = () => {
    localStorage.setItem("language", "en");
    i18next.changeLanguage("en");
  };

  handleAreLngChange = () => {
    localStorage.setItem("language", "ar");
    i18next.changeLanguage("ar");
  };

  logout = () => {
    localStorage.clear();
    this.props.navigation.navigate("LandingPage");
  };

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.ownerDashboard} style={{ background: "#F7F9FE", height: "100vh", overflowY:"hidden" }}>
          <Drawer open={this.state.isMenuOpen} onClose={() => this.toggleDrawer()}>
            <Box className="dashboard-sidebar">
              <Box className="close-menu">
                <IconButton onClick={() => this.toggleDrawer()}>
                  <CloseIcon />
                </IconButton>{" "}
                <span>{t("Menu")}</span>
              </Box>
              <Divider />
              <div className="user-info">
                <Avatar alt="Remy Sharp" src={this.state.profileData?.attributes?.profile_pic?.url} />
                <h4 className="bold-text">{this.state.profileData?.attributes?.full_name?.name|| 'N/A'}</h4>
                <p>{this.state.profileData?.attributes?.email?.email|| 'N/A'}</p>
              </div>
              <Divider />
              <List className="menu-list">
                {MenuList.map((menu, index) => (
                  <ListItem key={index}>
                    <Link className="list-box" href={menu.url}>
                      <div className="list-menu">
                        <div className="image">
                          <img src={menu.img} alt="" />
                        </div>
                        <p>{t(menu.name)}</p>
                      </div>
                      <ArrowForwardIosOutlinedIcon style={{ width: "14px", fill: "black" }} />
                    </Link>
                  </ListItem>
                ))}
                <ListItem onClick={() => this.handleLogoutModal()}>
                  <div className="list-box">
                    <div className="list-menu">
                      <div className="image">
                        <img src={SidebarLogout} alt="" />
                      </div>
                      <p>{t("Logout")}</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon style={{ width: "14px" }} />
                  </div>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <div className="left-icon">
                  <IconButton onClick={() => this.toggleDrawer()}>
                    <img src={hamburgerIcon} alt="" />
                  </IconButton>
                  <span className="complex-name">{localStorage.getItem("complexName")}</span>
                </div>
                <div className="right-icon" style={{ display: "flex" }}>
                  <Box>
                    <Menu
                      className="chairman-lang-menu"
                      arrow={true}
                      align="center"
                      menuButton={<img src={globalIcon} alt="GlobalIcon" />}
                    >
                      <MenuItem
                        className={localStorage.getItem("language") === "en" ? "active" : ""}
                        onClick={() => this.handleEngLngChange()}
                      >
                        English
                      </MenuItem>
                      <MenuItem
                        className={localStorage.getItem("language") === "ar" ? "active" : ""}
                        onClick={() => this.handleAreLngChange()}
                      >
                        Arabic
                      </MenuItem>
                    </Menu>
                  </Box>
                  <div>
                    <Link href="/inbox">
                      <img src={chatIcon} alt="GlobalIcon" />
                    </Link>
                  </div>
                  <div>
                    <Link href="/Notifications">
                      {this.state.isNewNotification ? (
                        <img src={NewNotification} alt="GlobalIcon" />
                      ) : (
                        <img src={notification} alt="GlobalIcon" />
                      )}
                    </Link>
                  </div>
                </div>
              </Box>
              <Container className="dashboard">
                <Grid container spacing={1}>
                  <Box className="notification-slider">
                    <Slider ref={(c: any) => (this.slider = c)} {...settings} style={{ marginTop: 15 }}>
                      {this.state.propertyManagerRequest.map((request: any) => {
                        return (
                          <Box
                            className="slide-box"
                            key={request.id}
                            onClick={() => {
                              this.setState(
                                {
                                  property: {
                                    manager: request.attributes.property_manager.name,
                                    building: request.attributes.building_management.name,
                                    unit: request.attributes.apartment_management.data.attributes.apartment_name,
                                    company: request.attributes.property_manager.company_name,
                                  },
                                },
                                () => {
                                  this.handlePropertyManagerModal();
                                }
                              );
                            }}
                          >
                            <Box className="heading">
                              <img src={NotificationGreen} alt="" />
                              <span>Property manager request received</span>
                            </Box>
                            <p>
                              Property manager request received for building{" "}
                              {request.attributes.building_management.name} unit{" "}
                              {request.attributes.apartment_management.data.attributes.apartment_name}.
                            </p>
                          </Box>
                        );
                      })}
                    </Slider>
                  </Box>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h6" className="bold-text">
                      {t("My Real Estate Details")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DashboardCard
                      image={DashboardUnit}
                      heading={t("Number Of Units")}
                      title={t("Total")}
                      value={this.state.realState && this.state.realState.number_of_units.count}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/TotalExpense">
                      <DashboardCard
                        image={DashboardExpense}
                        heading={t("Total Expenses")}
                        title={t("Total Expenses")}
                        value={
                          this.state.realState && this.state.currency + " " + this.state.realState.total_expenses.count
                        }
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Link href="/RentedVsEmpty">
                      <DashboardBigCard
                        FHeader={t("Rented")}
                        fTitle={t("Rented")}
                        fValue={this.state.realState && this.state.realState.rented_vs_empty.rented_unit}
                        sHeader={t("Empty Units")}
                        sTitle={t("Empty")}
                        sValue={this.state.realState && this.state.realState.rented_vs_empty.empty_unit}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Link href="/CollectedVsDue">
                      <DashboardBigCard
                        FHeader={t("Rent Amount Collected")}
                        fTitle={t("Collected")}
                        fValue={
                          this.state.realState &&
                          this.state.currency + " " + this.state.realState.rented_amount_collected_vs_due.rent_collected
                        }
                        sHeader={t("Rent Amount Due")}
                        sTitle={t("Due")}
                        sValue={
                          this.state.realState &&
                          this.state.currency + " " + this.state.realState.rented_amount_collected_vs_due.rent_due
                        }
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Link href="/SpentVsCollected">
                      <DashboardBigCard
                        FHeader={t("Spent Amount")}
                        fTitle={t("Collected")}
                        fValue={
                          this.state.realState &&
                          this.state.currency + " " + this.state.realState.spent_amount_collected_vs_due.spent_amount
                        }
                        sHeader={t("Collected Amount")}
                        sTitle={t("Due")}
                        sValue={
                          this.state.realState &&
                          this.state.currency +
                            " " +
                            this.state.realState.spent_amount_collected_vs_due.collected_amount
                        }
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h6" className="bold-text">
                      {t("Building Categories")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Tenants">
                      <DashboardCard
                        image={DashboardTenant}
                        heading={t("My tenants")}
                        title={t("Total")}
                        value={this.state.buildingCategory && this.state.buildingCategory.my_tenant.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Contracts">
                      <DashboardCard
                        image={DashboardContract}
                        heading={t("Contracts")}
                        title={t("Few will expire after")}
                        value={this.state.buildingCategory && this.state.buildingCategory.contracts.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyMeetings">
                      <DashboardCard
                        image={DashboardMeeting}
                        heading={t("Meetings")}
                        title={t("Scheduled")}
                        value={this.state.buildingCategory && this.state.buildingCategory.meetings.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/pollsSurvey">
                      <DashboardCard
                        image={DashboardPoll}
                        heading={t("Poll / Survey")}
                        title={t("Ongoing")}
                        value={this.state.buildingCategory && this.state.buildingCategory.poll_surveys.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BudgetAndExpenseDetails">
                      <DashboardCard
                        image={DashboardMeeting}
                        heading={t("Budget")}
                        title={t("For FY")}
                        value={this.state.buildingCategory && this.state.buildingCategory.budget.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={DashboardDocument}
                        heading={t("Building Documents")}
                        title={t("Last Uploaded")}
                        value={
                          this.state.buildingCategory &&
                          moment(this.state.buildingCategory.building_documents.count, "DD-MM-YYYY").fromNow()
                        }
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/IncidentListing">
                      <DashboardCard
                        image={DashboardIncident}
                        heading={t("Incidents")}
                        title={t("Open")}
                        value={this.state.buildingCategory && this.state.buildingCategory.incidents.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Announcement">
                      <DashboardCard
                        image={DashboardAnnouncement}
                        heading={t("Announcements")}
                        title={t("Unopened")}
                        value={this.state.buildingCategory && this.state.buildingCategory.announcements.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyExpenseList">
                      <DashboardCard
                        image={DashboardExpenseDollar}
                        heading={t("Expense")}
                        title={t("Last Updated")}
                        value={this.state.buildingCategory && this.state.buildingCategory.expenses.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/ComplexDetails">
                      <DashboardCard
                        image={DashboardInfo}
                        heading={t("Building Info & Rules")}
                        title={t("Last Uploaded")}
                        value={this.state.buildingCategory && this.state.buildingCategory.building_info_and_rules.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/FacilityReservation">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Facility Reservation")}
                        title={t("Facility Listing")}
                        value={this.state.buildingCategory && this.state.buildingCategory.facility_reservations.count}
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h6" className="bold-text">
                      {t("Personal Categories")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard
                        image={DashboardVehicle.default}
                        heading={t("My Vehicles")}
                        title={t("Registered")}
                        value={this.state.personalCategory && this.state.personalCategory.my_vehicle.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Visitors">
                      <DashboardCard
                        image={DashboardVisitor}
                        heading={t("My Visitors")}
                        title={t("Scheduled")}
                        value={this.state.personalCategory && this.state.personalCategory.my_visitor.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/suggestionListing">
                      <DashboardCard
                        image={DashboardSuggestion}
                        heading={t("My Suggestion")}
                        title={t("Total")}
                        value={this.state.personalCategory && this.state.personalCategory.my_suggesition.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/InvoicesAndReceipts">
                      <DashboardCard
                        image={DashboardInvoice}
                        heading={t("My Invoices")}
                        title={t("Last Paid")}
                        value={this.state.personalCategory && this.state.personalCategory.my_invoice.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={DashboardDocument}
                        heading={t("Personal Documents")}
                        title={t("Last Uploaded")}
                        value={this.state.personalCategory && this.state.personalCategory.persoanl_documents.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={DashboardReport}
                        heading={t("Issue a Reports")}
                        title={t("Last Uploaded")}
                        value={this.state.personalCategory && this.state.personalCategory.isssue_report.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PropertyManagers">
                      <DashboardCard
                        image={DashboardManager}
                        heading={t("Property Manager")}
                        title={t("Registered")}
                        value={this.state.personalCategory && this.state.personalCategory.property_manager.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/RentPayments">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Rent Payments")}
                        title={t("Registered")}
                        value={this.state.personalCategory && this.state.personalCategory.rent_payments.count}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/ChairmanNominations">
                      <DashboardCard
                        image={voting}
                        heading={t("Chairman Nominations")}
                        title={t("Chairman And Vice Chairman Nominations")}
                        value="NA"
                      />
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleLogoutModal()}
          open={this.state.isLogoutModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={SidebarLogoutDialog} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Are you sure you want to logout?")}
              </Typography>
              <Typography variant="body1">{t("You will be returned to the login screen")}</Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.logout()}>{t("Logout")}</Button>
                <Button onClick={() => this.handleLogoutModal()}>{t("Cancel")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handlePropertyManagerModal()}
          open={this.state.isPropertyManagerModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Property Manager Request Received")}
              </Typography>
              <Typography variant="body1">
                {this.state.property.manager} is claiming to be your Building {this.state.property.building} Unit{" "}
                {this.state.property.unit} property manager from Company {this.state.property.company}. Do you want to
                give him right to manage your mentioned property?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.props.navigation.navigate("PropertyManagerRequest")}>
                  {t("View Profile")}
                </Button>
                <Button onClick={() => this.handlePropertyManagerModal()}>{t("Close")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withTranslation()(withStyles(DashboardStyleWeb)(OwnerDashboard));

// Customizable Area End
