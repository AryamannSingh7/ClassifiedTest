// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import ViewPersonalDocumentController, { Props } from "./ViewPersonalDocumentController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { BackIcon, DownloadImage } from "./assets";
import { withTranslation } from "react-i18next";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";

class ViewPersonalDocument extends ViewPersonalDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes }: any = this.props;

    return (
      <>
        <Box className={classes.personalDocument} style={{ background: "#F7F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu personal-document-menu">
                <div className="name">
                  <Link href={`/PersonalDocument/${this.state.documentType}`}>
                    <IconButton>
                      <img src={BackIcon} alt="" />
                    </IconButton>
                  </Link>{" "}
                  <span className="bold-text">{this.state.documentTitle}</span>
                </div>
                <Link href={this.state.documentDownloadUrl} target="_blank">
                  <IconButton>
                    <img src={DownloadImage} alt="download" />
                  </IconButton>
                </Link>
              </Box>
              <Container className="content-area document-box">
                <div className="document-view">
                  <iframe src={this.state.documentUrl + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH"} />
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(DocumentReportStyleWeb)(ViewPersonalDocument));
// Customizable Area End
