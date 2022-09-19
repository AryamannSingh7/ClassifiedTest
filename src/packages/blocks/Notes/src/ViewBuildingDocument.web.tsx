// Customizable Area Start
import React from "react";
import {
  Container,
  IconButton,
  Link,
  Typography,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  Card,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ViewBuildingDocumentController, { Props } from "./ViewBuildingDocumentController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { DownloadImage, BuildingLogo, PdfImage, ShareImage } from "./assets";
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

class ViewBuildingDocument extends ViewBuildingDocumentController {
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
        <Box className={classes.buildingDocument} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu building-document-menu">
                <div className="name">
                  <Link href={`/BuildingDocuments/${this.state.documentType}`}>
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Link>{" "}
                  <span>{this.state.documentTitle}</span>
                </div>
                <Link href={this.state.documentDownloadUrl} target="_blank">
                  <img src={DownloadImage} alt="download" />
                </Link>
              </Box>
              <Container className="content-area document-box">
                <div className="document-view">
                  <iframe src={this.state.documentUrl} />
                </div>
                {this.state.documentType.toLowerCase() === "resolutions" && (
                  <>
                    <div className="meeting-item view">
                      <div className="item-title">
                        <img src={PdfImage} />
                        <h6>
                          Meeting Minute{" "}
                          {moment(
                            this.state.document && this.state.document.attributes.meeting_date_time,
                            "DD-MM-YYYY HH:mm"
                          ).format("DD-MMM-YYYY HH:mm")}
                        </h6>
                      </div>
                      <div className="icons">
                        <img
                          src={ShareImage}
                          onClick={() => {
                            this.setState(
                              {
                                ...this.state,
                                shareUrl: this.state.document && this.state.document.attributes.meeting_mins_pdf.url,
                                shareQuote: this.state.document && this.state.document.attributes.meeting.title,
                              },
                              () => {
                                this.handleShareModal();
                              }
                            );
                          }}
                        />
                        <Link
                          href={this.state.document && this.state.document.attributes.meeting_mins_pdf.url}
                          target="_blank"
                        >
                          <img src={DownloadImage} />
                        </Link>
                      </div>
                    </div>
                    <div className="meeting-details">
                      <h4>Meeting Details</h4>
                      <Card className="card">
                        <p>Date & Time:</p>
                        <span>
                          {moment(
                            this.state.document && this.state.document.attributes.meeting_date_time,
                            "DD-MM-YYYY HH:mm"
                          ).format("DD-MMM-YYYY HH:mm")}
                        </span>
                        <p>Place:</p>
                        <span>{this.state.document && this.state.document.attributes.meeting.place}</span>
                        <p>Building:</p>
                        <span>{this.state.document && this.state.document.attributes.buidling_name}</span>
                        <p>Agenda:</p>
                        <span>{this.state.document && this.state.document.attributes.meeting.agenda}</span>
                      </Card>
                    </div>
                  </>
                )}
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
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

export default withStyles(DocumentReportStyleWeb)(ViewBuildingDocument);
// Customizable Area End
