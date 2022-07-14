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
  Grid
} from "@material-ui/core";

//resources

import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
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
  render() {
    return (
      <>
        <Box className="login-wrapper">
          
        <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <div></div>
          <Box className="header-block">
            <img src={'#'} className="tenant-logo" alt="Lock_Icon" />
            <h1>Password Changed<br></br>Successfully!</h1>
            <h6>You have successfully changed your<br></br>password. Please use your new password when<br></br>logging in.</h6>
          </Box>
          <Box className="row-btn customButton">
            <Button variant="contained" onClick={() => {  this.setState({ showDialog: true})}}>
               Delete Registration
          </Button>
          </Box>
          <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this case study
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.setState({ showDialog: false})} variant='text'>
              Cancel
            </Button>
            <Button onClick={() => this.setState({ showDialog: false })}  variant='text'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(RegistrationRequest)

// Customizable Area End