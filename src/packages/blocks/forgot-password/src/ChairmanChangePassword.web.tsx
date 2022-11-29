import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router";
import { Box, Button, Link, Grid } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import Loader from "../../../components/src/Loader.web";
import { Tenant_Logo, Building_Logo, Lock_User_Icon, Building1, globalIcon } from "../src/assets";
import { Menu } from "@szhsin/react-menu";
import MenuItem from "@material-ui/core/MenuItem";
import "@szhsin/react-menu/dist/core.css";
import i18next from "i18next";

class ChairmanChangePassword extends ChairmanForgotPasswordController {
  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
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
        <Box className="login-wrapper">
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
                    <h1>Change Password</h1>
                    <h6>
                      You need to change your password.
                      <br />
                      Please enter a new password
                    </h6>
                  </Box>
                  <Formik
                    initialValues={{
                      confirmPassword: "",
                      confirmShowPassword: false,
                      newShowPassword: false,
                      newPassword: "",
                    }}
                    validationSchema={this.changePasswordValidations()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      this.changePassword(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <Box className="formGroup">
                          <div className="formInputGrp">
                            <Field
                              type={values.newShowPassword ? "text" : "password"}
                              name="newPassword"
                              placeholder="New Password"
                              className="formInput"
                            />
                            <span className="frmLeftIcons">
                              <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                            {values.newShowPassword ? (
                              <span className="frmrightIcons">
                                <Visibility onClick={() => setFieldValue("newShowPassword", false)} />
                              </span>
                            ) : (
                              <span className="frmrightIcons">
                                <VisibilityOffIcon onClick={() => setFieldValue("newShowPassword", true)} />
                              </span>
                            )}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="newPassword" />
                        </Box>
                        <Box className="formGroup">
                          <div className="formInputGrp">
                            <Field
                              type={values.confirmShowPassword ? "text" : "password"}
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              className="formInput"
                            />
                            <span className="frmLeftIcons">
                              <img src={Lock_User_Icon} className="frm-icons" alt="Email Icon" />
                            </span>
                            {values.confirmShowPassword ? (
                              <span className="frmrightIcons">
                                <Visibility onClick={() => setFieldValue("confirmShowPassword", false)} />
                              </span>
                            ) : (
                              <span className="frmrightIcons">
                                <VisibilityOffIcon onClick={() => setFieldValue("confirmShowPassword", true)} />
                              </span>
                            )}
                          </div>
                          <ErrorMessage className="text-error" component="Typography" name="confirmPassword" />
                        </Box>
                        <Box className="customButton row-btn">
                          <Button variant="contained" type="submit">
                            change password
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                <Box className="bottomBlock common-bottom-padding" display={{ xs: "none", md: "flex" }}>
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
        <Loader loading={this.state.loading} />
      </>
    );
  }
}
//@ts-ignore
export default withRouter(ChairmanChangePassword);
