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
  Grid,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";

//images
import {
  Tenant_Logo, Building_Logo, Landing_Banner, Building1,
  Email_Icon, Lock_User_Icon, User_Icon
} from "../src/assets";
//resources
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController.web";
import Loader from "../../../components/src/Loader.web";
class EmailAccountLogin extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box className="login-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box display={{ xs: 'flex', md: 'flex' }} className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block desktop-ui">
                  <Box className="header-block">
                    <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                      </Link>
                    </Box>
                    <h1>Welcome Back</h1>
                    <p>Login with your account credentials </p>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      userType:' ',
                      showPassword: false,
                      stayIn: false
                    }}
                    validationSchema={this.LoginSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      // same shape as initial values
                      this.doLogIn(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">

                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={User_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                            {/* <InputLabel id="demo-simple-select-outlined-label">Select User Type</InputLabel>  */}
                            <Select
                              name="userType"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{ paddingLeft: '45px' }}
                              // label="Select User Type"
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("userType", e.target.value)
                              }}
                              value={values.userType}
                            >
                              <MenuItem disabled value=" ">
                                Select User Type
                              </MenuItem>
                              <MenuItem value="Owner">
                                Owner
                              </MenuItem>

                              <MenuItem  value="Tenant">
                                Tenant
                              </MenuItem>

                              <MenuItem  value="Owner Resident">
                                Owner Resident
                              </MenuItem>




                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="userType" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup">
                          <Field name="email" type="text" placeholder="Email ID" className="formInput" />
                          <span className="frmLeftIcons">
                            <img src={Email_Icon} className="frm-icons" alt="Email Icon" />
                          </span>
                          {
                            errors.email && touched.email ?
                              (
                                <Typography className="text-error"

                                >{errors.email} </Typography>

                              ) : null
                          }
                        </Box>

                        <Box className="formGroup">
                          <Field name="password" type={values.showPassword ? "text" : "password"} placeholder="Password" className="formInput" />
                          <span className="frmLeftIcons">
                            <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon" />
                          </span>
                          {/* <span className="frmrightIcons"><Visibility /></span> */}
                          <span className="frmrightIcons">
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
                          </span>
                          {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          {
                            errors.password && touched.password ?
                              (
                                <Typography className="text-error">{errors.password} </Typography>
                              ) : null
                          }
                        </Box>
                        <Box className="formGroup formCheckbox">
                          <div>
                            <Checkbox name="stayIn" onChange={handleChange} value={values.stayIn} icon={<CircleUnchecked />}
                              checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                            />
                            <label htmlFor="loginCheckbox" className="checkboxLabel">Stay logged in</label>
                          </div>
                          <Link href="/ForgotPassword" className="link">Forgot Password?</Link>
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit" >login</Button>
                        </Box>
                        <Box className="bottomBlock link-block">
                          <Link href="#" className="link">Don't have an account ? </Link>
                          <Link href="/selecttype" className="link"> <span> register</span></Link>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* desktop footer block */}
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(EmailAccountLogin)

// Customizable Area End
