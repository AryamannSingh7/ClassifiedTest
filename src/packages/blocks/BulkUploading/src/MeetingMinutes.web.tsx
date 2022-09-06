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
import MeetingMinutesController, { Props } from "./MeetingMinutesController.web";
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

  componentDidMount(): Promise<void> {
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
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />}>Search</Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3>Meeting Minutes</h3>
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
                          <TableCell align="left">Agenda</TableCell>
                          <TableCell align="left">Date & Time</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.meetingMinuteList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>No Meeting Minutes Available!!</TableCell>
                          </TableRow>
                        )}
                        {this.state.meetingMinuteList.map((meeting: any, index: string) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{index + 1}</TableCell>
                              <TableCell align="left" className="ellipse">
                                {meeting.attributes.title}
                              </TableCell>
                              <TableCell align="left" className="ellipse">
                                {meeting.attributes.agenda}
                              </TableCell>
                              <TableCell align="left">
                                {meeting.attributes.meeting_date_time}
                              </TableCell>
                              <TableCell align="left">
                                <span className={meeting.attributes.meeting_mins_status}>
                                  {meeting.attributes.meeting_mins_status}
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
                                    <Link to={`/MeetingMinute/${meeting.id}`}>View</Link>
                                  </MenuItem>
                                  <MenuItem>Download</MenuItem>
                                  <MenuItem>Share</MenuItem>
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
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MeetingMinutes);
// Customizable Area End
