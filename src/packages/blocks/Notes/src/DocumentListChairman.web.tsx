// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  MenuItem,
  Typography,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  DialogActions,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DocumentListChairmanController, {
  Props,
} from "./DocumentListChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import Document from "../assets/document.png";
import UploadImage from "../assets/upload.png";
import DeleteImage from "../assets/delete.png";
import ShareImage from "../assets/share.png";
import DownloadImage from "../assets/download.png";
import PdfImage from "../assets/pdf.png";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
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
import moment from "moment";
import { Formik, Form } from "formik";

class DocumentListChairman extends DocumentListChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    console.log(this.state);

    window.addEventListener("pageshow", (event) => {
      const historyTraversal =
        event.persisted ||
        (typeof window.performance != "undefined" &&
          window.performance.navigation.type === 2);

      if (historyTraversal) {
        window.location.reload();
      }
    });

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.documentChairman}
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
                {this.state.docName.toLowerCase() !== "resolutions" &&
                this.state.docName.toLowerCase() !== "policy" &&
                this.state.docName.toLowerCase() !== "guidelines" &&
                this.state.docName.toLowerCase() !== "roles" &&
                this.state.docName.toLowerCase() !== "building-plans" ? (
                  <p>Wrong url</p>
                ) : (
                  <Box>
                    <Box className="navigation">
                      <Box>
                        <Typography variant="body1">
                          Documents /{" "}
                          <Box component="span" style={{ color: "blue" }}>
                            {this.state.docName}
                          </Box>
                        </Typography>
                        <Box className="top-heading">
                          <Typography variant="h5" className="sub-heading">
                            {this.state.docName}
                          </Typography>
                          {this.state.docName.toLowerCase() ===
                          "resolutions" ? (
                            <Button
                              onClick={() => this.handleAddResolutionsModal()}
                            >
                              Add New Resolution
                            </Button>
                          ) : (
                            <Button
                              onClick={() => this.handleAddDocumentModal()}
                            >
                              Upload Documents
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className={`document-box ${
                        this.state.docName.toLowerCase() === "resolutions"
                          ? "resolutions"
                          : ""
                      }`}
                    >
                      {this.state.docName.toLowerCase() === "resolutions" ? (
                        <Grid container spacing={2}>
                          {this.state.resolutionList.length === 0 && (
                            <span>No Resolution Available!!</span>
                          )}
                          {this.state.resolutionList.map((resolution: any) => {
                            return (
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                key={resolution.id}
                              >
                                <Card className="card-item">
                                  <div className="heading">
                                    <h4>{resolution.attributes.title}</h4>
                                    <div className="menu">
                                      <Menu
                                        menuButton={
                                          <IconButton>
                                            <MoreVertIcon />
                                          </IconButton>
                                        }
                                      >
                                        <MenuItem>
                                          <Link
                                            href={
                                              resolution.attributes
                                                .attachments[0].url
                                            }
                                            target="_blank"
                                          >
                                            Download
                                          </Link>
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            this.setState(
                                              {
                                                ...this.state,
                                                selectedDocumentId:
                                                  resolution.id,
                                              },
                                              () => {
                                                this.handleDeleteDocumentModal();
                                              }
                                            );
                                          }}
                                        >
                                          Delete
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            this.setState(
                                              {
                                                ...this.state,
                                                shareUrl:
                                                  resolution.attributes
                                                    .attachments[0].url,
                                                shareQuote:
                                                  resolution.attributes.title,
                                              },
                                              () => {
                                                this.handleShareModal();
                                              }
                                            );
                                          }}
                                        >
                                          Share
                                        </MenuItem>
                                      </Menu>
                                    </div>
                                  </div>
                                  <div className="res-info">
                                    <div className="info-item">
                                      <p>Date & Time</p>
                                      <span>
                                        {moment(
                                          resolution.attributes.created_at
                                        ).format("DD-MM-YYYY HH:mm")}
                                      </span>
                                    </div>
                                    <div className="info-item">
                                      <p>Building</p>
                                      <span>
                                        {resolution.attributes.buidling_name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="item">
                                    <div className="item-title">
                                      <img src={PdfImage} />
                                      <h6>
                                        {resolution.attributes.meeting.title}
                                      </h6>
                                    </div>
                                    <div className="icons">
                                      <img
                                        src={ShareImage}
                                        onClick={() => {
                                          this.setState(
                                            {
                                              ...this.state,
                                              shareUrl:
                                                resolution.attributes
                                                  .meeting_mins_pdf.url,
                                              shareQuote:
                                                resolution.attributes.meeting
                                                  .title,
                                            },
                                            () => {
                                              this.handleShareModal();
                                            }
                                          );
                                        }}
                                      />
                                      <Link
                                        href={
                                          resolution.attributes.meeting_mins_pdf
                                            .url
                                        }
                                        target="_blank"
                                      >
                                        <img src={DownloadImage} />
                                      </Link>
                                    </div>
                                  </div>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      ) : (
                        <Grid container spacing={2}>
                          {this.state.documentList.length === 0 && (
                            <span>No Document Available!!</span>
                          )}
                          {this.state.documentList.map((document: any) => {
                            return (
                              <Grid item xs={12} md={12} lg={12}>
                                <Box className="item">
                                  <Link
                                    href={`/DocumentChairman/${
                                      this.state.docName
                                    }/${document.id}/view`}
                                  >
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>
                                        {
                                          document.attributes.images[0]
                                            .file_name
                                        }
                                      </h4>
                                    </div>
                                  </Link>
                                  <div className="menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>
                                        <Link
                                          href={
                                            document.attributes.images[0]
                                              .download_url
                                          }
                                          target="_blank"
                                        >
                                          Download
                                        </Link>
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState(
                                            {
                                              ...this.state,
                                              selectedDocumentId: document.id,
                                            },
                                            () => {
                                              this.handleDeleteDocumentModal();
                                            }
                                          );
                                        }}
                                      >
                                        Delete
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          this.setState(
                                            {
                                              ...this.state,
                                              shareUrl:
                                                document.attributes.images[0]
                                                  .url,
                                              shareQuote:
                                                document.attributes.title,
                                            },
                                            () => {
                                              this.handleShareModal();
                                            }
                                          );
                                        }}
                                      >
                                        Share
                                      </MenuItem>
                                    </Menu>
                                  </div>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                      )}
                    </Box>
                  </Box>
                )}
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleAddDocumentModal()}
          open={this.state.isAddDocumentModalOpen}
          className="add-document"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Add New Document</Typography>
            <IconButton onClick={() => this.handleAddDocumentModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            initialValues={{
              title: this.state.title,
              file: this.state.file,
            }}
            validationSchema={this.validationAddForm}
            onSubmit={(values, { resetForm }) => {
              this.setState(
                {
                  ...this.state,
                  title: values.title.trim(),
                  file: values.file,
                },
                () => {
                  this.createDocument();
                  resetForm();
                }
              );
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
                      <input
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="title"
                        placeholder="Title"
                        className="dialog-input"
                        style={{
                          marginTop: "0",
                        }}
                      />
                      {errors.title && touched.title && (
                        <small className="error">{errors.title}</small>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <div
                        className="image-box"
                        onClick={() => {
                          this.upload.click();
                        }}
                      >
                        <img src={UploadImage} />
                        <Typography variant="body1">Upload File</Typography>
                      </div>
                      <input
                        id="myInput"
                        type="file"
                        ref={(ref: any) => (this.upload = ref)}
                        style={{ display: "none" }}
                        accept=".pdf"
                        onChange={(e: any) => {
                          setFieldValue("file", e.currentTarget.files[0]);
                        }}
                        onBlur={handleBlur}
                        name="file"
                      />
                      {values.file && (
                        <span className="file-name">{values.file.name}</span>
                      )}
                      {errors.file && touched.file && (
                        <small className="error">{errors.file}</small>
                      )}
                      <span />
                    </FormControl>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button
                      onClick={() => this.handleAddDocumentModal()}
                      className="cancel-button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="add-button">
                      Create
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog
          className="delete-document"
          fullWidth
          maxWidth="sm"
          onClose={() => this.handleDeleteDocumentModal()}
          open={this.state.isDeleteDocumentModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">Delete Document</Typography>
              <Typography variant="body1">
                Are you sure want to delete?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  onClick={() => this.handleDeleteDocumentModal()}
                >
                  No, Don't Delete
                </Button>
                <Button
                  className="add-button"
                  onClick={() => {
                    if (this.state.docName.toLowerCase() === "resolutions") {
                      this.deleteResolution();
                    } else {
                      this.deleteCategory();
                    }
                  }}
                >
                  Yes Delete
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth
          onClose={() => this.handleAddResolutionsModal()}
          open={this.state.isAddResolutionModalOpen}
          className="add-document resolutions"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Add New Resolution</Typography>
            <IconButton onClick={() => this.handleAddResolutionsModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <input
                value={this.state.title}
                onChange={(e: any) => {
                  this.setState({
                    ...this.state,
                    title: e.target.value,
                  });
                }}
                placeholder="Resolution Title"
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
              {this.state.title.length > 100 && (
                <span className="error">
                  Maximum length of title should be 100 character
                </span>
              )}
            </FormControl>
            <FormControl fullWidth>
              <div
                className="image-box"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <img src={UploadImage} />
                <Typography variant="body1">Upload file</Typography>
              </div>
              <input
                id="myInput"
                type="file"
                ref={(ref: any) => (this.upload = ref)}
                style={{ display: "none" }}
                onChange={this.onChangeFile.bind(this)}
                accept=".pdf"
              />
              {this.state.file && (
                <span className="file-name">{this.state.file.name}</span>
              )}
            </FormControl>
            {this.state.selectedMeeting ? (
              <div className="change-meeting">
                <span>
                  {this.state.selectedMeeting &&
                    this.state.selectedMeeting.attributes.title}
                </span>
                <span onClick={() => this.handleSelectMeetingModal()}>
                  Change
                </span>
              </div>
            ) : (
              <div
                className="choose-meeting"
                onClick={() => this.handleSelectMeetingModal()}
              >
                <span>Choose Meeting</span>
              </div>
            )}
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              className="cancel-button"
              onClick={() => this.handleAddResolutionsModal()}
            >
              Cancel
            </Button>
            <Button
              className="add-button"
              onClick={() => this.createResolution()}
              disabled={
                !this.state.selectedMeeting ||
                this.state.title.length === 0 ||
                this.state.title.length > 100 ||
                this.isInputOnlyWhiteSpace(this.state.title) ||
                this.state.file === null
              }
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          scroll="paper"
          fullWidth
          maxWidth="md"
          onClose={() => this.handleSelectMeetingModal()}
          open={this.state.isSelectMeetingModalOpen}
          className="select-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Select Meeting Minutes</Typography>
            <IconButton onClick={() => this.handleSelectMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            Meeting Module will come soon!!
            {/* <List>
              <ListItem dense className="list-heading">
                <ListItemIcon />
                <ListItemText primary="Title" />
                <ListItemText primary="Agenda" />
                <ListItemText primary="Date & Time" />
              </ListItem>
              {this.state.meetingsList.length === 0 && (
                <span>No Meetings Available!!</span>
              )}
              {this.state.meetingsList.map((meeting: any) => {
                return (
                  <ListItem key={meeting.id}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        checked={
                          this.state.selectedMeeting &&
                          this.state.selectedMeeting.id === meeting.id
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            this.setState({
                              ...this.state,
                              selectedMeeting: meeting,
                            });
                          } else {
                            this.setState({
                              ...this.state,
                              selectedMeeting: null,
                            });
                          }
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={meeting.attributes.title} />
                    <ListItemText primary={meeting.attributes.agenda} />
                    <ListItemText
                      primary={meeting.attributes.meeting_date_time}
                    />
                  </ListItem>
                );
              })}
            </List> */}
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <div className="selected-meeting">
              <h4>
                {this.state.selectedMeeting &&
                  this.state.selectedMeeting.attributes.title}
              </h4>
            </div>
            <div className="button-group">
              <Button
                className="cancel-button"
                onClick={() => this.handleSelectMeetingModal()}
              >
                Cancel
              </Button>
              <Button
                className="add-button"
                onClick={() => this.handleSelectMeetingModal()}
                disabled={!this.state.selectedMeeting}
              >
                Create
              </Button>
            </div>
          </DialogActions>
        </Dialog>

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
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TwitterIcon />
              </TwitterShareButton>
              <WhatsappShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                separator=":: "
              >
                <WhatsappIcon />
              </WhatsappShareButton>
              <LinkedinShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <LinkedinIcon />
              </LinkedinShareButton>
              <EmailShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <EmailIcon />
              </EmailShareButton>
              <RedditShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <RedditIcon />
              </RedditShareButton>
              <TelegramShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TelegramIcon />
              </TelegramShareButton>
              <TumblrShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TumblrIcon />
              </TumblrShareButton>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(DocumentReportStyleWeb)(DocumentListChairman);
// Customizable Area End
