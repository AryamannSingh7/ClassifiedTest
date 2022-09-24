import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogActions, Avatar
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Chat_Icon, Contact_Icon, email, Email_Disable_Icon, Email_Msg_Icon, fb, FB_Icon, instaedit, Instagram_Icon, message, NoProfile_Img, Pencil, phone, Snapchat_Icon, snapedit, twitter, Twitter_Icon } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileController from "./ProfileController.web";
import FamilyListWeb from "../../customform/src/FamilyList.web";
class Profile extends ProfileController {

  async componentDidMount() {
this.getProfile()
    // this.getVehicle()

  }

  render() {
    let profileData =this.state.profiledata
    return (

      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset', overflowY: 'auto', overflowX: 'hidden' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="flex" style={{width:'100%',borderBottom:'3px solid #F2F2F2',marginTop:'1.25rem'}}>
                  <div style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>

                    <ArrowBackIcon onClick={this.redirectToDashboard} />
                    <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                      My Profile
                    </p>
                  </div>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.showDialog}
                    onClose={this.handleClose}


                  >
                    <MenuItem key="1" onClick={() =>
                    {

                    localStorage.setItem('profileData',JSON.stringify(profileData));
                        // @ts-ignore
                    // @ts-nocheck
                      this.props.history.push('/editprofile')}
                      }>
                      Edit profile
                    </MenuItem>
                    <MenuItem key="2" onClick={() => {
                      localStorage.setItem('profileData', JSON.stringify(profileData));
                      // @ts-ignore
                      // @ts-nocheck
                      this.props.history.push('/publicview')
                    }
                    }>
                      Publish details for others
                    </MenuItem>
                    <MenuItem key="3" onClick={this.disablechat} >
                      {
                        profileData?.attributes?.disable_chat ? 'Enable Chat' : 'Disable Chat'
                      }

                    </MenuItem>
                  </Menu>
                </div>

              </Grid>
            </Grid>

            {/* <Grid container>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='center' marginTop='1rem' alignItems='center' flexDirection='column'>

                <img className="profile_img" src="https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car-with-fire-smoke_110488-1759.jpg" />
                  <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    {profileData?.attributes?.full_name?.name || 'N/A'}
                  </p>
                  </Box>
              </Grid>
            </Grid> */}
            <Grid container style={{marginTop:'1.5rem'}}>
              <Grid item xs={12} >

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                {/* <Box display='flex' justifyContent='center' marginTop='1rem'>
                  <img src={message} className='first_icon'/>
                  <img src={phone} className='second_icon' onClick={() => document.location.href = `tel:${profileData?.attributes?.full_phone_number?.full_phone_number}`}/>
                  <img src={email} className='third_icon' onClick={() => document.location.href = `mailto:${profileData?.attributes?.email?.email}`} />
                </Box> */}
                <Box className="card-top-block">
                  <img style={{width:100,height:100,borderRadius:'50%'}} src={profileData?.attributes?.profile_pic || NoProfile_Img} className="info-icon" alt="info-icon" />
                  <Typography component="h4" className="title" style={{fontSize:'18px'}}>
                    {profileData?.attributes?.full_name?.name}
                  </Typography>
                  <Box className="social-raw">

                        <Box className="blocks">
                          <img src={Chat_Icon} className="icons" alt="info-icon" />
                        </Box>


                      <Box className="blocks">
                        <a href={`tel:${profileData?.attributes?.full_phone_number?.full_phone_number}`}>
                          <img src={Contact_Icon} className="icons" alt="info-icon" />
                        </a>
                      </Box>


                      <Box className="blocks">
                        <a href={`mailto:${profileData?.attributes?.email?.email}`}>
                          <img src={Email_Msg_Icon} className="icons" alt="info-icon" />
                        </a>
                      </Box>

                  </Box>
                  <Box className="relation-row">
                    <Box className="blocks" style={{ display: 'flex',gap:'1rem' }}>
                      <div>

                      {
                        profileData?.attributes?.gender?.publilc_access ?
                          <Typography component="h4">
                            Gender:
                            <span className="" style={{fontWeight:400}}>{profileData?.attributes?.gender?.gender}</span>
                          </Typography>
                          : null
                      }
                      </div>
                      <div>

                      {
                        profileData?.attributes?.date_of_birth?.publilc_access ?
                          <Typography component="h4">
                            DOB:
                            <span className="" style={{fontWeight:400}}>{profileData?.attributes?.date_of_birth?.date_of_birth}</span>
                          </Typography>
                          :
                          null
                      }
                      </div>
                    </Box>
                  </Box>
                </Box>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginTop:'1rem',gap:'1rem'}}>



              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>

                <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  Bio
                </p>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>

                <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {profileData?.attributes?.bio?.bio || 'N/A'}
                </p>

              </Grid>
            </Grid>

       {
              profileData?.attributes?.hobbies?.hobbies != null &&  profileData?.attributes?.hobbies?.hobbies.length>0 &&
              <>
                <Grid container>
                  <Grid item xs={12}>

                    <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      Hobbies
                    </p>

                  </Grid>
                </Grid>
              </>
       }
{
              profileData?.attributes?.hobbies?.hobbies && <>

                <Grid container>
                  <Grid item xs={12} style={{marginTop:'0.5rem',marginBottom:'0.5rem'}}>
                    {
                      profileData?.attributes?.hobbies?.hobbies.map((item:any) => <>
                        <span className="hobbies">
                          {item}
                        </span>
                      </>)
                    }


                  </Grid>
                </Grid>
              </>
}


            <Grid container>
              <Grid item xs={12}>

                <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  Follow me on:
                </p>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='start' marginTop='1rem'>
                  {
                    profileData?.attributes?.website[0].twitter_link && <Button href={profileData?.attributes?.website[0].twitter_link} target="_blank">
                      <img src={Twitter_Icon} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[1].instagram_link && <Button href={profileData?.attributes?.website[1].instagram_link} target="_blank">
                      <img src={Instagram_Icon} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[2].fb_link && <Button href={profileData?.attributes?.website[2].fb_link} target="_blank">
                      <img src={FB_Icon} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileData?.attributes?.website[3].snapchat_link && <Button href={profileData?.attributes?.website[3].snapchat_link} target="_blank">
                      <img src={Snapchat_Icon} className="icon" alt="FB_Icon" />
                    </Button>
                  }


                </Box>

              </Grid>
            </Grid>

            {
              localStorage.getItem('userType') !== 'Owner' &&
              <>
                <Grid container>
                  <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                    <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      My Family
                    </p>

                    <img src={Pencil} width='25' height='25' onClick={()=>this.props.history.push('/familylist')}/>


                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ margin: '0.25rem' }}>
                    {

                      profileData?.attributes?.families.families &&     profileData?.attributes?.families.families.map((item: any) =>
                        <>
                          <Grid xs={12} className="card fam" >
                            <div className="flex">
                              <div style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>

                                {/* <Avatar src={item?.attributes?.member_pic} /> */}
                                <p className="text-bold">

                                  {item.attributes.name}
                                </p>
                              </div>
                              <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick2}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={this.state.showDialog2}
                                onClose={this.handleClose}


                              >
                                <MenuItem key="1" onClick={() => this.handleClose(item)}>
                                  Edit
                                </MenuItem>
                                <MenuItem key="2" onClick={() => { this.setState({ showDialogDelete: true }); localStorage.setItem('selectFamily', JSON.stringify(item)) }}>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </div>

                            <div>
                              <p className="fam-label">
                                Relation:
                              </p>
                              <p className="fam-value">
                                {item.attributes.relation.name}
                              </p>
                            </div>
                            <div>
                              <p className="fam-label">
                                ID:
                              </p>
                              <p className="fam-value">
                                {item.attributes.id_number}
                              </p>
                            </div>
                          </Grid>
                        </>
                      )
                    }


                  </Grid>
                </Grid>
                <Grid container >
                  <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      fullWidth={true}
                      className={'btn'}
                      variant="contained"
                      type="submit"

                      onClick={() => {
                        // @ts-ignore
                      // @ts-nocheck
                        this.props.history.push("/NewFamily")
                      }}
                      style={{
                        border: "1px solid #2B6FEC",
                        background: 'white',
                        borderRadius: 16,
                        height: 54,
                        boxShadow: "none",
                        color: "#2B6FEC",
                        fontWeight: 600,
                        fontSize: 16,
                        maxWidth: 350
                      }}

                    >
                      Add Family Details
                    </Button>
                  </Grid>
                </Grid>
              </>
            }




          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.showDialogDelete}
          onClose={() => this.setState({ showDialogDelete: false, showDialog: false })}
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

              {/* <img src={deleteI} /> */}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Delete registered
                <br />
                Family Member
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Are you should want to delete this registered family member from this App?
              </p>
            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button variant="contained" onClick={() => this.deleteRequest()} >
                yes, delete
              </Button>
              <Button onClick={() => this.setState({ showDialogDelete: false, showDialog: false })} variant='text'>
                No, don’t delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
// @ts-ignore
// @ts-nocheck
export default withRouter(Profile)



