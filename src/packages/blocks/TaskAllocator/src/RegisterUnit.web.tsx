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
  Link,
} from "@material-ui/core";
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

  async componentDidMount(): Promise<void> {
    this.getBuildingList();
    this.getComplexDetails();
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.registerUnit}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/MyUnitList">
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
                      initialValues={this.state.unitRegisterForm}
                      validationSchema={this.validationRegisterUnitFormSchema}
                      onSubmit={(values, { resetForm }) => {
                        this.setState({ loading: true }, () => {
                          this.registerUnitToOwner(values);
                          resetForm();
                        });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <h4 style={{ marginTop: "18px" }}>{t("Location Details")}</h4>
                              <FormControl fullWidth>
                                <Input
                                  value={values.country}
                                  name="country"
                                  className="select-input input"
                                  placeholder={t("Country")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={EarthIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.region}
                                  name="region"
                                  className="select-input input"
                                  placeholder={t("Region")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={RegionIcon} alt="" />
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
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CityIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <Box className="map-span">
                                <span>{t("See building on map")}</span>
                              </Box>
                              <h4 style={{ marginTop: "18px" }}>{t("Unit Details")}</h4>
                              <FormControl fullWidth>
                                <Input
                                  value={values.complex}
                                  name="complex"
                                  className="select-input input"
                                  placeholder={t("Complex Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ComplexIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.buildingId}
                                    onChange={(e: any) => {
                                      const value = e.target.value;
                                      setFieldValue("buildingId", value);
                                      this.getFloorList(value);
                                      this.getUnitList(value);
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
                                    {this.state.buildingList.map((building: any) => {
                                      return (
                                        <MenuItem value={building.id} key={building.id}>
                                          {building.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={BuildingIcon} alt="" />
                                </Box>
                                {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.floorId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="floorId"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Floor number")}
                                    </MenuItem>
                                    {this.state.floorList.map((floor: any) => {
                                      return (
                                        <MenuItem value={floor} key={floor}>
                                          {floor}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={FloorIcon} alt="" />
                                </Box>
                                {errors.floorId && touched.floorId && <p className="error">{t(errors.floorId)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.unitId}
                                    onChange={(e: any) => {
                                      const value = e.target.value;
                                      setFieldValue("unitId", value);
                                      this.getRentHistory(value);
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
                                    {this.state.unitList.map((unit: any) => {
                                      return (
                                        <MenuItem value={unit.id} key={unit.id}>
                                          {unit.apartment_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {errors.unitId && touched.unitId && <p className="error">{t(errors.unitId)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.size}
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
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.config}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="config"
                                  className="select-input input"
                                  placeholder={t("Configuration")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ConfigIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                              <Grid container spacing={2}>
                                <Grid item xs={7}>
                                  <FormControl fullWidth>
                                    <Input
                                      value={values.price}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="price"
                                      className="select-input input"
                                      placeholder={t("Purchase Price")}
                                      startAdornment={
                                        <InputAdornment position="start">
                                          <img src={PriceIcon} alt="" />
                                        </InputAdornment>
                                      }
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                  <FormControl fullWidth>
                                    <Input
                                      value={values.date}
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
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <h4 style={{ marginTop: "18px" }}>{t("Unit Type")}</h4>
                              <FormControl fullWidth>
                                <RadioGroup
                                  name="type"
                                  value={values.type}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="type-radio-select"
                                >
                                  <FormControlLabel
                                    value="Rented"
                                    control={<Radio />}
                                    label={t("Rented")}
                                    className="rented"
                                  />
                                  <FormControlLabel
                                    value="Non-Rented"
                                    control={<Radio />}
                                    label={t("Non-Rented")}
                                    className="non-rented"
                                  />
                                </RadioGroup>
                              </FormControl>
                              {values.type === "Rented" && (
                                <>
                                  <h4 style={{ marginTop: "18px" }}>{t("Rent History")}</h4>
                                  {this.state.rentHistoryList.map((rentHistory: any) => {
                                    return (
                                      <Box className="rent-history-box" key={rentHistory.id}>
                                        <Box className="heading">
                                          <h4>
                                            {moment(rentHistory.attributes.start_date, "YYYY-MM-DD").format(
                                              "MMMM YYYY"
                                            )}{" "}
                                            to{" "}
                                            {moment(rentHistory.attributes.end_date, "YYYY-MM-DD").format("MMMM YYYY")}
                                          </h4>
                                          <img
                                            onClick={() => {
                                              this.setState({ loading: true, unitId: values.unitId }, () => {
                                                this.deleteRentHistories(rentHistory.id);
                                              });
                                            }}
                                            src={DeleteRentIcon}
                                            alt="delete"
                                          />
                                        </Box>
                                        <p className="tenant-name">{rentHistory.attributes.tenant_name}</p>
                                        <Divider />
                                        <Box className="info">
                                          <p>{t("Rent Amount")}</p>
                                          <span>{rentHistory.attributes.rent_amount}</span>
                                        </Box>
                                        <Box className="info">
                                          <p>{t("Received Amount")}</p>
                                          <span>{rentHistory.attributes.received_amount}</span>
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                  <Button
                                    className="add-rent-history-btn"
                                    onClick={() => this.handleOpenRentHistoryModal(values.unitId)}
                                    disabled={!values.unitId}
                                  >
                                    {t("+ Add Rent History")}
                                  </Button>
                                  <FormControl fullWidth>
                                    <Input
                                      value={values.income}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="income"
                                      className="select-input input"
                                      placeholder={t("Monthly Renting Income")}
                                      startAdornment={
                                        <InputAdornment position="start">
                                          <img src={RentAmountIcon} alt="" />
                                        </InputAdornment>
                                      }
                                    />
                                    {errors.income && touched.income && <p className="error">{t(errors.income)}</p>}
                                  </FormControl>
                                </>
                              )}
                              <FormControl fullWidth>
                                <Input
                                  value={values.valuation}
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
                                {errors.valuation && touched.valuation && (
                                  <p className="error">{t(errors.valuation)}</p>
                                )}
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
          onClose={() => this.handleCloseRentHistoryModal()}
        >
          <Formik
            enableReinitialize
            initialValues={this.state.rentHistoryForm}
            validationSchema={this.validationRentHistoryFormSchema}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: true }, () => {
                this.handleCloseRentHistoryModal();
                this.addRentHistory(values);
                resetForm();
              });
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
                          <Box className="custom-input-box">
                            <input
                              value={values.startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="startDate"
                              className="select-input input"
                              placeholder={t("Start Date")}
                              type="text"
                              onFocus={(e: any) => (e.target.type = "date")}
                              max={moment().format("YYYY-MM-DD")}
                            />
                            <img src={CalenderIcon} alt="" />
                          </Box>
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
                              max={moment().format("YYYY-MM-DD")}
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
