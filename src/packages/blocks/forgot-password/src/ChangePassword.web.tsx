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
  Link,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Loader from "../../../components/src/Loader.web";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
//images
import {
  Tenant_Logo, Building_Logo, Lock_User_Icon, Building1
} from "../src/assets";

class ChangePassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
  }

  render() {
    return (
      <>

        <Box className="login-wrapper auth-wrapper" style={{backgroundColor:"white"}}>
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
                <Box className="main-content-block desktop-ui inputPlaceholderRegistration">
                  <Box className="header-block" style={{paddingTop:"40px",paddingBottom:"10px"}}>
                    {/* <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo} className="tenant-logo" alt="" />
                      </Link>
                    </Box> */}
                    <h1 className="bold-text" style={{fontSize:"26px"}}>Change Password</h1>
                    <h6 style={{fontSize:"15px"}}>You need to change your password. Please enter a new password</h6>
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
                          <div className="formInputGrp" style={{border:'0.1px solid rgb(209 209 209 / 100%)',borderRadius:25}}>
                            <Field type={values.newShowPassword ? "text" : "password"} name="newPassword" placeholder="New Password" className="formInput" />
                            <span className="frmLeftIcons">
                              <img src={Lock_User_Icon} className="frm-icons" alt="Lock Icon" />
                            </span>
                            {
                              values.newShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("newShowPassword", false)} /></span>
                                : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("newShowPassword", true)} /></span>
                            }
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="newPassword" />
                        </Box>
                        <Box className="formGroup">
                          <div className="formInputGrp" style={{border:'0.1px solid rgb(209 209 209 / 100%)',borderRadius:25}}>
                            <Field type={values.confirmShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="formInput" />
                            <span className="frmLeftIcons">
                              <img src={Lock_User_Icon} className="frm-icons" alt="Lock Icon" />
                            </span>
                            {
                              values.confirmShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("confirmShowPassword", false)} /></span>
                                : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("confirmShowPassword", true)} /></span>
                            }
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="confirmPassword" />
                        </Box>
                        <Box className="customButton" style={{marginTop:"60px"}}>
                          <Button variant="contained" type="submit" >change password</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>

                  {/* mobile footer block */}
                  {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                    <Link href="#" className="link">Don't have an account ? </Link>
                    <Link href="#" className="link"> <span> register</span></Link>
                  </Box> */}
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
export default withRouter(ChangePassword);
