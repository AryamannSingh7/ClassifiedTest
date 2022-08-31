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
import PdfImage from "../assets/pdf.png";
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
              {this.state.documentType !== "rent-contract" &&
              this.state.documentType !== "unit-plan" &&
              this.state.documentType !== "other-documents" ? (
                <p>Wrong url</p>
              ) : (
                <>
                  <Box display={{ xs: "flex", md: "flex" }} className="menu">
                    <Link href="/PersonalDocument">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>{" "}
                    {this.state.documentType === "rent-contract" &&
                      "Rent Contract"}
                    {this.state.documentType === "unit-plan" && "Unit Plan"}
                    {this.state.documentType === "other-documents" &&
                      "Other Documents"}
                  </Box>
                  <Container className="content-area document-box list">
                    <div className="personal-documents">
                      {this.state.documentsList.length === 0 && (
                        <div className="empty-list">
                          <div className="content-box">
                            <img src={NoPdf} />
                            <h3>No Document Found</h3>
                            <p>
                              Looks like you haven't uploaded any documents! you
                              can upload{" "}
                              {this.state.documentType === "rent-contract" &&
                                "rent contract"}
                              {this.state.documentType === "unit-plan" &&
                                "unit plan"}
                              {this.state.documentType === "other-documents" &&
                                "other documents"}{" "}
                              by tapping on below button.
                            </p>
                          </div>
                        </div>
                      )}
                      <Grid container spacing={2}>
                        {this.state.documentsList.map((document: any) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              key={document.id}
                            >
                              <Box className="item document">
                                <Link
                                  href={`/PersonalDocument/${
                                    this.state.documentType
                                  }/${document.id}/view`}
                                >
                                  <div className="left-side">
                                    <div className="image">
                                      <img src={PdfImage} />
                                    </div>
                                    <div className="info">
                                      <h4>{document.attributes.title}</h4>
                                      <div className="more-info">
                                        {/* <p>
                                          <span>55</span>pages
                                        </p> */}
                                        <p>
                                          <span>
                                            {
                                              document.attributes.images[0]
                                                .file_size
                                            }
                                          </span>
                                          MB
                                        </p>
                                        <p>
                                          {moment(
                                            document.attributes.created_at
                                          ).format("DD/MM/YYYY")}
                                        </p>
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
                                              document.attributes.images[0].url,
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
                </>
              )}
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
            <Button
              disabled={
                this.state.title.length === 0 ||
                this.state.title.length > 100 ||
                this.isInputOnlyWhiteSpace(this.state.title) ||
                this.state.file === null
              }
              onClick={() => this.createPersonalDocument()}
              className="add-button"
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
                Are you sure want to delete uploaded{" "}
                {this.state.documentType === "rent-contract" && "rent contract"}
                {this.state.documentType === "unit-plan" && "unit plan"}
                {this.state.documentType === "other-documents" &&
                  "other documents"}{" "}
                from this app? Once deleted you won't be able to view deleted
                contract again.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  onClick={() => {
                    this.deletePersonalDocument();
                  }}
                >
                  Yes Delete
                </Button>
                <Button onClick={() => this.handleDeleteDocumentModal()}>
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
