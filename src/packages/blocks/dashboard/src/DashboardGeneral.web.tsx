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
  InfoIcon,
  CloseIcon,
} from "./assets";
import { Card, Container, Link, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import DashboardGeneralController, { Props } from "../../../blocks/dashboard/src/DashboardGeneralController.web";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import ChairmanNumberCard from "../../../components/src/DashboardCard/ChairmanNumberCard.web";
import { ROLE } from "../../../framework/src/Enum";
import moment from "moment";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

class DashboardGeneral extends DashboardGeneralController {
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

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
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
                    <Typography variant="h5" className="bold-text">
                      {t("General Dashboard")}
                    </Typography>
                    {userType === ROLE.CHAIRMAN && (
                      <select
                        className="select-year"
                        value={this.state.filterYear}
                        onChange={(e: any) => this.setState({ filterYear: e.target.value })}
                      >
                        {this.state.yearList.map((year: any) => {
                          return (
                            <option value={year} key={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
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
                          valueOne={this.state.ownershipRate.sold + "%"}
                          titleTwo={t("Unsold")}
                          valueTwo={this.state.ownershipRate.unsold + "%"}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={keyrented}
                          heading={t("Rented Out Apartments")}
                          titleOne=""
                          valueOne={`${this.state.rentedApartment.rented}/${this.state.rentedApartment.total}`}
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={money}
                          heading={t("Management Fee Collected")}
                          titleOne=""
                          valueOne={this.state.managementFee.count + ""}
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={registered}
                          heading={t("Registered Residents/Owners")}
                          titleOne=""
                          valueOne={this.state.registeredUser.count + ""}
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <Card className="dashboard-card-box">
                          <Box className="card-image">
                            <img src={activemembers} alt="image" />
                          </Box>
                          <Box className="active-register-member-tooltip">
                            <h4>{t("Active Registered Members")}</h4>
                            <img src={InfoIcon} id="tooltip-anchor-children" />
                            <Tooltip
                              anchorId="tooltip-anchor-children"
                              className="dashboard-info-tooltip"
                              place="bottom"
                            >
                              <Box>
                                <Box className="tooltip-heading-box">
                                  <h4>{t("Active Registered Members")}</h4>
                                  <img src={CloseIcon} alt="close" />
                                </Box>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit consequuntur aliquid
                                  fuga fugiat.
                                </p>
                              </Box>
                            </Tooltip>
                          </Box>
                          <Box className="card-bottom-info">
                            <Box className="info-box">
                              <span>{this.state.activeMember.count + ""}</span>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={members}
                          heading={t("Members Never Logged in")}
                          titleOne=""
                          valueOne={this.state.memberNotLogin.count + ""}
                          titleTwo=""
                          valueTwo=""
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={overdue}
                          heading={t("Overdue Management Fee")}
                          titleOne=""
                          valueOne={this.state.overdueFee.count + ""}
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
                            valueOne={this.state.classified.active + ""}
                            titleTwo={t("Pending")}
                            valueTwo={this.state.classified.pending + ""}
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <Link href="/IncidentManagement">
                          <ChairmanNumberCard
                            image={ManagerCollection}
                            heading={t("Incidents")}
                            titleOne={t("Resolved")}
                            valueOne={this.state.incidents.resolved + ""}
                            titleTwo={t("Unresolved")}
                            valueTwo={this.state.incidents.unresolved + ""}
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={ManagerIncident}
                          heading={t("Facility")}
                          titleOne={t("Reservation")}
                          valueOne={this.state.facility.reservation + ""}
                          titleTwo={t("Pending")}
                          valueTwo={this.state.facility.pending + ""}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <Link href="/mv">
                          <ChairmanNumberCard
                            image={ManagerVehicle}
                            heading={t("Vehicles")}
                            titleOne={t("Registered")}
                            valueOne={this.state.vehicle.registered + ""}
                            titleTwo={t("Pending")}
                            valueTwo={this.state.vehicle.pending + ""}
                          />
                        </Link>
                      </Grid>
                      <Grid item sm={4}>
                        <ChairmanNumberCard
                          image={ManagerFacility}
                          heading={t("Collection")}
                          titleOne={t("Planned")}
                          valueOne="n/A"
                          titleTwo={t("Received")}
                          valueTwo="n/A"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Box className="upcoming-events-box">
                  <Typography variant="h5" style={dashBoard.EventsHeading} className="bold-text">
                    {t("Upcoming Events")}
                  </Typography>
                  <Grid container spacing={4}>
                    {this.state.meetingList.map((meeting: any) => {
                      return (
                        <Grid item sm={6} key={meeting.id}>
                          <Card className="event-card">
                            <Box className="event-heading">
                              <Box>
                                <h4 className="bold-text">{meeting.attributes.title}</h4>
                                <p>{meeting.attributes.agenda}</p>
                              </Box>
                            </Box>
                            <Box className="event-content-box">
                              <Box className="event-content">
                                <img src={location} alt="location" />
                                <p>{meeting.attributes.place}</p>
                              </Box>
                              <Box className="event-content">
                                <img src={Cardcalendar} alt="calendar" />
                                <p>
                                  {moment(meeting.attributes.meeting_date_time, "DD-MM-YYYY HH:mm").format(
                                    "MMMM DD, YYYY"
                                  )}
                                </p>
                              </Box>
                              <Box className="meeting-state-box">
                                <Box className="meeting-state">
                                  <img src={awated} alt="calendar" />
                                  <p>{meeting.attributes.meeting_responses.awaited}</p>
                                </Box>
                                <Box className="meeting-state">
                                  <img src={Check_Mark} alt="calendar" />
                                  <p>{meeting.attributes.meeting_responses.accepted}</p>
                                </Box>
                                <Box className="meeting-state">
                                  <img src={xmark} alt="calendar" />
                                  <p>{meeting.attributes.meeting_responses.rejected}</p>
                                </Box>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      );
                    })}
                    {this.state.facilityList.map((facility: any) => {
                      return (
                        <Grid item sm={6} key={facility.id}>
                          <Card className="event-card">
                            <Box className="event-heading">
                              <Box>
                                <h4>{t("Facility Reservation")}</h4>
                                <p>{"Payment status"}: n/A</p>
                              </Box>
                              <Box>
                                <span>
                                  {facility.attributes.currency.currency} {facility.attributes.rent || 0}
                                </span>
                              </Box>
                            </Box>
                            <Box className="event-content-box">
                              <Box className="event-content">
                                <img src={location} alt="location" />
                                <p>{facility.attributes.common_area.name}</p>
                              </Box>
                              <Box className="event-content">
                                <img src={Cardcalendar} alt="calendar" />
                                <p>
                                  {moment(facility.attributes.date, "YYYY-MMM-DD").format("MMMM DD, YYYY")}{" "}
                                  {facility.attributes.start_time} {t("to")} {facility.attributes.end_time}
                                </p>
                              </Box>
                              <Box className="event-content">
                                <img src={account} alt="calendar" />
                                <p>{facility.attributes.Owner_name}</p>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      );
                    })}
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
