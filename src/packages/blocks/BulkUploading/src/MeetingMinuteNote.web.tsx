// Customizable Area Start
import React from "react";
import { Container, Typography, withStyles, Card, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MeetingMinutesController, { Props } from "./MeetingMinutesController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import RichTextEditor from "react-rte";

class MeetingMinuteNote extends MeetingMinutesController {
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
                      {this.state.meetingMinuteDetails && this.state.meetingMinuteDetails.attributes.meeting_mins_notes
                        ? "Edit Meeting Minutes"
                        : "Add Meeting Minutes"}
                    </Typography>
                  </Box>
                </Box>
                <Box className="meeting-minute-note">
                  <Card>
                    <p>Details</p>
                    <RichTextEditor className="editor" value={this.state.meetingNote} onChange={this.onChange} />
                  </Card>
                  <Button onClick={() => this.meetingMinuteNote()}>Submit for Approval</Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MeetingMinuteNote);
// Customizable Area End
