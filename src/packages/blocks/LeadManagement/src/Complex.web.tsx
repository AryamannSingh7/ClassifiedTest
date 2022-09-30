import React from "react";
import {
  Container,
  Typography,
  Link,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  TextareaAutosize,
  Card,
  Tabs,
  Tab,
  Divider,
  Dialog,
  IconButton,
  DialogContent,
  InputLabel,
  DialogActions,
  Input,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ComplexController, { Props } from "./ComplexController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {
  upload,
  Document,
  sizebw,
  unitbw,
  mapLocation,
  location,
  del_image,
  uploadbw,
  floorIcon,
  nextIcon,
  previousIcon,
} from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form } from "formik";
import Loader from "../../../components/src/Loader.web";
//@ts-ignore
import GoogleMapReact from "google-map-react";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
};

const AnyReactComponent = () => <img src={mapLocation} alt="Marker" />;

class Complex extends ComplexController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    var searchData = this.state.complexData.buildingList.filter((building: any) => {
      if (this.state.dataSearch === "") {
        return building;
      } else if (building.building_name.toLowerCase().includes(this.state.dataSearch.toLowerCase())) {
        return building;
      }
    });

    const LocationPin = ({  }: any) => <img src={mapLocation} />;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box className={classes.building} style={{ background: "#F4F7FF" }}>
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
                      {t("Complex & Apartments")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Complex")}
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container style={dashBoard.gaMemberMain}>
                    <Grid item xs={6}>
                      <Typography variant="h5" style={dashBoard.subHeading}>
                        {t("Complex")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        className="edit-button"
                        variant="contained"
                        color="primary"
                        onClick={() => this.openEditBuildingModal()}
                      >
                        {t("Edit Details")}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="building-info">
                  <Card>
                    <Box className="building-info-top">
                      <Box className="building-info-left">
                        <img src={this.state.complexData.logo} alt="" />
                        <Box className="building-name-country">
                          <h4>{this.state.complexData.complexName}</h4>
                          <p>{this.state.complexData.city || "-"}</p>
                        </Box>
                      </Box>
                      <Box className="building-info-right" onClick={() => this.handleMapModal()}>
                        <img src={location} alt="|" />
                        <span>{t("See building on map")}</span>
                      </Box>
                    </Box>
                    <Box className="building-info-bottom">
                      {this.state.complexData.photos.length > 0 && (
                        <>
                          <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                            {this.state.complexData.photos.map((image: any, index: number) => {
                              return (
                                <div key={index} onClick={() => this.setState({ imageBox: true, photoIndex: index })}>
                                  <img src={image.url} alt="" />
                                </div>
                              );
                            })}
                          </Slider>
                          <Box className="slick-bottom">
                            <Box className="button prev" onClick={this.previousImage}>
                              <img src={previousIcon} alt="" />
                            </Box>
                            <Box className="button next" onClick={this.nextImage}>
                              <img src={nextIcon} alt="" />
                            </Box>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Card>
                </Box>

                {this.state.imageBox && this.state.complexData.photos.length > 0 && (
                  <Lightbox
                    mainSrc={this.state.complexData.photos[this.state.photoIndex].url}
                    nextSrc={
                      this.state.complexData.photos[(this.state.photoIndex + 1) % this.state.complexData.photos.length]
                        .url
                    }
                    prevSrc={
                      this.state.complexData.photos[
                        (this.state.photoIndex + this.state.complexData.photos.length - 1) %
                          this.state.complexData.photos.length
                      ].url
                    }
                    onCloseRequest={() => this.setState({ imageBox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (this.state.photoIndex + this.state.complexData.photos.length - 1) %
                          this.state.complexData.photos.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + 1) % this.state.complexData.photos.length,
                      })
                    }
                  />
                )}

                <Box className="about-building">
                  <Card>
                    <h4> {t("About Complex")}</h4>
                    <p>{this.state.complexData.aboutUs || "-"}</p>
                  </Card>
                </Box>

                <Box className="building-list">
                  <Card>
                    <Box className="top-content">
                      <Box className="heading">
                        <h4>{t("Buildings")}</h4>
                      </Box>
                      <TextField
                        className="search-unit"
                        value={this.state.dataSearch}
                        placeholder={t("Search by building name")}
                        onChange={(e: any) => {
                          this.setState({ dataSearch: e.target.value });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box className="bottom-content">
                      <Grid container spacing={2}>
                        {searchData.length === 0 && <p>{t("No Building Available")}</p>}
                        {searchData.map((building: any) => {
                          return (
                            <Grid item xs={4} key={building.building_management_id}>
                              <Link href={`/Building/${building.building_management_id}`}>
                                <Box className="building-box">
                                  <h5>{building.building_name}</h5>
                                </Box>
                              </Link>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Card>
                </Box>

                <Box className="stat-boxes">
                  <Grid container spacing={2}>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Complex Area")}</p>
                        <h2>{this.state.complexData.complexArea || "-"}</h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Buildings")}</p>
                        <h2>{this.state.complexData.totalBuilding}</h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Units")}</p>
                        <h2>{this.state.complexData.totalUnits}</h2>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="content-boxes">
                  <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
                    <Tab label={t("Documents")} />
                    <Tab label={t("Shared Area")} />
                  </Tabs>
                  <Box className="tab-content">
                    <TabPanel value={this.state.currentTab} index={0}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Documents")}</h2>
                          </Box>
                          <Link href="/DocumentChairman">
                            <Box className="right-content">
                              <img src={upload} alt="|" />
                              <span>{t("Upload")}</span>
                            </Box>
                          </Link>
                        </Box>
                        <Divider />
                        <Box className="document-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Policy">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Policy")}</h4>
                                  </div>
                                  {this.state.documentCount.policy > 0 && (
                                    <Button className="color-btn">{this.state.documentCount.policy}</Button>
                                  )}
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
                                  {this.state.documentCount.guidelines > 0 && (
                                    <Button className="color-btn">{this.state.documentCount.guidelines}</Button>
                                  )}
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
                                  {this.state.documentCount.roles > 0 && (
                                    <Button className="color-btn">{this.state.documentCount.roles}</Button>
                                  )}
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
                                  {this.state.documentCount.resolution > 0 && (
                                    <Button className="color-btn">{this.state.documentCount.resolution}</Button>
                                  )}
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
                                  {this.state.documentCount.buildingPlans > 0 && (
                                    <Button className="color-btn">{this.state.documentCount.buildingPlans}</Button>
                                  )}
                                </Box>
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={1}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Shared Area")}</h2>
                          </Box>
                        </Box>
                        <Divider />
                        <Box className="document-box">
                          <Grid container spacing={2}>
                            {this.state.complexData.sharedAreaList.map((sharedArea: any) => {
                              return (
                                <Grid item xs={12} md={6} lg={4} key={sharedArea.id}>
                                  <Link href={`/SharedArea/${sharedArea.id}`}>
                                    <Box className="item" style={dashBoard.cursorPointer}>
                                      <div
                                        className="heading"
                                        onClick={() => this.props.navigation.navigate("SharedArea")}
                                      >
                                        <img src={Document} />
                                        <h4>{sharedArea.name}</h4>
                                      </div>
                                    </Box>
                                  </Link>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          className="edit-profile"
          open={this.state.isEditBuildingModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="md"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Edit Details")}</Typography>
            <IconButton onClick={() => this.handleEditComplexModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.editForm}
            validationSchema={this.editComplexDetailValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleEditComplexModal();
              this.handleSaveComplexDetails(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
                    <Box className="profile-picture">
                      <img src={values.displayLogo} alt="profile" className="picture building" />
                      <p onClick={() => this.uploadLogo.click()}>{t("Change Logo")}</p>
                      <input
                        type="file"
                        ref={(ref: any) => (this.uploadLogo = ref)}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e: any) => {
                          const file = e.target.files[0];
                          let reader = new FileReader();
                          reader.onloadend = () => {
                            setFieldValue("displayLogo", reader.result);
                            setFieldValue("logo", file);
                          };
                          reader.readAsDataURL(file);
                        }}
                        onBlur={handleBlur}
                        name="logo"
                      />
                      {errors.logo && touched.logo && <small className="error">{t(errors.logo)}</small>}
                    </Box>
                    <Grid container spacing={2} className="edit-building">
                      <Grid item md={12}>
                        <InputLabel>{t("Upload Photos")}</InputLabel>
                        <Grid container spacing={4}>
                          <Grid item md={3}>
                            <Box className="upload-photo" onClick={() => this.uploadImages.click()}>
                              <img src={uploadbw} alt="" />
                            </Box>
                            <input
                              type="file"
                              ref={(ref: any) => (this.uploadImages = ref)}
                              style={{ display: "none" }}
                              accept="image/*"
                              onChange={(e: any) => {
                                for (let i = 0; i < e.target.files.length; i++) {
                                  const file = e.target.files[i];
                                  let reader = new FileReader();
                                  reader.onloadend = () => {
                                    values.photos = [...values.photos, reader.result];
                                    setFieldValue("photos", values.photos);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              onBlur={handleBlur}
                              name="photos"
                              multiple
                            />
                          </Grid>
                          {values.photos.map((image: any, index: number) => {
                            return (
                              <Grid item md={3} key={index}>
                                <Box className="building-image">
                                  <img
                                    src={del_image}
                                    className="delete-image"
                                    onClick={() => {
                                      const remainImage = values.photos.filter(
                                        (img: any, idx: number) => idx !== index
                                      );
                                      setFieldValue("photos", remainImage);
                                    }}
                                  />
                                  <img src={image} alt="" />
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                        {errors.photos && touched.photos && <small className="error">{t(errors.photos)}</small>}
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("About Us")}</InputLabel>
                        <TextareaAutosize
                          className="about-us"
                          placeholder={t("About Us")}
                          value={values.aboutUs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="aboutUs"
                        />
                        {errors.aboutUs && touched.aboutUs && <small className="error">{t(errors.aboutUs)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Complex Area")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Complex Area")}
                          value={values.complexArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="complexArea"
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={sizebw} alt="icon" />
                            </InputAdornment>
                          }
                        />
                        {errors.complexArea && touched.complexArea && (
                          <small className="error">{t(errors.complexArea)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Total Buildings")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          value={values.totalBuilding}
                          placeholder={t("Total Buildings")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={floorIcon} alt="icon" />
                            </InputAdornment>
                          }
                          readOnly
                        />
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("Total Units")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          value={values.totalUnits}
                          placeholder={t("Total Units")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={unitbw} alt="icon" />
                            </InputAdornment>
                          }
                          readOnly
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleEditComplexModal()}>
                      {t("Cancel")}
                    </Button>
                    <Button type="submit" className="add-button">
                      {t("Save")}
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog className="edit-profile" open={this.state.isOpenMapModalOpen} scroll="paper" fullWidth maxWidth="sm">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Location")}</Typography>
            <IconButton onClick={() => this.handleMapModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          {this.state.complexData.lat && this.state.complexData.long ? (
            <Box className="google-map-box">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA1NvS9-cKp1dl_kMQDVFr4Gmbnv97MTtk" }}
                defaultCenter={{
                  lat: this.state.complexData.lat,
                  lng: this.state.complexData.long,
                }}
                defaultZoom={15}
              >
                <LocationPin lat={this.state.complexData.lat} lng={this.state.complexData.long} />
              </GoogleMapReact>
            </Box>
          ) : (
            <Box className="no-google-map-box">No Location Available</Box>
          )}
        </Dialog>
      </>
    );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(BuildingApartmentStyle)(Complex));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    margin: 0,
  },
  buildingCount: {
    color: "#FC8434",
    fontWeight: 600,
    marginTop: 15,
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
    marginTop: 10,
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
    margin: "35px auto",
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
  TableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px 20px 0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  commonFont: {
    fontWeight: 600,
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
};

// Customizable Area End
