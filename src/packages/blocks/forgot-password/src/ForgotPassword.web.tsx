import React from "react";

//components
import {
  Box,
  Button,
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik } from "formik";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
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
            <h6>One Time Password(OTP) will be sent to the regestered email or mobile.</h6>
          </Box>
          <form className="commonForm">
            <Box className="formGroup">
              <label htmlFor="" className="textfieldLabel">Enter your regestered Email or Mobile Number</label>
              <div className="formInputGrp">
                <input type="text" placeholder="Email ID or Mobile Number" className="formInput" />
                <span className="frmLeftIcons"><MailOutlineIcon /></span>
              </div>
            </Box>
            <Box className="customButton">
              <Button variant="contained">next</Button>
            </Box>
          </form>
        </Box>
      </>
    )
  }
}

