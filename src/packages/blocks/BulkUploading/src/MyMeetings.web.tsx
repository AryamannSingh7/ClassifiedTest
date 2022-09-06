// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  Tab,
  MenuItem,
  Card,
  Divider,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TrueIcon from "../assets/true.png";
import FalseIcon from "../assets/false.png";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";

class MyMeetings extends MyMeetingsController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): Promise<void> {
    this.getScheduledMeetingList();
    this.getMinuteMeetingList();
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.meetingList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    My Meetings
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem>Ascending</MenuItem>
                      <MenuItem>Descending</MenuItem>
                    </Menu>
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="FilterIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem>New</MenuItem>
                      <MenuItem>Accepted</MenuItem>
                      <MenuItem>Rejected</MenuItem>
                      <MenuItem>Cancelled</MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <Box className="select">
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isScheduledMeetingOpen: true,
                          },
                          () => {}
                        );
                      }}
                      label="Scheduled Meetings"
                      className={this.state.isScheduledMeetingOpen ? "active" : ""}
                    />
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isScheduledMeetingOpen: false,
                          },
                          () => {}
                        );
                      }}
                      label="Meeting Minutes"
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
                                <Card className="meeting">No Scheduled Meeting Available!!</Card>
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
                                          <span>Date & Time:</span>
                                          <p>{meeting.attributes.meeting_date_time}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>Place:</span>
                                          <p>{meeting.attributes.place}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>Agenda:</span>
                                          <p>{meeting.attributes.agenda}</p>
                                        </Grid>
                                      </Grid>
                                      <Divider />
                                      <Box className="decision">
                                        <h6>Are you attending?</h6>
                                        <div className="status-images">
                                          <img src={TrueIcon} alt="true" />
                                          <img src={FalseIcon} alt="false" />
                                        </div>
                                      </Box>
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
                                <Card className="meeting">No Meeting Minutes Available!!</Card>
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
                                          <span>Date & Time:</span>
                                          <p>{meeting.attributes.meeting_date_time}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <span>Agenda:</span>
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
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MyMeetings);
// Customizable Area End
