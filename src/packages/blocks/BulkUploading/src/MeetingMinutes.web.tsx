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
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { ROLE } from "../../../framework/src/Enum";

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
    const { classes } = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

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
                          <em>Select Building</em>
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
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
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
                      Search
                    </Button>
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
                          <TableCell>#</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Agenda</TableCell>
                          {localStorage.getItem("userType") === ROLE.MANAGER && <TableCell>Building</TableCell>}
                          <TableCell>Date & Time</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.meetingMinuteList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5}>No Meeting Minutes Available!!</TableCell>
                          </TableRow>
                        )}
                        {this.state.meetingMinuteList.map((meeting: any, index: number) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="ellipse">{meeting.attributes.title}</TableCell>
                              <TableCell className="ellipse">{meeting.attributes.agenda}</TableCell>
                              {localStorage.getItem("userType") === ROLE.MANAGER && (
                                <TableCell>{meeting.attributes.building.name}</TableCell>
                              )}
                              <TableCell>{meeting.attributes.meeting_date_time}</TableCell>
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
                                    <Link to={`/MeetingMinute/${meeting.id}`}>View</Link>
                                  </MenuItem>
                                  {!meeting.attributes.meeting_mins_pdf ? (
                                    <>
                                      <MenuItem onClick={() => toast.error("No meeting document available!!")}>
                                        Download
                                      </MenuItem>
                                      <MenuItem onClick={() => toast.error("No meeting document available!!")}>
                                        Share
                                      </MenuItem>
                                    </>
                                  ) : (
                                    <>
                                      <MenuItem>
                                        <NavLink href={meeting.attributes.meeting_mins_pdf.url} target="_blank">
                                          Download
                                        </NavLink>
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState({ shareUrl: meeting.attributes.meeting_mins_pdf.url }, () => {
                                            this.handleShareModal();
                                          });
                                        }}
                                      >
                                        Share
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

        <Dialog
          fullWidth
          onClose={() => this.handleShareModal()}
          open={this.state.isShareModalOpen}
          className="select-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Share</Typography>
            <IconButton onClick={() => this.handleShareModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent>
            <div className="share-box">
              <FacebookShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<FacebookIcon />}
                translate
              />
              <TwitterShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TwitterIcon />}
                translate
              />
              <WhatsappShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                separator=":: "
                // @ts-ignore
                children={<WhatsappIcon />}
                translate
              />
              <LinkedinShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<LinkedinIcon />}
                translate
              />
              <EmailShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<EmailIcon />}
                translate
              />
              <RedditShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<RedditIcon />}
                translate
              />
              <TelegramShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TelegramIcon />}
                translate
              />
              <TumblrShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TumblrIcon />}
                translate
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(MeetingsStyleWeb)(MeetingMinutes);
// Customizable Area End
