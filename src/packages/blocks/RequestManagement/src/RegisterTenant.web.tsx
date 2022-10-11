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
  ListItemIcon,
  OutlinedInput,
  InputAdornment,
  Input,
  FormControl,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingImage,
  GreyTenantType,
  GreyTenantName,
  GreyEmailIcon,
  GreyBuildingName,
  GreyUnitNumber,
  GreyIdType,
  GreyIdNumber,
  GreyCalenderIcon,
  UploadIcon,
  GreyPhoneNumber,
} from "./assets";
import { Formik, Form } from "formik";
import RegisterTenantController, { Props } from "./RegisterTenantController.web";
import { withTranslation } from "react-i18next";
import { TenantStyle } from "./TenantStyle.web";
import { CountryList } from "./countryList";

class RegisterTenant extends RegisterTenantController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link to="/Tenants">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Register A Tenant")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <Formik
                      initialValues={{}}
                      // validationSchema={}
                      onSubmit={(values, { resetForm }) => {
                        console.log(values);
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate>
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Type of Tenant")}
                                    </MenuItem>
                                    <MenuItem value={10}>{t("Individual Person")}</MenuItem>
                                    <MenuItem value={20}>{t("Company")}</MenuItem>
                                  </Select>
                                  <img src={GreyTenantType} alt="" />
                                </Box>
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="mobile-box">
                                  <Select
                                    displayEmpty
                                    value="+91"
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
                                    // value={values.tenantName}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // name="tenantName"
                                    className="mobile-input"
                                    placeholder={t("Tenant Mobile")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={GreyPhoneNumber} alt="" />
                                      </InputAdornment>
                                    }
                                  />
                                </Box>
                                {/* {errors.tenantName && touched.tenantName && (
                                  <p className="error">{errors.tenantName}</p>
                                )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  className="select-input input"
                                  placeholder={t("Tenant Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyTenantName} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  className="select-input input"
                                  placeholder={t("Tenant Email ID")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyEmailIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {/* <ListItemIcon>
                                        <img src={GreyBuildingName} alt="" />{" "}
                                      </ListItemIcon> */}
                                      {t("Select Building")}
                                    </MenuItem>
                                    <MenuItem value={10}>{t("Individual Person")}</MenuItem>
                                    <MenuItem value={20}>{t("Company")}</MenuItem>
                                  </Select>
                                  <img src={GreyBuildingName} alt="" />
                                </Box>
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {/* <ListItemIcon>
                                        <img src={GreyUnitNumber} alt="" />{" "}
                                      </ListItemIcon> */}
                                      {t("Select Unit")}
                                    </MenuItem>
                                    <MenuItem value={10}>{t("Individual Person")}</MenuItem>
                                    <MenuItem value={20}>{t("Company")}</MenuItem>
                                  </Select>
                                  <img src={GreyUnitNumber} alt="" />
                                </Box>
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {/* <ListItemIcon>
                                        <img src={GreyIdType} alt="" />{" "}
                                      </ListItemIcon> */}
                                      {t("ID Type")}
                                    </MenuItem>
                                    <MenuItem value={10}>{t("Individual Person")}</MenuItem>
                                    <MenuItem value={20}>{t("Company")}</MenuItem>
                                  </Select>
                                  <img src={GreyIdType} alt="" />
                                </Box>
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  className="select-input input"
                                  placeholder={t("ID Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyIdNumber} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  className="select-input input"
                                  placeholder={t("ID Expectation Date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyCalenderIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="upload-box">
                                  <img src={UploadIcon} alt="" />
                                  <p>{t("Upload Tenant ID Card Copy")}</p>
                                </Box>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  style={{ display: "none" }}
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="upload-box">
                                  <img src={UploadIcon} alt="" />
                                  <p>{t("Upload Other Tenant Documents")}</p>
                                </Box>
                                <Input
                                  // value={values.tenantName}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  // name="tenantName"
                                  style={{ display: "none" }}
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                    <p className="error">{errors.tenantName}</p>
                                  )} */}
                              </FormControl>

                              <div className="next-button">
                                <Link to="">
                                  <Button>{t("Next")}</Button>
                                </Link>
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
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(TenantStyle)(RegisterTenant));
