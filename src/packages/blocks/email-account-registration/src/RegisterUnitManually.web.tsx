//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogTitle, DialogActions, FormControl, InputLabel, TextField
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field, ErrorMessage } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web.tsx";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter } from 'react-router';
import { Back_btn, building, Building1, city, Complex, country, Map, ReqHome, search, unit } from "./assets";
import ReactSelect from 'react-select';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from "@material-ui/lab/Autocomplete";



class RegisterUnitManually extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {

    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <div>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
          <img src={Back_btn} onClick={() => window.history.back()} style={{marginTop:'1rem',marginLeft:'0rem'}} />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>
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
          <Grid xs={12} className='flex' justifyContent="center">
                  <img src={Map.default}/>
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
            selectCountry: ' ',
            selectCity: " ",
            selectComplex: " ",
            selectBuilding: " ",
            selectUnit: " ",
          }}
          validationSchema={this.addressSchemaManual()}

          onSubmit={(values) => { console.log('dfdf'); this.setState({ showDialog: true }) }}
        >
          {({ values, touched, errors, isValid, setFieldValue, handleChange }) => (
            <Form translate="yes" className="commonForm">
              <Grid container style={{ margin: '1rem',marginBottom:0, width: '90%' }}>
                <Grid xs={12} className="formGroup customSelect">



                  <FormControl variant="outlined" fullWidth >
                    {/* <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={country} />
                      Country</InputLabel> */}
                      <span className="frmLeftIcons">
                              <img src={country} className="frm-icons" alt="House Icon" />
                            </span>
                    <Select
                            value={values.selectCountry}
                      name='selectCountry'
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCountry", e.target.value) }}
                      label="Country"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#BEBEBE',   paddingLeft:55 }}
                    >

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
              <Grid container style={{ margin: '1rem',marginTop:0, marginBottom:'-1rem', width: '90%' }}>
                <Grid xs={12} className='formGroup customSelect'>
                  <FormControl variant="outlined" fullWidth>

                    {/* <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={city} />
                      City</InputLabel> */}
                      <span className="frmLeftIcons">
                              <img src={city} className="frm-icons" alt="House Icon" />
                            </span>
                    <Select
                      name='selectCity'
                            value={values.selectCity}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectCity", e.target.value) }}
                      label="City"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#BEBEBE',paddingLeft:55 }}
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
              <Box className="commonForm" style={{marginTop:0,marginBottom:0,}}>
                <Box className="formGroup customSelect">
                  <Box
                    className="formInputGrp"
                  >

                    {/* <ReactSelect options={this.state.allComplex} emoji={search} className="hello ReactSelect"  components={{ DropdownIndicator }}  classNamePrefix='filter' style={{ border: 'none',color:'#BEBEBE' }} placeholder="Search Complex" onChange={(e) => { this.handleInputChangeCOm(e); setFieldValue("selectComplex", e.value) }} /> */}
                    <span className="frmLeftIcons" style={{left:'34px',top:'27%'}}>
                              <img src={Complex} className="frm-icons" alt="House Icon" />
                            </span>
                           <Autocomplete
      id="combo-box-demo"
      options={this.state.allComplex}
      getOptionLabel={(option) => option.label}
      style={{ borderRadius: 25, color: "#b5b5b5",paddingLeft:20,width:'89%' }}
      onChange={(e: any,newValue) => {
        this.handleInputChangeCOm(e,newValue);
        setFieldValue("selectComplex", newValue);
      }}
      placeholder="Search Complex"
      renderInput={(params) => <TextField {...params} className='complex-input' placeholder="Search Complex" variant="outlined" />}
    />
                    
                  </Box>
                </Box>
                <ErrorMessage className="text-error" component="Typography" name="selectComplex" />

              </Box>
              <Grid container style={{ margin: '1rem', marginTop:0,marginBottom:'-1.5rem', width: '90%' }}>
                <Grid xs={12} className='formGroup customSelect'>
                  <FormControl variant="outlined" fullWidth>
                    {/* <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={building} />
                      Building</InputLabel> */}
                           <span className="frmLeftIcons">
                              <img src={building} className="frm-icons" alt="House Icon" />
                            </span>
                    <Select
                      name='selectBuilding'
                            value={values.selectBuilding}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectBuilding", e.target.value) }}
                      label="Building"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#BEBEBE',paddingLeft:55 }}
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
              <Grid container style={{ margin: "1rem",marginTop:0,marginBottom:0, width: '90%' }}>
                <Grid xs={12} className='formGroup customSelect'>
                  <FormControl variant="outlined" fullWidth className="formInputGrp" style={{position:'relative'}}>
                    {/* <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={unit} />Unit</InputLabel>
                    <Select
                      name='selectUnit'
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => { this.handleChange(e); setFieldValue("selectUnit", e.target.value) }}
                      label="Unit"
                      style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.allUnit && this.state.allUnit.map((item) =>
                        <MenuItem key={item.id} value={item}>{item.apartment_name}</MenuItem>

                      )
                      }

                    </Select> */}
                     <span className="frmLeftIcons">
                              <img src={unit} className="frm-icons" alt="House Icon" />
                            </span>
                    <Field
                      name="selectUnit"
                            value={values.selectUnit}
                      placeholder={"Enter Unit"}
                      className="formInput1"
                      style={{border:0,paddingLeft:'15px',color:'#BEBEBE',paddingLeft:55,marginTop:9,paddingBottom:22,width:'100%'}}
                            value={this.state.selectUnit}
                            onChange={(e) => { this.handleChange2(e); setFieldValue("selectUnit", e.target.value) }}
                    />
                    {/* <span className="frmLeftIcons1">

                      <img src={unit} />
                    </span> */}
                  </FormControl>
                  <ErrorMessage className="text-error" component="Typography" name="selectUnit" />

                </Grid>
              </Grid>
              <Box className="customButton" style={{width:'90%',margin:'1rem'}} >
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
            <Box className="diloag-header" style={{ flexDirection: 'column',border:'none' }}>
              <img src={ReqHome} className="tenet-logo" alt="" />
              <DialogTitle className="alert-dialog-title1 bold-text" id="alert-dialog-title" style={{ overflow: 'visible', width: 'auto',fontSize:20  }}>
                sure want to register this unit?
              </DialogTitle>
              <p style={{paddingTop:20}}>Are you sure that you want to register the unit {this.state.selectUnit}  of {this.state.selectBuilding.name}?</p>
            </Box>
            <Box className="dialog-footer desktop-ui" style={{display:'flex',justifyContent:'center'}}>
              <DialogActions
               className="customButton">
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
    this.getCountry();
  }
}
export default withRouter(RegisterUnitManually)

const DropdownIndicator=()=>{
  return <svg className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
}