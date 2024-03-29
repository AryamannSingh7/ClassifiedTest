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

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";
//Customizable Area End

//resorces
import { Tenant_Logo, Building_Logo, Tick_Circle_Icon, Building1 } from "../src/assets";

class ClassifiedEditSuccessfully extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }

  render() {
   const { navigation } = this.props;
    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                {/* <Box className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box> */}
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                </Box>
                <Box className="main-content-block change-password-mainblock">
                  <Box className="header-block header-block-changepassword">
                    <img src={Tick_Circle_Icon} className="lock-logo" alt="Lock_Icon" />
                    <h1>Edit Request Sent<br></br>Successfully</h1>
                    <p>Your edit classified request has been sent to the building/complex manager successfully. You will get a notification once it is processed.</p> </Box>
                </Box>
                <Box className="footer-block desktop-ui">
                  <Box className="row-btn customButton">
                    <Button variant="contained" onClick={() => {
                      //@ts-ignore
                      this.props.history.push("/ClassifiedListing");
                    }}>Okay</Button>
                  </Box>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
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
    )
  }
}

export default withRouter(ClassifiedEditSuccessfully)
