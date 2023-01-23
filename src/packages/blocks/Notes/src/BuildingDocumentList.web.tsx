// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import BuildingDocumentListController, { Props } from "./BuildingDocumentListController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { PdfImage, ShareImage, DownloadImage, NoPdf } from "./assets";
import moment from "moment";
import { withTranslation } from "react-i18next";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";
import { toast } from "react-hot-toast";

class BuildingDocumentList extends BuildingDocumentListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

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
                                      className="share-document-image"
                                      alt="share-document-image"
                                      onClick={() => {
                                        if (document.attributes.meeting_mins_pdf) {
                                          this.setState({ shareUrl: document.attributes.meeting_mins_pdf.url }, () => {
                                            this.handleShareModal();
                                          });
                                        } else {
                                          toast.error("No meeting minute available");
                                        }
                                      }}
                                    />
                                    <Link
                                      href={
                                        document.attributes.meeting_mins_pdf && document.attributes.meeting_mins_pdf.url
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(BuildingDocumentList));
// Customizable Area End
