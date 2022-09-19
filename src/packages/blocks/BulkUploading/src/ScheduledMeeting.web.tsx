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
  Checkbox,
  TableContainer,
  TextareaAutosize,
  Box,
  Grid,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ScheduledMeetingController, { Props } from "./ScheduledMeetingController.web";
import { Link } from "react-router-dom";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { MeetingsStyleWeb } from "./MeetingsStyle.web";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { SearchIconImage, CommentIcon, Dots, GreyCheckIcon, BlueCheckIcon } from "./assets";
import { Formik, Form } from "formik";
import moment from "moment";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";
import { ROLE } from "../../../framework/src/Enum";

class ScheduledMeeting extends ScheduledMeetingController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    await this.getAllMeetings();
    await this.getBuildingsList();
    // await this.getManagersList();
    await this.getUserList();
    await this.getGroupList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.filter.title !== this.state.filter.title ||
      prevState.filter.status !== this.state.filter.status ||
      prevState.filter.date !== this.state.filter.date ||
      prevState.filter.place !== this.state.filter.place ||
      prevState.filter.page !== this.state.filter.page ||
      prevState.filter.building !== this.state.filter.building
    ) {
      await this.getAllMeetings();
    }
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

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
                      {t("Meetings")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Scheduled Meetings")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Scheduled Meetings")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Select
                        displayEmpty
                        value={this.state.building}
                        onChange={(e: any) => {
                          this.setState({
                            ...this.state,
                            building: e.target.value,
                          });
                        }}
                        className="select-input"
                      >
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                        {this.state.buildingsList.map((building: any) => {
                          return <MenuItem value={building.name}>{building.name}</MenuItem>;
                        })}
                      </Select>
                    )}
                    <Input
                      type="text"
                      placeholder={t("Place")}
                      className="input"
                      value={this.state.place}
                      onChange={(e: any) => {
                        this.setState({
                          ...this.state,
                          place: e.target.value,
                        });
                      }}
                    />
                    <Select
                      displayEmpty
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
                        {t("Select Status")}
                      </MenuItem>
                      <MenuItem value="scheduled">{t("Scheduled")}</MenuItem>
                      <MenuItem value="completed">{t("Completed")}</MenuItem>
                      <MenuItem value="cancelled">{t("Cancelled")}</MenuItem>
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
                      placeholder={t("Date")}
                      className="input date"
                      onFocus={(e: any) => (e.target.type = "date")}
                      onBlur={(e: any) => (e.target.type = "text")}
                    />
                    <Button
                      startIcon={<img src={SearchIconImage} />}
                      onClick={() => {
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            place: this.state.place.trim(),
                            status: this.state.status,
                            date: this.state.date,
                            building: this.state.building,
                            title: "",
                          },
                        });
                      }}
                    >
                      {t("Search")}
                    </Button>
                  </Box>
                  <Box className="create-meeting">
                    <Button onClick={() => this.openCreateMeetingModal()}>{t("+ Create New Meeting")}</Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3>{t("Schedule Meetings")}</h3>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase
                          placeholder={t("Search by title")}
                          className="search"
                          value={this.state.filter.title}
                          onChange={(e: any) => {
                            this.setState({
                              ...this.state,
                              filter: {
                                ...this.state.filter,
                                title: e.target.value,
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
                          <TableCell>#</TableCell>
                          <TableCell>{t("Title")}</TableCell>
                          <TableCell>{t("Date & Time")}</TableCell>
                          {localStorage.getItem("userType") === ROLE.MANAGER && <TableCell>{t("Building")}</TableCell>}
                          <TableCell>{t("Place")}</TableCell>
                          <TableCell>{t("Agenda")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.scheduleMeetingList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6}>{t("No Schedule Meeting Available!!")}</TableCell>
                          </TableRow>
                        )}
                        {this.state.scheduleMeetingList.map((meeting: any, index: number) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="ellipse">
                                {meeting.attributes.title}{" "}
                                {meeting.attributes.meeting_type === "ga_meeting" && (
                                  <span className="ga-meeting">{t("GA Meeting")}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {moment(meeting.attributes.meeting_date_time, "DD-MM-YYYY HH:mm", true).format(
                                  "MMMM DD, YYYY HH:mm"
                                )}
                              </TableCell>
                              {localStorage.getItem("userType") === ROLE.MANAGER && (
                                <TableCell>{meeting.attributes.building.name}</TableCell>
                              )}
                              <TableCell className="ellipse">{meeting.attributes.place}</TableCell>
                              <TableCell className="ellipse">{meeting.attributes.agenda}</TableCell>
                              <TableCell>
                                <span className={meeting.attributes.status}>{meeting.attributes.status}</span>
                              </TableCell>
                              <TableCell>
                                <Menu
                                  menuButton={
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                >
                                  <MenuItem>
                                    <Link to={`ScheduledMeeting/${meeting.id}`}>{t("View")}</Link>
                                  </MenuItem>
                                  <MenuItem onClick={() => this.openEditMeetingModal(meeting)}>{t("Edit")}</MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      this.setState(
                                        { scheduleMeetingId: meeting.id, scheduleMeetingDetails: meeting },
                                        () => {
                                          this.handleCancelMeetingModal();
                                        }
                                      );
                                    }}
                                  >
                                    {t("Cancel")}
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
                        Showing <span className="current-page">{this.state.scheduleMeetingList.length}</span> of{" "}
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
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog fullWidth scroll="paper" open={this.state.isCreateMeetingModalOpen} className="add-meeting">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Create New Meeting")}</Typography>
            <IconButton onClick={() => this.handleCreateMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.meetingForm}
            validationSchema={this.addMeetingValidation}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              this.handleCreateMeetingModal();
              this.createMeeting(values);
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
                              placeholder={t("Date")}
                              // onFocus={(e: any) => (e.target.type = "date")}
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
                              placeholder={t("Time")}
                              // onFocus={(e: any) => (e.target.type = "time")}
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
                        placeholder="Place"
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
                    )} */}
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
                    <Button className="cancel-button" onClick={() => this.handleCreateMeetingModal()}>
                      {t("Cancel")}
                    </Button>
                    <Button className="add-button" type="submit">
                      {t("Create")}
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog fullWidth scroll="paper" className="add-meeting" open={this.state.isEditMeetingModalOpen}>
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
                  this.state.scheduleMeetingDetails && this.state.scheduleMeetingDetails.attributes.meeting_date_time,
                  "DD-MM-YYYY HH:mm",
                  true
                ).format("MMMM DD, YYYY HH:mm")}{" "}
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
                placeholder={t("Group Name")}
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
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(ScheduledMeeting));
// Customizable Area End
