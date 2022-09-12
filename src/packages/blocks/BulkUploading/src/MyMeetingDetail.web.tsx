// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Card,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import { BuildingLogo, CommentIcon, UserIcon, CalenderBlueIcon } from "./assets";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { orange } from "@material-ui/core/colors";
import moment from "moment";

const OrangeRadio = withStyles({
  root: {
    "&$checked": {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

class MyMeetingDetail extends MyMeetingsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const meeting_id = this.props.navigation.getParam("id");
    this.setState(
      {
        scheduleMeetingId: meeting_id,
      },
      () => {
        this.getMeetingById();
      }
    );
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.meetingDetail}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/MyMeetings">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{this.state.meeting && this.state.meeting.attributes.title}</span>
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <Box className="meeting-details">
                      <Box className="meeting-detail">
                        <Box className="heading">
                          <h4>Meeting Details</h4>
                          {this.state.meeting && this.state.meeting.attributes.meeting_response && (
                            <span className={this.state.meeting.attributes.meeting_response}>
                              {this.state.meeting.attributes.meeting_response}
                            </span>
                          )}
                        </Box>
                        <Card className="meeting-card">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <span>Date & Time: </span>
                              <p>{this.state.meeting && this.state.meeting.attributes.meeting_date_time}</p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>Place: </span>
                              <p>{this.state.meeting && this.state.meeting.attributes.place}</p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>Agenda: </span>
                              <p>{this.state.meeting && this.state.meeting.attributes.agenda}</p>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                      <Box className="scheduled-detail">
                        <Box className="heading">
                          <h4>Scheduling Details</h4>
                        </Box>
                        <Card className="scheduled-card">
                          <Grid container spacing={2}>
                            <Grid item xs={6} className="item">
                              <img src={UserIcon} alt="" />
                              <Box>
                                <span>Scheduled By: </span>
                                <p>
                                  {this.state.meeting &&
                                    this.state.meeting.attributes.meeting_schedule_detail.scheduled_by}
                                </p>
                              </Box>
                            </Grid>
                            <Grid item xs={6} className="item">
                              <img src={CalenderBlueIcon} alt="" />
                              <Box>
                                <span>Scheduled On: </span>
                                <p>
                                  {this.state.meeting &&
                                    this.state.meeting.attributes.meeting_schedule_detail.scheduled_on}
                                </p>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    </Box>
                    {this.state.meeting && this.state.meeting.attributes.status === "scheduled" && (
                      <div className="upload-button">
                        <Grid container>
                          <Grid item xs={12} md={12}>
                            {!this.state.meeting.attributes.meeting_response ? (
                              <Button onClick={() => this.handleAttendMeetingModal()}>Submit Your Response</Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  if (this.state.meeting.attributes.meeting_response === "accepted") {
                                    this.setState(
                                      {
                                        response: true,
                                      },
                                      () => {
                                        this.handleAttendMeetingModal();
                                      }
                                    );
                                  } else {
                                    this.setState(
                                      {
                                        response: false,
                                      },
                                      () => {
                                        this.handleAttendMeetingModal();
                                      }
                                    );
                                  }
                                }}
                              >
                                Edit Your Response
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </Box>
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

        <Dialog
          className="schedule-dialog"
          fullWidth
          onClose={() => this.handleAttendMeetingModal()}
          open={this.state.isAttendMeetingModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={CommentIcon} alt="CommentIcon" />
              <Typography variant="h6">Are you attending the meeting?</Typography>
              <Typography variant="body1">
                Please confirm whether you are going to attend meeting on{" "}
                {moment(this.state.meeting && this.state.meeting.attributes.meeting_date_time).format("DD MMM, YYYY")}{" "}
                or not.
              </Typography>
              <RadioGroup
                className="choice-box"
                value={this.state.response}
                onChange={(e: any) => {
                  this.setState({
                    response: e.target.value === "true",
                  });
                }}
              >
                <FormControlLabel
                  value={true}
                  className="radio-select"
                  control={<OrangeRadio />}
                  label="I will attend"
                />
                <FormControlLabel
                  value={false}
                  className="radio-select"
                  control={<OrangeRadio />}
                  label="I won't attend"
                />
              </RadioGroup>
              <DialogActions className="dialog-button-group">
                <Button
                  className="add-button"
                  onClick={() => {
                    if (this.state.meeting && !this.state.meeting.attributes.meeting_response) {
                      this.createMeetingResponse();
                    } else {
                      this.updateMeetingResponse();
                    }
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MyMeetingDetail);
// Customizable Area End
