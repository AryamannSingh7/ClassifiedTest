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
  Checkbox,
  TableContainer,
  Box,
  Grid,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ScheduledMeetingController, { Props } from "./ScheduledMeetingController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import { CommentIcon, RejectIcon, AcceptIcon, AwaitIcon, SearchIconImage, Dots } from "./assets";
import { Formik, Form } from "formik";
import moment from "moment";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { ROLE } from "../../../framework/src/Enum";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";

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
      this.getUserList();
      this.getGroupList();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.filter.page !== this.state.filter.page
    ) {
      await this.getMeetingResponseList();
    }
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);
    console.log(this.state.pagination?.total_count);

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
                    {localStorage.getItem("userType") === ROLE.MANAGER &&
                    this.state.scheduleMeetingDetails &&
                    this.state.scheduleMeetingStatus === "completed" &&
                    !this.state.scheduleMeetingDetails.attributes.meeting_mins_pdf ? (
                      <Link to={`/ScheduledMeeting/${this.state.scheduleMeetingId}/Note`}>
                        <Button>Add Meeting Minutes</Button>
                      </Link>
                    ) : (
                      localStorage.getItem("userType") === ROLE.MANAGER && (
                        <Link to={`/MeetingMinute/${this.state.scheduleMeetingId}`}>
                          <Button className="view-button">View Meeting Minutes</Button>
                        </Link>
                      )
                    )}
                  </Box>
                </Box>
                <Box className="meeting-detail-box">
                  <Box className="meeting-top">
                    <Box className="heading">
                      <h3>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.title}</h3>
                      {this.state.scheduleMeetingDetails &&
                        this.state.scheduleMeetingDetails.attributes.meeting_type === "ga_meeting" && (
                          <span className="ga-meeting">GA Meeting</span>
                        )}
                    </Box>
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
                <Box className="response-box">
                  {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus === "scheduled" ? (
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
                  ) : (
                    <Box className="heading">
                      <h3>Meeting Attendees</h3>
                    </Box>
                  )}
                  <Table className="table-box">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Building</TableCell>
                        <TableCell>Unit No.</TableCell>
                        <TableCell>Floor Number</TableCell>
                        {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus !== "cancelled" && (
                          <TableCell>Response</TableCell>
                        )}
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
                            <TableCell>{user.attributes.name}</TableCell>
                            <TableCell>{user.attributes.building_name}</TableCell>
                            <TableCell>{user.attributes.unit_number}</TableCell>
                            <TableCell>{user.attributes.floor_number}</TableCell>
                            {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus !== "cancelled" && (
                              <TableCell>
                                {this.state.scheduleMeetingStatus === "completed" &&
                                user.attributes.response === "awaited" ? (
                                  <span className="no-response">No Response</span>
                                ) : (
                                  <span className={user.attributes.response}>{user.attributes.response}</span>
                                )}
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Box className="table-bottom">
                    <p>
                      Showing <span className="current-page">{this.state.responseList.length}</span> of{" "}
                      <span className="total-page">
                        {this.state.pagination ? this.state.pagination.total_count : 0}
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
                </Box>
                <Box className="button-box">
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
                    {localStorage.getItem("userType") !== ROLE.MANAGER && (
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
                    )}
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
                    {/* Create Audience */}
                    <Box className="create-audience">
                      <p>Select Meeting Attendees</p>
                      <span onClick={() => this.openCreateAttendeeModal()}>+ Create New Group</span>
                    </Box>
                    <Box className="attendee-box">
                      <Box
                        className={`${this.state.selectedGroup === "owner" && "active"} attendee`}
                        onClick={() => {
                          this.setState({ selectedGroup: "owner" });
                        }}
                      >
                        <span>Owner</span>
                      </Box>
                      <Box
                        className={`${this.state.selectedGroup === "resident" && "active"} attendee`}
                        onClick={() => {
                          this.setState({ selectedGroup: "resident" });
                        }}
                      >
                        <span>Resident</span>
                      </Box>
                      {this.state.groupList.map((group: any) => {
                        return (
                          <Box
                            className={`${this.state.selectedGroup === group.id.toString() && "active"} attendee`}
                            onClick={() => {
                              this.setState({ selectedGroup: group.id.toString() }, () => {
                                this.getGroupIdsList(group.id);
                              });
                            }}
                          >
                            <span>{group.attributes.group_name}</span>
                            <Box>
                              <Menu
                                direction="top"
                                align="end"
                                menuButton={<img src={Dots} alt="|" />}
                                className="attendee-menu"
                              >
                                <MenuItem
                                  onClick={() => {
                                    this.setState({ isEditAttendeeModalOpen: true, groupId: group.id }, () => {
                                      this.getGroupDetails(group.id);
                                      this.handleCreateAttendeeModal();
                                    });
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem onClick={() => this.deleteGroup(group.id)}>Delete</MenuItem>
                              </Menu>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
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
          scroll="paper"
          fullWidth
          maxWidth="md"
          open={this.state.isCreateAttendeeModalOpen}
          className="select-meeting scheduled-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            {this.state.isEditAttendeeModalOpen ? (
              <Typography variant="h6">Edit Meeting Group</Typography>
            ) : (
              <Typography variant="h6">Create Meeting Group</Typography>
            )}
            <IconButton onClick={() => this.handleCreateAttendeeModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers className="filter">
            <Select value="" name="meetingType" displayEmpty className="dialog-select-input">
              <MenuItem value="" disabled>
                <em>Select Floor</em>
              </MenuItem>
              {this.state.buildingsList.map((building: any) => {
                return <MenuItem>GA Meeting</MenuItem>;
              })}
            </Select>
            <Select value="" name="meetingType" displayEmpty className="dialog-select-input">
              <MenuItem value="" disabled>
                <em>User Type</em>
              </MenuItem>
              <MenuItem value="">Owner</MenuItem>
              <MenuItem value="">Resident</MenuItem>
            </Select>
            <Button className="filter-button" startIcon={<img src={SearchIconImage} />}>
              Search
            </Button>
          </DialogContent>
          <DialogContent dividers>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        checked={this.state.isSelectAllUser}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            this.selectAllUser();
                          } else {
                            this.removeAllUser();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Unit No.</TableCell>
                    <TableCell>Floor Number</TableCell>
                    <TableCell>User Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.userList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>No User Available!!</TableCell>
                    </TableRow>
                  )}
                  {this.state.userList.map((user: any) => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={this.state.selectedUser.includes(user.id)}
                            onChange={(e: any) => {
                              if (e.target.checked) {
                                this.addUser(user.id);
                              } else {
                                this.removeUser(user.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>{user.attributes.full_name}</TableCell>
                        <TableCell>{user.attributes.unit_number}</TableCell>
                        <TableCell>{user.attributes.floor_number}</TableCell>
                        <TableCell>{user.attributes.user_type.toString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <div className="selected-meeting">
              <h4>
                <span>{this.state.selectedUser.length} </span>User Selected
              </h4>
            </div>
            <div className="button-group">
              <Input
                value={this.state.groupName}
                onChange={(e: any) => {
                  this.setState({
                    groupName: e.target.value,
                  });
                }}
                name="title"
                placeholder="Group Name"
                className="dialog-input"
              />
              {this.state.isEditAttendeeModalOpen ? (
                <Button
                  className="add-button"
                  disabled={this.state.selectedUser.length === 0 || !this.state.groupName}
                  onClick={() => this.updateGroup()}
                >
                  Edit Group
                </Button>
              ) : (
                <Button
                  className="add-button"
                  disabled={this.state.selectedUser.length === 0 || !this.state.groupName}
                  onClick={() => this.createGroup()}
                >
                  Create Group
                </Button>
              )}
            </div>
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
