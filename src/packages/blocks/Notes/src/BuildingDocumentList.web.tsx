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
import BuildingDocumentListController, { Props } from "./BuildingDocumentListController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { BuildingLogo, PdfImage, ShareImage, DownloadImage, NoPdf } from "./assets";
import moment from "moment";
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
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class BuildingDocumentList extends BuildingDocumentListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    return (
      <>
        <Box className={classes.buildingDocument} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link href="/BuildingDocuments">
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                {this.state.documentType.toLowerCase() === "building-plans"
                  ? `${t("Building Plans")}`
                  : `${t(this.state.documentType)}`}
              </Box>
              <Container
                className={`${this.state.documentType.toLowerCase() === "resolutions" &&
                  "resolution-box"} content-area document-box list`}
              >
                <div className="personal-documents">
                  {this.state.documentsList.length === 0 && (
                    <div className="empty-list">
                      <div className="content-box">
                        <img src={NoPdf} />
                        <h3>{t("No Document Found")}</h3>
                      </div>
                    </div>
                  )}
                  <Grid container spacing={2}>
                    {this.state.documentType.toLowerCase() === "resolutions" ? (
                      <>
                        {this.state.documentsList.map((document: any) => {
                          return (
                            <Grid item xs={12} md={6} lg={6} key={document.id}>
                              <Card className="card-item">
                                <Link href={`/BuildingDocuments/${this.state.documentType}/${document.id}/view`}>
                                  <div className="heading">
                                    <h4>{document.attributes.title}</h4>
                                  </div>
                                </Link>
                                <div className="res-info">
                                  <div className="info-item">
                                    <p>{t("Date & Time")}</p>
                                    <span>{moment(document.attributes.created_at).format("DD-MMM-YYYY HH:mm")}</span>
                                  </div>
                                  <div className="info-item">
                                    <p>{t("Building")}</p>
                                    <span>{document.attributes.buidling_name}</span>
                                  </div>
                                </div>
                                <div className="meeting-item">
                                  <div className="item-title">
                                    <img src={PdfImage} />
                                    <h6>
                                      Meeting Minute{" "}
                                      {moment(document.attributes.meeting_date_time, "DD-MM-YYYY HH:mm").format(
                                        "DD-MMM-YYYY"
                                      )}
                                    </h6>
                                  </div>
                                  <div className="icons">
                                    <img
                                      src={ShareImage}
                                      onClick={() => {
                                        this.setState(
                                          {
                                            ...this.state,
                                            shareUrl: document.attributes.meeting_mins_pdf.url,
                                            shareQuote: document.attributes.meeting.title,
                                          },
                                          () => {
                                            this.handleShareModal();
                                          }
                                        );
                                      }}
                                    />
                                    <Link
                                      //  href={document.attributes.meeting_mins_pdf.url}
                                      onClick={() => alert("Coming soon!!")}
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
                      </>
                    ) : (
                      <>
                        {this.state.documentsList.map((document: any) => {
                          return (
                            <Grid item xs={12} md={12} lg={12} key={document.id}>
                              <Box className="item document">
                                <Link href={`/BuildingDocuments/${this.state.documentType}/${document.id}/view`}>
                                  <div className="left-side">
                                    <div className="image">
                                      <img src={PdfImage} />
                                    </div>
                                    <div className="info">
                                      <h4>{document.attributes.title}</h4>
                                    </div>
                                  </div>
                                </Link>
                              </Box>
                            </Grid>
                          );
                        })}
                      </>
                    )}
                  </Grid>
                </div>
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(BuildingDocumentList));
// Customizable Area End
