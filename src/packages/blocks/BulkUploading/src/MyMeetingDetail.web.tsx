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
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

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
    this.setState({ scheduleMeetingId: meeting_id }, () => {
      this.getMeetingById();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);
    console.log(this.state.meeting && this.state.meeting.attributes.meeting_date_time);

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
                          <h4>{t("Meeting Details")}</h4>
                          {this.state.meeting && this.state.meeting.attributes.meeting_response && (
                            <span className={this.state.meeting.attributes.meeting_response}>
                              {this.state.meeting.attributes.meeting_response}
                            </span>
                          )}
                        </Box>
                        <Card className="meeting-card">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <span>{t("Date & Time")}: </span>
                              <p>
                                {moment(
                                  this.state.meeting && this.state.meeting.attributes.meeting_date_time,
                                  "DD-MM-YYYY HH:mm",
                                  true
                                ).format("DD-MMM-YYYY HH:mm")}
                              </p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>{t("Place")}: </span>
                              <p>{this.state.meeting && this.state.meeting.attributes.place}</p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>{t("Agenda")}: </span>
                              <p>{this.state.meeting && this.state.meeting.attributes.agenda}</p>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                      <Box className="scheduled-detail">
                        <Box className="heading">
                          <h4>{t("Scheduling Details")}</h4>
                        </Box>
                        <Card className="scheduled-card">
                          <Grid container spacing={2}>
                            <Grid item xs={6} className="item">
                              <img src={UserIcon} alt="" />
                              <Box>
                                <span>{t("Scheduled By")}: </span>
                                <p>
                                  {this.state.meeting &&
                                    this.state.meeting.attributes.meeting_schedule_detail.scheduled_by}
                                </p>
                              </Box>
                            </Grid>
                            <Grid item xs={6} className="item">
                              <img src={CalenderBlueIcon} alt="" />
                              <Box>
                                <span>{t("Scheduled On")}: </span>
                                <p>
                                  {moment(
                                    this.state.meeting &&
                                      this.state.meeting.attributes.meeting_schedule_detail.scheduled_on,
                                    "DD-MM-YYYY HH:mm",
                                    true
                                  ).format("DD-MMM-YYYY HH:mm")}
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
                              <Button onClick={() => this.handleAttendMeetingModal()}>
                                {t("Submit Your Response")}
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  if (this.state.meeting.attributes.meeting_response === "accepted") {
                                    this.setState({ response: true }, () => {
                                      this.handleAttendMeetingModal();
                                    });
                                  } else {
                                    this.setState({ response: false }, () => {
                                      this.handleAttendMeetingModal();
                                    });
                                  }
                                }}
                              >
                                {t("Edit Your Response")}
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
          <MuiDialogTitle disableTypography className="attendee-heading">
            <IconButton onClick={() => this.handleAttendMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent>
            <Box textAlign="center">
              <img src={CommentIcon} alt="CommentIcon" />
              <Typography variant="h6">{t("Are you attending the meeting?")}</Typography>
              <Typography variant="body1">
                Please confirm whether you are going to attend meeting on{" "}
                {moment(
                  this.state.meeting && this.state.meeting.attributes.meeting_date_time,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("DD MMM, YYYY")}{" "}
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
                  label={t("I will attend")}
                />
                <FormControlLabel
                  value={false}
                  className="radio-select"
                  control={<OrangeRadio />}
                  label={t("I won't attend")}
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
                  {t("Submit")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(MyMeetingDetail));
// Customizable Area End
