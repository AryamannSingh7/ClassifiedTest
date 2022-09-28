import React from "react";
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
  Modal,
  Fade,
  FormLabel,
  FormControl,
  Select,
  InputLabel,
  Backdrop,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import ImageUploading from "react-images-uploading";
import "../../dashboard/src/Dashboard.web.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@material-ui/core/Box";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import UnitDetailsController, { Props } from "./UnitDetailsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
import {
  configuration,
  city,
  country,
  floor,
  purchase_date,
  purchase_price,
  valuation,
  region,
  size,
  call_org,
  email_org,
  chat,
  bentalyLogo,
  currency_icon,
  flag,
  profile_icon,
  pencil,
  location,
  configurationbw,
  valutionbw,
  unitbw,
  sizebw,
  purchase_pricebw,
  purchase_datebw,
  complexbw,
  building,
  cancle,
  true_mark,
  uploadbw,
  del_image,
} from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const maxNumber = 69;

const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
};

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500",
];

class UnitDetails extends UnitDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box className={classes.unitDetails} style={{ background: "#F4F7FF" }}>
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
                    <Typography variant="body1">
                      {t("Building & Apartments")} / {t("Buildings ")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Unit 309
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" style={dashBoard.subHeading}>
                  Unit 309
                </Typography>

                <Box className="location-details">
                  <Box className="heading">
                    <h4>{t("Building Location Details")}</h4>
                    <Box className="heading-right">
                      <Box className="map-modal">
                        <img src={location} alt="" />
                        <span>See building on map</span>
                      </Box>
                      <Box className="edit-modal">
                        <img src={pencil} />
                        <span>Edit</span>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="location-data">
                    <Grid container spacing={2}>
                      <Grid item sm={4}>
                        <Card>
                          <img src={country} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Country")}</p>
                            <h4>UAE</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={region} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Region")}</p>
                            <h4>Eastern</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={city} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("City")}</p>
                            <h4>Dubai</h4>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Box className="location-details unit-details">
                  <Box className="heading">
                    <h4>{t("Unit Details")}</h4>
                    <Box className="heading-right">
                      <Box className="edit-modal" onClick={this.handleUnitModal}>
                        <img src={pencil} />
                        <span>Edit</span>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="location-data">
                    <Grid container spacing={2}>
                      <Grid item sm={4}>
                        <Card>
                          <img src={floor} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Floor Number")}</p>
                            <h4>15</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={size} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Size")}</p>
                            <h4>2550 sqft</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={configuration} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Configuration")}</p>
                            <h4> 2 BHK</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={purchase_price} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Purchase Price")}</p>
                            <h4>SR 57,992</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={purchase_date} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Purchase Date")}</p>
                            <h4>2 June, 2022</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={valuation} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Current Valuation")}</p>
                            <h4>SR 50,000</h4>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Box className="related-people">
                  <Box className="heading">
                    <h4>{t("Related People")}</h4>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Card className="user-details">
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://tinyurl.com/3mrr3dm5"
                          alt="green iguana"
                          style={dashBoard.profileImage}
                        />
                        <h4>B-140</h4>
                        <p>Lia doe</p>
                        <span className="role">Property Manager</span>
                        <Box className="icons">
                          <img src={chat} alt="" />
                          <img src={email_org} alt="" />
                          <img src={call_org} alt="" />
                        </Box>

                        <Box className="user-menu">
                          <Menu menuButton={<MoreVertIcon />}>
                            <MenuItem onClick={this.handleDeLinkModal}>{t("Delink User ")}</MenuItem>
                            <MenuItem onClick={this.handleSuspendModal}>{t("Suspend User")}</MenuItem>
                          </Menu>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="related-people family-details">
                  <Box className="heading">
                    <h4>{t("Family Members")}</h4>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item sm={4}>
                      <Card className="user-details">
                        <Box className="heading">
                          <h4>Ali Khan</h4>
                          <Box className="user-menu">
                            <Menu menuButton={<MoreVertIcon />}>
                              <MenuItem>{t("Edit")}</MenuItem>
                              <MenuItem>{t("Delete")}</MenuItem>
                            </Menu>
                          </Box>
                        </Box>
                        <p className="label">Relation:</p>
                        <Box className="user-info">
                          <p>Wife</p>
                          <p>A456 - A2324 342</p>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="active-incident">
                  <Box className="heading">
                    <h4>{t("Active Incidents")}</h4>
                  </Box>
                  <Grid container spacing={4}>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>Title</h4>
                          <span style={{ background: "#e4edff", color: "#2B6FED" }}>Pending</span>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Affected Area")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Incident is related to")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Reported on")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>Title</h4>
                          <span style={{ background: "#e4edff", color: "#2B6FED" }}>Pending</span>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Affected Area")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Incident is related to")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Reported on")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="active-incident vehicle-details">
                  <Box className="heading">
                    <h4>{t("Vehicle Details")}</h4>
                  </Box>
                  <Grid container spacing={4}>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>A ASDFG 1234</h4>
                        </Box>
                        <img src={bentalyLogo} alt="" style={{ marginBottom: "5px" }} />
                        <Box className="incident-data">
                          <p>{t("Owner Name:")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Registration Card Number")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Car Details")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>A ASDFG 1234</h4>
                        </Box>
                        <img src={bentalyLogo} alt="" style={{ marginBottom: "5px" }} />
                        <Box className="incident-data">
                          <p>{t("Owner Name:")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Registration Card Number")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Car Details")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>A ASDFG 1234</h4>
                        </Box>
                        <img src={bentalyLogo} alt="" style={{ marginBottom: "5px" }} />
                        <Box className="incident-data">
                          <p>{t("Owner Name:")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Registration Card Number")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Car Details")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item sm={6}>
                      <Card className="incident-card">
                        <Box className="heading">
                          <h4>A ASDFG 1234</h4>
                        </Box>
                        <img src={bentalyLogo} alt="" style={{ marginBottom: "5px" }} />
                        <Box className="incident-data">
                          <p>{t("Owner Name:")}:</p>
                          <p>
                            <span>Own Apartment</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Registration Card Number")}:</p>
                          <p>
                            <span>Plumbing</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Car Details")}:</p>
                          <p>
                            <span>20-20-2020 20:20</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Building")}:</p>
                          <p>
                            <span>Building 5</span>
                          </p>
                        </Box>
                        <Box className="incident-data">
                          <p>{t("Unit")}:</p>
                          <p>
                            <span>1502</span>
                          </p>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="location-details unit-details rent-status">
                  <Box className="heading">
                    <h4> {t("Rent Status")}</h4>
                  </Box>
                  <Box className="location-data">
                    <Grid container spacing={2}>
                      <Grid item sm={4}>
                        <Card>
                          <img src={flag} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Unit Status ")}</p>
                            <h4>Rented</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={profile_icon} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Tenant Name")}</p>
                            <h4 style={{ fontWeight: 600, color: "#FC8434" }}>Mr. Mohd Khan</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={currency_icon} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Rent Amount")}</p>
                            <h4>SR 5,552 / Month</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={purchase_date} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Rent Tenure")}</p>
                            <h4>2/05/22 - 2/05/23</h4>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Box className="rent-history">
                  <Box className="heading">
                    <h4>{t("Rent History ")}</h4>
                  </Box>
                  <Box className="history-data">
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <Card>
                          <h4>Mr. Ali Khan</h4>
                          <p className="date">May 2022 to June 2023</p>
                          <Divider />
                          <Box className="history-info">
                            <p>Rent Amount</p>
                            <p>
                              <span>$ 234</span>
                            </p>
                          </Box>
                          <Box className="history-info">
                            <p>Received Amount</p>
                            <p>
                              <span>$ 0</span>
                            </p>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Box className="building-info">
                  <Box className="heading">
                    <h4>Unit Pictures</h4>
                  </Box>
                  <Card>
                    <Box className="building-info-bottom">
                      <Slider {...settings}>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                      </Slider>
                    </Box>
                  </Card>
                </Box>

                {this.state.imageBox && (
                  <Lightbox
                    mainSrc={images[this.state.photoIndex]}
                    nextSrc={images[(this.state.photoIndex + 1) % images.length]}
                    prevSrc={images[(this.state.photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => this.setState({ imageBox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + 1) % images.length,
                      })
                    }
                  />
                )}

                {/* Edit unitdetails modal */}
                <Modal
                  style={dashBoard.modal}
                  open={Boolean(this.state.setEditOpen)}
                  onClose={this.handleEditModal}
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
                          <Typography variant="h6" style={dashBoard.commonFont}>
                            Edit Details
                          </Typography>
                        </div>
                        <div>
                          <img src={cancle} onClick={this.handleEditModal} style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                      <hr />
                      <Formik
                        initialValues={{
                          countryname: "",
                          buildingname: "",
                          buildingarea: "",
                          totalfloors: "",
                          totalunits: "",
                          purchasedate: "",
                          currentvaluation: "",
                          size: "",
                        }}
                        validationSchema={this.EditSchema()}
                        validateOnMount={true}
                        onSubmit={(values) => {
                          console.log("valus=========>", values);
                          // same shape as initial values
                          // this.invitationData(values);
                        }}
                      >
                        {({ values, touched, errors, isValid, setFieldValue }) => (
                          <Form translate={true} className="commonForm ">
                            <FormLabel component="legend" style={dashBoard.labelsStyle}>
                              {t("Upload Photos")}
                            </FormLabel>

                            <Grid container>
                              <Grid xs={12} sm={12}>
                                <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                  {t("About Us")}
                                </FormLabel>
                                <TextareaAutosize
                                  aria-label="minimum height"
                                  minRows={10}
                                  placeholder="About Us"
                                  style={{ width: "100%", borderRadius: "10px", padding: "15px" }}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Building Name")}
                                  </FormLabel>
                                  <FormControl variant="outlined">
                                    <span className="frmLeftIcons">
                                      <img src={building} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>
                                      {t("Building Name")}
                                    </InputLabel>
                                    <Select
                                      name="buildingname"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: "45px" }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        e.target.value != " " && setFieldValue("buildingname", e.target.value);
                                      }}
                                      value={values.buildingname}
                                    >
                                      <MenuItem disabled value=" ">
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
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Country")}
                                  </FormLabel>
                                  <FormControl variant="outlined">
                                    <span className="frmLeftIcons">
                                      <img src={building} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>
                                      {t("Country")}
                                    </InputLabel>
                                    <Select
                                      name="countryname"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: "45px" }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        e.target.value != " " && setFieldValue("countryname", e.target.value);
                                      }}
                                      value={values.countryname}
                                    >
                                      <MenuItem disabled value=" ">
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
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Building Area")}
                                  </FormLabel>
                                  <Field
                                    name="buildingarea"
                                    type="text"
                                    placeholder={t("Building Area")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={configurationbw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Total Floors")}
                                  </FormLabel>
                                  <Field
                                    name="totalfloors"
                                    type="text"
                                    placeholder={t("Total Floors")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={purchase_pricebw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Total Units")}
                                  </FormLabel>
                                  <Field
                                    name="totalunits"
                                    type="text"
                                    placeholder={t("Total Units")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={purchase_datebw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} />
                              <Grid item xs={12} sm={3}>
                                <Button
                                  variant="outlined"
                                  style={{
                                    width: "100%",
                                    color: "#2B6FED",
                                    border: "1px solid #2B6FED",
                                    fontWeight: 600,
                                    height: "50px",
                                  }}
                                  onClick={this.handleEditModal}
                                >
                                  CLOSE
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{ width: "100%", backgroundColor: "#2B6FED", fontWeight: 600, height: "50px" }}
                                >
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

                {/* Edit unitdetails modal */}
                <Modal
                  style={dashBoard.modal}
                  open={Boolean(this.state.setUnitOpen)}
                  onClose={this.handleUnitModal}
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
                          <Typography variant="h6" style={dashBoard.commonFont}>
                            Edit Unit Details
                          </Typography>
                        </div>
                        <div>
                          <img src={cancle} onClick={this.handleUnitModal} style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                      <hr />
                      <Formik
                        initialValues={{
                          complexname: "",
                          buildingname: "",
                          unitno: "",
                          configuration: "",
                          purchaseprice: "",
                          purchasedate: "",
                          currentvaluation: "",
                          size: "",
                        }}
                        validationSchema={this.InvitationSchema()}
                        validateOnMount={true}
                        onSubmit={(values) => {
                          console.log("valus=========>", values);
                          // same shape as initial values
                          // this.invitationData(values);
                        }}
                      >
                        {({ values, touched, errors, isValid, setFieldValue }) => (
                          <Form translate={true} className="commonForm ">
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Complex Name")}
                                  </FormLabel>
                                  <Field
                                    name="complexname"
                                    type="text"
                                    placeholder={t("Complex Name")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={complexbw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Building Name")}
                                  </FormLabel>
                                  <FormControl variant="outlined">
                                    <span className="frmLeftIcons">
                                      <img src={building} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>
                                      {t("Building Name")}
                                    </InputLabel>
                                    <Select
                                      name="buildingname"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: "45px" }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        e.target.value != " " && setFieldValue("buildingname", e.target.value);
                                      }}
                                      value={values.buildingname}
                                    >
                                      <MenuItem disabled value=" ">
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
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Unit Number")}
                                  </FormLabel>
                                  <FormControl variant="outlined">
                                    <span className="frmLeftIcons">
                                      <img src={unitbw} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>
                                      {t("Unit Number")}
                                    </InputLabel>
                                    <Select
                                      name="unitno"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: "45px" }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        e.target.value != " " && setFieldValue("unitno", e.target.value);
                                      }}
                                      value={values.unitno}
                                    >
                                      <MenuItem disabled value=" ">
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
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Size")}
                                  </FormLabel>
                                  <FormControl variant="outlined">
                                    <span className="frmLeftIcons">
                                      <img src={sizebw} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>
                                      {t("Size")}
                                    </InputLabel>
                                    <Select
                                      name="size"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: "45px" }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        e.target.value != " " && setFieldValue("size", e.target.value);
                                      }}
                                      value={values.size}
                                    >
                                      <MenuItem disabled value=" ">
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
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Configuration")}
                                  </FormLabel>
                                  <Field
                                    name="configuration"
                                    type="text"
                                    placeholder={t("Configuration")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={configurationbw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Purchase Price")}
                                  </FormLabel>
                                  <Field
                                    name="purchaseprice"
                                    type="text"
                                    placeholder={t("Purchase Price")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={purchase_pricebw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Purchase Date")}
                                  </FormLabel>
                                  <Field
                                    name="purchasedate"
                                    type="text"
                                    placeholder={t("Purchase Date")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={purchase_datebw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>
                                    {t("Current Valuation")}
                                  </FormLabel>
                                  <Field
                                    name="currentvaluation"
                                    type="text"
                                    placeholder={t("Current Valuation")}
                                    style={dashBoard.inviteInput}
                                  />
                                  <span
                                    //@ts-ignore
                                    style={dashBoard.formLeftIcn}
                                  >
                                    <img src={valutionbw} className="frm-icons" alt="User Icon" />
                                  </span>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} />
                              <Grid item xs={12} sm={3}>
                                <Button
                                  variant="outlined"
                                  style={{
                                    width: "100%",
                                    color: "#2B6FED",
                                    border: "1px solid #2B6FED",
                                    fontWeight: 600,
                                    height: "50px",
                                  }}
                                  onClick={this.handleUnitModal}
                                >
                                  CLOSE
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  style={{ width: "100%", backgroundColor: "#2B6FED", fontWeight: 600, height: "50px" }}
                                >
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

                {/* Modal Delink Related People */}
                <Modal
                  style={dashBoard.modal}
                  open={Boolean(this.state.setDeLinkOpen)}
                  onClose={this.handleDeLinkModal}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={Boolean(this.state.setDeLinkOpen)}>
                    <div
                      //@ts-ignore
                      style={dashBoard.delinkPaper}
                    >
                      <img src={true_mark} style={{ marginTop: "20px" }} />
                      <Typography
                        variant="h6"
                        //@ts-ignore
                        style={dashBoard.unitno}
                      >
                        Delink user
                      </Typography>
                      <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
                        User will be removed from this unit Are you sure you want to delink the user?{" "}
                      </Typography>
                      <Grid container spacing={3} style={{ marginTop: "20px" }}>
                        <Grid item xs={12} sm={6} style={{ marginBottom: "20px" }}>
                          <Button
                            variant="outlined"
                            style={{
                              width: "100%",
                              color: "#2B6FED",
                              border: "1px solid #2B6FED",
                              fontWeight: 600,
                              height: "50px",
                            }}
                            onClick={this.handleDeLinkModal}
                          >
                            CLOSE
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ width: "100%", backgroundColor: "#2B6FED", fontWeight: 600, height: "50px" }}
                          >
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
                  onClose={this.handleSuspendModal}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={Boolean(this.state.setSuspendOpen)}>
                    <div
                      //@ts-ignore
                      style={dashBoard.delinkPaper}
                    >
                      <img src={true_mark} style={{ marginTop: "20px" }} />
                      <Typography
                        variant="h6"
                        //@ts-ignore
                        style={dashBoard.unitno}
                      >
                        Suspend User
                      </Typography>
                      <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
                        User won’t be able use the platform services Are you sure you want to suspend the user?{" "}
                      </Typography>
                      <Grid container spacing={3} style={{ marginTop: "20px" }}>
                        <Grid item xs={12} sm={6} style={{ marginBottom: "20px" }}>
                          <Button
                            variant="outlined"
                            style={{
                              width: "100%",
                              color: "#2B6FED",
                              border: "1px solid #2B6FED",
                              fontWeight: 600,
                              height: "50px",
                            }}
                            onClick={this.handleSuspendModal}
                          >
                            CLOSE
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ width: "100%", backgroundColor: "#2B6FED", fontWeight: 600, height: "50px" }}
                          >
                            CONFIRM
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Fade>
                </Modal>
              </Container>
            </Grid>
          </Box>
        </Box>
        {/* <Loader loading={this.state.loading} /> */}
      </>
    );
  }
}

export default withTranslation()(withStyles(BuildingApartmentStyle)(UnitDetails));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  commonFont: {
    fontWeight: 600,
  },
  buildingCount: {
    color: "#FC8434",
    fontWeight: 600,
  },
  complexDetais: {
    color: "#000",
    fontWeight: 600,
  },
  buildingCard: {
    color: "#FC8434",
    fontWeight: 600,
    marginTop: 15,
    border: "1px solid #E4E4E4",
    borderRadius: 10,
    padding: 12,
  },
  tabLabel: {
    color: "#FC8434",
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
  searchButton: {
    margin: 8,
  },
  backColor: {
    backgroundColor: "#2D6EED",
    padding: "9px 16px",
  },
  boxStyling: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  gaMemberMain: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  viewMore: {
    marginTop: 15,
    textDecoration: "underline",
    color: "#E5B08D",
    fontWeight: 600,
  },
  relatedMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
  },
  complexMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20,
  },
  gaCardMember: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
  },
  BuildingListCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
    padding: 25,
  },
  profileImage: {
    borderRadius: "100%",
    width: 70,
    height: 70,
  },
  userType: {
    backgroundColor: "aliceblue",
    borderRadius: 30,
    display: "inline-block",
    padding: "3px 20px",
    color: "#2D6EED",
    fontWeight: 600,
  },
  unitno: {
    marginTop: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  contactIcon: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  commonDisplay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStyle: {
    borderRadius: 10,
    maxWidth: 345,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  managementPaper: {
    padding: 20,
    borderRadius: 10,
  },
  familyMemberPaper: {
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  TableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px 20px 0px",
  },
  locationIcon: {
    height: 25,
    width: 25,
  },
  gaActiveMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr",
    gap: 70,
  },
  activeMembercardStyle: {
    borderRadius: 10,
    maxWidth: 600,
    boxShadow: "none",
    padding: "0px 20px 0px 20px",
  },
  facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formLabels: {
    paddingLeft: 35,
  },
  labelsStyle: {
    color: "#212121",
    margin: "10px 0px 10px 0px",
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    // boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    width: "700px",
  },
  delinkPaper: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    // boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    width: "500px",
    textAlign: "center",
  },
  inviteInput: {
    padding: "18px 18px 18px 50px",
    color: "#b5b5b5",
    borderRadius: "10px",
    border: "1px solid #e9dede",
    backgroundColor: "#f9f9f9",
    fontSize: "16px",
    outline: 0,
    width: "100%",
  },
  formLeftIcn: {
    position: "absolute",
    left: 20,
    top: 44,
    color: "#b9b9b9",
  },
  modalCacle: {
    top: 15,
    right: 15,
    float: "right",
    cursor: "pointer",
  },
};

{
  /* <ImageUploading
  multiple
  value={this.state.unitImages}
  onChange={this.imageonChange}
  maxNumber={maxNumber}
  dataURLKey="data_url"
  acceptType={["jpg"]}
>
  {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }): any => (
    <div className="upload__image-wrapper">
      <button
        style={isDragging ? { color: "red" } : null}
        onClick={onImageUpload}
        className="upload-btn btn-dashed"
        {...dragProps}
      >
        <img src={uploadbw} />
      </button>
      &nbsp;
      {imageList.map((image: any, index: any) => (
        <div key={index} className="image-item">
          <img src={image.data_url} alt="" className="images" />
          <div className="image-item__btn-wrapper">
            <span onClick={() => onImageRemove(index)} className="image-span">
              <img src={del_image} />
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</ImageUploading> */
}
// Customizable Area End
