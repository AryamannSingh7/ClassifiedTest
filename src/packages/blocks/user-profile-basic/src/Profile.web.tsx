//@ts-ignore
//@ts-nocheck

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
import { Building1, email, fb, instaedit, message, phone, snapedit, twitter } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileController from "./ProfileController.web";
import FamilyListWeb from "../../customform/src/FamilyList.web";








class Profile extends ProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

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
                <div className="flex" style={{width:'100%'}}>
                  <div style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>

                    <ArrowBackIcon onClick={() => window.history.back()} />
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
                    {// @ts-ignore
                    // @ts-nocheck
                    localStorage.setItem('profileData',JSON.stringify(profileData));
                      this.props.history.push('/editprofile')}
                      }>
                      Edit profile
                    </MenuItem>
                    <MenuItem key="2" >
                      Publish details for others
                    </MenuItem>
                    <MenuItem key="3" >
                      Disable Chat
                    </MenuItem>
                  </Menu>
                </div>

              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='center' marginTop='1rem' alignItems='center' flexDirection='column'>

                <img className="profile_img" src="https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car-with-fire-smoke_110488-1759.jpg" />
                  <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    {profileData?.attributes?.full_name || 'N/A'}
                  </p>
                  </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Box display='flex' justifyContent='center' marginTop='1rem'>
                  <img src={message} className='first_icon'/>
                  <img src={phone} className='second_icon' onClick={() => document.location.href = `tel:${profileData.attributes.full_phone_number}`}/>
                  <img src={email} className='third_icon' onClick={() => document.location.href = `mailto:${profileData.attributes.email}`} />
                </Box>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} style={{display:'flex',justifyContent:'center',fontsize:'0.75rem',marginTop:'1rem',gap:'1rem'}}>

              <Box style={{fontSize:"0.75rem"}}>
                <label className='label'>
                  Gender :
                </label>
                <span>
                    {" "}  {profileData?.attributes?.gender || 'N/A'}
                </span>
              </Box>
                <Box style={{ fontSize: "0.75rem" }}>
                <label className='label'>
                  DOB :
                </label>
                <span>
                   {" "} {profileData?.attributes?.date_of_birth}
                </span>
              </Box>
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
                  {profileData?.attributes?.bio || 'N/A'}
                </p>

              </Grid>
            </Grid>

       {
              profileData?.attributes?.hobbies?.length>0 && <>
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
              profileData?.attributes?.hobbies && <>

                <Grid container>
                  <Grid item xs={12}>
                    {
                      profileData?.attributes?.hobbies.map(item => <>
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
                    profileData?.attributes?.website[0].twitter_link && <img src={twitter} />
                  }
                  {
                    profileData?.attributes?.website[1].instagram_link && <img src={instaedit} className='third_icon' />
                  }
                  {
                    profileData?.attributes?.website[2].fb_link && <img src={fb} className='third_icon' />
                  }
                  {
                    profileData?.attributes?.website[3].snapchat_link && <img src={snapedit} className='third_icon' />
                  }


                </Box>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>

                <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  My Family
                </p>

              </Grid>
            </Grid>
            <Grid container >
              <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  fullWidth={true}
                  className={'btn'}
                  variant="contained"
                  type="submit"
                  onClick={() => this.props.history.push("/NewFamily")}
                  style={{
                    border: "1px solid #2B6FEC",
                    background:'white',
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
export default withRouter(Profile)

function NoVehicle({ props }) {
  return <>
    <div style={{ height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

          {/* <img src={NoVehicles} /> */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

          <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
            No Family Member
            <br />
            Registered
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
            Looks like you havn’t registered any family Members!
            You can register a new family member by tapping the below button.
          </p>
        </Grid>
      </Grid>
    </div>
    <Grid container >
      <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          fullWidth={true}
          className={'btn'}
          variant="contained"
          type="submit"
          onClick={() => props.history.push("/NewFamily")}
          style={{
            backgroundColor: "#2B6FEC",
            borderRadius: 16,
            height: 54,
            boxShadow: "none",
            color: "#F7F7FC",
            fontWeight: 600,
            fontSize: 16,
            maxWidth: 350
          }}

        >
          Add member to my family
        </Button>
      </Grid>
    </Grid>
    <Loader loading={this.state.loading} />
  </>
}

