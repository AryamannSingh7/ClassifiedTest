// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerRequestController, { Props } from "./PropertyManagerRequestController.web";
import { BuildingLogo } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";

class PropertyManagerRequest extends PropertyManagerRequestController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.managerList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    {t("New Request")}
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <div className="content-box">
                      <div className="contracts-list">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Card className="contract">
                              <Link href={`/PropertyManagers/Request/1`}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <h4>Ali Khan</h4>
                                    </div>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2} className="info">
                                  <Grid item xs={12}>
                                    <span>{t("Manages")}</span>
                                    <p>Lorem Ipsum</p>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <span>{t("Company Name")}</span>
                                    <p>Lorem Ipsum</p>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <span>{t("Charges")}</span>
                                    <p>Lorem Ipsum</p>
                                  </Grid>
                                </Grid>
                              </Link>
                              <Grid container spacing={2} className="request-buttons">
                                <Grid item xs={6}>
                                  <Button className="decline">{t("Decline")}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                  <Button>{t("Accept")}</Button>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Box>
                </Container>
              </Box>
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(PropertyManagerRequest));
// Customizable Area End
