//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, FormControl, InputLabel, Select, MenuItem, Avatar, Checkbox, Dialog, DialogActions
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, calendar, Car, emailedit, fbedit, Hash, heart, Hyperlink, instaedit, ListCopy, message, mobile, owner, palette, resident_owner, snapedit, tenet, twitteredit, upload, user, User3 } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProfileController from "./ProfileController.web";
import { dailCode } from "../../email-account-registration/src/code";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ChipInput from 'material-ui-chip-input'
import OtpInput from 'react-otp-input';
class EditProfile extends ProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    // this.getProfile()
  }
  render() {
    let profileData = JSON.parse(localStorage.getItem('profileData'))

    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f2f2f2' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  Edit My Profile
                </p>
              </Grid>
            </Grid>
            <div>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: profileData?.attributes?.full_name?.name,
                    phone: profileData?.attributes?.full_phone_number?.phone_number,
                    email: profileData?.attributes?.email?.email,
                    male: profileData?.attributes?.gender?.gender === 'Male' ? true : false,
                    female: profileData?.attributes?.gender?.gender === 'Female' ? true : false,
                    DOB: profileData?.attributes?.date_of_birth?.date_of_birth,
                    hobbies: profileData?.attributes?.hobbies?.hobbies ? profileData?.attributes?.hobbies?.hobbies :[] ,
                    twitter: profileData?.attributes?.website[0].twitter_link,
                    fb: profileData?.attributes?.website[2].fb_link,
                    insta: profileData?.attributes?.website[1].instagram_link,
                    snap: profileData?.attributes?.website[3].snapchat_link,
                    bio: profileData?.attributes?.bio?.bio
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
                        <Box className='formGroup' style={{ height: '91%' }}>
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
                              value={values.full_name}
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
                                  disabled
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
                              disabled
                              value={values.phone}
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
                          <p style={{ color:'#FC8434',textAlign:'right',fontWeight:'bold',cursor:'pointer'}} onClick={()=>this.setState({showDialog:true})}>
                            Verify number to update
                          </p>
                          {/* email */}
                          <Box
                            className="formInputGrp"
                          >
                                                        <Field
                              className="formInput"
                              value={values.email}

                              name="email"
                              placeholder={"Enter your email"}

                            />
                            <span className="frmLeftIcons">
                              <img src={emailedit} />
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
                          {/* Bio */}
                          <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="bio"
                              value={values.bio}
                              placeholder={"Enter your bio"}

                            />
                            <span className="frmLeftIcons">
                              <img src={message} />
                            </span>
                          </Box>
                          {errors.bio && touched.bio ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="bio" />
                            </Typography>
                          ) : null}
{/* gender */}
                          <Box className="formGroup formCheckbox" style={{flexDirection:'column',marginTop:'1rem',marginLeft:'1rem',fontWeight:'bold'}}>
                            <div>
                              Gender
                            </div>

                            <div>

                              <Checkbox name="male" onChange={handleChange} checked={values.male} icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                              />
                              <label htmlFor="loginCheckbox" className="checkboxLabel">Male</label>
                              <Checkbox name="female" onChange={handleChange} checked={values.female} icon={<CircleUnchecked />}
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
                              <img src={calendar} />
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


                            {/* <Field
                              className="formInput"
                              name="hobbies"
                              placeholder={"Hobbies"}

                            />
                            <span className="frmLeftIcons">
                              <img src={heart} />
                            </span> */}
                            <ChipInput
                              className="formInput"
                              placeholder="Hobbies"
                              style={{ padding:'10px 0px 6px 50px',width:'85%'}}
                              disableUnderline={true}
                              value={values.hobbies}
                              // onChange={(chip) => setFieldValue('hobbies', chip)}
                              onAdd={(chip) => this.handleAddChip(setFieldValue, chip, values.hobbies)}
                              onDelete={(chip, index) => this.handleDeleteChip(setFieldValue, chip, values.hobbies, index)}

                            />
                            <span className="frmLeftIcons">
                              <img src={heart} />
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
                              type='url'
                              value={values.twitter}
                              placeholder={"Twitter profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={twitteredit} />
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
                              type='url'
                              value={values.fb}
                              placeholder={"Faceook  profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={fbedit} />
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
                              type='url'
                              value={values.insta}
                              placeholder={"Instagram profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={instaedit} />
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
                              type='url'
                              value={values.snap}
                              placeholder={"Snapchat profile link"}

                            />
                            <span className="frmLeftIcons">
                              <img src={snapedit} />
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
        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '2rem',
              margin: 0
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={mobile} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Add New Mobile Number

              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Add new mobile number in the
                below field
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Formik initialValues={{
                phone: '',
              }}
                validationSchema={this.addPhoneSchema()}
                validateOnMount={true}
                onSubmit={(values) => { this.updatePhone(values) }}
              >
                {({ values,
                  errors,
                  touched,
                  isValid, handleChange,
                  setFieldValue, setFieldError }) => (
                  <Form className="commonForm" translate="yes" >

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
                    <Box className="dialog-footer desktop-ui">
                      <DialogActions className="customButton">
                        <Button
                          type="submit" variant="contained" >
                          Submit
                        </Button>
                      </DialogActions>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>

        </Dialog>
        <Dialog
          open={this.state.showDialogDelete}
          onClose={() => this.setState({ showDialogDelete: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '1rem',
              margin: 0
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={mobile} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Verify New Mobile Number

              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Enter OTP sent to your mobile number for verification.
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className="commonForm">
              <Box className="formGroup otpBlock">
                <OtpInput className="formOutlineInput"
                  value={"111111"}
                  onChange={this.handleChange}
                  numInputs={6}
                // separator={<span>-</span>}
                />
              </Box>
              <Box className="customButton row-btn">
                <Button variant="contained" onClick={() => { this.verifyOtp() }}>SEND</Button>
              </Box>
            </Grid>
          </Grid>

        </Dialog>
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
export default withRouter(EditProfile)
