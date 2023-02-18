import React from "react";
import { Box, Button, Link, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import { Menu } from "@szhsin/react-menu";
import MenuItem from "@material-ui/core/MenuItem";
import "@szhsin/react-menu/dist/core.css";
import { Tenant_Logo, Building_Logo, Lock_User_Icon, Building1, globalIcon ,Email_Icon} from "../src/assets";
import i18next from "i18next";
import AlertErrorWeb from "../../../components/src/AlertError.web"

class ChairmanForgotPassword extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
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
        <Box className="login-wrapper  auth-wrapper" style={{backgroundColor:"white"}}>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding common-logo-block" display={{ xs: "none", md: "flex" }}>
                  <Link href="/ChairmanLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                  <Box>
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
                <Box className="main-content-block desktop-ui">
                  <Box className="header-block">
                    <h1 className="bold-text">Forgot Password</h1>
                    <h6>
                      One Time Password(OTP) will be sent
                      <br />
                      to the regestered email.
                    </h6>
                  </Box>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={this.EmailSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      this.checkUser(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <Box className="formGroup">
                          <div className="formInputGrp">
                            <Field
                              type="text"
                              name="email"
                              placeholder="Email ID or Mobile Number"
                              className="formInput"
                            />
                            <span className="frmLeftIcons">
                              <img src={Email_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                          </div>

                          {errors.email && touched.email ? (
                            <Typography className="text-error">{errors.email} </Typography>
                          ) : null}
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">
                            next
                          </Button>
                        </Box>
                        <Box className="passwordRow">
                          Back to
                          <Link href="ChairmanLogin" className="link">
                            <span> Login</span>
                          </Link>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: "none", md: "flex" }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
//@ts-ignore
export default withRouter(ChairmanForgotPassword);
