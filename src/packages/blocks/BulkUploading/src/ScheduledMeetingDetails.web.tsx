// Customizable Area Start
//@ts-nocheck
//@ts-ignore

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
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ScheduledMeetingController, {
  Props,
} from "./ScheduledMeetingController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import AwaitIcon from "../assets/await.png";
import AcceptIcon from "../assets/accept.png";
import RejectIcon from "../assets/reject.png";
import CommentIcon from "../assets/comment.png";

class ScheduledMeetingDetails extends ScheduledMeetingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.scheduledMeetingDetails}
        >
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
                      Meetings / Scheduled Meetings /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Meeting Details
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Meeting Details
                    </Typography>
                  </Box>
                </Box>
                <Box className="meeting-detail-box">
                  <Box className="meeting-top">
                    <h3>Meeting Title</h3>
                    <span style={{ background: "black", color: "white" }}>
                      Scheduled
                    </span>
                  </Box>
                  <Divider />
                  <Box className="meeting-details">
                    <h4>Meeting Details</h4>
                    <Box className="items">
                      <span>Date & Time: </span>
                      <p>10-10-1101 10:10</p>
                    </Box>
                    <Box className="items">
                      <span>Place: </span>
                      <p>Central park common hall</p>
                    </Box>
                    <Box className="items">
                      <span>Building: </span>
                      <p>Building 1</p>
                    </Box>
                    <Box className="items">
                      <span>Agenda: </span>
                      <p>To discuss new vehicle guidelines</p>
                    </Box>
                  </Box>
                  <Box className="meeting-details">
                    <h4>Scheduling Details</h4>
                    <Box className="items">
                      <span>Scheduled By: </span>
                      <p>Mr. Ali Khan</p>
                    </Box>
                    <Box className="items">
                      <span>Scheduled On: </span>
                      <p>10-10-1010 10:10</p>
                    </Box>
                  </Box>
                  <Box className="meeting-details">
                    <h4>Cancelled Details</h4>
                    <Box className="items">
                      <span>Cancelled By: </span>
                      <p>Mr. Ali Khan</p>
                    </Box>
                    <Box className="items">
                      <span>Cancelled On: </span>
                      <p>10-10-1010 10:10</p>
                    </Box>
                  </Box>
                </Box>
                <Box className="response-box">
                  <h3>Response</h3>
                  <Box className="status">
                    <div className="item">
                      <img src={AwaitIcon} />
                      <p>
                        Awaiting <span>84</span>
                      </p>
                    </div>
                    <div className="item">
                      <img src={AcceptIcon} />
                      <p>
                        Accepted <span>84</span>
                      </p>
                    </div>
                    <div className="item">
                      <img src={RejectIcon} />
                      <p>
                        Rejected <span>84</span>
                      </p>
                    </div>
                  </Box>
                </Box>
                <Box className="button-box">
                  <Button
                    className="cancel"
                    onClick={() => this.handleCancelMeetingModal()}
                  >
                    Cancel Meeting
                  </Button>
                  <Button
                    className="edit"
                    onClick={() => this.handleEditMeetingModal()}
                  >
                    Edit Meeting
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          className="add-meeting"
          open={this.state.isEditMeetingModalOpen}
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Edit Meeting</Typography>
            <IconButton onClick={() => this.handleEditMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <Input placeholder="Title" className="dialog-input" />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <div className="date-time">
                    <Input fullWidth type="date" placeholder="Placeholder" />
                  </div>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <div className="date-time">
                    <Input
                      fullWidth
                      type="time"
                      placeholder="Placeholder"
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <Input placeholder="Place" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder="Agenda" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Select displayEmpty value="" className="dialog-select-input">
                <MenuItem value="" disabled>
                  <em>Select Place</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              className="cancel-button"
              onClick={() => this.handleCreateMeetingModal()}
            >
              Cancel
            </Button>
            <Button className="add-button">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth
          onClose={() => this.handleCancelMeetingModal()}
          open={this.state.isCancelMeetingModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CommentIcon} alt="comment" />
              <Typography variant="h6">Cancel Meeting Confirmation</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure want to cancel the meeting scheduled on 16-06-2022
                16:30 at Common Hall? Once cancelled, attendees will receive a
                meeting cancelation notification.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleCancelMeetingModal()}
                >
                  No, Don't Cancel
                </Button>
                <Button style={{ width: "200px" }} className="add-button">
                  Yes, Cancel
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(ScheduledMeetingDetails);
// Customizable Area End
