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
  TextField 
} from "@material-ui/core";
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
import CommunityUserProfileController, { Props } from "./communityManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

import { call_org, email_org, chat } from "./assets";

const ProfileData = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    mail:<MailOutlineOutlinedIcon />,
    call:<CallOutlinedIcon />,
    chat:<QuestionAnswerOutlinedIcon />
    }
]

const Residents = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405",
  name:"Marlen Eagleston",
  userType:"Resident",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"Resident",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"Resident",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"Resident",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  }
]

const PropertyManager = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405",
  name:"Marlen Eagleston",
  userType:"Property Manager",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"Property Manager",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"Property Manager",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"Property Manager",
  mail:<MailOutlineOutlinedIcon />,
  call:<CallOutlinedIcon />,
  chat:<QuestionAnswerOutlinedIcon />
  }
]

class CommunityUserProfile extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }

 async componentDidMount() {
    this.getUserProfile()
    this.getBuilding();
    
  }
  render() {
    const {t}: any = this.props
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
                      {t("Community Management")} /<Box component="span" style={{ color: "blue" }}> {t("Property Manager")}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{t("User Profiles")}</Typography>
                  </Box>
                </Box>
                 <Box style={dashBoard.boxStyling}>
                    <Grid container  xs={6} md={6} sm={6} spacing={2}>
                    <Grid item xs={4}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                            // value={this.state.Year}
                            name="selectedBUilding"
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select Building")}</option>
                            {
                              this.state.allBuilding.map((item:any)=><>
                              <option value={item.id}>{item.name}</option>
                              </>)
                            }
                            
                           
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                            // value={this.state.Year}
                            name="selctedUnit"
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select Unit")}</option>
                            {
                              this.state.allUnit.map((item:any)=><>
                              <option value={item.id}>{item.apartment_name}</option>
                              </>)
                            }
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                          name='selectedUserType'
                            // value={this.state.Year}
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select User Type")}</option>
                            <option value={'ga_member'}>ga_member</option>
                            <option value={'resident'}>resident</option>
                            <option value={'owner'}>owner</option>
                            <option value={'property_manager'}>property_manager</option>
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="contained" onClick={this.getUserProfile} style={dashBoard.backColor}><InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>{t("Search")}</Button>
                      </Grid>
                    </Grid>
                    <Grid container  xs={6} sm={8} spacing={2} style={{justifyContent:"end"}}>
                    <div className="search-box">
                        <TextField
                          style={dashBoard.searchButton}
                          id="input-with-icon-textfield"
                          placeholder={t("Search by name")}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </Grid>
                  </Box>

                  {/* GA MEMBERS -- */}
                  {
                    this.state.allProfileKeys.map((item:any)=>
                    (  <>
                        <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t(`${item}`)}</Typography>
                          </Grid>
                          <Grid item xs={1} style={dashBoard.cursorPointer}>
                            <Typography variant="subtitle1" style={dashBoard.viewMore}    
                              onClick={() => {
                              //@ts-ignore
                              this.props.history.push(`/${item}`);
                            }}>{t("View All")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}
                  >
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {//@ts-ignore
                      this.state.allProfile[item]?.data?.slice(0,4).map((singleProfile:any, index:any) => {
                        return(
                          <div key={index}  onClick={() => {
                            //@ts-ignore
                            this.props.history.push({pathname:"/UserDetailedProfile",singleProfile})}}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={singleProfile?.attributes?.profile_pic?.url}
                                alt="green iguana"
                                style={dashBoard.profileImage}
                              />
                              <CardContent style={{padding:"0px 16px 16px 16px"}}>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.unitno}</Typography>
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{singleProfile?.attributes?.full_name?.name}</Typography>
                              <div style={{textAlign:"center",marginTop:"5px"}}>
                                <Typography variant="h6" style={dashBoard.userType}>{item}</Typography>
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

                        }
                      </>
                    </div>
                  </Box>
                      </>)
                    )
                  }
               

                  {/* RESIDENTS -- */}
                 

                   {/* PROPERTY MANAGER -- */}
                 

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
export default withTranslation()(withRouter(CommunityUserProfile)); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    padding: 5,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  searchButton:{
    margin:8
  },
  backColor:{
   backgroundColor: "#2D6EED",
   padding:"9px 16px"
  },
  boxStyling:{
    display:"flex",
    alignItems:"center",
    marginTop:20
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
  profileImage:{
    borderRadius: "100%",
    width: 70,
    height: 70,
    margin: "35px auto"
  },
  userType:{
    backgroundColor: "aliceblue",
    borderRadius: 30,
    display: "inline-block",
    padding: "3px 20px",
    color:"#2D6EED",
    fontWeight:600
  },
  unitno:{
    marginTop:15,
    fontWeight: 600,
    textAlign:"center"
  },
  contactIcon:{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop:15
  },
  cardStyle:{
    borderRadius:10,
    maxWidth:345
  },
  cursorPointer:{
    cursor:"pointer"
  }
};

// Customizable Area End
