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
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router";
import BuildingLogo from "../assets/building1.png";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { globalIcon, notification, chatIcon } from "./assets";

import { keyhand } from "./assets";
import DashboardCard from "../../../components/src/DashboardCard";
import OwnerSidebarWeb from "./OwnerSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';

class OwnerDashboard extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      anchorEl: null,
    };
  }

  toggleDrawer = () => {
    this.setState({
      ...this.state,
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  handleLanguage = (event: any) => {
    this.setState({
      anchorEl: event?.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl:null
    })
  }

  handleEngLngChange = () => {
    i18next.changeLanguage('en')
    this.setState({
      anchorEl:null
    })
  }

  handleAreLngChange = () => {
    i18next.changeLanguage('ar')
    this.setState({
      anchorEl:null
    })
  }
  render() {
    const {t} = this.props
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl)
    return (
      <>
        <Box
          className={classes.ownerDashboard}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <OwnerSidebarWeb
            isMenuOpen={this.state.isMenuOpen}
            handleClose={() => this.toggleDrawer()}
          />
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <div className="left-icon">
                  <IconButton onClick={() => this.toggleDrawer()}>
                    <MenuIcon />
                  </IconButton>
                  <span className="complex-name">Complex Name</span>
                </div>
                <div className="right-icon" style={{display:"flex"}}>
                  <div style={{position:"relative"}}>
                    <span
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e:any) => this.handleLanguage(e)}>
                      <img src={globalIcon} alt="GlobalIcon" />
                    </span>
                    <Menu
                      id="basic-menu"
                      anchorEl={this.state.anchorEl}
                      open={open}
                      onClose={this.handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button"
                      }}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <MenuItem onClick={() => this.handleEngLngChange()}>English</MenuItem>
                      <MenuItem onClick={() => this.handleAreLngChange()}>Arabic</MenuItem>
                    </Menu>
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
                    <Typography variant="h5">{t("My Real Estate Details")}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DashboardCard
                      image={keyhand}
                      heading={t("Number of Units")}
                      title={t("Total")}
                      value="75"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Total Expenses")}
                        title={t('total-expance')}
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("My tenants")}
                        title={t("Total")}
                        value="75"
                      />
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
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Meetings")}
                        title={t("Scheduled")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="pollsSurvey">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Poll / Survey")}
                        title={t("Ongoing")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading={t("Budget")}
                        title={t("For FY")}
                        value="75"
                      />
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("Incidents")}
                        title={t("Open")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="">
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("Expense")}
                        title={t("Last Updated")}
                        value="75"
                      />
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Vehicles")}
                        title={t("Registered")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/familylist">
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Suggestion")}
                        title={t("Total")}
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Link href="/InvoiceBilling">
                      <DashboardCard
                        image={keyhand}
                        heading={t("My Invoices")}
                        title={t("Last Paid")}
                        value="75"
                      />
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
                      <DashboardCard
                        image={keyhand}
                        heading={t("Rent Payments")}
                        title={t("Registered")}
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
      </>
    );
  }
}
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(OwnerDashboard)));

// Customizable Area End
