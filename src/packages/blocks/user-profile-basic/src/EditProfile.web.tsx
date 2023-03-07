import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, FormControl, Select, MenuItem, Avatar, Dialog, DialogActions, RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import { Building1, calendar, emailedit, fbedit, heart, instaedit,  Lock, mobile, NoProfile_Img, snapedit, twitteredit, user,} from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProfileController from "./ProfileController.web";
import { dailCode } from "../../email-account-registration/src/code";
import ChipInput from 'material-ui-chip-input'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Hyperlink } from "../../customform/src/assets";
import AlertErrorWeb from "../../../components/src/AlertError.web";
import { withTranslation } from "react-i18next";

class EditProfile extends ProfileController {
  render() {
    // @ts-ignore
    // @ts-nocheck
    let profileData:any = JSON.parse(localStorage.getItem('profileData'));
    const { t }: any = this.props;

    return (
      <>
        <Grid container spacing={4} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <Grid container style={{borderBottom:'2px solid #f2efef', padding:"10px 0"}}>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center',gap:'0.25rem',marginBottom:5 }}>
                <KeyboardBackspaceIcon onClick={() => window.history.back()} /> {" "}
                <p style={{ fontWeight: 600, fontSize: '18px',paddingLeft:8 }} className="bold-text">
                  {t("Edit My Profile")}
                </p>
              </Grid>
            </Grid>

            <div>
              <Grid container className="main-content-block">
                <Grid xs={12} className='inputPlaceholderRegistration'>
                  <Formik initialValues={{
                    bannerUrl:profileData?.attributes?.profile_pic?.url,
                    full_name: profileData?.attributes?.full_name?.name,
                    banner:'',
                    phone: profileData?.attributes?.full_phone_number?.phone_number,
                    email: profileData?.attributes?.email?.email,
                    male: profileData?.attributes?.gender?.gender === 'Male' ? true : false,
                    female: profileData?.attributes?.gender?.gender === 'Female' ? true : false,
                    DOB: profileData?.attributes?.date_of_birth?.date_of_birth,
                    gender: profileData?.attributes?.gender?.gender,
                    hobbies: profileData?.attributes?.hobbies?.hobbies ? profileData?.attributes?.hobbies?.hobbies :[] ,
                    twitter: profileData?.attributes?.website[0].twitter_link==='null'?'':'',
                    fb: profileData?.attributes?.website[2].fb_link==='null'?'':'',
                    insta: profileData?.attributes?.website[1].instagram_link==='null'?'':'',
                    snap: profileData?.attributes?.website[3].snapchat_link==='null'?'':'',
                    bio: profileData?.attributes?.bio?.bio==='null'?'':''
                  }}
                    validationSchema={this.profileSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => { this.updateProfile(values) }}
                  >
                    {({ values, errors, touched, isValid, handleChange, setFieldValue, setFieldError }) => (
                      <Form className="commonForm" translate="yes" >
                        <Box className='formGroup' style={{ height: '91%' }}>
                          <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '1rem',
                            marginBottom: '1.5rem'
                          }}>
                            <Avatar src={values.bannerUrl || NoProfile_Img} className="info-icon" style={{width:50,height:50}} />
                            <label htmlFor="file1" style={{ color: '#FC8434',fontSize:'1rem'}} className='bold-text'>
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
                 

                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
                          >
                            <Field
                              className="formInput"
                              name="full_name"
                              value={values.full_name}
                              placeholder={"Enter your name"}

                            />
                            <span className="frmLeftIcons">
                              <img src={user} />
                            </span>
                          </Box>
                        
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
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
                          >
                            <Box>
                              <FormControl variant="outlined" >
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

                                  )}
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
                        
                          <p className="bold-text" style={{ color:'#FC8434',textAlign:'right',fontWeight:'bold',cursor:'pointer'}} onClick={()=>this.setState({showDialog:true})}>
                            Verify number to update
                          </p>
                          {/* email */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
                          >
                                                        <Field
                              className="formInput"
                              value={values.email}

                              name="email"
                              placeholder={"Email ID"}

                            />
                            <span className="frmLeftIcons">
                              <img src={emailedit} />
                            </span>
                          </Box>
                       
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
                         
                          {/* Bio */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
                          >


                            <Field
                              className="formInput"
                              name="bio"
                              value={values.bio}
                              placeholder={"Enter your bio"}

                            />
                            <span className="frmLeftIcons">
                              <img src={Hyperlink} />
                            </span>
                          </Box>
                         
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
                         
                          {/* gender */}
                        <Gender values={values} handleChange={handleChange}/>
                          {/* DOB */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                         

                          {/* Hobbies */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                            <span className="frmLeftIcons" style={{top:'39%'}}>
                              <img src={heart} />
                            </span>
                          </Box>
                          
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
                       
                          {/* Twitter */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                      

                          {/* fb */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                        
                          {/* Insta */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                        
                          {/* snap */}
                          <Box
                            className="formInputGrp"
                            style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
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
                        
                           </Box>
                        <Box className="customButton">
                          <Button variant="contained" type="submit">
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
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '10px',
              margin: 0,
              overflow:'visible',
            },
          }}
        >
          <Box style={{ fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right' }} onClick={() => this.setState({ showDialog: false })}>
            x
          </Box>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={mobile} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p className="bold-text" style={{ fontWeight: 600, fontSize: '20px', textAlign: 'center' }}>
                Add New Mobile Number
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Add new mobile number in the below field
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item className='inputPlaceholderRegistration'>
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
                      overflow="visible"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="25px"
                      bgcolor="#f9f9f9"
                      style={{border:"1px solid #f0f0f0",borderRadius:"50px",backgroundColor:"#f9f9f9"}}
                    >
                      <Box>
                        <FormControl variant="outlined" >
                          {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                          {/* <Select
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

                          </Select> */}
                            <PhoneInput
                            inputProps={{name:'selectCode'}}
                            // name='selectCode'
                            enableSearch={true}
                            value={this.state.selectCode}
                            onChange={this.handleChangeCCode}
  country={'us'}
/>
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
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '10px',
              margin: 0
            },
          }}
        >
          <Box style={{ fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right' }} onClick={() => this.setState({ showDialogDelete: false })}>
            x
          </Box>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <img src={Lock} width='50' height='50' />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p className="bold-text" style={{ fontWeight: 600, fontSize: '20px', textAlign: 'center' }}>
                Verify New Mobile Number
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.9rem', textAlign: 'center',marginBottom:'0.5rem' }}>
                Enter OTP sent to your mobile number for verification.
              </p>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
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
                <Button variant="contained" onClick={() => { this.verifyOtp() }}>SUBMIT</Button>
              </Box>
            </Grid>
          </Grid>
        </Dialog>

        <Loader loading={this.state.loading} />

        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
      </>
    )
  }
}

const Gender =(props:any)=>{
 const  values = props?.values
 const handleChange = props?.handleChange
  return(
    <>
      <Box className="formGroup formCheckbox" style={{flexDirection:'column',marginTop:'1rem',marginLeft:'1rem',fontWeight:'bold'}}>
                            <p className="bold-text" style={{fontSize:"16px"}}> 
                              Gender
                            </p>
                            <div style={{display:'flex'}}>
                              <div>
                                <RadioGroup
                                  name="radio-buttons-group"
                                  defaultValue={values.gender}
                                  style={{ display: 'flex',flexDirection:'row',marginTop:'0.25rem' }}
                                >
                                  <FormControlLabel className={values.gender == 'Female' ? 'active profile-gender' : 'unactive profile-gender'} name='gender' onChange={handleChange} value="Female" control={<Radio />} label="Female" style={{ paddingRight: 30, borderRadius: 25, border: '1px solid #e9dede' }}  />
                                  <FormControlLabel className={values.gender == 'Male' ? 'active profile-gender' : 'unactive profile-gender'} name='gender' onChange={handleChange} value="Male" control={<Radio />} label="Male" style={{ paddingRight: 30, borderRadius: 25, border: '1px solid #e9dede' }} />
                                </RadioGroup>
                              </div>
                            </div>
                          </Box>
    </>
  )
}
// @ts-ignore
// @ts-nocheck
export default withTranslation()(withRouter(EditProfile));
