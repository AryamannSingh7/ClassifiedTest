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
import { Tenant_Logo } from "../src/assets";

import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController";

export default class EmailAccountLogin extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box className="login-wrapper">
          <div className="backIcon"><KeyboardBackspaceIcon /></div>
          <Box className="header-block">
            <img src={Tenant_Logo} className="tenant-logo" alt="" />
            <h1>Welcome Back</h1>
            <p>Login with your account credentials </p>
          </Box>
          <form className="commonForm">
            <Box className="formGroup">
              <input type="text" placeholder="Email ID" className="formInput" />
              <span className="frmLeftIcons"><MailOutlineIcon /></span>
            </Box>
            <Box className="formGroup">
              <input type="text" placeholder="Password" className="formInput" />
              <span className="frmLeftIcons"><LockOpenIcon /></span>
              <span className="frmrightIcons"><Visibility /></span>
              {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
            </Box>
            <Box className="formGroup formCheckbox">
              <div>
                <Checkbox defaultChecked icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                />
                <label htmlFor="loginCheckbox" className="checkboxLabel">Stay logged in</label>
              </div>
              <Link href="#" className="link">Forgot Password?</Link>
            </Box>
            <Box className="customButton">
              <Button variant="contained">login</Button>
            </Box>
          </form>
          <Box className="bottomBlock">
            <Link href="#" className="link">Don't have an account ? </Link>
            <Link href="#" className="link"> <span> register</span></Link>
          </Box>
        </Box>
      </>
    );
  }
}

// Customizable Area End