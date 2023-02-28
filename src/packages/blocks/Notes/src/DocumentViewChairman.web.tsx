// Customizable Area Start
import React from "react";
import { Button, Container, Typography, withStyles, Box, Grid, Link } from "@material-ui/core";
import DocumentViewChairmanController, { Props } from "./DocumentViewChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import { withTranslation } from "react-i18next";
import GeneralSideBarWeb from "../../dashboard/src/GeneralSideBar.web";

class DocumentViewChairman extends DocumentViewChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F7F9FE" }} className={classes.documentChairman}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <GeneralSideBarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      <Link href="/DocumentChairman">{t("Documents")}</Link> /{" "}
                      <Link href={`/DocumentChairman/${this.state.documentType}`}>{t(this.state.documentType)}</Link> /{" "}
                      <Box
                        component="span"
                        style={{
                          color: "blue",
                          wordBreak: "break-all",
                        }}
                      >
                        {this.state.document && this.state.document.attributes.title}
                      </Box>
                    </Typography>
                    <Box className="top-heading">
                      <Typography variant="h5" className="sub-heading bold-text">
                        {this.state.document && this.state.document.attributes.title}
                      </Typography>
                      <Link
                        href={this.state.document && this.state.document.attributes.images[0].download_url}
                        target="_blank"
                      >
                        <Button variant="contained">{t("Download")}</Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box className="document-box document-card">
                  <iframe
                    src={`${this.state.document &&
                      this.state.document.attributes.images[0].url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  />
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(DocumentReportStyleWeb)(DocumentViewChairman));
// Customizable Area End
