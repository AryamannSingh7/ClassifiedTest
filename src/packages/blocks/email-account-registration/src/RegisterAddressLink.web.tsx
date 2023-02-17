import * as React from "react";
// custom components
import { Button, Grid, Box, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Formik, Form, ErrorMessage } from "formik";
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ReactSelect from "react-select";
import { Back_btn, building, Building1, city, country, ReqHome, unit } from "./assets";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";

class RegisterAddressLinkLink extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getCountry();
  }

  // Customizable Area End
  render() {
    return (
      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: "unset" }}>
            <div>
              <Grid container style={{ margin: "1rem", width: "90%",marginBottom:0 }}>
                <Grid xs={12}>
                <img src={Back_btn} onClick={() => window.history.back()} style={{marginTop:'1rem',marginLeft:'0rem'}} />
                </Grid>
              </Grid>

              <Grid container style={{ margin: "1rem", width: "90%" }}>
                <Grid xs={12}>
                  <p className="text-left" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    Linking a Unit
                  </p>
                </Grid>
              </Grid>
              <Grid container style={{ margin: "1rem", width: "90%",marginTop:'0.5rem' }}>
                <Grid xs={12}>
                  <p className="text-left">Please select the appropriate details of the unit</p>
                </Grid>
              </Grid>
              <Formik
                initialValues={{
                  selectCountry: " ",
                  selectCity: " ",
                  selectComplex: " ",
                  selectBuilding: " ",
                  selectUnit: " ",
                }}
                validationSchema={this.addressSchema()}
                validateOnMount={true}
                onSubmit={(values) => this.setState({ showDialog: true })}
              >
                {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                  <Form translate="yes" className="commonForm" style={{ height: "76vh", position: "relative" }}>
                    <Grid container style={{ margin: "1rem", width: "90%" }}>
                      <Grid xs={12} className="formGroup1 customSelect">
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel
                            data-shrink="false"
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                          >
                            <img src={country} />
                            Country
                          </InputLabel>
                          <Select
                            value={values.selectCountry}
                            name="selectCountry"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => {
                              this.handleChange(e);
                              setFieldValue("selectCountry", e.target.value);
                            }}
                            label="Country"
                            style={{
                              borderRadius: 25,
                              border: "0px solid #e9dede",
                              color: "#b5b5b5",
                            }}
                          >
                            {/* <MenuItem>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  </MenuItem> */}
                            <MenuItem value=" ">Select Country</MenuItem>
                            {this.state.allContries &&
                              this.state.allContries.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage className="text-error" component="Typography" name="selectCountry" />
                      </Grid>
                    </Grid>
                    <Grid container style={{ margin: "1rem", width: "90%" }}>
                      <Grid xs={12}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel
                            id="demo-simple-select-outlined-label"
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                          >
                            <img src={city} />
                            City
                          </InputLabel>
                          <Select
                            name="selectCity"
                            value={values.selectCity}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => {
                              this.handleChange(e);
                              setFieldValue("selectCity", e.target.value);
                            }}
                            label="City"
                            style={{ borderRadius: 25, border: "0px solid #e9dede", color: "#b5b5b5" }}
                          >
                            <MenuItem value=" ">Select city</MenuItem>
                            {this.state.allCity &&
                              this.state.allCity.map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage className="text-error" component="Typography" name="selectCity" />
                      </Grid>
                    </Grid>
                    <Box className="commonForm">
                      <Box className="formGroup">
                        <Box className="formInputGrp">
                          <ReactSelect
                            options={this.state.allComplex}
                            className="hello"
                            classNamePrefix="filter"
                            style={{ border: "none" }}
                            components={{ DropdownIndicator }}
                            placeholder="Search Complex"
                            onChange={(e: any) => {
                              this.handleInputChangeCOm(e);
                              setFieldValue("selectComplex", e.value);
                            }}
                          />

                          <span className="frmLeftIcons" style={{ top: "1.5rem" }}>
                            {/* <img src={search} /> */}
                          </span>
                        </Box>
                      </Box>
                      <ErrorMessage className="text-error" component="Typography" name="selectComplex" />
                    </Box>
                    <Grid container style={{ margin: "1rem", width: "90%" }}>
                      <Grid xs={12}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel
                            id="demo-simple-select-outlined-label"
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                          >
                            <img src={building} />
                            Building
                          </InputLabel>
                          <Select
                            name="selectBuilding"
                            value={values.selectBuilding}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => {
                              this.handleChange(e);
                              setFieldValue("selectBuilding", e.target.value);
                            }}
                            label="Building"
                            style={{ borderRadius: 25, border: "0px solid #e9dede", color: "#b5b5b5" }}
                          >
                            <MenuItem value=" ">Select building</MenuItem>
                            {this.state.allBuilding &&
                              this.state.allBuilding.map((item: any) => (
                                <MenuItem key={item.id} value={item}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage className="text-error" component="Typography" name="selectBuilding" />
                      </Grid>
                    </Grid>
                    <Grid container style={{ margin: "1rem", width: "90%" }}>
                      <Grid xs={12}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel
                            id="demo-simple-select-outlined-label"
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                          >
                            <img src={unit} />
                            Unit
                          </InputLabel>
                          <Select
                            name="selectUnit"
                            value={values.selectUnit}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => {
                              this.handleChange(e);
                              setFieldValue("selectUnit", e.target.value);
                            }}
                            label="Unit"
                            style={{ borderRadius: 25, border: "0px solid #e9dede", color: "#b5b5b5" }}
                          >
                            <MenuItem value=" ">Select unit</MenuItem>
                            {this.state.allUnit &&
                              this.state.allUnit.map((item: any) => (
                                <MenuItem key={item.id} value={item}>
                                  {item.apartment_name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage className="text-error" component="Typography" name="selectUnit" />
                      </Grid>
                    </Grid>
                    <Box
                      className="customButton"
                      style={{ width: "90%", margin: "1rem", position: "absolute", bottom: "0" }}
                    >
                      <Button variant="contained" type="submit">
                        SEND REGISTRATION REQUEST
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: "none", md: "flex" }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>

        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: "15px",
            },
          }}
        >
          <Box className="diloag-body">
            <Box className="diloag-header 1" style={{ flexDirection: "column",border:'none' }}>
              <img src={ReqHome} className="tenet-logo" alt="" />
              <DialogTitle
                className="alert-dialog-title1 bold-text"
                id="alert-dialog-title"
                style={{ overflow: "visible", width: "auto",fontSize:20 }}
              >
             sure want to register this unit?
              </DialogTitle>
              <p style={{paddingTop:20}}>
                Are you sure that you want to register the unit{" "}
                {this.state.selectUnit && this.state.selectUnit.apartment_name} of{" "}
                {this.state.selectBuilding && this.state.selectBuilding.name} as a unit that you own or manage?
              </p>
            </Box>
            <Box className="dialog-footer desktop-ui" style={{ display: "flex", justifyContent: "center" }}>
              <DialogActions className="customButton">
                <Button
                  variant="contained"
                  onClick={() => {
                    sessionStorage.clear();
                    this.createRequest();
                  }}
                >
                  Yes Register
                </Button>
                <Button onClick={() => this.setState({ showDialog: false })} variant="text">
                  No, Don’t Regsiter
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </>
    );
  }
}
//@ts-ignore
export default withTranslation()(withRouter(RegisterAddressLinkLink));

const DropdownIndicator=()=>{
  return <svg className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
}