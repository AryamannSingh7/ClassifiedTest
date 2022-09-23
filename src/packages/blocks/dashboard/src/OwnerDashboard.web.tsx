import * as React from "react";
import {
  Button,
  Grid,
  Box,
  withStyles,
  Container,
  Link,
  Card,
  Typography,
  IconButton,
  MenuItem,
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { BuildingLogo, hamburgerIcon, LogoutDialogIcon, globalIcon, notification, chatIcon, keyhand } from "./assets";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import DashboardCard from "../../../components/src/DashboardCard";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import DashboardController, { Props } from "./DashboardController";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";

const MenuList = [
  {
    name: "Profile",
    url: "/profile",
    img: "",
  },
  {
    name: "Fees & Payments",
    url: "",
    img: "",
  },
  {
    name: "My Units",
    url: "",
    img: "",
  },
  {
    name: "My Neighbors",
    url: "/NeighboursListing",
    img: "",
  },
  {
    name: "Email Alerts",
    url: "",
    img: "",
  },
  {
    name: "FAQ",
    url: "/FaqOwner",
    img: "",
  },
];

class OwnerDashboard extends DashboardController {
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
                    <Link href="#">
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
                    <Typography variant="h5">{t("My Real Estate Details")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DashboardCard image={keyhand} heading={t("Number of Units")} title={t("Total")} value="75" />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Total Expenses")}
                        title={t("total-expance")}
                        value="SR 75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Card className="big-box">
                      <div className="content-box">
                        <div className="left-content">
                          <h4 className="heading">{t("Rented")}</h4>
                          <div className="state">
                            <p>{t("Rented")}</p>
                            <Button className="yellow">75</Button>
                          </div>
                        </div>
                        <div className="center-content">
                          <div className="image">
                            <img src={keyhand} alt="keyhand" />
                          </div>
                          <div className="vertical-line" />
                          <div className="image text">
                            <h4>VS</h4>
                          </div>
                          <div className="vertical-line" />
                        </div>
                        <div className="right-content">
                          <h4 className="heading">{t("Empty Units")}</h4>
                          <div className="state">
                            <p>{t("Empty")}</p>
                            <Button className="yellow">SR 75</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Card className="big-box">
                      <div className="content-box">
                        <div className="left-content">
                          <h4 className="heading">{t("Rent Amount Collected")}</h4>
                          <div className="state">
                            <p>{t("Collected")}</p>
                            <Button className="yellow">75</Button>
                          </div>
                        </div>
                        <div className="center-content">
                          <div className="image">
                            <img src={keyhand} alt="keyhand" />
                          </div>
                          <div className="vertical-line" />
                          <div className="image text">
                            <h4>VS</h4>
                          </div>
                          <div className="vertical-line" />
                        </div>
                        <div className="right-content">
                          <h4 className="heading">{t("Rent Amount Due")}</h4>
                          <div className="state">
                            <p>{t("Due")}</p>
                            <Button className="yellow">SR 75</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Card className="big-box">
                      <div className="content-box">
                        <div className="left-content">
                          <h4 className="heading">{t("Spent Amount")}</h4>
                          <div className="state">
                            <p>{t("Collected")}</p>
                            <Button className="yellow">75</Button>
                          </div>
                        </div>
                        <div className="center-content">
                          <div className="image">
                            <img src={keyhand} alt="keyhand" />
                          </div>
                          <div className="vertical-line" />
                          <div className="image text">
                            <h4>VS</h4>
                          </div>
                          <div className="vertical-line" />
                        </div>
                        <div className="right-content">
                          <h4 className="heading">{t("Collected Amount")}</h4>
                          <div className="state">
                            <p>{t("Due")}</p>
                            <Button className="yellow">SR 75</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">{t("Building Categories")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("My tenants")} title={t("Total")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Contracts">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Contracts")}
                        title={t("Few will expire after")}
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
                    <Link href="pollsSurvey">
                      <DashboardCard image={keyhand} heading={t("Poll / Survey")} title={t("Ongoing")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("Budget")} title={t("For FY")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Building Documents")}
                        title={t("Last uploaded")}
                        value="75"
                      />
                    </Link>
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
                        title={t("Unopened")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("Expense")} title={t("Last Updated")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Building Info & Rules")}
                        title={t("Last uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Facility Reservation")}
                        title={t("Last updated")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">{t("Personal Categories")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard image={keyhand} heading={t("My Vehicles")} title={t("Registered")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Visitors">
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Visitors")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("My Suggestion")} title={t("Total")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/InvoiceBilling">
                      <DashboardCard image={keyhand} heading={t("My Invoices")} title={t("Last Paid")} value="75" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Personal Documents")}
                        title={t("Last uploaded")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Issue a Reports")}
                        title={t("Last uploaded")}
                        value="NA"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Property Manager")}
                        title={t("Registered")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard image={keyhand} heading={t("Rent Payments")} title={t("Registered")} value="75" />
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
export default withTranslation()(withStyles(DashboardStyleWeb)(OwnerDashboard));

// Customizable Area End
