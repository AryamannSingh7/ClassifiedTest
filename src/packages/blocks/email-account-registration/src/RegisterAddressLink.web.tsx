// @ts-ignore
// @ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, ListItemIcon, ListItemText, DialogContent, Dialog, DialogTitle, DialogActions
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field, ErrorMessage } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web.tsx";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactSelect from 'react-select';
import InboxIcon from '@material-ui/icons/Inbox';
import { building, Building1, city, country, modalbuilding, search, unit } from "./assets";
import { withRouter } from 'react-router';



class RegisterAddressLinkLink extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  componentDidMount() {

    this.getCountry()

  }
  // Customizable Area End
  render() {
    return (
      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <div style={{ margin: 'auto' }}>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Linking a Unit

            </p>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left">
              Please select the appropriate details of the unit
            </p>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            selectCountry: ' ',
            selectCity: " ",
            selectComplex: " ",
            selectBuilding: " ",
            selectUnit: " ",
          }}
          validationSchema={this.addressSchema()}
          validateOnMount={true}
          onSubmit={(values) => { console.log('dfdf'); this.setState({ showDialog: true }) }}
        >
          {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
            <Form translate="yes" className="commonForm">
              <Grid container style={{ margin: '1rem', width: '90%' }}>
                      <Grid xs={12} className="formGroup1 customSelect">



                  <FormControl variant="outlined" fullWidth >
                    <InputLabel data-shrink="false"  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={country} />
                      Country</InputLabel>
                    <Select
                      value={values.selectCountry}
                      name='selectCountry'
                            style={{ padding: '18.5px 14px'}}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCountry", e.target.value) }}
                      label="Country"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      {/* <MenuItem>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  </MenuItem> */}
                      <MenuItem value=" ">
                              Select Country
                      </MenuItem>
                      {this.state.allContries && this.state.allContries.map((item) =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectCountry" />
                </Grid>
              </Grid>
              <Grid container style={{ margin: '1rem', width: '90%' }}>
                <Grid xs={12}>
                  <FormControl variant="outlined" fullWidth>

                    <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={city} />
                      City</InputLabel>
                    <Select
                      name='selectCity'
                            value={values.selectCity}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCity", e.target.value) }}
                      label="City"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value=" ">
                              Select city
                      </MenuItem>
                      {this.state.allCity && this.state.allCity.map((item) =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectCity" />

                </Grid>
              </Grid>
              <Box className="commonForm">
                <Box className="formGroup">
                  <Box
                    className="formInputGrp"
                  >

                    <ReactSelect options={this.state.allComplex} className="formInput2 ReactSelect" style={{ border: 'none' }} placeholder="Search Complex" onChange={(e) => { this.handleInputChangeCOm(e); setFieldValue("selectComplex", e.value) }} />

                    <span className="frmLeftIcons" style={{ top: '1.5rem' }}>
                      <img src={search} />
                    </span>
                  </Box>
                </Box>
                <ErrorMessage className="text-error" component="Typography" name="selectComplex" />

              </Box>
              <Grid container style={{ margin: '1rem', width: '90%' }}>
                <Grid xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={building} />
                      Building</InputLabel>
                    <Select
                      name='selectBuilding'
                            value={values.selectBuilding}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectBuilding", e.target.value) }}
                      label="Building"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value=" ">
                              Select building
                      </MenuItem>
                      {this.state.allBuilding && this.state.allBuilding.map((item) =>
                        <MenuItem key={item.id} value={item}>{item.name}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectBuilding" />

                </Grid>
              </Grid>
              <Grid container style={{ margin: '1rem', width: '90%' }}>
                <Grid xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={unit} />Unit</InputLabel>
                    <Select
                      name='selectUnit'
                            value={values.selectUnit}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectUnit", e.target.value) }}
                      label="Unit"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value=" ">
                              Select unit
                      </MenuItem>
                      {this.state.allUnit && this.state.allUnit.map((item) =>
                        <MenuItem key={item.id} value={item}>{item.apartment_name}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectUnit" />

                </Grid>
              </Grid>
                    <Box className="customButton" style={{ width: '90%', margin: '1rem' }}>
                      <Button variant="contained" type="submit">SEND REGISTRATION REQUEST</Button>
              </Box>

            </Form>
          )}
        </Formik>
              </div>
              </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
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
              borderRadius: '15px',
            },
          }}
        >
          <Box className="diloag-body">
            <Box className="diloag-header 1" style={{flexDirection:'column'}}>
              <img src={building} className="tenet-logo" alt="" />
              <DialogTitle className="alert-dialog-title1" id="alert-dialog-title" style={{overflow:'visible',width:'auto'}}>
               Are you sure  want to register this unit?
              </DialogTitle>
              <p>Are you sure that you want to register  the unit {this.state.selectUnit.apartment_name} of {this.state.selectBuilding.name} as a unit that you own or manage?</p>
            </Box>
            <Box className="dialog-footer desktop-ui" style={{ display: 'flex', justifyContent: 'center' }}>
              <DialogActions className="customButton" >
                <Button variant="contained" onClick={() => this.createRequest()} >
                  Yes Register
                </Button>
                <Button onClick={() => this.setState({ showDialog: false })} variant='text'>
                  No, Don’t Regsiter
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </>
    )
  }
}
export default withRouter(RegisterAddressLinkLink)
