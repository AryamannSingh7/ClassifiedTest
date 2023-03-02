// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import ViewBuildingDocumentController, { Props } from "./ViewBuildingDocumentController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { BackIcon, DownloadImage, PdfImage, ShareImage } from "./assets";
import moment from "moment";
import { withTranslation } from "react-i18next";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { toast } from "react-hot-toast";

class ViewBuildingDocument extends ViewBuildingDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.buildingDocument} style={{ background: "#F7F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu building-document-menu">
                <div className="name">
                  <Link href={`/BuildingDocuments/${this.state.documentType}`}>
                    <IconButton>
                      <img src={BackIcon} alt="" />
                    </IconButton>
                  </Link>{" "}
                  <span className="bold-text">{this.state.documentTitle}</span>
                </div>
                <Link href={this.state.documentDownloadUrl} target="_blank">
                  <img src={DownloadImage} alt="download" />
                </Link>
              </Box>
              <Container className="content-area document-box">
                <div className="document-view">
                  <iframe src={this.state.documentUrl + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH"} />
                </div>
                {this.state.documentType.toLowerCase() === "resolutions" && this.state.document && (
                  <>
                    <div className="meeting-item view">
                      <div className="item-title">
                        <img src={PdfImage} />
                        <h6 className="bold-text">
                          {t("Meeting Minute")}{" "}
                          {moment(this.state.document.attributes.meeting_date_time, "DD-MM-YYYY HH:mm").format(
                            "DD-MMM-YYYY HH:mm"
                          )}
                        </h6>
                      </div>
                      <div className="icons">
                        <img
                          src={ShareImage}
                          onClick={() => {
                            if (this.state.document.attributes.meeting_mins_pdf) {
                              this.setState({ shareUrl: this.state.document.attributes.meeting_mins_pdf.url }, () => {
                                this.handleShareModal();
                              });
                            } else {
                              toast.error("No meeting minute available");
                            }
                          }}
                        />
                        <Link
                          download={this.state.documentTitle}
                          href={
                            this.state.document.attributes.meeting_mins_pdf &&
                            this.state.document.attributes.meeting_mins_pdf.url
                          }
                          target="_blank"
                        >
                          <img src={DownloadImage} />
                        </Link>
                      </div>
                    </div>
                    <div className="meeting-details">
                      <h4 className="bold-text">{t("Meeting Details")}</h4>
                      <Card className="card">
                        <p>{t("Date & Time")}:</p>
                        <span>
                          {moment(this.state.document.attributes.meeting_date_time, "DD-MM-YYYY HH:mm").format(
                            "DD-MMM-YYYY HH:mm"
                          )}
                        </span>
                        <p>{t("Place")}:</p>
                        <span>{this.state.document.attributes.meeting.place}</span>
                        <p>{t("Building")}:</p>
                        <span>{this.state.document.attributes.buidling_name}</span>
                        <p>{t("Agenda")}:</p>
                        <span>{this.state.document.attributes.meeting.agenda}</span>
                      </Card>
                    </div>
                  </>
                )}
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(ViewBuildingDocument));
// Customizable Area End
