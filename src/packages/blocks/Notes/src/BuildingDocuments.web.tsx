// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Document } from "./assets";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import BuildingDocumentController, { Props } from "./BuildingDocumentsController.web";
import { withTranslation } from "react-i18next";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import CategoryBox from "../../../components/src/DocumentComponent/CategoryBox.web";

class BuildingDocuments extends BuildingDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes, t }: any = this.props;

    return (
      <>
        <Box className={classes.buildingDocument} style={{ background: "#F7F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <IconButton onClick={() => this.handleGotoDashboard()}>
                  <KeyboardBackspaceIcon />
                </IconButton>{" "}
                <span className="bold-text">{t("Building Documents")}</span>
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Policy">
                      <CategoryBox image={Document} heading={t("Policy")} value={this.state.policy} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Resolutions">
                      <CategoryBox image={Document} heading={t("Resolutions")} value={this.state.resolution} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Roles">
                      <CategoryBox image={Document} heading={t("Roles")} value={this.state.roles} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Guidelines">
                      <CategoryBox image={Document} heading={t("Guidelines")} value={this.state.guidelines} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Building-Plans">
                      <CategoryBox image={Document} heading={t("Building Plans")} value={this.state.buildingPlans} />
                    </Link>
                  </Grid>
                </Grid>
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(BuildingDocuments));
// Customizable Area End
