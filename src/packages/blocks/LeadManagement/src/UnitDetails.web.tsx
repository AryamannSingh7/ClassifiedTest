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
  InputLabel,
  Divider,
  Dialog,
  IconButton,
  DialogContent,
  Input,
  Grid,
  DialogActions,
  Select,
  OutlinedInput,
  Link,
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
import { withRouter } from "react-router";
import LocationCard from "../../../components/src/ComplexAndApartment/LocationCard.web";

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

  buildingLocation = (t: any) => {
    return (
      <Box className="location-details">
        <Box className="heading">
          <h4 className="bold-text">{t("Building Location Details")}</h4>
          <Box className="heading-right">
            <Box className="map-modal" onClick={() => this.handleMapModal()}>
              <img src={location} alt="" />
              <span>{t("See building on map")}</span>
            </Box>
          </Box>
        </Box>
        <Box className="location-data">
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <LocationCard
                image={country}
                style={dashBoard.locationIcon}
                heading={t("Country")}
                value={this.handleUnitText(this.state.unitData.country)}
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={region}
                style={dashBoard.locationIcon}
                heading={t("Region")}
                value={this.handleUnitText(this.state.unitData.region)}
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={city}
                style={dashBoard.locationIcon}
                heading={t("City")}
                value={this.handleUnitText(this.state.unitData.city)}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  unitDetails = (t: any) => {
    return (
      <Box className="location-details unit-details">
        <Box className="heading">
          <h4 className="bold-text">{t("Unit Details")}</h4>
          <Box className="heading-right">
            <Box className="edit-modal" onClick={() => this.openEditUnitModal()}>
              <img src={pencil} />
              <span>{t("Edit")}</span>
            </Box>
          </Box>
        </Box>
        <Box className="location-data">
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <LocationCard
                image={floor}
                style={dashBoard.locationIcon}
                heading={t("Floor Number")}
                value={this.handleUnitText(this.state.unitData.floor)}
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={size}
                style={dashBoard.locationIcon}
                heading={t("Size")}
                value={this.handleUnitText(this.state.unitData.size) + " " + (this.state.unitData.measurement || "")}
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={configuration}
                style={dashBoard.locationIcon}
                heading={t("Configuration")}
                value={this.handleUnitText(this.state.unitData.configuration)}
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={purchase_price}
                style={dashBoard.locationIcon}
                heading={t("Purchase Price")}
                value={
                  (this.state.unitData.currency || "") + " " + this.handleUnitText(this.state.unitData.purchasePrice)
                }
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={purchase_date}
                style={dashBoard.locationIcon}
                heading={t("Purchase Dat")}
                value={
                  this.state.unitData.purchaseDate
                    ? moment(this.state.unitData.purchaseDate).format("MMMM DD, YYYY")
                    : "-"
                }
              />
            </Grid>
            <Grid item sm={4}>
              <LocationCard
                image={valuation}
                style={dashBoard.locationIcon}
                heading={t("Current Valuation")}
                value={
                  (this.state.unitData.currency || "") + " " + this.handleUnitText(this.state.unitData.currentValuation)
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  relatedPeople = (t: any) => {
    if (this.state.unitData.relatedPeople.length > 0) {
      return (
        <Box className="related-people">
          <Box className="heading">
            <h4 className="bold-text">{t("Related People")}</h4>
          </Box>
          <Grid container spacing={2}>
            {this.state.unitData.relatedPeople.map((people: any, index: number) => {
              return (
                <Grid item sm={3} key={index}>
                  <Card className="user-details">
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        people.account.data.attributes.profile_pic && people.account.data.attributes.profile_pic.url
                      }
                      alt={people.account.data.attributes.full_name.name}
                      style={dashBoard.profileImage}
                    />
                    <h4 className="bold-text">{people.apartment_name}</h4>
                    <p>{people.account.data.attributes.full_name.name}</p>
                    <Box className="roles-box">
                      {people.roles.map((role: any) => {
                        return <span className="role">{role.name}</span>;
                      })}
                    </Box>
                    <Box className="icons">
                      <img src={chat} alt="" onClick={() => this.openChat(people.account.data.id)} />
                      <a href={`mailto:${people.account.data.attributes.email.email}`}>
                        <img src={email_org} alt="" />
                      </a>
                      <a href={`tel:${people.account.data.attributes.full_phone_number.full_phone_number}`}>
                        <img src={call_org} alt="" />
                      </a>
                    </Box>

                    <Box className="user-menu">
                      <Menu menuButton={<MoreVertIcon />}>
                        <MenuItem onClick={this.handleDeLinkModal}>{t("Delink User")}</MenuItem>
                        <MenuItem onClick={this.handleSuspendModal}>{t("Suspend User")}</MenuItem>
                      </Menu>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  };

  familyList = (t: any) => {
    if (this.state.unitData.familyList.length > 0) {
      return (
        <Box className="related-people family-details">
          <Box className="heading">
            <h4 className="bold-text">{t("Family Members")}</h4>
          </Box>
          <Grid container spacing={2}>
            {this.state.unitData.familyList.map((family: any) => {
              return (
                <Grid item sm={4} key={family.id}>
                  <Card className="user-details">
                    <Box className="heading">
                      <h4 className="bold-text">{family.attributes.name}</h4>
                      <Box className="user-menu">
                        <Menu menuButton={<MoreVertIcon />}>
                          <MenuItem
                            onClick={() => {
                              this.setState({ familyId: family.id }, () => {
                                this.openFamilyModal(family);
                              });
                            }}
                          >
                            {t("Edit")}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              this.setState({ familyId: family.id, familyMemberName: family.attributes.name }, () => {
                                this.handleDeleteFamilyMemberModal();
                              });
                            }}
                          >
                            {t("Delete")}
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                    <p className="label">{t("Relation")}:</p>
                    <Box className="user-info">
                      <p>{family.attributes.relation.name}</p>
                      <p>{family.attributes.id_number || ""}</p>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  };

  activeIncident = (t: any) => {
    if (this.state.unitData.activeIncidents.length > 0) {
      return (
        <Box className="active-incident">
          <Box className="heading">
            <h4 className="bold-text">{t("Active Incidents")}</h4>
          </Box>
          <Grid container spacing={4}>
            {this.state.unitData.activeIncidents.map((incident: any) => {
              return (
                <Grid item sm={6} key={incident.id}>
                  <Card className="incident-card">
                    <Box className="heading">
                      <h4 className="bold-text">{incident.attributes.incident_title}</h4>
                      <span className={incident.attributes.incident_status}>{incident.attributes.incident_status}</span>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Affected Area")}:</p>
                      <p>
                        <span className="bold-text">{incident.attributes.common_area.name || "-"}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Incident is related to")}:</p>
                      <p>
                        <span className="bold-text">{incident.attributes.incident_related.name || "-"}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Reported on")}:</p>
                      <p>
                        <span className="bold-text">{moment(incident.reported_on).format("MMMM DD, YYYY")}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Building")}:</p>
                      <p>
                        <span className="bold-text">{this.state.unitData.buildingName}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Unit")}:</p>
                      <p>
                        <span className="bold-text">{this.state.unitData.unitName}</span>
                      </p>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  };

  vehicleDetails = (t: any) => {
    if (this.state.unitData.vehicleDetails.length > 0) {
      return (
        <Box className="active-incident vehicle-details">
          <Box className="heading">
            <h4 className="bold-text">{t("Vehicle Details")}</h4>
          </Box>
          <Grid container spacing={4}>
            {this.state.unitData.vehicleDetails.map((vehicle: any) => {
              return (
                <Grid item sm={6} key={vehicle.id}>
                  <Card className="incident-card">
                    <Box className="heading">
                      <h4 className="bold-text">{vehicle.attributes.model_number}</h4>
                    </Box>
                    <img
                      src={vehicle.attributes.registration_card_copy && vehicle.attributes.registration_card_copy.url}
                      alt=""
                      style={{ marginBottom: "5px", width: "150px", height: "100px", borderRadius: "8px" }}
                    />
                    <Box className="incident-data">
                      <p>{t("Owner Name")}:</p>
                      <p>
                        <span className="bold-text">{vehicle.attributes.owner_name || "-"}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Registration Card Number")}:</p>
                      <p>
                        <span className="bold-text">{vehicle.attributes.plate_number}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Car Details")}:</p>
                      <p>
                        <span className="bold-text">{vehicle.attributes.description || "-"}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Building")}:</p>
                      <p>
                        <span className="bold-text">{this.state.unitData.buildingName}</span>
                      </p>
                    </Box>
                    <Box className="incident-data">
                      <p>{t("Unit")}:</p>
                      <p>
                        <span className="bold-text">{this.state.unitData.unitName}</span>
                      </p>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  };

  rentHistory = (t: any) => {
    if (this.state.unitData.rentHistory.length > 0) {
      return (
        <Box className="rent-history">
          <Box className="heading">
            <h4 className="bold-text">{t("Rent History")}</h4>
          </Box>
          <Box className="history-data">
            <Grid container spacing={2}>
              {this.state.unitData.rentHistory.map((rent: any) => {
                return (
                  <Grid item sm={6} key={rent.id}>
                    <Card>
                      <h4 className="bold-text">{rent.attributes.tenant_name}</h4>
                      <p className="date">
                        {moment(rent.attributes.start_date, "YYYY-MM-DD").format("MMMM YY")} to{" "}
                        {moment(rent.attributes.end_date, "YYYY-MM-DD").format("MMMM YY")}
                      </p>
                      <Divider />
                      <Box className="history-info" style={{ marginTop: "8px" }}>
                        <p>{t("Rent Amount (Monthly)")}</p>
                        <p>
                          <span>
                            {this.state.unitData.currency || ""} {rent.attributes.rent_amount || 0}
                          </span>
                        </p>
                      </Box>
                      <Box className="history-info">
                        <p>{t("Received Amount")}</p>
                        <p>
                          <span>
                            {this.state.unitData.currency || ""} {rent.attributes.received_amount || 0}
                          </span>
                        </p>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      );
    }
  };

  unitPhotos = (t: any) => {
    if (this.state.unitData.photos.length > 0) {
      return (
        <Box className="building-info">
          <Box className="heading">
            <h4 className="bold-text">{t("Unit Pictures")}</h4>
          </Box>
          <Card>
            <Box className="building-info-bottom">
              <Slider ref={(c: any) => (this.slider = c)} {...settings}>
                {this.state.unitData.photos.map((image: any, index: number) => {
                  return (
                    <div className="slider-image" onClick={() => this.setState({ imageBox: true, photoIndex: index })}>
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
      );
    }
  };

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.unitDetails} style={{ background: "#F4F7FF" }}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ padding: "35px 0" }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1">
                      {t("Building & Apartments")} /{" "}
                      <Link href={`/Building/${this.state.buildingId}`}>{t("Buildings")}</Link> /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {this.state.unitData.unitName}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" style={dashBoard.subHeading} className="bold-text">
                  {this.state.unitData.unitName}
                </Typography>

                {/* Building Location Details */}
                {this.buildingLocation(t)}

                {/* Unit Details */}
                {this.unitDetails(t)}

                {/* Related People */}
                {this.relatedPeople(t)}

                {/* Family Members */}
                {this.familyList(t)}

                {/* Active Incidents */}
                {this.activeIncident(t)}

                {/* Vehicle Details */}
                {this.vehicleDetails(t)}

                {/* Rent Status */}
                <Box className="location-details unit-details rent-status">
                  <Box className="heading">
                    <h4 className="bold-text">{t("Rent Status")}</h4>
                  </Box>
                  <Box className="location-data">
                    <Grid container spacing={2}>
                      <Grid item sm={4}>
                        <Card>
                          <img src={flag} style={dashBoard.locationIcon} />
                          <Box className="location-info">
                            <p>{t("Unit Status")}</p>
                            <h4 className="bold-text">
                              {this.state.unitData.rentStatus === "No-Own"
                                ? "Not Owned"
                                : this.state.unitData.rentStatus}
                            </h4>
                          </Box>
                        </Card>
                      </Grid>
                      {this.state.unitData.rentStatus === "Rented" && (
                        <>
                          <Grid item sm={4}>
                            <Card>
                              <img src={profile_icon} style={dashBoard.locationIcon} />
                              <Box className="location-info">
                                <p>{t("Tenant Name")}</p>
                                <h4 className="bold-text" style={{ fontWeight: 600, color: "#FC8434" }}>
                                  {this.state.unitData.tenantName || "-"}
                                </h4>
                              </Box>
                            </Card>
                          </Grid>
                          <Grid item sm={4}>
                            <Card>
                              <img src={currency_icon} style={dashBoard.locationIcon} />
                              <Box className="location-info">
                                <p>{t("Rent Amount")}</p>
                                <h4 className="bold-text">{this.state.unitData.rentAmount || "-"} / Month</h4>
                              </Box>
                            </Card>
                          </Grid>
                          <Grid item sm={4}>
                            <Card>
                              <img src={purchase_date} style={dashBoard.locationIcon} />
                              <Box className="location-info">
                                <p>{t("Rent Tenure")}</p>
                                <h4 className="bold-text">
                                  {moment(this.state.unitData.rentStartDate, "YYYY-MM-DD").format("MMM DD, YYYY")} -
                                  {moment(this.state.unitData.rentEndDate, "YYYY-MM-DD").format("MMM DD, YYYY")}
                                </h4>
                              </Box>
                            </Card>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Box>

                {/* Rent History */}
                {this.rentHistory(t)}

                {/* Unit Pictures */}
                {this.unitPhotos(t)}

                {this.state.imageBox && this.state.unitData.photos.length > 0 && (
                  <Lightbox
                    imagePadding={120}
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
              </Container>
            </Grid>
          </Box>
        </Box>

        {/* Edit Unit Details Modal */}
        <Dialog className="edit-profile edit-unit" open={this.state.setUnitOpen} scroll="paper" fullWidth maxWidth="md">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6" className="bold-text">
              {t("Edit Unit Details")}
            </Typography>
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
                        <Box className="measurement-modal-box">
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
                          <Box className="measurement-modal-value">{this.state.unitData.measurement}</Box>
                        </Box>
                        {errors.size && touched.size && <small className="error">{t(errors.size)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Configuration")}</InputLabel>
                        <Box className="edit-unit-modal-config">
                          <img src={configurationbw} alt="" />
                          <Select
                            value={values.configuration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="configuration"
                            variant="filled"
                            className="select-input"
                            input={<OutlinedInput />}
                          >
                            <MenuItem value="" disabled>
                              {t("Configuration")}
                            </MenuItem>
                            {this.state.configList.map((config: any) => {
                              return (
                                <MenuItem value={config.title} key={config.title}>
                                  {config.title}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Box>
                        {errors.configuration && touched.configuration && (
                          <small className="error">{t(errors.configuration)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Purchase Price")}</InputLabel>
                        <Box className="measurement-modal-box">
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
                          <Box className="measurement-modal-value">{this.state.unitData.currency}</Box>
                        </Box>
                        {errors.purchasePrice && touched.purchasePrice && (
                          <small className="error">{t(errors.purchasePrice)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Purchase Date")}</InputLabel>
                        <Box className="past-date">
                          <input
                            className="input-with-icon"
                            placeholder={t("Purchase Date")}
                            type="date"
                            value={values.purchaseDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="purchaseDate"
                            max={moment()
                              .format("YYYY-MM-DD")
                              .toString()}
                          />
                          <img src={purchase_datebw} alt="" />
                        </Box>
                        {errors.purchaseDate && touched.purchaseDate && (
                          <small className="error">{t(errors.purchaseDate)}</small>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Current Valuation")}</InputLabel>
                        <Box className="measurement-modal-box">
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
                          <Box className="measurement-modal-value">{this.state.unitData.currency}</Box>
                        </Box>
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

        {/* Google Map */}
        <Dialog
          className="edit-profile unit-map-modal"
          open={this.state.isOpenMapModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="sm"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6" className="bold-text">
              {t("Location")}
            </Typography>
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
            <Box className="no-google-map-box">{t("No Location Available")}</Box>
          )}
        </Dialog>

        {/* Edit Family Member */}
        <Dialog
          className="edit-family-modal"
          open={this.state.isEditFamilyModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="sm"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6" className="bold-text">
              {t("Edit Family Member")}
            </Typography>
            <IconButton onClick={() => this.handleEditFamilyMemberModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.editFamilyForm}
            validationSchema={this.editFamilyMemberValidation}
            onSubmit={(values, { resetForm }) => {
              this.handleEditFamilyMemberModal();
              this.handleEditFamilyMember(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate>
                  <DialogContent dividers>
                    <Grid container spacing={2} className="edit-building">
                      <Grid item md={6}>
                        <InputLabel>{t("Family Member Name")}</InputLabel>
                        <Input
                          fullWidth
                          placeholder={t("Member Name")}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                        />
                        {errors.name && touched.name && <small className="error">{t(errors.name)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Relation")}</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          value={values.relation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="relation"
                          className="select-input"
                        >
                          <MenuItem value="" disabled>
                            {t("Select Relation")}
                          </MenuItem>
                          {this.state.relationList.map((relation: any) => {
                            return <MenuItem value={relation.id}>{relation.name}</MenuItem>;
                          })}
                        </Select>
                        {errors.relation && touched.relation && <small className="error">{t(errors.relation)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("Type of ID Proof")}</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          value={values.idProof}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="idProof"
                          className="select-input"
                        >
                          <MenuItem value="" disabled>
                            {t("Select ID Proof")}
                          </MenuItem>
                          {this.state.idProofList.map((idProof: any) => {
                            return <MenuItem value={idProof.id}>{idProof.name}</MenuItem>;
                          })}
                        </Select>
                        {errors.idProof && touched.idProof && <small className="error">{t(errors.idProof)}</small>}
                      </Grid>
                      <Grid item md={6}>
                        <InputLabel>{t("ID Number")}</InputLabel>
                        <Input
                          className="input-with-icon"
                          fullWidth
                          placeholder={t("ID Number")}
                          value={values.idNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="idNumber"
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" onClick={() => this.handleEditFamilyMemberModal()}>
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

        {/* Delete Family Member */}
        <Dialog
          className="delete-dialog unit-delete-member-modal"
          fullWidth
          onClose={() => this.handleDeleteFamilyMemberModal()}
          open={this.state.isDeleteFamilyModalOpen}
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={true_mark} alt="comment" />
              <Typography variant="h6" className="bold-text">
                {t("Delete Family Member")}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                {t("Member will be remove from this unit")}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {t("Are you sure you want to delete the")} {this.state.familyMemberName}?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  onClick={() => this.handleDeleteFamilyMemberModal()}
                  className="cancel-button"
                  style={{ width: "200px" }}
                >
                  {t("Close")}
                </Button>
                <Button
                  onClick={() => this.handleDeleteFamilyMember()}
                  style={{ width: "200px" }}
                  className="add-button"
                >
                  {t("Delete")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        {/* DeLink Related People  */}
        <Dialog
          className="delete-dialog unit-delink-member-modal"
          fullWidth
          onClose={() => this.handleDeLinkModal()}
          open={this.state.setDeLinkOpen}
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={true_mark} alt="comment" />
              <Typography variant="h6" className="bold-text">
                {t("Delink User")}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {t("User will be removed from this unit Are you sure you want to delink the user?")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleDeLinkModal()} className="cancel-button" style={{ width: "200px" }}>
                  {t("Close")}
                </Button>
                <Button onClick={() => this.handleDeLinkModal()} style={{ width: "200px" }} className="add-button">
                  {t("Delink")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Suspend Related People  */}
        <Dialog
          className="delete-dialog uni-suspend-member-modal"
          fullWidth
          onClose={() => this.handleDeLinkModal()}
          open={this.state.setSuspendOpen}
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={true_mark} alt="comment" />
              <Typography variant="h6" className="bold-text">
                {t("Suspend User")}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {t("User won’t be able use the platform services Are you sure you want to suspend the user?")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleDeLinkModal()} className="cancel-button" style={{ width: "200px" }}>
                  {t("Close")}
                </Button>
                <Button onClick={() => this.handleDeLinkModal()} style={{ width: "200px" }} className="add-button">
                  {t("Confirm")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(BuildingApartmentStyle)(withRouter(UnitDetails)));

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
