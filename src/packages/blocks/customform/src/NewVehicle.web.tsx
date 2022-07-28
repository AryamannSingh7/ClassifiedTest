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
import { Building1, Car, ListCopy, owner, resident_owner, tenet, user } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";






class NewVeichleList extends VeichleListController {
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
            <div style={{ margin: 'auto' }}>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirm_password: "",

                    showPassword: false,
                    showConfirmPassword: false



                  }}

                  >
                    {({ values,
                      errors,
                      touched,
                      isValid, handleChange,
                      setFieldValue }) => (
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

                          {/* email */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              name="email"
                              placeholder={"Plate Number"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={ListCopy} />
                            </span>
                          </Box>
                          {errors.full_name && touched.full_name ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="email" />
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

                          {/* mobile */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="email"
                              placeholder={"Car Manufacturer "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.full_name && touched.full_name ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="email" />
                            </Typography>
                          ) : null}


                          {/* mobile */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="email"
                              placeholder={"Car Model  "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.full_name && touched.full_name ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="email" />
                            </Typography>
                          ) : null}


                          {/* mobile */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="email"
                              placeholder={"Car Color"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.full_name && touched.full_name ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="email" />
                            </Typography>
                          ) : null}


                          {/* mobile */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="email"
                              placeholder={"Car Manufacturer "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Car} />
                            </span>
                          </Box>
                          {errors.full_name && touched.full_name ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="email" />
                            </Typography>
                          ) : null}



                          <Box className="customButton">

                            <Button
                              variant="contained"
                              type="submit"

                            >
                              SIGN UP
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
              <img src={Building1} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
      </>

    )

  }

}
export default withRouter(NewVeichleList)
