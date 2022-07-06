//@ts-ignore
//@ts-nocheck
import React from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
//components
import {
  Box,
  Button,
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import OTPInputAuthController, {
  Props
} from "../../otp-input-confirmation/src/OTPInputAuthController";

class ForgotPasswordOTP extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Box className="login-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-left-block header-block">
            <h1>Enter OTP Code</h1>
            <h6>Please enter the code send to the email address <span className="text">jo******52@gmail.com</span></h6>
          </Box>

          <Formik
          initialValues={{
            input1:"",
            input2:"",
            input3:"",
            input4:"",
            input5:"",
          }}
         // validationSchema={this.PhoneOtpSchema()}
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
                <Field type="text" minlength="1" name="input1" className="formOutlineInput" />
                <Field type="text" name="input2" className="formOutlineInput" />
                <Field type="text" name="input3" className="formOutlineInput" />
                <Field type="text" name="input4" className="formOutlineInput" />
                <Field type="text" name="input5" className="formOutlineInput" />
              </div>
            </Box>
            <Box className="customButton row-btn">
            <Button type="submit" variant="contained">next</Button>
          </Box>
            </Form>
          )}
        </Formik>  
        </Box>
      </>
    );
  }
}
export default withRouter(ForgotPasswordOTP)