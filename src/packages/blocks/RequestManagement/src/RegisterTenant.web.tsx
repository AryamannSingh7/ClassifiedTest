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
  Divider,
  Link,
} from "@material-ui/core";
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
import moment from "moment";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class RegisterTenant extends RegisterTenantController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getBuildingList();
    this.getIdTypeList();
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        {this.state.isRegisterTenantOpen ? (
          <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <Box>
                  <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                    <div className="left-icon">
                      <Link href="/Tenants">
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
                        enableReinitialize={true}
                        initialValues={this.state.registerTenantForm}
                        validationSchema={this.validationRegisterTenantFormSchema}
                        onSubmit={(values, { resetForm }) => {
                          this.setState(
                            {
                              registerTenantForm: {
                                tenantType: values.tenantType,
                                tenantName: values.tenantName,
                                tenantCountryCode: values.tenantCountryCode,
                                tenantMobile: values.tenantMobile,
                                tenantEmail: values.tenantEmail,
                                building: values.building,
                                unit: values.unit,
                                idType: values.idType,
                                idNumber: values.idNumber,
                                idDate: values.idDate,
                                idCard: values.idCard,
                                otherDocument: values.otherDocument,
                              },
                            },
                            () => {
                              this.handleChangePage();
                            }
                          );
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
                                    onChange={(e: any) => {
                                      setFieldValue("tenantEmail", e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    name="tenantEmail"
                                    className="select-input input"
                                    placeholder={t("Tenant Email ID")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={GreyEmailIcon} alt="" />
                                      </InputAdornment>
                                    }
                                  />
                                  {errors.tenantEmail && touched.tenantEmail && (
                                    <p className="error">{t(errors.tenantEmail)}</p>
                                  )}
                                </FormControl>
                                <FormControl fullWidth>
                                  <Box className="select-box">
                                    <Select
                                      displayEmpty
                                      value={values.building}
                                      onChange={(e: any) => {
                                        setFieldValue("building", e.target.value);
                                        this.getUnitList(e.target.value);
                                      }}
                                      onBlur={handleBlur}
                                      name="building"
                                      fullWidth
                                      className="select-input"
                                      input={<OutlinedInput />}
                                    >
                                      <MenuItem value="" disabled>
                                        {t("Select Building")}
                                      </MenuItem>
                                      {this.state.buildingList.map((building: any) => {
                                        return (
                                          <MenuItem value={building.id} key={building.id}>
                                            {building.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                    <img src={GreyBuildingName} alt="" />
                                  </Box>
                                  {errors.building && touched.building && <p className="error">{t(errors.building)}</p>}
                                </FormControl>
                                <FormControl fullWidth>
                                  <Box className="select-box">
                                    <Select
                                      displayEmpty
                                      value={values.unit}
                                      onChange={(e: any) => {
                                        setFieldValue("unit", e.target.value);
                                        this.handleCheckTenantExist(e.target.value);
                                      }}
                                      onBlur={handleBlur}
                                      name="unit"
                                      fullWidth
                                      className="select-input"
                                      input={<OutlinedInput />}
                                    >
                                      <MenuItem value="" disabled>
                                        {t("Select Unit")}
                                      </MenuItem>
                                      {this.state.unitList.map((unit: any) => {
                                        return (
                                          <MenuItem value={unit.id} key={unit.id}>
                                            {unit.apartment_name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                    <img src={GreyUnitNumber} alt="" />
                                  </Box>
                                  {errors.unit && touched.unit && <p className="error">{t(errors.unit)}</p>}
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
                                  {/* <Link to=""> */}
                                  <Button type="submit">{t("Next")}</Button>
                                  {/* </Link> */}
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
        ) : (
          <Box
            style={{
              background: this.state.contract ? "#F4F7FF" : "white",
              height: "100vh",
            }}
            className={classes.selectTemplate}
          >
            <Grid container>
              <Grid item xs={12} md={7}>
                <Box>
                  <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                    <div className="left-icon">
                      <IconButton
                        onClick={() => {
                          if (this.state.contract) {
                            this.setState({ contract: null });
                          } else {
                            this.handleChangePage();
                          }
                        }}
                      >
                        <KeyboardBackspaceIcon />
                      </IconButton>
                      <span>{t("Register A Tenant")}</span>
                    </div>
                  </Box>

                  {this.state.contract ? (
                    <Box className="pdf-submit">
                      <Container>
                        <Box className="pdf-preview">
                          <Box className="pdf-box">
                            <img src={PdfIcon} alt="" />
                            <Box className="pdf-info">
                              <Box className="heading">
                                <h4>{this.state.contract.name}</h4>
                                <div className="right-menu">
                                  <Menu
                                    menuButton={
                                      <IconButton>
                                        <MoreVertIcon />
                                      </IconButton>
                                    }
                                  >
                                    <MenuItem onClick={() => this.setState({ contract: null })}>{t("Delete")}</MenuItem>
                                  </Menu>
                                </div>
                              </Box>
                              <Box className="data">
                                <span>{this.state.contractPageCount}</span> pages{" "}
                                <span>{this.niceBytes(this.state.contract.size)}</span>{" "}
                                {moment(this.state.contract.astModifiedDate).format("MMMM DD, YYYY")}
                              </Box>
                            </Box>
                          </Box>
                          <Box className="submit-button-box">
                            <Button onClick={() => this.handleSubmitTenantForContract(this.state.registerTenantForm)}>
                              {t("Submit")}
                            </Button>
                          </Box>
                        </Box>
                      </Container>
                    </Box>
                  ) : (
                    <Container className="page-container">
                      <Box className="issue-lease-content">
                        <Box className="select-input-box">
                          <FormControl fullWidth>
                            <Box className="upload-box" onClick={() => this.uploadContract.click()}>
                              <img src={UploadIcon} alt="" />
                              <p>{t("Upload Rent Contract")}</p>
                            </Box>
                            <input
                              onChange={(e: any) => {
                                const file = e.target.files[0];

                                let reader: any = new FileReader();
                                reader.onloadend = () => {
                                  const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                                  this.setState({ contract: file, contractPageCount: count });
                                };
                                reader.readAsBinaryString(file);
                              }}
                              ref={(ref: any) => (this.uploadContract = ref)}
                              accept=".pdf"
                              type="file"
                              style={{ display: "none" }}
                              multiple
                            />
                          </FormControl>

                          <Box className="divider-box">
                            <Divider />
                            <span>{t("OR")}</span>
                            <Divider />
                          </Box>

                          <Box className="register-button-box">
                            <Button
                              className="now"
                              onClick={() => this.handleSubmitRegisterTenant(this.state.registerTenantForm, true)}
                            >
                              {t("Issue A Lease Now")}
                            </Button>
                            <Button
                              className="later"
                              onClick={() => this.handleSubmitRegisterTenant(this.state.registerTenantForm, false)}
                            >
                              {t("Issue A Lease Later")}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Container>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                  <img src={BuildingImage.default} className="building-logo" alt="" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </>
    );
  }
}

export default withTranslation()(withStyles(TenantStyle)(RegisterTenant));
