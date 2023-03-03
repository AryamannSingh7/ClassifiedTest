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
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import {
  BuildingLogo,
  CubeIcon,
  TenantName,
  BuildingName,
  DurationIcon,
  CalenderIcon,
  RentAmountIcon,
  CurrencyIcon,
  ComplexIcon,
} from "./assets";
import LeaseFormController, { Props } from "./LeaseFormController.web";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";

class LeaseForm extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const contract = JSON.parse(window.sessionStorage.getItem("contractForm") as any);
    const template_id: any = this.props.navigation.getParam("templateId");
    window.sessionStorage.removeItem("buildingId");
    window.sessionStorage.removeItem("unitId");
    this.setState(
      {
        templateId: template_id,
        leaseForm: {
          tenantName: contract.tenantName,
          landlordName: contract.landlordName,
          buildingName: contract.buildingName,
          unitName: contract.unitName,
          buildingId: contract.buildingId,
          unitId: contract.unitId,
          duration: contract.duration,
          startDate: contract.startDate,
          endDate: contract.endDate,
          monthlyRent: contract.monthlyRent,
          currency: contract.currency,
          complexName: contract.complexName,
          address: contract.address,
        },
      },
      () => {
        this.getCurrencyList();
        this.getBuilding();
        if (this.state.leaseForm.buildingId && this.state.leaseForm.unitId) {
          this.getUnits(this.state.leaseForm.buildingId);
          this.getUnitDetails(this.state.leaseForm.unitId);
          this.handleCheckContractExist(this.state.leaseForm.unitId);
        }
      }
    );
  }

  render() {
    const {} = this.props;
    const { t, classes }: any = this.props;

    const isEditTemplate = window.sessionStorage.getItem("isEditFlow");
    const page = window.sessionStorage.getItem("page");

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.gotoSelectTemplatePage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span className="bold-text">{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <h4 className="bold-text" style={{ marginTop: "18px" }}>
                      {t("Residential Rental Lease Agreement")}
                    </h4>
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.leaseForm}
                      validationSchema={this.ContractFormValidation}
                      onSubmit={(values: any, { resetForm }) => {
                        window.sessionStorage.setItem("contractForm", JSON.stringify(values));
                        this.props.navigation.navigate("ChangedSelectedTemplate", {
                          templateId: this.state.templateId,
                        });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.tenantName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  className="select-input input"
                                  placeholder={t("Tenant Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={TenantName} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {/* {errors.tenantName && touched.tenantName && (
                                  <p className="error">{t(errors.tenantName)}</p>
                                )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.landlordName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="landlordName"
                                  className="select-input input"
                                  placeholder="Landlord Name"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={TenantName} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {/* {errors.landlordName && touched.landlordName && (
                                  <p className="error">{t(errors.landlordName)}</p>
                                )} */}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.complexName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="complexName"
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
                                  value={values.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="address"
                                  className="select-input input"
                                  placeholder={t("Complex Address")}
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
                                      this.getUnits(value);
                                    }}
                                    onBlur={handleBlur}
                                    name="buildingId"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                    readOnly={
                                      isEditTemplate === "false" &&
                                      page === "IssueContract" &&
                                      this.state.leaseForm.buildingId
                                    }
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
                                  <img src={BuildingName} alt="" />
                                </Box>
                                {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.unitId}
                                    onChange={(e: any) => {
                                      const value = e.target.value;
                                      setFieldValue("unitId", value);
                                      this.handleCheckContractExist(value);
                                      this.getUnitDetails(value);
                                    }}
                                    onBlur={handleBlur}
                                    name="unitId"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                    readOnly={
                                      isEditTemplate === "false" &&
                                      page === "IssueContract" &&
                                      this.state.leaseForm.unitId
                                    }
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Unit Name")}
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
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {errors.unitId && touched.unitId && <p className="error">{t(errors.unitId)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                  className="select-input input"
                                  placeholder={t("Enter Agreement Duration")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={DurationIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.duration && touched.duration && <p className="error">{t(errors.duration)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.startDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="startDate"
                                  className="select-input input"
                                  placeholder={t("Start Contract Date")}
                                  type="text"
                                  onFocus={(e: any) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CalenderIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.startDate && touched.startDate && (
                                  <p className="error">{t(errors.startDate)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <input
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="endDate"
                                    className="select-input input"
                                    placeholder={t("End Contract Date")}
                                    type="text"
                                    onFocus={(e: any) => (e.target.type = "date")}
                                    min={values.startDate}
                                  />
                                  <img src={CalenderIcon} alt="" />
                                </Box>
                                {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.monthlyRent}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="monthlyRent"
                                  className="select-input input"
                                  placeholder={t("Enter Monthly Rent Amount")}
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
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.currency}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="currency"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Select Currency")}
                                    </MenuItem>
                                    {this.state.currencyList.map((currency: any) => {
                                      return (
                                        <MenuItem value={currency.attributes.currency} key={currency.id}>
                                          {currency.attributes.currency}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={CurrencyIcon} alt="" />
                                </Box>
                                {errors.currency && touched.currency && <p className="error">{t(errors.currency)}</p>}
                              </FormControl>
                            </Box>
                            <div className="next-button">
                              <Button type="submit">{t("Next")}</Button>
                            </div>
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
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(LeaseForm));
// Customizable Area End
