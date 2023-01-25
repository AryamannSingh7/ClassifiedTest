// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import {
  keyhand,
  keyrented,
  money,
  location,
  account,
  registered,
  activemembers,
  members,
  overdue,
  Cardcalendar,
  awated,
  Check_Mark,
  xmark,
  ManagerClassified,
  ManagerCollection,
  ManagerIncident,
  ManagerVehicle,
  ManagerFacility,
} from "./assets";
import { Card, Container, Link, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import ChairmanNumberCard from "../../../components/src/DashboardCard/ChairmanNumberCard.web";
import { ROLE } from "../../../framework/src/Enum";

class DashboardGeneral extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    const userType = localStorage.getItem("userType");

    return (
      <>
        <Box className={classes.generalDashboard}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboards")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("General Dashboard")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("General Dashboard")}</Typography>
                    {userType === ROLE.CHAIRMAN && (
                      <NativeSelect className="select-year" value={this.state.Year} onChange={this.handleChange}>
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    )}
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  {userType === ROLE.CHAIRMAN && (
                    <>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={keyhand}
                          heading={t("Building Ownership Rate")}
                          titleOne={t("Sold")}
                          valueOne="75%"
                          titleTwo={t("Unsold")}
                          valueTwo="25%"
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={keyrented}
                          heading={t("Rented Out Apartments")}
                          titleOne=""
                          valueOne="12/13"
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={money}
                          heading={t("Management Fee Collected")}
                          titleOne=""
                          valueOne="58%"
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={registered}
                          heading={t("Registered Residents/Owners")}
                          titleOne=""
                          valueOne="195"
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={activemembers}
                          heading={t("Active Registered Members")}
                          titleOne=""
                          valueOne="77"
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={members}
                          heading={t("Members Never Logged in")}
                          titleOne=""
                          valueOne="123"
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={overdue}
                          heading={t("Overdue Management Fee")}
                          titleOne=""
                          valueOne="84"
                          titleTwo={t("Members")}
                          valueTwo=""
                        />
                      </Grid>
                    </>
                  )}
                  {userType === ROLE.MANAGER && (
                    <>
                      <Grid item sm={4}>
                        <Link href="/ClassifiedManagerListing">
                          <ChairmanNumberCard
                            image={ManagerClassified}
                            heading={t("Classifieds")}
                            titleOne={t("Active")}
                            valueOne="12"
                            titleTwo={t("Pending")}
                            valueTwo="12"
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <Link href="/IncidentManagement">
                          <ChairmanNumberCard
                            image={ManagerCollection}
                            heading={t("Incidents")}
                            titleOne={t("Resolved")}
                            valueOne="12"
                            titleTwo={t("Unresolved")}
                            valueTwo="12"
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={ManagerIncident}
                          heading={t("Facility")}
                          titleOne={t("Reservation")}
                          valueOne="12"
                          titleTwo={t("Pending")}
                          valueTwo="12"
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <Link href="/mv">
                          <ChairmanNumberCard
                            image={ManagerVehicle}
                            heading={t("Vehicles")}
                            titleOne={t("Registered")}
                            valueOne="12"
                            titleTwo={t("Pending")}
                            valueTwo="12"
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={ManagerFacility}
                          heading={t("Collection")}
                          titleOne={t("Planned")}
                          valueOne="122"
                          titleTwo={t("Received")}
                          valueTwo="12"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Box>
                  <Typography variant="h5" style={dashBoard.EventsHeading}>
                    {t("Upcoming Events")}
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item sm={6}>
                      <Card className="event-card">
                        <Box className="event-heading">
                          <Box>
                            <h4>Meeting Title</h4>
                            <p>To discuss something...</p>
                          </Box>
                          <Box>
                            <span>SR 250</span>
                          </Box>
                        </Box>
                        <Box className="event-content-box">
                          <Box className="event-content">
                            <img src={location} alt="location" />
                            <p>Center park common hall</p>
                          </Box>
                          <Box className="event-content">
                            <img src={Cardcalendar} alt="calendar" />
                            <p>05-08-2022 18:00 to 20:00</p>
                          </Box>
                          <Box className="event-content">
                            <img src={account} alt="calendar" />
                            <p>John Doe</p>
                          </Box>
                          <Box className="meeting-state-box">
                            <Box className="meeting-state">
                              <img src={awated} alt="calendar" />
                              <p>84</p>
                            </Box>
                            <Box className="meeting-state">
                              <img src={Check_Mark} alt="calendar" />
                              <p>25</p>
                            </Box>
                            <Box className="meeting-state">
                              <img src={xmark} alt="calendar" />
                              <p>108</p>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(DashboardGeneral)));

const dashBoard = {
  EventsHeading: {
    fontWeight: 600,
    marginTop: 50,
    marginBottom: 10,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
};

// Customizable Area End
