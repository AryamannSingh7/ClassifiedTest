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
import { search } from "./assets";




class RegisterUnitManually extends EmailAccountRegistrationController {
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
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '2.5rem' }}>
              Register the Unit Manually

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ marginBottom: '1.5rem' }}>
              Please select the location of the building


              <span style={{ color: '#DD946A' }}>
                {this.state.email}
              </span>

            </p>
          </Grid>
        </Grid>

<Grid container>
  <Grid xs={12}>
            <Button style={{
              border: "none",
              height: "100%",
              width: "80%",
              color: "rgba(0, 0, 0, 0.6)",
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 16,
              marginRight: 10,
              marginLeft: 21,
              outline: "none"
}}>
      <img src={search}/>
      <span>
        Search Complex
      </span>
    </Button>

  </Grid>
</Grid>


        <Grid container style={{ margin: '1rem', width: '90%' }}>
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
                {/* Resend OTP in 0:30 Seconds */}
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
                {/* Resend */}
              </Typography>
            </Box>

          </Grid>
        </Grid>
      </>

    )

  }

}
export default withRouter(RegisterUnitManually)
