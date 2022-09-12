// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import { BuildingLogo, DownloadIcon, PdfIcon } from "./assets";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";

class MyMeetingMinuteDetail extends MyMeetingsController {
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
        <Box style={{ background: "white", height: "100vh" }} className={classes.meetingDetail}>
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
                    Meeting Minutes
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <Box className="meeting-details">
                      <Box>
                        <iframe
                          src={this.state.meeting && this.state.meeting.attributes.meeting_mins_pdf.url}
                          title="description"
                        />
                      </Box>
                    </Box>
                    <div className="upload-button meeting-pdf">
                      {/* <Grid container>
                        <Grid item xs={12} md={12}> */}
                      <Box className="pdf-detail">
                        <div className="heading">
                          <img src={PdfIcon} alt="pdf" />
                          <h6>
                            Meeting Minutes {this.state.meeting && this.state.meeting.attributes.meeting_date_time}
                          </h6>
                        </div>
                        <Link
                          href={this.state.meeting && this.state.meeting.attributes.meeting_mins_pdf.url}
                          target="_blank"
                          className="download-pdf"
                        >
                          <img src={DownloadIcon} alt="download" />
                        </Link>
                      </Box>
                      {/* </Grid>
                      </Grid> */}
                    </div>
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
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MyMeetingMinuteDetail);
// Customizable Area End
