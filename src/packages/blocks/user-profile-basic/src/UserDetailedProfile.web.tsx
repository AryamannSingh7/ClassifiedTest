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
import UserDetailedProfileController, { Props } from "./UserDetailedProfileController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

import { call_org, email_org, chat, facebook, twitter_org, instagram, snap, bentalyLogo } from "./assets";
import moment from "moment";

const Residents = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"John Doe",
  userType:"Residents",
  more: <MoreVertIcon color='disabled' />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Lia Doen",
  userType:"Property Manager",
  more: <MoreVertIcon color='disabled' />
  }
]

const PropertyManager = [ 
  {
  building: "building 1",
  unitno:"Unit 1405",
  userType:"Property Manager",
  more: <MoreVertIcon color='disabled' />
  },
  {
  building: "building 1",
  unitno:"Unit 1406",
  userType:"Property Manager",
  more: <MoreVertIcon color='disabled' />
  },
]

const Activeincidents = [ 
    {
    title: "Incident Title",
    Affected_Area:"Own Apartment",
    incident:"Plumbing",
    Report:"20-05-2022 10.03",
    Building:"Building 5",
    Unit:"1405",
    status:"Pending"
    },
    {
    title: "Incident Title",
    Affected_Area:"Own Apartment",
    incident:"Plumbing",
    Report:"20-05-2022 10.03",
    Building:"Building 5",
    Unit:"1405",
    status:"Pending"
    },
]

const UnansweredSuggestion = [
    {
    title:"Suggestion Title",
    status:"Unanswered",
    related:"Management Fee",
    desc:"I would suggest to use solar panel in order to save electricity and management fee…",
    sent:"20-05-2022 10:03"
    },
    {
    title:"Suggestion Title",
    status:"Unanswered",
    related:"Management Fee",
    desc:"I would suggest to use solar panel in order to save electricity and management fee…",
    sent:"20-05-2022 10:03"
    }
]

const VehicleDetails = [
    {
    Car_no:"D DUBAI 60883",
    Owner: "Marleah Eagleston",
    Registration_no:"RC52146",
    Details:"Bentley Bentayga SUV White",
    Building:"Building 5",
    Unit:"1405",
    },
    {
    Car_no:"D DUBAI 60883",
    Owner: "Marleah Eagleston",
    Registration_no:"RC52146",
    Details:"Bentley Bentayga SUV White",
    Building:"Building 5",
    Unit:"1405",
    },
    {
    Car_no:"D DUBAI 60883",
    Owner: "Marleah Eagleston",
    Registration_no:"RC52146",
    Details:"Bentley Bentayga SUV White",
    Building:"Building 5",
    Unit:"1405",
    },
    {
    Car_no:"D DUBAI 60883",
    Owner: "Marleah Eagleston",
    Registration_no:"RC52146",
    Details:"Bentley Bentayga SUV White",
    Building:"Building 5",
    Unit:"1405",
    },
]

class UserDetailedProfile extends UserDetailedProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {


    
  }
  render() {
    
    const {t}: any = this.props
     // @ts-ignore
    // @ts-nocheck
    let profileDetails = JSON.parse(localStorage.getItem('selectedPofile'))
    console.log('haha',profileDetails)
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      {t("Community Management")} / {t("User Profiles") } / <Box component="span" style={{ color: "blue" }}> {profileDetails?.attributes?.full_name?.name || 'N/A'}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{profileDetails?.attributes?.full_name?.name || 'N/A'}</Typography>
                  </Box>
                </Box>

                  {/* GA MEMBERS -- */}
                  <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.Headings}>{t("General Details")}</Typography>
                          </Grid>
                          <Grid item xs={1} style={dashBoard.cursorPointer}>
                            {/* <Typography variant="subtitle1" style={dashBoard.viewMore}    
                              onClick={() => {
                              //@ts-ignore
                              this.props.history.push("/GaMembers");
                            }}>{t("View All")}</Typography> */}
                          </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}>
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} style={{borderRight:"1px solid #979797"}}>
                                <Card style={dashBoard.cardStyle}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={profileDetails?.profile_pic?.url}
                                        alt="green iguana"
                                        style={dashBoard.profileImage}
                                    />
                                    <CardContent style={{padding:"0px 16px 16px 16px"}}>
                                    <Typography variant="h6"
                                    //@ts-ignore 
                                    style={dashBoard.unitno}> {profileDetails?.attributes?.full_name?.name || 'N/A'}</Typography>
                                    <Typography variant="h6" style={{marginTop:"5px"}}> {profileDetails?.attributes?.apartment_number?.apartment_number || 'N/A'} </Typography>
                                    <div style={{marginTop:"5px"}}>
                                        <Typography variant="h6" style={dashBoard.userType}>{t("GA Member")}</Typography>
                                    </div>
                                        <Grid container spacing={3} style={{marginTop:"5px",gap:'1rem'}}>
                                            <Grid item xs={2} sm={2}>
                                                <img src={chat} style={{width:"40px"}} onClick={()=>this.openChat(profileDetails?.id)}/>
                                            </Grid>
                                        <Grid item xs={2} sm={2}>
                                                <img src={call_org} style={{width:"40px"}} onClick={()=> window.location.href = `tel:${profileDetails?.attributes?.full_phone_number?.full_phone_number}`}/>
                                            </Grid>
                                           
                                            <Grid item xs={2} sm={2}>
                                                <img src={email_org} style={{width:"40px"}} onClick={()=> window.location.href = `mailto:${profileDetails?.attributes?.email?.email}`}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={8} style={{padding:"35px 25px 25px 35px"}}>
                                <Box>
                                    <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("About")}</Typography>
                                    <Typography variant="subtitle1">{
                                      profileDetails?.attributes?.bio?.bio
                                    } </Typography>
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                        <Grid item xs={2} sm={3}>
                                            <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("Gender")}</Typography>
                                            <Typography variant="subtitle1">{profileDetails?.attributes?.gender?.gender || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={2} sm={3}>
                                            <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("DOB")}</Typography>
                                            <Typography variant="subtitle1">{profileDetails?.attributes?.date_of_birth?.date_of_birth || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={2} sm={3}>
                                            <Typography variant="subtitle1" style={dashBoard.subtitleClr}>{t("Hobbies")}</Typography>
                                        
                                            <Typography variant="subtitle1">{profileDetails?.attributes?.hobbies?.hobbies !==null && profileDetails?.attributes?.hobbies?.hobbies.map((item:any)=><>{item} ,</>)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                        {/* <Grid item xs={2} sm={1}>
                                            <img src={facebook} style={{width:"40px"}}/>
                                        </Grid>
                                        <Grid item xs={2} sm={1}>
                                            <img src={twitter_org} style={{width:"40px"}}/>
                                        </Grid>
                                        <Grid item xs={2} sm={1}>
                                            <img src={instagram} style={{width:"40px"}}/>
                                        </Grid>
                                        <Grid item xs={2} sm={1}>
                                            <img src={snap} style={{width:"40px"}}/>
                                        </Grid> */}
                                        {
                    profileDetails?.attributes?.website[0].twitter_link && <Button href={profileDetails?.attributes?.website[0].twitter_link} target="_blank">
                      <img src={twitter_org} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileDetails?.attributes?.website[1].instagram_link && <Button href={profileDetails?.attributes?.website[1].instagram_link} target="_blank">
                      <img src={instagram} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileDetails?.attributes?.website[2].fb_link && <Button href={profileDetails?.attributes?.website[2].fb_link} target="_blank">
                      <img src={facebook} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                  {
                    profileDetails?.attributes?.website[3].snapchat_link && <Button href={profileDetails?.attributes?.website[3].snapchat_link} target="_blank">
                      <img src={snap} className="icon" alt="FB_Icon" />
                    </Button>
                  }
                                </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                  </Box>

                  {/* Related People -- */}
                  <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h6" style={dashBoard.subHeading}>{t("Related People")}</Typography>
                        </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}>
                    <div style={dashBoard.gaMemberCard}>

                  {
                    profileDetails?.attributes?.families?.families ? profileDetails?.attributes?.families?.families.map((item:any,index:any)=><>
                    <div key={index}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt="green iguana"
                                style={dashBoard.relatedprofileImage}
                              />
                              <CardContent style={{padding:"0px 16px 16px 16px"}}>
                              <span style={{position:"absolute", right:"10px", top:"10px"}} onClick={(e: any) => this.handleMoreClick(e)}>{item.more}</span>
                              {/* <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.relatedunitno}>{item.unitno}</Typography> */}
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{item?.attributes?.name}</Typography>
                              {/* <Typography variant="subtitle1" style={{textAlign:"center", marginTop:"5px"}}>{item.date}</Typography> */}
                              <div style={{textAlign:"center",marginTop:"10px 0px 15px 0px"}}>
                                <Typography variant="h6" style={dashBoard.userType}>{item?.attributes?.relation?.name}</Typography>
                              </div>
                              <div style={dashBoard.contactIcon}>
                                {/* <div style={dashBoard.relatedMemberCard}>
                                  <img src={chat} style={{width:"40px", margin:"0 auto"}}/>
                                  <img src={email_org}  style={{width:"40px", margin:"0 auto"}}/>
                                  <img src={call_org}  style={{width:"40px", margin:"0 auto"}}/>
                                </div> */}
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                    </>)
                        :<>
                        No related people found
                        </>
                  }
                      </div>
                      </Box>
                
                  <Box style={{marginTop:"10px"}}>
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {/* {Residents.map((item, index) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt="green iguana"
                                style={dashBoard.relatedprofileImage}
                              />
                              <CardContent style={{padding:"0px 16px 16px 16px"}}>
                              <span style={{position:"absolute", right:"10px", top:"10px"}} onClick={(e: any) => this.handleMoreClick(e)}>{item.more}</span>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.relatedunitno}>{item.unitno}</Typography>
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{item.name}</Typography>
                              <div style={{textAlign:"center",marginTop:"10px 0px 15px 0px"}}>
                                <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography>
                              </div>
                              <div style={dashBoard.contactIcon}>
                                <div style={dashBoard.relatedMemberCard}>
                                  <img src={chat} style={{width:"40px", margin:"0 auto"}}/>
                                  <img src={email_org} style={{width:"40px", margin:"0 auto"}}/>
                                  <img src={call_org} style={{width:"40px", margin:"0 auto"}}/>
                                </div>
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                        )

                        })

                        } */}
                      </>
                    </div>
                  </Box>

                   {/* Related People More Menu */}
                   <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleMoreClose}
                      style={{padding:"0px", cursor:'pointer'}}
                      >
                      <MenuItem style={{margin:"7px", cursor:'pointer'}}>{t("Resend Request")}</MenuItem>
                      <hr style={{margin:"0px"}}/>
                      <MenuItem style={{margin:"7px", cursor:'pointer'}}>{t("Delete Invitation Request")}</MenuItem>
                  </Menu>

                   {/* Related Units -- */}
                   <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Related Units")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                   <Box style={{margin:"10px 0px 50px"}}>
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {profileDetails?.attributes?.related_units.map((item:any, index:any) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardContent>
                              <span style={{position:"absolute", right:"10px", top:"35px"}} onClick={(e: any) => this.handleUnitMoreClick(e)}>{item.more}</span>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.apartment_name}</Typography>
                              {/* <div style={{marginTop:"5px"}}>
                                <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography>
                              </div> */}
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                        )

                        })

                        }
                      </>
                    </div>
                  </Box>

                   {/* Related Units More Menu */}
                   <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl1}
                      keepMounted
                      open={Boolean(this.state.anchorEl1)}
                      onClose={this.handleUnitMoreClose}
                      style={{padding:"0px", cursor:'pointer'}}
                      >
                      <MenuItem style={{margin:"7px", cursor:'pointer'}}>{t("Delink user from unit")}</MenuItem>
                  </Menu>

                  {/* Active Incidents */}
                  <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Active Incidents")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                   <Box style={{margin:"10px 0px 50px"}}>
                    <div style={dashBoard.gaActiveMemberCard}>
                      <>
                      {profileDetails?.attributes?.incidents.length>0 ? profileDetails?.attributes?.incidents.map((item:any, index:any) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.activeMembercardStyle}>
                            <CardActionArea>
                              <CardContent>
                              <div style={dashBoard.facility}>
                                    <Typography variant="h6" style={{fontWeight:600}}> {item.incident_title}</Typography>
                                    <Typography variant="h6" style={dashBoard.userType}>{item.incident_status}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Affected Area")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.affected_area || 'N/A'}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Incident is related to")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.incident}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Reported on")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {moment(item.reported_on).format("MMMM DD,YYYY")}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Building")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Building}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Unit")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Unit}</Typography>
                                </div>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.building}{item.unitno}</Typography>
                              <div style={{marginTop:"5px"}}>
                                {/* <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography> */}
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                        )

                        })
                        :<>
                        No incident has been added by this user</>
                        }
                      </>
                    </div>
                  </Box>

                   {/* Vehicle Details */}
                   <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Vehicle Details")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                   <Box style={{margin:"10px 0px 50px"}}>
                    <div style={dashBoard.gaActiveMemberCard}>
                      <>
                      {profileDetails?.attributes?.vehicles!== null ? profileDetails?.attributes?.vehicles.map((item:any, index:any) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.activeMembercardStyle}>
                            <CardActionArea>
                              <CardContent>
                                <Typography variant="h6" style={{fontWeight:600}}> {item.attributes?.company_name}</Typography>
                                <img src={bentalyLogo} style={{margin:"5px 0px 5px 0px"}}/>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Owner Name:")}</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.attributes?.owner_name}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Registration Card Number")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.attributes?.plate_number}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Car Details")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item?.attributes?.color}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Building")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.attributes?.building_management?.name}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Unit")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.attributes?.apartment_management?.apartment_name}</Typography>
                                </div>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.building}{item.unitno}</Typography>
                              <div style={{marginTop:"5px"}}>
                                {/* <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography> */}
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                        )

                        })
                        :<> No Vehicle has been Added by this user</>

                        }
                      </>
                    </div>
                  </Box>

                    {/* Unanswered Suggestion */}
                    {/* <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Unanswered Suggestion")}</Typography>
                          </Grid>
                    </Grid>
                  </Box> */}
                   {/* <Box style={{margin:"10px 0px 50px"}}>
                    <div style={dashBoard.gaActiveMemberCard}>
                      <>
                      {UnansweredSuggestion.map((item, index) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.activeMembercardStyle}>
                            <CardActionArea>
                              <CardContent>
                              <div style={dashBoard.facility}>
                                    <Typography variant="h6" style={{fontWeight:600}}> {item.title}</Typography>
                                    <Typography variant="h6" style={dashBoard.userType}>{item.status}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Related to")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.related}</Typography>
                                </div>
                                <div>
                                    <Typography variant="h6">{t("Desc")}: <span style={{fontWeight:600}}> {item.desc} </span></Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Sent on")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.sent}</Typography>
                                </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>
                        )

                        })

                        }
                      </>
                    </div>
                  </Box> */}

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
export default withTranslation()(withRouter(UserDetailedProfile)); 

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
