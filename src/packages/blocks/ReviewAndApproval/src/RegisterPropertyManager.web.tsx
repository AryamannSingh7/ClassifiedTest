// Customizable Area Start
import React, { useRef } from "react";
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
  UnitIcon,
} from "./assets";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import Loader from "../../../components/src/Loader.web";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import RegisterPropertyManagerController, { Props } from "./RegisterPropertyManagerController.web";
import { CountryList } from "./countryList";

class RegisterPropertyManager extends RegisterPropertyManagerController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

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
                    <span>{t("Add Another Unit")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={{}}
                      validationSchema={{}}
                      onSubmit={(values: any, { resetForm }) => {}}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="size"
                                  className="select-input input"
                                  placeholder={t("Company Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CompanyIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                      <p className="error">{t(errors.tenantName)}</p>
                                    )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="size"
                                  className="select-input input"
                                  placeholder={t("Manager Full Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ManagerIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                      <p className="error">{t(errors.tenantName)}</p>
                                    )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="size"
                                  className="select-input input"
                                  placeholder={t("Email ID (will be your user name)")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={EmailIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                      <p className="error">{t(errors.tenantName)}</p>
                                    )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="mobile-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    // onChange={(e: any) => {
                                    //   setFieldValue("tenantCountryCode", e.target.value);
                                    // }}
                                    onBlur={handleBlur}
                                    name="tenantCountryCode"
                                    fullWidth
                                    className="mobile-select"
                                    input={<OutlinedInput />}
                                  >
                                    {CountryList.map((country: any) => {
                                      return (
                                        <MenuItem key={country.dial_code} value={country.dial_code}>
                                          <img
                                            src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${
                                              country.code
                                            }.svg`}
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
                                    value=""
                                    // onChange={(e: any) => {
                                    //   setFieldValue("tenantMobile", e.target.value);
                                    // }}
                                    onBlur={handleBlur}
                                    name="tenantMobile"
                                    className="mobile-input"
                                    placeholder={t("Mobile")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={MobileIcon} alt="" />
                                      </InputAdornment>
                                    }
                                  />
                                </Box>
                                {errors.tenantMobile && touched.tenantMobile && (
                                  <p className="error">{t(errors.tenantMobile)}</p>
                                )}
                              </FormControl>
                              <h4 style={{ marginTop: "18px" }}>{t("Property Details")}</h4>
                              <Box className="rent-history-box unit-box">
                                <Box className="heading">
                                  <h4>Building 5 Unit 508</h4>
                                  <Box className="box-icons">
                                    <img src={EditIcon} alt="" />
                                    <img src={DeleteIcon} alt="" />
                                  </Box>
                                </Box>
                                <Box className="unit-info">
                                  <span>{t("Contract")}</span>
                                  <p>01 April, 2020 - 31 March, 2025</p>
                                </Box>
                                <Box className="unit-info">
                                  <span>{t("Charges")}</span>
                                  <p>SR 1400/Month</p>
                                </Box>
                              </Box>
                              <Button className="add-rent-history-btn" onClick={() => this.handleAddPropertyModal()}>
                                {t("+ Add Another Property")}
                              </Button>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="country"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Manager ID Type")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={IDTypeIcon} alt="" />
                                </Box>
                                {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="monthlyIncome"
                                  className="select-input input"
                                  placeholder={t("Manager ID Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IDNumberIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />

                                {errors.monthlyRent && touched.monthlyRent && (
                                  <p className="error">{t(errors.monthlyRent)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="valuation"
                                  className="select-input input"
                                  placeholder={t("ID Expectation Date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IDDateIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.monthlyRent && touched.monthlyRent && (
                                  <p className="error">{t(errors.monthlyRent)}</p>
                                )} */}
                              </FormControl>

                              <div className="next-button">
                                <Button type="submit">{t("Submit")}</Button>
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
          onClose={() => this.handleAddPropertyModal()}
        >
          <Formik
            enableReinitialize
            initialValues={{}}
            validationSchema={{}}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              // resetForm();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate="true">
                  <Box>
                    <h4>{t("Add Another Property")}</h4>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Country")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={CountryIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("City")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={CityIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Building Name")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={BuildingIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Unit Number")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={UnitIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
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
                      {/* {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="startDate"
                        className="select-input input"
                        placeholder={t("Contract End Date")}
                        type="text"
                        onFocus={(e: any) => (e.target.type = "date")}
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={IDDateIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {/* {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Select Fee Type")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={FeeTypeIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rentAmount"
                        className="select-input input"
                        placeholder={t("Enter Fixed Percentage of Rent")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={FeeTypeIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {/* {errors.rentAmount && touched.rentAmount && <p className="error">{t(errors.rentAmount)}</p>} */}
                    </FormControl>
                  </Box>
                  <Box className="button-group">
                    <Button className="add-button" type="submit">
                      {t("Add")}
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(RegisterPropertyManager));
// Customizable Area End
