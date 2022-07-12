//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Typography
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
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
        <Box className="login-wrapper auth-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-block">
            <h1>Forgot Password</h1>
            <h6>One Time Password(OTP) will be sent to the regestered email.</h6>
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
                  <label htmlFor="" className="textfieldLabel">Enter your regestered Email </label>
                  <div className="formInputGrp">
                    <Field type="email" name="email" placeholder="Email ID" className="formInput" />
                    <span className="frmLeftIcons"><MailOutlineIcon /></span>
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

              </Form>
            )}
          </Formik>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(ForgotPassword)