import React from "react";
import { withTranslation } from "react-i18next";
import TenantProfileController, { Props } from "./TenantProfileController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import { Avatar, Box, Container, Grid, IconButton, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, ChatIcon, EmailIcon, FBIcon, PhoneIcon, TwitterIcon } from "./assets";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class TenantProfile extends TenantProfileController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#FFFFFF", height: "100vh", overflowY: "hidden" }} className={classes.tenantProfile}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    {/* <Link href="/MyUnitList"> */}
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    {/* </Link> */}
                    <span>{t("Tenant Profile")}</span>
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="profile-top-box">
                      <Avatar src="" />
                      <h4>Name</h4>
                      <Box className="profile-info-box">
                        <img src={ChatIcon} alt="chat" />
                        <div />
                        <img src={PhoneIcon} alt="phone" />
                        <div />
                        <img src={EmailIcon} alt="email" />
                      </Box>
                      <Box className="profile-add-info-box">
                        <p>
                          <span>Gender:</span> Male
                        </p>
                        <p>
                          <span>DOB:</span> 03/06/2020
                        </p>
                      </Box>
                    </Box>

                    <Box className="profile-bottom-box">
                      <Box className="profile-item">
                        <h4>Bio</h4>
                        <p>
                          Hello! I am Jaroslav Brabec living with my family in central park since 2015. I am business
                          analyst by profession. It would be nice to get in touch with you.
                        </p>
                      </Box>
                      <Box className="profile-item">
                        <h4>Hobbies</h4>
                        <Box className="profile-hobby-box">
                          <span>Cooking</span>
                          <span>Gardening</span>
                        </Box>
                      </Box>
                      <Box className="profile-item">
                        <h4>Follow me on:</h4>
                        <Box className="profile-social-box">
                          <img src={FBIcon} alt="fb" />
                          <img src={TwitterIcon} alt="twitter" />
                        </Box>
                      </Box>
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

export default withTranslation()(withStyles(MyUnitStyle)(TenantProfile));
