import React from "react";

//components
import {
  Box,
  Button,
  Link
} from "@material-ui/core";

//resources
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Lock_Icon } from "../src/assets";

import { Formik } from "formik";

import * as Yup from "yup";
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class ChangeSuccessfully extends ForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <>
        <Box className="login-wrapper">
          <div className="backIcon"><KeyboardBackspaceIcon /></div>
          <div></div>
          <Box className="header-block">
            <img src={Lock_Icon} className="tenant-logo" alt="Lock_Icon" />
            <h1>Password Changed<br></br>Successfully!</h1>
            <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
          </Box>
          <Box className="row-btn customButton">
            <Button variant="contained">login</Button>
          </Box>
        </Box>
      </>
    );
  }
}
