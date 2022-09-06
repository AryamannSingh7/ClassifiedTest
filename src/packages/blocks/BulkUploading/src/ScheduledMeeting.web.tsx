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
import { Formik, Form } from "formik";
import moment from "moment";

class ScheduledMeeting extends ScheduledMeetingController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    await this.getAllMeetings();
    await this.getBuildingsList();
    await this.getManagersList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.filter.title !== this.state.filter.title ||
      prevState.filter.status !== this.state.filter.status ||
      prevState.filter.date !== this.state.filter.date ||
      prevState.filter.place !== this.state.filter.place ||
      prevState.filter.page !== this.state.filter.page
    ) {
      await this.getAllMeetings();
    }
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
                    {/* <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Select Place</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                    <Input
                      type="text"
                      placeholder="Place"
                      className="input"
                      value={this.state.place}
                      onChange={(e: any) => {
                        this.setState({
                          ...this.state,
                          place: e.target.value.trim(),
                        });
                      }}
                    />
                    <Select
                      displayEmpty
                      value=""
                      className="select-input"
                      value={this.state.status}
                      onChange={(e: any) => {
                        this.setState({
                          ...this.state,
                          status: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                    <Input
                      value={this.state.date}
                      onChange={(e: any) => {
                        this.setState({
                          ...this.state,
                          date: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="Date"
                      className="input"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <Button
                      startIcon={<img src={SearchIconImage} />}
                      onClick={() => {
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            place: this.state.place,
                            status: this.state.status,
                            date: this.state.date,
                            title: "",
                          },
                        });
                      }}
                    >
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
                    <Box className="table-top">
                      <h3>Schedule Meetings</h3>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase
                          placeholder="Search by title"
                          className="search"
                          value={this.state.filter.title}
                          onChange={(e: any) => {
                            this.setState({
                              ...this.state,
                              filter: {
                                ...this.state.filter,
                                title: e.target.value.trim(),
                              },
                            });
                          }}
                        />
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
                                  {meeting.attributes.status === "scheduled" && (
                                    <>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState(
                                            {
                                              scheduleMeetingId: meeting.id,
                                              meetingForm: {
                                                title: meeting.attributes.title,
                                                place: meeting.attributes.place,
                                                agenda: meeting.attributes.agenda,
                                                building: meeting.attributes.building.id,
                                                date: moment(
                                                  meeting.attributes.meeting_date_time.split(" ")[0]
                                                ).format("YYYY-MM-DD"),
                                                time: meeting.attributes.meeting_date_time.split(" ")[1],
                                                momWriter: "",
                                              },
                                            },
                                            () => {
                                              this.handleEditMeetingModal();
                                            }
                                          );
                                        }}
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState(
                                            {
                                              scheduleMeetingId: meeting.id,
                                            },
                                            () => {
                                              this.handleCancelMeetingModal();
                                            }
                                          );
                                        }}
                                      >
                                        Cancel
                                      </MenuItem>
                                    </>
                                  )}
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
                        Showing{" "}
                        <span className="current-page">
                          {this.state.scheduleMeetingList.length}
                        </span>{" "}
                        of{" "}
                        <span className="total-page">
                          {this.state.pagination && this.state.pagination.total_count}
                        </span>{" "}
                        results
                      </p>
                      {this.state.pagination && (
                        <Pagination
                          onChange={(event: any, value: any) => {
                            this.setState({
                              ...this.state,
                              filter: {
                                ...this.state.filter,
                                page: Number(value),
                              },
                            });
                          }}
                          count={this.state.pagination.total_pages}
                          page={this.state.pagination.current_page}
                          siblingCount={2}
                          variant="outlined"
                          shape="rounded"
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          scroll="paper"
          open={this.state.isCreateMeetingModalOpen}
          className="add-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Create New Meeting</Typography>
            <IconButton onClick={() => this.handleCreateMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            initialValues={this.state.meetingForm}
            validationSchema={this.addMeetingValidation}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              this.handleCreateMeetingModal();
              this.createMeeting(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              // console.log(values);

              return (
                <Form onSubmit={handleSubmit}>
                  <DialogContent dividers>
                    <FormControl fullWidth>
                      <Input
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="title"
                        placeholder="Title"
                        className="dialog-input"
                      />
                      {errors.title && touched.title && (
                        <small className="error">{errors.title}</small>
                      )}
                    </FormControl>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <input
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="date"
                              className="date"
                              min={moment().format("YYYY-MM-DD")}
                              fullWidth
                              type="text"
                              placeholder="Date"
                              onFocus={(e) => (e.target.type = "date")}
                            />
                          </div>
                          {errors.date && touched.date && (
                            <small className="error">{errors.date}</small>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <Input
                              value={values.time}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="time"
                              fullWidth
                              type="text"
                              placeholder="Time"
                              onFocus={(e) => (e.target.type = "time")}
                            />
                          </div>
                          {errors.time && touched.time && (
                            <small className="error">{errors.time}</small>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Select
                        value={values.building}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="building"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          <em>Select Building</em>
                        </MenuItem>
                        {this.state.buildingsList.map((building: any) => {
                          return (
                            <MenuItem value={building.id} key={building.id}>
                              {building.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.building && touched.building && (
                        <small className="error">{errors.building}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.place}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="place"
                        placeholder="Place"
                        className="dialog-input"
                      />
                      {errors.place && touched.place && (
                        <small className="error">{errors.place}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.agenda}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="agenda"
                        placeholder="Agenda"
                        className="dialog-input"
                      />
                      {errors.agenda && touched.agenda && (
                        <small className="error">{errors.agenda}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={values.momWriter}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="momWriter"
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          <em>Designated Meeting of Minutes writer</em>
                        </MenuItem>
                        {this.state.managersList.map((manager: any) => {
                          return (
                            <MenuItem value={manager.id} key={manager.id}>
                              {manager.full_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.momWriter && touched.momWriter && (
                        <small className="error">{errors.momWriter}</small>
                      )}
                    </FormControl>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button
                      className="cancel-button"
                      onClick={() => this.handleCreateMeetingModal()}
                    >
                      Cancel
                    </Button>
                    <Button className="add-button" type="submit">
                      Save
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog
          fullWidth
          scroll="paper"
          className="add-meeting"
          open={this.state.isEditMeetingModalOpen}
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Edit Meeting</Typography>
            <IconButton onClick={() => this.handleEditMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            initialValues={this.state.meetingForm}
            validationSchema={this.addMeetingValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleEditMeetingModal();
              this.editMeeting(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <DialogContent dividers>
                    <FormControl fullWidth>
                      <Input
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="title"
                        placeholder="Title"
                        className="dialog-input"
                      />
                      {errors.title && touched.title && (
                        <small className="error">{errors.title}</small>
                      )}
                    </FormControl>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <input
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="date"
                              format="DD-MM-YYYY"
                              className="date"
                              min={moment().format("YYYY-MM-DD")}
                              fullWidth
                              type="text"
                              placeholder="Date"
                              onFocus={(e) => (e.target.type = "date")}
                            />
                          </div>
                          {errors.date && touched.date && (
                            <small className="error">{errors.date}</small>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <Input
                              value={values.time}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="time"
                              fullWidth
                              type="text"
                              placeholder="Time"
                              onFocus={(e) => (e.target.type = "time")}
                            />
                          </div>
                          {errors.time && touched.time && (
                            <small className="error">{errors.time}</small>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Select
                        value={values.building}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="building"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          <em>Select Building</em>
                        </MenuItem>
                        {this.state.buildingsList.map((building: any) => {
                          return (
                            <MenuItem value={building.id} key={building.id}>
                              {building.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.building && touched.building && (
                        <small className="error">{errors.building}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.place}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="place"
                        placeholder="Place"
                        className="dialog-input"
                      />
                      {errors.place && touched.place && (
                        <small className="error">{errors.place}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.agenda}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="agenda"
                        placeholder="Agenda"
                        className="dialog-input"
                      />
                      {errors.agenda && touched.agenda && (
                        <small className="error">{errors.agenda}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={values.momWriter}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="momWriter"
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          <em>Designated Meeting of Minutes writer</em>
                        </MenuItem>
                        {this.state.managersList.map((manager: any) => {
                          return (
                            <MenuItem value={manager.id} key={manager.id}>
                              {manager.full_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.momWriter && touched.momWriter && (
                        <small className="error">{errors.momWriter}</small>
                      )}
                    </FormControl>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleEditMeetingModal()}>
                      Cancel
                    </Button>
                    <Button className="add-button" type="submit">
                      Save
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
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
                <Button
                  style={{ width: "200px" }}
                  className="add-button"
                  onClick={() => this.updateStatusMeeting("cancelled")}
                >
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
