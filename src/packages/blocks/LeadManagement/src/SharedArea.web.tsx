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
  MenuItem,
  FormLabel, 
  InputLabel,
  Backdrop,
  Modal,
  Fade,
  FormControl, 
  Select,
  TextareaAutosize
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";
// import Slider from "react-slick";
import sliderModal from "react-responsive-modal";

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
import SharedAreaController, { Props } from "./SharedAreaController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import './style.css';

import { cancle, uploadbw, del_image } from "./assets";

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
const maxNumber = 69;

function createData( no:any, Reserved_By:any, Building:any, Unit_Number:any, Reserved_On:any, Duration:any) {
  return { no, Reserved_By, Building, Unit_Number, Reserved_On, Duration };
}

const rows = [
  createData(1, "John Doe", 'Building 1','A-101', '12 July 2022', '9:00 - 12:00'),
  createData(2, "Stellina Pareker", 'Building 2', 'A-102', '12 July 2021', '9:00 - 12:00'),
  createData(3, "Kevin",'Building 3', 'A-103', '12 July 2020', '9:00 - 12:00'),
  createData(4, "Harper Hawking",'Building 4', 'A-104', '12 July 2019', '9:00 - 12:00'),
];

class SharedArea extends SharedAreaController {
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
                      {t("Building & Apartments")} / {t("Buildings")} / <Box component="span" style={{ color: "blue" }}> {t("Commercial Hall")}</Box>
                    </Typography>
                    
                  </Box>
                </Box>

                  {/* GA MEMBERS -- */}
                <Box>
                <Grid container style={dashBoard.gaMemberMain}> 
                        <Grid item xs={6}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Commercial Hall")}</Typography>
                        </Grid>
                        <Paper>

                        </Paper>
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
                            <Typography variant="h6" style={dashBoard.commonFont}>Edit Details</Typography>
                          </div>
                          <div>
                            <img src={cancle}
                            onClick={this.handleComplexEditClose} style={{cursor:"pointer"}}/>
                          </div>
                        </div>
                        <hr />
                        <Formik
                    initialValues={{
                        totalarea: "",
                        reservationfees: "",
                        floorplan: "",
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
                            <Grid item xs={12} sm={12}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Total Area")}</FormLabel>
                                <Field name="totalarea" type="text" placeholder={t("Total Area")} style={dashBoard.inviteInput} />
                                {/* <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={unitbw} className="frm-icons" alt="User Icon" />
                                </span> */}
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Reservation fees (Per hour)")}</FormLabel>
                                <Field name="reservationfees" type="text" placeholder={t("Reservation fees (Per hour)")} style={dashBoard.inviteInput} />
                                {/* <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={unitbw} className="frm-icons" alt="User Icon" />
                                </span> */}
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                              <Box className="formGroup customSelect">
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Floor Plan")}</FormLabel>
                                <Field name="floorplan" type="file" placeholder={t("Floor Plan")} style={dashBoard.inviteInput} />
                                {/* <span
                                //@ts-ignore 
                                style={dashBoard.formLeftIcn}>
                                  <img src={unitbw} className="frm-icons" alt="User Icon" />
                                </span> */}
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                          </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleComplexEditClose}>
                                    CANCEL 
                                </Button>
                               
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    SAVE
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
                    <Typography variant="h6" style={{fontWeight:600, padding:"15px"}}>{t("Details")}</Typography>
                    <Typography variant="h6" style={{padding:"0px 15px 10px 15px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially unchanged</Typography>

                        <Grid container>
                            <Grid item xs={6} style={{padding:"15px 15px"}}>
                                <Typography variant="h6">Total Area : <b style={{color:"#FC8434"}}>1800 sqft</b></Typography>
                                <Typography variant="h6">Reservation fees : <b style={{color:"#FC8434"}}>SR 50 per hour</b></Typography>
                            </Grid>
                            <Grid item xs={6}></Grid>

                        </Grid>
                  </Paper>
                </Box>

                <Paper style={{padding:"20px", marginTop:"40px"}}>
                    <Box style={dashBoard.TableHeader}>
                        <Typography variant="h5" style={dashBoard.subHeading}>{t("Upcoming Reservation")}</Typography>
                        {/* <SearchOutlinedIcon/> */}
                        <FormControl variant="outlined" style={{width:"25%"}}>
                            <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Building")}</InputLabel> 
                            <Select
                            name="unitno"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            style={{ paddingLeft: '25px', borderRadius:"10px" }}
                            // label="Select User Type"
                            // onChange={(e) => {
                            //     (e.target.value != " ") && setFieldValue("unitno", e.target.value)
                            // }}
                            // value={values.unitno}
                            >
                            <MenuItem  disabled value=" ">
                                {t("Building")}
                            </MenuItem>
                            <MenuItem value={"building1"}>Building 1</MenuItem>
                            <MenuItem value={"building2"}>Building 2</MenuItem>
                            <MenuItem value={"building3"}>Building 3</MenuItem>
                            <MenuItem value={"building4"}>Building 4</MenuItem>

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
                    <TableContainer>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={dashBoard.headerFont}>#</TableCell>
                                    <TableCell style={dashBoard.headerFont} align="left">{t("Reserved By")}</TableCell>
                                    <TableCell style={dashBoard.headerFont} align="left">{t("Building")}</TableCell>
                                    <TableCell style={dashBoard.headerFont} align="left">{t("Unit Number")}</TableCell>
                                    <TableCell style={dashBoard.headerFont} align="left">{t("Reserved On")}</TableCell>
                                    <TableCell style={dashBoard.headerFont} align="left">{t("Duration")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchData.map((row) => (
                                    <TableRow key={row.no}>
                                        <TableCell component="th" scope="row">{row.no}</TableCell>
                                        <TableCell align="left">{row.Reserved_By}</TableCell>
                                        <TableCell align="left">{row.Building}</TableCell>
                                        <TableCell align="left">{row.Unit_Number}</TableCell>
                                        <TableCell align="left">{row.Reserved_On}</TableCell>
                                        <TableCell align="left">{row.Duration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
export default withTranslation()(withRouter(SharedArea)); 

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
commonFont:{
  fontWeight:600
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
inviteInput:{
  padding: "18px 18px 18px 18px",
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
headerFont:{
    color:"#000",
    fontWeight:600
},
formLabels:{
    paddingLeft:35
},
};

// Customizable Area End
