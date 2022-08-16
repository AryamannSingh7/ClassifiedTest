//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, FormControl, InputLabel, Select, MenuItem
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, Hash, Hyperlink, ListCopy, owner, palette, resident_owner, tenet, upload, user, User3 } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import FamilyController from "./FamilyController.web";






class NewFamily extends FamilyController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {

    this.getRelation()
    this.getIdType();

  }
  render() {
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  Family Members
                </p>
              </Grid>
            </Grid>
            <div>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: "",
                    relation: "",
                    IDoption: "",
                    IDnumber: "",
                    }}
                    validationSchema={this.addVehicleSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => { this.createVehicle(values) }}
                  >
                    {({ values,
                      errors,
                      touched,
                      isValid, handleChange,
                      setFieldValue, setFieldError }) => (
                      <Form className="commonForm" translate="yes" >
                        <Box className='formGroup' style={{height:'144%'}}>
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="full_name"
                              placeholder={"Family member name"}

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
                          {/* <Box
                            className="formInputGrp"
                          > */}

{/* R4ealtion */}
                            <FormControl variant="outlined" fullWidth style={{marginTop:'15px'}}>

                              <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={Hyperlink} />
                              Relation</InputLabel>
                              <Select
                                name='relation'
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {  setFieldValue("relation", e.target.value) }}
                              label="Relation"
                                style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {this.state.allRelation && this.state.allRelation.map((item) =>
                                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                                )
                                }

                              </Select>
                            </FormControl>
                            <ErrorMessage className="text-error" component="Typography" name="relation" />
                            {/* <Field
                              name="relation"
                              placeholder={"Relation"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Hyperlink} />
                            </span>
                          </Box>
                          {errors.relation && touched.relation ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="relation" />
                            </Typography>
                          ) : null} */}
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

                          {/* Id type */}
                          <FormControl variant="outlined" fullWidth style={{marginTop:'15px'}}>

                            <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <img src={Hyperlink} />
                              IDoption</InputLabel>
                            <Select
                              name='IDoption'
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              onChange={(e) => { setFieldValue("IDoption", e.target.value) }}
                              label="IDoption"
                              style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {this.state.allIdType && this.state.allIdType.map((item) =>
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                              )
                              }

                            </Select>
                          </FormControl>
                          <ErrorMessage className="text-error" component="Typography" name="relation" />

                          {/* <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="IDoption"
                              placeholder={"Type of ID Proof "}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={User3} />
                            </span>
                          </Box>
                          {errors.IDoption && touched.IDoption ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="IDoption" />
                            </Typography>
                          ) : null} */}


                          {/* car model */}

                          <Box
                            className="formInputGrp"
                          >
                            <Field
                              name="IDnumber"
                              placeholder={"Enter ID Number"}
                              className="formInput"
                            />
                            <span className="frmLeftIcons">

                              <img src={Hash} />
                            </span>
                          </Box>
                          {errors.IDnumber && touched.IDnumber ? (
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
                              <ErrorMessage className="text-error" component="Typography" name="IDnumber" />
                            </Typography>
                          ) : null}


                          {/* car color */}




                          {/* <Box style={{
                            display: 'flex', justifyContent: 'center', flexDirection: 'column',
                            alignItems: 'center',
                            padding: '4rem',
                            border: '1px dotted #00000036',
                            marginBottom: 10,
                            backgroundSize: 'cover',
                            borderRadius: 15, backgroundImage: values.bannerUrl
                              ? `url(${values.bannerUrl})`
                              : ""
                          }}>
                            <img src={upload} width='25' height='25' />
                            <label for="file1"
                              style={{ color: 'rgb(33 33 33 / 33%)' }}>
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
                          ) : null} */}




                        </Box>
                          <Box className="customButton">

                            <Button
                              variant="contained"
                              type="submit"

                            >
                              Add member to my family
                            </Button>

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
export default withRouter(NewFamily)
