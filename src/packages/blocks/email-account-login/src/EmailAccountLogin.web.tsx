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
import AlertErrorWeb from "../../../components/src/AlertError.web";
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
        <Box className="login-wrapper" style={{backgroundColor: "white"}}>
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
                <Box className="main-content-block desktop-ui inputPlaceholderRegistration">
                  <Box className="header-block" style={{marginBottom:"30px"}}>
                    <Box display={{ xs: 'flex', md: 'none' }}>
                      <Link href="/EmailAccountLogin">
                        <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" />
                      </Link>
                    </Box>
                    <h1 className="login-h1 bold-text"  style={{fontSize:"26px"}}>Welcome Back</h1>
                    <p>Login with your account credentials </p>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      userType: ' ',
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
                        {/*<Box className="formGroup customSelect">*/}
                        {/*  <FormControl variant="outlined" >*/}
                        {/*    <span className="frmLeftIcons">*/}
                        {/*      <img src={User_Icon} className="frm-icons" alt="Email Icon" />*/}
                        {/*    </span>*/}
                        {/*    /!* <InputLabel id="demo-simple-select-outlined-label">Select User Type</InputLabel>  *!/*/}
                        {/*    <Select*/}
                        {/*      name="userType"*/}
                        {/*      labelId="demo-simple-select-outlined-label"*/}
                        {/*      id="demo-simple-select-outlined"*/}
                        {/*      style={{ paddingLeft: '45px' }}*/}
                        {/*      // label="Select User Type"*/}
                        {/*      onChange={(e) => {*/}
                        {/*        (e.target.value != " ") && setFieldValue("userType", e.target.value)*/}
                        {/*      }}*/}
                        {/*      value={values.userType}*/}
                        {/*    >*/}
                        {/*      <MenuItem disabled value=" ">*/}
                        {/*        Select User Type*/}
                        {/*      </MenuItem>*/}
                        {/*      <MenuItem value="Owner">*/}
                        {/*        Owner*/}
                        {/*      </MenuItem>*/}
                        {/*      <MenuItem value="Tenant">*/}
                        {/*        Tenant*/}
                        {/*      </MenuItem>*/}
                        {/*      <MenuItem value="Owner Resident">*/}
                        {/*        Owner Resident*/}
                        {/*      </MenuItem>*/}
                        {/*    </Select>*/}
                        {/*    <ErrorMessage className="text-error" component="Typography" name="userType" />*/}
                        {/*  </FormControl>*/}
                        {/*</Box>*/}
                        <Box style={{marginBottom:"20px"}}>
                          <Box className="formGroup" style={{marginBottom:"0px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"16px",backgroundColor:"#f9f9f9"}}>
                            <Field name="email" type="text" placeholder="Email ID" className="formInput" />
                            <span className="frmLeftIcons">
                            <img src={Email_Icon} className="frm-icons" alt="Email Icon" style={{marginTop:"-2px"}}/>
                          </span>
                          </Box>
                          {
                            errors.email && touched.email ?
                                (
                                    <Typography className="text-error" style={{marginLeft:"5px",fontWeight:600}}

                                    >{errors.email} </Typography>

                                ) : null
                          }
                        </Box>
                        <Box style={{marginBottom:"15px"}}>
                          <Box className="formGroup" style={{marginBottom:"0px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"16px",backgroundColor:"#f9f9f9"}}>
                            <Field name="password" type={values.showPassword ? "text" : "password"} placeholder="Password" className="formInput" />
                            <span className="frmLeftIcons">
                            <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon"  style={{marginTop:"-3px"}} />
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
                                        width: 26,
                                        height: 26,
                                        marginRight: 5,
                                        marginTop:1,
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
                                        width: 26,
                                        height: 26,
                                        marginRight: 5,
                                        marginTop:1,
                                        color: "#000000",
                                        opacity: 0.54
                                      }}
                                  />
                                </IconButton>
                            )}
                          </span>
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </Box>
                          {
                            errors.password && touched.password ?
                                (
                                    <Typography className="text-error" style={{marginLeft:"5px",fontWeight:600}}
                                    >{errors.password} </Typography>
                                ) : null
                          }
                        </Box>

                        <Box className="formGroup formCheckbox">
                          <div>
                            <Checkbox name="stayIn" onChange={handleChange} value={values.stayIn} icon={<CircleUnchecked />}
                              checkedIcon={<CircleCheckedFilled />} id="loginCheckbox" style={{paddingLeft:"0px"}}
                            />
                            <label htmlFor="loginCheckbox" className="checkboxLabel">Stay logged in</label>
                          </div>
                          <Link href="/ForgotPassword" className="link bold-text">Forgot Password?</Link>
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit" >login</Button>
                        </Box>
                        <Box className="bottomBlock link-block" style={{marginTop:"80px"}}>
                          <Link href="#" className="link">Don't have an account ? </Link>
                          <Link href="/selecttype" className="link"> <span> register</span></Link>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <a  href="http://www.tenantint.com/" target="_blank">
                    <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                  </a>
                </Box> */}
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
        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
      </>
    );
  }
}
export default withRouter(EmailAccountLogin)

// Customizable Area End
