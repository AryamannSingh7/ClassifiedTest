import React from "react";
import { withTranslation } from "react-i18next";
import TenantProfileController, { Props } from "./TenantProfileController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import { Avatar, Box, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  ChatIcon,
  DarkChatIcon,
  DarkFBIcon,
  DarkTwitterIcon,
  EmailIcon,
  FBIcon,
  PhoneIcon,
  TwitterIcon,
} from "./assets";
import moment from "moment";
import OwnerSidebarImage from "../../../components/src/OwnerSidebarImage.web";

class TenantProfile extends TenantProfileController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#FFFFFF", height: "100vh", overflowY: "hidden" }} className={classes.tenantProfile}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton
                      onClick={() => this.props.navigation.navigate("MyUnitDetails", { id: this.state.unitId })}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Tenant Profile")}</span>
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="profile-top-box">
                      <Avatar src={this.state.profileData.image} />
                      <h4>{this.validationText(this.state.profileData.name)}</h4>
                      <Box className="profile-info-box">
                        {this.state.profileData.isDisableChat ? (
                          <img src={DarkChatIcon} alt="chat" />
                        ) : (
                          <img src={ChatIcon} alt="chat" />
                        )}
                        <div />
                        <Link href={`tel:${this.state.profileData.phone}`}>
                          <img src={PhoneIcon} alt="phone" />
                        </Link>
                        <div />
                        <Link href={`mailto:${this.state.profileData.email}`}>
                          <img src={EmailIcon} alt="email" />
                        </Link>
                      </Box>
                      <Box className="profile-add-info-box">
                        <p>
                          <span>{t("Gender")}:</span> {this.validationText(this.state.profileData.gender)}
                        </p>
                        <p>
                          <span>{t("DOB")}:</span>{" "}
                          {this.state.profileData.dob
                            ? moment(this.state.profileData.dob, "MMM-DD-YYYY").format("MMMM DD, YYYY")
                            : ""}
                        </p>
                      </Box>
                    </Box>

                    <Box className="profile-bottom-box">
                      <Box className="profile-item">
                        <h4>{t("Bio")}</h4>
                        <p>{this.validationText(this.state.profileData.bio)}</p>
                      </Box>
                      <Box className="profile-item">
                        <h4>{t("Hobbies")}</h4>
                        <Box className="profile-hobby-box">
                          {this.state.profileData.hobbies.length === 0 && <p>{t("No hobby available")}</p>}
                          {this.state.profileData.hobbies.map((hobby: any, index: number) => {
                            return <span key={index}>{hobby}</span>;
                          })}
                        </Box>
                      </Box>
                      <Box className="profile-item">
                        <h4>{t("Follow me on")}:</h4>
                        <Box className="profile-social-box">
                          {this.state.profileData.social.length > 0 &&
                          this.state.profileData.social[2].publilc_access ? (
                            <Link href={this.state.profileData.social[2].fb_link} target="_blank">
                              <img src={FBIcon} alt="fb" />
                            </Link>
                          ) : (
                            <img src={DarkFBIcon} alt="fb" />
                          )}
                          {this.state.profileData.social.length > 0 &&
                          this.state.profileData.social[0].publilc_access ? (
                            <Link href={this.state.profileData.social[0].twitter_link} target="_blank">
                              <img src={TwitterIcon} alt="fb" />
                            </Link>
                          ) : (
                            <img src={DarkTwitterIcon} alt="fb" />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <OwnerSidebarImage />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(MyUnitStyle)(TenantProfile));
