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
import MeetingMinutesController, {
  Props,
} from "./MeetingMinutesController.web";
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

class MeetingMinutes extends MeetingMinutesController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.scheduledMeeting}
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
                      Meetings /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Meeting Minutes
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Meeting Minutes
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />}>
                      Search
                    </Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box class="table-top">
                      <h3>Meeting Minutes</h3>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase
                          placeholder="Search by title"
                          className="search"
                        />
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableCell align="start">#</TableCell>
                        <TableCell align="start">Title</TableCell>
                        <TableCell align="start">Agenda</TableCell>
                        <TableCell align="start">Date & Time</TableCell>
                        <TableCell align="start">Status</TableCell>
                        <TableCell align="start" />
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="start">1</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start">10-10-1010 14:14</TableCell>
                          <TableCell align="start">
                            <span
                              style={{ background: "black", color: "white" }}
                            >
                              Cancelled
                            </span>
                          </TableCell>
                          <TableCell align="start">
                            <Menu
                              menuButton={
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            >
                              <MenuItem>
                                <Link to="/MeetingMinute/1">View</Link>
                              </MenuItem>
                              <MenuItem>Download</MenuItem>
                              <MenuItem>Share</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody>
                        <TableRow>
                          <TableCell align="start">2</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start">10-10-1010 14:14</TableCell>
                          <TableCell align="start">
                            <span
                              style={{ background: "black", color: "white" }}
                            >
                              Cancelled
                            </span>
                          </TableCell>
                          <TableCell align="start">
                            <Menu
                              menuButton={
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            >
                              <MenuItem>
                                <Link to="/MeetingMinute/1">
                                  View
                                </Link>
                              </MenuItem>
                              <MenuItem>Download</MenuItem>
                              <MenuItem>Share</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Divider />
                    <Box className="table-bottom">
                      <p>
                        Showing <span className="current-page">1</span> of{" "}
                        <span className="total-page">100</span> results
                      </p>
                      <Pagination
                        count={6}
                        variant="outlined"
                        shape="rounded"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          className="add-meeting"
          open={this.state.isCreateMeetingModalOpen}
        >
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
            <Button className="add-button">Create</Button>
          </DialogActions>
        </Dialog>

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

export default withStyles(MeetingsStyleWeb)(MeetingMinutes);
// Customizable Area End
