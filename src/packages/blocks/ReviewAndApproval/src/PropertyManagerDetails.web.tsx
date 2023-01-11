// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Card,
  Drawer,
  FormControl,
  Select,
  OutlinedInput,
  Input,
  InputAdornment,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerDetailsController, { Props } from "./PropertyManagerDetailsController.web";
import {
  BuildingLogo,
  EditIcon,
  DeleteIcon,
  BlueManagerIcon,
  BlueNumberIcon,
  BlueCompanyIcon,
  BluePhoneIcon,
  BlueEmailIcon,
  BlueTypeIcon,
  BlueDateIcon,
  PdfIcon,
  DownloadIcon,
  CountryIcon,
  CityIcon,
  BuildingIcon,
  UnitIcon,
  IDDateIcon,
  FeeTypeIcon,
} from "./assets";
import { withTranslation } from "react-i18next";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import { Form, Formik } from "formik";
import moment from "moment";
import Loader from "../../../components/src/Loader.web";

class PropertyManagerDetails extends PropertyManagerDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.managerDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{this.validationText(this.state.propertyManagerDetails.managerName)}</span>
                  </div>
                  <div className="right-icon">
                    <img
                      src={EditIcon}
                      onClick={() =>
                        this.props.navigation.navigate("EditPropertyManager", { id: this.state.propertyManagerId })
                      }
                      alt="edit"
                    />
                    <img
                      onClick={() =>
                        this.setState({ loading: true }, () => this.deletePropertyManager(this.state.propertyManagerId))
                      }
                      src={DeleteIcon}
                      alt="delete"
                    />
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <Box className="details-box-item">
                      <h4>{t("Property Manager Details")}</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueManagerIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Manager Name")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.managerName)}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueCompanyIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Company Name")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.companyName)}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BluePhoneIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Phone Number")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.phoneNumber)}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueEmailIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("Email Address")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.email)}</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="details-box-item">
                      <h4>{t("Property Details")}</h4>
                      <Grid container spacing={2}>
                        {this.state.propertyManagerDetails.propertyList.length === 0 && (
                          <Grid item xs={12}>
                            <Card>{t("No Property Available")}</Card>
                          </Grid>
                        )}
                        {this.state.propertyManagerDetails.propertyList.map((property: any, index: number) => {
                          return (
                            <Grid item xs={12} key={index}>
                              <Card>
                                <Box className="heading-box-item">
                                  <h4>
                                    Building {property.attributes.building_management.name} Unit{" "}
                                    {property.attributes.apartment_management.apartment_name}
                                  </h4>
                                  <Box className="right-box-item">
                                    <img
                                      className="edit-property-image"
                                      src={EditIcon}
                                      alt="edit"
                                      onClick={() => this.handleEditProperty(property)}
                                    />
                                    <img
                                      className="delete-property-image"
                                      onClick={() => this.handleDeleteProperty(property.id)}
                                      src={DeleteIcon}
                                      alt="delete"
                                    />
                                  </Box>
                                </Box>
                                <Grid container spacing={2}>
                                  {property.attributes.start_date && property.attributes.end_date && (
                                    <Grid item xs={12}>
                                      <Box className="box-item-content">
                                        <span>{t("Contract")}</span>
                                        <p>
                                          {moment(property.attributes.start_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}{" "}
                                          - {moment(property.attributes.end_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                        </p>
                                      </Box>
                                    </Grid>
                                  )}
                                  {property.attributes.fixed_persentage_of_rent && (
                                    <Grid item xs={12}>
                                      <Box className="box-item-content">
                                        <span>{t("Charges")}</span>
                                        <p>{property.attributes.fixed_persentage_of_rent}/Month</p>
                                      </Box>
                                    </Grid>
                                  )}
                                </Grid>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>

                    <Box className="details-box-item">
                      <h4>{t("Identity Proof")}</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueTypeIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Type")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.IdType)}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueNumberIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Number")}</span>
                                <p>{this.validationText(this.state.propertyManagerDetails.IdNumber)}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueDateIcon} alt="" />
                              <Box className="box-item-content">
                                <span>{t("ID Expiration Date")}</span>
                                <p>
                                  {this.state.propertyManagerDetails.IdDate
                                    ? moment(this.state.propertyManagerDetails.IdDate, "YYYY-MM-DD").format(
                                        "MMMM DD, YYYY"
                                      )
                                    : "-"}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    {this.state.propertyManagerDetails.IdPdfDocument && (
                      <Box className="pdf-content-box">
                        <Card>
                          <Box className="heading">
                            <img src={PdfIcon} alt="" />
                            <h4>
                              {this.state.propertyManagerDetails.managerName +
                                " " +
                                this.state.propertyManagerDetails.IdType}{" "}
                            </h4>
                          </Box>
                          <Link target="_blank" href={this.state.propertyManagerDetails.IdPdfDocument}>
                            <img src={DownloadIcon} alt="" />
                          </Link>
                        </Card>
                      </Box>
                    )}
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Drawer
          anchor="bottom"
          className="condition-modal penalty-dialog rent-history-dialog"
          open={this.state.isEditPropertyModalOpen}
          onClose={() => this.handleEditPropertyModal()}
        >
          <Formik
            enableReinitialize
            initialValues={this.state.propertyForm}
            validationSchema={this.registerPropertyFormSchema}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: true }, () => {
                this.handleEditPropertyModal();
                this.editProperty(values);
              });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate="yes">
                  <Box>
                    <h4>{t("Edit Property")}</h4>
                    <FormControl fullWidth>
                      <Input
                        value={values.country}
                        name="country"
                        className="select-input input"
                        placeholder={t("Country")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={CountryIcon} alt="" />
                          </InputAdornment>
                        }
                        readOnly
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.city}
                        name="city"
                        className="select-input input"
                        placeholder={t("City")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={CityIcon} alt="" />
                          </InputAdornment>
                        }
                        readOnly
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.buildingName}
                        name="buildingName"
                        className="select-input input"
                        placeholder={t("Building Name")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={BuildingIcon} alt="" />
                          </InputAdornment>
                        }
                        readOnly
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.unitName}
                        name="unitName"
                        className="select-input input"
                        placeholder={t("Unit Number")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={UnitIcon} alt="" />
                          </InputAdornment>
                        }
                        readOnly
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="startDate"
                        className="select-input input"
                        placeholder={t("Contract Start Date")}
                        type="text"
                        onFocus={(e: any) => (e.target.type = "date")}
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={IDDateIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="custom-input-box">
                        <input
                          value={values.endDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="endDate"
                          className="select-input input"
                          placeholder={t("Contract End Date")}
                          type="text"
                          onFocus={(e: any) => (e.target.type = "date")}
                          min={values.startDate}
                        />
                        <img src={IDDateIcon} alt="" />
                      </Box>
                      {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value={values.feeType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="feeType"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Select Fee Type")}
                          </MenuItem>
                          <MenuItem value="Fixed Percentage">{t("Fixed Percentage of Rent")}</MenuItem>
                          <MenuItem value="Fixed Amount">{t("Fixed Amount")}</MenuItem>
                        </Select>
                        <img src={FeeTypeIcon} alt="" />
                      </Box>
                      {errors.feeType && touched.feeType && <p className="error">{t(errors.feeType)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.rent}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rent"
                        className="select-input input"
                        placeholder={
                          values.feeType === "Fixed Amount"
                            ? `${t("Enter Fixed Amount")}`
                            : `${t("Enter Fixed Percentage of Rent")}`
                        }
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={FeeTypeIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.rent && touched.rent && <p className="error">{t(errors.rent)}</p>}
                    </FormControl>
                  </Box>
                  <Box className="button-group">
                    <Button className="add-button" type="submit">
                      {t("Edit")}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Drawer>
      </>
    );
  }
}

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(PropertyManagerDetails));
// Customizable Area End
