// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid, Tab, MenuItem, Card, Divider } from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import { BuildingLogo, SortIcon, FilterIcon, TrueIcon, FalseIcon } from "./assets";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";

class MyMeetings extends MyMeetingsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getScheduledMeetingList();
    this.getMinuteMeetingList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filter !== this.state.filter) {
      this.getScheduledMeetingList();
    }
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.meetingList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link
                      href={localStorage.getItem("userType") === "Owner" ? "/OwnerDashboard" : "/ResidentDashboard"}
                    >
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("My Meetings")}</span>
                  </div>
                  <div className="right-icon">
                    <Menu
                      className="sort-menu"
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem onClick={() => this.setState({ filter: "asc" })}>{t("Ascending")}</MenuItem>
                      <MenuItem onClick={() => this.setState({ filter: "desc" })}>{t("Descending")}</MenuItem>
                    </Menu>
                    <Menu
                      className="filter-menu"
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="FilterIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem onClick={() => this.setState({ filter: "desc" })}>{t("New")}</MenuItem>
                      <MenuItem onClick={() => this.setState({ filter: "accepted" })}>{t("Accepted")}</MenuItem>
                      <MenuItem onClick={() => this.setState({ filter: "rejected" })}>{t("Rejected")}</MenuItem>
                      <MenuItem onClick={() => this.setState({ filter: "canceled" })}>{t("Cancelled")}</MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <Box className="select">
                    <Tab
                      onClick={() => {
                        this.setState({ ...this.state, isScheduledMeetingOpen: true });
                      }}
                      label={t("Scheduled Meetings")}
                      className={this.state.isScheduledMeetingOpen ? "active" : ""}
                    />
                    <Tab
                      onClick={() => {
                        this.setState({ ...this.state, isScheduledMeetingOpen: false });
                      }}
                      label={t("Meeting Minutes")}
                      className={!this.state.isScheduledMeetingOpen ? "active" : ""}
                    />
                  </Box>
                  {this.state.isScheduledMeetingOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="meeting-list">
                          <Grid container spacing={2}>
                            {this.state.scheduleMeetingList.length === 0 && (
                              <Grid item xs={12}>
                                <Card className="meeting">{t("No Scheduled Meeting Available!!")}</Card>
                              </Grid>
                            )}
                            {this.state.scheduleMeetingList.map((meeting: any) => {
                              return (
                                <Grid item xs={12} key={meeting.id}>
                                  <Link href={`/MyMeeting/${meeting.id}`}>
                                    <Card className="meeting">
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <div className="header">
                                            <h4>{meeting.attributes.title}</h4>
                                          </div>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} className="info">
                                        <Grid item xs={12}>
                                          <span>{t("Date & Time")}:</span>
                                          <p>
                                            {moment(
                                              meeting.attributes.meeting_date_time,
                                              "DD-MM-YYYY HH:mm",
                                              true
                                            ).format("MMMM DD, YYYY HH:mm")}
                                          </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>{t("Place")}:</span>
                                          <p>{meeting.attributes.place}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>{t("Agenda")}:</span>
                                          <p>{meeting.attributes.agenda}</p>
                                        </Grid>
                                      </Grid>
                                      {meeting.attributes.status === "scheduled" && (
                                        <>
                                          <Divider />
                                          {!meeting.attributes.meeting_response ? (
                                            <Box className="decision">
                                              <h6>{t("Are you attending?")}</h6>
                                              <div className="status-images">
                                                <img src={TrueIcon} alt="true" />
                                                <img src={FalseIcon} alt="false" />
                                              </div>
                                            </Box>
                                          ) : (
                                            <Box className="decision">
                                              <p>{t("Your Response")}</p>
                                              <span className={`status ${meeting.attributes.meeting_response}`}>
                                                {meeting.attributes.meeting_response}
                                              </span>
                                            </Box>
                                          )}
                                        </>
                                      )}
                                    </Card>
                                  </Link>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
                  {!this.state.isScheduledMeetingOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="meeting-list">
                          <Grid container spacing={2}>
                            {this.state.minuteMeetingList.length === 0 && (
                              <Grid item xs={12}>
                                <Card className="meeting">{t("No Meeting Minutes Available!!")}</Card>
                              </Grid>
                            )}
                            {this.state.minuteMeetingList.map((meeting: any) => {
                              return (
                                <Grid item xs={12} key={meeting.id}>
                                  <Link href={`/MeetingMinuteDetail/${meeting.id}`}>
                                    <Card className="meeting">
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <div className="header">
                                            <h4>{meeting.attributes.title}</h4>
                                          </div>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} className="info">
                                        <Grid item xs={12}>
                                          <span>{t("Date & Time")}:</span>
                                          <p>
                                            {moment(
                                              meeting.attributes.meeting_date_time,
                                              "DD-MM-YYYY HH:mm",
                                              true
                                            ).format("MMMM DD, YYYY HH:mm")}
                                          </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>{t("Agenda")}:</span>
                                          <p>{meeting.attributes.agenda}</p>
                                        </Grid>
                                      </Grid>
                                    </Card>
                                  </Link>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(MyMeetings));
// Customizable Area End
