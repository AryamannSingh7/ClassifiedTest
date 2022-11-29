// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RequestPropertyManagerDetailsController, { Props } from "./RequestPropertyManagerDetailsController.web";
import { BuildingLogo, BlueManagerIcon, BlueCompanyIcon, BluePhoneIcon, BlueEmailIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import Loader from "../../../components/src/Loader.web";

class RequestPropertyManagerDetails extends RequestPropertyManagerDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.managerDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers/Request">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{this.state.propertyDetails.managerName || "-"}</span>
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <Box className="content-box">
                      <Box className="details-box-item">
                        <h4>{t("Property Manager Details")}</h4>
                        <Card>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box className="box-item">
                                <img src={BlueManagerIcon} alt="" />
                                <Box className="box-item-content">
                                  <span>{t("Manager Name")}</span>
                                  <p>{this.validationText(this.state.propertyDetails.managerName)}</p>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="box-item">
                                <img src={BlueCompanyIcon} alt="" />
                                <Box className="box-item-content">
                                  <span>{t("Company Name")}</span>
                                  <p>{this.validationText(this.state.propertyDetails.companyName)}</p>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="box-item">
                                <img src={BluePhoneIcon} alt="" />
                                <Box className="box-item-content">
                                  <span>{t("Phone Number")}</span>
                                  <p>{this.validationText(this.state.propertyDetails.phoneNumber)}</p>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="box-item">
                                <img src={BlueEmailIcon} alt="" />
                                <Box className="box-item-content">
                                  <span>{t("Email Address")}</span>
                                  <p>{this.validationText(this.state.propertyDetails.email)}</p>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>

                      <Box className="details-box-item">
                        <h4>{t("Property Details")}</h4>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Card>
                              <Box className="heading-box-item">
                                <h4>
                                  Building {this.state.propertyDetails.buildingName} Unit{" "}
                                  {this.state.propertyDetails.unitName}
                                </h4>
                                <Box className="right-box-item">
                                  <Link
                                    href={`https://maps.google.com/?q=${this.state.propertyDetails.lat},${
                                      this.state.propertyDetails.long
                                    }`}
                                    target="_blank"
                                  >
                                    <span>{t("See building on map")}</span>
                                  </Link>
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>

                    <Box className="button-box">
                      <Button className="decline">Decline</Button>
                      <Button className="accept">Accept</Button>
                    </Box>
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(RequestPropertyManagerDetails));
// Customizable Area End
