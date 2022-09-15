// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MeetingMinutesController, { Props } from "./MeetingMinutesController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import RichTextEditor from "react-rte";
import { CheckIcon } from "./assets";

class MeetingMinuteNote extends MeetingMinutesController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const meeting_id = this.props.navigation.getParam("id");
    console.log(window.location.pathname);

    this.setState({ meetingMinuteId: meeting_id }, () => {
      this.MinuteMeetingDetail();
    });
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.scheduledMeeting}>
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
                  {this.state.isNotePreviewOpen ? (
                    <Box>
                      <Typography variant="body1">
                        Meetings / Scheduled Meetings / Meeting Details /{" "}
                        <Box component="span" style={{ color: "blue" }}>
                          Preview Meeting Minutes
                        </Box>
                      </Typography>
                      <Typography variant="h5" className="sub-heading">
                        Preview Meeting Minutes
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1">
                        Meetings / Scheduled Meetings / Meeting Details /{" "}
                        <Box component="span" style={{ color: "blue" }}>
                          {this.state.meetingMinuteDetails &&
                          this.state.meetingMinuteDetails.attributes.meeting_mins_notes
                            ? "Edit Meeting Minutes"
                            : "Add Meeting Minutes"}
                        </Box>
                      </Typography>
                      <Typography variant="h5" className="sub-heading">
                        {this.state.meetingMinuteDetails &&
                        this.state.meetingMinuteDetails.attributes.meeting_mins_notes
                          ? "Edit Meeting Minutes"
                          : "Add Meeting Minutes"}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box className="meeting-minute-note">
                  {this.state.isNotePreviewOpen ? (
                    <Card>
                      <h4 style={{ marginBottom: "20px" }}>
                        Meeting Minutes{" "}
                        {this.state.meetingMinuteDetails &&
                          this.state.meetingMinuteDetails.attributes.meeting_date_time}
                      </h4>
                      <Divider />
                      <div
                        style={{ marginTop: "20px" }}
                        dangerouslySetInnerHTML={{
                          __html: this.state.meetingNote._cache.html,
                        }}
                      />
                    </Card>
                  ) : (
                    <Card>
                      <p>Details</p>
                      <RichTextEditor className="editor" value={this.state.meetingNote} onChange={this.onChange} />
                    </Card>
                  )}
                  {this.state.isNotePreviewOpen ? (
                    <Box className="note-button">
                      <Button className="submit" onClick={() => this.handleNotePreview()}>
                        Edit
                      </Button>
                      <Button
                        className="preview"
                        disabled={!this.state.meetingNote._cache.html}
                        onClick={() => this.handleSubmitNoteModal()}
                      >
                        Submit
                      </Button>
                    </Box>
                  ) : (
                    <Box className="note-button">
                      <Button
                        className="submit"
                        disabled={!this.state.meetingNote._cache.html}
                        onClick={() => this.handleSubmitNoteModal()}
                      >
                        Submit
                      </Button>
                      <Button className="preview" onClick={() => this.handleNotePreview()}>
                        Preview
                      </Button>
                    </Box>
                  )}
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleSubmitNoteModal()}
          open={this.state.isSubmitNoteModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CheckIcon} alt="check" />
              <Typography variant="h6">Submit Meeting Minutes</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure you want to submit meeting minutes?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleSubmitNoteModal()}
                >
                  Close
                </Button>
                <Button style={{ width: "200px" }} className="add-button" onClick={() => this.meetingMinuteNote()}>
                  Confirm
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MeetingMinuteNote);
// Customizable Area End
