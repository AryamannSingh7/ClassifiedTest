import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, IconButton, Dialog, DialogActions, DialogContent
} from "@material-ui/core";
import { Building1, Chat_Disable_Icon, Chat_Icon, Contact_Icon,  Email_Msg_Icon, FB_Icon, Instagram_Icon, NoProfile_Img, Pencil, Snapchat_Icon, Twitter_Icon } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileController from "./ProfileController.web";
import AlertErrorWeb from "../../../components/src/AlertError.web";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Menu, MenuItem } from "@szhsin/react-menu";
import { withTranslation } from "react-i18next";

class Profile extends ProfileController {

  async componentDidMount() {
    this.getProfile();
  }

  render() {
    let profileData = this.state.profiledata;
    const { t, classes }: any = this.props;

    return (

      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset', overflowY: 'auto', overflowX: 'hidden' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center',borderBottom:'2px solid #F2F2F2' }}>
                <div className="flex" style={{width:'100%', alignItems: 'center'}}>
                  <div style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>
                    <KeyboardBackspaceIcon onClick={this.redirectToDashboard} />
                    <p style={{ fontSize: '16px' }} className="bold-text">
                      {t("My Profile")}
                    </p>
                  </div>

                  <div className="right-icon profile-menu">
                    <Menu
                      menuButton={
                        <IconButton>
                           <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <MenuItem onClick={() =>{
                        localStorage.setItem('profileData',JSON.stringify(profileData));
                        // @ts-ignore
                        // @ts-nocheck
                        this.props.history.push('/editprofile');
                      }}
                      >{t("Edit profile")}</MenuItem>
                      <MenuItem onClick={() =>{
                        localStorage.setItem('profileData', JSON.stringify(profileData));
                        // @ts-ignore
                        // @ts-nocheck
                        this.props.history.push('/publicview');
                      }}>{t("Publish details for others")}</MenuItem>
                      <MenuItem onClick={() => this.disablechat()}>{
                        profileData?.attributes?.disable_chat ? 'Enable Chat' : 'Disable Chat'
                      }</MenuItem>
                    </Menu>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container style={{marginTop:'1.5rem'}}>
              <Grid item xs={12} >
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Box className="card-top-block">
                  <img style={{width:64,height:64,borderRadius:'50%'}} src={profileData?.attributes?.profile_pic?.url || NoProfile_Img} className="info-icon" alt="info-icon" />
                  <Typography component="h4" className="title bold-text" style={{ fontSize:'18px', paddingTop:"0"}}>
                    {profileData?.attributes?.full_name?.name}
                  </Typography>
                  <Box className="social-raw">
                  {
                    profileData?.attributes?.disable_chat ?
                    <Box className="blocks">
                      <img src={Chat_Disable_Icon}  className="icons" alt="info-icon" width='15' />
                    </Box> :
                    <Box className="blocks">
                      <img src={Chat_Icon} onClick={()=>this.props.history.push('/inbox')} className="icons" alt="info-icon" />
                    </Box>
                  }
                      <Box className="blocks">
                        <a href={`tel:${profileData?.attributes?.full_phone_number?.full_phone_number}`}>
                          <img src={Contact_Icon} className="icons" alt="info-icon" />
                        </a>
                      </Box>
                      <Box className="blocks" style={{border:0}}>
                        <a href={`mailto:${profileData?.attributes?.email?.email}`}>
                          <img src={Email_Msg_Icon} className="icons" alt="info-icon" />
                        </a>
                      </Box>
                  </Box>
                  <Box className="relation-row">
                    <Box className="blocks" style={{ display: 'flex',gap:'1rem', marginTop:"15px" }}>
                      <div>
                      {
                        profileData?.attributes?.gender?.publilc_access ?
                          <Box style={{display:"flex", alignItems:"center", gap:"5px"}}>
                            <p className="bold-text">Gender:</p>
                            <span style={{fontWeight:400, fontSize:"14px"}}>{profileData?.attributes?.gender?.gender}</span>
                          </Box>
                          : null
                      }
                      </div>
                      <div>

                      {
                        profileData?.attributes?.date_of_birth?.publilc_access ?
                          <Box style={{display:"flex", alignItems:"center", gap:"5px"}}>
                            <p className="bold-text">DOB:</p>
                            <span style={{fontWeight:400, fontSize:"14px"}}>{profileData?.attributes?.date_of_birth?.date_of_birth}</span>
                          </Box>
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
                <p className="bold-text" style={{ padding:"0 10px", fontWeight: 'bold', fontSize: '18px', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  Bio
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <p style={{ padding:"0 10px", fontSize: '14px', marginBottom: '0.5rem' }}>
                  {profileData?.attributes?.bio?.bio || 'N/A'}
                </p>
              </Grid>
            </Grid>

            {
              profileData?.attributes?.hobbies?.hobbies != null &&  profileData?.attributes?.hobbies?.hobbies.length>0 &&
              <>
                <Grid container>
                  <Grid item xs={12}>
                    <p className="bold-text" style={{ padding:"0 10px", fontWeight: 'bold', fontSize: '18px', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      Hobbies
                    </p>
                  </Grid>
                </Grid>
              </>
            }

            {
              profileData?.attributes?.hobbies?.hobbies && <>
                <Grid container>
                  <Grid item xs={12} style={{ display:"flex", flexWrap:"wrap"}}>
                    {
                      profileData?.attributes?.hobbies?.hobbies.map((item:any) => <>
                        <span className="hobbies" style={{marginTop:'0', marginBottom:'0.5rem'}}>
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
                <p className="bold-text" style={{ padding:"0 10px", fontWeight: 'bold', fontSize: '18px', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
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
                <Grid container style={{ padding:"0 10px",}}>
                  <Grid item xs={12} style={{ display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <p className="bold-text" style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      My Family
                    </p>
                    {
                      profileData?.attributes?.families?.families?.length > 0 && 
                      <img src={Pencil} width='25' height='25' onClick={()=>this.props.history.push('/familylist')}/>
                    }
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ padding:"0 10px", margin: '0.25rem' }}>
                    {
                      profileData?.attributes?.families.families && profileData?.attributes?.families.families.map((item: any) =>
                        <>
                          <Grid xs={12} className="card fam" spacing={4} style={{marginTop:0}}>
                            <div className="flex">
                              <div style={{ display: "flex", alignItems: 'center', gap: '0.5rem' }}>
                                {/* <Avatar src={item?.attributes?.member_pic} /> */}
                                <p className="bold-text" style={{fontSize:"16px"}}>
                                  {item.attributes.name}
                                </p>
                              </div>
                              <div className="right-icon family-menu">
                                <Menu
                                  menuButton={
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                >
                                  <MenuItem onClick={() => this.handleClose(item)}>{t("Edit")}</MenuItem>
                                  <MenuItem onClick={() => { this.setState({ showDialogDelete: true }); localStorage.setItem('selectFamily', JSON.stringify(item)) }}>{t("Delete")}</MenuItem>
                                </Menu>
                              </div>
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
                {
                  profileData?.attributes?.families?.families == null && 
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
                          borderRadius: 25,
                          height: 50,
                          boxShadow: "none",
                          color: "#2B6FEC",
                          fontWeight: 600,
                          fontSize: 16,
                          maxWidth: 350
                        }}

                      >
                        {t("Add Family Details")}
                      </Button>
                    </Grid>
                  </Grid>
                }
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
          className="delete-document personal"
          fullWidth
          onClose={() => this.setState({ showDialogDelete: false, showDialog: false })}
          open={this.state.showDialogDelete}
        >
          <DialogContent>
            <Box textAlign="center">
              {/* <img src={DeleteUnitIcon} alt="ExclamationIcon" /> */}
              <Typography variant="h6" className="bold-text">
                Delete registered <br /> Family Member
              </Typography>
              <Typography variant="body1">
                {t(
                  "Are you should want to delete this registered family member from this App?"
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.deleteRequest()}>
                  {t("Yes, Delete")}
                </Button>
                <Button onClick={() => this.setState({ showDialogDelete: false, showDialog: false })}>{t("No, Don’t Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Loader loading={this.state.loading} />

        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
      </>
    )
  }
}

// @ts-ignore
// @ts-nocheck
export default withTranslation()(withRouter(Profile));