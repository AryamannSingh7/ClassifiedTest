import React from "react";

//components
import {
  Container,
  Typography,
  Link,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  Paper,
  CardActionArea, 
  Card,
  CardContent,
  CardMedia
} from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import '../../dashboard/src/Dashboard.web.css';

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
//@ts-ignore
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

//resources
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import BuildingandComplexController, { Props } from "./BuildingandComplexController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import './style.css';

import { upload, Document, configuration, city, country, floor, purchase_date, purchase_price, valuation, region, size, call_org, email_org, chat, bentalyLogo } from "./assets";

const ProfileData = [ 
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405",
    name:"Marlen Eagleston",
    userType:"GA Member",
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020",
    name:"Marlen Eagleston",
    userType:"GA Member",
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020",
    name:"Marlen Eagleston",
    userType:"GA Member",
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    }
  ]

  const tabs = [
    {
    id: 1,
    tabTitle: 'Documents',
    title: 'Documents',
    content: 'Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.'
    },
    {
    id: 2,
    tabTitle: 'Shared Area',
    title: 'Shared Area',
    content: 'Contenido de tab 3.'
    },
  ];

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


class UnitDetails extends BuildingandComplexController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t}: any = this.props
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF", zIndex:-23}}>
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
                      {t("Building & Apartments")} / {t("Buildings ")} / <Box component="span" style={{ color: "blue" }}> {t("Unit 309")}</Box>
                    </Typography>
                    
                  </Box>
                </Box>
                <Typography variant="h4" style={dashBoard.subHeading}>{t("Unit 309")}</Typography>
                  {/* GA MEMBERS -- */}
                
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Building Location Details")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                Edit Details
                            </Button>
                        </Grid>
                </Grid>

                {/* Building Location Details */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={country} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Country")}</Typography>
                                <Typography variant="h5" style={dashBoard.buildingCount}>UAE</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={region} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Region")}</Typography>
                                <Typography variant="h5" style={dashBoard.buildingCount}>Eastern</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={city} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("City")}</Typography>
                                <Typography variant="h5" style={dashBoard.buildingCount}>Dubai</Typography>
                            </div>
                        </div>
                      </Paper>
                  </div>
                </Box>

                {/* Unit Details Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Unit Details")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                Edit Details
                            </Button>
                        </Grid>
                </Grid>
                {/* Unit Details */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={floor} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Floor Number")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>15</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={size} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Size")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2550 sqft</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={configuration} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Configuration")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2 BHK</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={purchase_price} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Purchase Price")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>SR 57,992</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={purchase_date} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Purchase Date")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2 June, 2022</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={valuation} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Current Valuation")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>SR 50,000</Typography>
                            </div>
                        </div>
                      </Paper>
                  </div>
                </Box>

                {/* Family Members Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Family Members")}</Typography>
                        </Grid>
                </Grid>
                {/* Family Members */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={floor} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Firaz Jaziri")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>15</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={size} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Size")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2550 sqft</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={configuration} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Configuration")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2 BHK</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={purchase_price} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Purchase Price")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>SR 57,992</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={purchase_date} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Purchase Date")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2 June, 2022</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={valuation} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Current Valuation")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>SR 50,000</Typography>
                            </div>
                        </div>
                      </Paper>
                  </div>
                </Box>

                <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Related People")}</Typography>
                          </Grid>
                          <Grid item xs={1} style={dashBoard.cursorPointer}>
                            <Typography variant="subtitle1" style={dashBoard.viewMore}    
                              onClick={() => {
                              //@ts-ignore
                              this.props.history.push("/GaMembers");
                            }}>{t("View All")}</Typography>
                          </Grid>
                    </Grid>
                  </Box>
                  <Box style={{marginTop:"10px"}}>
                    <div style={dashBoard.complexMemberCard}>
                      <>
                      {ProfileData.slice(0, 4).map((item, index) => {
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
                      {Activeincidents.map((item, index) => {
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
                                    <Typography variant="h6">{t("Affected Area")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Affected_Area}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Incident is related to")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.incident}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Reported on")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Report}</Typography>
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
                      {VehicleDetails.map((item, index) => {
                        return(
                          <div key={index}>
                          <Card style={dashBoard.activeMembercardStyle}>
                            <CardActionArea>
                              <CardContent>
                                <Typography variant="h6" style={{fontWeight:600}}> {item.Car_no}</Typography>
                                <img src={bentalyLogo} style={{margin:"5px 0px 5px 0px"}}/>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Owner Name:")}</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Owner}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Registration Card Number")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Registration_no}</Typography>
                                </div>
                                <div style={{display:"flex"}}>
                                    <Typography variant="h6">{t("Car Details")}:</Typography>
                                    <Typography variant="h6" style={{fontWeight:600}}> &nbsp; {item.Details}</Typography>
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

                        }
                      </>
                    </div>
                  </Box>

                <Box style={{marginTop:"50px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div>
                              <Typography variant="h6">{t("Building Area")}</Typography>
                              <Typography variant="h5" style={dashBoard.complexDetais}>1500 sqft</Typography>
                          </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div>
                              <Typography variant="h6">{t("Total Floors")}</Typography>
                              <Typography variant="h5" style={dashBoard.complexDetais}>16</Typography>
                          </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div>
                              <Typography variant="h6">{t("Total Units")}</Typography>
                              <Typography variant="h5" style={dashBoard.complexDetais}>16</Typography>
                          </div>
                      </Paper>
                  </div>
                </Box>

                <div className='tabs'>
                  {/* {console.log("this.props.currentTab==>", this.state.currentTab)} */}
                  {tabs.map((tab: any , i: any) =>
                  //@ts-ignore
                      <button key={i} id={tab.id} disabled={this.state.currentTab == `${tab.id}`} onClick={(e:any) => this.handleTabChange(e)}>{tab.tabTitle}</button>
                  )}
                </div>

                <Paper className='content'>
                      <div>
                          {
                            //@ts-ignore
                          this.state.currentTab === "1" ?
                          <> 
                          <div style={dashBoard.commonDisplay}>
                            <div>
                              <p className='title'>Documents</p>
                            </div>
                            <div style={dashBoard.commonDisplay}>
                              <img src={upload} style={{marginRight:"15px"}}/> <Typography variant="h5" style={dashBoard.tabLabel}>Upload</Typography>
                            </div>
                          </div>
                          <Box className="document-box">
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Policy">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Policy")}</h4>
                                    </div>
                                    <Button className="color-btn">
                                        {/* {this.state.policy}  */}0
                                      </Button>
                                    {/* {this.state.policy > 0 && (
                                      <Button className="color-btn">
                                        {this.state.policy}
                                      </Button>
                                    )} */}
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Guidelines">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Guidelines")}</h4>
                                    </div>
                                    <Button className="color-btn">
                                        {/* {this.state.policy}  */}0
                                      </Button>
                                    {/* {this.state.guidelines > 0 && (
                                      <Button className="color-btn">
                                        {this.state.guidelines}
                                      </Button>
                                    )} */}
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Roles">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Roles")}</h4>
                                    </div>
                                    <Button className="color-btn">
                                        {/* {this.state.policy}  */}0
                                      </Button>
                                    {/* {this.state.roles > 0 && (
                                      <Button className="color-btn">
                                        {this.state.roles}
                                      </Button>
                                    )} */}
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Resolutions">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Resolution")}</h4>
                                    </div>
                                    <Button className="color-btn">
                                        {/* {this.state.policy}  */}0
                                      </Button>
                                    {/* {this.state.resolution > 0 && (
                                      <Button className="color-btn">
                                        {this.state.resolution}
                                      </Button>
                                    )} */}
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Building-Plans">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Building Plans")}</h4>
                                    </div>
                                    <Button className="color-btn">
                                        {/* {this.state.policy}  */}0
                                      </Button>
                                    {/* {this.state.buildingPlans > 0 && (
                                      <Button className="color-btn">
                                        {this.state.buildingPlans}
                                      </Button>
                                    )} */}
                                  </Box>
                                </Link>
                              </Grid>
                            </Grid>
                          </Box>
                          </>
                          :
                          this.state.currentTab === "2" ?  
                          <> 
                          <div style={dashBoard.commonDisplay}>
                            <div>
                              <p className='title'>Shared Area</p>
                            </div>
                          </div>
                          <Box className="document-box">
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Policy">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Community Hall")}</h4>
                                    </div>
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Guidelines">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Garden")}</h4>
                                    </div>
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Roles">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Common Parking")}</h4>
                                    </div>
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Resolutions">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Swimming Pool")}</h4>
                                    </div>
                                  </Box>
                                </Link>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <Link href="/DocumentChairman/Building-Plans">
                                  <Box className="item">
                                    <div className="heading">
                                      <img src={Document} />
                                      <h4>{t("Park")}</h4>
                                    </div>
                                  </Box>
                                </Link>
                              </Grid>
                            </Grid>
                          </Box>
                          </> : ""
                          }
                      </div>
                </Paper>

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
export default withTranslation()(withRouter(UnitDetails)); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  buildingCount:{
    color:"#FC8434",
    fontWeight: 600,
  },
  complexDetais:{
    color:"#000",
    fontWeight: 600,
  },
  buildingCard:{
    color:"#FC8434",
    fontWeight: 600,
    marginTop: 15,
    border: "1px solid #E4E4E4",
    borderRadius: 10,
    padding: 12
  },
  tabLabel:{
    color:"#FC8434",
    fontWeight: 600,
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
    alignItems:"center",
    marginTop:20,
    justifyContent:"space-between"
  },
  viewMore:{
    marginTop: 15,
    textDecoration:"underline", 
    color:"#E5B08D",
    fontWeight:600,
  },
  relatedMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20
  },
  complexMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20
  },
  gaCardMember:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20
  },
  BuildingListCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
    padding:25
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
  commonDisplay:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStyle:{
    borderRadius:10,
    maxWidth:345
  },
  cursorPointer:{
    cursor:"pointer"
  },
  managementPaper:{
    padding:20,
    borderRadius:10
  },
  TableHeader:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin:"10px 0px 20px 0px"
},
locationIcon:{
    height:30,
    width:30
},
gaActiveMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr",
    gap: 20
  },
activeMembercardStyle:{
    borderRadius:10,
    maxWidth:600,
    boxShadow:"none",
    padding:"0px 20px 0px 20px",
},
facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

// Customizable Area End
