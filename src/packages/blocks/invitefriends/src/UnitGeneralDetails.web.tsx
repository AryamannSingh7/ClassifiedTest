import React from "react";

//components
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  Paper,
  Menu
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";

import '../../dashboard/src/Dashboard.web.css';

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import VisitorsListController, { Props } from "./VisitorsListController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import 'web/src/i18n';
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";
import { call_org, email_org, chat, facebook, twitter_org, instagram, snap, bentalyLogo } from "../../user-profile-basic/src/assets";
import {NoProfile_Img} from "../../search/src/assets"
import { withTranslation,useTranslation } from 'react-i18next';

class UnitGeneralDetails extends VisitorsListController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
     // @ts-ignore
    // @ts-nocheck
   const id = this.props.history.location?.id || 274 ;
   const ownerId = this.props.history.location?.ownerId || 274;
    if(id){
      this.getUnitGeneralDetails(id ,ownerId)
    }else{
      window.history.back()
    }
    
  }
  render() {
    const {t}: any = this.props
    let profileDetails = this.state?.getUnitGeneralDetails?.resident?.data?.attributes;
    console.log("profileDetails==============>",profileDetails)
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <VisitorsSidebar {...this.props} /> 
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      {t("Unit")} / <Box component="span" style={{ color: "blue" }}> {t("Resident Profile") }</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{t("Resident Profile")}</Typography>
                  </Box>
                </Box>

                  {/* GA MEMBERS -- */}
                  <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.Headings}>{t("General Details")}</Typography>
                          </Grid>
                          <Grid style={{display: 'flex'}}>
                            <Typography variant="subtitle1" >{t("Owner Name : ")}</Typography>
                            <h5>{this.state?.getUnitGeneralDetails?.owner}</h5>
                          </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}>
                    <Paper>
                    <CardDeatils profileDetails={profileDetails}/>   
                    </Paper>
                  </Box>
                  <br></br><br></br>
                 <FamilyDeatils profileDetails={profileDetails}/>
              </Container>
            </Grid>
          </Box>
        </Box>
        {/* <Loader loading={this.state.loading} /> */}
      </>
    )
  }
}

//@ts-ignore
export default withTranslation()(withRouter(UnitGeneralDetails)); 

const CardDeatils = (props:any) => {
  const profileDetails =props?.profileDetails;
  const {t} = useTranslation()
  return(
   <>
     <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} style={{borderRight:"1px solid #979797"}}>
                                <Card style={dashBoard.cardStyle}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={profileDetails?.profile_pic?.url || NoProfile_Img}
                                        alt="green iguana"
                                        style={dashBoard.profileImage}
                                    />
                                    <CardContent style={{padding:"0px 16px 16px 16px"}}>
                                    <Typography variant="h6"
                                    //@ts-ignore 
                                    style={dashBoard.unitno}> {profileDetails?.full_name?.name || 'N/A'}</Typography>
                                    <Typography variant="h6" style={{marginTop:"5px"}}> {profileDetails?.apartment_number?.apartment_number || 'N/A'} </Typography>
                                        <Grid container spacing={3} style={{marginTop:"5px"}}>
                                            <Grid item xs={2} sm={2}>
                                                <img src={call_org} style={{width:"40px"}} onClick={()=> window.location.href = `tel:${profileDetails?.full_phone_number?.full_phone_number}`}/>
                                            </Grid>
                                            <Grid item xs={2} sm={2}>
                                                {/* <img src={chat} style={{width:"40px"}} onClick={()=>this.openChat(profileDetails?.attribute)}/> */}
                                            </Grid>
                                            <Grid item xs={2} sm={2}>
                                                <img src={email_org} style={{width:"40px"}} onClick={()=> window.location.href = `mailto:${profileDetails?.email?.email}`}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={8} style={{padding:"35px 25px 25px 35px"}}>
                                <Box>
                                  {
                                      profileDetails?.bio?.publilc_access ?
                                      <>
                                    <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("About")}</Typography>
                                    <Typography variant="subtitle1">{
                                      profileDetails?.bio?.bio || "N/A"
                                    } </Typography>
                                    </>
                                    :
                                    null
                                  }
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                        <Grid item xs={2} sm={3}>
                                            <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("Gender")}</Typography>
                                            <Typography variant="subtitle1">{profileDetails?.gender?.gender || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={2} sm={3}>
                                            <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("DOB")}</Typography>
                                            <Typography variant="subtitle1">{profileDetails?.date_of_birth?.date_of_birth || 'N/A'}</Typography>
                                        </Grid>

                                        {
                                profileDetails?.hobbies?.publilc_access ?
                                  <Box className="bio-row" >
                                     <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("Hobbies")}</Typography>   
                                    <Grid container>
                                      {
                                        profileDetails?.hobbies?.hobbies === null ?
                                        'N/A'
                                          :
                                          profileDetails?.hobbies?.hobbies?.map((val: any, index: any) => (
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
                                    </Grid>
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                      {
                                           profileDetails?.website.length !== 0 ?
                                           <>
                                           {
                                              profileDetails?.website[0]?.publilc_access && profileDetails?.website[0]?.twitter_link !== null ? 
                                              <Grid item xs={2} sm={1}>
                                              <a href={profileDetails?.website[0]?.twitter_link} target="_blank" rel="noopener noreferrer">
                                                <img src={twitter_org} className="icon" alt="Twitter_Icon" style={{width:"40px"}} />
                                              </a>
                                              </Grid>
                                              :
                                           null
                                           }
                                            {
                                              profileDetails?.website[1]?.publilc_access && profileDetails?.website[1]?.instagram_link !== null ? 
                                              <Grid item xs={2} sm={1}>
                                              <a href={profileDetails?.website[1]?.instagram_link} target="_blank" rel="noopener noreferrer">
                                                <img src={instagram} className="icon" alt="instagram_Icon" style={{width:"40px"}} />
                                              </a>
                                              </Grid>
                                              :
                                           null
                                           }

                                          {
                                              profileDetails?.website[2]?.publilc_access && profileDetails?.website[2]?.fb_link !== null ? 
                                              <Grid item xs={2} sm={1}>
                                              <a href={profileDetails?.website[2]?.fb_link} target="_blank" rel="noopener noreferrer">
                                                <img src={facebook} className="icon" alt="fb_Icon" style={{width:"40px"}} />
                                              </a>
                                              </Grid>
                                              :
                                           null
                                           }

                                         
                                          {
                                              profileDetails?.website[3]?.publilc_access && profileDetails?.website[3]?.snapchat_link !== null ? 
                                              <Grid item xs={2} sm={1}>
                                              <a href={profileDetails?.website[3]?.snapchat_link} target="_blank" rel="noopener noreferrer">
                                                <img src={snap} className="icon" alt="snapchat_Icon" style={{width:"40px"}} />
                                              </a>
                                              </Grid>
                                              :
                                           null
                                           }        
                                           </>
                                           :
                                           null
                                      }
                                </Grid>
                                </Box>
                            </Grid>
                        </Grid>
   </>
  )
}
const FamilyDeatils = (props:any) => {
  const profileDetails =props?.profileDetails;
  const {t} = useTranslation()
  return(
   <>
    <Grid item xs={6}>
                       <Typography variant="h6" style={dashBoard.Headings}>{t("Family Deatils")}</Typography>
                  </Grid>
                  <Box  className="famliy-container" style={{marginTop:"10px"}}>
                  {
                       profileDetails?.families?.families !== 0 ?
                    <Paper>
                        <Grid container >
                            <Box  style={{padding:"35px 25px 25px 35px",width:'100%'}}>
                            <Grid container  >
                              {
                                 profileDetails?.families?.families?.map((val:any,index:any)=>(
                                  <Grid xs={12} md={6} key={index} >
                                  <Box className="famliy-card">
                                  <Box className="famliy-row">
                                  <Typography component="h4">
                                      {val?.attributes?.name}
                                    </Typography>
                                    <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{'DI:'}{val?.attributes?.id_number}</Typography>
                                    </Box>
                                   <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{val?.attributes?.relation?.name}</Typography>
                                    </Box>
                                </Grid>
                                 )) 
                              }
                                </Grid>    
                            </Box>
                        </Grid>
                    </Paper>
                     :  <Typography component="h4">
                     N/A
                 </Typography> 
                }
                  </Box>
   </>
  )
}
const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  Headings:{
    fontWeight: 600,
    margin: "15px 0px 15px 0px",
  },
  cardBottom: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  gaMemberMain:{
    display:"flex",
    alignItems:"baseline",
    marginTop:20,
    justifyContent:"space-between"
  },
  viewMore:{
    marginTop: 15,
    textDecoration:"underline", 
    color:"#E5B08D",
    fontWeight:600,
  },
  gaMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20
  },
  relatedMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20
  },
  gaActiveMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr",
    gap: 20
  },
  profileImage:{
    borderRadius: "100%",
    width: 90,
    height: 90,
    margin: "35px auto auto 20px"
  },
  relatedprofileImage:{
    borderRadius: "100%",
    width: 70,
    height: 70,
    margin: "35px auto"
  },
  userType:{
    backgroundColor: "aliceblue",
    borderRadius: 30,
    display: "inline-block",
    padding: "0px 8px",
    color:"#2D6EED",
    fontWeight:600,
    marginTop:5
  },
  unitno:{
    marginTop:15,
    fontWeight: 600,
    textAlign:"left"
  },
  relatedunitno:{
    marginTop:15,
    fontWeight: 600,
    textAlign:"center"
  },
  contactIcon:{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "left",
    marginTop:15
  },
  cardStyle:{
    borderRadius:10,
    maxWidth:345,
    boxShadow:"none",
    padding:"0px 20px 20px 20px",
  },
  activeMembercardStyle:{
    borderRadius:10,
    maxWidth:600,
    boxShadow:"none",
    padding:"0px 20px 0px 20px",
  },
  cursorPointer:{
    cursor:"pointer"
  },
  subtitleClr:{
    color:"#D3D3D3"
  }
};

// Customizable Area End
