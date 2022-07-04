import React from "react";

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

export default class ForgotPasswordOTP extends OTPInputAuthController {
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
          <form className="commonForm">
            <Box className="formGroup">
              <div className="otpInputGrp">
                <input type="text" className="formOutlineInput" />
                <input type="text" className="formOutlineInput" />
                <input type="text" className="formOutlineInput" />
                <input type="text" className="formOutlineInput" />
                <input type="text" className="formOutlineInput" />
                <input type="text" className="formOutlineInput" />
              </div>
            </Box>
          </form>
          <Box className="customButton row-btn">
            <Button variant="contained">next</Button>
          </Box>
        </Box>
      </>
    );
  }
}
