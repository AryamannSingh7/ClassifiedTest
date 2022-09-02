// Customizable Area Start
//@ts-nocheck
//@ts-ignore
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
import BuildingLogo from "../assets/building.png";
import EarthIcon from "../assets/earth.png";
import CubeIcon from "../assets/cube.png";
import LeaseFormController, { Props } from "./LeaseFormController.web";
import moment from "moment";
import { Formik, Form } from "formik";

class LeaseForm extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

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
                    Issue a Lease
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <h4 style={{ marginTop: "18px" }}>Residential Rental Lease Agreement</h4>
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
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                      }) => {
                        console.log("values", values);
                        console.log("errors", errors);
                        console.log("touched", touched);

                        return (
                          <Form onSubmit={handleSubmit}>
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.tenantName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  variant="filled"
                                  className="select-input input"
                                  placeholder="Tenant Name"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.tenantName && touched.tenantName && (
                                  <p className="error">{errors.tenantName}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.landlordName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="landlordName"
                                  variant="filled"
                                  className="select-input input"
                                  placeholder="Landlord Name"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.landlordName && touched.landlordName && (
                                  <p className="error">{errors.landlordName}</p>
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
                              <FormControl fullWidth>
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
                              </FormControl>
                              <FormControl fullWidth>
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
                                    <ListItemIcon>
                                      <img src={CubeIcon} alt="" />
                                    </ListItemIcon>
                                    Building Name
                                  </MenuItem>
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {errors.buildingName && touched.buildingName && (
                                  <p className="error">{errors.buildingName}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
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
                                    <ListItemIcon>
                                      <img src={CubeIcon} alt="" />
                                    </ListItemIcon>
                                    Unit Name
                                  </MenuItem>
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {errors.unitName && touched.unitName && (
                                  <p className="error">{errors.unitName}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                  variant="filled"
                                  className="select-input input"
                                  placeholder="Enter Agreement Duration"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.duration && touched.duration && (
                                  <p className="error">{errors.duration}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.startDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="startDate"
                                  variant="filled"
                                  className="select-input input"
                                  placeholder="Start Contract Date"
                                  type="text"
                                  onFocus={(e) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.startDate && touched.startDate && (
                                  <p className="error">{errors.startDate}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.endDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="endDate"
                                  variant="filled"
                                  className="select-input input"
                                  placeholder="End Contract Date"
                                  type="text"
                                  onFocus={(e) => (e.target.type = "date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.endDate && touched.endDate && (
                                  <p className="error">{errors.endDate}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.monthlyRent}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="tenantName"
                                  variant="monthlyRent"
                                  className="select-input input"
                                  placeholder="Enter Monthly Rent Amount"
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={CubeIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.monthlyRent && touched.monthlyRent && (
                                  <p className="error">{errors.monthlyRent}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
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
                                    <ListItemIcon>
                                      <img src={CubeIcon} alt="" />
                                    </ListItemIcon>
                                    Select Currency
                                  </MenuItem>
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {errors.currency && touched.currency && (
                                  <p className="error">{errors.currency}</p>
                                )}
                              </FormControl>

                              <div className="next-button">
                                <Link to="/IssueContract/1/LeaseForm/Template">
                                  {/* <Button type="submit">Next</Button> */}
                                  <Button>Next</Button>
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
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(ContractsStyleWeb)(LeaseForm);
// Customizable Area End
