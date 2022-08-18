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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router";
import BuildingLogo from "../assets/building1.png";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { globalIcon, notification, chatIcon } from "./assets";

import { keyhand } from "./assets";
import DashboardCard from "../../../components/src/DashboardCard";
import OwnerSidebarWeb from "./OwnerSidebar.web";

class OwnerDashboard extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleDrawer = () => {
    this.setState({
      ...this.state,
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  render() {
    const { classes } = this.props;

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
                  </IconButton>{" "}
                  Complex Name
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
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">My Real Estate Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DashboardCard
                      image={keyhand}
                      heading="Building Ownership Rate"
                      title="Total"
                      value="75"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Total Expenses"
                        title="Total Expenses"
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
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Building Categories</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My tenants"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Contracts"
                        title="Few will expire after"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Meetings"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Poll / Survey"
                        title="Ongoing"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Budget"
                        title="For FY"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/BuildingDocuments">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Documents"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/IncidentListing">
                      <DashboardCard
                        image={keyhand}
                        heading="Incidents"
                        title="Open"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Announcements"
                        title="Unopened"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Expense"
                        title="Last Updated"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Info & Rules"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Personal Categories</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/veichleList">
                      <DashboardCard
                        image={keyhand}
                        heading="My Vehicles"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/familylist">
                      <DashboardCard
                        image={keyhand}
                        heading="My Family"
                        // title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Suggestion"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Invoices"
                        title="Last Paid"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="/PersonalDocument">
                      <DashboardCard
                        image={keyhand}
                        heading="Personal Documents"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Issue a Reports"
                        title="Last uploaded"
                        value="NA"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Property Manager"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
      </>
    );
  }
}
export default withStyles(DashboardStyleWeb)(withRouter(OwnerDashboard));

// Customizable Area End
