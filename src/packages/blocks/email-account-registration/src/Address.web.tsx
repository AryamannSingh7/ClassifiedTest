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



export default class Address extends EmailAccountRegistrationController {
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
            <p className="text-left" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Select Building and Unit

            </p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12}>
            <p className="text-left">
              Please select the unit you would like to link with your account.If you have more than one Unit you can link the other ones later on.
            </p>
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12}>

          </Grid>
        </Grid>
      </>
    )
  }
}
