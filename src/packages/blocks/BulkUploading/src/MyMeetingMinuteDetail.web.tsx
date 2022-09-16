// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import { BuildingLogo, DownloadIcon, PdfIcon } from "./assets";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";

class MyMeetingMinuteDetail extends MyMeetingsController {
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
                    {t("Meeting Minutes")}
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <Box className="meeting-details">
                      <Box>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.meeting && this.state.meeting.attributes.meeting_mins_notes,
                          }}
                        />
                      </Box>
                    </Box>
                    <div className="upload-button meeting-pdf">
                      <Box className="pdf-detail">
                        <div className="heading">
                          <img src={PdfIcon} alt="pdf" />
                          <h6>
                            Meeting Minutes{" "}
                            {this.state.meeting &&
                              moment(this.state.meeting.attributes.meeting_date_time, "DD-MM-YYYY HH:mm", true).format(
                                "DD-MMM-YYYY HH:mm"
                              )}
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

export default withTranslation()(withStyles(MeetingsStyleWeb)(MyMeetingMinuteDetail));
// Customizable Area End
