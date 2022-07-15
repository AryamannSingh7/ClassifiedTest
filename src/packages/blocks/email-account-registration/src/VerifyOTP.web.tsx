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
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter } from 'react-router';
import OtpInput from 'react-otp-input';




class VerofyOTP extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700,marginTop:'2.5rem' }}>
             Enter OTP Code

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ marginBottom: '1.5rem' }}>
              Please enter the code sent to the mail address

              <span style={{ color: '#DD946A' }}>
                {this.state.email}
              </span>

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{display:'flex'}} justifyContent="center">
            <Box className="commonForm">
              <Box className="formGroup otpBlock">
                <OtpInput className="formOutlineInput"
                  value={"111111"}
                  onChange={this.handleChange}
                  numInputs={6}
                // separator={<span>-</span>}
                />
              </Box>
              <Box className="customButton row-btn" style={{ margin: '1rem', width: '90%', position: 'absolute', bottom: 0,left:0 }} >
                <Button variant="contained" onClick={() => this.props.history.push('/selecttype')}>SEND</Button>
              </Box>
              <Box className="passwordRow">
                {/* <Link href="#" className="link"> <span>RESEND OTP</span></Link> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Grid container style={{ margin: '1rem', width: '90%', position: 'absolute', bottom: 0 }}>
  <Grid xs={12}>
            <Button
              onClick={() => this.props.history.push('/selecttype')}
            fullWidth={true}
              className={'btn'}
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#2B6FEC",
                borderRadius: 16,
                height: 54,
                marginBottom: 14,
                boxShadow: "none",
                color: "#F7F7FC",
                fontWeight: 600,
                fontSize: 16,
                marginTop: 30
              }}
            >
              Next
            </Button>

            <Box
              display="flex"
              mt="25px"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography
                style={{
                  color: "#A0A3BD",
                  fontWeight: "normal",
                  fontSize: 12,
                  textAlign: "center"
                }}
              >
                Resend OTP in 0:30 Seconds
              </Typography>
              <Typography
                style={{
                  fontSize: 14,
                  color: "#2B6FEC",
                  fontWeight: 500,
                  marginLeft: 5,
                  textTransform: "uppercase"
                }}
              >
                Resend
              </Typography>
            </Box>

  </Grid>
</Grid> */}
      </>

    )

  }

}
export default withRouter(VerofyOTP)
