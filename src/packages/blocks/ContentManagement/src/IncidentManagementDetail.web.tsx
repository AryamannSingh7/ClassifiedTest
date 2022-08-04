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
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

import '../../dashboard/src/Dashboard.web.css'
import {
  House_Icon, keyrented, money, location, account,
  registered, activemembers, members, overdue, Cardcalendar, awated, Check_Mark, xmark
}
  from "../../dashboard/src/assets"

import { Formik, Form, Field, ErrorMessage } from "formik";

import CloseIcon from '@material/icons/Close';

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
import { Close_Icon, Bank_Icon, Box_Icon, Building1 } from "./assets";

class IncidentManagementDetail extends IncidentManagementController {
  constructor(props: Props) {
    super(props);
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
                      My Dashboard / General Dashboard / Incidents/<Box component="span" style={{ color: "blue" }}> Incidents Detail</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>Incidents Details</Typography>
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
                <Box className="incident-detail-card-block">
                  <Card className="incident-detail-card card">
                    <Box className="card-header">
                      <Typography component="h4">
                        Plumbing
                      </Typography>
                      <Box className="formGroup customSelect">
                        <FormControl variant="outlined" >
                          <Select
                            name="commonArea"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value="1"
                          >
                            <MenuItem value="1">
                              Select Status
                            </MenuItem>
                            <MenuItem value="2">
                              test 2
                            </MenuItem>
                            <MenuItem value="3">
                              test 3
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <CardContent className="card-content">
                      <Box className="row-block">
                        <Box className="card-rows">
                          <h5>Affected Area: </h5>
                          <h4>Own Apartment</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Incident is related to: </h5>
                          <h4>Plumbing</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Incident Number: </h5>
                          <h4>123456</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Building: </h5>
                          <h4>Building</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Unit: </h5>
                          <h4>Building</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Acknowledge by Manager: </h5>
                          <h4>Building</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Latest update from management: </h5>
                          <h4>Building</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Description: </h5>
                          <h4>Building</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Photos: </h5>
                        </Box>
                      </Box>
                      <Box className="photos-row">
                        <img src={Building1} className="" />
                        <img src={Building1} className="" />
                        <img src={Building1} className="" />
                        <img src={Building1} className="" />
                        <img src={Building1} className="" />
                      </Box>
                      <Box className="incident-button-row customButton">
                        <Button variant="outlined"
                          onClick={() => { this.setState({ showDialog: true }) }}
                          type="submit">assign incident to provider</Button>
                        <Button variant="contained" type="submit">start/view ticket conversation</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Container>

              <Dialog
                open={this.state.showDialog}
                onClose={() => this.setState({ showDialog: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="diloag-wrapper"
                PaperProps={{
                  style: {
                    borderRadius: '15px',
                  },
                }}
              >
                <Box className="provider-dialouge-body desktop-ui">
                  <Box className="dialouge-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      Assign Incident to Provider
                    </DialogTitle>
                    <Button>
                      <img src={Close_Icon} className="close-icon" />
                    </Button>
                  </Box>
                  <Box className="diloag-content">
                    <Box className="formGroup customSelect">
                      <FormControl variant="outlined" >
                        <Select
                          name="commonArea"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value="1"
                        >
                          <MenuItem value="1">
                            Select Status
                          </MenuItem>
                          <MenuItem value="2">
                            test 2
                          </MenuItem>
                          <MenuItem value="3">
                            test 3
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="formGroup customSelect">
                      <FormControl variant="outlined" >
                        <Select
                          name="commonArea"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value="1"
                        >
                          <MenuItem value="1">
                            Select Status
                          </MenuItem>
                          <MenuItem value="2">
                            test 2
                          </MenuItem>
                          <MenuItem value="3">
                            test 3
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="customButton">
                      <Button variant="outlined"
                        onClick={() => { this.setState({ showDialog: true }) }}
                        type="submit">cencel</Button>
                      <Button variant="contained" type="submit">assign incident</Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>
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

export default withRouter(IncidentManagementDetail)