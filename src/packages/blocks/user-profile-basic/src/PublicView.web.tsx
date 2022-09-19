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
import { Building1, Car, Hash, Hyperlink, ListCopy, message, owner, palette, resident_owner, tenet, upload, user, User3, username } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProfileController from "./ProfileController.web";
import { dailCode } from "../../email-account-registration/src/code";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
class PublicView extends ProfileController {
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
    let profileData = JSON.parse(localStorage.getItem('profileData'))
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f2f2f2' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  Publish on Community Page
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div style={{ background:'#E4E4E4', padding:'0.5rem',marginTop:'1rem'}}>
                  This screen will allow you to select which of your information wil be visible to the rest of the residents in the building.
                </div>
              </Grid>
            </Grid>
            <div>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Formik initialValues={{
                    full_name: profileData?.attributes?.full_name?.publilc_access,
                    unit: profileData?.attributes?.full_name?.publilc_access,
                    phone: profileData?.attributes?.full_phone_number?.publilc_access,
                    email: profileData?.attributes?.email?.publilc_access,
                    gender: profileData?.attributes?.gender?.publilc_access,
                    DOB: profileData?.attributes?.date_of_birth?.publilc_access,
                    hobbies: profileData?.attributes?.hobbies?.publilc_access,
                    twitter: profileData?.attributes?.website[0].publilc_access,
                    fb: profileData?.attributes?.website[1].publilc_access,
                    insta: profileData?.attributes?.website[2].publilc_access,
                    snap: profileData?.attributes?.website[3].publilc_access,
                    bio: profileData?.attributes?.bio?.publilc_access,
                    family: profileData?.attributes?.families?.publilc_access
                  }}
                    onSubmit={(values) => { this.updatePublicProfile(values) }}
                  >
                    {({ values,
                      errors,
                      touched,
                      isValid, handleChange,
                      setFieldValue, setFieldError }) => (
                      <Form className="commonForm" translate="yes" >
                        <Box className='formGroup' style={{ height: '121%' }}>

                          {/* name  */}
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxna" className="checkboxLabel">Name</label>
                                <p style={{marginTop:'0.25rem'}}>
                                  {profileData.attributes.full_name.name}
                                </p>

                              </div>
                              <div>
                                <Checkbox name="full_name" onChange={handleChange} checked={values.full_name} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxna"
                                />
                              </div>
                            </div>
                          </Box>

                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxu" className="checkboxLabel">Apartment No.</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.apartment_number.apartment_number}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="unit" onChange={handleChange} checked={values.unit} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxu"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxp" className="checkboxLabel">Phone No.</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.full_phone_number.full_phone_number}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="phone" onChange={handleChange} checked={values.phone} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxp"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxe" className="checkboxLabel">Email Address</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.email.email}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="email" onChange={handleChange} checked={values.email} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxe"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxg" className="checkboxLabel">Gender</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.gender.gender}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="gender" onChange={handleChange} checked={values.gender} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxg"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxdb" className="checkboxLabel">Date of Birth</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.date_of_birth.date_of_birth}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="DOB" onChange={handleChange} checked={values.DOB} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxdb"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxh" className="checkboxLabel">Hobbies</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.hobbies.hobbies.join(',')}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="hobbies" onChange={handleChange} checked={values.hobbies} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxh"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxt" className="checkboxLabel">Twitter</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.website[0].twitter_link}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="twitter" onChange={handleChange} checked={values.twitter} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxt"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxb" className="checkboxLabel">Facebook</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.website[2].fb_link}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="fb" onChange={handleChange} checked={values.fb} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxb"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxi" className="checkboxLabel">Instagram</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.website[1].instagram_link}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="insta" onChange={handleChange} checked={values.insta} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxi"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxs" className="checkboxLabel">Snapchat</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData.attributes.website[3].snapchat_link}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="snap" onChange={handleChange} checked={values.snap} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxs"
                                />
                              </div>
                            </div>
                          </Box>
                          <Box className="formGroup formCheckbox" style={{ flexDirection: 'column', marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
                              <div>
                                <label htmlFor="loginCheckboxf" className="checkboxLabel">Family Details</label>
                                <p style={{ marginTop: '0.25rem' }}>
                                  {profileData?.attributes.families?.families?.length || '0' + ' Members'}
                                </p>
                              </div>
                              <div>
                                <Checkbox name="family" onChange={handleChange} checked={values.family} icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />} id="loginCheckboxf"
                                />
                              </div>
                            </div>
                          </Box>
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
          onClose={() => this.setState({ showDialog: false, showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '2rem'
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={username} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Are you sure you want
                <br />
                to hide your name?
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                On hiding your name, you’ll go anonymous and you will not be able to message anyone. Do you want to hide your name?
              </p>
            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button variant="contained" onClick={() => this.setState({ showDialog: false })}  >
                No, Don’t Hide It
              </Button>
              <Button  onClick={() => this.publicViewAPI()}  variant='text'>
                Yes, Hide It
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
// @ts-igonre
// @ts-nocheck
export default withRouter(PublicView)
