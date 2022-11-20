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
  withStyles,
  TextField,
  InputAdornment
} from "@material-ui/core";

import '../../dashboard/src/Dashboard.web.css'
// import {
//   keyrented, money, location, account,
//   registered, activemembers, members, overdue, Cardcalendar, awated, Check_Mark, xmark
// }
//   from "../../dashboard/src/assets"

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import FacilityManagerContorller, { Props } from "./FacilityManagerContorller.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

//resorces
import { User_Icon ,Users_Icon,upcoming } from "../src/assets";
//import { Dollar_Icon } from "../src/assets";

class ManagerFacilityReservation extends FacilityManagerContorller {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getFacilityReservationListing();
    this.getBuildingName();
  }
  

  render() {
    const { t, classes }: any = this.props;
    console.log("this.state.facilityListing=================>/", this.state.facilityListing);
    const statusArray = ["Pending Approval", "Published", "Rejected"]
    const classifiedType = ["buyer", "seller", 'generic', 'All'];
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
                <Box className={classes.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      {t("My Dashboard")} / {t("General Dashboard")} /<Box component="span" style={{ color: "blue" }}> {t("Classifieds")}</Box>
                    </Typography>
                    <Typography variant="h5" className={classes.subHeading}>{t("Classifieds")}</Typography>
                  </Box>
                </Box>
                <Box className="sorting-header classified-sorting-header">
                  <div className="left-block">
                    <Box className="formGroup customSelect">
                      <FormControl variant="outlined" >
                        <Select
                          name="classifiedType"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => { this.onChange(e) }}
                          value={this.state.classifiedType}
                        >
                          <MenuItem disabled value=" ">
                            {t("Classified Type")}
                          </MenuItem>
                          {
                            classifiedType?.map((val, index) => (
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
                            this.state?.buildingNameData?.map((val: any, index: any) => (
                              <MenuItem
                                key={index}
                                value={val?.attributes?.name}
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
                    <Box className="customButton">
                      <Button variant="contained" onClick={() => this.serachHandle()}>
                        {t("Search")}
                      </Button>
                    </Box>
                  </div>
                  {/* <Box className="formGroup classified-search-iput">
                    <TextField
                      variant="outlined"
                      style={{ border: "1px solid #ECECEC", borderRadius: "10px", backgroundColor: "#f9f9f9", marginRight: "10px" }}
                      placeholder={t("Search by unit number")}
                      type="text"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </Box> */}
                </Box>
                <Grid container spacing={2} style={{ marginTop: 15, marginBottom: 15 }}>
                  {
                    this.state?.facilityListing?.map((val: any, index: any) => (
                      <Grid item sm={6} lg={4} key={index} onClick={() => this.getFacilityDetails(val.id)}>
                          <Card className="management-card card" key={index}>
                          <CardContent className="costom-card-content">
                            <Box className="customButton">
                              <Button variant="contained" className={val?.attributes?.status === 'Pending' ? "contain warning" : val?.attributes?.status === 'Upcoming' ? 'contain success' : 'contain blue'} type="submit">
                                {val?.attributes?.status}</Button>
                            </Box>
                            <strong><h4>Facility Reservation</h4></strong>
                            <Box className="card-rows">
                              <img src={upcoming} alt="Bank Icon" />
                              <h5> {val?.attributes?.common_area?.name}</h5>
                            </Box>
                            <Box className="card-rows">
                              <img src={upcoming} alt="Bank Icon" />
                              <h5>{val?.attributes?.date} {val?.attributes?.time_from} to {val?.attributes?.time_from}</h5>
                            </Box>
                            <Box className="card-rows">
                              <img src={Users_Icon} alt="Bank Icon" />
                              <h5>{val?.attributes?.description}</h5>
                            </Box>
                            <Box className="card-rows">
                              <img src={Users_Icon} alt="Bank Icon" />
                              <h5>{val?.attributes?.building?.name}</h5>
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

const dashBoard: any = {
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
export default withTranslation()(withStyles(dashBoard)(withRouter(ManagerFacilityReservation)));
// Customizable Area End
