//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, FormControl, InputLabel, Select, MenuItem, Avatar, Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, Hash, Hyperlink, ListCopy, message, owner, palette, resident_owner, tenet, upload, user, User3 } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProfileController from "./ProfileController.web";
import { dailCode } from "../../email-account-registration/src/code";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
class EditProfile extends ProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {

    // this.getRelation()
    // this.getIdType();

  }
  render() {
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f2f2f2' }}>
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
                    phone:'',
                    email:'',
                    male:false,
                    female:false,
                    DOB:'',
                    hobbies:'',
                    twitter:'',
                    fb:'',
                    insta:'',
                    snap:'',
                  }}
                    validationSchema={this.profileSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => { this.updateProfile(values) }}
                  >
                    {({ values,
                      errors,
                      touched,
                      isValid, handleChange,
                      setFieldValue, setFieldError }) => (
                      <Form className="commonForm" translate="yes" >
                        <Box className='formGroup' style={{ height: '121%' }}>
                          <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '1rem',
                            marginBottom: '1.5rem'
                          }}>
                            <Avatar src={values.bannerUrl} />

                            <label for="file1"
                              style={{ color: '#FC8434', fontWeight: 'bold' }}>
                              Change Profile Picture
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

                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="full_name"
                              placeholder={"Enter you name"}

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
                          {/* mobile */}
                          <Box
                            marginTop='1rem'
                            className='formInputGrp'
                            display="flex"
                            overflow="hidden"
                            alignItems="center"
                            height="56px"
                            border="0.1px solid rgb(209 209 209 / 44%)"
                            borderRadius="25px"
                            bgcolor="#f9f9f9"
                          >
                            <Box>
                              <FormControl variant="outlined" >
                                {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                                <Select
                                  name='selectCode'
                                  labelId="demo-simple-select-outlined-label"

                                  id="demo-simple-select-outlined"
                                  onChange={this.handleChange}
                                  label="Unit"
                                  value={this.state.selectCode}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {dailCode.map((item) =>
                                    <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' style={{ marginRight: '5px' }} />
                                      {item.dial_code}</MenuItem>

                                  )
                                  }

                                </Select>
                              </FormControl>

                            </Box>

                            <Field
                              name="phone"
                              id="mobile"
                              placeholder={"Mobile"}
                              style={{
                                border: "none",
                                height: "42%",
                                width: "80%",
                                color: "rgba(0, 0, 0, 0.6)",
                                fontWeight: 400,
                                fontSize: 16,
                                marginRight: 10,
                                marginLeft: 21,
                                outline: "none",
                                backgroundColor: '#f9f9f9'
                              }}
                            />
                          </Box>

                          {errors.phone && touched.phone ? (
                            <Typography
                              style={{
                                color: "#F14E24",
                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="phone" />
                            </Typography>
                          ) : null}
                          {/* email */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="email"
                              placeholder={"Enter your email"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.email && touched.email ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="email" />
                            </Typography>
                          ) : null}
{/* gender */}
                          <Box className="formGroup formCheckbox" style={{flexDirection:'column',marginTop:'1rem',marginLeft:'1rem',fontWeight:'bold'}}>
                            <div>
                              Gender
                            </div>

                            <div>

                              <Checkbox name="male" onChange={handleChange} value={values.male} icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                              />
                              <label htmlFor="loginCheckbox" className="checkboxLabel">Male</label>
                              <Checkbox name="female" onChange={handleChange} value={values.female} icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                              />
                              <label htmlFor="loginCheckbox" className="checkboxLabel">Female</label>
                              </div>
                           </Box>
                          {/* DOB */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="DOB"
                              placeholder={"Date of Birth"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.DOB && touched.DOB ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="DOB" />
                            </Typography>
                          ) : null}

                          {/* Hobbies */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="hobbies"
                              placeholder={"Hobbies"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.hobbies && touched.hobbies ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="hobbies" />
                            </Typography>
                          ) : null}
                          {/* Twitter */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="twitter"
                              placeholder={"Twitter profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.twitter && touched.twitter ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="twitter" />
                            </Typography>
                          ) : null}

                          {/* fb */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="fb"
                              placeholder={"Faceook  profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.fb && touched.fb ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="fb" />
                            </Typography>
                          ) : null}
                          {/* Insta */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="insta"
                              placeholder={"Instagram profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.insta && touched.insta ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="insta" />
                            </Typography>
                          ) : null}
                          {/* snap */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="snap"
                              placeholder={"Snapchat profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.snap && touched.snap ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="snap" />
                            </Typography>
                          ) : null}

                           </Box>
                        <Box className="customButton">

                          <Button
                            variant="contained"
                            type="submit"

                          >
                            Save
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
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
      </>

    )

  }

}
export default withRouter(EditProfile)
