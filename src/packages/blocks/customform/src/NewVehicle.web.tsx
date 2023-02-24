import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton,Divider
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, ListCopy, palette, upload, user } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController,{Props} from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class NewVeichleList extends VeichleListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {

    this.getVehicle()

  }
  render() {
    const {t} = this.props
    return (
      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols inputPlaceholderRegistration" style={{ justifyContent: 'unset' }}>
            <Grid container style={{padding:"15px 5px"}}>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p className="bold-text" style={{ fontWeight: 600, fontSize: '18px', marginLeft:"15px" }}>
                {
                    this.state.allVehcile.length==0 ? ' Register vehicle' : ' Register another vehicle'
                }
                </p>
              </Grid>
            </Grid>
            <Divider/>
            <div style={{ margin: '10px 15px' }}>
              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: "",
                    plateNumber: "",
                    carManufacturer: "",
                    carModle: "",
                    carColor: "",
                    bannerUrl:'',
                    banner:''
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
                        <Box className='formGroup'>
                          <Box className="formInputGrp" style={{marginBottom:"25px",marginTop:"20px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px"}}>
                            <Field
                            style={{width:'100%'}}
                              className="formInput"
                              name="full_name"
                              placeholder={t("Owner Name")}

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
                          <Box className="formInputGrp" style={{marginBottom:"25px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px"}}>
                            <Field
                              style={{ width: '100%' }}
                              name="plateNumber"
                              placeholder={t("Plate Number")}
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

                          <Box className="formInputGrp" style={{marginBottom:"25px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px"}}>
                            <Field
                              style={{ width: '100%' }}
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

                          <Box className="formInputGrp" style={{marginBottom:"25px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px"}}>
                            <Field
                              style={{ width: '100%' }}
                              name="carModle"
                              placeholder={t("Car Model")}
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

                          <Box className="formInputGrp" style={{marginBottom:"25px",border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px"}}>
                            <Field
                              style={{ width: '100%' }}
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
                        padding:'3.5rem',
                        marginTop:'15px',
                            border:'2px dashed rgba(143,146,161,0.2)',
                            marginBottom:25,
                            backgroundSize:'cover',
                            backgroundColor:"#f9f9f9",
                            borderRadius: 15, backgroundImage: values.bannerUrl
                              ? `url(${values.bannerUrl})`
                              : ""
}}>
                            <img src={upload} width='25' height='25'/>
                            
                            <label htmlFor="file1"
                            style={{ color:'#7a7878',textAlign:"center",marginTop:"10px"}}>
                              {t("Upload car registration image")}
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
                                fontWeight: 700,
                                fontSize: 14,
                                marginTop: "-5px",
                                marginLeft:"25px",
                                marginBottom:"10px",
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
                              {t("SUBMIT")}
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
        <Loader loading={this.state.loading} />

      </>

    )

  }

}
export default withTranslation()(withRouter(NewVeichleList))
