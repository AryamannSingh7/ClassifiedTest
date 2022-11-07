// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { BuildingLogo, Document } from "./assets";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import PersonalDocumentController, { Props } from "./PersonalDocumentsController.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class PersonalDocument extends PersonalDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box className={classes.personalDocument} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <IconButton onClick={() => this.redirectToDashboard()}>
                  <KeyboardBackspaceIcon />
                </IconButton>
                {t("Personal Documents")}
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contract">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>{t("Rent Contract")}</h4>
                        </div>
                        <div>
                          {this.state.rent_contract > 0 && (
                            <Button className="color-btn">{this.state.rent_contract}</Button>
                          )}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Unit-Plan">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>{t("Unit Plan")}</h4>
                        </div>
                        <div>
                          {this.state.unit_plan > 0 && <Button className="color-btn">{this.state.unit_plan}</Button>}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Other-Documents">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>{t("Other Documents")}</h4>
                        </div>
                        <div>
                          {this.state.other_document > 0 && (
                            <Button className="color-btn">{this.state.other_document}</Button>
                          )}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(DocumentReportStyleWeb)(PersonalDocument));
// Customizable Area End
