// Customizable Area Start
//@ts-nocheck
//@ts-ignore
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
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyMeetingsController, { Props } from "./MyMeetingsController.web";
import BuildingLogo from "../assets/building.png";
import CommentIcon from "../assets/comment.png";
import UserIcon from "../assets/user.png";
import CalenderBlueIcon from "../assets/calender-blue.png";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { orange } from "@material-ui/core/colors";

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
                    Meeting Title
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <Box className="meeting-details">
                      <Box className="meeting-detail">
                        <Box className="heading">
                          <h4>Meeting Details</h4>
                          <span style={{ background: "black", color: "white" }}>Accepted</span>
                        </Box>
                        <Card className="meeting-card">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <span>Date & Time: </span>
                              <p>01-01-1010 10:10</p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>Place: </span>
                              <p>Central park common hall</p>
                            </Grid>
                            <Grid item xs={12}>
                              <span>Agenda: </span>
                              <p>To discuss new vehicle guidelines</p>
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
                                <p>Mr. Ali Khan</p>
                              </Box>
                            </Grid>
                            <Grid item xs={6} className="item">
                              <img src={CalenderBlueIcon} alt="" />
                              <Box>
                                <span>Scheduled On: </span>
                                <p>01-01-1010 10:10</p>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    </Box>
                    <div className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Button onClick={() => this.handleAttendMeetingModal()}>
                            Submit Your Response
                          </Button>
                        </Grid>
                      </Grid>
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
                Please confirm whether you are going to attend meeting on 21st May, 2022 or not.
              </Typography>
              <Box className="choice">
                <FormControlLabel
                  className="radio-select"
                  control={
                    <OrangeRadio
                      checked={true}
                      // onChange={handleChange}
                      // value="c"
                    />
                  }
                  label="I will attend"
                />
                <FormControlLabel
                  className="radio-select"
                  control={
                    <OrangeRadio
                      checked={false}
                      // onChange={handleChange}
                      // value="c"
                    />
                  }
                  label="I won't attend"
                />
              </Box>
              <DialogActions className="dialog-button-group">
                <Button className="add-button">Submit</Button>
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
