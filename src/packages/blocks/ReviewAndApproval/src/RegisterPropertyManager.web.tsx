// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
  Input,
  FormControl,
  Drawer,
  Link,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingIcon,
  BuildingLogo,
  CityIcon,
  CompanyIcon,
  CountryIcon,
  DeleteIcon,
  EditIcon,
  EmailIcon,
  FeeTypeIcon,
  IDDateIcon,
  IDNumberIcon,
  IDTypeIcon,
  ManagerIcon,
  MobileIcon,
  PdfIcon,
  UnitIcon,
  UploadIcon,
} from "./assets";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import Loader from "../../../components/src/Loader.web";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import RegisterPropertyManagerController, { Props } from "./RegisterPropertyManagerController.web";
import { CountryList } from "./countryList";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

class RegisterPropertyManager extends RegisterPropertyManagerController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const propertyList = JSON.parse(sessionStorage.getItem("propertyList") as any);
    if (propertyList) {
      this.setState({ propertyList: propertyList }, () => {
        this.getBuildingList();
        this.getIdTypeList();
        this.getComplexDetails();
      });
    } else {
      this.setState({ propertyList: [] }, () => {
        this.getBuildingList();
        this.getIdTypeList();
        this.getComplexDetails();
      });
    }
  }

  render() {
    const { classes, t } = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh" }} className={classes.registerManager}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Add Property Manager")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.propertyManagerForm}
                      validationSchema={this.registerPropertyManagerFormSchema}
                      onSubmit={(values: any, { resetForm }) => {
                        this.setState({ loading: true }, () => {
                          this.createPropertyManager(values);
                          resetForm();
                        });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="yes">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.companyName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="companyName"
                                  className="select-input input"
                                  placeholder={t("Company Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CompanyIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.companyName && touched.companyName && (
                                  <p className="error">{t(errors.companyName)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.managerName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="managerName"
                                  className="select-input input"
                                  placeholder={t("Manager Full Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ManagerIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.managerName && touched.managerName && (
                                  <p className="error">{t(errors.managerName)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="email"
                                  className="select-input input"
                                  placeholder={t("Email ID (will be your user name)")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={EmailIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.email && touched.email && <p className="error">{t(errors.email)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="mobile-box">
                                  <Select
                                    displayEmpty
                                    value={values.countryCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="countryCode"
                                    fullWidth
                                    className="mobile-select"
                                    input={<OutlinedInput />}
                                  >
                                    {CountryList.map((country: any) => {
                                      return (
                                        <MenuItem key={country.dial_code} value={country.dial_code}>
                                          <img
                                            src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${country.code}.svg`}
                                            width="15"
                                            height="15"
                                            style={{ marginRight: "5px" }}
                                          />
                                          {country.dial_code}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <Box className="divider" />
                                  <Input
                                    value={values.mobileNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="mobileNumber"
                                    className="mobile-input"
                                    placeholder={t("Mobile")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={MobileIcon} alt="" />
                                      </InputAdornment>
                                    }
                                  />
                                </Box>
                                {errors.mobileNumber && touched.mobileNumber && (
                                  <p className="error">{t(errors.mobileNumber)}</p>
                                )}
                              </FormControl>
                              <h4 style={{ marginTop: "18px" }}>{t("Property Details")}</h4>
                              {this.state.propertyList.map((property: any, index: number) => {
                                return (
                                  <Box className="rent-history-box unit-box" key={index}>
                                    <Box className="heading">
                                      <h4>
                                        Building {property.buildingName} Unit {property.unitName}
                                      </h4>
                                      <Box className="box-icons">
                                        <img
                                          src={EditIcon}
                                          alt=""
                                          onClick={() => {
                                            this.setState({ propertyId: index + "", propertyForm: property }, () => {
                                              this.handleOpenAddPropertyModal();
                                            });
                                          }}
                                        />
                                        <img
                                          src={DeleteIcon}
                                          alt=""
                                          onClick={() => {
                                            const newPropertyList = this.state.propertyList.filter(
                                              (property: any, id: number) => id !== index
                                            );
                                            this.setState({ propertyList: newPropertyList }, () => {
                                              sessionStorage.setItem(
                                                "propertyList",
                                                JSON.stringify(this.state.propertyList)
                                              );
                                            });
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                    <Box className="unit-info">
                                      <span>{t("Contract")}</span>
                                      <p>
                                        {moment(property.startDate, "YYYY-MM-DD").format("MMMM DD, YYYY")} -{" "}
                                        {moment(property.endDate, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                      </p>
                                    </Box>
                                    <Box className="unit-info">
                                      <span>{t("Charges")}</span>
                                      <p>{property.rent} / Month</p>
                                    </Box>
                                  </Box>
                                );
                              })}
                              <Button
                                className="add-rent-history-btn"
                                onClick={() => this.handleOpenAddPropertyModal()}
                              >
                                {t("+ Add Another Property")}
                              </Button>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.idType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="idType"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Manager ID Type")}
                                    </MenuItem>
                                    {this.state.idTypeList.map((idType: any) => {
                                      return (
                                        <MenuItem value={idType.id} key={idType.id}>
                                          {idType.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={IDTypeIcon} alt="" />
                                </Box>
                                {errors.idType && touched.idType && <p className="error">{t(errors.idType)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.idNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="idNumber"
                                  className="select-input input"
                                  placeholder={t("Manager ID Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IDNumberIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.idNumber && touched.idNumber && <p className="error">{t(errors.idNumber)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.idDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="idDate"
                                  className="select-input input"
                                  placeholder={t("ID Expectation Date")}
                                  onFocus={(e: any) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IDDateIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.idDate && touched.idDate && <p className="error">{t(errors.idDate)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="upload-box" onClick={() => this.uploadIDCard.click()}>
                                  <img src={UploadIcon} alt="" />
                                  <p>{t("Upload Manager ID copy")}</p>
                                </Box>
                                <input
                                  onChange={(e: any) => setFieldValue("idCardFile", e.target.files[0])}
                                  onBlur={handleBlur}
                                  name="idCardFile"
                                  style={{ display: "none" }}
                                  ref={(ref: any) => (this.uploadIDCard = ref)}
                                  accept=".pdf"
                                  type="file"
                                />
                                {values.idCardFile && (
                                  <Box className="pdf-box">
                                    <img src={PdfIcon} alt="" />
                                    <Box className="pdf-info">
                                      <h4>{values.idCardFile.name}</h4>
                                      <CloseIcon onClick={() => setFieldValue("idCardFile", null)} />
                                    </Box>
                                  </Box>
                                )}
                                {errors.idCardFile && touched.idCardFile && (
                                  <p className="error">{t(errors.idCardFile)}</p>
                                )}
                              </FormControl>

                              <div className="next-button">
                                <Button disabled={this.state.propertyList.length === 0} type="submit">
                                  {t("Submit")}
                                </Button>
                              </div>
                            </Box>
                          </Form>
                        );
                      }}
                    </Formik>
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
          open={this.state.isAddPropertyModalOpen}
          onClose={() => this.handleCloseAddPropertyModal()}
        >
          <Formik
            enableReinitialize
            initialValues={this.state.propertyForm}
            validationSchema={this.registerPropertyFormSchema}
            onSubmit={(values, { resetForm }) => {
              if (this.state.propertyId) {
                let newList = this.state.propertyList;
                newList[Number(this.state.propertyId)] = values;
                this.setState({ propertyList: newList }, () => {
                  this.handleCloseAddPropertyModal();
                  sessionStorage.setItem("propertyList", JSON.stringify(this.state.propertyList));
                });
              } else {
                const newUnitList = this.state.unitList.filter((unit: any) => unit.id !== values.unitId);
                this.setState({ propertyList: [...this.state.propertyList, values], unitList: newUnitList }, () => {
                  this.handleCloseAddPropertyModal();
                  sessionStorage.setItem("propertyList", JSON.stringify(this.state.propertyList));
                });
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} translate="yes">
                  <Box>
                    {this.state.propertyId ? <h4>{t("Edit Property")}</h4> : <h4>{t("Add Another Property")}</h4>}
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
                    {this.state.propertyId ? (
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
                    ) : (
                      <FormControl fullWidth>
                        <Box className="select-box">
                          <Select
                            displayEmpty
                            value={values.buildingId}
                            onChange={(e: any) => {
                              const value = e.target.value;
                              setFieldValue("buildingId", value);
                              this.getUnitList(value);
                            }}
                            onBlur={handleBlur}
                            name="buildingId"
                            className="select-input"
                            input={<OutlinedInput />}
                          >
                            <MenuItem value="" disabled>
                              {t("Building Name")}
                            </MenuItem>
                            {this.state.buildingList.map((building: any) => {
                              return (
                                <MenuItem
                                  value={building.id}
                                  key={building.id}
                                  onClick={() => setFieldValue("buildingName", building.name)}
                                >
                                  {building.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <img src={BuildingIcon} alt="" />
                        </Box>
                        {errors.buildingId && touched.buildingId && <p className="error">{t(errors.buildingId)}</p>}
                      </FormControl>
                    )}
                    {this.state.propertyId ? (
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
                    ) : (
                      <FormControl fullWidth>
                        <Box className="select-box">
                          <Select
                            displayEmpty
                            value={values.unitId}
                            onChange={(e: any) => {
                              const value = e.target.value;
                              setFieldValue("unitId", value);
                              this.checkPropertyManagerAvailable(value);
                            }}
                            onBlur={handleBlur}
                            name="unitId"
                            className="select-input"
                            input={<OutlinedInput />}
                          >
                            <MenuItem value="" disabled>
                              {t("Unit Number")}
                            </MenuItem>
                            {this.state.unitList.map((unit: any) => {
                              return (
                                <MenuItem
                                  value={unit.id}
                                  key={unit.id}
                                  onClick={() => setFieldValue("unitName", unit.apartment_name)}
                                >
                                  {unit.apartment_name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <img src={UnitIcon} alt="" />
                        </Box>
                        {errors.unitId && touched.unitId && <p className="error">{t(errors.unitId)}</p>}
                      </FormControl>
                    )}
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
                    {this.state.propertyId ? (
                      <Button className="add-button" type="submit">
                        {t("Edit")}
                      </Button>
                    ) : (
                      <Button className="add-button" type="submit">
                        {t("Add")}
                      </Button>
                    )}
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(RegisterPropertyManager));
// Customizable Area End
