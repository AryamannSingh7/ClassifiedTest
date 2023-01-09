// Customizable Area Start
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
import DocumentListChairmanController, { Props } from "./DocumentListChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { Document, UploadImage, DeleteImage, ShareImage, DownloadImage, PdfImage } from "./assets";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import moment from "moment";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";

class DocumentListChairman extends DocumentListChairmanController {
  constructor(props: Props) {
    super(props);
  }

  headerButton = (documentPage: any, t: any) => {
    if (documentPage === "resolutions") {
      return <Button onClick={() => this.handleAddResolutionsModal()}>{t("Add New Resolution")}</Button>;
    } else {
      return <Button onClick={() => this.handleAddDocumentModal()}>{t("Upload Documents")}</Button>;
    }
  };

  documentClass = (documentPage: any) => {
    return documentPage === "resolutions" ? "resolutions" : "";
  };

  handleError = (errors: any, touched: any) => {
    if (errors && touched) {
      return <small className="error">{errors.title}</small>;
    }
  };

  reloadPage = () => {
    window.addEventListener("pageshow", (event: any) => {
      const historyTraversal =
        event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);

      if (historyTraversal) {
        window.location.reload();
      }
    });
  };

  resolutionList = (t: any) => {
    if (this.state.resolutionList.length === 0) {
      return (
        <>
          <span>{"No Resolution Available!!"}</span>
        </>
      );
    } else {
      return this.state.resolutionList.map((resolution: any) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={resolution.id}>
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
                        href={resolution.attributes.attachments && resolution.attributes.attachments[0].url}
                        target="_blank"
                      >
                        {t("Download")}
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        this.setState({ ...this.state, selectedDocumentId: resolution.id }, () => {
                          this.handleDeleteDocumentModal();
                        });
                      }}
                    >
                      {t("Delete")}
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        this.handleOpenShareModal(
                          resolution.attributes.attachments && resolution.attributes.attachments[0].url
                        )
                      }
                    >
                      {t("Share")}
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="res-info">
                <div className="info-item">
                  <p>{t("Date & Time")}</p>
                  <span>{moment(resolution.attributes.created_at).format("DD-MMM-YYYY HH:mm")}</span>
                </div>
                <div className="info-item">
                  <p>{t("Building")}</p>
                  <span>{resolution.attributes.buidling_name}</span>
                </div>
              </div>
              <div className="item">
                <div className="item-title">
                  <img src={PdfImage} />
                  <h6>
                    Meeting Minute{" "}
                    {moment(resolution.attributes.meeting_date_time, "DD-MM-YYYY HH:mm").format("DD-MMM-YYYY")}
                  </h6>
                </div>
                <div className="icons">
                  <img
                    src={ShareImage}
                    onClick={() =>
                      this.handleOpenShareModal(
                        resolution.attributes.meeting_mins_pdf && resolution.attributes.meeting_mins_pdf.url
                      )
                    }
                  />
                  <Link
                    href={resolution.attributes.meeting_mins_pdf && resolution.attributes.meeting_mins_pdf.url}
                    target="_blank"
                  >
                    <img src={DownloadImage} />
                  </Link>
                </div>
              </div>
            </Card>
          </Grid>
        );
      });
    }
  };

  documentList = (t: any) => {
    if (this.state.documentList.length === 0) {
      return (
        <>
          <span>{t("No Document Available!!")}</span>
        </>
      );
    } else {
      return this.state.documentList.map((document: any) => {
        return (
          <Grid item xs={12} md={12} lg={12}>
            <Box className="item">
              <Link href={`/DocumentChairman/${this.state.docName}/${document.id}/view`}>
                <div className="heading">
                  <img src={Document} />
                  <h4>{document.attributes.title}</h4>
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
                    <Link href={document.attributes.images[0].download_url} target="_blank">
                      {t("Download")}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.setState({ ...this.state, selectedDocumentId: document.id }, () => {
                        this.handleDeleteDocumentModal();
                      });
                    }}
                  >
                    {t("Delete")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.setState({ shareUrl: document.attributes.images[0].url }, () => {
                        this.handleShareModal();
                      });
                    }}
                  >
                    {t("Share")}
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          </Grid>
        );
      });
    }
  };

  meetingList = (t: any) => {
    if (this.state.meetingsList.length === 0) {
      return (
        <>
          <span>{t("No Meetings Available!!")}</span>
        </>
      );
    } else {
      return this.state.meetingsList.map((meeting: any) => {
        return (
          <ListItem key={meeting.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={this.state.selectedMeeting && this.state.selectedMeeting.id === meeting.id}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    this.setState({ selectedMeeting: meeting });
                  } else {
                    this.setState({ selectedMeeting: null });
                  }
                }}
              />
            </ListItemIcon>
            <ListItemText primary={meeting.attributes.title} />
            <ListItemText primary={meeting.attributes.agenda} />
            <ListItemText primary={meeting.attributes.meeting_date_time} />
          </ListItem>
        );
      });
    }
  };

  isResolutionSubmitButtonDisabled = () => {
    return (
      !this.state.selectedMeeting ||
      this.state.title.length === 0 ||
      this.state.title.length > 100 ||
      this.isInputOnlyWhiteSpace(this.state.title) ||
      this.state.file === null
    );
  };

  showMeetingTitle = () => {
    return this.state.selectedMeeting && this.state.selectedMeeting.attributes.title;
  };

  render() {
    const { t, classes }: any = this.props;
    this.reloadPage();

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.documentChairman}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box>
                  <Box className="navigation">
                    <Box>
                      <Typography variant="body1">
                        {t("Documents")} /{" "}
                        <Box component="span" style={{ color: "blue" }}>
                          {t(this.state.docName)}
                        </Box>
                      </Typography>
                      <Box className="top-heading">
                        <Typography variant="h5" className="sub-heading">
                          {t(this.state.docName)}
                        </Typography>
                        {this.headerButton(this.state.docName.toLowerCase(), t)}
                      </Box>
                    </Box>
                  </Box>
                  <Box className={`document-box ${this.documentClass(this.state.docName.toLowerCase())}`}>
                    {this.state.docName.toLowerCase() === "resolutions" ? (
                      <Grid container spacing={2}>
                        {this.resolutionList(t)}
                      </Grid>
                    ) : (
                      <Grid container spacing={2}>
                        {this.documentList(t)}
                      </Grid>
                    )}
                  </Box>
                </Box>
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
            <Typography variant="h6">{t("Add New Document")}</Typography>
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
              this.setState({ ...this.state, title: values.title.trim(), file: values.file }, () => {
                this.createDocument();
                this.handleAddDocumentModal();
                resetForm();
              });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
                    <FormControl fullWidth>
                      <input
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="title"
                        placeholder={t("Title")}
                        className="dialog-input"
                        style={{
                          marginTop: "0",
                        }}
                      />
                      {this.handleError(errors.title, touched.title)}
                    </FormControl>
                    {values.file ? (
                      <Box className="modal-document-box">
                        <Box className="left-side-document">
                          <img src={PdfImage} alt="pdf-img" />
                          <p>{values.file.name}</p>
                        </Box>
                        <Box className="right-side-document">
                          <CloseIcon onClick={() => setFieldValue("file", null)} />
                        </Box>
                      </Box>
                    ) : (
                      <FormControl fullWidth>
                        <div
                          className="image-box"
                          onClick={() => {
                            this.upload.click();
                          }}
                        >
                          <img src={UploadImage} />
                          <Typography variant="body1">{t("Upload File")}</Typography>
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
                        {this.handleError(errors.file, touched.file)}
                      </FormControl>
                    )}
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button onClick={() => this.handleAddDocumentModal()} className="cancel-button">
                      {t("Cancel")}
                    </Button>
                    <Button type="submit" className="add-button">
                      {t("Create")}
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
              <Typography variant="h6">{t("Delete Document")}</Typography>
              <Typography variant="body1">{t("Are you sure want to delete?")}</Typography>
              <DialogActions className="dialog-button-group">
                <Button className="cancel-button" onClick={() => this.handleDeleteDocumentModal()}>
                  {t("No, Don't Delete")}
                </Button>
                <Button
                  className="add-button"
                  onClick={() => {
                    this.state.docName.toLowerCase() === "resolutions"
                      ? this.deleteResolution()
                      : this.deleteCategory();
                  }}
                >
                  {t("Yes Delete")}
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
            <Typography variant="h6">{t("Add New Resolution")}</Typography>
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
                placeholder={t("Resolution Title")}
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
              {this.state.title.length > 100 && (
                <span className="error">{t("Maximum length of title should be 100 character")}</span>
              )}
            </FormControl>
            {this.state.file ? (
              <Box className="modal-document-box">
                <Box className="left-side-document">
                  <img src={PdfImage} alt="pdf-img" />
                  <p>{this.state.file.name}</p>
                </Box>
                <Box className="right-side-document">
                  <CloseIcon onClick={() => this.setState({ file: null })} />
                </Box>
              </Box>
            ) : (
              <FormControl fullWidth>
                <div
                  className="image-box"
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  <img src={UploadImage} />
                  <Typography variant="body1">{t("Upload file")}</Typography>
                </div>
                <input
                  id="myInput"
                  type="file"
                  ref={(ref: any) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.onChangeFile.bind(this)}
                  accept=".pdf"
                />
              </FormControl>
            )}
            {this.state.selectedMeeting ? (
              <div className="change-meeting">
                <span>{this.state.selectedMeeting && this.state.selectedMeeting.attributes.title}</span>
                <span onClick={() => this.handleSelectMeetingModal()}>{t("Change")}</span>
              </div>
            ) : (
              <div className="choose-meeting" onClick={() => this.handleSelectMeetingModal()}>
                <span>{t("Choose Meeting")}</span>
              </div>
            )}
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleAddResolutionsModal()}>
              {t("Cancel")}
            </Button>
            <Button
              className="add-button"
              onClick={() => this.createResolution()}
              disabled={this.isResolutionSubmitButtonDisabled()}
            >
              {t("Create")}
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
            <Typography variant="h6">{t("Select Meeting Minutes")}</Typography>
            <IconButton onClick={() => this.handleSelectMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <List>
              <ListItem dense className="list-heading">
                <ListItemIcon />
                <ListItemText primary={t("Title")} />
                <ListItemText primary={t("Agenda")} />
                <ListItemText primary={t("Date & Time")} />
              </ListItem>
              {this.meetingList(t)}
            </List>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <div className="selected-meeting">
              <h4>{this.showMeetingTitle()}</h4>
            </div>
            <div className="button-group">
              <Button className="cancel-button" onClick={() => this.handleSelectMeetingModal()}>
                {t("Cancel")}
              </Button>
              <Button
                className="add-button"
                onClick={() => this.handleSelectMeetingModal()}
                disabled={!this.state.selectedMeeting}
              >
                {t("Create")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>

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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(DocumentListChairman));
// Customizable Area End
