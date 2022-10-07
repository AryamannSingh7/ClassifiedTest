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
import DashboardController, { Props } from "./DashboardController";
import { BuildingLogo, hamburgerIcon, LogoutDialogIcon, globalIcon, notification, chatIcon, keyhand } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";

const MenuList = [
  {
    name: "Profile",
    url: "profile",
    img: "",
  },
  {
    name: "Fees & Payments",
    url: "",
    img: "",
  },
  {
    name: "My Incidents",
    url: "",
    img: "",
  },
  {
    name: "My Neighbors",
    url: "/NeighboursListing",
    img: "",
  },
  {
    name: "FAQ",
    url: "/FaqResident",
    img: "",
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
    const { t }: any = this.props;
    const { classes }: any = this.props;

    return (
      <>
        <Box className={classes.ownerDashboard} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Drawer open={this.state.isMenuOpen} onClose={() => this.toggleDrawer()}>
            <Box className="dashboard-sidebar">
              <Box className="close-menu" onClick={() => this.toggleDrawer()}>
                <IconButton>
                  <CloseIcon />
                </IconButton>{" "}
                <span>{t("Menu")}</span>
              </Box>
              <Divider />
              <div className="user-info">
                <Avatar alt="Remy Sharp" src="">
                  HN
                </Avatar>
                <h4>Remy Sharp</h4>
                <p>abc@gmail.com</p>
              </div>
              <Divider />
              <List className="menu-list">
                {MenuList.map((menu, index) => (
                  <ListItem key={index}>
                    <Link className="list-box" href={menu.url}>
                      <div className="list-menu">
                        <div className="image">
                          <img src={keyhand} alt="" />
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
                        <img src={keyhand} alt="" />
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
                  <span className="complex-name">Complex Name</span>
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
                    <Link href="#">
                      <img src={notification} alt="GlobalIcon" />
                    </Link>
                  </div>
                </div>
              </Box>
              <Container className="dashboard">
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">{t("Building Services")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/IncidentListing">
                      <DashboardCard image={keyhand} heading={t("Incidents")} title={t("Open")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Announcement">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Announcements")}
                        title={t("Total")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Visitors">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Visitors")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Facility Reservation")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("Management Fees")} title={t("Paid On")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/pollsSurvey">
                      <DashboardCard image={keyhand} heading={t("Survey")} title={t("Ongoing")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Building Info & Rules")}
                        title={t("Last Uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyMeetings">
                      <DashboardCard image={keyhand} heading={t("Meetings")} title={t("Scheduled")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/ClassifiedListing">
                      <DashboardCard image={keyhand} heading={t("Classifieds")} title={t("Last Uploaded")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Building Documents")}
                        title={t("Last Uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">{t("Personal Services")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("My Lease")} title={t("Total")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard image={keyhand} heading={t("My Vehicles")} title={t("Registered")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/familylist">
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Family")}
                        title={t("Registered Members")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("Fees & Payment")} title={t("Last Paid")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("My Suggestions")} title={t("Total")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Documents")}
                        title={t("Last Uploaded")}
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
              <img src={LogoutDialogIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Are you sure you want to logout?")}</Typography>
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
