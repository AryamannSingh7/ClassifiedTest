import * as React from "react";
import {
  Grid,
  Box,
  withStyles,
  Container,
  Link,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@material-ui/core";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import DashboardCard from "../../../components/src/DashboardCard";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import DashboardController, { Props } from "./DashboardController.web";
import {
  keyhand,
  BuildingLogo,
  hamburgerIcon,
  globalIcon,
  notification,
  chatIcon,
  SidebarProfile,
  SidebarFee,
  SidebarNeighbor,
  SidebarFaq,
  SidebarLogout,
  SidebarIncident,
  SidebarLogoutDialog,
  DashboardIncident,
  DashboardAnnouncement,
  DashboardVisitor,
  DashboardFacility,
  DashboardFee,
  DashboardPoll,
  DashboardInfo,
  DashboardMeeting,
  DashboardClass,
  DashboardDocument,
  DashboardLease,
  DashboardFamily,
  DashboardSuggestion,
  DashboardVehicle,
  NewNotification,
} from "./assets";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";

const MenuList = [
  {
    name: "Profile",
    url: "profile",
    img: SidebarProfile,
  },
  {
    name: "Fees & Payments",
    url: "/FeesAndPayment",
    img: SidebarFee,
  },
  {
    name: "My Incidents",
    url: "",
    img: SidebarIncident,
  },
  {
    name: "My Neighbors",
    url: "/NeighboursListing",
    img: SidebarNeighbor,
  },
  {
    name: "FAQ",
    url: "/FaqResident",
    img: SidebarFaq,
  },
];

class ResidentDashboard extends DashboardController {
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
    const { t,classes }: any = this.props;

    return (
      <>
        <Box className={classes.ownerDashboard} style={{ background: "#F8F9FE", height: "100vh" }}>
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
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h6" className="bold-text">{t("Building Services")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/IncidentListing">
                      <DashboardCard image={DashboardIncident} heading={t("Incidents")} title={t("Open")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Announcement">
                      <DashboardCard
                        image={DashboardAnnouncement}
                        heading={t("Announcements")}
                        title={t("Total")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Visitors">
                      <DashboardCard
                        image={DashboardVisitor}
                        heading={t("Visitors")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/FeesAndPayment">
                      <DashboardCard
                        image={DashboardFee}
                        heading={t("Management Fees")}
                        title={t("Paid On")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/pollsSurvey">
                      <DashboardCard image={DashboardPoll} heading={t("Survey")} title={t("Ongoing")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/ComplexDetails">
                      <DashboardCard
                        image={DashboardInfo}
                        heading={t("Building Info & Rules")}
                        title={t("Last Uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyMeetings">
                      <DashboardCard
                        image={DashboardMeeting}
                        heading={t("Meetings")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/ClassifiedListing">
                      <DashboardCard
                        image={DashboardClass}
                        heading={t("Classifieds")}
                        title={t("Last Uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={DashboardDocument}
                        heading={t("Building Documents")}
                        title={t("Last Uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h6" className="bold-text">{t("Personal Services")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyLeaseList">
                      <DashboardCard image={DashboardLease} heading={t("My Lease")} title={t("Total")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard
                        image={DashboardVehicle.default}
                        heading={t("My Vehicles")}
                        title={t("Registered")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/familylist">
                      <DashboardCard
                        image={DashboardFamily}
                        heading={t("My Family")}
                        title={t("Registered Members")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/FeesAndPayment">
                      <DashboardCard
                        image={DashboardFee}
                        heading={t("Fees & Payment")}
                        title={t("Last Paid")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/suggestionListing">
                      <DashboardCard
                        image={DashboardSuggestion}
                        heading={t("My Suggestions")}
                        title={t("Total")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={DashboardDocument}
                        heading={t("My Documents")}
                        title={t("Last Uploaded")}
                        value="NA"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/AddRentPayment">
                      <DashboardCard image={keyhand} heading={t("Register Rent Payment")} title={t("Register Rent")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/FacilityReservation">
                      <DashboardCard
                        image={DashboardFacility}
                        heading={t("Facility Reservation")}
                        title={t("Facility Reservation")}
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
              <Typography variant="h6" className="bold-text">{t("Are you sure you want to logout?")}</Typography>
              <Typography variant="body1">{t("You will be returned to the login screen")}</Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.logout()}>{t("Logout")}</Button>
                <Button onClick={() => this.handleLogoutModal()}>{t("Cancel")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withTranslation()(withStyles(DashboardStyleWeb)(ResidentDashboard));

// Customizable Area End
