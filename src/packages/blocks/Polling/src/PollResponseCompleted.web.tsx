//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Link,
  Grid
} from "@material-ui/core";

//resorces
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
//resources
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Lock_Icon } from "../src/assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
// Customizable Area End

import PollingController from "./PollingController";

class PollResponseCompleted extends PollingController {

  render() {
    return (
      <>
          <Box className="login-wrapper reg-wrapper">
          <Box display={{ xs: 'flex', md: 'none' }} className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    {/* <img src={Building_Logo} className="head-logo" alt="" /> */}
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block">
                  <Box className="reg-content-block">
                    <Box className="header-block chairmanHeaderBlock">
                      <PersonOutlineIcon className="bank-logo"/>
                      {/* <img src={request} className="bank-logo" alt="Tenant Logo" /> */}
                      <h1>Poll Response Submitted</h1>
                      <h6>Your Poll Response has been submitted successfully</h6>
                    </Box>
                  </Box>
                </Box>
                <Box className="footer-block">
                  <Box className="row-btn customButton desktop-ui">
                    <Button variant="contained" 
                    onClick={this.getFinalPollAnswerView}
                    >
                      Okay
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </>
    );
  }
}
export default withRouter(PollResponseCompleted);