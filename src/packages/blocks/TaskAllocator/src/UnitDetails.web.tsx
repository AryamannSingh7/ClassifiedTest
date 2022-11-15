import React from "react";
import { withTranslation } from "react-i18next";
import UnitDetailsController, { Props } from "./UnitDetailsController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BlueAssetsIcon,
  BlueCalenderIcon,
  BlueCityIcon,
  BlueComplexIcon,
  BlueConfigIcon,
  BlueCountryIcon,
  BlueFloorIcon,
  BluePriceIcon,
  BlueRegionIcon,
  BlueRentIcon,
  BlueSizeIcon,
  BlueStatusIcon,
  BlueTenantIcon,
  BlueUnitIcon,
  BlueValuationIcon,
  BuildingImage,
  DeleteRentIcon,
  DeleteUnitIcon,
  EditIcon,
} from "./assets";
//@ts-ignore
import Slider from "react-slick";
import moment from "moment";
const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

class UnitDetails extends UnitDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.tenantDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/MyUnitList">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Unit")}</span>
                  </div>
                  <div className="right-icon">
                    <img src={DeleteRentIcon} alt="" onClick={() => this.handleDeleteUnitModal()} />
                    <Link href={`/MyUnitDetails/Edit/${this.state.unitId}`}>
                      <img src={EditIcon} alt="" />
                    </Link>
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="detail">
                      <Box className="header">
                        <h4>{t("Location Details")}</h4>
                        <Link
                          href={`https://maps.google.com/?q=${this.state.unitDetails.lat},${
                            this.state.unitDetails.long
                          }`}
                          target="_blank"
                        >
                          <span>{t("See building on map")}</span>
                        </Link>
                      </Box>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCountryIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Country")}</span>
                                <p>{this.state.unitDetails.country || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueRegionIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Region")}</span>
                                <p>{this.state.unitDetails.region || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCityIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("City")}</span>
                                <p>{this.state.unitDetails.city || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="detail">
                      <h4>{t("Unit Details")}</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueComplexIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Complex Name")}</span>
                                <p>{this.state.unitDetails.complex || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueAssetsIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Building Name")}</span>
                                <p>{this.state.unitDetails.building || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueUnitIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Unit Number")}</span>
                                <p>{this.state.unitDetails.unit || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueFloorIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Floor Number")}</span>
                                <p>{this.state.unitDetails.floor || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueSizeIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Size")}</span>
                                <p>{this.state.unitDetails.size || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueConfigIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Configuration")}</span>
                                <p>{this.state.unitDetails.config || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BluePriceIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Purchase Price")}</span>
                                <p>{this.state.unitDetails.purchasePrice || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Purchase Date")}</span>
                                <p>
                                  {this.state.unitDetails.purchaseDate
                                    ? moment(this.state.unitDetails.purchaseDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
                                    : "-"}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueValuationIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Current Valuation")}</span>
                                <p>{this.state.unitDetails.valuation || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="detail">
                      <h4>{t("Rent Status")}</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueStatusIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Unit Status")}</span>
                                <p>
                                  {this.state.rentDetails.status === "No-Own"
                                    ? "Not Owned"
                                    : this.state.rentDetails.status}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                          {this.state.rentDetails.status === "Rented" && (
                            <>
                              <Grid item xs={6}>
                                <Box className="info-item">
                                  <img src={BlueTenantIcon} alt="" />
                                  <Box className="item-data">
                                    <span>{t("Tenant Name")}</span>
                                    <p>{this.state.rentDetails.tenantName || "-"}</p>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="info-item">
                                  <img src={BlueCalenderIcon} alt="" />
                                  <Box className="item-data">
                                    <span>{t("Rent Duration")}</span>
                                    <p>
                                      {this.state.rentDetails.startDate && this.state.rentDetails.endDate
                                        ? moment(this.state.rentDetails.endDate).diff(
                                            moment(this.state.rentDetails.startDate),
                                            "months"
                                          )
                                        : ""}{" "}
                                      Months
                                    </p>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="info-item">
                                  <img src={BlueCalenderIcon} alt="" />
                                  <Box className="item-data">
                                    <span>{t("Current Expiry")}</span>
                                    <p>
                                      {this.state.rentDetails.endDate
                                        ? moment(this.state.rentDetails.endDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
                                        : "-"}
                                    </p>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="info-item">
                                  <img src={BlueRentIcon} alt="" />
                                  <Box className="item-data">
                                    <span>{t("Rent Charge")}</span>
                                    <p>{this.state.rentDetails.charge || "-"} / Month</p>
                                  </Box>
                                </Box>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="rent-history-box">
                      <Box className="header">
                        <h4>{t("Rent History")}</h4>
                        {this.state.rentHistory.length !== 0 && (
                          <span
                            onClick={() => this.props.navigation.navigate("RentHistory", { id: this.state.unitId })}
                          >
                            {t("View All")}
                          </span>
                        )}
                      </Box>
                      {this.state.rentHistory.length === 0 && (
                        <Box className="rent-history">{t("No history available")}</Box>
                      )}
                      {this.state.rentHistory.map((history: any) => {
                        return (
                          <Box className="rent-history" key={history.id}>
                            <h4>{history.attributes.tenant_name || "-"}</h4>
                            <p className="date">
                              {moment(history.attributes.start_date, "YYYY-MM-DD").format("MMMM YYYY") +
                                " to " +
                                moment(history.attributes.end_date, "YYYY-MM-DD").format("MMMM YYYY")}
                            </p>
                            <Divider />
                            <Box className="info">
                              <p>{t("Rent Amount")}</p>
                              <span>{history.attributes.rent_amount || "-"}</span>
                            </Box>
                            <Box className="info">
                              <p>{t("Received Amount")}</p>
                              <span>{history.attributes.received_amount || "-"}</span>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>

                    <Box className="images-box">
                      <h4>{t("Unit Pictures")}</h4>
                      <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                        {this.state.unitDetails.photos.length === 0 && <div>{t("No photos available")}</div>}
                        {this.state.unitDetails.photos.map((image: any) => {
                          return (
                            <div>
                              <img src={BuildingImage.default} alt="" />
                            </div>
                          );
                        })}
                      </Slider>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteUnitModal()}
          open={this.state.isDeleteUnitModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteUnitIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Delete added unit")}?</Typography>
              <Typography variant="body1">
                {t(
                  "Are you sure want to delete added unit details from this app? once deleted you won't be able to view deleted unit again."
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  onClick={() => {
                    this.setState({ loading: true }, () => {
                      this.handleDeleteUnitModal();
                      this.deLinkUnitFromOwner();
                    });
                  }}
                >
                  {t("Yes, Delete")}
                </Button>
                <Button onClick={() => this.handleDeleteUnitModal()}>{t("No, Don’t Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(MyUnitStyle)(UnitDetails));
