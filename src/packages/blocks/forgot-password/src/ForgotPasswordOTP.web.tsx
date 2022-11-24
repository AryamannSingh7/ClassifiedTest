//@ts-ignore
//@ts-nocheck
import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";
import Loader from "../../../components/src/Loader.web";

//images
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
import OtpInput from 'react-otp-input';


class ForgotPasswordOTP extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const emailMask = localStorage.getItem("emailMask")
    const phoneNumber = localStorage.getItem("phoneNumberMask")
    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block desktop-ui">
                  <Box className="header-block">
                    {/* <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo} className="tenant-logo" alt="" />
                      </Link>
                    </Box> */}
                    <h1>Enter OTP Code</h1>
                    {
                      emailMask ? (<>
                        <h6>Please enter the code send to the email<br></br>address <span className="text">{emailMask}</span></h6>
                      </>
                      )
                        : <>
                          <h6>Please enter the code send to the phone<br></br>number <span className="text">{phoneNumber}</span></h6>
                        </>
                    }
                  </Box>
                  <Box className="commonForm">
                    <Box className="formGroup otpBlock">
                      <OtpInput className="formOutlineInput"
                        value={"111111"}
                        onChange={this.handleChange}
                        numInputs={6}
                      // separator={<span>-</span>}
                      />
                    </Box>
                    <Box className="customButton row-btn">
                      <Button variant="contained" onClick={() => { this.verifyOtp() }}>SEND</Button>
                    </Box>
                    <Box className="passwordRow">
                      <Link href="#" className="link"> <span>RESEND OTP</span></Link>
                    </Box>
                  </Box>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box> */}
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
export default withRouter(ForgotPasswordOTP)
