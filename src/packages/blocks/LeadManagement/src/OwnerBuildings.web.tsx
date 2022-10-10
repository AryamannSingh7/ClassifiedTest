import React from "react";
import { Container, withStyles, Grid, Card, IconButton, Link } from "@material-ui/core";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
import OwnerBuildingsController, { Props } from "./OwnerBuildingsController.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
import { Document, BuildingLogo, ManagementChat, ManagementPhone, ManagementEmail } from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
//@ts-ignore
import Slider from "react-slick";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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

class OwnerBuildings extends OwnerBuildingsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.complexDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/ComplexDetails">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Building Info & Rules")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="details-box">
                    <Box className="heading-box">
                      <Box className="heading-top">
                        <img src={this.state.buildingData.logo} alt="" />
                        <h4>{this.state.buildingData.buildingName || "-"}</h4>
                      </Box>
                      <Box className="heading-bottom">
                        <Box className="heading">
                          <h4>{t("About")}</h4>
                          <Link
                            href={`https://maps.google.com/?q=${this.state.buildingData.lat},${
                              this.state.buildingData.long
                            }`}
                            target="_blank"
                          >
                            <span>{t("See building on map")}</span>
                          </Link>
                        </Box>
                        <p>{this.state.buildingData.aboutBuilding || "-"}</p>
                        <Grid container>
                          <Grid item xs={6} className="info-item">
                            <span>{t("Building Area")}</span>
                            <p>{this.state.buildingData.buildingArea || "-"}</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>{t("Total Floor")}</span>
                            <p>{this.state.buildingData.totalFloor || 0}</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>{t("Total Units")}</span>
                            <p>{this.state.buildingData.totalUnit || 0} {t("Units")}</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>{t("City")}</span>
                            <p>{this.state.buildingData.city || "-"}</p>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>

                    <Box className="images-box">
                      <h4>{t("Photos")}</h4>
                      <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                        {this.state.buildingData.photos.length === 0 && <div>{t("No photos available")}</div>}
                        {this.state.buildingData.photos.map((photo: any, index: number) => {
                          return (
                            <div key={index}>
                              <img src={photo.url} alt="" />
                            </div>
                          );
                        })}
                      </Slider>
                    </Box>

                    <Box className="management-team">
                      <h4>{t("Management Team")}</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="team-member-box">Coming soon</Card>
                        </Grid>
                        {/* <Grid item xs={6}>
                          <Card className="team-member-box">
                            <img src={BuildingLogo.default} alt="" />
                            <h4>Ali Khan</h4>
                            <p>Manager</p>
                            <Box className="icons">
                              <img src={ManagementChat} alt="" />
                              <div />
                              <img src={ManagementPhone} alt="" />
                              <div />
                              <img src={ManagementEmail} alt="" />
                            </Box>
                          </Card>
                        </Grid> */}
                      </Grid>
                    </Box>

                    <Box className="document-boxes">
                      <h4>{t("Documents")}</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Link href="/BuildingDocuments/Policy">
                            <Card className="document">
                              <img src={Document} alt="" />
                              <h6>{t("Policy")}</h6>
                            </Card>
                          </Link>
                        </Grid>
                        <Grid item xs={12}>
                          <Link href="/BuildingDocuments/Resolutions">
                            <Card className="document">
                              <img src={Document} alt="" />
                              <h6>{t("Resolution")}</h6>
                            </Card>
                          </Link>
                        </Grid>
                      </Grid>
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

export default withTranslation()(withStyles(BuildingApartmentStyle)(OwnerBuildings));

// Customizable Area End
