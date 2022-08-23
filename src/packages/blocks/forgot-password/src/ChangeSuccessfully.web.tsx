//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

//images
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
//resources
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Lock_Icon } from "../src/assets";
import { withRouter } from 'react-router';
import { Formik } from "formik";
import * as Yup from "yup";
// Customizable Area End
import Loader from "../../../components/src/Loader.web";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";

class ChangeSuccessfully extends ForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
  }

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
        <Box className="login-wrapper auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block change-password-mainblock">
                  <Box className="header-block header-block-changepassword">
                    {/* <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo} className="tenant-logo" alt="" />
                      </Link>
                    </Box> */}
                    <img src={Lock_Icon} className="lock-logo" alt="Lock_Icon" />
                    <h1>Password Changed<br></br>Successfully!</h1>
                    <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
                  </Box>
                </Box>
                <Box className="footer-block desktop-ui">
                  <Box className="row-btn customButton">
                    <Button variant="contained" onClick={() => {
                      localStorage.removeItem("otpToken");
                      localStorage.removeItem("emailOtp");
                      this.props.history.push("/EmailAccountLogin");
                    }}>login</Button>
                  </Box>
                </Box>
                {/* desktop footer block */}
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(ChangeSuccessfully);
