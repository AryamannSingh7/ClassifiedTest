// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  InputBase,
  Link as NavLink,
  Input,
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
import { SearchIconImage } from "./assets";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import toast from "react-hot-toast";
import { ROLE } from "../../../framework/src/Enum";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";

class MeetingMinutes extends MeetingMinutesController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getAllMeetings();
    this.getBuildingsList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.filter.title !== this.state.filter.title ||
      prevState.filter.status !== this.state.filter.status ||
      prevState.filter.date !== this.state.filter.date ||
      prevState.filter.page !== this.state.filter.page ||
      prevState.filter.building !== this.state.filter.building
    ) {
      await this.getAllMeetings();
    }
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F7F9FE" }} className={classes.scheduledMeeting}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Meetings")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Meeting Minutes")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading bold-text">
                      {t("Meeting Minutes")}
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
                    <Select
                      displayEmpty
                      value={this.state.status}
                      onChange={(e: any) => {
                        this.setState({
                          ...this.state,
                          status: e.target.value,
                        });
                      }}
                      className="select-input"
                    >
                      <MenuItem value="" disabled>
                        {t("Select Status")}
                      </MenuItem>
                      <MenuItem value="pending">{t("Pending")}</MenuItem>
                      <MenuItem value="approved">{t("Approved")}</MenuItem>
                      <MenuItem value="rejected">{t("Rejected")}</MenuItem>
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
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h4 className="bold-text">{t("Meeting Minutes")}</h4>
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
                          <TableCell>{t("Agenda")}</TableCell>
                          {localStorage.getItem("userType") === ROLE.MANAGER && <TableCell>{t("Building")}</TableCell>}
                          <TableCell>{t("Date & Time")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.meetingMinuteList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>{t("No Meeting Minutes Available!!")}</TableCell>
                          </TableRow>
                        )}
                        {this.state.meetingMinuteList.map((meeting: any, index: number) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="ellipse-one">{meeting.attributes.title}</TableCell>
                              <TableCell className="ellipse-one">{meeting.attributes.agenda}</TableCell>
                              {localStorage.getItem("userType") === ROLE.MANAGER && (
                                <TableCell>{meeting.attributes?.building?.name}</TableCell>
                              )}
                              <TableCell>
                                {moment(meeting.attributes.meeting_date_time, "DD-MM-YYYY HH:mm", true).format(
                                  "MMMM DD, YYYY HH:mm"
                                )}
                              </TableCell>
                              <TableCell>
                                <span className={meeting.attributes.meeting_mins_status}>
                                  {meeting.attributes.meeting_mins_status}
                                </span>
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
                                    <Link to={`/MeetingMinute/${meeting.id}`}>{t("View")}</Link>
                                  </MenuItem>
                                  {!meeting.attributes.meeting_mins_pdf ? (
                                    <>
                                      <MenuItem onClick={() => toast.error(`${t("No meeting document available!!")}`)}>
                                        {t("Download")}
                                      </MenuItem>
                                      <MenuItem onClick={() => toast.error(`${t("No meeting document available!!")}`)}>
                                        {t("Share")}
                                      </MenuItem>
                                    </>
                                  ) : (
                                    <>
                                      <MenuItem>
                                        <NavLink 
                                          href={meeting.attributes.meeting_mins_pdf.url} 
                                          target="_blank">
                                          {t("Download")}
                                        </NavLink>
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState({ shareUrl: meeting.attributes.meeting_mins_pdf.url }, () => {
                                            this.handleShareModal();
                                          });
                                        }}
                                      >
                                        {t("Share")}
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
                        Showing <span className="current-page">{this.state.meetingMinuteList.length}</span> of{" "}
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

        <ShareDocumentModal
          isOpen={this.state.isShareModalOpen}
          handleClose={this.handleShareModal}
          heading={t("Share")}
          documentURL={this.state.shareUrl}
        />
      </>
    );
  }
}

export default withTranslation()(withStyles(MeetingsStyleWeb)(MeetingMinutes));
// Customizable Area End
