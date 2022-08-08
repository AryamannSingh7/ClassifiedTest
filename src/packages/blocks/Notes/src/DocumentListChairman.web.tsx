// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  IconButton,
  // Menu,
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
import { MenuBookTwoTone } from "@material-ui/icons";

class DocumentListChairman extends DocumentListChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

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
                      {this.state.docName === "resolutions" ? (
                        <Button
                          variant="contained"
                          onClick={() => this.handleAddResolutionsModal()}
                        >
                          Add New Resolution
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
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
                    this.state.docName === "resolutions" ? "resolutions" : ""
                  }`}
                >
                  {this.state.docName === "resolutions" ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6} lg={4}>
                        <Card className="card-item">
                          <div className="heading">
                            <h4>Resolution Title</h4>
                            <div className="menu">
                              <IconButton onClick={() => {}}>
                                <MoreVertIcon />
                              </IconButton>
                            </div>
                          </div>
                          <div className="res-info">
                            <div className="info-item">
                              <p>Date & Time</p>
                              <span>Date & Time</span>
                            </div>
                            <div className="info-item">
                              <p>Building</p>
                              <span>Building</span>
                            </div>
                          </div>
                          <div className="item">
                            <div className="item-title">
                              <img src={Document} />
                              <h6>Policy</h6>
                            </div>
                            <div className="icons">
                              <img src={ShareImage} />
                              <img src={DownloadImage} />
                            </div>
                          </div>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Card className="card-item">
                          <div className="heading">
                            <h4>Resolution Title</h4>
                            <div className="menu">
                              <IconButton onClick={() => {}}>
                                <MoreVertIcon />
                              </IconButton>
                            </div>
                          </div>
                          <div className="res-info">
                            <div className="info-item">
                              <p>Date & Time</p>
                              <span>Date & Time</span>
                            </div>
                            <div className="info-item">
                              <p>Building</p>
                              <span>Building</span>
                            </div>
                          </div>
                          <div className="item">
                            <div className="item-title">
                              <img src={Document} />
                              <h6>Policy</h6>
                            </div>
                            <div className="icons">
                              <img src={ShareImage} />
                              <img src={DownloadImage} />
                            </div>
                          </div>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Card className="card-item">
                          <div className="heading">
                            <h4>Resolution Title</h4>
                            <div className="menu">
                              <IconButton onClick={() => {}}>
                                <MoreVertIcon />
                              </IconButton>
                            </div>
                          </div>
                          <div className="res-info">
                            <div className="info-item">
                              <p>Date & Time</p>
                              <span>Date & Time</span>
                            </div>
                            <div className="info-item">
                              <p>Building</p>
                              <span>Building</span>
                            </div>
                          </div>
                          <div className="item">
                            <div className="item-title">
                              <img src={Document} />
                              <h6>Policy</h6>
                            </div>
                            <div className="icons">
                              <img src={ShareImage} />
                              <img src={DownloadImage} />
                            </div>
                          </div>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Card className="card-item">
                          <div className="heading">
                            <h4>Resolution Title</h4>
                            <div className="menu">
                              <IconButton onClick={() => {}}>
                                <MoreVertIcon />
                              </IconButton>
                            </div>
                          </div>
                          <div className="res-info">
                            <div className="info-item">
                              <p>Date & Time</p>
                              <span>Date & Time</span>
                            </div>
                            <div className="info-item">
                              <p>Building</p>
                              <span>Building</span>
                            </div>
                          </div>
                          <div className="item">
                            <div className="item-title">
                              <img src={Document} />
                              <h6>Policy</h6>
                            </div>
                            <div className="icons">
                              <img src={ShareImage} />
                              <img src={DownloadImage} />
                            </div>
                          </div>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Card className="card-item">
                          <div className="heading">
                            <h4>Resolution Title</h4>
                            <div className="menu">
                              <IconButton onClick={() => {}}>
                                <MoreVertIcon />
                              </IconButton>
                            </div>
                          </div>
                          <div className="res-info">
                            <div className="info-item">
                              <p>Date & Time</p>
                              <span>Date & Time</span>
                            </div>
                            <div className="info-item">
                              <p>Building</p>
                              <span>Building</span>
                            </div>
                          </div>
                          <div className="item">
                            <div className="item-title">
                              <img src={Document} />
                              <h6>Policy</h6>
                            </div>
                            <div className="icons">
                              <img src={ShareImage} />
                              <img src={DownloadImage} />
                            </div>
                          </div>
                        </Card>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Policy</h4>
                          </div>
                          <div className="menu">
                            <IconButton onClick={() => {}}>
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Policy</h4>
                          </div>
                          <div className="menu">ss</div>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleAddDocumentModal()}
          open={this.state.idAddDocumentModalOpen}
          className="add-document"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Add New Document</Typography>
            <IconButton onClick={() => this.handleAddDocumentModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <input
                placeholder="Title"
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
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
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              variant="outlined"
              onClick={() => this.handleAddDocumentModal()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => this.handleAddDocumentModal()}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="delete-document"
          fullWidth
          onClose={() => this.handleDeleteDocumentModal()}
          open={this.state.idDeleteDocumentModalOpen}
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
                  variant="outlined"
                  onClick={() => this.handleDeleteDocumentModal()}
                  color="primary"
                >
                  No, Don't Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.handleDeleteDocumentModal();
                  }}
                  color="primary"
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
          open={this.state.idAddResolutionModalOpen}
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
                placeholder="Resolution Title"
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
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
            </FormControl>
            <div className="choose-meeting">
              <span onClick={() => this.handleSelectMeetingModal()}>
                Choose Meeting
              </span>
            </div>
            <div className="change-meeting">
              <span>Title</span>
              <span onClick={() => this.handleSelectMeetingModal()}>
                Change
              </span>
            </div>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              variant="outlined"
              onClick={() => this.handleAddResolutionsModal()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => this.handleAddResolutionsModal()}
              color="primary"
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
          open={this.state.idSelectMeetingModalOpen}
          className="select-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Select Meeting Minutes</Typography>
            <IconButton onClick={() => this.handleSelectMeetingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <List>
              <ListItem dense className="list-heading">
                <ListItemIcon />
                <ListItemText primary="Title" />
                <ListItemText primary="Agenda" />
                <ListItemText primary="Date & Time" />
              </ListItem>
              <ListItem dense>
                <ListItemIcon>
                  <Checkbox edge="start" tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary="Title" />
                <ListItemText primary="Agenda" />
                <ListItemText primary="Date & Time" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <div className="selected-meeting">
              <h4>Title</h4>
            </div>
            <div className="button-group">
              <Button
                variant="outlined"
                onClick={() => this.handleSelectMeetingModal()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => this.handleSelectMeetingModal()}
                color="primary"
              >
                Create
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(DocumentReportStyleWeb)(DocumentListChairman);
// Customizable Area End
