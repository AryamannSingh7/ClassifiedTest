import React from "react";
import { Container, withStyles, Card, IconButton, Link } from "@material-ui/core";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import OwnerComplexController, { Props } from "./OwnerComplexController.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
//@ts-ignore
import Slider from "react-slick";
import { Document, BuildingLogo, ManagementChat, ManagementPhone, ManagementEmail } from "./assets";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";

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

class OwnerComplex extends OwnerComplexController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.complexDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.handleGotoDashboard()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>Building Info & Rules</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="details-box">
                    <Box className="heading-box">
                      <Box className="heading-top">
                        <img src={this.state.complexData.logo} alt="" />
                        <h4>{this.state.complexData.complexName || "-"}</h4>
                      </Box>
                      <Box className="heading-bottom">
                        <Box className="heading">
                          <h4>About</h4>
                          <Link
                            href={`https://maps.google.com/?q=${this.state.complexData.lat},${
                              this.state.complexData.long
                            }`}
                            target="_blank"
                          >
                            <span>See complex on map</span>
                          </Link>
                        </Box>
                        <p>{this.state.complexData.aboutUs || "-"}</p>
                        <Grid container>
                          <Grid item xs={6} className="info-item">
                            <span>Complex Area</span>
                            <p>{this.state.complexData.complexArea || "-"}</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>Total Buildings</span>
                            <p>{this.state.complexData.totalBuilding || 0} Buildings</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>Total Units</span>
                            <p>{this.state.complexData.totalUnits || 0} Units</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>City</span>
                            <p>{this.state.complexData.city || "-"}</p>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>

                    <Box className="building-box">
                      <h4>Buildings</h4>
                      <Grid container spacing={2}>
                        {this.state.complexData.buildingList.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="building-card">No building available</Card>
                          </Grid>
                        )}
                        {this.state.complexData.buildingList.map((building: any) => {
                          return (
                            <Grid item xs={6} key={building.building_management_id}>
                              <Link href={`/BuildingDetails/${building.building_management_id}`}>
                                <Card className="building-card">{building.building_name}</Card>
                              </Link>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>

                    <Box className="images-box">
                      <h4>Photos</h4>
                      <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                        {this.state.complexData.photos.length === 0 && <div>No photos available</div>}
                        {this.state.complexData.photos.map((photo: any, index: number) => {
                          return (
                            <div key={index}>
                              <img src={photo.url} alt="" />
                            </div>
                          );
                        })}
                      </Slider>
                    </Box>

                    <Box className="management-team">
                      <h4>Management Team</h4>
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
                      <h4>Documents</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Link href="/BuildingDocuments/Policy">
                            <Card className="document">
                              <img src={Document} alt="" />
                              <h6>Policy</h6>
                            </Card>
                          </Link>
                        </Grid>
                        <Grid item xs={12}>
                          <Link href="/BuildingDocuments/Resolutions">
                            <Card className="document">
                              <img src={Document} alt="" />
                              <h6>Resolution</h6>
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

export default withTranslation()(withStyles(BuildingApartmentStyle)(OwnerComplex));

// Customizable Area End
