// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
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
import { MyUnitStyle } from "./MyUnitStyle.web";

class EditMyUnit extends RegisterUnitController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const unit_id = this.props.navigation.getParam("id");
    this.setState({ unitId: unit_id }, () => {
      this.getComplexDetails();
      this.getRentHistory(this.state.unitId);
      this.getEditUnitDetails();
    });
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.registerUnit}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton
                      onClick={() => this.props.navigation.navigate("MyUnitDetails", { id: this.state.unitId })}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span className="bold-text">{t("Edit Unit")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.unitRegisterForm}
                      validationSchema={this.validationEditUnitFormSchema}
                      onSubmit={(values: any, { resetForm }) => {
                        this.setState({ loading: true }, () => {
                          this.editRegisterUnit(values);
                          resetForm();
                        });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <h4 className="bold-text" style={{ marginTop: "18px", fontSize: "18px" }}>
                                {t("Location Details")}
                              </h4>
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
                                <Link
                                  href={`https://maps.google.com/?q=${this.state.lat},${this.state.long}`}
                                  target="_blank"
                                >
                                  <span className="bold-text">{t("See building on map")}</span>
                                </Link>
                              </Box>
                              <h4 className="bold-text" style={{ marginTop: "18px", fontSize: "18px" }}>
                                {t("Unit Details")}
                              </h4>
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
                                <Input
                                  value={values.buildingId}
                                  name="buildingId"
                                  className="select-input input"
                                  placeholder={t("Building Name")}
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
                                  value={values.floorId}
                                  name="floorId"
                                  className="select-input input"
                                  placeholder={t("Floor Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={FloorIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.unitId}
                                  name="unitId"
                                  className="select-input input"
                                  placeholder={t("Unit Number")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="unit-box-currency">
                                  <Input
                                    value={values.size}
                                    name="size"
                                    className="select-input input"
                                    placeholder={t("Size")}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        <img src={SizeIcon} alt="" />
                                      </InputAdornment>
                                    }
                                    readOnly
                                  />
                                  <Box className="unit-box-value">{t(values.measurement)}</Box>
                                </Box>
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.config}
                                  name="config"
                                  className="select-input input"
                                  placeholder={t("Configuration")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ConfigIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                              </FormControl>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={7}>
                                  <FormControl fullWidth>
                                    <Box className="unit-box-currency">
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
                                      <Box className="unit-box-value">{t(this.state.currency)}</Box>
                                    </Box>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={5}>
                                  <FormControl fullWidth>
                                    <Input
                                      value={values.date}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="date"
                                      className="select-input input"
                                      placeholder={t("Purchase Date")}
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
                              <h4 className="bold-text" style={{ marginTop: "18px" }}>
                                {t("Unit Status")}
                              </h4>
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
                                    label={t("Vacant")}
                                    className="non-rented"
                                  />
                                </RadioGroup>
                              </FormControl>
                              {values.type === "Rented" && (
                                <>
                                  <h4 className="bold-text" style={{ marginTop: "18px", fontSize: "18px" }}>
                                    {t("Rent History")}
                                  </h4>
                                  {this.state.rentHistoryList.map((rentHistory: any) => {
                                    return (
                                      <Box className="rent-history-box" key={rentHistory.id}>
                                        <Box className="heading">
                                          <h4 className="bold-text">
                                            {moment(rentHistory.attributes.start_date, "YYYY-MM-DD").format("MMM YYYY")}{" "}
                                            to{" "}
                                            {moment(rentHistory.attributes.end_date, "YYYY-MM-DD").format("MMM YYYY")}
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
                                        <Box className="info-box">
                                          <Box className="info">
                                            <p>{t("Rent Amount (Monthly)")}</p>
                                            <span>
                                              {this.state.currency +
                                                " " +
                                                Number(rentHistory.attributes.rent_amount).toLocaleString()}
                                            </span>
                                          </Box>
                                          <Box className="info">
                                            <p>{t("Received Amount")}</p>
                                            <span>
                                              {this.state.currency +
                                                " " +
                                                Number(rentHistory.attributes.received_amount).toLocaleString()}
                                            </span>
                                          </Box>
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                  <Button
                                    className="add-rent-history-btn"
                                    onClick={() => this.handleCloseRentHistoryModal()}
                                  >
                                    {this.state.rentHistoryList.length == 0
                                      ? `${t("+ Add Rent History")}`
                                      : `${t("+ Add Another Rent History")}`}
                                  </Button>
                                  <FormControl fullWidth>
                                    <Box className="unit-box-currency">
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
                                      <Box className="unit-box-value">{t(this.state.currency)}</Box>
                                    </Box>
                                    {errors.income && touched.income && <p className="error">{t(errors.income)}</p>}
                                  </FormControl>
                                </>
                              )}
                              <FormControl fullWidth>
                                <Box className="unit-box-currency">
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
                                  <Box className="unit-box-value">{t(this.state.currency)}</Box>
                                </Box>
                                {errors.valuation && touched.valuation && (
                                  <p className="error">{t(errors.valuation)}</p>
                                )}
                              </FormControl>

                              <Box className="next-button edit-submit-button">
                                <Button
                                  className="cancel"
                                  onClick={() =>
                                    this.props.navigation.navigate("MyUnitDetails", { id: this.state.unitId })
                                  }
                                >
                                  {t("Cancel")}
                                </Button>
                                <Button type="submit">{t("Save")}</Button>
                              </Box>
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
                    <h4 className="bold-text">{t("Rent History")}</h4>
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
                      <Box className="unit-box-currency">
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
                        <Box className="unit-box-value">{this.state.currency}</Box>
                      </Box>
                      {errors.rentAmount && touched.rentAmount && <p className="error">{t(errors.rentAmount)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="unit-box-currency">
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
                        <Box className="unit-box-value">{this.state.currency}</Box>
                      </Box>
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

export default withTranslation()(withStyles(MyUnitStyle)(EditMyUnit));
// Customizable Area End
