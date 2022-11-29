import * as React from "react";
// custom components
import { Button, Grid, Box } from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import { Building1, manager, owner, resident_owner, tenet } from "./assets";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from "react-i18next";

class SelectType extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: "unset" }}>
            <div style={{ margin: "auto" }}>
              <Grid container className="main-content-block">
                <Grid xs={12} style={{ marginBottom: "35px" }}>
                  <ArrowBackIcon onClick={() => window.history.back()} style={{ fontSize: "35px" }} />
                </Grid>
              </Grid>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <p className="text-left" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                    Please select your type
                  </p>
                </Grid>
              </Grid>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <p className="text-left">Please select appropriate user type</p>
                </Grid>
              </Grid>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type " + (this.state.userType == "Owner Resident" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                  >
                    <img src={resident_owner} />
                    <Box className={"middle-section"}>
                      <label
                        //@ts-ignore
                        for="radCreateMode"
                        className={"title" + (this.state.userType == "Owner Resident" ? " active-type" : "")}
                        style={{ padding: "20px 20px 0px 0px" }}
                      >
                        Resident Owner
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Owner Resident" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode"
                      >
                        I am the owner of the unit and i am living in it
                      </label>
                    </Box>

                    <input
                      type="radio"
                      id="radCreateMode"
                      name="type"
                      value="Owner Resident"
                      onChange={(e: any) => this.changeType(e.target.value)}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type " + (this.state.userType == "Tenant" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                  >
                    <img src={tenet} />

                    <Box className="middle-section">
                      <label
                        //@ts-ignore
                        for="radCreateMode2"
                        className={"title" + (this.state.userType == "Tenant" ? " active-type" : "")}
                        style={{ padding: "20px 20px 0px 0px" }}
                      >
                        Tenant
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Tenant" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode2"
                      >
                        I am registering as somone who rented a unit
                      </label>
                    </Box>

                    <input
                      type="radio"
                      id="radCreateMode2"
                      name="type"
                      value="Tenant"
                      onChange={(e) => this.changeType(e.target.value)}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type" + (this.state.userType == "Owner" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                  >
                    <img src={owner} />

                    <Box className="middle-section">
                      <label
                        //@ts-ignore
                        for="radCreateMode5"
                        className={"title" + (this.state.userType == "Owner" ? " active-type" : "")}
                        style={{ padding: "20px 20px 0px 0px" }}
                      >
                        Owner
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Owner" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode5"
                      >
                        I am the owner of the unit, but I am not living inside it
                      </label>
                    </Box>

                    <input
                      type="radio"
                      id="radCreateMode5"
                      name="type"
                      value="Owner"
                      onChange={(e) => this.changeType(e.target.value)}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type" + (this.state.userType == "Property Manager" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                  >
                    <img src={manager} />

                    <Box className="middle-section">
                      <label
                        //@ts-ignore
                        for="radCreateMode3"
                        className={"title" + (this.state.userType == "Property Manager" ? " active-type" : "")}
                        style={{ padding: "20px 20px 0px 0px" }}
                      >
                        Property Manager
                      </label>
                      <br />
                      <label
                        //@ts-ignore
                        for="radCreateMode3"
                        className={"para" + (this.state.userType == "Property Manager" ? " active-para" : "")}
                      >
                        I am managing a property on behalf of an owner
                      </label>
                    </Box>

                    <input
                      type="radio"
                      id="radCreateMode3"
                      name="type"
                      value="Property Manager"
                      onChange={(e) => this.changeType(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={12}>
                  <Button
                    fullWidth={true}
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
                    onClick={this.updateTypeOwner}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Loader loading={this.state.loading} />
            </div>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: "none", md: "flex" }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
//@ts-ignore
export default withTranslation()(withRouter(SelectType));
