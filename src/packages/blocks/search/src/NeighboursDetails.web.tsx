import React from "react";
//components
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import NeighboursController, { Props } from "./NeighboursController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//resorces
import {
  Tenant_Logo,
  Building1,
  Search_Icon,
  User1_Img,
  Chat_Icon,
  Contact_Icon,
  Setting_Icon,
  Email_Msg_Icon,
  Chat_Disable_Icon,
  Contact_Disable_Icon,
  Email_Disable_Icon,
  FB_Icon,
  Twitter_Icon,
  Instagram_Icon,
  Snapchat_Icon,
  NoProfile_Img,
}
  from "../src/assets";
class NeighboursDetails extends NeighboursController {
  //@ts-ignore
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    const id = localStorage.getItem("neighboursDetailsId");
    if (id)
      this.getNeighboursDetailsById(id);
    else
      //@ts-ignore
      this.props.history.push("/NeighboursListing")
  }

  render() {
    const { navigation } = this.props;
    const attributes = this.state?.getNeighboursDetails?.attributes;
    console.log("getNeighboursDetails=====>", this.state?.getNeighboursDetails)
    return (
      <>
        <Box className="login-wrapper incident-wrapper neighbour-listing-wrapper" style={{backgroundColor:"#ffffff"}}>
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block common_content_block" style={{ backgroundColor: "#ffffff" }}>
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    {
                      attributes?.full_name?.publilc_access && attributes?.apartment_number?.publilc_access ?
                        <h4>{attributes?.apartment_number?.apartment_number}</h4>
                        :
                        <h4>My Neighbours</h4>
                    }

                  </Box>
                  {/* <Button>
                    <img src={Setting_Icon} className="Search_Icon" alt="Search Icon" />
                  </Button> */}
                </Box>
                <Box className="content-block-wrapper neighbor-content-block-wrapper common-incident-block desktop-ui" style={{backgroundColor:"#ffffff"}}>
                  {/* neighbour detail section */}
                  {
                    attributes?.full_name?.publilc_access ?
                      <Box className="neighbour-detail-section">
                        <Card className="neighbour-card neighbour-detail-card card">
                          <CardContent className="card-content">
                            <Box className="card-top-block">
                              <img src={attributes?.profile_pic?.url || NoProfile_Img} className="info-icon" alt="info-icon" />
                              <Typography component="h4">
                                {attributes?.full_name?.name}
                              </Typography>
                              <Box className="social-raw">
                               {
                                 attributes?.disable_chat ?
                                 
                                <Box className="blocks">
                                      <img src={Chat_Disable_Icon}  className="icons" alt="info-icon" />
                              </Box>
                                :
                                <Box className="blocks">
                                      <img src={Chat_Icon} onClick={() => this.createChatRoom(attributes?.id)} className="icons" alt="info-icon" />
                                </Box>
                               }
                                {attributes?.full_phone_number?.publilc_access ?
                                  <Box className="blocks">
                                    <a href={`tel:${attributes?.full_phone_number?.full_phone_number}`}>
                                      <img src={Contact_Icon} className="icons" alt="info-icon" />
                                    </a>
                                  </Box>
                                  :
                                  <Box className="blocks">
                                    <img src={Contact_Disable_Icon} className="icons" alt="info-icon" />
                                  </Box>
                                }
                                {attributes?.email?.publilc_access ?
                                  <Box className="blocks">
                                    <a href={`mailto:${attributes?.email?.email}`}>
                                      <img src={Email_Msg_Icon} className="icons" alt="info-icon" />
                                    </a>
                                  </Box>
                                  :
                                  <Box className="blocks">
                                    <img src={Email_Disable_Icon} className="icons" alt="info-icon" />
                                  </Box>
                                }
                              </Box>
                              <Box className="relation-row">
                                <Box className="blocks" style={{ display: 'flex' }}>
                                  {
                                    attributes?.gender?.publilc_access ?
                                      <Typography component="h4">
                                        Gender:
                                        <span className="title">{attributes?.gender?.gender}</span>
                                      </Typography>
                                      : null
                                  }
                                  {
                                    attributes?.date_of_birth?.publilc_access ?
                                      <Typography component="h4">
                                        DOB:
                                        <span className="title">{attributes?.date_of_birth?.date_of_birth}</span>
                                      </Typography>
                                      :
                                      null
                                  }
                                </Box>
                              </Box>
                            </Box>
                            <Box className="bio-content-row">
                              {
                                attributes?.bio?.publilc_access ?
                                  <Box className="bio-row">
                                    <Typography component="h4">
                                      Bio
                                    </Typography>
                                    <Typography component="p">
                                      {attributes?.bio?.bio}
                                    </Typography>
                                  </Box>
                                  : null
                              }
                              <br></br>
                              {
                                attributes?.hobbies?.publilc_access ?
                                  <Box className="bio-row" >
                                    <Typography component="h4">
                                      Hobbies
                                    </Typography>
                                    <Grid container>
                                      {
                                        attributes?.hobbies?.hobbies?.length === 0 ?
                                          null
                                          :
                                          attributes?.hobbies?.hobbies?.map((val: any, index: any) => (
                                            <Grid item xs={6} md={4}>
                                              <Box className="customButton" >
                                                <Button variant="contained" className="contain warning" key={index}>{val}</Button>
                                              </Box>
                                            </Grid>
                                          ))
                                      }
                                    </Grid>
                                  </Box>
                                  :
                                  null
                              }
                              {
                                attributes?.website[0].publilc_access || attributes?.website[1].publilc_access || attributes?.website[2].publilc_access || attributes?.website[3].publilc_access ?
                                  <Box className="social-data-row">
                                    <Typography component="h4">
                                      Follow me on:
                                    </Typography>
                                    {
                                      attributes?.website.length !== 0 ?
                                        <Box className="icons-row">
                                          {
                                            attributes?.website[0].twitter_link === null ? null :
                                              <a href={attributes?.website[0]?.twitter_link} target="_blank" rel="noopener noreferrer">
                                                <img src={Twitter_Icon} className="icon" alt="Twitter_Icon" />
                                              </a>
                                          }
                                          {
                                            attributes?.website[1].instagram_link === null ? null :
                                              <Button href={attributes?.website[1].instagram_link} target="_blank">
                                                <div style={{ backgroundColor: "#f6f6f6", height: "45px", width: "45px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                  <img src={Instagram_Icon} style={{ height: "20px", width: "20px" }} alt="Instagram_Icon" />
                                                </div>
                                              </Button>
                                          }
                                          {
                                            attributes?.website[2].fb_link === null ? null :
                                              <Button href={attributes?.website[2].fb_link} target="_blank">
                                                <img src={FB_Icon} className="icon" alt="FB_Icon" />
                                              </Button>
                                          }
                                          {
                                            attributes?.website[3].snapchat_link === null ? null :
                                              <Button href={attributes?.website[3].snapchat_link} target="_blank">
                                                <div style={{ backgroundColor: "#f6f6f6", height: "45px", width: "45px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                  <img src={Snapchat_Icon} style={{ height: "20px", width: "20px" }} alt="Instagram_Icon" />
                                                </div>
                                              </Button>
                                          }
                                        </Box>
                                        : null
                                    }
                                  </Box>
                                  :
                                  null
                              }

                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                      :
                      <>
                        {/* anonymous section */}
                        <Box className="anonymous-section">
                          <Card className="neighbour-card neighbour-detail-card card">
                            <CardContent>
                              <img src={User1_Img} className="info-icon" alt="info-icon" />
                              <Typography component="h4">
                                Anonymous
                              </Typography>
                              {/* <Typography component="h5">
                          B-1405
                        </Typography> */}
                              <Box className="social-raw">
                                <Box className="blocks">
                                  <img src={Chat_Disable_Icon} className="icons" alt="info-icon" />
                                </Box>
                                <Box className="blocks">
                                  <img src={Contact_Disable_Icon} className="icons" alt="info-icon" />
                                </Box>
                                <Box className="blocks">
                                  <img src={Email_Disable_Icon} className="icons" alt="info-icon" />
                                </Box>
                              </Box>
                              <Box className="note-row">
                                <Typography component="h5">
                                  <span className="title">Note:</span> Resident doesn’t want to share his/her name.
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </>
                  }
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}
//@ts-ignore
export default withRouter(NeighboursDetails)
