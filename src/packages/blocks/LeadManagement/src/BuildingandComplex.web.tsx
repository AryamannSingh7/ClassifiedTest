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
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem
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

import { upload, Document } from "./assets";

const tabs = [
  {
      id: 1,
      tabTitle: 'Documents',
      title: 'Documents',
      content: 'Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.'
  },
  {
      id: 2,
      tabTitle: 'Units',
      title: 'Units',
      content: 'Contenido de tab 2.'
  },
  {
      id: 3,
      tabTitle: 'Shared Area',
      title: 'Shared Area',
      content: 'Contenido de tab 3.'
  },
];

function createData( no:any, Unit_Number:any, Floor_Number:any, Resident_Name:any, Owner:any, Status:any, more:any) {
  return { no, Unit_Number, Floor_Number, Resident_Name, Owner, Status, more };
}

const rows = [
  createData(1, 'A202', "15", 'Anaru Hakopa', 'Andries Grootoonk', 'Rented', <MoreVertIcon color='disabled' />),
  createData(2, 'A203', "15", 'Anaru Hakopa', 'Florieke Krebber', 'Empty', <MoreVertIcon color='disabled' />),
  createData(3, 'A204', "15",'Beatriz Brito', 'Gabriel Soares', 'Occupied', <MoreVertIcon color='disabled' />),
  createData(4, 'A205', "15",'-', 'Miriam de Jesús', 'Empty',  <MoreVertIcon color='disabled' />),
  createData(5, 'A206', "15",'Mbah Enow', 'Slavcho Karbashewski', 'Occupied', <MoreVertIcon color='disabled' />),
  createData(6, 'A207', "15", '-', 'Somun Ae-Ri', 'Rented', <MoreVertIcon color='disabled' />),
  createData(7, 'A208', "15", 'Sakane Miiko', 'Somun Ae-Ri', 'Empty', <MoreVertIcon color='disabled' />),
];

class BuildingandComplex extends BuildingandComplexController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t}: any = this.props
    var searchData = rows.filter((item) => {
      if (this.state.dataSearch === "") {
        return item;
      } else if (
        item.Unit_Number.toLowerCase().includes(this.state.dataSearch.toLowerCase())
      ) {
        return item;
      }
    });
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
                      {t("Building & Apartments")} /<Box component="span" style={{ color: "blue" }}> {t("Buildings")}</Box>
                    </Typography>
                    
                  </Box>
                </Box>

                  {/* GA MEMBERS -- */}
                <Box>
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Buildings & Apartments")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                Edit Details
                            </Button>
                        </Grid>
                </Grid>
                </Box>

                <Box style={{marginTop:"25px"}}>
                  <Paper>
                    <Typography variant="h6" style={{fontWeight:600, padding:"15px"}}>{t("About Building Name")}</Typography>
                    <Typography variant="h6" style={{padding:"0px 15px 20px 15px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially unchanged</Typography>
                  </Paper>
                </Box>

                <Box style={{marginTop:"50px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div style={{textAlign:"center"}}>
                              <Typography variant="h6">{t("Building Area")}</Typography>
                              <Typography variant="h5" style={dashBoard.buildingCount}>1500 sqft</Typography>
                          </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div style={{textAlign:"center"}}>
                              <Typography variant="h6">{t("Total Floors")}</Typography>
                              <Typography variant="h5" style={dashBoard.buildingCount}>16</Typography>
                          </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                          <div style={{textAlign:"center"}}>
                              <Typography variant="h6">{t("Total Units")}</Typography>
                              <Typography variant="h5" style={dashBoard.buildingCount}>16</Typography>
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
                          </>: 
                          this.state.currentTab === "2" ?  
                          <>
                          <Box style={dashBoard.TableHeader}>
                                <Typography variant="h5" style={dashBoard.subHeading}>{t("Units")}</Typography>
                                {/* <SearchOutlinedIcon/> */}
                                <TextField
                                    // className={classes.margin}
                                    id="input-with-icon-textfield"
                                    placeholder="Search"
                                    onChange={(e) => this.setState({dataSearch: e.target.value})}
                                    // onChange={(e) => this.handleSearchChange()}
                                    // label="TextField"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                            </Box>
                          <TableContainer >
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{color:"grey"}}>#</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Unit Number")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Floor Number")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Resident Name")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Owner")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Status")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {searchData.map((row) => (
                                            <TableRow key={row.no}>
                                                <TableCell component="th" scope="row">{row.no}</TableCell>
                                                <TableCell align="left">{row.Unit_Number}</TableCell>
                                                <TableCell align="left">{row.Floor_Number}</TableCell>
                                                <TableCell align="left">{row.Resident_Name}</TableCell>
                                                <TableCell align="left">{row.Owner}</TableCell>
                                                <TableCell align="left">{row.Status}</TableCell>
                                                <TableCell align="left" onClick={(e: any) => this.handleMoreClick(e)}>{row.more}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box style={dashBoard.TableHeader}>
                                <Typography  style={dashBoard.subHeading}>{t("Showing")} 5 {t("of")} {rows.length} {t("results")}</Typography>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                            </Box>

                            <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={Boolean(this.state.anchorEl)}
                              onClose={this.handleClose}
                              style={{padding:"0px", cursor:'pointer'}}
                              >
                              <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("View")}</MenuItem>
                              </Menu>    
                            </> 
                          :
                          this.state.currentTab === "3" ?  
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
export default withTranslation()(withRouter(BuildingandComplex)); 

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
    marginTop: 15,
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
    padding:20
  },
  TableHeader:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin:"10px 0px 20px 0px"
},
};

// Customizable Area End
