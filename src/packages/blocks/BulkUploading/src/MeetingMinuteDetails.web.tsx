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
  TextareaAutosize,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MeetingMinutesController, {
  Props,
} from "./MeetingMinutesController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import DownloadIcon from "../assets/download.png";
import PdfIcon from "../assets/pdf.png";
import CheckIcon from "../assets/check.png";

class MeetingMinuteDetails extends MeetingMinutesController {
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
                      Meetings / Meeting Minutes /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Meeting Title
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Meeting Minutes Details
                    </Typography>
                  </Box>
                </Box>
                <Box className="meeting-detail-box">
                  <Box className="meeting-top">
                    <h3>Meeting Minutes 01-04-2022 18:30</h3>
                    <span style={{ background: "black", color: "white" }}>
                      Pending Approve
                    </span>
                  </Box>
                  <Divider />
                  <Box className="meeting-minute-details">
                    <Box className="resolution">Meeting Detail</Box>
                    <Box className="pdf-detail">
                      <div className="heading">
                        <img src={PdfIcon} alt="pdf" />
                        <h6>Meeting Minutes 01-04-2022</h6>
                      </div>
                      <img src={DownloadIcon} alt="download" />
                    </Box>
                  </Box>
                </Box>
                <Box className="button-box">
                  <Button
                    className="cancel"
                    onClick={() => this.handleRejectMeetingModal()}
                  >
                    Reject
                  </Button>
                  <Button
                    className="edit"
                    onClick={() => this.handleApproveMeetingModal()}
                  >
                    Approve
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          className="add-meeting"
          open={this.state.isRejectMeetingModalOpen}
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">
              Reject Meeting Minutes 01-04-2022 18:30
            </Typography>
            <IconButton onClick={() => this.handleRejectMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <TextareaAutosize
                className="dialog-textarea-input"
                placeholder="Add Notes"
              />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              className="cancel-button"
              onClick={() => this.handleRejectMeetingModal()}
            >
              Cancel
            </Button>
            <Button className="add-button">Confirm</Button>
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
                Approve meeting minutes 01-04-2022 18:30
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure you want to approve meeting minutes 01-04-2022
                18:30?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleApproveMeetingModal()}
                >
                  Close
                </Button>
                <Button style={{ width: "200px" }} className="add-button">
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

export default withStyles(MeetingsStyleWeb)(MeetingMinuteDetails);
// Customizable Area End
