import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  TextareaAutosize,
  InputAdornment,
  TextField
} from "@material-ui/core";


//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import FacilityReservationController, { Props } from "./FacilityReservationController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
//Customizable Area End

//resorces
import {
  Tenant_Logo,
  // Upload_Icon,
  // Clipboard_Icon,
  // Warning_Icon,
  House_Icon,
  // Box_Icon,
  Building1,
  LEADING_ICON,
  // Checkmark_Icon,
  // Error_Icon,
  TimeIcon
} from "../src/assets";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import moment from "moment";

class CreateFacilityReservation extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    //@ts-ignore
    const id = this.props.history?.location?.id;
    if (id) {
      this.getFacilityReservationDetailsById(id);
    }
    //  else {
    //   this.props.history.push("/FacilityReservationDetails")
    //  }
    this.getMyApartmentList();
    // this.getIncidentRelated();
  }
  render() {
    const { navigation } = this.props;
    const id = this.state?.getFacilityReservationDetails?.id;
    const attributes = this.state?.getFacilityReservationDetails?.attributes;
    // console.log("commonAreaData=============>", this.state?.commonAreaData)
    console.log("attributes?.date =============>", attributes?.start_time, attributes?.end_time)
    console.log("moment(attributes?.date,'DD-MMM-YYYY').format('YYYY-MM-DD')=============>", moment(attributes?.date, 'DD-MMM-YYYY').format('YYYY-MM-DD'))
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Update Facility Reservation</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui create-reservation-wrapper">
                  <Formik
                    initialValues={{
                      areaReserve: attributes?.common_area?.id || " ",
                      buildingName: attributes?.building?.id || " ",
                      date: moment(attributes?.date, 'DD-MMM-YYYY').format('YYYY-MM-DD') || "",
                      timeFrom: attributes?.start_time || "",
                      timeTo: attributes?.end_time || "",
                      id: id || ""
                    }}
                    enableReinitialize
                    validationSchema={this.CreateFacilityReservationSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      id ? (
                        this.updateFacilityReservation(values)
                      ) :
                        (
                          this.CreateFacilityReservation(values)
                        )
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm CreateClassifiedFrm">
                        <h5 className="frm-title incident-preview-title"></h5>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={LEADING_ICON} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                              name="buildingName"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{ paddingLeft: 50, marginTop: -3 }}
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("buildingName", e.target.value)
                              }}
                              value={values.buildingName}
                            >
                              <MenuItem disabled value=" ">
                                Building Name
                              </MenuItem>
                              {
                                this.state?.myApartmentList?.map((val: any, index: any) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.id}
                                  >
                                    {`${val?.name}`}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="buildingName" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={House_Icon} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                              name="areaReserve"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{ paddingLeft: 50 }}
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("areaReserve", e.target.value)
                              }}
                              value={values.areaReserve}
                            >
                              <MenuItem disabled value=" ">
                                Area to Reserve
                              </MenuItem>
                              {
                                this.state?.commonAreaData?.map((val: any, index: any) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.id}
                                  >
                                    {val?.attributes?.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="areaReserve" />
                          </FormControl>
                        </Box>
                        <Box className="DateSection">
                          <Grid container>
                            <Grid xs={12}>
                              <Box className="formGroup classifiedFormGroup">
                                <TextField
                                  label="date" variant="outlined"
                                  style={{ width: "100%", borderRadius: "25px", border: "1px solid #e9dede" }}
                                  type="date" name="date" fullWidth
                                  id="SurveyQuestion"
                                  format='DD/MM/YYYY'
                                  value={values?.date}
                                  onChange={handleChange}
                                  InputProps={{
                                    // min: "2019-01-24",
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {/* <DateRangeOutlinedIcon /> */}
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {/* <DateRangeOutlinedIcon /> */}
                                      </InputAdornment>
                                    ),
                                  }
                                  }
                                />
                                <ErrorMessage className="text-error" component="Typography" name="startDate" />
                              </Box>
                            </Grid>
                          </Grid>
                        </Box >
                        <Grid container>
                          <Grid xs={6} >
                            <Box className="formGroup classifiedFormGroup" >
                              <Field name="timeFrom" type="time" placeholder="From" className="formInput" format="hh:mm" />
                              <span className="frmLeftIcons">
                                <img src={TimeIcon} className="frm-icons" alt="Warning Icon" />
                              </span>
                              <ErrorMessage className="text-error" component="Typography" name="timeFrom" />
                            </Box>
                          </Grid>
                          <Grid xs={6}>
                            <Box className="formGroup">
                              <Field name="timeTo" type="time" placeholder="To" className="formInput formInputBox" format="hh:mm" />
                              <span className="frmLeftIcons">
                                <img src={TimeIcon} className="frm-icons" alt="Warning Icon" />
                              </span>
                              <ErrorMessage className="text-error" component="Typography" name="timeTo" />
                            </Box>
                          </Grid>
                          <Box className="reservationDec">
                            <h5>Description:</h5>
                            <p>
                              You can use garden for kids party, family gathering, building event etc. You are not allowed to have meals in the garden.
                            </p>
                            <br></br> <p>You will be charged <span>SR 50 per hour</span> for garden facility.</p>
                          </Box>
                        </Grid>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">update request</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
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
    )
  }
}

export default withRouter(CreateFacilityReservation)
