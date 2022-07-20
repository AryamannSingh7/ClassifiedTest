//@ts-ignore
//@ts-nocheck
import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
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

import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import OtpInput from 'react-otp-input';
import Loader from "../../../components/src/Loader.web";
//resorces
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";

class ChairmanForgotPasswordOTP extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const  emailMask  = localStorage.getItem("emailMask")
    const phoneNumber = localStorage.getItem("phoneNumberMask")
    return (
      <>
        {/* <Box className="login-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-left-block header-block">
            <h1>Enter OTP Code</h1>
            <h6>Please enter the code send to the email address <span className="text">jo******52@gmail.com</span></h6>
          </Box>
          <Box className="commonForm">
            <Box className="formGroup otpBlock">
              <OtpInput className="formOutlineInput"
                value={"111111"}
                onChange={this.handleChange}
                numInputs={6}
              // separator={<span>-</span>}
              />
            </Box>
          </Box>
          <Box className="customButton row-btn">
            <Button variant="contained" onClick={() => { this.verifyOtp() }}>next</Button>
          </Box>

          {/* 
          <Formik
          initialValues={{
            input1:"1",
            input2:"1",
            input3:"1",
            input4:"1",
            input5:"1",
          }}
          validationSchema={this.PhoneOtpSchema()}
          validateOnMount={true}
          onSubmit={(values) => {
            console.log("valus=========>",values)
           this.verifyOtp(values)
            // same shape as initial values  
          }}
        >
          {({ values, touched, errors, isValid, setFieldValue,handleChange }) => (
            <Form translate="yes" className="commonForm">
            <Box className="formGroup">
              <div className="otpInputGrp">
                <Field type="number" name="input1" className="formOutlineInput" />
                <Field type="number" name="input2" className="formOutlineInput" />
                <Field type="number" name="input3" className="formOutlineInput" />
                <Field type="number" name="input4" className="formOutlineInput" />
                <Field type="number" name="input5" className="formOutlineInput" />
              </div>
            </Box>
            <Box className="customButton row-btn">
            <Button type="submit" variant="contained">next</Button>
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
                  <Box className="header-left-block header-block">
                    <h1>Enter OTP</h1>
                    <h6> 
                      {
                        emailMask ? (<>
                          Please enter the code send to the email<br></br>address <span className="text">{emailMask}</span>
                          </>
                        )
                         :<>
                        Please enter the code send to the phone<br></br>number <span className="text">{phoneNumber}</span>    
                        </>
                       }
                      </h6>
                  </Box>
                  <Box className="commonForm">
                    <Box className="formGroup otpBlock">
                      <OtpInput className="formOutlineInput"
                        value={"111111"}
                        onChange={this.handleChange}
                        numInputs={6}
                      // separator={<span>-</span>}
                      />
                    </Box>
                  </Box>
                  <Box className="customButton row-btn">
                    <Button variant="contained" onClick={() => { this.verifyOtp() }}>send</Button>
                  </Box>
                  <Box className="passwordRow">
                    <Link className="link">Resend OTP in</Link>
                    <Link className="link"> <span> 00:30    </span></Link>
                    <Link className="link"> Seconds</Link>
                  </Box>
                </Box>
                {/* mobile footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                  <Link href="#" className="link">Don't have an account ? </Link>
                  <Link href="#" className="link"> <span> register</span></Link>
                </Box> */}
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
export default withRouter(ChairmanForgotPasswordOTP)