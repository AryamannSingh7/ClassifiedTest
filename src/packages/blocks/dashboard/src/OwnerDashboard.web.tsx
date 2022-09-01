//@ts-ignore
//@ts-nocheck
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
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router";
import BuildingLogo from "../assets/building1.png";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { globalIcon, notification, chatIcon } from "./assets";
import hamburgerIcon from "../assets/hamburger.png";
import { keyhand } from "./assets";
import DashboardCard from "../../../components/src/DashboardCard";
import OwnerSidebarWeb from "./OwnerSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import LogoutDialogIcon from "../assets/logout-dialog.png";
import DashboardController, { Props } from "./DashboardController";

const MenuList = [
  {
    name: "Profile",
    url: "",
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
    url: "",
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
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      languageMenu: false,
      isLogoutModalOpen: false,
    };
  }

  toggleDrawer = () => {
    this.setState({
      ...this.state,
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  handleLogoutModal = () => {
    this.setState({
      ...this.state,
      isLogoutModalOpen: !this.state.isLogoutModalOpen,
    });
  };

  handleLanguage = () => {
    this.setState({
      ...this.state,
      languageMenu: !this.state.languageMenu,
    });
  };

  logout = () => {
    this.handleLogoutModal();
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const { t } = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box
          className={classes.ownerDashboard}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Drawer
            open={this.state.isMenuOpen}
            onClose={() => this.toggleDrawer()}
          >
            <Box className="dashboard-sidebar">
              <Box className="close-menu" onClick={() => this.toggleDrawer()}>
                <IconButton>
                  <CloseIcon />
                </IconButton>{" "}
                <span>Menu</span>
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
                        <p>{menu.name}</p>
                      </div>
                      <ArrowForwardIosOutlinedIcon
                        style={{ width: "14px", fill: "black" }}
                      />
                    </Link>
                  </ListItem>
                ))}
                <ListItem onClick={() => this.handleLogoutModal()}>
                  <div className="list-box">
                    <div className="list-menu">
                      <div className="image">
                        <img src={keyhand} alt="" />
                      </div>
                      <p>Logout</p>
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
                  <div style={{ position: "relative" }}>
                    <span onClick={() => this.handleLanguage()}>
                      <img src={globalIcon} alt="GlobalIcon" />
                    </span>
                    {this.state.languageMenu ? (
                      <div
                        style={{
                          position: "absolute",
                          right: "-38px",
                          top: "32px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          className="invoicesbtn"
                          color="primary"
                          onClick={() => i18next.changeLanguage("en")}
                          style={{ marginBottom: "6px" }}
                        >
                          English
                        </Button>
                        <Button
                          variant="outlined"
                          className="invoicesbtn"
                          color="primary"
                          onClick={() => i18next.changeLanguage("ar")}
                        >
                          Arebic
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                    <Typography variant="h5">My Real Estate Details</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DashboardCard
                      image={keyhand}
                      heading="Number of Units"
                      title="Total"
                      value="75"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Total Expenses"
                        title={t("total-expance")}
                        value="SR 75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Card className="big-box">
                      <div className="content-box">
                        <div className="left-content">
                          <h4 className="heading">Rented</h4>
                          <div className="state">
                            <p>Rented</p>
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
                          <h4 className="heading">Empty Units</h4>
                          <div className="state">
                            <p>Empty</p>
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
                          <h4 className="heading">Rent Amount Collected</h4>
                          <div className="state">
                            <p>Collected</p>
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
                          <h4 className="heading">Rent Amount Due</h4>
                          <div className="state">
                            <p>Due</p>
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
                          <h4 className="heading">Spent Amount</h4>
                          <div className="state">
                            <p>Collected</p>
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
                          <h4 className="heading">Collected Amount</h4>
                          <div className="state">
                            <p>Due</p>
                            <Button className="yellow">SR 75</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Building Categories</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My tenants"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/Contracts">
                      <DashboardCard
                        image={keyhand}
                        heading="Contracts"
                        title="Few will expire after"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/MyMeetings">
                      <DashboardCard
                        image={keyhand}
                        heading="Meetings"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="pollsSurvey">
                      <DashboardCard
                        image={keyhand}
                        heading="Poll / Survey"
                        title="Ongoing"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Budget"
                        title="For FY"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Documents"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/IncidentListing">
                      <DashboardCard
                        image={keyhand}
                        heading="Incidents"
                        title="Open"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Announcements"
                        title="Unopened"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Expense"
                        title="Last Updated"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Info & Rules"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Facility Reservation"
                        title="Last updated"
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Personal Categories</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard
                        image={keyhand}
                        heading="My Vehicles"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/familylist">
                      <DashboardCard
                        image={keyhand}
                        heading="My Visitors"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Suggestion"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/InvoiceBilling">
                      <DashboardCard
                        image={keyhand}
                        heading="My Invoices"
                        title="Last Paid"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={keyhand}
                        heading="Personal Documents"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Issue a Reports"
                        title="Last uploaded"
                        value="NA"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Property Manager"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Rent Payments"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
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
              <Typography variant="h6">
                Are you sure you want to logout?
              </Typography>
              <Typography variant="body1">
                You will be returned to the login screen
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.logout()}>Logout</Button>
                <Button onClick={() => this.handleLogoutModal()}>Cancel</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withTranslation()(
  withStyles(DashboardStyleWeb)(withRouter(OwnerDashboard))
);

// Customizable Area End
