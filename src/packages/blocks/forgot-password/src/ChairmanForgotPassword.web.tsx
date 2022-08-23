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

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
//Customizable Area End

//resorces
import { Tenant_Logo, Building_Logo, Email_Icon, User_Icon, Lock_User_Icon, Building1 } from "../src/assets";

class ChairmanForgotPassword extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <>


        <Box className="login-wrapper  auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block desktop-ui">
                  {/* <Box className="header-block">
                    <Box display={{ xs: 'flex', md: 'none' }}>
                      <img src={Tenant_Logo} className="tenant-logo" alt="" />
                    </Box>
                    <h1>Welcome Back</h1>
                    <p>Login with your account credentials </p>
                  </Box> */}
                  <Box className="header-block">
                    <h1>Forgot Password</h1>
                    <h6>One Time Password(OTP) will be sent<br></br>to the regestered email.</h6>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={this.EmailSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      this.checkUser(values)
                      // same shape as initial values
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <Box className="formGroup">
                          {/* <label htmlFor="" className="textfieldLabel">Enter your regestered Email </label> */}
                          <div className="formInputGrp">
                            <Field type="text" name="email" placeholder="Email ID or Mobile Number" className="formInput" />
                            <span className="frmLeftIcons">
                              <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                          </div>

                          {
                            errors.email && touched.email ?
                              (
                                <Typography className="text-error">{errors.email} </Typography>
                              ) : null
                          }
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">next</Button>
                        </Box>
                        <Box className="passwordRow">
                          Back to
                          <Link href="ChairmanLogin" className="link"> <span> Login</span></Link>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* mobile footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                  <Link href="#" className="link">Don't have an account ? </Link>
                  <Link href="#" className="link"> <span> register</span></Link>
                </Box> */}
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
    )
  }
}

export default withRouter(ChairmanForgotPassword)
