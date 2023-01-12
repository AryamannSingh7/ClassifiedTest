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
  PdfIcon,
} from "./assets";
import { Formik, Form } from "formik";
import RegisterTenantController, { Props } from "./RegisterTenantController.web";
import { withTranslation } from "react-i18next";
import { TenantStyle } from "./TenantStyle.web";
import { CountryList } from "./countryList";
import CloseIcon from "@material-ui/icons/Close";
import Loader from "../../../components/src/Loader.web";

class EditTenant extends RegisterTenantController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const tenant_id = this.props.navigation.getParam("id");
    this.setState({ tenantId: tenant_id }, () => {
      this.getTenantDetailsForEdit();
      this.getIdTypeList();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link to={`/Tenant/${this.state.tenantId}`}>
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Edit A Tenant")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <Formik
                      enableReinitialize
                      initialValues={this.state.registerTenantForm}
                      validationSchema={this.validationRegisterTenantFormSchema}
                      onSubmit={(values, { resetForm }) => {
                        this.handleEditTenant(values);
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.tenantType}
                                    onChange={(e: any) => {
                                      setFieldValue("tenantType", e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    name="tenantType"
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Type of Tenant")}
                                    </MenuItem>
                                    <MenuItem value="Individual">{t("Individual Person")}</MenuItem>
                                    <MenuItem value="Company" disabled>
                                      {t("Company")}
                                    </MenuItem>
                                  </Select>
                                  <img src={GreyTenantType} alt="" />
                                </Box>
                                {errors.tenantType && touched.tenantType && (
                                  <p className="error">{t(errors.tenantType)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.tenantName}
                                  onChange={(e: any) => {
                                    setFieldValue("tenantName", e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  className="select-input input"
                                  placeholder={t("Tenant Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyTenantName} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.tenantName && touched.tenantName && (
                                  <p className="error">{t(errors.tenantName)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="mobile-box">
                                  <Select
                                    displayEmpty
                                    value={values.tenantCountryCode}
                                    onChange={(e: any) => {
                                      setFieldValue("tenantCountryCode", e.target.value);
                                    }}
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
                                    value={values.tenantMobile}
                                    onChange={(e: any) => {
                                      setFieldValue("tenantMobile", e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    name="tenantMobile"
                                    className="mobile-input"
                                    placeholder={t("Tenant Mobile")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={GreyPhoneNumber} alt="" />
                                      </InputAdornment>
                                    }
                                  />
                                </Box>
                                {errors.tenantMobile && touched.tenantMobile && (
                                  <p className="error">{t(errors.tenantMobile)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.tenantEmail}
                                  name="tenantEmail"
                                  className="select-input input"
                                  placeholder={t("Tenant Email ID")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyEmailIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.tenantEmail && touched.tenantEmail && (
                                  <p className="error">{t(errors.tenantEmail)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.building}
                                  name="building"
                                  className="select-input input"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyBuildingName} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.unit}
                                  name="unit"
                                  className="select-input input"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyUnitNumber} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.idType}
                                    onChange={(e: any) => {
                                      setFieldValue("idType", e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    name="idType"
                                    fullWidth
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("ID Type")}
                                    </MenuItem>
                                    {this.state.idTypeList.map((idType: any) => {
                                      return (
                                        <MenuItem value={idType.id} key={idType.id}>
                                          {idType.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={GreyIdType} alt="" />
                                </Box>
                                {errors.idType && touched.idType && <p className="error">{t(errors.idType)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.idNumber}
                                  onChange={(e: any) => {
                                    setFieldValue("idNumber", e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  name="idNumber"
                                  className="select-input input"
                                  placeholder={t("ID Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyIdNumber} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.idNumber && touched.idNumber && <p className="error">{t(errors.idNumber)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.idDate}
                                  onChange={(e: any) => {
                                    setFieldValue("idDate", e.target.value);
                                  }}
                                  onBlur={handleBlur}
                                  name="idDate"
                                  onFocus={(e: any) => (e.target.type = "date")}
                                  className="select-input input"
                                  placeholder={t("ID Expectation Date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={GreyCalenderIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.idDate && touched.idDate && <p className="error">{t(errors.idDate)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="upload-box" onClick={() => this.uploadIDCard.click()}>
                                  <img src={UploadIcon} alt="" />
                                  <p>{t("Upload Tenant ID Card Copy")}</p>
                                </Box>
                                <input
                                  onChange={(e: any) => {
                                    setFieldValue("idCard", e.target.files);
                                  }}
                                  onBlur={handleBlur}
                                  name="idCard"
                                  style={{ display: "none" }}
                                  ref={(ref: any) => (this.uploadIDCard = ref)}
                                  accept=".pdf"
                                  type="file"
                                />
                                {[...values.idCard].map((file: any) => {
                                  return (
                                    <Box className="pdf-box">
                                      <img src={PdfIcon} alt="" />
                                      <Box className="pdf-info">
                                        <h4>{file.name}</h4>
                                        <CloseIcon
                                          onClick={() => {
                                            setFieldValue("idCard", []);
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  );
                                })}
                                {errors.idCard && touched.idCard && <p className="error">{t(errors.idCard)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="upload-box" onClick={() => this.uploadOtherDocument.click()}>
                                  <img src={UploadIcon} alt="" />
                                  <p>{t("Upload Other Tenant Documents")}</p>
                                </Box>
                                <input
                                  onChange={(e: any) => {
                                    const document: any = [...values.otherDocument, ...e.target.files];
                                    setFieldValue("otherDocument", document);
                                  }}
                                  onBlur={handleBlur}
                                  name="otherDocument"
                                  ref={(ref: any) => (this.uploadOtherDocument = ref)}
                                  accept=".pdf"
                                  type="file"
                                  style={{ display: "none" }}
                                  multiple
                                />
                                {[...values.otherDocument].map((file: any, index: number) => {
                                  return (
                                    <Box className="pdf-box">
                                      <img src={PdfIcon} alt="" />
                                      <Box className="pdf-info">
                                        <h4>{file.name}</h4>
                                        <CloseIcon
                                          onClick={() => {
                                            const remainFile = [...values.otherDocument].filter(
                                              (file: any, idx: number) => idx !== index
                                            );
                                            setFieldValue("otherDocument", remainFile);
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  );
                                })}
                                {errors.otherDocument && touched.otherDocument && (
                                  <p className="error">{t(errors.otherDocument)}</p>
                                )}
                              </FormControl>

                              <div className="next-button submit-button">
                                <Button type="submit">{t("Save")}</Button>
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

export default withTranslation()(withStyles(TenantStyle)(EditTenant));
