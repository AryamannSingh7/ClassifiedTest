import React from "react";
import {
  Container,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  Card,
  CardMedia,
  MenuItem,
  Modal,
  Fade,
  InputLabel,
  Backdrop,
  Divider,
  Dialog,
  IconButton,
  DialogContent,
  Input,
  Grid,
  DialogActions,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import "../../dashboard/src/Dashboard.web.css";
import { Formik, Form } from "formik";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
  building,
  true_mark,
  nextIcon,
  mapLocation,
  previousIcon,
} from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
//@ts-ignore
import GoogleMapReact from "google-map-react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
};

const LocationPin = ({  }: any) => <img src={mapLocation} />;

class UnitDetails extends UnitDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    console.log(this.state);

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
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ padding: "35px 0" }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1">
                      {t("Building & Apartments")} / {t("Buildings ")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {this.state.unitData.unitName}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" style={dashBoard.subHeading}>
                  {this.state.unitData.unitName}
                </Typography>

                {/* Building Location Details */}
                <Box className="location-details">
                  <Box className="heading">
                    <h4>{t("Building Location Details")}</h4>
                    <Box className="heading-right">
                      <Box className="map-modal" onClick={() => this.handleMapModal()}>
                        <img src={location} alt="" />
                        <span>See building on map</span>
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
                            <h4>{this.state.unitData.country || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={region} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Region")}</p>
                            <h4>{this.state.unitData.region || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={city} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("City")}</p>
                            <h4>{this.state.unitData.city || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* Unit Details */}
                <Box className="location-details unit-details">
                  <Box className="heading">
                    <h4>{t("Unit Details")}</h4>
                    <Box className="heading-right">
                      <Box className="edit-modal" onClick={() => this.openEditUnitModal()}>
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
                            <h4>{this.state.unitData.floor || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={size} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Size")}</p>
                            <h4>{this.state.unitData.size || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={configuration} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Configuration")}</p>
                            <h4>{this.state.unitData.configuration || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={purchase_price} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Purchase Price")}</p>
                            <h4>{this.state.unitData.purchasePrice || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={purchase_date} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Purchase Date")}</p>
                            <h4>
                              {this.state.unitData.purchaseDate
                                ? moment(this.state.unitData.purchaseDate).format("MMMM DD, YYYY")
                                : "-"}
                            </h4>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={4}>
                        <Card>
                          <img src={valuation} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Current Valuation")}</p>
                            <h4>{this.state.unitData.currentValuation || "-"}</h4>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* Related People */}
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

                {/* Family Members */}
                {this.state.familyList.length > 0 && (
                  <Box className="related-people family-details">
                    <Box className="heading">
                      <h4>{t("Family Members")}</h4>
                    </Box>
                    <Grid container spacing={2}>
                      {this.state.familyList.map((family: any) => {
                        return (
                          <Grid item sm={4} key={family.id}>
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
                        );
                      })}
                    </Grid>
                  </Box>
                )}

                {/* Active Incidents */}
                {this.state.unitData.activeIncidents.length > 0 && (
                  <Box className="active-incident">
                    <Box className="heading">
                      <h4>{t("Active Incidents")}</h4>
                    </Box>
                    <Grid container spacing={4}>
                      {this.state.unitData.activeIncidents.map((incident: any) => {
                        return (
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
                        );
                      })}
                    </Grid>
                  </Box>
                )}

                {/* Vehicle Details */}
                {this.state.unitData.vehicleDetails.length > 0 && (
                  <Box className="active-incident vehicle-details">
                    <Box className="heading">
                      <h4>{t("Vehicle Details")}</h4>
                    </Box>
                    <Grid container spacing={4}>
                      {this.state.unitData.vehicleDetails.map((vehicle: any) => {
                        return (
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
                        );
                      })}
                    </Grid>
                  </Box>
                )}

                {/* Rent Status */}
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

                {/* Rent History */}
                {this.state.unitData.rentHistory.length > 0 && (
                  <Box className="rent-history">
                    <Box className="heading">
                      <h4>{t("Rent History")}</h4>
                    </Box>
                    <Box className="history-data">
                      <Grid container spacing={2}>
                        {this.state.unitData.rentHistory.map((rent: any) => {
                          return (
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
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* Unit Pictures */}
                {this.state.unitData.photos.length > 0 && (
                  <Box className="building-info">
                    <Box className="heading">
                      <h4>Unit Pictures</h4>
                    </Box>
                    <Card>
                      <Box className="building-info-bottom">
                        <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                          {this.state.unitData.photos.map((image: any, index: number) => {
                            return (
                              <div onClick={() => this.setState({ imageBox: true, photoIndex: index })}>
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
                      </Box>
                    </Card>
                  </Box>
                )}

                {this.state.imageBox && this.state.unitData.photos.length > 0 && (
                  <Lightbox
                    mainSrc={this.state.unitData.photos[this.state.photoIndex].url}
                    nextSrc={
                      this.state.unitData.photos[(this.state.photoIndex + 1) % this.state.unitData.photos.length].url
                    }
                    prevSrc={
                      this.state.unitData.photos[
                        (this.state.photoIndex + this.state.unitData.photos.length - 1) %
                          this.state.unitData.photos.length
                      ].url
                    }
                    onCloseRequest={() => this.setState({ imageBox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (this.state.photoIndex + this.state.unitData.photos.length - 1) %
                          this.state.unitData.photos.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (this.state.photoIndex + 1) % this.state.unitData.photos.length,
                      })
                    }
                  />
                )}

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

        <Dialog className="edit-profile edit-unit" open={this.state.setUnitOpen} scroll="paper" fullWidth maxWidth="md">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Edit Unit Details")}</Typography>
            <IconButton onClick={() => this.handleUnitModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.editForm}
            validationSchema={this.editUnitDetailValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleUnitModal();
              this.handleSaveUnitDetails(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
                    <Grid container spacing={2} className="edit-building">
                      <Grid item md={6}>
                        <InputLabel>{t("Complex Name")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Complex Name")}
                          value={values.complexName}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={sizebw} alt="icon" />
                            </InputAdornment>
                          }
                          readOnly
                        />
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Building Name")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          value={values.buildingName}
                          placeholder={t("Building Name")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={building} alt="icon" />
                            </InputAdornment>
                          }
                          readOnly
                        />
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Unit Number")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          value={values.unitName}
                          placeholder={t("Unit Number")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={unitbw} alt="icon" />
                            </InputAdornment>
                          }
                          readOnly
                        />
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Size")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Size")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={sizebw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.size}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="size"
                        />
                        {errors.size && touched.size && <small className="error">{t(errors.size)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Configuration")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Configuration")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={configurationbw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.configuration}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="configuration"
                        />
                        {errors.configuration && touched.configuration && (
                          <small className="error">{t(errors.configuration)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Purchase Price")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Purchase Price")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={purchase_pricebw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.purchasePrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="purchasePrice"
                        />
                        {errors.purchasePrice && touched.purchasePrice && (
                          <small className="error">{t(errors.purchasePrice)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Purchase Date")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Purchase Date")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={purchase_datebw} alt="icon" />
                            </InputAdornment>
                          }
                          type="date"
                          value={values.purchaseDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="purchaseDate"
                        />
                        {errors.purchaseDate && touched.purchaseDate && (
                          <small className="error">{t(errors.purchaseDate)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Current Valuation")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("Current Valuation")}
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={valutionbw} alt="icon" />
                            </InputAdornment>
                          }
                          value={values.currentValuation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="currentValuation"
                        />
                        {errors.currentValuation && touched.currentValuation && (
                          <small className="error">{t(errors.currentValuation)}</small>
                        )}
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleUnitModal()}>
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
          {this.state.unitData.lat && this.state.unitData.long ? (
            <Box className="google-map-box">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA1NvS9-cKp1dl_kMQDVFr4Gmbnv97MTtk" }}
                defaultCenter={{
                  lat: this.state.unitData.lat,
                  lng: this.state.unitData.long,
                }}
                defaultZoom={15}
              >
                <LocationPin lat={this.state.unitData.lat} lng={this.state.unitData.long} />
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

export default withTranslation()(withStyles(BuildingApartmentStyle)(UnitDetails));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
    fontSize: "30px",
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
    padding: "16px 32px 24px",
    width: "700px",
  },
  delinkPaper: {
    backgroundColor: "#fff",
    borderRadius: "10px",
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
// Customizable Area End
