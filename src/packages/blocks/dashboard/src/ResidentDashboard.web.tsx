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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router";
import BuildingLogo from "../assets/building1.png";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { globalIcon, notification, chatIcon } from "./assets";

import { keyhand } from "./assets";
import DashboardCard from "../../../components/src/DashboardCard";
import ResidentSidebarWeb from "./ResidentSidebar.web";

class ResidentDashboard extends React.Component {
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
          <ResidentSidebarWeb
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
                    <Typography variant="h5">Building Services</Typography>
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
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Visitors"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Facility Reservation"
                        title="Scheduled"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Survey"
                        title="Ongoing"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Info & Rules"
                        title="Last Uploaded"
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
                        heading="Classifieds"
                        title="Last Uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Building Documents"
                        title="Last uploaded"
                        value="75"
                      />
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  <Grid item xs={12} sm={12} className="title">
                    <Typography variant="h5">Personal Services</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Lease"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Vehicles"
                        title="Registered"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Family"
                        title="Registered Members"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="Fees & Payment"
                        title="Last Paid"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
                      <DashboardCard
                        image={keyhand}
                        heading="My Suggestions"
                        title="Total"
                        value="75"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link href="">
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
      </>
    );
  }
}
export default withStyles(DashboardStyleWeb)(withRouter(ResidentDashboard));

// Customizable Area End
