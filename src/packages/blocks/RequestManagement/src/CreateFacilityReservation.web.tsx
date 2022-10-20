import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  TextareaAutosize
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
//Customizable Area End

//resorces
import {
  Tenant_Logo,
  // Upload_Icon,
  // Clipboard_Icon,
  // Warning_Icon,
  // House_Icon,
  // Box_Icon,
   Building1,
  // Checkmark_Icon,
  // Error_Icon
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
    this.getIncidentRelated();
  }
  render() {
    const { navigation } = this.props;

    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Add New Incident</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Formik
                    initialValues={{
                      commonArea: " ",
                      myApartment: " ",
                      date : "",
                      timeFrom:"",
                      timeTo:"",
                    }}
                    validationSchema={this.CreateFacilityReservationSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => this.onSubmit(values)}
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <h5 className="frm-title incident-preview-title">Incident Details</h5>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={"#"} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                              name="myApartment"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{paddingLeft:50,marginTop:-3}}
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("myApartment", e.target.value)
                              }}
                              value={values.myApartment}
                            >
                              <MenuItem disabled value=" ">
                                Select Unit
                              </MenuItem>
                              {
                                this.state?.myApartmentList?.map((val:any, index:any) => (
                                  <MenuItem
                                    key={index}
                                    value={val}
                                  >
                                    {`${val?.attributes?.building_management?.name} ${val?.attributes?.apartment_name}`}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="myApartment" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={"#"} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                              name="commonArea"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{ paddingLeft: 50 }}
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("commonArea", e.target.value)
                              }}
                              value={values.commonArea}
                            >
                              <MenuItem disabled value=" ">
                                Common Area
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
                            <ErrorMessage className="text-error" component="Typography" name="commonArea" />
                          </FormControl>
                        </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">preview</Button>
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
