//@ts-ignore
//@ts-nocheck

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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router";
import BuildingLogo from "../assets/building1.png";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { globalIcon, notification, chatIcon } from "./assets";
import hamburgerIcon from "../assets/hamburger.png";
import { keyhand } from "./assets";
import DashboardCard from "../../../components/src/DashboardCard";
import ResidentSidebarWeb from "./ResidentSidebar.web";
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
    name: "My Incidents",
    url: "",
    img: "",
  },
  {
    name: "My Neighbors",
    url: "",
    img: "",
  },
  {
    name: "FAQ",
    url: "/FaqResident",
    img: "",
  },
];

class ResidentDashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false,
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

  logout = () => {
    this.handleLogoutModal();
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
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
                <div className="right-icon">
                  <Link href="#">
                    <img src={globalIcon} alt="GlobalIcon" />
                  </Link>
                  <Link href="#">
                    <img src={chatIcon} alt="GlobalIcon" />
                  </Link>
                  <Link href="#">
                    <img src={notification} alt="GlobalIcon" />
                  </Link>
                </div>
              </Box>
              <Container className="dashboard">
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Building Services</Typography>
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
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Visitors"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Facility Reservation"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Management Fees"
                        title="Paid On"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/pollsSurvey">
                      <DashboardCard
                        image={keyhand}
                        heading="Survey"
                        title="Ongoing"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Info & Rules"
                        title="Last Uploaded"
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
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Classifieds"
                        title="Last Uploaded"
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
                </Grid>
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Personal Services</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Lease"
                        title="Total"
                        value="75"
                      />
                    </Link>
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
                        heading="My Family"
                        title="Registered Members"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Fees & Payment"
                        title="Last Paid"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Suggestions"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={keyhand}
                        heading="My Documents"
                        title="Last uploaded"
                        value="NA"
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
export default withStyles(DashboardStyleWeb)(withRouter(ResidentDashboard));

// Customizable Area End
