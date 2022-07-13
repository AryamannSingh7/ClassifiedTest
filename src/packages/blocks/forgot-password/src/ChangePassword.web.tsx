//@ts-ignore
//@ts-nocheck
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import * as Yup from "yup";
// Customizable Area End

//components
import {
  Box,
  Button,
  Typography
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Loader from "../../../components/src/Loader.web";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";

class ChangePassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
  }

  render() {
    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-left-block header-block">
            <h1>Change Password</h1>
            <h6>"You need to change your password. Please enter a new password"</h6>
          </Box>
          <Formik
            initialValues={{
              confirmPassword: "",
              confirmShowPassword: false,
              newShowPassword: false,
              newPassword: ""
            }}
            validationSchema={this.changePasswordValidations()}
            validateOnMount={true}
            onSubmit={(values) => {
              console.log("valus=========>", values)
              this.changePassword(values)
              // same shape as initial values  
            }}
          >
            {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
              <Form translate="yes" className="commonForm">
                <Box className="formGroup">
                  <div className="formInputGrp">
                    <Field type={values.newShowPassword ? "text" : "password"} name="newPassword" placeholder="New Password" className="formInput" />
                    <span className="frmLeftIcons"><MailOutlineIcon /></span>
                    {
                      values.newShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("newShowPassword", false)} /></span>
                        : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("newShowPassword", true)} /></span>
                    }
                    {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                  </div>
                  <ErrorMessage className="text-error" component="Typography" name="newPassword" />
                </Box>
                <Box className="formGroup">
                  <div className="formInputGrp">
                    <Field type={values.confirmShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="formInput" />
                    <span className="frmLeftIcons"><MailOutlineIcon /></span>
                    {
                      values.confirmShowPassword ? <span className="frmrightIcons"><Visibility onClick={() => setFieldValue("confirmShowPassword", false)} /></span>
                        : <span className="frmrightIcons"><VisibilityOffIcon onClick={() => setFieldValue("confirmShowPassword", true)} /></span>
                    }
                    {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                  </div>
                  <ErrorMessage className="text-error" component="Typography" name="confirmPassword" />
                </Box>
                <Box className="customButton">
                  <Button variant="contained" type="submit" >change password</Button>
                </Box>
              </Form>
            )}
          </Formik>

        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(ChangePassword);