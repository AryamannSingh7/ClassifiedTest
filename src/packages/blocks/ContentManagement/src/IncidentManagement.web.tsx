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
    this.getIncidentListing();
    this.getBuildingName();
  }

  render() {
    console.log("this.state.buildingName=================>/",this.state.buildingNameData);
    const statusArray=["Unresolved", "Resolved", "Pending Confirmation"]
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
                <Box className="sorting-header">
                          <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="buildingName"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {this.onChange(e)}}
                                value={this.state.buildingName}
                              >
                               <MenuItem disabled value=" ">
                               Select Building
                              </MenuItem>
                                {
                                this.state?.buildingNameData?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={`${val?.id},${val?.attributes?.name}`}
                                  >
                                    {val?.attributes?.name}
                                  </MenuItem>
                                ))
                              }
                              </Select>
                            </FormControl>
                          </Box>
                         <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="unitName"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(e) => {this.onChange(e)}}
                                value={this.state.unitName}
                              >
                                   <MenuItem disabled value=" ">
                                  Select Unit
                                </MenuItem>
                                {
                                    this.state?.unitNameData?.map((val, index) => (
                                      <MenuItem
                                        key={index}
                                        value={val?.apartment_name}
                                        disabled ={this.state.buildingName ? false:true }
                                      >
                                        {val?.apartment_name}
                                      </MenuItem>
                                    ))
                                }
                              </Select>
                            </FormControl>
                          </Box>
                            
                          <Box className="formGroup customSelect">
                            <FormControl variant="outlined" >
                              <Select
                                name="status"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                 onChange={(e) => {this.onChange(e)}}
                                value={this.state.status}
                              >
                                <MenuItem disabled value=" ">
                                  Select Status
                                </MenuItem>
                                {
                                statusArray?.map((val, index) => (
                                  <MenuItem
                                    key={index}
                                    value={val}
                                  >
                                    {val}
                                  </MenuItem>
                                ))
                              }
                              </Select>

                    </FormControl>
                  </Box>
                  <Box className="customButton">
                    <Button variant="contained" onClick={() => this.serachHandle()}>
                      Search
                    </Button>
                  </Box>
                </Box>
                <Grid container spacing={2} style={{ marginTop: 15, marginBottom: 15 }}>
                  {
                    this.state?.incidentListing?.map((val, index) => (
                      <Grid item sm={4} key={index} onClick={() => this.getIncidentDetails(val.id)}>
                        <Card className="management-card card" key={index}>
                          <CardContent className="costom-card-content">
                            <Box className="customButton">
                              <Button variant="contained" className={val?.attributes?.incident_status === 'Pending Confirmation' ? "contain warning" : val?.attributes?.incident_status === 'Resolved' ? 'contain success' : 'contain danger'} type="submit">
                                {val?.attributes?.incident_status}</Button>
                            </Box>
                            <Typography component="h4">
                              {val?.attributes?.incident_related?.name}
                            </Typography>
                            <Box className="card-rows">
                              <img src={Bank_Icon} alt="Bank Icon" />
                              <h5>{val?.attributes?.apartment_management?.building_name}</h5>
                            </Box>
                            <Box className="card-rows">
                              <img src={Box_Icon} alt="Bank Icon" />
                              <h5>{val?.attributes?.apartment_management?.apartment_name}</h5>
                            </Box>
                            <Box className="card-rows">
                              <img src={Users_Icon} alt="Bank Icon" />
                              <h5>{val?.attributes?.reported_by?.full_name}</h5>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  }
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
