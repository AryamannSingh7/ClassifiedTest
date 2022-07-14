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
  Grid
} from "@material-ui/core";

//resources
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Tenant_Logo, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ChairmanAccountLoginController, {
  Props
} from "./ChairmanAccountLoginController.web";
import Loader from "../../../components/src/Loader.web";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class ChairmanLogin extends ChairmanAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  // componentDidMount() {
  //   this.getUserType();
  // }

  render() {
    console.log("render============>", this.state?.loading)
    return (
      <>
        <Box className="login-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box display={{ xs: 'flex', md: 'none' }} className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block desktop-ui">
                  <Box className="header-block">
                    <Box display={{ xs: 'flex', md: 'none' }}>
                      <img src={Tenant_Logo} className="tenant-logo" alt="" />
                    </Box>
                    <h1>Welcome Back</h1>
                    <p>Login with your account credentials </p>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      showPassword: false,
                      stayIn: false,
                      userType: "1"
                    }}
                    validationSchema={this.LoginSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      // same shape as initial values
                      this.LogIn(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm ">
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons"><LockOpenIcon /></span>
                            {/* <InputLabel id="demo-simple-select-outlined-label">Select User Type</InputLabel>  */}
                            <Select
                              name="userType"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              // label="Select User Type"
                              onChange={(e) => {
                                (e.target.value != "1") && setFieldValue("userType", e.target.value)
                              }}
                              value={values.userType}
                            >
                              <MenuItem disabled value="1">
                                Select User Type
                              </MenuItem>
                              {
                                this.state?.userTypeData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.name}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                              
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="userType" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup">
                          <Field name="email" type="text" placeholder="Email ID" className="formInput" />
                          <span className="frmLeftIcons"><MailOutlineIcon /></span>
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
                          <span className="frmLeftIcons"><LockOpenIcon /></span>
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
                          <Link href="/ChairmanForgotPassword" className="link">Forgot Password?</Link>
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit" >login</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* mobile footer block */}
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'flex', md: 'none' }}>
                  <Link href="#" className="link">Don't have an account ? </Link>
                  <Link href="#" className="link"> <span> register</span></Link>
                </Box>
                {/* desktop footer block */}
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
          <Loader loading={this.state.loading} />
        </Box>
      </>
    );
  }
}
export default withRouter(ChairmanLogin)

// Customizable Area End