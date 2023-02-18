import React from "react";
import { withRouter } from "react-router";
import { Box, Button, Link, Grid } from "@material-ui/core";
import ChairmanForgotPasswordController, { Props } from "./ChairmanForgotPasswordController.web";
import OtpInput from "react-otp-input";
import Loader from "../../../components/src/Loader.web";
import { Menu } from "@szhsin/react-menu";
import MenuItem from "@material-ui/core/MenuItem";
import "@szhsin/react-menu/dist/core.css";
import { Tenant_Logo, Building_Logo, Building1, globalIcon } from "../src/assets";
import i18next from "i18next";
import AlertErrorWeb from "../../../components/src/AlertError.web"
class ChairmanForgotPasswordOTP extends ChairmanForgotPasswordController {
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
    const emailMask = localStorage.getItem("emailMask");
    const phoneNumber = localStorage.getItem("phoneNumberMask");
    return (
      <>
        <Box className="login-wrapper" style={{backgroundColor:"white"}}>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="logo-block common-top-padding common-logo-block" display={{ xs: "none", md: "flex" }}>
                  <Link>
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
                <Box className="main-content-block desktop-ui"style={{marginTop: '80px'}}>
                  <Box className="header-left-block header-block">
                    <h1 className="login-h1 bold-text">Enter OTP</h1>
                    <h6>
                      {emailMask ? (
                        <>
                          Please enter the code send to the email
                          <br />
                          address <span className="text">{emailMask}</span>
                        </>
                      ) : (
                        <>
                          Please enter the code send to the phone
                          <br />
                          number <span className="text">{phoneNumber}</span>
                        </>
                      )}
                    </h6>
                  </Box>
                  <Box className="commonForm" >
                    <Box className="formGroup otpBlock">
                      <OtpInput
                        className="formOutlineInput"
                        value={"111111"}
                        onChange={this.handleChange}
                        numInputs={6}
                      />
                    </Box>
                  </Box>
                  <Box className="customButton row-btn">
                    <Button
                      variant="contained"
                      onClick={() => {
                        //@ts-ignore
                        this.verifyOtp();
                      }}
                    >
                      send
                    </Button>
                  </Box>
                  <Box className="passwordRow">
                    <Link className="link">Resend OTP in</Link>
                    <Link className="link">
                      {" "}
                      <span> 00:30</span>
                      <span>Seconds</span>
                    </Link>
                  </Box>
                </Box>
                <Box className="footer-main-block bottomBlock" style={{marginTop: '100px',backgroundColor:"white"}}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols" >
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
export default withRouter(ChairmanForgotPasswordOTP);
