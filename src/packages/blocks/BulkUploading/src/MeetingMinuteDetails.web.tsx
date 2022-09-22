// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  FormControl,
  withStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  TextareaAutosize,
  Card,
} from "@material-ui/core";
import { Link as NavLink } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MeetingMinutesController, { Props } from "./MeetingMinutesController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { DownloadIcon, PdfIcon, CheckIcon } from "./assets";
import { Link } from "react-router-dom";
import { ROLE } from "../../../framework/src/Enum";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";

class MeetingMinuteDetails extends MeetingMinutesController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const meeting_id = this.props.navigation.getParam("id");
    this.setState({ meetingMinuteId: meeting_id }, () => {
      this.MinuteMeetingDetail();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.scheduledMeetingDetails}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Meetings")} / {t("Meeting Minutes")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.title}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Meeting Minutes Details")}
                    </Typography>
                  </Box>
                </Box>
                {this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.meeting_mins_pdf ? (
                  <>
                    <Box className="meeting-detail-box">
                      <Box className="meeting-top">
                        <h3>
                          Meeting Minutes{" "}
                          {moment(
                            this.state.meetingMinuteDetails.attributes.meeting_date_time,
                            "DD-MM-YYYY HH:mm",
                            true
                          ).format("MMMM DD, YYYY HH:mm")}
                        </h3>
                        <span className={this.state.meetingMinuteStatus}>{this.state.meetingMinuteStatus}</span>
                      </Box>
                      <Divider />
                      <Box className="meeting-minute-details">
                        <Box className="resolution">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: this.state.meetingMinuteDetails.attributes.meeting_mins_notes,
                            }}
                          />
                        </Box>
                        <Box className="pdf-detail">
                          <div className="heading">
                            <img src={PdfIcon} alt="pdf" />
                            <h6>
                              Meeting Minutes{" "}
                              {moment(
                                this.state.meetingMinuteDetails.attributes.meeting_date_time,
                                "DD-MM-YYYY HH:mm",
                                true
                              ).format("MMMM DD, YYYY HH:mm")}
                            </h6>
                          </div>
                          <NavLink
                          // href={this.state.meetingMinuteDetails.attributes.meeting_mins_pdf.url}
                          // target="_blank"
                          >
                            <img src={DownloadIcon} alt="download" onClick={() => alert("Coming soon!!")} />
                          </NavLink>
                        </Box>
                      </Box>
                    </Box>
                    {this.state.meetingMinuteDetails.attributes.meeting_mins_status === "rejected" && (
                      <Box className="rejection-box">
                        <Card>
                          <h4>{t("Rejection Reason")}</h4>
                          <p>{this.state.meetingMinuteDetails.attributes.meeting_reject_note.note}</p>
                        </Card>
                      </Box>
                    )}
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Box className="button-box">
                        <Link to={`/MeetingMinute/${this.state.meetingMinuteId}/Note`}>
                          <Button className="edit">{t("Edit")}</Button>
                        </Link>
                      </Box>
                    )}
                    {this.state.meetingMinuteStatus === "pending" &&
                      localStorage.getItem("userType") === ROLE.CHAIRMAN && (
                        <Box className="button-box">
                          <Button className="cancel" onClick={() => this.handleRejectMeetingModal()}>
                            {t("Reject")}
                          </Button>
                          <Button className="edit" onClick={() => this.handleApproveMeetingModal()}>
                            {t("Approve")}
                          </Button>
                        </Box>
                      )}
                  </>
                ) : (
                  <Box className="no-available">
                    <Card>{t("No Meeting Minute Available!!")}</Card>
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Box className="button-box">
                        <Link to={`/MeetingMinute/${this.state.meetingMinuteId}/Note`}>
                          <Button className="edit">{t("Add")}</Button>
                        </Link>
                      </Box>
                    )}
                  </Box>
                )}
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog fullWidth className="add-meeting" open={this.state.isRejectMeetingModalOpen}>
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">
              Reject Meeting Minutes{" "}
              {moment(
                this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.meeting_date_time,
                "DD-MM-YYYY HH:mm",
                true
              ).format("MMMM DD, YYYY HH:mm")}
            </Typography>
            <IconButton onClick={() => this.handleRejectMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <TextareaAutosize
                className="reject-note"
                placeholder={t("Add Notes")}
                value={this.state.rejectNote}
                onChange={(e: any) => {
                  this.setState({
                    rejectNote: e.target.value,
                  });
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleRejectMeetingModal()}>
              {t("Cancel")}
            </Button>
            <Button
              className="add-button"
              disabled={this.state.rejectNote.length === 0 || this.isInputOnlyWhiteSpace(this.state.rejectNote)}
              onClick={() => this.updateMinuteMeeting("rejected")}
            >
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth
          onClose={() => this.handleApproveMeetingModal()}
          open={this.state.isApproveMeetingModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CheckIcon} alt="check" />
              <Typography variant="h6">
                Approve meeting minutes{" "}
                {moment(
                  this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.meeting_date_time,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("MMMM DD, YYYY HH:mm")}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure you want to approve meeting minutes{" "}
                {moment(
                  this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.meeting_date_time,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("MMMM DD, YYYY HH:mm")}
                ?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleApproveMeetingModal()}
                >
                  {t("Close")}
                </Button>
                <Button
                  style={{ width: "200px" }}
                  className="add-button"
                  onClick={() => this.updateMinuteMeeting("approved")}
                >
                  {t("Confirm")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(MeetingMinuteDetails));
// Customizable Area End
