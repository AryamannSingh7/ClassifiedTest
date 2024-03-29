// Customizable Area Start
import React from "react";
import {
    Avatar,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    FormControl,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
    withStyles,
} from "@material-ui/core";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import {ProfileStyleWeb} from "./ProfileStyle.web";
import AlertErrorWeb from "../../../components/src/AlertError.web";
import ProfileController, {Props} from "../../user-profile-basic/src/ProfileController.web";
import {
    calendar,
    emailedit,
    fbedit,
    heart,
    instaedit,
    mobile,
    snapedit,
    twitteredit,
    user
} from "../../user-profile-basic/src/assets";
import {dailCode} from "../../email-account-registration/src/code";
import ChipInput from "material-ui-chip-input";
import {
    AvatarIcon,
    CallIcon,
    ChatIcon,
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    SnapchatIcon,
    TwitterIcon
} from "./assets";
import OtpInput from "react-otp-input";
import {withRouter} from 'react-router';
import {withTranslation} from "react-i18next";
import {Hyperlink} from "../../customform/src/assets";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { NoProfile_Img } from "../../search/src/assets";

class ChairmanProfile extends ProfileController {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {
        this.getProfile();
    }

    render() {
        const {classes,t}: any = this.props;
        let profileData = this.state.profiledata

        return (
            <>
            <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
      
                <Box
                    style={{background: "#F7F9FE"}}
                    className={classes.ChairmanProfile}
                >
                    <DashboardHeader {...this.props} />
                    <Box style={{display: "flex"}}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            <ChairmanSidebarWeb {...this.props} />
                        </Grid>

                        <Grid item xs={9} md={9} sm={9} style={{paddingTop: 35}}>
                            <Container>
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            <Box component="span" style={{color: "#2B6FED"}}>
                                                My Profile
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading bold-text">
                                            My Profile
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="my-profile-box">
                                    <Box className="heading">
                                        <Typography variant="h6" className="sub-heading bold-text">
                                            General Details
                                        </Typography>
                                        {/* <Box className="setting">
                      <img src={SettingIcon} alt="setting" />
                      <span>Other Can See</span>
                    </Box> */}
                                    </Box>
                                    <Card className="profile-details-box">
                                        <Grid container>
                                            <Grid item xs={3} className="left-side" style={{padding: 20}}>
                                                <SectionOne profileData={profileData}
                                                            handleClick={() => this.props.history.push('/chairmanchat')}/>
                                            </Grid>
                                            <Grid item xs={1} className="border"/>
                                            <Grid item xs={8} className="right-side" style={{padding: 20}}>
                                                <SectionTwo profileData={profileData}/>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Box>
                                <Box className="edit-button">
                                    <Button onClick={() => this.setState({showDialog: true})}>
                                        Edit Details
                                    </Button>
                                </Box>
                            </Container>
                        </Grid>
                    </Box>

                    <Dialog
                        open={this.state.showDialog}
                        onClose={() => this.setState({showDialog: false})}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="diloag-wrapper"
                        PaperProps={{
                            style: {
                                borderRadius: '15px',
                                maxWidth: 700,
                                width: '100%'

                            },
                        }}
                    >
                        <Grid container>
                            <Grid xs={12} style={{borderBottom: '1px solid #e9dede', padding: '1rem'}}>
                                <Box display='flex' justifyContent='space-between'>
                                    <p className="bold-text" style={{fontWeight: 600}}>
                                        {t("Edit My Profile")}
                                    </p>
                                    <p onClick={() => this.setState({showDialog: false})} style={{cursor: 'pointer'}}>
                                        X
                                    </p>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container className="main-content-block" style={{marginTop: '1.5rem', padding: '0rem 1rem 0rem 1rem'}}>
                            <Grid xs={12} className='inputPlaceholderRegistration'>
                                <Formik initialValues={{
                                    bannerUrl: profileData?.attributes?.profile_pic,
                                    full_name: profileData?.attributes?.full_name?.name,
                                    banner: '',
                                    phone: profileData?.attributes?.full_phone_number?.phone_number,
                                    email: profileData?.attributes?.email?.email,
                                    male: profileData?.attributes?.gender?.gender === 'Male' ? true : false,
                                    female: profileData?.attributes?.gender?.gender === 'Female' ? true : false,
                                    DOB: profileData?.attributes?.date_of_birth?.date_of_birth,
                                    gender: profileData?.attributes?.gender?.gender,
                                    hobbies: profileData?.attributes?.hobbies?.hobbies ? profileData?.attributes?.hobbies?.hobbies : [],
                                    twitter: profileData?.attributes?.website[0].twitter_link,
                                    fb: profileData?.attributes?.website[2].fb_link,
                                    insta: profileData?.attributes?.website[1].instagram_link,
                                    snap: profileData?.attributes?.website[3].snapchat_link,
                                    bio: profileData?.attributes?.bio?.bio
                                }}
                                        validationSchema={this.profileSchema()}
                                        validateOnMount={true}
                                        onSubmit={(values) => {
                                            this.updateChairmenProfile(values)
                                        }}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          isValid, handleChange,
                                          setFieldValue, setFieldError
                                      }) => (
                                        <Form className="commonForm" translate="yes">
                                            <Box className='formGroup' style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
                                                <Box style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    marginTop: '1rem',
                                                    marginBottom: '1.5rem',
                                                    flexDirection: 'column',
                                                }}>
                                                    
                                                    {
                                                        values.bannerUrl.url ?

                                                            <Avatar src={values.bannerUrl?.url}/>
                                                            :
                                                            <img src={NoProfile_Img}/>
                                                    }
                                                    <label htmlFor="file1" className="bold-text"
                                                           style={{color: '#FC8434', fontWeight: 'bold'}}>
                                                        {t("Add Profile Picture")}
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
                                                        <ErrorMessage className="text-error" component="Typography"
                                                                      name="banner"/>
                                                    </Typography>
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

                                           
                                                <Grid container spacing={2} style={{width:"98%"}}>
                                                    <Grid item xs={6}>
                                                        {/* name */}
                                                        <Box
                                                            className="formInputGrp"
                                                            style={{
                                                                border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                borderRadius: "10px",
                                                                backgroundColor: "#f9f9f9",
                                                                height: '59px',
                                                                width:"100%"
                                                            }}
                                                        >
                                                            <Field
                                                                className="formInput"
                                                                name="full_name"
                                                                value={values.full_name}
                                                                placeholder={"Enter your name"}

                                                            />
                                                            <span className="frmLeftIcons" style={{top: '29%'}}>
                                                          <img src={user}/>
                                                        </span>
                                                        </Box>
                                                     
                                                            <Typography
                                                                style={{
                                                                    color: "#F14E24",

                                                                    fontWeight: 300,
                                                                    fontSize: 14,
                                                                    marginTop: 5,
                                                                    marginLeft: 0
                                                                }}
                                                            >
                                                                <ErrorMessage className="text-error" component="Typography"
                                                                              name="full_name"/>
                                                            </Typography>
                                              
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {/* phone */}
                                                        <Box>
                                                            <Box
                                                                marginTop='1rem'
                                                                className='formInputGrp'
                                                                display="flex"
                                                                overflow="hidden"
                                                                alignItems="center"
                                                                height="56px"
                                                                border="0.1px solid rgb(209 209 209)"
                                                                borderRadius="10px"
                                                                bgcolor="#f9f9f9"
                                                                style={{width: '100%'}}
                                                            >
                                                                <Box>
                                                                    <FormControl variant="outlined">

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
                                                                                <MenuItem key={item.dial_code}
                                                                                          value={item.dial_code}> <img
                                                                                    src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`}
                                                                                    width='15' height='15'
                                                                                    style={{marginRight: '5px'}}/>
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
                                                                        marginLeft: 0,
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
                                                                    <ErrorMessage className="text-error"
                                                                                  component="Typography" name="phone"/>
                                                                </Typography>
                                             
                                                            <p style={{
                                                                color: '#FC8434',
                                                                textAlign: 'right',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer'
                                                            }} onClick={() => this.setState({showDialog1: true})}>
                                                                Update phone number
                                                            </p>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Box
                                                            className="formInputGrp"
                                                            style={{
                                                                width: '100%',
                                                                border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                borderRadius: "10px",
                                                                backgroundColor: "#f9f9f9",
                                                                marginTop:"0px"
                                                            }}
                                                        >
                                                            <Field
                                                                className="formInput"
                                                                value={values.email}
                                                                name="email"
                                                                placeholder={"Email ID"}
                                                            />
                                                            <span className="frmLeftIcons">
                                                              <img src={emailedit}/>
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
                                                                <ErrorMessage className="text-error" component="Typography"
                                                                              name="email"/>
                                                            </Typography>
                                                  
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {/* Bio */}
                                                        <Box
                                                            className="formInputGrp"
                                                            style={{
                                                                width: '100%',
                                                                border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                borderRadius: "10px",
                                                                backgroundColor: "#f9f9f9",
                                                                marginTop:"0px"
                                                            }}
                                                        >
                                                            <Field
                                                                className="formInput"
                                                                name="bio"
                                                                value={values.bio}
                                                                placeholder={"Enter your bio"}

                                                            />
                                                            <span className="frmLeftIcons">
                                                              <img src={Hyperlink}/>
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
                                                                <ErrorMessage className="text-error" component="Typography" name="bio"/>
                                                            </Typography>
                                                      
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography className="bold-text" style={{marginBottom:"10px"}}>
                                                            {t("Gender")}
                                                        </Typography>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            defaultValue={values.gender}
                                                            style={{width: '100%',marginLeft:"20px"}}>
                                                            <Grid container spacing={2} className="formCheckboxProfile">
                                                                <Grid xs={6}>
                                                                    <FormControlLabel
                                                                        className={values.gender == 'Female' ? 'active' : 'unactive'}
                                                                        name='gender' onChange={handleChange} value="Female"
                                                                        control={<Radio/>} label="Female" style={{
                                                                        borderRadius: 10,
                                                                        border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                        width: '95%',
                                                                        height: "55px",
                                                                        background: '#F9F9F9',
                                                                        marginRight:"0px",
                                                                        backgroundColor:"white",
                                                                    }}/>
                                                                </Grid>
                                                                <Grid xs={6}>
                                                                    <FormControlLabel
                                                                        className={values.gender == 'Male' ? 'active' : 'unactive'}
                                                                        name='gender' onChange={handleChange} value="Male"
                                                                        control={<Radio/>} label="Male" style={{
                                                                        borderRadius: 10,
                                                                        border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                        width: '95%',
                                                                        height: "55px",
                                                                        background: '#F9F9F9',
                                                                        backgroundColor:"white",
                                                                    }}/>
                                                                </Grid>
                                                        </Grid>
                                                        </RadioGroup>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Box
                                                            className="formInputGrp"
                                                            style={{
                                                                width: '100%',
                                                                border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                borderRadius: "10px",
                                                                backgroundColor: "#f9f9f9"
                                                            }}>
                                                            <Field
                                                                className="formInput"
                                                                name="DOB"
                                                                placeholder={"Date of Birth"}
                                                                
                                                            />
                                                            <span className="frmLeftIcons" style={{top: '24%'}}>
                                                          <img src={calendar}/>
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
                                                                <ErrorMessage className="text-error" component="Typography"
                                                                              name="DOB"/>
                                                            </Typography>
                                                
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Box
                                                            className="formInputGrp"
                                                            style={{
                                                                width: '100%',
                                                                border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                borderRadius: "10px",
                                                                backgroundColor: "#f9f9f9"
                                                            }}
                                                        >
                                                            <ChipInput
                                                                className="formInput"
                                                                placeholder="Hobbies"
                                                                style={{padding: '10px 0px 7px 50px', width: '79%'}}
                                                                disableUnderline={true}
                                                                value={values.hobbies}
                                                                // onChange={(chip) => setFieldValue('hobbies', chip)}
                                                                onAdd={(chip: any) => this.handleAddChip(setFieldValue, chip, values.hobbies)}
                                                                onDelete={(chip: any, index: any) => this.handleDeleteChip(setFieldValue, chip, values.hobbies, index)}

                                                            />
                                                            <span className="frmLeftIcons">
                                                              <img src={heart}/>
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
                                                                <ErrorMessage className="text-error" component="Typography"
                                                                              name="hobbies"/>
                                                            </Typography>
                                                      
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            width: '100%'
                                                        }}>

                                                            {/* Twitter */}
                                                            <Box
                                                                className="formInputGrp"
                                                                style={{
                                                                    border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#f9f9f9",
                                                                    marginTop:"0px"
                                                                }}
                                                            >
                                                                <Field
                                                                    className="formInput"
                                                                    name="twitter"
                                                                    type='url'
                                                                    value={values.twitter}
                                                                    placeholder={"Twitter profile link"}

                                                                />
                                                                <span className="frmLeftIcons">
                                                                  <img src={twitteredit}/>
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
                                                                    <ErrorMessage className="text-error" component="Typography" name="twitter"/>
                                                                </Typography>
                                                 
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            width: '100%'
                                                        }}>

                                                            {/* fb */}
                                                            <Box
                                                                className="formInputGrp"
                                                                style={{
                                                                    border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#f9f9f9",
                                                                    marginTop:"0px"
                                                                }}
                                                            >
                                                                <Field
                                                                    className="formInput"
                                                                    name="fb"
                                                                    type='url'
                                                                    value={values.fb}
                                                                    placeholder={"Faceook  profile link"}

                                                                />
                                                                <span className="frmLeftIcons">
                                                                  <img src={fbedit}/>
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
                                                                    <ErrorMessage className="text-error"
                                                                                  component="Typography" name="fb"/>
                                                                </Typography>
                                                         
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            width: '100%'
                                                        }}>

                                                            {/* Insta */}
                                                            <Box
                                                                className="formInputGrp"
                                                                style={{
                                                                    border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#f9f9f9",
                                                                    marginTop:"0px"
                                                                }}
                                                            >
                                                                <Field
                                                                    className="formInput"
                                                                    name="insta"
                                                                    type='url'
                                                                    value={values.insta}
                                                                    placeholder={"Instagram profile link"}


                                                                />
                                                                <span className="frmLeftIcons">
                                                              <img src={instaedit}/>
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
                                                                    <ErrorMessage className="text-error"
                                                                                  component="Typography" name="insta"/>
                                                                </Typography>
                                                         
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            width: '100%'
                                                        }}>
                                                            {/* snap */}
                                                            <Box
                                                                className="formInputGrp"
                                                                style={{
                                                                    border: "0.1px solid rgb(209 209 209 / 100%)",
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#f9f9f9",
                                                                    marginTop:"0px"
                                                                }}
                                                            >
                                                                <Field
                                                                    className="formInput"
                                                                    name="snap"
                                                                    type='url'
                                                                    value={values.snap}
                                                                    placeholder={"Snapchat profile link"}

                                                                />
                                                                <span className="frmLeftIcons">
                                                                  <img src={snapedit}/>
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
                                                                    <ErrorMessage className="text-error"
                                                                                  component="Typography" name="snap"/>
                                                                </Typography>
                                                       
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Box style={{padding: '1rem 1rem 0rem 1rem', borderTop: '1px solid #1A181D25', display: 'flex', justifyContent: 'end'}}>
                                                <DeclineButton variant='contained' onClick={() => {localStorage.setItem('profileData', JSON.stringify(profileData));this.setState({showDialog: false})}} style={{marginRight: '1rem'}}>
                                                    CANCEL
                                                </DeclineButton>
                                                <Box className="customButton" style={{width:'10rem'}}>
                                                    <Button variant="contained" type="submit" style={{borderRadius:"10px"}}>
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
                        onClose={() => this.setState({showDialog1: false})}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="diloag-wrapper"
                        PaperProps={{
                            style: {
                                borderRadius: '15px',
                                padding: '2rem',
                                margin: 0,
                                overflow: 'visible',
                            },
                        }}
                    >
                        <Box style={{fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right'}}
                             onClick={() => this.setState({showDialog1: false})}>
                            x
                        </Box>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>

                                <img src={mobile}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>

                                <p style={{fontWeight: 600, fontSize: '1.25rem', textAlign: 'center'}}>
                                    Add New Mobile Number

                                </p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <p style={{fontWeight: 400, fontSize: '0.8rem', textAlign: 'center'}}>
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
                                        onSubmit={(values) => {
                                            this.updatePhone(values)
                                        }}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          isValid, handleChange,
                                          setFieldValue, setFieldError
                                      }) => (
                                        <Form className="commonForm" translate="yes">

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
                                            >
                                                <Box>
                                                    <FormControl variant="outlined">
                                                        <PhoneInput
                                                            inputProps={{name: 'selectCode'}}
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

                                            {
                                                this.state.error == 'Invalid or Unrecognized Phone Number' ?
                                                    <p className="text-error">{this.state.error}</p>
                                                    : null

                                            }
                                           
                                                <Typography
                                                    style={{
                                                        color: "#F14E24",
                                                        fontWeight: 300,
                                                        fontSize: 14,
                                                        marginTop: 5,
                                                        marginLeft: 10
                                                    }}
                                                >
                                                    <ErrorMessage className="text-error" component="Typography"
                                                                  name="phone"/>

                                                </Typography>
                                 

                                            <Box className="dialog-footer desktop-ui">
                                                <DialogActions className="customButton">
                                                    <Button
                                                        type="submit" variant="contained">
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
                        onClose={() => this.setState({showDialogDelete: false})}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="diloag-wrapper"
                        PaperProps={{
                            style: {
                                borderRadius: '15px',
                                padding: '1rem',
                                margin: 0,
                                minWidth: '400px',
                                minHeight: '344px'
                            },
                        }}
                    >
                        <Box style={{fontSize: "1.25rem", fontWeight: 'bold', textAlign: 'right'}}
                             onClick={() => this.setState({showDialogDelete: false})}>
                            x
                        </Box>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginTop: '2rem'
                            }}>

                                <img src={mobile}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>

                                <p style={{fontWeight: 600, fontSize: '1.25rem', textAlign: 'center'}}>
                                    Verify New Mobile Number

                                </p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <p style={{fontWeight: 400, fontSize: '0.8rem', textAlign: 'center'}}>
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
                                <Box className="customButton row-btn" style={{marginTop: '2.25rem'}}>
                                    <Button variant="contained" onClick={() => {
                                        this.verifyOtp()
                                    }}>SEND</Button>
                                </Box>
                            </Grid>
                        </Grid>

                    </Dialog>
                </Box>
            </>
        );
    }
}

// @ts-ignore
export default withTranslation()(withRouter(withStyles(ProfileStyleWeb)(ChairmanProfile)));


const SectionOne = (props: any) => {
    return <>
        <img
            src={props?.profileData?.attributes?.profile_pic?.url || NoProfile_Img}
            alt="avatar"
            className="profile"
        />
        <Typography variant="h6" className="sub-heading bold-text">
            {props?.profileData?.attributes?.full_name.name || 'N/A'}
        </Typography>

        <p> {props?.profileData?.attributes?.apartment_number?.apartment_number && 'Unit - '}{props?.profileData?.attributes?.apartment_number?.apartment_number || 'N/A'}</p>
        <Box className="icons">
            <img src={ChatIcon} alt="chat" onClick={props.handleClick}/>
            <img src={CallIcon} alt="phone"
                 onClick={() => document.location.href = `tel:${props?.profileData?.attributes?.full_phone_number?.full_phone_number}`}/>
            <img src={EmailIcon} alt="email"
                 onClick={() => document.location.href = `mailto:${props?.profileData?.attributes?.email?.email}`}/>
        </Box>
    </>
}

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        width:"10rem",
        borderRadius:"10px",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);

const SectionTwo = (profileData: any) => {
    const checkNosocialMedia = (profileData: any) => {
        if (!profileData?.attributes?.website[0].twitter_link) {
            if (!profileData?.attributes?.website[1].instagram_link) {
                if (!profileData?.attributes?.website[2].fb_link) {
                    if (!profileData?.attributes?.website[3].snapchat_link) {
                        return 'No social media handle'
                    }
                }

            }
        }

    }
    return <>
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
                                profileData?.attributes?.hobbies?.hobbies.map((item: any) => <>
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
                        profileData?.attributes?.website[0].twitter_link &&
                        <Button href={profileData?.attributes?.website[0].twitter_link} target="_blank">
                            <img src={TwitterIcon} alt="phone"/>
                        </Button>
                    }
                    {
                        profileData?.attributes?.website[1].instagram_link &&
                        <Button href={profileData?.attributes?.website[1].instagram_link} target="_blank">
                            <img src={InstagramIcon} alt="chat"/>
                        </Button>
                    }
                    {
                        profileData?.attributes?.website[2].fb_link &&
                        <Button href={profileData?.attributes?.website[2].fb_link} target="_blank">
                            <img src={FacebookIcon} alt="chat"/>
                        </Button>
                    }
                    {
                        profileData?.attributes?.website[3].snapchat_link &&
                        <Button href={profileData?.attributes?.website[3].snapchat_link} target="_blank">
                            <img src={SnapchatIcon} alt="email"/>
                        </Button>
                    }
                    {
                        checkNosocialMedia(profileData)


                    }


                </Box>
            </Grid>
        </Grid>
        

    </>
}

// Customizable Area End