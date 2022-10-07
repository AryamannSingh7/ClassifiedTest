import React from "react";
import { Container, withStyles, Card, IconButton } from "@material-ui/core";
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
                        <img src={BuildingLogo.default} alt="" />
                        <h4>Complex Name</h4>
                      </Box>
                      <Box className="heading-bottom">
                        <Box className="heading">
                          <h4>About</h4>
                          <span>See complex on map</span>
                        </Box>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ratione perspiciatis enim
                          laboriosam delectus inventore nihil doloremque id officiis eligendi. Nobis libero, eveniet
                          corporis blanditiis quibusdam temporibus saepe similique sequi.
                        </p>
                        <Grid container>
                          <Grid item xs={6} className="info-item">
                            <span>Complex Area</span>
                            <p>8000 sq. ft.</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>Total Buildings</span>
                            <p>8 Buildings</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>Total Units</span>
                            <p>80 Units</p>
                          </Grid>
                          <Grid item xs={6} className="info-item">
                            <span>City</span>
                            <p>London</p>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>

                    <Box className="building-box">
                      <h4>Buildings</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Card className="building-card">Building 1</Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="building-card">Building 1</Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="building-card">Building 1</Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="building-card">Building 1</Card>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box className="images-box">
                      <h4>Photos</h4>
                      <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                        <div>
                          <img src={BuildingLogo.default} alt="" />
                        </div>
                      </Slider>
                    </Box>

                    <Box className="management-team">
                      <h4>Management Team</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                      </Grid>
                    </Box>

                    <Box className="document-boxes">
                      <h4>Documents</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="document">
                            <img src={Document} alt="" />
                            <h6>Policy</h6>
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="document">
                            <img src={Document} alt="" />
                            <h6>Resolution</h6>
                          </Card>
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
