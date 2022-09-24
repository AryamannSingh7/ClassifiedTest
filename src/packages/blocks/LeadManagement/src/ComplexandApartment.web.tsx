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
  Modal, 
  Backdrop,
  Fade,
  FormLabel,
  TextareaAutosize
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
import ComplexandApartmentController, { Props } from "./ComplexandApartmentController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import './style.css';

import { upload, Document, sizebw, building, unitbw, cancle } from "./assets";

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

class ComplexandApartment extends ComplexandApartmentController {
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
                      {t("Complex & Apartments")} /<Box component="span" style={{ color: "blue" }}> {t("Complex ")}</Box>
                    </Typography>
                    
                  </Box>
                </Box>

                  {/* GA MEMBERS -- */}
                <Box>
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Complex")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleComplexEditOpen}>
                                Edit Details
                            </Button>
                        </Grid>
                </Grid>
                </Box>

                {/* Edit unitdetails modal */}
                <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setComplexEditOpen)}
                    onClose={this.handleComplexEditClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setComplexEditOpen)}>
                      <div style={dashBoard.paper}>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                            <Typography variant="h6" style={dashBoard.commonFont}>Edit Unit Details</Typography>
                          </div>
                          <div>
                            <img src={cancle}
                            onClick={this.handleComplexEditClose} style={{cursor:"pointer"}}/>
                          </div>
                        </div>
                        <hr />
                        <Formik
                    initialValues={{
                      countryname: "",
                      buildingname: "",
                      buildingarea: "",
                      totalfloors:"",
                      totalunits:"",
                      purchasedate:"",
                      currentvaluation:"",
                      size:"",
                    }}
                    validationSchema={this.EditSchema()}
                    validateOnMount={true}
                     onSubmit={(values) => {
                       console.log("valus=========>", values)
                       // same shape as initial values
                       this.invitationData(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue }) => (
                        <Form translate={true} className="commonForm ">
                          <Grid container>
                            <Grid xs={12} sm={12}>
                            <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("About Us")}</FormLabel>
                              <TextareaAutosize aria-label="minimum height" minRows={10} placeholder="About Us" style={{width:"100%", borderRadius:"10px", padding:"15px"}}/>   
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Building Area")}</FormLabel>
                                <Field name="buildingarea" type="text" placeholder={t("Building Area")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={sizebw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Total Floors")}</FormLabel>
                                <Field name="totalfloors" type="text" placeholder={t("Total Floors")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={building} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Total Units")}</FormLabel>
                                <Field name="totalunits" type="text" placeholder={t("Total Units")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={unitbw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3} style={{marginTop:"20px"}}>
                          <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                          </Grid>
                            <Grid item xs={12} sm={3} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleComplexEditClose}>
                                    CLOSE   
                                </Button>
                               
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    YES, DELETE
                                </Button>
                            </Grid>
                            </Grid>
                        </Form>
                        )}
                        </Formik>
                      </div>
                    </Fade>
                </Modal>

                <Box style={{marginTop:"25px"}}>
                  <Paper>
                    <Typography variant="h6" style={{fontWeight:600, padding:"15px"}}>{t("About Complex")}</Typography>
                    <Typography variant="h6" style={{padding:"0px 15px 20px 15px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially unchanged</Typography>
                  </Paper>
                </Box>

                <Box>
                    <Paper>
                        <Box style={{marginTop:"50px"}}>
                            <div style={dashBoard.BuildingListCard }>
                                <div style={{textAlign:"center", cursor:"pointer"}} onClick={() => this.props.navigation.navigate("BuildingandComplex")}>
                                    <Typography variant="h5" style={dashBoard.buildingCard}>Building 1</Typography>
                                </div>

                            
                                <div style={{textAlign:"center", cursor:"pointer"}}>
                                    <Typography variant="h5" style={dashBoard.buildingCard}>Building 2</Typography>
                                </div>


                                <div style={{textAlign:"center", cursor:"pointer"}}>
                                    <Typography variant="h5" style={dashBoard.buildingCard}>Building 3</Typography>
                                </div>
                                <div style={{textAlign:"center", cursor:"pointer"}}>
                                    <Typography variant="h5" style={dashBoard.buildingCard}>Building 4</Typography>
                                </div>
                                <div style={{textAlign:"center", cursor:"pointer"}}>
                                    <Typography variant="h5" style={dashBoard.buildingCard}>Building 5</Typography>
                                </div>
                            </div>
                        </Box>
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
export default withTranslation()(withRouter(ComplexandApartment)); 

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
modal:{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
labelsStyle:{
  color:"#212121",
  margin:"10px 0px 10px 0px"
},
paper: {
  backgroundColor: "#fff",
  borderRadius: '10px',
  // boxShadow: theme.shadows[5],
  padding: "16px 32px 24px",
  width:"700px",
},
commonFont:{
  fontWeight:600
},
inviteInput:{
  padding: "18px 18px 18px 50px",
  color: "#b5b5b5",
  borderRadius: "10px",
  border: "1px solid #e9dede",
  backgroundColor: "#f9f9f9",
  fontSize: "16px",
  outline: 0,
  width:"100%"
},
formLeftIcn:{
  position:"absolute",
  left: 20,
  top: 44,
  color: "#b9b9b9"
},
};

// Customizable Area End
