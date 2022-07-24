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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import IncidentController, { Props } from "./IncidentController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Customizable Area End

//resorces
import { Tenant_Logo, Upload_Icon, Building_Logo, Landing_Banner, Building1 } from "../src/assets";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';

class CreateIncident extends IncidentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box display={{ xs: 'flex', md: 'none' }} className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Add New Incident</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    //validationSchema={this.EmailSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      this.checkUser(values)
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                        <h4 className="frm-title">Incident Details</h4>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons"><LockOpenIcon /></span>
                            {/* <InputLabel id="demo-simple-select-outlined-label">Select User Type</InputLabel>  */}
                            <Select
                              name="userType"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              // label="Select User Type"
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("userType", e.target.value)
                              }}
                              value={values.userType}
                            >
                              <MenuItem disabled value=" ">
                                Select User Type
                              </MenuItem>
                              {
                                this.state?.userTypeData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.name}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="userType" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons"><LockOpenIcon /></span>
                            {/* <InputLabel id="demo-simple-select-outlined-label">Select User Type</InputLabel>  */}
                            <Select
                              name="userType"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              // label="Select User Type"
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("userType", e.target.value)
                              }}
                              value={values.userType}
                            >
                              <MenuItem disabled value=" ">
                                Select User Type
                              </MenuItem>
                              {
                                this.state?.userTypeData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.name}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="userType" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup">
                          <Field name="incidentTitle" type="text" placeholder="Incident Title" className="formInput" />
                          <span className="frmLeftIcons"><MailOutlineIcon /></span>
                        </Box>
                        <Box className="formGroup">
                          <Field name="incidentDes" type="text" placeholder="Add description" className="formInput" />
                          <span className="frmLeftIcons"><MailOutlineIcon /></span>
                        </Box>
                        <Box className="formGroup customFileupload">
                          <Button
                            variant="contained"
                            component="label"
                          >
                            <img src={Upload_Icon} className="upload-icon" alt="upload-icon" />
                            Add Image / Video
                            <input
                              type="file"
                              hidden
                            />
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                  <Box className="customButton">
                    <Button variant="contained" type="submit">preview</Button>
                  </Box>
                </Box>
                {/* desktop footer block */}
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(CreateIncident)