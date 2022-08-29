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
import ScheduledMeetingController, {
  Props,
} from "./ScheduledMeetingController.web";
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
                    <Button startIcon={<img src={SearchIconImage} />}>
                      Search
                    </Button>
                  </Box>
                  <Box className="create-meeting">
                    <Button onClick={() => this.handleCreateMeetingModal()}>
                      + Create New Meeting
                    </Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box class="table-top">
                      <h3>Schedule Meetings</h3>
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
                        <TableCell align="start">Date & Time</TableCell>
                        <TableCell align="start">Place</TableCell>
                        <TableCell align="start">Agenda</TableCell>
                        <TableCell align="start">Status</TableCell>
                        <TableCell align="start" />
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="start">1</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start">10-10-1010 14:14</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
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
                                <Link to="ScheduledMeeting/1">View</Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() => this.handleEditMeetingModal()}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => this.handleCancelMeetingModal()}
                              >
                                Cancel
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody>
                        <TableRow>
                          <TableCell align="start">1</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start">10-10-1010 14:14</TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
                          <TableCell align="start" className="ellipse">
                            Meeting Title this is new meeting Title this is new
                          </TableCell>
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
                                <Link to="ScheduledMeeting/1">View</Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() => this.handleEditMeetingModal()}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => this.handleCancelMeetingModal()}
                              >
                                Cancel
                              </MenuItem>
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


        
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(ScheduledMeeting);
// Customizable Area End
