// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RequestPropertyManagerDetailsController, { Props } from "./RequestPropertyManagerDetailsController.web";
import {
  BuildingLogo,
  BlueManagerIcon,
  BlueNumberIcon,
  BlueCompanyIcon,
  BluePhoneIcon,
  BlueEmailIcon,
  BlueTypeIcon,
  BlueDateIcon,
  PdfIcon,
  DownloadIcon,
} from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import moment from "moment";
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
                    <span>{this.state.propertyManagerDetails.managerName || "-"}</span>
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <Box className="details-box-item">
                      <h4>{t("Property Manager Details")}</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueManagerIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Manager Name")}</span>
                                <p>{this.state.propertyManagerDetails.managerName || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueCompanyIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Company Name")}</span>
                                <p>{this.state.propertyManagerDetails.companyName || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BluePhoneIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Phone Number")}</span>
                                <p>{this.state.propertyManagerDetails.phoneNumber || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueEmailIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Email Address")}</span>
                                <p>{this.state.propertyManagerDetails.email || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="details-box-item">
                      <h4>{t("Property Details")}</h4>
                      <Grid container spacing={2}>
                        {this.state.propertyManagerDetails.propertyList.length === 0 && (
                          <Grid item xs={12}>
                            <Card>{t("No Property Available")}</Card>
                          </Grid>
                        )}
                        {this.state.propertyManagerDetails.propertyList.map((property: any) => {
                          return (
                            <Grid item xs={12} key={property.id}>
                              <Card>
                                <Box className="heading-box-item">
                                  <h4>Building 5 Unit 508</h4>
                                  <Box className="right-box-item">
                                    <span>{t("See building on map")}</span>
                                  </Box>
                                </Box>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <Box className="box-item-content">
                                      <span>{t("Contract")}</span>
                                      <p>
                                        {moment(property.start_date, "YYYY-MM-DD").format("MMMM DD, YYYY")} -{" "}
                                        {moment(property.end_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                      </p>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className="box-item-content">
                                      <span>{t("Charges")}</span>
                                      <p>{property.fixed_persentage_of_rent}/Month</p>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>

                    <Box className="details-box-item">
                      <h4>{t("Identity Proof")}</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueTypeIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Type")}</span>
                                <p>{this.state.propertyManagerDetails.IdType || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueNumberIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Number")}</span>
                                <p>{this.state.propertyManagerDetails.IdNumber || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueDateIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Expiration Date")}</span>
                                <p>
                                  {moment(this.state.propertyManagerDetails.IdDate, "YYYY-MM-DD").format(
                                    "MMMM DD, YYYY"
                                  )}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="pdf-content-box">
                      <Card>
                        <Box className="heading">
                          <img src={PdfIcon} alt="" />
                          <h4>
                            {this.state.propertyManagerDetails.managerName +
                              " " +
                              this.state.propertyManagerDetails.IdType}{" "}
                          </h4>
                        </Box>
                        <Link target="_blank" href={this.state.propertyManagerDetails.IdPdfDocument}>
                          <img src={DownloadIcon} alt="" />
                        </Link>
                      </Card>
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
