//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogTitle, DialogActions, FormControl, InputLabel
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field, ErrorMessage } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web.tsx";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter } from 'react-router';
import { building, search, unit } from "./assets";
import ReactSelect from 'react-select';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class RegisterUnitManually extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    console.log(JSON.parse(localStorage.getItem('searchComplex')))
    let selectComplex = JSON.parse(localStorage.getItem('searchComplex'))
    return (

      <>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '2.5rem' }}>
              Register the Unit Manually

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ marginBottom: '1.5rem' }}>
              Please select the location of the building


              <span style={{ color: '#DD946A' }}>

              </span>

            </p>
          </Grid>
        </Grid>

<Grid container>
  <Grid xs={12}>
            {/* <Button onClick={()=>this.props.history.push('/searchcomplex')} style={{
              border: "none",
              height: "100%",
              width: "80%",
              color: "rgba(0, 0, 0, 0.6)",
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: 16,
              marginRight: 10,
              marginLeft: 21,
              outline: "none"
}}>
      <img src={search}/>
      <span>

                {selectComplex? selectComplex.label: 'Search Complex'}
      </span>
    </Button> */}



  </Grid>
</Grid>
        <Formik
          initialValues={{
            // selectCountry: '',
            // selectCity: "",
            selectComplex: "",
            selectBuilding: "",
            selectUnit: "",
          }}
          validationSchema={this.addressSchemaManual()}

          onSubmit={(values) => { console.log('dfdf'); this.setState({ showDialog: true }) }}
        >
          {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
            <Form translate="yes" className="commonForm">
              {/* <Grid container style={{ margin: '1rem', width: '90%' }}>
                <Grid xs={12}>



                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={country} />
                      Country</InputLabel>
                    <Select

                      name='selectCountry'
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCountry", e.target.value) }}
                      label="Country"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >

                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.allContries && this.state.allContries.map((item) =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectCountry" />
                </Grid>
              </Grid> */}
              {/* <Grid container style={{ margin: '1rem', width: '90%' }}>
                <Grid xs={12}>
                  <FormControl variant="outlined" fullWidth>

                    <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={city} />
                      City</InputLabel>
                    <Select
                      name='selectCity'
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCity", e.target.value) }}
                      label="City"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value="f">
                        <em>None</em>
                      </MenuItem>
                      {this.state.allCity && this.state.allCity.map((item) =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>

                      )
                      }

                    </Select>
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectCity" />

                </Grid>
              </Grid> */}
              <Box className="commonForm">
                <Box className="formGroup">
                  <Box
                    className="formInputGrp"
                  >

                    <ReactSelect options={this.state.allComplex} className="formInput" style={{ border: 'none' }} placeholder="Search Complex" onChange={(e) => { this.handleInputChangeCOm(e); setFieldValue("selectComplex", e.value) }} />

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
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectBuilding", e.target.value) }}
                      label="Building"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
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
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectUnit", e.target.value) }}
                      label="Unit"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value="f">
                        <em>None</em>
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
              <Box className="customButton" >
                <Button variant="contained" type="submit">SEND REGISTRATION REQUEST</Button>
              </Box>

            </Form>
          )}
        </Formik>




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
            <Box className="diloag-header">
              <img src={building} className="tenet-logo" alt="" />
              <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                Are you sure you want to register unit?
              </DialogTitle>
              <p>Are you sure that you want to delete the regestration request for the unit ({this.state.selectUnit.apartment_name}) of {this.state.selectBuilding.name}.</p>
            </Box>
            <Box className="dialog-footer desktop-ui">
              <DialogActions className="customButton">
                <Button variant="contained" onClick={() => this.createRequestManual(this.state.values)} >
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
  componentDidMount(): Promise<void> {
    this.getComplex();
  }
}
export default withRouter(RegisterUnitManually)
