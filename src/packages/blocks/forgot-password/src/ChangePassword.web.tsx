import React from "react";

import { Formik } from "formik";

import * as Yup from "yup";
// Customizable Area End

//components
import {
  Box,
  Button,
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class ChangePassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
  }

  render() {
    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <div className="backIcon"><KeyboardBackspaceIcon /></div>
          <Box className="header-left-block header-block">
            <h1>Change Password</h1>
            <h6>"You need to change your password. Please enter a new password"</h6>
          </Box>
          <form className="commonForm">
            <Box className="formGroup">
              <div className="formInputGrp">
                <input type="text" placeholder="New Password" className="formInput" />
                <span className="frmLeftIcons"><MailOutlineIcon /></span>
                <span className="frmrightIcons"><Visibility /></span>
                {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
              </div>
            </Box>
            <Box className="formGroup">
              <div className="formInputGrp">
                <input type="text" placeholder="Confirm Password" className="formInput" />
                <span className="frmLeftIcons"><MailOutlineIcon /></span>
                <span className="frmrightIcons"><Visibility /></span>
                {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
              </div>
            </Box>
            <Box className="customButton">
              <Button variant="contained">change password</Button>
            </Box>
          </form>
        </Box>
      </>
    );
  }
}
