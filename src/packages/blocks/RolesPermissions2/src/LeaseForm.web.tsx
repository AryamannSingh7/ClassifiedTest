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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, EarthIcon, CubeIcon } from "./assets";
import LeaseFormController, { Props } from "./LeaseFormController.web";
import moment from "moment";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class LeaseForm extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const template_id = this.props.navigation.getParam("templateId");
    this.setState({ ...this.state, templateId: template_id }, () => {});
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log("state", this.state);

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link to="/IssueContract/1">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <h4 style={{ marginTop: "18px" }}>{t("Residential Rental Lease Agreement")}</h4>
                    <Formik
                      initialValues={this.state.leaseForm}
                      // validationSchema={}
                      onSubmit={(values, { resetForm }) => {
                        this.setState({
                          ...this.state,
                          leaseForm: {
                            tenantName: values.tenantName,
                            landlordName: values.landlordName,
                            complexName: values.complexName,
                            buildingName: values.buildingName,
                            unitName: values.unitName,
                            duration: values.duration,
                            startDate: values.startDate,
                            endDate: values.endDate,
                            monthlyRent: values.monthlyRent,
                            currency: values.currency,
                          },
                        });
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        console.log("values", values);
                        console.log("errors", errors);
                        console.log("touched", touched);

                        return (
                          <Form onSubmit={handleSubmit} translate>
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.tenantName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  // variant="filled"
                                  className="select-input input"
                                  placeholder={t("Tenant Name")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.tenantName && touched.tenantName && (
                                  <p className="error">{t(errors.tenantName)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.landlordName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="landlordName"
                                  // variant="filled"
                                  className="select-input input"
                                  placeholder="Landlord Name"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.landlordName && touched.landlordName && (
                                  <p className="error">{t(errors.landlordName)}</p>
                                )}
                              </FormControl>
                              {/* <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Country
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Region
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          City
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select> */}
                              {/* <FormControl fullWidth>
                                <Select
                                  displayEmpty
                                  value={values.complexName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="complexName"
                                  variant="filled"
                                  className="select-input"
                                  input={<OutlinedInput />}
                                >
                                  <MenuItem value="" disabled>
                                    <ListItemIcon>
                                      <img src={CubeIcon} alt="" />
                                    </ListItemIcon>
                                    Complex Name
                                  </MenuItem>
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {errors.complexName && touched.complexName && (
                                  <p className="error">{errors.complexName}</p>
                                )}
                              </FormControl> */}
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.buildingName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="buildingName"
                                    variant="filled"
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
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {errors.buildingName && touched.buildingName && (
                                  <p className="error">{t(errors.buildingName)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.unitName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="unitName"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Unit Name")}
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {errors.unitName && touched.unitName && <p className="error">{t(errors.unitName)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                  // variant="filled"
                                  className="select-input input"
                                  placeholder={t("Enter Agreement Duration")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
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
                                  // variant="filled"
                                  className="select-input input"
                                  placeholder={t("Start Contract Date")}
                                  type="text"
                                  // onFocus={(e) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.startDate && touched.startDate && (
                                  <p className="error">{t(errors.startDate)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.endDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="endDate"
                                  // variant="filled"
                                  className="select-input input"
                                  placeholder={t("End Contract Date")}
                                  type="text"
                                  // onFocus={(e) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.monthlyRent}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  // variant="monthlyRent"
                                  className="select-input input"
                                  placeholder={t("Enter Monthly Rent Amount")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
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
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                  <img src={CubeIcon} alt="" />
                                </Box>
                                {errors.currency && touched.currency && <p className="error">{t(errors.currency)}</p>}
                              </FormControl>

                              <div className="next-button">
                                <Link to="/IssueContract/1/LeaseForm/Template">
                                  {/* <Button type="submit">Next</Button> */}
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
