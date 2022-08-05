//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";

import '../../dashboard/src/Dashboard.web.css'
import {
  House_Icon, keyrented, money, location, account,
  registered, activemembers, members, overdue, Cardcalendar, awated, Check_Mark, xmark
}
  from "../../dashboard/src/assets"

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import IncidentManagementController, { Props } from "./IncidentManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";

//resorces
import { Users_Icon, Bank_Icon, Box_Icon, Building1 } from "../src/assets";

class IncidentManagement extends IncidentManagementController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getBuildingName();
   // this.getCommonArea();
   // this.getIncidentRelated();
  }
  render() {
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      My Dashboard / General Dashboard /<Box component="span" style={{ color: "blue" }}> Incidents</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>Incidents</Typography>
                  </Box>
                  <Box>
                    <FormControl style={dashBoard.YearMain} className='yearTab'>
                      <NativeSelect className='yearSelection'
                        value={this.state.Year}
                        onChange={this.handleChange}
                      >
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Box>
                <Formik
                    initialValues={{
                      buildingName: " ",
                      unit: " ",
                      status: " ",
                    }}
                    validationSchema={this.searchIncidentSchema()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      console.log("valus=========>", values)
                      // localStorage.setItem("incidentPreview", JSON.stringify(values))
                      // this.setState({ loading: true })
                      // this.props.history.push("/IncidentPreview")
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm">
                          <Box className="sorting-header">
                          <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="buildingName"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {
                                  (e.target.value != " ") && setFieldValue("buildingName", e.target.value)

                                }}
                                value={values.buildingName}
                              >
                               <MenuItem disabled value=" ">
                               Select Building
                              </MenuItem>
                                {
                                this.state?.buildingNameData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={`${val?.id} ${val?.name}`}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                              </Select>
                              <ErrorMessage className="text-error" component="Typography" name="buildingName" />
                            </FormControl>
                          </Box>
                          <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="unit"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {
                                  (e.target.value != " ") && setFieldValue("unit", e.target.value)
                                }}
                                value={values.unit}
                              >
                                 {
                                   values?.buildingName?
                                   <MenuItem disabled value=" ">
                                  Select Unit
                                </MenuItem>
                                  :
                                    this.state?.buildingNameData?.map((val, index) => (
                                      <MenuItem
                                        key={index}
                                        value={val?.name}
                                      >
                                        {val?.name}
                                      </MenuItem>
                                    ))

                                 }
                              </Select>
                              <ErrorMessage className="text-error" component="Typography" name="unit" />
                            </FormControl>
                          </Box>
                          <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="status"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {
                                  (e.target.value != " ") && setFieldValue("status", e.target.value)
                                }}
                                value={values.status}
                              >
                                <MenuItem disabled value=" ">
                                  Select Status
                                </MenuItem>
                                {
                                this.state?.buildingNameData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val?.name}
                                  >
                                    {val?.name}
                                  </MenuItem>
                                ))
                              }
                              </Select>
                              <ErrorMessage className="text-error" component="Typography" name="status" />
                            </FormControl>
                          </Box>
                          <Box className="customButton">
                            <Button variant="contained" type="submit">Search</Button>
                          </Box>
                          </Box>
                      </Form>
                    )}
                  </Formik>

                <Grid container spacing={2} style={{ marginTop: 15, marginBottom: 15 }}>
                  <Grid item sm={4}>
                    <Card className="management-card card">
                      <CardContent className="costom-card-content">
                        <Box className="customButton">
                          <Button variant="contained" className="contain danger" type="submit">Ongoing</Button>
                        </Box>
                        <Typography component="h4">
                          Plumbing
                        </Typography>
                        <Box className="card-rows">
                          <img src={Bank_Icon} alt="Bank Icon" />
                          <h5>Building 1</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Box_Icon} alt="Bank Icon" />
                          <h5>A-101</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Users_Icon} alt="Bank Icon" />
                          <h5>John Doe</h5>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="management-card card">
                      <CardContent className="costom-card-content">
                        <Box className="customButton">
                          <Button variant="contained" className="contain success" type="submit">Resolved</Button>
                        </Box>
                        <Typography component="h4">
                          Plumbing
                        </Typography>
                        <Box className="card-rows">
                          <img src={Bank_Icon} alt="Bank Icon" />
                          <h5>Building 1</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Box_Icon} alt="Bank Icon" />
                          <h5>A-101</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Users_Icon} alt="Bank Icon" />
                          <h5>John Doe</h5>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="management-card card">
                      <CardContent className="costom-card-content">
                        <Box className="customButton">
                          <Button variant="contained" className="contain warning" type="submit">Pending Confirmation</Button>
                        </Box>
                        <Typography component="h4">
                          Plumbing
                        </Typography>
                        <Box className="card-rows">
                          <img src={Bank_Icon} alt="Bank Icon" />
                          <h5>Building 1</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Box_Icon} alt="Bank Icon" />
                          <h5>A-101</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Users_Icon} alt="Bank Icon" />
                          <h5>John Doe</h5>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="management-card card">
                      <CardContent className="costom-card-content">
                        <Box className="customButton">
                          <Button variant="contained" className="contain success" type="submit">Ongoing</Button>
                        </Box>
                        <Typography component="h4">
                          Plumbing
                        </Typography>
                        <Box className="card-rows">
                          <img src={Bank_Icon} alt="Bank Icon" />
                          <h5>Building 1</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Box_Icon} alt="Bank Icon" />
                          <h5>A-101</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Users_Icon} alt="Bank Icon" />
                          <h5>John Doe</h5>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="management-card card">
                      <CardContent className="costom-card-content">
                        <Box className="customButton">
                          <Button variant="contained" className="contain success" type="submit">Ongoing</Button>
                        </Box>
                        <Typography component="h4">
                          Plumbing
                        </Typography>
                        <Box className="card-rows">
                          <img src={Bank_Icon} alt="Bank Icon" />
                          <h5>Building 1</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Box_Icon} alt="Bank Icon" />
                          <h5>A-101</h5>
                        </Box>
                        <Box className="card-rows">
                          <img src={Users_Icon} alt="Bank Icon" />
                          <h5>John Doe</h5>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  cardBottom: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  bottomColor: {
    color: "red"
  },
  bottomTwoSpan: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  Cards: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 25,
    background: "#fff",
    borderRadius: 10,
  },
  CardsIcons: {
    border: "1px solid #d9d4d3",
    borderRadius: "50%",
    width: 25,
    height: 25,
    padding: 15,
    color: "#054c94",
  },
  EventsHeading: {
    fontWeight: 600,
    marginTop: 50,
  },
  EventsCards: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    background: "#fff",
    borderRadius: 10,
  },
  EventsTitle: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 10,
  },
  EventsIconsText: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
    fontSize: 14,
  },
  EventsIconsData: {
    display: "flex",
    alignItems: "center",
    gap: 25,
    marginTop: 15,
  },
  EventsIconsDataBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PricePaid: {
    marginRight: 70,
    background: "#dcf5f0",
    padding: 6,
    borderRadius: 30,
    color: "green",
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
};

// Customizable Area End

export default withRouter(IncidentManagement)
