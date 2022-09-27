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
  CardMedia,
  MenuItem,
  Menu,
  Modal,
  Fade,
  FormLabel,
  FormControl,
  Select,
  InputLabel,
  Backdrop,
  TextareaAutosize
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";

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
import UnitDetailsController, { Props } from "./UnitDetailsController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import './style.css';

import { configuration, city, country, floor, purchase_date, purchase_price, valuation, region, size, call_org, email_org, chat, bentalyLogo,
  currency_icon, flag, profile_icon, pencil, location, configurationbw, valutionbw, unitbw, sizebw, purchase_pricebw, purchase_datebw, complexbw, building, cancle, true_mark, 
  uploadbw, del_image } from "./assets";

const ProfileData = [ 
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405",
    name:"Marlen Eagleston",
    userType:"GA Member",
    more: <MoreVertIcon color='disabled' />
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020",
    name:"Marlen Eagleston",
    userType:"GA Member",
    more: <MoreVertIcon color='disabled' />
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020",
    name:"Marlen Eagleston",
    userType:"GA Member",
    more: <MoreVertIcon color='disabled' />
    },
    {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    more: <MoreVertIcon color='disabled' />
    },
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

const maxNumber = 69;

class UnitDetails extends UnitDetailsController {
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
                    <Typography variant="h6" style={dashBoard.subHeading}>{t("Building Location Details")}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <div>
                          <img src={location} />
                        </div>
                        &nbsp;&nbsp;
                        <div style={{fontWeight:600, color:"#FC8434"}}>
                          See building on map 
                        </div>
                      </div>
                      <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <div>
                          <img src={pencil} />
                        </div>
                        &nbsp;&nbsp;
                        <div style={{fontWeight:600, color:"#2B6FED"}} onClick={this.handleEditOpen}>
                          Edit 
                        </div>
                      </div>
                    </div>
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

                  {/* Edit unitdetails modal */}
                  <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setEditOpen)}
                    onClose={this.handleEditClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setEditOpen)}>
                      <div style={dashBoard.paper}>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                            <Typography variant="h6" style={dashBoard.commonFont}>Edit Details</Typography>
                          </div>
                          <div>
                            <img src={cancle}
                            onClick={this.handleEditClose} style={{cursor:"pointer"}}/>
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
                          <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Upload Photos")}</FormLabel>
                                <ImageUploading
                                  multiple
                                  value={this.state.unitImages}
                                  onChange={this.imageonChange}
                                  maxNumber={maxNumber}
                                  dataURLKey="data_url"
                                  acceptType={["jpg"]}
                                >
                                  {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps
                                  }): any => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                      <button
                                      //@ts-ignore
                                      style={isDragging ? { color: "red" } : null}
                                      onClick={onImageUpload}
                                      className="upload-btn btn-dashed"
                                      {...dragProps}
                                      >
                                        <img src={uploadbw} />
                                      </button>
                                      &nbsp;
                                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                      {imageList.map((image: any, index: any) => (
                                        <div key={index} className="image-item">
                                          <img src={image.data_url} alt="" className="images"/>
                                          <div className="image-item__btn-wrapper">
                                            {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                            <span onClick={() => onImageRemove(index)} className="image-span"><img src={del_image} /></span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </ImageUploading>
                          <Grid container>
                            <Grid xs={12} sm={12}>
                            <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("About Us")}</FormLabel>
                              <TextareaAutosize aria-label="minimum height" minRows={10} placeholder="About Us" style={{width:"100%", borderRadius:"10px", padding:"15px"}}/>   
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Building Name")}</FormLabel>
                                    <FormControl variant="outlined" >
                                      <span className="frmLeftIcons">
                                        <img src={building} className="frm-icons" alt="User Icon" />
                                      </span>
                                      <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Building Name")}</InputLabel> 
                                      <Select
                                        name="buildingname"
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        style={{ paddingLeft: '45px' }}
                                        // label="Select User Type"
                                        onChange={(e) => {
                                          (e.target.value != " ") && setFieldValue("buildingname", e.target.value)
                                        }}
                                        value={values.buildingname}
                                      >
                                        <MenuItem  disabled value=" ">
                                          {t("Select Building Name")}
                                        </MenuItem>
                                        <MenuItem value={"user1"}>User1</MenuItem>
                                        <MenuItem value={"user2"}>User2</MenuItem>
                                        <MenuItem value={"user3"}>User3</MenuItem>
                                        <MenuItem value={"user4"}>User4</MenuItem>

                                        {/* {
                                          this.state?.userTypeData?.map((val, index) => (
                                            <MenuItem
                                              key={index}
                                              value={val?.name}
                                            >
                                              {val?.name}
                                            </MenuItem>
                                          ))
                                        } */}

                                      </Select>
                                    </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Country")}</FormLabel>
                                    <FormControl variant="outlined" >
                                      <span className="frmLeftIcons">
                                        <img src={building} className="frm-icons" alt="User Icon" />
                                      </span>
                                      <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Country")}</InputLabel> 
                                      <Select
                                        name="countryname"
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        style={{ paddingLeft: '45px' }}
                                        // label="Select User Type"
                                        onChange={(e) => {
                                          (e.target.value != " ") && setFieldValue("countryname", e.target.value)
                                        }}
                                        value={values.countryname}
                                      >
                                        <MenuItem  disabled value=" ">
                                          {t("Select Country")}
                                        </MenuItem>
                                        <MenuItem value={"user1"}>User1</MenuItem>
                                        <MenuItem value={"user2"}>User2</MenuItem>
                                        <MenuItem value={"user3"}>User3</MenuItem>
                                        <MenuItem value={"user4"}>User4</MenuItem>

                                        {/* {
                                          this.state?.userTypeData?.map((val, index) => (
                                            <MenuItem
                                              key={index}
                                              value={val?.name}
                                            >
                                              {val?.name}
                                            </MenuItem>
                                          ))
                                        } */}

                                      </Select>
                                    </FormControl>
                              </Box>
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
                                  <img src={configurationbw} className="frm-icons" alt="User Icon" />
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
                                  <img src={purchase_pricebw} className="frm-icons" alt="User Icon" />
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
                                  <img src={purchase_datebw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                          </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleEditClose}>
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

                {/* Unit Details Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                  <Grid item xs={6}>
                    <Typography variant="h6" style={dashBoard.subHeading}>{t("Unit Details")}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                      <div>
                        <img src={pencil} />
                      </div>
                      &nbsp;&nbsp;
                      <div style={{fontWeight:600, color:"#2B6FED", cursor:"pointer"}}  onClick={this.handleUnitOpen}>
                        Edit 
                      </div>
                    </div>
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

                {/* Edit unitdetails modal */}
                <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setUnitOpen)}
                    onClose={this.handleUnitClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setUnitOpen)}>
                      <div style={dashBoard.paper}>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                            <Typography variant="h6" style={dashBoard.commonFont}>Edit Unit Details</Typography>
                          </div>
                          <div>
                            <img src={cancle}
                            onClick={this.handleUnitClose} style={{cursor:"pointer"}}/>
                          </div>
                        </div>
                        <hr />
                        <Formik
                    initialValues={{
                      complexname: "",
                      buildingname: "",
                      unitno: "",
                      configuration:"",
                      purchaseprice:"",
                      purchasedate:"",
                      currentvaluation:"",
                      size:"",
                    }}
                    validationSchema={this.InvitationSchema()}
                    validateOnMount={true}
                     onSubmit={(values) => {
                       console.log("valus=========>", values)
                       // same shape as initial values
                       this.invitationData(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue }) => (
                        <Form translate={true} className="commonForm ">
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Complex Name")}</FormLabel>
                                <Field name="complexname" type="text" placeholder={t("Complex Name")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={complexbw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Building Name")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={building} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Building Name")}</InputLabel> 
                                    <Select
                                      name="buildingname"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("buildingname", e.target.value)
                                      }}
                                      value={values.buildingname}
                                    >
                                      <MenuItem  disabled value=" ">
                                        {t("Select Building Name")}
                                      </MenuItem>
                                      <MenuItem value={"user1"}>User1</MenuItem>
                                      <MenuItem value={"user2"}>User2</MenuItem>
                                      <MenuItem value={"user3"}>User3</MenuItem>
                                      <MenuItem value={"user4"}>User4</MenuItem>

                                      {/* {
                                        this.state?.userTypeData?.map((val, index) => (
                                          <MenuItem
                                            key={index}
                                            value={val?.name}
                                          >
                                            {val?.name}
                                          </MenuItem>
                                        ))
                                      } */}

                                    </Select>
                                  </FormControl>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Unit Number")}</FormLabel>
                                    <FormControl variant="outlined" >
                                      <span className="frmLeftIcons">
                                        <img src={unitbw} className="frm-icons" alt="User Icon" />
                                      </span>
                                      <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Unit Number")}</InputLabel> 
                                      <Select
                                        name="unitno"
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        style={{ paddingLeft: '45px' }}
                                        // label="Select User Type"
                                        onChange={(e) => {
                                          (e.target.value != " ") && setFieldValue("unitno", e.target.value)
                                        }}
                                        value={values.unitno}
                                      >
                                        <MenuItem  disabled value=" ">
                                          {t("Select Unit Number")}
                                        </MenuItem>
                                        <MenuItem value={"user1"}>User1</MenuItem>
                                        <MenuItem value={"user2"}>User2</MenuItem>
                                        <MenuItem value={"user3"}>User3</MenuItem>
                                        <MenuItem value={"user4"}>User4</MenuItem>

                                        {/* {
                                          this.state?.userTypeData?.map((val, index) => (
                                            <MenuItem
                                              key={index}
                                              value={val?.name}
                                            >
                                              {val?.name}
                                            </MenuItem>
                                          ))
                                        } */}

                                      </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Size")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={sizebw} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Size")}</InputLabel> 
                                    <Select
                                      name="size"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("size", e.target.value)
                                      }}
                                      value={values.size}
                                    >
                                      <MenuItem  disabled value=" ">
                                        {t("Select Size")}
                                      </MenuItem>
                                      <MenuItem value={"user1"}>User1</MenuItem>
                                      <MenuItem value={"user2"}>User2</MenuItem>
                                      <MenuItem value={"user3"}>User3</MenuItem>
                                      <MenuItem value={"user4"}>User4</MenuItem>

                                      {/* {
                                        this.state?.userTypeData?.map((val, index) => (
                                          <MenuItem
                                            key={index}
                                            value={val?.name}
                                          >
                                            {val?.name}
                                          </MenuItem>
                                        ))
                                      } */}

                                    </Select>
                                  </FormControl>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Configuration")}</FormLabel>
                                <Field name="configuration" type="text" placeholder={t("Configuration")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={configurationbw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Purchase Price")}</FormLabel>
                                <Field name="purchaseprice" type="text" placeholder={t("Purchase Price")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={purchase_pricebw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Purchase Date")}</FormLabel>
                                <Field name="purchasedate" type="text" placeholder={t("Purchase Date")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={purchase_datebw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Current Valuation")}</FormLabel>
                                <Field name="currentvaluation" type="text" placeholder={t("Current Valuation")} style={dashBoard.inviteInput} />
                                <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={valutionbw} className="frm-icons" alt="User Icon" />
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                          </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleEditClose}>
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

                {/* Related People Header */}
                <Box>
                    <Grid container style={dashBoard.gaMemberMain}> 
                          <Grid item xs={6}>
                            <Typography variant="h6" style={dashBoard.subHeading}>{t("Related People")}</Typography>
                          </Grid>
                    </Grid>
                </Box>
                {/* Related People */}
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
                              <span style={{position:"absolute", right:"10px", top:"10px"}} onClick={(e: any) => this.handleMoreClick(e)}>{item.more}</span>
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

                {/* Related People More Menu */}
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleMoreClose}
                    style={{padding:"0px", cursor:'pointer'}}
                    >
                    <MenuItem style={{margin:"7px", cursor:'pointer'}} onClick={this.handleDelinkOpen}>{t("Delink User ")}</MenuItem>
                    <hr style={{margin:"0px"}}/>
                    <MenuItem style={{margin:"7px", cursor:'pointer'}} onClick={this.handleSuspendOpen}>{t("Suspend User")}</MenuItem>
                </Menu>

                {/* Modal Delink Related People */}
                <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setDelinkOpen)}
                    onClose={this.handleDelinkClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setDelinkOpen)}>
                    <div
                        //@ts-ignore 
                        style={dashBoard.delinkPaper}>
                        <img src={ true_mark } style={{marginTop:"20px"}}/>
                        <Typography variant="h6"
                            //@ts-ignore 
                            style={dashBoard.unitno}>Delink user</Typography>
                            <Typography variant="subtitle1" style={{marginTop:"20px"}}>User will be removed from this unit Are you sure you want to delink the user? </Typography>
                            <Grid container spacing={3} style={{marginTop:"20px"}}>
                            <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleDelinkClose}>
                                    CLOSE   
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    DELINK
                                </Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Fade>
                </Modal>

                {/* Modal Suspend user Related People */}
                <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setSuspendOpen)}
                    onClose={this.handleSuspendClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setSuspendOpen)}>
                    <div
                        //@ts-ignore 
                        style={dashBoard.delinkPaper}>
                        <img src={ true_mark } style={{marginTop:"20px"}}/>
                        <Typography variant="h6"
                            //@ts-ignore 
                            style={dashBoard.unitno}>Suspend User</Typography>
                            <Typography variant="subtitle1" style={{marginTop:"20px"}}>User won’t be able use the platform services Are you sure you want to suspend the user?  </Typography>
                            <Grid container spacing={3} style={{marginTop:"20px"}}>
                            <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleSuspendClose}>
                                    CLOSE   
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    CONFIRM
                                </Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Fade>
                </Modal>

                {/* Family Members Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h6" style={dashBoard.subHeading}>{t("Family Members")}</Typography>
                        </Grid>
                </Grid>
                {/* Family Members */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3}
                      //@ts-ignore 
                      style={dashBoard.familyMemberPaper}>    
                        <Typography variant="h6" style={dashBoard.commonFont}>{t("Firaz Jaziri")}</Typography>
                        <span style={{position:"absolute", right:"10px", top:"10px", cursor:"pointer"}} onClick={(e: any) => this.handleFamilyMoreClick(e)}><MoreVertIcon color='disabled' /></span>
                        <Typography variant="subtitle1" style={{color:"#8C8E92"}}>Relation:</Typography>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                          <Typography variant="h6">Wife</Typography>
                          </div>
                          <div>
                          <Typography variant="subtitle1">CCD-345TER</Typography>
                          </div>
                        </div>
                      </Paper>

                      <Paper elevation={3}
                      //@ts-ignore
                       style={dashBoard.familyMemberPaper}>    
                        <Typography variant="h6" style={dashBoard.commonFont}>{t("Jenisha Ibrahim")}</Typography>
                        <Typography variant="subtitle1" style={{color:"#8C8E92"}}>Relation:</Typography>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                          <Typography variant="h6">Daughter</Typography>
                          </div>
                          <div>
                          <Typography variant="subtitle1">CCD-345TER</Typography>
                          </div>
                        </div>
                      </Paper>

                      <Paper elevation={3}
                      //@ts-ignore 
                      style={dashBoard.familyMemberPaper}>    
                        <Typography variant="h6" style={dashBoard.commonFont}>{t("Ahmad Ibrahim")}</Typography>
                        <Typography variant="subtitle1" style={{color:"#8C8E92"}}>Relation:</Typography>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                          <Typography variant="h6">Son</Typography>
                          </div>
                          <div>
                          {/* <Typography variant="subtitle1">Ahmad Ibrahim</Typography> */}
                          </div>
                        </div>
                      </Paper>
                  </div>
                </Box>

                {/* Family Members More Menu */}
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl1}
                  keepMounted
                  open={Boolean(this.state.anchorEl1)}
                  onClose={this.handleFamilyClose}
                  style={{padding:"0px", cursor:'pointer'}}
                  >
                  <MenuItem style={{margin:"7px", cursor:'pointer'}}>{t("Edit")}</MenuItem>
                  <hr style={{margin:"0px"}}/>
                  <MenuItem style={{margin:"7px", cursor:'pointer'}}>{t("Delete")}</MenuItem>
                </Menu>

                {/* Active Incidents Header*/}
                <Box>
                <Grid container style={dashBoard.gaMemberMain}> 
                      <Grid item xs={6}>
                        <Typography variant="h6" style={dashBoard.subHeading}>{t("Active Incidents")}</Typography>
                      </Grid>
                </Grid>
                </Box>
                {/* Active Incident */}
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

                {/* Vehicle Details Header*/}
                <Box>
                <Grid container style={dashBoard.gaMemberMain}> 
                      <Grid item xs={6}>
                        <Typography variant="h6" style={dashBoard.subHeading}>{t("Vehicle Details")}</Typography>
                      </Grid>
                </Grid>
                </Box>
                {/* Vehical Details */}
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

                {/* Rent Status Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                  <Grid item xs={6}>
                    <Typography variant="h6" style={dashBoard.subHeading}>{t("Rent Status")}</Typography>
                  </Grid>
                </Grid>
                {/* Rent Status */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={flag} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Unit Status ")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>Rented</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={profile_icon} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Tenant Name")}</Typography>
                                <Typography variant="h5" style={{fontWeight:600, color:"#FC8434"}}>Mr. Mohd Khan</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={currency_icon} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Rent Amount")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>SR 5,552 / Month</Typography>
                            </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>
                        <div style={{display:"flex"}}>
                            <img src={purchase_date} style={dashBoard.locationIcon} />
                            <div style={{marginLeft:"15px"}}>
                                <Typography variant="h6" >{t("Rent Tenure")}</Typography>
                                <Typography variant="h5" style={dashBoard.complexDetais}>2/05/22 - 2/05/23</Typography>
                            </div>
                        </div>
                      </Paper>
                  </div>
                </Box>

                {/* Rent History  Header*/}
                <Grid container style={dashBoard.gaMemberMain}> 
                      <Grid item xs={6}>
                      <Typography variant="h6" style={dashBoard.subHeading}>{t("Rent History ")}</Typography>
                      </Grid>
                </Grid>
                {/* Rent History  */}
                <Box style={{marginTop:"20px"}}>
                  <div style={dashBoard.relatedMemberCard}>
                      <Paper elevation={3} style={dashBoard.managementPaper}>    
                        <Typography variant="h6" style={dashBoard.commonFont}>{t("Mr. Mohd Khan")}</Typography>
                        <Typography variant="subtitle1" style={{color:"#8C8E92"}}>May 2022 to June 2022</Typography>
                        <hr/>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                            <Typography variant="h6">Rent Amount</Typography>
                            <Typography variant="h6">Received Amoumt</Typography>
                          </div>
                          <div>
                            <Typography variant="subtitle1" style={dashBoard.buildingCount}>$ 250</Typography>
                            <Typography variant="subtitle1" style={dashBoard.buildingCount}>$ 50</Typography>
                          </div>
                        </div>
                      </Paper>

                      <Paper elevation={3} style={dashBoard.managementPaper}>    
                        <Typography variant="h6" style={dashBoard.commonFont}>{t("Mr. Mohd Khan")}</Typography>
                        <Typography variant="subtitle1" style={{color:"#8C8E92"}}>May 2022 to June 2022</Typography>
                        <hr/>
                        <div style={dashBoard.commonDisplay}>
                          <div>
                            <Typography variant="h6">Rent Amount</Typography>
                            <Typography variant="h6">Received Amoumt</Typography>
                          </div>
                          <div>
                            <Typography variant="subtitle1" style={dashBoard.buildingCount}>$ 250</Typography>
                            <Typography variant="subtitle1" style={dashBoard.buildingCount}>$ 50</Typography>
                          </div>
                        </div>
                      </Paper>

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
  commonFont:{
    fontWeight:600
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
    borderRadius:10,
  },
  familyMemberPaper:{
    padding:20,
    borderRadius:10,
    position:"relative"
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
    gap: 70
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
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabels:{
    paddingLeft:35
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
delinkPaper:{
  backgroundColor: "#fff",
  borderRadius: '10px',
  // boxShadow: theme.shadows[5],
  padding: "16px 32px 24px",
  width:"500px",
  textAlign:"center"
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
modalCacle:{
  top:15,
  right:15,
  float:"right",
  cursor:"pointer"
},
};

// Customizable Area End
