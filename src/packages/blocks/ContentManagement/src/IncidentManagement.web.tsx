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
  withStyles
} from "@material-ui/core";

import '../../dashboard/src/Dashboard.web.css'
import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import IncidentManagementController, { Props } from "./IncidentManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import {SearchIconImage} from "../../StoreCredits/src/assets"
//resorces
import { Users_Icon, Bank_Icon, Box_Icon, Building1,incedentBuilding,incedentUnit,incedentUser } from "../src/assets";

class IncidentManagement extends IncidentManagementController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getIncidentListing();
    this.getBuildingName();
  }

  render() {
    const { t } = this.props
    console.log("this.state.buildingName=================>/", this.state.buildingNameData);
    const statusArray = ["Unresolved", "Resolved", "Pending Confirmation"]
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
                      {t("My Dashboard")} / {t("General Dashboard")} /<Box component="span" style={{ color: "blue" }}> {t("Incidents")}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{t("Incidents")}</Typography>
                  </Box>
                </Box>
                <Box className="sorting-header">
                  <Box className="formGroup customSelect">
                    <FormControl variant="outlined" >
                      <Select
                        name="buildingName"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) => { this.onChange(e) }}
                        value={this.state.buildingName}
                      >
                        <MenuItem disabled value=" ">
                          {t("Select Building")}
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
                        onChange={(e) => { this.onChange(e) }}
                        value={this.state.unitName}
                      >
                        <MenuItem disabled value=" ">
                          {t("Select Unit")}
                        </MenuItem>
                        {
                          this.state?.unitNameData?.map((val, index) => (
                            <MenuItem
                              key={index}
                              value={val?.id}
                              disabled={this.state.buildingName ? false : true}
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
                        onChange={(e) => { this.onChange(e) }}
                        value={this.state.status}
                      >
                        <MenuItem disabled value=" ">
                          {t("Select Status")}
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
                  <Box >
                    <Button variant="contained" color="primary" style={{backgroundColor:"#2b6fed",borderRadius:"8px"}} startIcon={<img src={SearchIconImage} />} onClick={() => this.serachHandle()}>
                      {t("Search")}
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
                            <Typography component="h4" className="bold-text" style={{fontSize:"20px"}}>
                              {val?.attributes?.incident_related?.name}
                            </Typography>
                            <Box className="card-rows">
                              <img src={incedentBuilding} alt="Bank Icon" />
                              <p style={{fontSize:"16px",marginLeft:"10px"}}>{val?.attributes?.apartment_management?.building_name}</p>
                            </Box>
                            <Box className="card-rows">
                              <img src={incedentUnit} alt="Bank Icon" />
                              <p style={{fontSize:"16px",marginLeft:"10px"}}>{val?.attributes?.apartment_management?.apartment_name}</p>
                            </Box>
                            <Box className="card-rows">
                              <img src={incedentUser} alt="Bank Icon"/>
                              <p style={{fontSize:"16px",marginLeft:"10px"}}>{val?.attributes?.reported_by?.full_name}</p>
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

export default withTranslation()(withStyles(dashBoard)(withRouter(IncidentManagement)));

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
