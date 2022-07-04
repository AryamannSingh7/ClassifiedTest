//@ts-ignore
//@ts-nocheck
import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton
} from "@material-ui/core";

//resources
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Tenant_Logo } from "../src/assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController";

class EmailAccountLogin extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box className="login-wrapper">
          <div className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></div>
          <Box className="header-block">
            <img src={Tenant_Logo} className="tenant-logo" alt="" />
            <h1>Welcome Back</h1>
            <p>Login with your account credentials </p>
          </Box>
          <Formik
          initialValues={{
            email: "",
            password: "",
            showPassword: false,
            stayIn:false
          }}
          validationSchema={this.LoginSchema()}
          validateOnMount={true}
          onSubmit={(values) => {
            console.log("valus=========>",values)
            // same shape as initial values
             this.doLogIn(values);
          }}
        >
          {({ values, touched, errors, isValid, setFieldValue,handleChange }) => (
            <Form translate="yes" className="commonForm">
            <Box className="formGroup">
              <Field name="email" type="text" placeholder="Email ID" className="formInput" />
              <span className="frmLeftIcons"><MailOutlineIcon /></span>
            </Box>
            {
              errors.email && touched.email ? 
              (
              <Typography
              style={{
                color: "#F14E24",
                fontFamily: "Poppins",
                fontWeight: 300,
                fontSize: 14,
                marginTop: 5,
                marginLeft: 10
              }}
              >{errors.email} </Typography>

              ) : null
            }
            <Box className="formGroup">
              <Field name="password" type={values.showPassword ? "text" : "password"} placeholder="Password" className="formInput" />
              <span className="frmLeftIcons"><LockOpenIcon /></span>
              {/* <span className="frmrightIcons"><Visibility /></span> */}
              {values.showPassword ? (
                      <IconButton
                        onClick={() => setFieldValue("showPassword", false)}
                        style={{ padding: 0, backgroundColor: "transparent" }}
                        disableRipple={true}
                      >
                        <Visibility
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 16,
                            color: "#000000",
                            opacity: 0.54
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => setFieldValue("showPassword", true)}
                        style={{ padding: 0, backgroundColor: "transparent" }}
                        disableRipple={true}
                      >
                        <VisibilityOff
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 16,
                            color: "#000000",
                            opacity: 0.54
                          }}
                        />
                      </IconButton>
                    )}
              {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
            </Box>
            {
              errors.password && touched.password ? 
              (
              <Typography 
              style={{
                color: "#F14E24",
                fontFamily: "Poppins",
                fontWeight: 300,
                fontSize: 14,
                marginTop: 5,
                marginLeft: 10
              }}
              >{errors.password} </Typography>
              ) : null
            }
            <Box className="formGroup formCheckbox">
              <div>
                <Checkbox name="stayIn" onChange={handleChange} value={values.stayIn}  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                />
                <label htmlFor="loginCheckbox" className="checkboxLabel">Stay logged in</label>
              </div>
              <Link href="/ForgotPassword" className="link">Forgot Password?</Link>
            </Box>
            <Box className="customButton">
              <Button variant="contained" type="submit" >login</Button>
            </Box>
            </Form>
          )}
        </Formik>     
          <Box className="bottomBlock">
            <Link href="#" className="link">Don't have an account ? </Link>
            <Link href="#" className="link"> <span> register</span></Link>
          </Box>
        </Box>
      </>
    );
  }
}
export default withRouter(EmailAccountLogin)

// Customizable Area End