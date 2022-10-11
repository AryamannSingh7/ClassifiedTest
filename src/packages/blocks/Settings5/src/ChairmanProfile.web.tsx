// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  FormControl,
  Tab,
  withStyles,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  ListItemIcon,
  Avatar,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { ProfileStyleWeb } from "./ProfileStyle.web";
import ProfileController,{Props} from "../../user-profile-basic/src/ProfileController.web";
import { calendar, emailedit, fbedit, heart, instaedit, message, mobile, NoProfile_Img, snapedit, twitteredit, user } from "../../user-profile-basic/src/assets";
import { dailCode } from "../../email-account-registration/src/code";
import ChipInput from "material-ui-chip-input";
import { AvatarIcon, CallIcon, ChatIcon, EmailIcon, FacebookIcon, InstagramIcon, SettingIcon, SnapchatIcon, TwitterIcon } from "./assets";
import OtpInput from "react-otp-input";

class ChairmanProfile extends ProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    this.getProfile()
        // this.getVehicle()
    
      }

  render() {
     //@ts-ignore
            //@ts-nocheck
    const { classes } = this.props;
    let profileData =this.state.profiledata

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.ChairmanProfile}
        >
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      <Box component="span" style={{ color: "blue" }}>
                        My Profile
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      My Profile
                    </Typography>
                  </Box>
                </Box>
                <Box className="my-profile-box">
                  <Box className="heading">
                    <Typography variant="h6" className="sub-heading">
                      General Details
                    </Typography>
                    {/* <Box className="setting">
                      <img src={SettingIcon} alt="setting" />
                      <span>Other Can See</span>
                    </Box> */}
                  </Box>
                  <Card className="profile-details-box">
                    <Grid container>
                      <Grid item xs={3} className="left-side" style={{padding:20}}>
                        <img
                          src={profileData?.attributes?.profile_pic||AvatarIcon.default}
                          alt="avatar"
                          className="profile"
                        />
                        <Typography variant="h6" className="sub-heading">
                        {profileData?.attributes?.full_name.name || 'N/A'}
                        </Typography>
                        <p>{profileData?.attributes?.apartment_number?.apartment_number || 'N/A'}</p>
                        <Box className="icons">
                          <img src={ChatIcon} alt="chat" />
                          <img src={CallIcon} alt="phone" onClick={() => document.location.href = `tel:${profileData?.attributes?.full_phone_number?.full_phone_number}`}/>
                          <img src={EmailIcon} alt="email" onClick={() => document.location.href = `mailto:${profileData?.attributes?.email?.email}`}/>
                        </Box>
                      </Grid>
                      <Grid item xs={1} className="border" />
                      <Grid item xs={8} className="right-side" style={{padding:20}}>
                        <Grid container className="about">
                          <Grid item xs={12}>
                            <span>About</span>
                            <p>
                            {profileData?.attributes?.bio?.bio || 'N/A'}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container className="info">
                          <Grid item xs={3}>
                            <span>Gender</span>
                            <p>{profileData?.attributes?.gender?.gender || 'N/A'}</p>
                          </Grid>
                          <Grid item xs={3}>
                            <span>DOB</span>
                            <p> {profileData?.attributes?.date_of_birth?.date_of_birth || 'N/A'}</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Hobbies</span>
                            <Box className="hobbies">
                            {
              profileData?.attributes?.hobbies?.hobbies && <>

      
                    {
                      profileData?.attributes?.hobbies?.hobbies.map((item:any) => <>
                        <span>
                          {item}
                        </span>
                      </>)
  }
              </>
}
                              
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container className="social">
                          <Grid item xs={12}>
                            <span>Social Media</span>
                            <Box className="icons">
                            {
                    profileData?.attributes?.website[0].twitter_link && <Button href={profileData?.attributes?.website[0].twitter_link} target="_blank">
                      <img src={TwitterIcon} alt="phone" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[1].instagram_link && <Button href={profileData?.attributes?.website[1].instagram_link} target="_blank">
                     <img src={InstagramIcon} alt="chat" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[2].fb_link && <Button href={profileData?.attributes?.website[2].fb_link} target="_blank">
                     <img src={FacebookIcon} alt="chat" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[3].snapchat_link && <Button href={profileData?.attributes?.website[3].snapchat_link} target="_blank">
                      <img src={SnapchatIcon} alt="email" />
                    </Button>
                  }
                             
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
                <Box className="edit-button">
                  <Button onClick={() => this.setState({showDialog:true})}>
                    Edit Details
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>

          <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              maxWidth:650
              
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{borderBottom:'1px solid #e9dede',padding: '1rem'}}>
              <Box display='flex' justifyContent='space-between'>
                <p style={{fontWeight:600}}>
                  Edit My Profile
                </p>
                <p onClick={()=>this.setState({ showDialog: false })} style={{cursor:'pointer'}}>
                  X
                </p>
              </Box>
            </Grid>
          </Grid>
          
          <Grid container className="main-content-block" style={{marginTop:'1.5rem',padding: '1rem'}}>
                <Grid xs={12}>
                  <Formik initialValues={{
                    bannerUrl:'',
                    full_name: profileData?.attributes?.full_name?.name,
                    banner:'',
                    phone: profileData?.attributes?.full_phone_number?.phone_number,
                    email: profileData?.attributes?.email?.email,
                    male: profileData?.attributes?.gender?.gender === 'Male' ? true : false,
                    female: profileData?.attributes?.gender?.gender === 'Female' ? true : false,
                    DOB: profileData?.attributes?.date_of_birth?.date_of_birth,
                    gender: profileData?.attributes?.gender?.gender,
                    hobbies: profileData?.attributes?.hobbies?.hobbies ? profileData?.attributes?.hobbies?.hobbies :[] ,
                    twitter: profileData?.attributes?.website[0].twitter_link,
                    fb: profileData?.attributes?.website[2].fb_link,
                    insta: profileData?.attributes?.website[1].instagram_link,
                    snap: profileData?.attributes?.website[3].snapchat_link,
                    bio: profileData?.attributes?.bio?.bio
                  }}
                    validationSchema={this.profileSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => { this.updateChairmenProfile(values) }}
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
                            marginBottom: '1.5rem',
                            flexDirection:'column',
                          }}>
                            {
                                values.bannerUrl?
                                
                                <Avatar src={values.bannerUrl} />
                                :
                                <img src={NoProfile_Img}/>
                            }

                            <label htmlFor="file1"
                              style={{ color: '#FC8434', fontWeight: 'bold' }}>
                              Add Profile Picture
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

                          <Box style={{display:'flex',justifyContent:'space-between'}}>
                            {/* name */}

                          <Box
                            className="formInputGrp"
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

{/* phone */}
<Box>

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
                                  value={this.state.selectCode3}
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
                          <p style={{ color:'#FC8434',textAlign:'right',fontWeight:'bold',cursor:'pointer'}} onClick={()=>this.setState({showDialog1:true})}>
                            Update phone number
                          </p>
</Box>
                          </Box>

                          {/* email */}
                          <Box
                            className="formInputGrp"
                            style={{width:'50%'}}
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

                            <div style={{display:'flex',width:'100%'}}>
                              <div style={{width:'100%'}}>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name="radio-buttons-group"
                                  defaultValue={values.gender}
                                  style={{ display: 'flex',flexDirection:'row',marginTop:'0.25rem',width:'100%' }}
                                >
                                  {/* <FormControlLabel name={values.gender} value="Female" control={<Radio />} label="Female" /> */}
                                  <FormControlLabel className={values.gender == 'Female' ? 'active':'unactive'} name='gender' onChange={handleChange} value="Female" control={<Radio/>} label="Female" style={{ paddingRight: 30, borderRadius: 25, border: '1px solid #e9dede',width:'40%' }}  />
                                  <FormControlLabel
                                    className={values.gender == 'Male' ? 'active' : 'unactive'} name='gender' onChange={handleChange} value="Male" control={<Radio />} label="Male" style={{ paddingRight: 30, borderRadius: 25, border: '1px solid #e9dede',width:'40%' }} />

                                </RadioGroup>
                              {/* <Checkbox name="male" onChange={handleChange} checked={values.male} icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />} id="loginCheckbox"
                              />
                              <label htmlFor="loginCheckbox" className="checkboxLabel">Male</label> */}
                              </div>

                              </div>
                           </Box>
<Box style={{display:'flex',justifyContent:'space-between'}}>
                          {/* DOB */}
                          <Box
                            className="formInputGrp"
                            style={{width:'46%'}}
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
                            style={{width:'50%'}}
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
                              onAdd={(chip:any) => this.handleAddChip(setFieldValue, chip, values.hobbies)}
                              onDelete={(chip:any, index:any) => this.handleDeleteChip(setFieldValue, chip, values.hobbies, index)}

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
</Box>
<Box style={{display:'flex',justifyContent:'space-between'}}>

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
</Box>
<Box style={{display:'flex',justifyContent:'space-between'}}>

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

                           </Box>
                           <Box style={{padding:'1rem',borderTop:'1px solid #1A181D25',display:'flex',justifyContent:'end'}}>

                           <Button variant='text' onClick={() =>{localStorage.setItem('profileData',JSON.stringify(profileData)); this.setState({ showDialog: false })}}  >
                CANCEL
              </Button>
                        <Box className="customButton" style={{width:'10rem'}}>

                          <Button
                            variant="contained"
                            type="submit"

                          >
                            Save
                          </Button>

                        </Box>
                           </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>


          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              
              {/* <Button  onClick={() => this.publicViewAPI()}  variant='text'>
                SAVE
              </Button> */}
            </DialogActions>
          </Box>
        </Dialog>
        <Dialog
          open={this.state.showDialog1}
          onClose={() => this.setState({ showDialog1: false })}
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
          <Box style={{ fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right' }} onClick={() => this.setState({ showDialog1: false })}>
            x
          </Box>
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
          <Box style={{ fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right' }} onClick={() => this.setState({ showDialogDelete: false })}>
            x
          </Box>
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
                <Button variant="contained" onClick={() => { this.verifyOtp() }}>SEND</Button>
              </Box>
            </Grid>
          </Grid>

        </Dialog>
        </Box>
      </>
    );
  }
}

export default withStyles(ProfileStyleWeb)(ChairmanProfile);
// Customizable Area End
 