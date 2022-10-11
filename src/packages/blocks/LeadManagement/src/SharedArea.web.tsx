import React from "react";
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  TextareaAutosize,
  withStyles,
  Card,
  Divider,
  Dialog,
  IconButton,
  Input,
  DialogActions,
  DialogContent,
  Chip,
  Link,
} from "@material-ui/core";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import SharedAreaController, { Props } from "./SharedAreaController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { uploadbw, del_image, downloadIcon, Document, nextIcon, previousIcon, DeleteIcon } from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
import Loader from "../../../components/src/Loader.web";
import { Formik, Form } from "formik";
import moment from "moment";

function createData(no: any, Reserved_By: any, Building: any, Unit_Number: any, Reserved_On: any, Duration: any) {
  return { no, Reserved_By, Building, Unit_Number, Reserved_On, Duration };
}

const rows = [
  createData(1, "John Doe", "Building 1", "A-101", "12 July 2022", "9:00 - 12:00"),
  createData(2, "Stellina Pareker", "Building 2", "A-102", "12 July 2021", "9:00 - 12:00"),
  createData(3, "Kevin", "Building 3", "A-103", "12 July 2020", "9:00 - 12:00"),
  createData(4, "Harper Hawking", "Building 4", "A-104", "12 July 2019", "9:00 - 12:00"),
];

const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
};

class SharedArea extends SharedAreaController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

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
                      {t("Building & Apartments")} / {t("Buildings")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {this.state.sharedAreaData.name}
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container style={dashBoard.gaMemberMain}>
                    <Grid item xs={6}>
                      <Typography variant="h5" style={dashBoard.subHeading}>
                        {this.state.sharedAreaData.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        className="edit-button"
                        variant="contained"
                        color="primary"
                        onClick={() => this.openSharedAreaEditModal()}
                      >
                        {t("Edit Details")}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="building-info">
                  <Card>
                    <Box className="building-info-bottom shared-area-image">
                      {this.state.sharedAreaData.photos.length === 0 ? (
                        <span>{t("No Photos Available")}</span>
                      ) : (
                        <>
                          <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                            {this.state.sharedAreaData.photos.map((image: any, index: number) => {
                              return (
                                <div onClick={() => this.setState({ imageBox: true, photoIndex: index })} key={index}>
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

                {this.state.imageBox && this.state.sharedAreaData.photos.length > 0 && (
                  <Lightbox
                    imagePadding={120}
                    mainSrc={this.state.sharedAreaData.photos[this.state.photoIndex].url}
                    nextSrc={
                      this.state.sharedAreaData.photos[
                        (this.state.photoIndex + 1) % this.state.sharedAreaData.photos.length
                      ].url
                    }
                    prevSrc={
                      this.state.sharedAreaData.photos[
                        (this.state.photoIndex + this.state.sharedAreaData.photos.length - 1) %
                          this.state.sharedAreaData.photos.length
                      ].url
                    }
                    onCloseRequest={() => this.setState({ imageBox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (this.state.photoIndex + this.state.sharedAreaData.photos.length - 1) %
                          this.state.sharedAreaData.photos.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + 1) % this.state.sharedAreaData.photos.length,
                      })
                    }
                  />
                )}

                <Box className="about-building">
                  <Card>
                    <h4> {t("Details")}</h4>
                    <p>{this.state.sharedAreaData.details || "-"}</p>

                    <Box className="bottom-detail">
                      <Box className="left-detail">
                        <p>
                          {t("Total Area")}: <span>{this.state.sharedAreaData.totalArea || "-"}</span>
                        </p>
                        <p>
                          {t("Reservation fees")}:{" "}
                          <span>{this.state.sharedAreaData.reservationFee || "-"} per hour</span>
                        </p>
                      </Box>
                      {this.state.sharedAreaData.floorPlan && (
                        <Box className="right-detail">
                          <Box className="name">
                            <img src={Document} alt="" />
                            <h6>{t("Floor Plan")}</h6>
                          </Box>
                          <Link href={this.state.sharedAreaData.floorPlan.url} target="_blank">
                            <img src={downloadIcon} alt="" />
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Box>

                <Box className="content-boxes shared-table">
                  <Card>
                    <Box className="top-content">
                      <Box className="heading">
                        <h2>{t("Upcoming Reservation")}</h2>
                      </Box>
                      <Box className="right-content">
                        <select
                          value={this.state.selectedBuilding}
                          className="unit-select"
                          onChange={(e: any) => {
                            this.setState({ selectedBuilding: e.target.value });
                          }}
                        >
                          <option disabled value="">
                            {t("Building")}
                          </option>
                          {this.state.buildings.map((building: any) => {
                            return (
                              <option value={building.name} key={building.id}>
                                {building.name}
                              </option>
                            );
                          })}
                        </select>
                      </Box>
                    </Box>
                    <Divider />
                    <TableContainer className="unit-table">
                      <Table className="unit-table">
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>{t("Reserved By")}</TableCell>
                            <TableCell>{t("Building")}</TableCell>
                            <TableCell>{t("Unit Number")}</TableCell>
                            <TableCell>{t("Reserved On")}</TableCell>
                            <TableCell>{t("Duration")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.reservationList.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6}>{t("No reservation available")}</TableCell>
                            </TableRow>
                          )}
                          {this.state.reservationList.map((reservation: any, index: number) => {
                            return (
                              <TableRow key={reservation.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{"-"}</TableCell>
                                <TableCell>{"-"}</TableCell>
                                <TableCell>{"-"}</TableCell>
                                <TableCell>
                                  {moment(reservation.attributes.date, "DD-MMM-YYYY").format("MMM DD, YYYY")}
                                </TableCell>
                                <TableCell>
                                  {reservation.attributes.time_from + " - " + reservation.attributes.time_to}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <Box className="unit-pagination">
                      <p>
                        {t("Showing")} <span>5</span> {t("of")} <span>{rows.length}</span> {t("results")}
                      </p>
                      <Pagination count={10} variant="outlined" shape="rounded" />
                    </Box> */}
                  </Card>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog className="edit-profile" open={this.state.setComplexEditOpen} scroll="paper" fullWidth maxWidth="md">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Edit Details")}</Typography>
            <IconButton onClick={() => this.handleSharedAreaEditModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.editForm}
            validationSchema={this.editAreaDetailValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleSharedAreaEditModal();
              this.handleSaveSharedAreaDetails(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
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
                        <InputLabel>{t("Details")}</InputLabel>
                        <TextareaAutosize
                          className="about-us"
                          placeholder={t("Details")}
                          value={values.details}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="details"
                        />
                        {errors.details && touched.details && <small className="error">{t(errors.details)}</small>}
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("Total Area")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Total Area")}
                          value={values.totalArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="totalArea"
                        />
                        {errors.totalArea && touched.totalArea && (
                          <small className="error">{t(errors.totalArea)}</small>
                        )}
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("Reservation Fees (Per hour)")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Reservation Fees (Per hour)")}
                          value={values.fees}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="fees"
                        />
                        {errors.fees && touched.fees && <small className="error">{t(errors.fees)}</small>}
                      </Grid>
                      <Grid item md={12}>
                        <InputLabel>{t("Floor Plan")}</InputLabel>
                        <Box className="floor-plan-box">
                          <input
                            type="file"
                            ref={(ref: any) => (this.uploadFile = ref)}
                            style={{ display: "none" }}
                            accept=".pdf"
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              setFieldValue("floorPlan", file);
                              setFieldValue("floorPlanName", file.name);
                            }}
                            onBlur={handleBlur}
                            name="floorPlan"
                          />
                          {!values.floorPlan ? (
                            <span className="placeholder">{t("Floor Plan")}</span>
                          ) : (
                            <Chip
                              label={values.floorPlanName}
                              onDelete={() => {
                                setFieldValue("floorPlan", null);
                                setFieldValue("floorPlanName", "");
                              }}
                              deleteIcon={<img src={DeleteIcon} />}
                              className={classes.chip}
                            />
                          )}
                          <img onClick={() => this.uploadFile.click()} src={uploadbw} />
                        </Box>
                        {errors.floorPlan && touched.floorPlan && (
                          <small className="error">{t(errors.floorPlan)}</small>
                        )}
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleSharedAreaEditModal()}>
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
      </>
    );
  }
}

export default withTranslation()(withStyles(BuildingApartmentStyle)(SharedArea));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 0,
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
    padding: "18px 18px 18px 18px",
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
  headerFont: {
    color: "#000",
    fontWeight: 600,
  },
  formLabels: {
    paddingLeft: 35,
  },
};

// Customizable Area End
