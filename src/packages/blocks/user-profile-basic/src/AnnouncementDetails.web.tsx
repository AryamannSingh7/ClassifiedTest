// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Box,
  Grid,
  Card,
  TextareaAutosize,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import AnnouncementsController, { Props } from "./AnnouncementsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import { avatarIcon, calenderIcon, CheckIcon, phone, poolImage } from "./assets";

class AnnouncementDetails extends AnnouncementsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {}

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.suggestionDetails}>
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
                      Community Management / Announcements /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Announcement Details
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading">
                    <h3>Announcement Details</h3>
                    <Button onClick={() => this.handleWithdrawModal()}>withdraw Announcement</Button>
                  </Box>
                </Box>
                <Box className="content-box">
                  <Box className="suggestion-detail">
                    <Card>
                      <img src={poolImage.default} />
                      <Box className="heading">
                        <p>
                          <span>Swimming Pool will be closed till 28/03/22</span>
                        </p>
                        <span className="blue-span">Building Rules</span>
                      </Box>
                      <p>Description</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aliquid sint non numquam repellat
                        quos, at culpa inventore dicta totam dolore asperiores molestias accusamus, dolorum, saepe
                        assumenda natus nobis sequi.
                      </p>
                      <Box className="suggestion-info">
                        <Box className="info">
                          <img src={avatarIcon} />
                          <Box>
                            <p className="heading">Announced By:</p>
                            <p>Mr. Ali Khan</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={calenderIcon} />
                          <Box>
                            <p className="heading">Announced On:</p>
                            <p>11-11-1111 11:11</p>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleWithdrawModal()}
          open={this.state.isWithdrawAnnouncementModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CheckIcon} alt="check" />
              <Typography variant="h6">Withdraw Announcement</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure you want to withdrawn the announcement? <br />
                If you withdraw the announcement it will be deleted from the system.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.handleWithdrawModal()}>
                  Close
                </Button>
                <Button style={{ width: "200px" }} className="add-button" onClick={() => {}}>
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

export default withStyles(SuggestionStyleWeb)(AnnouncementDetails);
// Customizable Area End