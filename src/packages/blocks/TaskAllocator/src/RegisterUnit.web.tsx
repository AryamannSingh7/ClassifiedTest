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
  ListItemIcon,
  OutlinedInput,
  InputAdornment,
  Input,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Drawer,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingImage,
  EarthIcon,
  CubeIcon,
  CalenderIcon,
  RentAmountIcon,
  BuildingIcon,
  RegionIcon,
  CityIcon,
  ComplexIcon,
  FloorIcon,
  SizeIcon,
  ConfigIcon,
  PriceIcon,
  ValuationIcon,
  DeleteRentIcon,
  RentAmountHistoryIcon,
  ReceivedIcon,
  TenantIcon,
} from "./assets";
import RegisterUnitController, { Props } from "./RegisterUnitController.web";
import moment from "moment";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { MyUnitStyle } from "./MyUnitStyle.web";
import Loader from "../../../components/src/Loader.web";

class RegisterMyUnit extends RegisterUnitController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh" }} className={classes.registerUnit}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
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
                              <h4 style={{ marginTop: "18px" }}>{t("Location Details")}</h4>
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
                                  <img src={EarthIcon} alt="" />
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
                                    name="region"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Region")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={RegionIcon} alt="" />
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
                                    name="city"
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
                              <Box className="map-span">
                                <span>{t("See building on map")}</span>
                              </Box>
                              <h4 style={{ marginTop: "18px" }}>{t("Unit Details")}</h4>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="complex"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Complex Name")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={ComplexIcon} alt="" />
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
                                    onChange={(e: any) => {
                                      // const value = e.target.value;
                                      // setFieldValue("buildingId", value);
                                      // this.getUnits(value);
                                    }}
                                    onBlur={handleBlur}
                                    name="buildingId"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Building Name")}
                                    </MenuItem>
                                    {/* {this.state.buildingList.map((building: any) => {
                                      return (
                                        <MenuItem
                                          value={building.id}
                                          key={building.id}
                                          onClick={() => setFieldValue("buildingName", building.name)}
                                        >
                                          {building.name}
                                        </MenuItem>
                                      );
                                    })} */}
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
                                    onChange={(e: any) => {
                                      // const value = e.target.value;
                                      // setFieldValue("unitId", value);
                                      // this.handleCheckContractExist(value);
                                    }}
                                    onBlur={handleBlur}
                                    name="unitId"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Unit Number")}
                                    </MenuItem>
                                    {/* {this.state.unitList.map((unit: any) => {
                                      return (
                                        <MenuItem
                                          value={unit.id}
                                          key={unit.id}
                                          onClick={() => setFieldValue("unitName", unit.apartment_name)}
                                        >
                                          {unit.apartment_name}
                                        </MenuItem>
                                      );
                                    })} */}
                                  </Select>
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {/* {errors.unitId && touched.unitId && <p className="error">{t(errors.unitId)}</p>} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="floor"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Floor number")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={FloorIcon} alt="" />
                                </Box>
                                {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                              </FormControl>
                              <Grid container spacing={2}>
                                <Grid item xs={7}>
                                  <FormControl fullWidth>
                                    <Input
                                      value=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="size"
                                      className="select-input input"
                                      placeholder={t("Size")}
                                      startAdornment={
                                        <InputAdornment position="start">
                                          <img src={SizeIcon} alt="" />
                                        </InputAdornment>
                                      }
                                    />
                                    {/* {errors.tenantName && touched.tenantName && (
                                      <p className="error">{t(errors.tenantName)}</p>
                                    )} */}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                  <FormControl fullWidth>
                                    <Select
                                      displayEmpty
                                      value=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="parameter"
                                      className="select-input"
                                      input={<OutlinedInput />}
                                    >
                                      <MenuItem value="" disabled>
                                        {t("Sq m")}
                                      </MenuItem>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="configuration"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Configuration")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={ConfigIcon} alt="" />
                                </Box>
                                {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                              </FormControl>
                              <Grid container spacing={2}>
                                <Grid item xs={7}>
                                  <FormControl fullWidth>
                                    <Input
                                      value=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="size"
                                      className="select-input input"
                                      placeholder={t("Purchase Price")}
                                      startAdornment={
                                        <InputAdornment position="start">
                                          <img src={PriceIcon} alt="" />
                                        </InputAdornment>
                                      }
                                    />
                                    {/* {errors.tenantName && touched.tenantName && (
                                      <p className="error">{t(errors.tenantName)}</p>
                                    )} */}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                  <FormControl fullWidth>
                                    <Input
                                      value=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="date"
                                      className="select-input input"
                                      placeholder={t("Date")}
                                      type="text"
                                      onFocus={(e: any) => (e.target.type = "date")}
                                      startAdornment={
                                        <InputAdornment position="start">
                                          <img src={CalenderIcon} alt="" />
                                        </InputAdornment>
                                      }
                                    />
                                    {/* {errors.startDate && touched.startDate && (
                                      <p className="error">{t(errors.startDate)}</p>
                                    )} */}
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <h4 style={{ marginTop: "18px" }}>{t("Unit Type")}</h4>
                              <FormControl fullWidth>
                                <RadioGroup
                                  name="type"
                                  value="true"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="type-radio-select"
                                >
                                  <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label={t("Rented")}
                                    className="rented"
                                  />
                                  <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label={t("Non-Rented")}
                                    className="non-rented"
                                  />
                                </RadioGroup>
                              </FormControl>
                              <h4 style={{ marginTop: "18px" }}>{t("Rent History")}</h4>
                              <Box className="rent-history-box">
                                <Box className="heading">
                                  <h4>May 2022 to June 0202</h4>
                                  <img src={DeleteRentIcon} alt="" />
                                </Box>
                                <p className="tenant-name">Tenant Name</p>
                                <Divider />
                                <Box className="info">
                                  <p>{t("Rent Amount")}</p>
                                  <span>$123</span>
                                </Box>
                                <Box className="info">
                                  <p>{t("Received Amount")}</p>
                                  <span>$123</span>
                                </Box>
                              </Box>
                              <Box className="rent-history-box">
                                <Box className="heading">
                                  <h4>May 2022 to June 0202</h4>
                                  <img src={DeleteRentIcon} alt="" />
                                </Box>
                                <p className="tenant-name">Tenant Name</p>
                                <Divider />
                                <Box className="info">
                                  <p>{t("Rent Amount")}</p>
                                  <span>$123</span>
                                </Box>
                                <Box className="info">
                                  <p>{t("Received Amount")}</p>
                                  <span>$123</span>
                                </Box>
                              </Box>
                              <Button className="add-rent-history-btn" onClick={() => this.handleRentHistoryModal()}>
                                {t("+ Add Rent History")}
                              </Button>
                              <FormControl fullWidth>
                                <Input
                                  value=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="monthlyIncome"
                                  className="select-input input"
                                  placeholder={t("Monthly Renting Income")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={RentAmountIcon} alt="" />
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
                                  placeholder={t("Current Valuation")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ValuationIcon} alt="" />
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
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Drawer
          anchor="bottom"
          className="condition-modal penalty-dialog rent-history-dialog"
          open={this.state.isRentHistoryModalOpen}
          onClose={() => this.handleRentHistoryModal()}
        >
          <Formik
            enableReinitialize
            initialValues={this.state.rentHistoryForm}
            validationSchema={this.validationRentHistoryFormSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              // resetForm();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate="true">
                  <Box>
                    <h4>{t("Rent History")}</h4>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <Input
                            value={values.startDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="startDate"
                            className="select-input input"
                            placeholder={t("Start Date")}
                            type="text"
                            onFocus={(e: any) => (e.target.type = "date")}
                            startAdornment={
                              <InputAdornment position="start">
                                <img src={CalenderIcon} alt="" />
                              </InputAdornment>
                            }
                          />
                          {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <Box className="custom-input-box">
                            <input
                              value={values.endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="endDate"
                              className="select-input input"
                              placeholder={t("End Date")}
                              type="text"
                              onFocus={(e: any) => (e.target.type = "date")}
                              min={values.startDate}
                            />
                            <img src={CalenderIcon} alt="" />
                          </Box>
                          {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Input
                        value={values.rentAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rentAmount"
                        className="select-input input"
                        placeholder={t("Rent Amount")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={RentAmountHistoryIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.rentAmount && touched.rentAmount && <p className="error">{t(errors.rentAmount)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.receivedAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="receivedAmount"
                        className="select-input input"
                        placeholder={t("Received Amount")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={ReceivedIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.receivedAmount && touched.receivedAmount && (
                        <p className="error">{t(errors.receivedAmount)}</p>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.tenantName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="tenantName"
                        className="select-input input"
                        placeholder={t("Tenant Name")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={TenantIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.tenantName && touched.tenantName && <p className="error">{t(errors.tenantName)}</p>}
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

export default withTranslation()(withStyles(MyUnitStyle)(RegisterMyUnit));
// Customizable Area End
