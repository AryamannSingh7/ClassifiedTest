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
  InputLabel,
  NativeSelect,
  InputBase,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ScheduledMeetingController, {
  Props,
} from "./ScheduledMeetingController.web";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import SearchIconImage from "../assets/search.png";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Pagination from "@material-ui/lab/Pagination";

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
                    <Button>+ Create New Meeting</Button>
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
                              <MenuItem>Download</MenuItem>
                              <MenuItem>Delete</MenuItem>
                              <MenuItem>Share</MenuItem>
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
                              <MenuItem>Download</MenuItem>
                              <MenuItem>Delete</MenuItem>
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

        <Dialog className="add-faq-dialog" onClose={() => {}} open={false}>
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Add Questions</Typography>
            <IconButton onClick={() => {}}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <select className="dialog-select-input">
                <option aria-label="None" value="">
                  Select Category
                </option>
              </select>
            </FormControl>
            <FormControl fullWidth>
              <input placeholder="Title Questions" className="dialog-input" />
            </FormControl>
            <FormControl fullWidth>
              <textarea
                className="dialog-textarea-input"
                placeholder="Answer"
              />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button">Cancel</Button>
            <Button className="add-button">Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog className="add-faq-dialog" onClose={() => {}} open={false}>
          <MuiDialogTitle className="dialog-heading" disableTypography>
            <Typography variant="h6">Edit Questions</Typography>
            <IconButton onClick={() => {}}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <select className="dialog-select-input">
                <option aria-label="None" value="">
                  Select Category
                </option>
              </select>
            </FormControl>
            <FormControl fullWidth>
              <input className="dialog-input" placeholder="Title Questions" />
            </FormControl>
            <FormControl fullWidth>
              <textarea
                className="dialog-textarea-input"
                placeholder="Answer"
              />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button">Cancel</Button>
            <Button className="add-button">Edit</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="delete-dialog"
          fullWidth
          onClose={() => {}}
          open={false}
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              {/* <img
                  className="comment-image"
                  src={CommentImage}
                  alt="comment"
                /> */}
              <Typography variant="h6">
                Do you want to delete the category?
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure want to delete the category "
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                All FAQ related this category will be deleted permanently.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button className="cancel-button" style={{ width: "200px" }}>
                  No, Don't Delete
                </Button>
                <Button style={{ width: "200px" }} className="add-button">
                  Yes Delete
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
