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
import {
  Tenant_Logo, Building_Logo, Email_Icon, User_Icon, Lock_User_Icon, Building1 ,globalIcon
} from "../src/assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ChairmanAccountLoginController, {
  Props
} from "./ChairmanAccountLoginController.web";
import Loader from "../../../components/src/Loader.web";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';
import { Menu } from "@szhsin/react-menu";
import MenuItem from '@material-ui/core/MenuItem';
import "@szhsin/react-menu/dist/core.css";
import AlertErrorWeb from "../../../components/src/AlertError.web"

class ChairmanLogin extends ChairmanAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getUserType();
  }
  handleEngLngChange = () => {
    localStorage.setItem("language", "en");
    i18next.changeLanguage("en");
  };

  handleAreLngChange = () => {
    localStorage.setItem("language", "ar");
    i18next.changeLanguage("ar");
  };


  render() {
    return (
      <>
        <Box className="login-wrapper" style={{backgroundColor:"white",height:"auto"}}>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                {/* <Box className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box> */}
                <Box className="logo-block common-top-padding common-logo-block" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                     <Box  >
                    <Menu
                      className="chairman-lang-menu chairman-menu"
                      arrow={true}
                      align="center"
                      menuButton={<img src={globalIcon} alt="GlobalIcon" />}
                    >
                      <MenuItem
                        className={localStorage.getItem("language") === "en" ? "active" : ""}
                        onClick={() => this.handleEngLngChange()}
                      >
                        English
                      </MenuItem>
                      <MenuItem
                        className={localStorage.getItem("language") === "ar" ? "active" : ""}
                        onClick={() => this.handleAreLngChange()}
                      >
                        Arabic
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
             
                <Box className="main-content-block desktop-ui inputPlaceholderRegistration">
                  <Box className="header-block">
                    <Box display={{ xs: 'flex', md: 'none' }}>
                      <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" />
                    </Box>
                    <h1 className="login-h1 bold-text ">Welcome Back</h1>
                    <p>Login with your account credentials </p>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      showPassword: false,
                      stayIn: false,
                      userType: " "
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
                      <Form translate="yes" className="commonForm ">
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
                              <MenuItem  disabled value=" ">
                                Select User Type
                               </MenuItem>  
                              { 
                                this.state?.userTypeData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.attributes?.name}
                                  >
                                    {val?.attributes?.name}
                                  </MenuItem>
                                ))
                              }

                            </Select> 
                            {/*<ErrorMessage className="text-error" component="Typography" name="userType" style={{fontWeight: '600'}} />*/}
                          </FormControl>
                          {
                            errors.userType && touched.userType ?
                                (
                                    <Typography className="text-error" style={{fontWeight:600,marginLeft:"15px"}}

                                    >{errors.userType} </Typography>

                                ) : null
                          }
                        </Box>
                        <Box style={{marginBottom: "25px"}}>
                          <Box className="formGroup" style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}>
                            <Field name="email" type="text" placeholder="Email ID" className="formInput" />
                            <span className="frmLeftIcons">
                            <img src={Email_Icon} className="frm-icons" alt="Email Icon" style={{marginTop:"2px"}} />
                          </span>
                          </Box>
                          <Box style={{marginTop:"-10px",marginBottom:"-10px"}}>
                            {
                              errors.email && touched.email ?
                                  (
                                      <Typography className="text-error" style={{fontWeight:600,marginLeft:"15px"}}

                                      >{errors.email} </Typography>

                                  ) : null
                            }
                          </Box>
                        </Box>
                        <Box>
                          <Box className="formGroup" style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}>
                            <Field name="password" type={values.showPassword ? "text" : "password"} placeholder="Password" className="formInput" />
                            <span className="frmLeftIcons">
                            <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon" style={{marginTop:"-2px"}}/>
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
                                        marginRight: 0,
                                        marginTop:3,
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
                                        marginRight: 0,
                                        marginTop:3,
                                        color: "#000000",
                                        opacity: 0.54
                                      }}
                                  />
                                </IconButton>
                            )}
                          </span>
                            {/* <span className="frmrightIcons"><VisibilityOffIcon /></span> */}
                          </Box>
                          <Box style={{marginTop:"-10px"}}>
                            {
                              errors.password && touched.password ?
                                  (
                                      <Typography className="text-error" style={{fontWeight:600,marginLeft:"15px"}}>{errors.password} </Typography>
                                  ) : null
                            }
                          </Box>
                        </Box>

                        <Box className="formGroup formCheckbox">
                          <div>
                            <Checkbox name="stayIn" onChange={handleChange} value={values.stayIn} icon={<CircleUnchecked />}
                              checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                            />
                            <label htmlFor="loginCheckbox" className="checkboxLabel">Stay logged in</label>
                          </div>
                          <Link href="/ChairmanForgotPassword" className="link bold-text">Forgot Password?</Link>
                        </Box>
                        <Box className="customButton" style={{paddingTop:"4px"}}>
                          <Button variant="contained" type="submit" >login</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* desktop footer block */}
                <Box className="footer-main-block bottomBlock" style={{backgroundColor:"white",marginTop: '70px'}}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
          <Loader loading={this.state.loading} />
           <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        </Box>
      </>
    );
  }
}
//@ts-ignore
export default withTranslation()(withRouter(ChairmanLogin));

// Customizable Area End
