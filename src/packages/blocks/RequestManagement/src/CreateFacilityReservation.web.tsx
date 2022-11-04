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

class CreateFacilityReservation extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
    this.getMyApartmentList();
    this.getCommonArea();
   // this.getIncidentRelated();
  }
  render() {
    const { navigation } = this.props;
    console.log(" getMyApartmentList=============>",this.state?.myApartmentList)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Facility Reservation</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Formik
                    initialValues={{
                      areaReserve: " ",
                      buildingName:" ",
                      date : "",
                      timeFrom:"",
                      timeTo:"",
                    }}
                    validationSchema={this.CreateFacilityReservationSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {console.log("values==========>",values) 
                   // this. CreateFacilityReservation(values)
                  }}
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
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
                              style={{paddingLeft:50,marginTop:-3}}
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("buildingName", e.target.value)
                              }}
                              value={values.buildingName}
                            >
                              <MenuItem disabled value=" ">
                              Building Name
                              </MenuItem>
                              {
                                this.state?.myApartmentList?.map((val:any, index:any) => (
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
                                this.state?.commonAreaData?.map((val :any, index:any) => (
                                  <MenuItem
                                    key={index}
                                    value={val}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="areaReserve" />
                          </FormControl>
                        </Box>

                         <Box className="DateSection">
                          <Grid container>
                            <Grid xs={6}>
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
                                <Grid xs={6}>
                                  <Box className="formGroup classifiedFormGroup">
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
                                <p>Description: You can use garden for kids party, family gathering, building event etc. You are not allowed to have meals in the garden. </p>
                                <p>You will be charged SR 50 per hour for garden facility.</p>
                              </Grid>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">submit</Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
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
      </>
    )
  }
}

export default withRouter(CreateFacilityReservation)
