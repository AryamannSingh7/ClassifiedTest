// @ts-ignore
// @ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web.tsx";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter } from 'react-router';
import OtpInput from 'react-otp-input';
import { Building1 } from "./assets";




class VerofyOTP extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>
<div style={{margin:'auto'}}>

        <Grid container className="main-content-block">
          <Grid xs={12}>
                <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700}}>
             Enter OTP Code

            </p>
          </Grid>
        </Grid>
        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left" style={{ marginBottom: '1.5rem' }}>
              Please enter the code sent to the mail address

              <span style={{ color: '#DD946A' }}>
                {this.state.email}
              </span>

            </p>
          </Grid>
        </Grid>
            <Grid container className="main-content-block">
          <Grid xs={12} style={{display:'flex'}} justifyContent="center">
            <Box className="commonForm">
              <Box className="formGroup otpBlock">
                <OtpInput className="formOutlineInput"
                  value={"111111"}
                  onChange={this.handleChangeOTP}
                  numInputs={6}
                // separator={<span>-</span>}
                />
              </Box>
              <Box className="customButton row-btn"  >
                <Button variant="contained" onClick={() => this.verifyOtp()}>SEND</Button>
              </Box>
              <Box className="passwordRow">
                {/* <Link href="#" className="link"> <span>RESEND OTP</span></Link> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
</div>


            </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1} className="building-logo" alt="" />
            </Box>
          </Grid>
            </Grid>

      </>

    )

  }

}
export default withRouter(VerofyOTP)
