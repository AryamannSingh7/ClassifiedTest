//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Link,
  Typography,
  Grid
} from "@material-ui/core";

//resorces
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 ,globalIcon} from "../src/assets";

//resources
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Lock_Icon } from "../src/assets";
import { withRouter } from 'react-router';
import { Formik } from "formik";
import Loader from "../../../components/src/Loader.web";
import * as Yup from "yup";
import { Menu } from "@szhsin/react-menu";
import MenuItem from '@material-ui/core/MenuItem';
import "@szhsin/react-menu/dist/core.css";

// Customizable Area End

import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";

class ChairmanChangeSuccessfully extends ChairmanForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
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
        {/* <Box className="login-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <div></div>
          <Box className="header-block">
            <img src={Lock_Icon} className="tenant-logo" alt="Lock_Icon" />
            <h1>Password Changed<br></br>Successfully!</h1>
            <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
          </Box>
          <Box className="row-btn customButton">
            <Button variant="contained" onClick={() => {
                    localStorage.removeItem("otpToken");
                    localStorage.removeItem("emailOtp");
                    this.props.history.push("/EmailAccountLogin");
                  }}>login</Button>
          </Box>
        </Box> */}
        <Box className="login-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding common-logo-block" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                  <Box  >
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
                    <h1>Password Changed<br></br>Successfully!</h1>
                    <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
                  </Box>
                  <Box className="row-btn customButton">
                    <Button variant="contained" onClick={() => {
                      localStorage.removeItem("otpToken");
                      localStorage.removeItem("emailOtp");
                      this.props.history.push("/ChairmanLogin");
                    }}>login</Button>
                  </Box>
                </Box>
                {/* mobile footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                  <Link href="#" className="link">Don't have an account ? </Link>
                  <Link href="#" className="link"> <span> register</span></Link>
                </Box> */}
                {/* desktop footer block */}
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
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
export default withRouter(ChairmanChangeSuccessfully);
