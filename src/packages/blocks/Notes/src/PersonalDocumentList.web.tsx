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
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PersonalDocumentListController, {
  Props,
} from "./PersonalDocumentListController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";

import UploadImage from "../assets/upload.png";
import DeleteImage from "../assets/delete.png";
import NoPdf from "../assets/no-pdf.png";
import BuildingLogo from "../assets/building.png";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

class PersonalDocumentList extends PersonalDocumentListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    console.log(this.state);

    return (
      <>
        <Box
          className={classes.personalDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link
                  href={
                    localStorage.getItem("userType") === "Owner"
                      ? "/OwnerDashboard"
                      : ""
                  }
                >
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                Rent Contract
              </Box>
              <Container className="content-area document-box list">
                <div className="personal-documents">
                  <div className="empty-list">
                    <div className="content-box">
                      <img src={NoPdf} />
                      <h3>No Document Found</h3>
                      <p>
                        Looks like you haven't uploaded any documents! you can
                        upload rent contract by tapping on below button.
                      </p>
                    </div>
                  </div>
                  <Grid container spacing={2} className="">
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact/12/view">
                          <div className="left-side">
                            <div className="image">
                              <img src={Document} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>Download</MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.setState(
                                  {
                                    ...this.state,
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
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact">
                          <div className="left-side">
                            <div className="image">
                              <img src={Document} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Share</MenuItem>
                          </Menu>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact">
                          <div className="left-side">
                            <div className="image">
                              <img src={Document} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>Download</MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.setState(
                                  {
                                    ...this.state,
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
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact">
                          <div className="left-side">
                            <div className="image">
                              <img src={Document} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Share</MenuItem>
                          </Menu>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact">
                          <div className="left-side">
                            <div className="image">
                              <img src={Document} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>Download</MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.setState(
                                  {
                                    ...this.state,
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
                  </Grid>
                </div>
                <div className="upload-button">
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Button onClick={() => this.handleAddDocumentModal()}>
                        Upload Document
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
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
          <DialogContent dividers>
            <FormControl fullWidth>
              <input
                value={this.state.title}
                onChange={(e: any) => {
                  this.setState({
                    ...Box.state,
                    title: e.target.value,
                  });
                }}
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
              {this.state.file && <span>{this.state.file.name}</span>}
              <span />
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
              disabled={
                this.state.title.length === 0 || this.state.file === null
              }
              variant="contained"
              onClick={() => {}}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteDocumentModal()}
          open={this.state.isDeleteDocumentModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">
                Delete uploaded rent contract
              </Typography>
              <Typography variant="body1">
                Are you sure want to delete uploaded rent contract from this
                app? Once deleted you won't be able to view deleted contract
                again.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  variant="contained"
                  onClick={() => {
                    this.deleteCategory();
                  }}
                  color="primary"
                >
                  Yes Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => this.handleDeleteDocumentModal()}
                  color="primary"
                >
                  No, Don't Delete
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
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
              <PinterestShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <PinterestIcon size="2.5rem" />
              </PinterestShareButton>
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

export default withStyles(DocumentReportStyleWeb)(PersonalDocumentList);
// Customizable Area End
