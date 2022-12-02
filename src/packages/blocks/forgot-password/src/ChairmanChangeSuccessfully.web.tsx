import React from "react";
import { Box, Button, Link, Grid } from "@material-ui/core";
import { Tenant_Logo, Building_Logo, Building1, globalIcon } from "../src/assets";
import { Lock_Icon } from "../src/assets";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { Menu } from "@szhsin/react-menu";
import MenuItem from "@material-ui/core/MenuItem";
import "@szhsin/react-menu/dist/core.css";
import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import i18next from "i18next";

class ChairmanChangeSuccessfully extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
  }

  handleEngLngChange = () => {
    localStorage.setItem("language", "en");
    i18next.changeLanguage("en");
  };

  handleAreLngChange = () => {
    localStorage.setItem("language", "ar");
    i18next.changeLanguage("ar");
  };

  render() {
    return (
      <>
        <Box className="login-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding common-logo-block" display={{ xs: "none", md: "flex" }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                  <Box>
                    <Menu
                      className="chairman-lang-menu chairman-menu"
                      arrow={true}
                      align="center"
                      menuButton={<img src={globalIcon} alt="GlobalIcon" />}
                    >
                      <MenuItem
                        className={localStorage.getItem("language") === "en" ? "active" : ""}
                        onClick={() => this.handleEngLngChange()}
                      >
                        English
                      </MenuItem>
                      <MenuItem
                        className={localStorage.getItem("language") === "ar" ? "active" : ""}
                        onClick={() => this.handleAreLngChange()}
                      >
                        Arabic
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
                <Box className="main-content-block desktop-ui">
                  <Box className="header-block chairmanHeaderBlock">
                    <img src={Lock_Icon} className="lock-logo" alt="Lock_Icon" />
                    <h1>
                      Password Changed
                      <br />
                      Successfully!
                    </h1>
                    <h6>
                      You have successfully changed your
                      <br />
                      password. Please use your new password when
                      <br />
                      logging in.
                    </h6>
                  </Box>
                  <Box className="row-btn customButton">
                    <Button
                      variant="contained"
                      onClick={() => {
                        localStorage.removeItem("otpToken");
                        localStorage.removeItem("emailOtp");
                        //@ts-ignore
                        this.props.history.push("/ChairmanLogin");
                      }}
                    >
                      login
                    </Button>
                  </Box>
                </Box>
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: "none", md: "flex" }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
//@ts-ignore
export default withRouter(ChairmanChangeSuccessfully);
