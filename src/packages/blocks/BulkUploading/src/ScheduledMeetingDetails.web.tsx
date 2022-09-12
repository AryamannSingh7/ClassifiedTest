// Customizable Area Start
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ScheduledMeetingController, { Props } from "./ScheduledMeetingController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { CommentIcon, RejectIcon, AcceptIcon, AwaitIcon } from "./assets";
import { Formik, Form } from "formik";
import moment from "moment";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { ROLE } from "../../../framework/src/Enum";

class ScheduledMeetingDetails extends ScheduledMeetingController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const meeting_id = this.props.navigation.getParam("id");
    this.setState({ scheduleMeetingId: meeting_id }, () => {
      this.getScheduleMeetingDetail();
      this.getMeetingResponseList();
      this.getBuildingsList();
      this.getManagersList();
    });
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.scheduledMeetingDetails}>
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
                  </Box>
                  <Box className="sub-heading">
                    <h3>Meeting Details</h3>
                    {this.state.scheduleMeetingStatus === "completed" &&
                      localStorage.getItem("userType") === ROLE.MANAGER && (
                        <Link to={`/ScheduledMeeting/${this.state.scheduleMeetingId}/Note`}>
                          <Button>Add Meeting Minutes</Button>
                        </Link>
                      )}
                  </Box>
                </Box>
                <Box className="meeting-detail-box">
                  <Box className="meeting-top">
                    <h3>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.title}</h3>
                    <span className={this.state.scheduleMeetingStatus}>{this.state.scheduleMeetingStatus}</span>
                  </Box>
                  <Divider />
                  <Box className="meeting-details">
                    <h4>Meeting Details</h4>
                    <Box className="items">
                      <span>Date & Time: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.meeting_date_time}
                      </p>
                    </Box>
                    <Box className="items">
                      <span>Place: </span>
                      <p>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.place}</p>
                    </Box>
                    <Box className="items">
                      <span>Building: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.building.name}
                      </p>
                    </Box>
                    <Box className="items">
                      <span>Agenda: </span>
                      <p>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.agenda}</p>
                    </Box>
                  </Box>
                  <Box className="meeting-details">
                    <h4>Scheduling Details</h4>
                    <Box className="items">
                      <span>Scheduled By: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_by}
                      </p>
                    </Box>
                    <Box className="items">
                      <span>Scheduled On: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on}
                      </p>
                    </Box>
                  </Box>
                  {this.state.scheduleMeetingStatus === "cancelled" &&
                    this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail && (
                      <Box className="meeting-details">
                        <h4>Cancelled Details</h4>
                        <Box className="items">
                          <span>Cancelled By: </span>
                          <p>{this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail.cancelled_by}</p>
                        </Box>
                        <Box className="items">
                          <span>Cancelled On: </span>
                          <p>{this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail.cancelled_on}</p>
                        </Box>
                      </Box>
                    )}
                </Box>
                {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus === "scheduled" ? (
                  <Box className="response-box">
                    <Box className="heading">
                      <h3>Response</h3>
                      <Box className="status">
                        <div className="item">
                          <img src={AwaitIcon} />
                          <p>
                            Awaiting{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.awaited}</span>
                          </p>
                        </div>
                        <div className="item">
                          <img src={AcceptIcon} />
                          <p>
                            Accepted{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.accepted}</span>
                          </p>
                        </div>
                        <div className="item">
                          <img src={RejectIcon} />
                          <p>
                            Rejected{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.rejected}</span>
                          </p>
                        </div>
                      </Box>
                    </Box>
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Building</TableCell>
                          <TableCell>Unit No.</TableCell>
                          <TableCell>Floor Number</TableCell>
                          <TableCell>Response</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.responseList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>No User Available !!</TableCell>
                          </TableRow>
                        )}
                        {this.state.responseList.map((user: any) => {
                          return (
                            <TableRow>
                              <TableCell>{user.attributes.Name}</TableCell>
                              <TableCell>{user.attributes.building_name}</TableCell>
                              <TableCell>{user.attributes.unit_number}</TableCell>
                              <TableCell>{user.attributes.floor_number}</TableCell>
                              <TableCell>
                                <span className={user.attributes.status}>{user.attributes.status}</span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <Box className="table-bottom">
                      <p>
                        Showing <span className="current-page">1</span> of <span className="total-page">100</span>{" "}
                        results
                      </p>
                      <Pagination count={5} page={2} siblingCount={2} variant="outlined" shape="rounded" />
                    </Box>
                  </Box>
                ) : (
                  <Box className="response-box">
                    <Box className="heading">
                      <h3>Meeting Joinees</h3>
                    </Box>
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Building</TableCell>
                          <TableCell>Unit No.</TableCell>
                          <TableCell>Floor Number</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.responseList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>No User Available !!</TableCell>
                          </TableRow>
                        )}
                        {this.state.responseList.map((user: any) => {
                          return (
                            <TableRow>
                              <TableCell>{user.attributes.Name}</TableCell>
                              <TableCell>{user.attributes.building_name}</TableCell>
                              <TableCell>{user.attributes.unit_number}</TableCell>
                              <TableCell>{user.attributes.floor_number}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <Box className="table-bottom">
                      <p>
                        Showing <span className="current-page">1</span> of <span className="total-page">100</span>{" "}
                        results
                      </p>
                      <Pagination count={5} page={2} siblingCount={2} variant="outlined" shape="rounded" />
                    </Box>
                  </Box>
                )}
                <Box className="button-box">
                  {/* <Button className="cancel" onClick={() => this.handleCompleteMeetingModal()}>
                    Complete Meeting
                  </Button> */}
                  {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus === "scheduled" && (
                    <Button className="cancel" onClick={() => this.handleCancelMeetingModal()}>
                      Cancel Meeting
                    </Button>
                  )}
                  <Button className="edit" onClick={() => this.openEditMeetingModal(this.state.scheduleMeetingDetails)}>
                    Edit Meeting
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog scroll="paper" fullWidth className="add-meeting" open={this.state.isEditMeetingModalOpen}>
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
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
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
                      {errors.title && touched.title && <small className="error">{errors.title}</small>}
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
                              type="date"
                            />
                          </div>
                          {errors.date && touched.date && <small className="error">{errors.date}</small>}
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
                              type="time"
                            />
                          </div>
                          {errors.time && touched.time && <small className="error">{errors.time}</small>}
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
                      {errors.building && touched.building && <small className="error">{errors.building}</small>}
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
                      {errors.place && touched.place && <small className="error">{errors.place}</small>}
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
                      {errors.agenda && touched.agenda && <small className="error">{errors.agenda}</small>}
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
                      {errors.momWriter && touched.momWriter && <small className="error">{errors.momWriter}</small>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="status"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value="scheduled">Scheduled</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                      {errors.status && touched.status && <small className="error">{errors.status}</small>}
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
                Are you sure want to cancel the meeting scheduled on{" "}
                {this.state.scheduleMeetingDetails &&
                  this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                  this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on}{" "}
                at Common Hall? Once cancelled, attendees will receive a meeting cancelation notification.
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

        <Dialog
          fullWidth
          onClose={() => this.handleCompleteMeetingModal()}
          open={this.state.isCompleteMeetingModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CommentIcon} alt="comment" />
              <Typography variant="h6">Complete Meeting Confirmation</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure want to complete the meeting scheduled on{" "}
                {this.state.scheduleMeetingDetails &&
                  this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                  this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on}{" "}
                at Common Hall? Once completed, attendees will receive a meeting completion notification.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleCompleteMeetingModal()}
                >
                  No, Don't Complete
                </Button>
                <Button
                  style={{ width: "200px" }}
                  className="add-button"
                  onClick={() => this.updateStatusMeeting("completed")}
                >
                  Yes, Complete
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
