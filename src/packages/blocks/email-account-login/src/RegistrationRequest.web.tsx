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
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";

//resources
import { Tenant_Logo, Delete_Icon, Bank_Icon, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController.web";
import Loader from "../../../components/src/Loader.web";
class RegistrationRequest extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    // Customizable Area Start
    this.getRegistrationRequest();
    // Customizable Area End
  }

  render() {
    console.log("getRegistrationRequest===================>", this.state?.registrationRequest?.attributes);
    const building_name = this.state?.registrationRequest?.attributes?.building_management?.name;
    const apartment_name = this.state?.registrationRequest?.attributes?.apartment_management?.apartment_name;
    //console.log("getRegistrationRequest===================>",building_name ,apartment_name);
    return (
      <>
        <Box className="login-wrapper reg-wrapper">
          <Box display={{ xs: 'flex', md: 'none' }} className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block">
                  <Box className="reg-content-block">
                    <Box className="header-block chairmanHeaderBlock">
                      <img src={Tenant_Logo.default} className="tenant-logo" alt="Tenant Logo" />
                      <h1>Regestration Request<br></br>Under process</h1>
                      <h6>Your regestration request for {apartment_name} of<br></br>{building_name} is sent and under<br></br>process.You will receive notification<br></br>once it it processed.</h6>
                    </Box>
                    <Box className="reg-block">
                      <Box className="reg-row">
                        <img src={Bank_Icon.default} className="bank-logo" alt="Tenant Logo" />
                        <Box className="reg-right-block">
                          <h5>{apartment_name}</h5>
                          <h6>{building_name}</h6>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="footer-block">
                  <Box className="row-btn customButton desktop-ui">
                    <Button variant="contained" onClick={() => { this.setState({ showDialog: true }) }}>
                      Delete Registration REQUEST
                    </Button>
                    <Button onClick={() => this.clear()} variant='text'>
                      LOGOUT
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
          {/* <Box className="header-block">
            <img src={'#'} className="tenant-logo" alt="Lock_Icon" />
            <h1>Password Changed<br></br>Successfully!</h1>
            <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
          </Box> */}

          <Dialog
            open={this.state.showDialog}
            onClose={() => this.setState({ showDialog: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="diloag-wrapper"
            PaperProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          >
            <Box className="diloag-body">
              <Box className="diloag-header">
                <img src={Delete_Icon.default} className="tenet-logo" alt="" />
                <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                  Sure you want to delete request?
                </DialogTitle>
                <p>Are you sure that you want to delete the regestration request for the unit ({apartment_name}) of {building_name}.</p>
              </Box>
              <Box className="dialog-footer desktop-ui">
                <DialogActions className="customButton">
                  <Button variant="contained" onClick={() => this.setState({ showDialog: false })}>
                    No, DON'T DELETE
                  </Button>
                  <Button onClick={() => this.deleteRequestById()} variant='text'>
                    YES DELETE
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </Dialog>
        </Box>

        < Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(RegistrationRequest)

// Customizable Area End
