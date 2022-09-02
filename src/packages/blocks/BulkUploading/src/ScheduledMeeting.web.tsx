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
  Select,
  MenuItem,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Input,
  InputBase,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ScheduledMeetingController, { Props } from "./ScheduledMeetingController.web";
import { Link } from "react-router-dom";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import SearchIconImage from "../assets/search.png";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Pagination from "@material-ui/lab/Pagination";
import CommentIcon from "../assets/comment.png";

class ScheduledMeeting extends ScheduledMeetingController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getAllMeetings();
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
                      Meetings /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Scheduled Meetings
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Scheduled Meetings
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Select Place</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />}>Search</Button>
                  </Box>
                  <Box className="create-meeting">
                    <Button onClick={() => this.handleCreateMeetingModal()}>
                      + Create New Meeting
                    </Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3>Schedule Meetings</h3>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase placeholder="Search by title" className="search" />
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">#</TableCell>
                          <TableCell align="left">Title</TableCell>
                          <TableCell align="left">Date & Time</TableCell>
                          <TableCell align="left">Place</TableCell>
                          <TableCell align="left">Agenda</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.scheduleMeetingList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6}>No Schedule Meeting Available!!</TableCell>
                          </TableRow>
                        )}
                        {this.state.scheduleMeetingList.map((meeting: any, index: string) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{index + 1}</TableCell>
                              <TableCell align="left" className="ellipse">
                                {meeting.attributes.title}
                              </TableCell>
                              <TableCell align="left">
                                {meeting.attributes.meeting_date_time}
                              </TableCell>
                              <TableCell align="left" className="ellipse">
                                {meeting.attributes.place}
                              </TableCell>
                              <TableCell align="left" className="ellipse">
                                {meeting.attributes.agenda}
                              </TableCell>
                              <TableCell align="left">
                                <span className={meeting.attributes.status}>
                                  {meeting.attributes.status}
                                </span>
                              </TableCell>
                              <TableCell align="left">
                                <Menu
                                  menuButton={
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                >
                                  <MenuItem>
                                    <Link to={`ScheduledMeeting/${meeting.id}`}>View</Link>
                                  </MenuItem>
                                  <MenuItem onClick={() => this.handleEditMeetingModal()}>
                                    Edit
                                  </MenuItem>
                                  <MenuItem onClick={() => this.handleCancelMeetingModal()}>
                                    Cancel
                                  </MenuItem>
                                </Menu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <Divider />
                    <Box className="table-bottom">
                      <p>
                        Showing <span className="current-page">1</span> of{" "}
                        <span className="total-page">100</span> results
                      </p>
                      <Pagination count={6} variant="outlined" shape="rounded" />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog fullWidth className="add-meeting" open={this.state.isCreateMeetingModalOpen}>
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Create New Meeting</Typography>
            <IconButton onClick={() => this.handleCreateMeetingModal()}>
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
                    <Input
                      fullWidth
                      type="text"
                      placeholder="Date"
                      onFocus={(e) => (e.target.type = "date")}
                    />
                  </div>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <div className="date-time">
                    <Input
                      fullWidth
                      type="text"
                      placeholder="Time"
                      onFocus={(e) => (e.target.type = "time")}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <Select displayEmpty value="" className="dialog-select-input">
                <MenuItem value="" disabled>
                  <em>Select Building</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder="Place" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder="Agenda" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Select displayEmpty value="" className="dialog-select-input">
                <MenuItem value="" disabled>
                  <em>Designated Meeting of Minutes writer</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleCreateMeetingModal()}>
              Cancel
            </Button>
            <Button className="add-button">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth className="add-meeting" open={this.state.isEditMeetingModalOpen}>
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
              <Select displayEmpty value="" className="dialog-select-input">
                <MenuItem value="" disabled>
                  <em>Select Building</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder="Place" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder="Agenda" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <Select displayEmpty value="" className="dialog-select-input">
                <MenuItem value="" disabled>
                  <em>Designated Meeting of Minutes writer</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleEditMeetingModal()}>
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
                Are you sure want to cancel the meeting scheduled on 16-06-2022 16:30 at Common
                Hall? Once cancelled, attendees will receive a meeting cancelation notification.
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

export default withStyles(MeetingsStyleWeb)(ScheduledMeeting);
// Customizable Area End
