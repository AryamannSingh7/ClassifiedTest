import React from "react";
import { withTranslation } from "react-i18next";
import UnitDetailsController, { Props } from "./UnitDetailsController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import { Box, Card, Container, Divider, Grid, IconButton, Link, withStyles } from "@material-ui/core";
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
  EditIcon,
} from "./assets";
//@ts-ignore
import Slider from "react-slick";
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

  async componentDidMount(): Promise<void> {}

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
                    <img src={DeleteRentIcon} alt="" />
                    <img src={EditIcon} alt="" />
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="detail">
                      <Box className="header">
                        <h4>{t("Location Details")}</h4>
                        <span>{t("See building on map")}</span>
                      </Box>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCountryIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Country")}</span>
                                <p>UAE</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueRegionIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Region")}</span>
                                <p>Eastern</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCityIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("City")}</span>
                                <p>Eastern</p>
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
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueAssetsIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Building Name")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueUnitIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Unit Number")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueFloorIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Floor Number")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueSizeIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Size")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueConfigIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Configuration")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BluePriceIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Purchase Price")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Purchase Date")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueValuationIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Current Valuation")}</span>
                                <p>Lorem Ipsum</p>
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
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueTenantIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Tenant Name")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Rent Duration")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueCalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Current Expiry")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BlueRentIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Rent Charge")}</span>
                                <p>Lorem Ipsum</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="rent-history-box">
                      <Box className="header">
                        <h4>{t("Rent History")}</h4>
                        <span>{t("View All")}</span>
                      </Box>

                      <Box className="rent-history">
                        <h4>Mr. Mohd Khan</h4>
                        <p className="date">Tenant Name</p>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                      <Box className="rent-history">
                        <h4>Mr. Mohd Khan</h4>
                        <p className="date">Tenant Name</p>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                    </Box>

                    <Box className="images-box">
                      <h4>{t("Unit Pictures")}</h4>
                      <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                        {/* {this.state.complexData.photos.length === 0 && <div>{t("No photos available")}</div>} */}
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingImage.default} alt="" />
                        </div>
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
      </>
    );
  }
}

export default withTranslation()(withStyles(MyUnitStyle)(UnitDetails));
