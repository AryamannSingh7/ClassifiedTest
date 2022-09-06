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
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import BuildingLogo from "../assets/building.png";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import DownloadIcon from "../assets/download.png";
import PdfIcon from "../assets/pdf.png";

class MyMeetingMinuteDetail extends MyMeetingsController {
  constructor(props: Props) {
    super(props);
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
                      <Box>Meeting Minutes</Box>
                    </Box>
                    <div className="upload-button meeting-pdf">
                      {/* <Grid container>
                        <Grid item xs={12} md={12}> */}
                      <Box className="pdf-detail">
                        <div className="heading">
                          <img src={PdfIcon} alt="pdf" />
                          <h6>Meeting Minutes 01-04-2022</h6>
                        </div>
                        <img src={DownloadIcon} alt="download" />
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
                <img src={BuildingLogo} className="building-logo" alt="" />
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
