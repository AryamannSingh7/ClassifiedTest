//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, ListCopy, owner, palette, resident_owner, tenet, upload, user } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";






class EditVeichleList extends VeichleListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this.getCar()

  }

  render() {
    let item = JSON.parse(localStorage.getItem('selectCar'))
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignContent: 'center' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  Edit Vehicle Details
                </p>
              </Grid>
            </Grid>
            <div style={{ margin: 'auto' }}>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: item.attributes.owner_name,
                    plateNumber: item.attributes.plate_number,
                    carManufacturer: item.attributes.company_name,
                    carModle: item.attributes.model_number,
                    carColor: item.attributes.color,
                    bannerUrl: item.attributes.registration_card_copy.url,
                    banner:''



                  }}
                    validationSchema={this.addVehicleSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => { this.updateVehicle(values) }}
                  >
                    {({ values,
                      errors,
                      touched,
                      isValid, handleChange,
                      setFieldValue, setFieldError }) => (
                      <Form className="commonForm" translate="yes" >
                        <Box className='formGroup'>
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="full_name"
                              placeholder={"Owner Name"}

                            />
                            <span className="frmLeftIcons">
                              <img src={user} />
                            </span>
                          </Box>

                          {errors.full_name && touched.full_name ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="full_name" />
                            </Typography>
                          ) : null}
                          {/* {this.state.error ? (
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
                  ) : null} */}

                          {/* plate number */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              name="plateNumber"
                              placeholder={"Plate Number"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={ListCopy} />
                            </span>
                          </Box>
                          {errors.plateNumber && touched.plateNumber ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="plateNumber" />
                            </Typography>
                          ) : null}
                          {/* {this.state.error ? (
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
                  ) : null} */}

                          {/* car manufacture */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="carManufacturer"
                              placeholder={"Car Manufacturer "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.carManufacturer && touched.carManufacturer ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="carManufacturer" />
                            </Typography>
                          ) : null}


                          {/* car model */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="carModle"
                              placeholder={"Car Model  "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.carModle && touched.carModle ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="carModle" />
                            </Typography>
                          ) : null}


                          {/* car color */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="carColor"
                              placeholder={"Car Color"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={palette} />
                            </span>
                          </Box>
                          {errors.carColor && touched.carColor ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="carColor" />
                            </Typography>
                          ) : null}


                          <Box style={{display:'flex',justifyContent:'center',flexDirection:'column',
                        alignItems:'center',
                        padding:'4rem',
                            border:'1px dotted #00000036',
                            marginBottom:10,
                            backgroundSize:'cover',
                            borderRadius: 15, backgroundImage: values.bannerUrl
                              ? `url(${values.bannerUrl})`
                              : ""
}}>
                            <img src={upload} width='25' height='25'/>
                            <label for="file1"
                            style={{ color:'rgb(33 33 33 / 33%)'}}>
                              Upload car registration image
                            </label>
                            <input
                            id="file1"
                              type="file"
                              onChange={(e: any) => {
                                this.handleSelectBanner(
                                  e,
                                  setFieldValue,
                                  setFieldError
                                );
                              }}
                              style={{
                                position: "absolute",
                                zIndex: 2,
                                cursor: "pointer",
                                opacity: 0
                              }}
                              accept="image/png, image/jpeg, image/jpg"
                            />
                          </Box>
                          {errors.banner && touched.banner ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="banner" />
                            </Typography>
                          ) : null}
                          {errors.bannerUrl && touched.bannerUrl ? (
                            <Typography
                              style={{
                                color: "#F14E24",
                                fontFamily: "Poppins",
                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5
                              }}
                            >
                              {errors.bannerUrl}
                            </Typography>
                          ) : null}



                          <Box className="customButton">

                            <Button
                              variant="contained"
                              type="submit"

                            >
                              SUBMIT
                            </Button>

                          </Box>

                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>

            </div>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
      </>

    )

  }

}
export default withRouter(EditVeichleList)
