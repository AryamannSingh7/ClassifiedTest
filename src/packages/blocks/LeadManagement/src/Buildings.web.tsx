import React from "react";
import {
  Container,
  Typography,
  Link,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  Grid,
  Card,
  Tabs,
  Tab,
  Divider,
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
  InputLabel,
  Input,
  MenuItem,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BuildingsController, { Props } from "./BuildingsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "./style.css";
import {
  upload,
  Document,
  sizebw,
  unitbw,
  mapLocation,
  location,
  uploadbw,
  del_image,
  floorIcon,
  earthIcon,
  complexbw,
  nextIcon,
  previousIcon,
} from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form } from "formik";
import { Menu } from "@szhsin/react-menu";
import Loader from "../../../components/src/Loader.web";
//@ts-ignore
import GoogleMapReact from "google-map-react";
import ChairmanCategoryBox from "../../../components/src/DocumentComponent/ChairmanCategoryBox.web";

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

const LocationPin = ({ lat, long }: any) => <img src={mapLocation} />;

class Buildings extends BuildingsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    let searchData = this.state.unitList.filter((item: any) => {
      if (
        this.state.dataSearch === "" ||
        (this.state.dataSearch !== "" &&
          item.attributes.apartment_name.toLowerCase().includes(this.state.dataSearch.toLowerCase()))
      ) {
        return item;
      }
    });

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
                      {t("Building & Apartments")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Buildings")}
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container style={dashBoard.gaMemberMain}>
                    <Grid item xs={6}>
                      <Typography variant="h5" style={dashBoard.subHeading}>
                        {t("Buildings & Apartments")}
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
                        <img src={this.state.buildingData.logo} />
                        <Box className="building-name-country">
                          <h4>{this.handleValidText(this.state.buildingData.buildingName)}</h4>
                          <p>{this.handleValidText(this.state.buildingData.city)}</p>
                        </Box>
                      </Box>
                      <Box className="building-info-right" onClick={() => this.handleMapModal()}>
                        <img src={location} alt="|" />
                        <span>{t("See building on map")}</span>
                      </Box>
                    </Box>
                    <Box className="building-info-bottom">
                      {this.state.buildingData.photos.length > 0 && (
                        <>
                          <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                            {this.state.buildingData.photos.map((image: any, index: number) => {
                              return (
                                <div
                                  className="slider-image-box"
                                  onClick={() => this.setState({ imageBox: true, photoIndex: index })}
                                  key={index}
                                >
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

                {this.state.imageBox && this.state.buildingData.photos.length > 0 && (
                  <Lightbox
                    imagePadding={120}
                    mainSrc={this.state.buildingData.photos[this.state.photoIndex].url}
                    nextSrc={
                      this.state.buildingData.photos[
                        (this.state.photoIndex + 1) % this.state.buildingData.photos.length
                      ].url
                    }
                    prevSrc={
                      this.state.buildingData.photos[
                        (this.state.photoIndex + this.state.buildingData.photos.length - 1) %
                          this.state.buildingData.photos.length
                      ].url
                    }
                    onCloseRequest={() => this.setState({ imageBox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (this.state.photoIndex + this.state.buildingData.photos.length - 1) %
                          this.state.buildingData.photos.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + 1) % this.state.buildingData.photos.length,
                      })
                    }
                  />
                )}

                <Box className="about-building">
                  <Card>
                    <h4>{t("About Building Name")}</h4>
                    <p>{this.handleValidText(this.state.buildingData.aboutBuilding)}</p>
                  </Card>
                </Box>

                <Box className="stat-boxes">
                  <Grid container spacing={2}>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Building Area")}</p>
                        <h2>
                          {this.handleValidText(this.state.buildingData.buildingArea)}{" "}
                          {this.state.buildingData.measurement || ""}
                        </h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Floors")}</p>
                        <h2>{this.handleValidText(this.state.buildingData.totalFloor)}</h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Units")}</p>
                        <h2>{this.handleValidText(this.state.buildingData.totalUnit)}</h2>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="content-boxes">
                  <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
                    <Tab label={t("Documents")} />
                    <Tab label={t("Units")} />
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
                        <Box className="document-box-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Policy">
                                <ChairmanCategoryBox
                                  image={Document}
                                  heading={t("Policy")}
                                  value={this.state.documentCount.policy}
                                />
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Guidelines">
                                <ChairmanCategoryBox
                                  image={Document}
                                  heading={t("Guidelines")}
                                  value={this.state.documentCount.guidelines}
                                />
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Roles">
                                <ChairmanCategoryBox
                                  image={Document}
                                  heading={t("Roles")}
                                  value={this.state.documentCount.roles}
                                />
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Resolutions">
                                <ChairmanCategoryBox
                                  image={Document}
                                  heading={t("Resolution")}
                                  value={this.state.documentCount.resolution}
                                />
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Building-Plans">
                                <ChairmanCategoryBox
                                  image={Document}
                                  heading={t("Building Plans")}
                                  value={this.state.documentCount.buildingPlans}
                                />
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
                            <h2>{t("Units")}</h2>
                          </Box>
                          <Box className="right-content">
                            <select
                              value={this.state.status}
                              className="unit-select"
                              onChange={(e: any) => this.setState({ status: e.target.value, page: 1 })}
                            >
                              <option disabled value="-">
                                {t("Status")}
                              </option>
                              <option value="">{t("All")}</option>
                              <option value="Empty">{t("Empty")}</option>
                              <option value="Rented">{t("Rented")}</option>
                              <option value="Occupied">{t("Occupied")}</option>
                              <option value="No-Own">{t("Not Owned")}</option>
                            </select>
                            <TextField
                              className="search-unit"
                              placeholder={t("Search by unit number")}
                              value={this.state.dataSearch}
                              onChange={(e) => this.setState({ dataSearch: e.target.value })}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        </Box>
                        <Divider />
                        <TableContainer>
                          <Table className="unit-table">
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>{t("Unit Number")}</TableCell>
                                <TableCell>{t("Floor Number")}</TableCell>
                                <TableCell>{t("Resident Name")}</TableCell>
                                <TableCell>{t("Owner")}</TableCell>
                                <TableCell>{t("Status")}</TableCell>
                                <TableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {searchData.map((unit: any, index: number) => {
                                return (
                                  <TableRow key={unit.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{unit.attributes.apartment_name}</TableCell>
                                    <TableCell>{unit.attributes.floor_number}</TableCell>
                                    <TableCell>
                                      {unit.attributes.resident ? unit.attributes.resident.resident_name : "-"}
                                    </TableCell>
                                    <TableCell>
                                      {unit.attributes.owner ? unit.attributes.owner.owner_name : "-"}
                                    </TableCell>
                                    <TableCell>
                                      <span className={unit.attributes.status}>
                                        {unit.attributes.status === "No-Own"
                                          ? `${t("Not Owned")}`
                                          : unit.attributes.status}
                                      </span>
                                    </TableCell>
                                    <TableCell>
                                      <Menu menuButton={<MoreVertIcon />}>
                                        <MenuItem>
                                          <Link href={`/UnitDetail/${unit.id}`}>{t("View")}</Link>
                                        </MenuItem>
                                      </Menu>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box className="unit-pagination">
                          <p>
                            {t("Showing")} <span>{this.state.pagination ? this.state.pagination.total_pages : 0}</span>{" "}
                            {t("of")} <span>{this.state.pagination ? this.state.pagination.total_count : 0}</span>{" "}
                            {t("results")}
                          </p>
                          {this.state.pagination && (
                            <Pagination
                              onChange={(event: any, value: any) => {
                                this.setState({ page: Number(value) });
                              }}
                              count={this.state.pagination.total_pages}
                              page={this.state.pagination.current_page}
                              siblingCount={2}
                              variant="outlined"
                              shape="rounded"
                            />
                          )}
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={2}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Shared Area")}</h2>
                          </Box>
                        </Box>
                        <Divider />
                        <Box className="document-box-box">
                          <Grid container spacing={2}>
                            {this.state.buildingData.sharedAreaList.map((sharedArea: any) => {
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
          className="edit-profile edit-building-modal"
          open={this.state.isEditBuildingModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="md"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Edit Details")}</Typography>
            <IconButton onClick={() => this.handleEditBuildingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.editForm}
            validationSchema={this.editBuildingDetailValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleEditBuildingModal();
              this.handleSaveBuildingDetails(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
                    <Box className="profile-picture">
                      <img src={values.displayLogo} alt="profile" className="picture building" />
                      <p className="logo-text" onClick={() => this.uploadLogo.click()}>
                        {t("Change Logo")}
                      </p>
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
                                for (let file of e.target.files) {
                                  let reader = new FileReader();
                                  reader.onloadend = () => {
                                    values.photos = [...values.photos, reader.result];
                                    setFieldValue("photos", values.photos);
                                    console.log(values.photos);
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
                          value={values.aboutBuilding}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="aboutBuilding"
                        />
                        {errors.aboutBuilding && touched.aboutBuilding && (
                          <small className="error">{t(errors.aboutBuilding)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Building Name")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Building Name")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={complexbw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.buildingName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="buildingName"
                        />
                        {errors.buildingName && touched.buildingName && (
                          <small className="error">{t(errors.buildingName)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Country")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Country")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={earthIcon} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.country}
                          readOnly
                        />
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Building Area")}</InputLabel>
                        <Box className="measurement-modal-box">
                          <Input
                            className="input-with-icon"
                            fullWidth
                            placeholder={t("Building Area")}
                            startAdornment={
                              <InputAdornment position="start">
                                <img src={sizebw} alt="icon" />
                              </InputAdornment>
                            }
                            value={values.buildingArea}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="buildingArea"
                          />
                          <Box className="measurement-modal-value">{this.state.buildingData.measurement}</Box>
                        </Box>
                        {errors.buildingArea && touched.buildingArea && (
                          <small className="error">{t(errors.buildingArea)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Total Floors")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Total Floors")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={floorIcon} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.totalFloor}
                          readOnly
                        />
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("Total Units")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Total Units")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={unitbw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.totalUnits}
                          readOnly
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleEditBuildingModal()}>
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

        <Dialog
          className="edit-profile chairman-map-modal"
          open={this.state.isOpenMapModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="sm"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Location")}</Typography>
            <IconButton onClick={() => this.handleMapModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          {this.state.buildingData.lat && this.state.buildingData.long ? (
            <Box className="google-map-box">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA1NvS9-cKp1dl_kMQDVFr4Gmbnv97MTtk" }}
                defaultCenter={{
                  lat: this.state.buildingData.lat,
                  lng: this.state.buildingData.long,
                }}
                defaultZoom={15}
              >
                <LocationPin lat={this.state.buildingData.lat} lng={this.state.buildingData.long} />
              </GoogleMapReact>
            </Box>
          ) : (
            <Box className="no-google-map-box">{t("No Location Available")}</Box>
          )}
        </Dialog>
      </>
    );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(BuildingApartmentStyle)(Buildings));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
  },
  buildingCount: {
    color: "#FC8434",
    fontWeight: 600,
    marginTop: 15,
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
  gaMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20,
  },
  relatedMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
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
  commonFont: {
    fontWeight: 600,
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
