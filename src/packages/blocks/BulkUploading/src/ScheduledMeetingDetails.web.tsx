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
  TextareaAutosize,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ScheduledMeetingController, { Props } from "./ScheduledMeetingController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import {
  CommentIcon,
  RejectIcon,
  AcceptIcon,
  AwaitIcon,
  SearchIconImage,
  Dots,
  BlueCheckIcon,
  GreyCheckIcon,
} from "./assets";
import { Formik, Form } from "formik";
import moment from "moment";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { ROLE } from "../../../framework/src/Enum";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

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
      // this.getManagersList();
      this.getUserList();
      this.getGroupList();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filter.page !== this.state.filter.page) {
      await this.getMeetingResponseList();
    }
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

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
                      {t("Meetings")} / {t("Scheduled Meetings")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Meeting Details")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading">
                    <h3>{t("Meeting Details")}</h3>
                    {localStorage.getItem("userType") === ROLE.MANAGER &&
                    this.state.scheduleMeetingDetails &&
                    this.state.scheduleMeetingStatus === "completed" &&
                    !this.state.scheduleMeetingDetails.attributes.meeting_mins_pdf ? (
                      <Link to={`/ScheduledMeeting/${this.state.scheduleMeetingId}/Note`}>
                        <Button>{t("Add Meeting Minutes")}</Button>
                      </Link>
                    ) : (
                      localStorage.getItem("userType") === ROLE.MANAGER && (
                        <Link to={`/MeetingMinute/${this.state.scheduleMeetingId}`}>
                          <Button className="view-button">{t("View Meeting Minutes")}</Button>
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
                          <span className="ga-meeting">{t("GA Meeting")}</span>
                        )}
                    </Box>
                    <span className={this.state.scheduleMeetingStatus}>{this.state.scheduleMeetingStatus}</span>
                  </Box>
                  <Divider />
                  <Box className="meeting-details">
                    <h4>{t("Meeting Details")}</h4>
                    <Box className="items">
                      <span>{t("Date & Time")}: </span>
                      {this.state.scheduleMeetingDetails && (
                        <p>
                          {moment(
                            this.state.scheduleMeetingDetails.attributes.meeting_date_time,
                            "DD-MM-YYYY HH:mm",
                            true
                          ).format("DD-MMM-YYYY HH:mm")}
                        </p>
                      )}
                    </Box>
                    <Box className="items">
                      <span>{t("Place")}: </span>
                      <p>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.place}</p>
                    </Box>
                    <Box className="items">
                      <span>{t("Building")}: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.building.name}
                      </p>
                    </Box>
                    <Box className="items">
                      <span>{t("Agenda")}: </span>
                      <p>{this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.agenda}</p>
                    </Box>
                  </Box>
                  <Box className="meeting-details">
                    <h4>{t("Scheduling Details")}</h4>
                    <Box className="items">
                      <span>{t("Scheduled By")}: </span>
                      <p>
                        {this.state.scheduleMeetingDetails &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                          this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_by}
                      </p>
                    </Box>
                    <Box className="items">
                      <span>{t("Scheduled On")}: </span>
                      {this.state.scheduleMeetingDetails && (
                        <p>
                          {moment(
                            this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                              this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on,
                            "DD-MM-YYYY HH:mm",
                            true
                          ).format("DD-MMM-YYYY HH:mm")}
                        </p>
                      )}
                    </Box>
                  </Box>
                  {this.state.scheduleMeetingStatus === "cancelled" &&
                    this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail && (
                      <Box className="meeting-details">
                        <h4>{t("Cancelled Details")}</h4>
                        <Box className="items">
                          <span>{t("Cancelled By")}: </span>
                          <p>{this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail.cancelled_by}</p>
                        </Box>
                        <Box className="items">
                          <span>{t("Cancelled On")}: </span>
                          <p>
                            {moment(
                              this.state.scheduleMeetingDetails.attributes.meeting_cancel_detail.cancelled_on,
                              "DD-MM-YYYY HH:mm",
                              true
                            ).format("DD-MMM-YYYY HH:mm")}
                          </p>
                        </Box>
                      </Box>
                    )}
                </Box>
                <Box className="response-box">
                  {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus === "scheduled" ? (
                    <Box className="heading">
                      <h3>{t("Response")}</h3>
                      <Box className="status">
                        <div className="item">
                          <img src={AwaitIcon} />
                          <p>
                            {t("Awaiting")}{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.awaited}</span>
                          </p>
                        </div>
                        <div className="item">
                          <img src={AcceptIcon} />
                          <p>
                            {t("Accepted")}{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.accepted}</span>
                          </p>
                        </div>
                        <div className="item">
                          <img src={RejectIcon} />
                          <p>
                            {t("Rejected")}{" "}
                            <span>{this.state.scheduleMeetingDetails.attributes.meeting_responses.rejected}</span>
                          </p>
                        </div>
                      </Box>
                    </Box>
                  ) : (
                    <Box className="heading">
                      <h3>{t("Meeting Attendees")}</h3>
                    </Box>
                  )}
                  <Table className="table-box">
                    <TableHead>
                      <TableRow>
                        <TableCell>{t("Name")}</TableCell>
                        <TableCell>{t("Building")}</TableCell>
                        <TableCell>{t("Unit No.")}</TableCell>
                        <TableCell>{t("Floor Number")}</TableCell>
                        {this.state.scheduleMeetingDetails && this.state.scheduleMeetingStatus !== "cancelled" && (
                          <TableCell>{t("Response")}</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.responseList.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5}>{t("No User Available!!")}</TableCell>
                        </TableRow>
                      )}
                      {this.state.responseList.map((user: any) => {
                        return (
                          <TableRow key={user.id}>
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
                      {t("Cancel Meeting")}
                    </Button>
                  )}
                  <Button className="edit" onClick={() => this.openEditMeetingModal(this.state.scheduleMeetingDetails)}>
                    {t("Edit Meeting")}
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog scroll="paper" fullWidth className="add-meeting" open={this.state.isEditMeetingModalOpen}>
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Edit Meeting")}</Typography>
            <IconButton onClick={() => this.handleEditMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
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
                      <Select
                        value={values.meetingType}
                        onChange={(e: any) => {
                          setFieldValue("meetingType", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, meetingType: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="meetingType"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          {t("Select Meeting Type")}
                        </MenuItem>
                        <MenuItem value="ga_meeting">{t("GA Meeting")}</MenuItem>
                        <MenuItem value="regular_meeting">{t("Regular Meeting")}</MenuItem>
                      </Select>
                      {errors.meetingType && touched.meetingType && (
                        <small className="error">{t(errors.meetingType)}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.title}
                        onChange={(e: any) => {
                          setFieldValue("title", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, title: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="title"
                        placeholder={t("Title")}
                        className="dialog-input"
                      />
                      {errors.title && touched.title && <small className="error">{t(errors.title)}</small>}
                    </FormControl>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <input
                              value={values.date}
                              onChange={(e: any) => {
                                setFieldValue("date", e.target.value);
                                this.setState({ meetingForm: { ...this.state.meetingForm, date: e.target.value } });
                              }}
                              onBlur={handleBlur}
                              name="date"
                              className="date"
                              min={moment().format("YYYY-MM-DD")}
                              type="date"
                            />
                          </div>
                          {errors.date && touched.date && <small className="error">{t(errors.date)}</small>}
                        </FormControl>
                      </Grid>
                      <Grid item sm={6}>
                        <FormControl fullWidth>
                          <div className="date-time">
                            <Input
                              value={values.time}
                              onChange={(e: any) => {
                                setFieldValue("time", e.target.value);
                                this.setState({ meetingForm: { ...this.state.meetingForm, time: e.target.value } });
                              }}
                              onBlur={handleBlur}
                              name="time"
                              fullWidth
                              type="time"
                            />
                          </div>
                          {errors.time && touched.time && <small className="error">{t(errors.time)}</small>}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Select
                        value={values.building}
                        onChange={(e: any) => {
                          setFieldValue("building", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, building: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="building"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                        {this.state.buildingsList.map((building: any) => {
                          return (
                            <MenuItem value={building.id} key={building.id}>
                              {building.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.building && touched.building && <small className="error">{t(errors.building)}</small>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.place}
                        onChange={(e: any) => {
                          setFieldValue("place", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, place: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="place"
                        placeholder={t("Place")}
                        className="dialog-input"
                      />
                      {errors.place && touched.place && <small className="error">{t(errors.place)}</small>}
                    </FormControl>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        value={values.agenda}
                        onChange={(e: any) => {
                          setFieldValue("agenda", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, agenda: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="agenda"
                        placeholder={t("Agenda")}
                        className="dialog-textarea"
                      />
                      {errors.agenda && touched.agenda && <small className="error">{t(errors.agenda)}</small>}
                    </FormControl>
                    {/* {localStorage.getItem("userType") !== ROLE.MANAGER && (
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
                          Designated Meeting of Minutes writer
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
                  )} */}
                    <FormControl fullWidth>
                      <Select
                        value={values.status}
                        onChange={(e: any) => {
                          setFieldValue("status", e.target.value);
                          this.setState({ meetingForm: { ...this.state.meetingForm, status: e.target.value } });
                        }}
                        onBlur={handleBlur}
                        name="status"
                        displayEmpty
                        className="dialog-select-input"
                      >
                        <MenuItem value="" disabled>
                          {t("Select Status")}
                        </MenuItem>
                        <MenuItem value="scheduled">{t("Scheduled")}</MenuItem>
                        <MenuItem value="completed">{t("Completed")}</MenuItem>
                        <MenuItem value="cancelled">{t("Cancelled")}</MenuItem>
                      </Select>
                      {errors.status && touched.status && <small className="error">{t(errors.status)}</small>}
                    </FormControl>
                    {/* Create Audience */}
                    <FormControl fullWidth>
                      <Box className="create-audience">
                        <p>{t("Select Meeting Attendees")}</p>
                        <span onClick={() => this.openCreateAttendeeModal()}>{t("+ Create New Group")}</span>
                      </Box>
                      <Box className="attendee-box">
                        <Box
                          className={`${this.state.selectedGroup.includes("owner") && "active"} attendee`}
                          onClick={() => {
                            this.handleSelectedGroupList("owner");
                            touched["attendeeIds"] = true;
                          }}
                        >
                          {this.state.selectedGroup.includes("owner") ? (
                            <img src={BlueCheckIcon} alt="" />
                          ) : (
                            <img src={GreyCheckIcon} alt="" />
                          )}
                          <span>{t("Owner")}</span>
                        </Box>
                        <Box
                          className={`${this.state.selectedGroup.includes("resident") && "active"} attendee`}
                          onClick={() => {
                            this.handleSelectedGroupList("resident");
                            touched["attendeeIds"] = true;
                          }}
                        >
                          {this.state.selectedGroup.includes("resident") ? (
                            <img src={BlueCheckIcon} alt="" />
                          ) : (
                            <img src={GreyCheckIcon} alt="" />
                          )}
                          <span>{t("Resident")}</span>
                        </Box>
                        {this.state.groupList.map((group: any) => {
                          return (
                            <Box
                              key={group.id}
                              className={`${this.state.selectedGroup.includes(group.id.toString()) &&
                                "active"} attendee`}
                            >
                              {this.state.selectedGroup.includes(group.id.toString()) ? (
                                <img src={BlueCheckIcon} alt="" />
                              ) : (
                                <img src={GreyCheckIcon} alt="" />
                              )}
                              <span
                                onClick={() => {
                                  this.handleSelectedGroupList(group.id.toString());
                                  touched["attendeeIds"] = true;
                                }}
                              >
                                {group.attributes.group_name}
                              </span>
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
                                    {t("Edit")}
                                  </MenuItem>
                                  <MenuItem onClick={() => this.deleteGroup(group.id)}>{t("Delete")}</MenuItem>
                                </Menu>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                      {errors.attendeeIds && touched.attendeeIds && (
                        <small className="error">{t(errors.attendeeIds)}</small>
                      )}
                    </FormControl>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleEditMeetingModal()}>
                      {t("Cancel")}
                    </Button>
                    <Button className="add-button" type="submit">
                      {t("Save")}
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
              <Typography variant="h6">{t("Edit Meeting Group")}</Typography>
            ) : (
              <Typography variant="h6">{t("Create Meeting Group")}</Typography>
            )}
            <IconButton onClick={() => this.handleCreateAttendeeModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers className="filter">
            <Select value="" name="meetingType" displayEmpty className="dialog-select-input">
              <MenuItem value="" disabled>
                {t("Select Building")}
              </MenuItem>
              {this.state.buildingsList.map((building: any) => {
                return <MenuItem key={building.id}>{building.name}</MenuItem>;
              })}
            </Select>
            <Select value="" name="meetingType" displayEmpty className="dialog-select-input">
              <MenuItem value="" disabled>
                {t("Select Floor")}
              </MenuItem>
              <MenuItem>GA Meeting</MenuItem>
              <MenuItem>Regular Meeting</MenuItem>
            </Select>
            <Select value="" name="meetingType" displayEmpty className="dialog-select-input">
              <MenuItem value="" disabled>
                {t("User Type")}
              </MenuItem>
              <MenuItem value="">{t("Owner")}</MenuItem>
              <MenuItem value="">{t("Resident")}</MenuItem>
            </Select>
            <Button className="filter-button" startIcon={<img src={SearchIconImage} />}>
              {t("Search")}
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
                        onChange={(e: any) => (e.target.checked ? this.selectAllUser() : this.removeAllUser())}
                      />
                    </TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Building")}</TableCell>
                    <TableCell>{t("Unit No.")}</TableCell>
                    <TableCell>{t("Floor Number")}</TableCell>
                    <TableCell>{t("User Type")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.userList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>{t("No User Available!!")}</TableCell>
                    </TableRow>
                  )}
                  {this.state.userList.map((user: any) => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={this.state.selectedUser.includes(user.id)}
                            onChange={(e: any) => (e.target.checked ? this.addUser(user.id) : this.removeUser(user.id))}
                          />
                        </TableCell>
                        <TableCell>{user.attributes.full_name}</TableCell>
                        <TableCell>{user.attributes.building_management.name}</TableCell>
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
                <span>{this.state.selectedUser.length} </span>user selected
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
                  {t("Edit Group")}
                </Button>
              ) : (
                <Button
                  className="add-button"
                  disabled={this.state.selectedUser.length === 0 || !this.state.groupName}
                  onClick={() => this.createGroup()}
                >
                  {t("Create Group")}
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
              <Typography variant="h6">{t("Cancel Meeting Confirmation")}</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure want to cancel the meeting scheduled on{" "}
                {moment(
                  this.state.scheduleMeetingDetails &&
                    this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                    this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("DD-MMM-YYYY HH:mm")}{" "}
                at {this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.place}? Once
                cancelled, attendees will receive a meeting cancelation notification.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleCancelMeetingModal()}
                >
                  {t("No, Don't Cancel")}
                </Button>
                <Button
                  style={{ width: "200px" }}
                  className="add-button"
                  onClick={() => this.updateStatusMeeting("cancelled")}
                >
                  {t("Yes, Cancel")}
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
              <Typography variant="h6">{t("Complete Meeting Confirmation")}</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure want to complete the meeting scheduled on{" "}
                {moment(
                  this.state.scheduleMeetingDetails &&
                    this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail &&
                    this.state.scheduleMeetingDetails.attributes.meeting_schedule_detail.scheduled_on,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("DD-MMM-YYYY HH:mm")}{" "}
                at {this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.place}? Once
                completed, attendees will receive a meeting completion notification.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleCompleteMeetingModal()}
                >
                  {t("No, Don't Complete")}
                </Button>
                <Button
                  style={{ width: "200px" }}
                  className="add-button"
                  onClick={() => this.updateStatusMeeting("completed")}
                >
                  {t("Yes, Complete")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(ScheduledMeetingDetails));
// Customizable Area End
