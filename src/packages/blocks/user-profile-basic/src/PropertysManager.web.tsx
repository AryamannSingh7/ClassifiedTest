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

import '../../dashboard/src/Dashboard.web.css'

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
import CommunityUserProfileController, { Props } from "./CommunityUserProfileController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

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

class PropertysManager extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t}: any = this.props
    const statusArray=["Unresolved", "Resolved", "Pending Confirmation"]
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
                      {t("Community Management")} / {t("User Profiles")} / <Box component="span" style={{ color: "blue" }}> {t("Resident")}</Box>
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
                            // onChange={this.handleChange}
                          >
                            <option value={2022}>Select Unit</option>
                            <option value={2021}>2021</option>
                            <option value={2020}>2020</option>
                            <option value={2019}>2019</option>
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                            // value={this.state.Year}
                            // onChange={this.handleChange}
                          >
                            <option value={2022}>Select User Type</option>
                            <option value={2021}>2021</option>
                            <option value={2020}>2020</option>
                            <option value={2019}>2019</option>
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant="contained" style={dashBoard.backColor}><InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>Search</Button>
                      </Grid>
                    </Grid>
                    <Grid container  xs={6} md={6} sm={6} spacing={2} style={{justifyContent:"end"}}>
                    <div className="search-box">
                        <TextField
                          style={dashBoard.searchButton}
                          id="input-with-icon-textfield"
                          placeholder="search by name"
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

                  {/* Property Manager -- */}
                  <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Property Manager")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}>
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {PropertyManager.map((item, index) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt="green iguana"
                                style={dashBoard.profileImage}
                              />
                              <CardContent style={{padding:"0px 16px 16px 16px"}}>
                              <Typography variant="h6"
                              //@ts-ignore
                              style={dashBoard.unitno}>{item.unitno}</Typography>
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{item.name}</Typography>
                              <div style={{textAlign:"center",marginTop:"5px"}}>
                                <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography>
                              </div>
                              <div style={dashBoard.contactIcon}>
                                {item.chat}{item.mail}{item.call}
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
export default withTranslation()(withRouter(PropertysManager)); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  cardBottom: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  bottomColor: {
    color: "red"
  },
  bottomTwoSpan: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  Cards: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 25,
    background: "#fff",
    borderRadius: 10,
  },
  CardsIcons: {
    border: "1px solid #d9d4d3",
    borderRadius: "50%",
    width: 25,
    height: 25,
    padding: 15,
    color: "#054c94",
  },
  EventsHeading: {
    fontWeight: 600,
    marginTop: 50,
  },
  EventsCards: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    background: "#fff",
    borderRadius: 10,
  },
  EventsTitle: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 10,
  },
  EventsIconsText: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
    fontSize: 14,
  },
  EventsIconsData: {
    display: "flex",
    alignItems: "center",
    gap: 25,
    marginTop: 15,
  },
  EventsIconsDataBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    padding: 5,
  },
  facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PricePaid: {
    marginRight: 70,
    background: "#dcf5f0",
    padding: 6,
    borderRadius: 30,
    color: "green",
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
    fontWeight:"600",
  },
  gaMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
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
  }
};

// Customizable Area End
