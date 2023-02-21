// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Document } from "./assets";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import PersonalDocumentController, { Props } from "./PersonalDocumentsController.web";
import { withTranslation } from "react-i18next";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import CategoryBox from "../../../components/src/DocumentComponent/CategoryBox.web";

class PersonalDocument extends PersonalDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.personalDocument} style={{ background: "#F7F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <IconButton onClick={() => this.redirectToDashboard()}>
                  <KeyboardBackspaceIcon />
                </IconButton>
                <span className="bold-text">{t("Personal Documents")}</span>
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contract">
                      <CategoryBox image={Document} heading={t("Rent Contract")} value={this.state.rent_contract} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Unit-Plan">
                      <CategoryBox image={Document} heading={t("Unit Plan")} value={this.state.unit_plan} />
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Other-Documents">
                      <CategoryBox image={Document} heading={t("Other Documents")} value={this.state.other_document} />
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(PersonalDocument));
// Customizable Area End
