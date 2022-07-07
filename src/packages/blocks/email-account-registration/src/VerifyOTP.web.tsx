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



export default class VerofyOTP extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
        <Grid container>
          <Grid xs={12}>
            <ArrowBackIcon />
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
             Enter OTP Code

            </p>
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12}>
            <p className="text-center">
              PLease enter the code sent to the mail address

              <span style={{ color: '#DD946A' }}>
                jo******52@gmail.com
              </span>

            </p>
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12}>
            <div className="otp-input-wrapper">
              <input type="text" max="4" pattern="[0-9]*" />
                <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="0" x2="240" y2="0" stroke="#3e3e3e" stroke-width="2" stroke-dasharray="44,22" />
                </svg>
            </div>
          </Grid>
        </Grid>
<Grid container>
  <Grid xs={12}>
            <Button
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
                fontFamily: "Poppins",
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
                  fontFamily: "Poppins",
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
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  marginLeft: 5,
                  textTransform: "uppercase"
                }}
              >
                Resend
              </Typography>
            </Box>

  </Grid>
</Grid>
      </>

    )

  }

}
