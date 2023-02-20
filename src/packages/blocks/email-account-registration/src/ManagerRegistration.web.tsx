import * as React from "react";
import { Button, Grid, Box, Typography, Link, IconButton, FormControl, Select, MenuItem } from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Formik, Form, Field } from "formik";
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Back_btn, Building1, company_logo, compnayName, email, password, user } from "./assets";
import { dailCode } from "./code";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from "react-i18next";
import AlertErrorWeb from "../../../components/src/AlertError.web";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'



class ManagerRegistration extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  getSelectedItem() {
    const item = dailCode.find((opt) => {
      // @ts-ignore
      if (opt.dial_code == this.state.selectCode) return opt;
    });
    return item || {};
  }

  showInputError = (error: any, touch: any) => {
    if (error && touch) {
      return (
        <Typography
          style={{
            color: "#F14E24",
            fontWeight: 300,
            fontSize: 14,
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          {error}
        </Typography>
      );
    }
  };

  render() {
    return (
      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols">
            <Grid container>
              <Grid xs={12}>
              <img src={Back_btn} onClick={() => window.history.back()} style={{marginTop:'1rem',marginLeft:'0.5rem'}} />
              </Grid>
            </Grid>

            <div
              style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
              onClick={() =>
                //@ts-ignore
                window.open("https://www.TenantInt.com", "_blank", "noopener").focus()
              }
            >
              <img className="text-center" src={company_logo} alt="" style={{width:'10rem'}}/>
            </div>
            <Grid container>
              <Grid xs={12}>
                <p className="text-center bold-text" style={{ fontSize: '2rem', fontWeight: 900,marginTop:'1.5rem' }}>
                  Welcome
                </p>
              </Grid>
            </Grid>
            <Grid container style={{marginBottom:'2rem'}}>
              <Grid xs={12}>
                <p className="text-center"  style={{fontSize:'15px'}}>Property Manager Sign up</p>
              </Grid>
            </Grid>

            <Grid container className="main-content-block">
              <Grid xs={12}>
                <Formik
                  initialValues={{
                    email: "",
                    phone: "",
                    password: "",
                    confirm_password: "",
                    managerName: "",
                    company_name: "",
                    showPassword: false,
                    showConfirmPassword: false,
                  }}
                  validationSchema={this.signupSchemaManager()}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    this.createAccountManager(values);
                  }}
                >
                  {({ values, errors, touched, isValid, handleChange, setFieldValue }) => (
                    <Form translate="yes" className="">
                      <Box display="flex" flexDirection="column">
                        {/* Company Name */}
                        <Box
                          className="formInputGrp"
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                          marginTop="1rem"
                        >
                          <img src={compnayName} style={{ paddingLeft: "0.5rem" }} />
                          <Field
                            name="company_name"
                            placeholder={"Company Name"}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 10,
                              outline: "none",
                              background:"#f9f9f9"
                            }}
                          />
                        </Box>
                        {this.showInputError(errors.company_name, touched.company_name)}
                        {/* Manager Name */}
                        <Box
                          className="input"
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                          marginTop="1rem"
                        >
                          <img src={user} style={{ paddingLeft: "0.5rem" }} />
                          <Field
                            name="managerName"
                            placeholder={"Manager Full name"}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 10,
                              outline: "none",
                              background:"#f9f9f9"
                            }}
                          />
                        </Box>
                        {this.showInputError(errors.managerName, touched.managerName)}
                        {/* email */}
                        <Box
                          className="input"
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                          marginTop="1rem"
                        >
                          <img src={email} style={{ paddingLeft: "0.5rem" }} />
                          <Field
                            name="email"
                            placeholder={"Email ID (will be your user name) "}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 5,
                              outline: "none",
                              backgroundColor:"#f9f9f9"
                            }}
                          />
                        </Box>
                        {this.showInputError(errors.email, touched.email)}
                        {/* mobile */}
                        <Box
                          marginTop="1rem"
                          className="input"
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                        >
                          <Box>
                            <FormControl variant="outlined">
                              {/* <Select
                                name="selectCode"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this.handleChange}
                                label="Unit"
                                value={this.state.selectCode}
                                style={{backgroundColor:"#f9f9f9"}}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {dailCode.map((item) => (
                                  <MenuItem key={item.dial_code} value={item.dial_code}>
                                    <img
                                      src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${
                                        item.code
                                      }.svg`}
                                      width="15"
                                      height="15"
                                    />
                                    {item.dial_code}
                                  </MenuItem>
                                ))}
                              </Select> */}
                              <PhoneInput
                            inputProps={{name:'selectCode'}}
                            // name='selectCode'
                            enableSearch={true}
                            value={this.state.selectCode}
                            onChange={this.handleChangeCCode}
                            />
                            </FormControl>
                          </Box>
                          <Field
                            id="mobile"
                            name="phone"
                            placeholder={"Mobile"}
                            style={{
                              border: "none",
                              height: "42%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 5,
                              outline: "none",
                            }}
                          />
                        </Box>
                        {this.showInputError(errors.phone, touched.phone)}
                        {/* Password */}
                        <Box
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          mt="20px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                        >
                          <img src={password} style={{ paddingLeft: "0.5rem" }} />
                          <Field
                            name="password"
                            placeholder="Enter Password"
                            type={values.showPassword ? "text" : "password"}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "100%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 10,
                              outline: "none",
                              backgroundColor:"#f9f9f9"
                            }}
                          />
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
                                  opacity: 0.54,
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
                                  opacity: 0.54,
                                }}
                              />
                            </IconButton>
                          )}
                        </Box>
                        {this.showInputError(errors.password, touched.password)}
                        {/* Confirm Password */}
                        <Box
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          mt="20px"
                          border="0.1px solid rgb(209 209 209 / 44%)"
                          borderRadius="16px"
                          bgcolor="#f9f9f9"
                        >
                          <img src={password} style={{ paddingLeft: "0.5rem" }} />

                          <Field
                            name="confirm_password"
                            placeholder="Confirm Password"
                            type={values.showConfirmPassword ? "text" : "password"}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "100%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 10,
                              outline: "none",
                              backgroundColor:"#f9f9f9"
                            }}
                          />
                          {values.showConfirmPassword ? (
                            <IconButton
                              onClick={() => setFieldValue("showConfirmPassword", false)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <Visibility
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54,
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => setFieldValue("showConfirmPassword", true)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <VisibilityOff
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54,
                                }}
                              />
                            </IconButton>
                          )}
                        </Box>
                        {this.showInputError(errors.confirm_password, touched.confirm_password)}
                        <Button
                          className={"btn"}
                          variant="contained"
                          type="submit"
                          style={{
                            backgroundColor: "#2B6FEC",
                            borderRadius: 16,
                            height: 54,
                            marginBottom: 14,
                            boxShadow: "none",
                            color: "#F7F7FC",
                            fontWeight: 600,
                            fontSize: 16,
                            marginTop: 30,
                          }}
                        >
                          SIGN UP
                        </Button>

                        <Box display="flex" mt="25px" alignItems="center" justifyContent="center">
                          <Typography
                            style={{
                              color: "black",
                              fontWeight: "normal",
                              fontSize: 15,
                              textAlign: "center",
                              marginTop:'1.5rem'
                            }}
                          >
                            Already have an account ?
                          </Typography>
                          <Link
                            href="/EmailAccountLogin"
                            underline="none"
                            style={{
                              fontSize: 15,
                              color: "#FC8434",
                              fontWeight: 500,
                              marginLeft: 1,
                              marginTop:'1.5rem'
                            }}
                          >
                            Login
                          </Link>
                        </Box>

                        <Box className="footer-main-block1 bottomBlock1" style={{backgroundColor:"white",marginTop: '25px'}}>
                  <h6 className="bottom-text" style={{color:'#A0A3BD'}}>POWERED BY</h6>
                  {/* <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" /> */}
                </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            //@ts-ignore
                            window.open("https://www.TenantInt.com", "_blank", "noopener").focus()
                          }
                        >
                          <img src={company_logo} width="125" height="125" />
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: "none", md: "flex" }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
        <Loader loading={this.state.loading} />
        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />

      </>
    );
  }
}
//@ts-ignore
export default withTranslation()(withRouter(ManagerRegistration));
