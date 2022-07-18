//@ts-ignore
//@ts-nocheck
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import * as Yup from "yup";
// Customizable Area End

//components
import {
  Box,
  Button,
  Typography,
  Link,
  Grid
} from "@material-ui/core";

//resources
import LockIcon from '@material-ui/icons/LockOpen';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import Loader from "../../../components/src/Loader.web";
//resorces
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";

class ChairmanChangePassword extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
  }

  render() {
    return (
      <>
        {/* <Box className="login-wrapper auth-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-left-block header-block">
            <h1>Change Password</h1>
            <h6>"You need to change your password. Please enter a new password"</h6>
          </Box>
          <Formik
            initialValues={{
              confirmPassword: "",
              confirmShowPassword: false,
              newShowPassword: false,
              newPassword: ""
            }}
            validationSchema={this.changePasswordValidations()}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log("valus=========>", values)
              this.changePassword(values)
              // same shape as initial values  
            }}
          >
            {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
              <Form translate="yes" className="commonForm">
                <Box className="formGroup">
                  <div className="formInputGrp">
                    <Field type={values.newShowPassword ? "text" : "password"} name="newPassword" placeholder="New Password" className="formInput" />
                    <span className="frmLeftIcons"><MailOutlineIcon /></span>
                    {
                      values.newShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("newShowPassword", false)} /></span>
                        : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("newShowPassword", true)} /></span>
                    }
                    <span className="frmrightIcons"><VisibilityOffIcon /></span> 
                  </div>
                  <ErrorMessage className="text-error" component="Typography" name="newPassword" />
                </Box>
                <Box className="formGroup">
                  <div className="formInputGrp">
                    <Field type={values.confirmShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="formInput" />
                    <span className="frmLeftIcons"><MailOutlineIcon /></span>
                    {
                      values.confirmShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("confirmShowPassword", false)} /></span>
                        : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("confirmShowPassword", true)} /></span>
                    }
                    <span className="frmrightIcons"><VisibilityOffIcon /></span>
                  </div>
                  <ErrorMessage className="text-error" component="Typography" name="confirmPassword" />
                </Box>
                <Box className="customButton">
                  <Button variant="contained" type="submit" >change password</Button>
                </Box>
              </Form>
            )}
          </Formik>

        </Box> */}

        <Box className="login-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box display={{ xs: 'flex', md: 'none' }} className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <img src={Building_Logo} className="head-logo" alt="" />
                  <h4>Building Name</h4>
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
                    <h1>Change Password</h1>
                    <h6>You need to change your password.<br></br>Please enter a new password"</h6>
                  </Box>
                  <Formik
                    initialValues={{
                      confirmPassword: "",
                      confirmShowPassword: false,
                      newShowPassword: false,
                      newPassword: ""
                    }}
                    validationSchema={this.changePasswordValidations()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      this.changePassword(values)
                      // same shape as initial values  
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <Box className="formGroup">
                          <div className="formInputGrp">
                            <Field type={values.newShowPassword ? "text" : "password"} name="newPassword" placeholder="New Password" className="formInput" />
                            <span className="frmLeftIcons"><LockIcon /></span>
                            {
                              values.newShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("newShowPassword", false)} /></span>
                                : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("newShowPassword", true)} /></span>
                            }
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="newPassword" />
                        </Box>
                        <Box className="formGroup">
                          <div className="formInputGrp">
                            <Field type={values.confirmShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="formInput" />
                            <span className="frmLeftIcons"><LockIcon /></span>
                            {
                              values.confirmShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("confirmShowPassword", false)} /></span>
                                : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("confirmShowPassword", true)} /></span>
                            }
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="confirmPassword" />
                        </Box>
                        <Box className="customButton row-btn">
                          <Button variant="contained" type="submit" >change password</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>

                </Box>
                {/* mobile footer block */}
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                  <Link href="#" className="link">Don't have an account ? </Link>
                  <Link href="#" className="link"> <span> register</span></Link>
                </Box>
                {/* desktop footer block */}
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(ChairmanChangePassword);