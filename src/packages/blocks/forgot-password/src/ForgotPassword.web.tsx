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

//images
import { Tenant_Logo, Building_Logo, Lock_User_Icon, Building1,Email_Icon } from "../src/assets";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
import AlertErrorWeb from "../../../components/src/AlertError.web"
//Customizable Area End
import Loader from "../../../components/src/Loader.web";
class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

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
                  <Box className="header-block">
                    {/* <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo} className="tenant-logo" alt="" />
                      </Link>
                    </Box> */}
                    <h1 className="bold-text">Forgot Password</h1>
                    <h6>One Time Password(OTP) will be sent to the regestered email or mobile.</h6>
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
                          <label htmlFor="" className="textfieldLabel">Enter your regestered Email or Mobile Number</label>
                          <div className="formInputGrp" style={{border:'0.1px solid rgb(209 209 209 / 100%)',borderRadius:25}}>
                            <Field type="text" name="email" placeholder="Email ID or Mobile Number" className="formInput" />
                            <span className="frmLeftIcons">
                              <img src={Email_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                          </div>

                          {
                            errors.email && touched.email ?
                              (
                                <Typography className="text-error" style={{fontWeight:600}}>{errors.email} </Typography>
                              ) : null
                          }
                        </Box>
                        <Box className="customButton" style={{marginTop:"26px"}}>
                          <Button variant="contained" type="submit">next</Button>
                        </Box>

                      </Form>
                    )}
                  </Formik>
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
        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(ForgotPassword)
