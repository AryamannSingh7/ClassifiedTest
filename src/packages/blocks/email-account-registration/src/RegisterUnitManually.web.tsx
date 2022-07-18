//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogTitle, DialogActions
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter } from 'react-router';
import { building, search, unit } from "./assets";
import Select from 'react-select'





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
                {this.state.email}
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
            <Box className="commonForm">
              <Box className="formGroup">
                <Box
                  className="formInputGrp"
                >

                  <Select options={this.state.allComplex} className="formInput" style={{border:'none'}}  placeholder="Search Complex" onChange={this.handleInputChange} />

                  <span className="frmLeftIcons" style={{top:'1.5rem'}}>
                    <img src={search} />
                  </span>
                </Box>
      </Box>
    </Box>


  </Grid>
</Grid>




        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <Formik initialValues={{
             unit:'',
             building:'',



            }}
              onSubmit={(values) => { this.setState({ showDialog: true,values:values })}}
            >
              {({ values,
                errors,
                touched,
                isValid, handleChange,
                setFieldValue }) => (
                <Form translate="yes" className=''>
                  <Box display="flex" flexDirection="column">
                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                      <img src={building} />

                      <Field
                        name="building"
                        placeholder={"Enter building"}
                        style={{
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
                        }}
                      />
                    </Box>
                    {errors.building && touched.building ? (
                      <Typography
                        style={{
                          color: "#F14E24",
                          fontFamily: "Poppins",
                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.building}
                      </Typography>
                    ) : null}
                    {this.state.error ? (
                      <Typography
                        style={{
                          color: "#F14E24",
                          fontFamily: "Poppins",
                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {this.state.error}
                      </Typography>
                    ) : null}

                    {/* email */}
                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                      <img src={unit} />


                      <Field
                        name="unit"
                        placeholder={"Enter Unit"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",
                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 21,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.unit && touched.unit ? (
                      <Typography
                        style={{
                          color: "#F14E24",
                          fontFamily: "Poppins",
                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.unit}
                      </Typography>
                    ) : null}
                    {this.state.error ? (
                      <Typography
                        style={{
                          color: "#F14E24",
                          fontFamily: "Poppins",
                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {this.state.error}
                      </Typography>
                    ) : null}




                    <Button
                      className={'btn'}
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
                        marginTop: 30
                      }}
                    >
                      SEND REGISTRATION REQUEST
                    </Button>



                  </Box>
                </Form>
              )}
            </Formik>
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
            <Box className="diloag-header">
              <img src={building} className="tenet-logo" alt="" />
              <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                Are you sure you want to register unit?
              </DialogTitle>
              <p>Are you sure that you want to delete the regestration request for the unit ({this.state.selectUnit}) of {this.state.selectBuilding}.</p>
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
