// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "../../dashboard/src/Dashboard.web.css";
import { Container, Typography, Link, FormControl, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import AuditorController,{
    Props,
  } from "./AuditorDasController.web";
import AuditorSideBarWeb from "./AuditorSideBar.web";

class AuditorDashboardGeneral extends AuditorController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t} = this.props
    return (
      <>
        <Box style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <AuditorSideBarWeb {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboards")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("General Dashboard")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>
                      {t("General Dashboard")}
                    </Typography>
                  </Box>
                  <Box>
                    <FormControl style={dashBoard.YearMain} className="yearTab">
                      <NativeSelect
                        className="yearSelection"
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
                <Grid container spacing={4} style={{ marginTop: 15 }}>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        {/* <img src={keyhand} alt="keyhand" /> */}
                        <img src={keyhand} alt="keyhand" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Building 1")}
                      </Typography>

                      <Box style={dashBoard.cardBottom}>
                        <Typography variant="body2">{t("Sold")}</Typography>
                        <Box component="span" style={dashBoard.bottomColor}>
                          75%
                        </Box>
                        <Typography variant="body2">{t("Unsold")}</Typography>
                        <Box component="span" style={dashBoard.bottomColor}>
                          25%
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={keyrented} alt="keyrented" width={32} />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Rented Out Apartments")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          42/327
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={money} alt="money" width={28} />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Management Fee Collected")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          58%
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={registered} alt="registered" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Registered Residents/Owners")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={activemembers} alt="activemembers" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Active Registered Members")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4} onClick={() => {
                //@ts-ignore
                this.props.history.push("/ClassifiedManagerListing");
              }}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={activemembers} alt="/ClassifiedManagerListing" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Classifieds")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}onClick={() => {
                //@ts-ignore
                this.props.history.push("/IncidentManagement");
              }}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={activemembers} alt="/IncidentManagement" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Incident")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={members} alt="members" />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Members Never Logged in")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                      <Box sx={{ ml: 1, mb: 2 }} style={dashBoard.CardsIcons}>
                        <img src={overdue} alt="overdue" width={25} />
                      </Box>
                      <Typography style={dashBoard.subHeading}>
                        {t("Overdue Management Fee")}
                      </Typography>
                      <Box style={dashBoard.bottomTwoSpan}>
                        <Box component="span" style={dashBoard.bottomColor}>
                          195
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="h5" style={dashBoard.EventsHeading}>
                    {t("Upcoming Events")}
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={4}
                  style={{ marginTop: 15, marginBottom: 30 }}
                >
                  <Grid item sm={6}>
                    <Box style={dashBoard.EventsCards}>
                      <Box sx={{ ml: 1, mb: 1 }}>
                        <Typography style={dashBoard.EventsTitle}>
                          {t("Meeting Title")}
                        </Typography>
                        <Typography>
                          To discuss new vehicle guidlines
                        </Typography>
                      </Box>
                      <Box style={dashBoard.EventsIconsText}>
                        <img src={location} alt="location" />
                        <Box component="span">Center park common hall</Box>
                      </Box>
                      <Box style={dashBoard.EventsIconsText}>
                        <img src={Cardcalendar} alt="Cardcalendar" />
                        <Box component="span">05-08-2022 18:00 to 20:00 </Box>
                      </Box>
                      <Box style={dashBoard.EventsIconsData}>
                        <Box style={dashBoard.EventsIconsDataBox}>
                          <img src={awated} alt="awated" />
                          <Box component="span">84</Box>
                        </Box>
                        <Box style={dashBoard.EventsIconsDataBox}>
                          <img src={Check_Mark} alt="Check_Mark" />
                          <Box component="span">29</Box>
                        </Box>
                        <Box style={dashBoard.EventsIconsDataBox}>
                          <img src={xmark} alt="xmark" />
                          <Box component="span">13</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box style={dashBoard.EventsCards}>
                      <Box sx={{ ml: 1, mb: 1 }} style={dashBoard.facility}>
                        <Box>
                          <Typography style={dashBoard.EventsTitle}>
                            {t("Facility Resrvation")}
                          </Typography>
                          <Typography>{t("Patyment status")} : Paid</Typography>
                        </Box>
                        <Typography style={dashBoard.PricePaid}>
                          SR 250
                        </Typography>
                      </Box>
                      <Box style={dashBoard.EventsIconsText}>
                        <img src={location} alt="location" />
                        <Box component="span">Center park garden</Box>
                      </Box>
                      <Box style={dashBoard.EventsIconsText}>
                        <img src={Cardcalendar} alt="Cardcalendar" />
                        <Box component="span">12-08-2022 18:00 to 20:00</Box>
                      </Box>
                      <Box style={dashBoard.EventsIconsText}>
                        <img src={account} alt="account" />
                        <Box component="span">jhon doe</Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(dashBoard)(withRouter(AuditorDashboardGeneral)));

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
    marginTop: 10,
  },
  bottomColor: {
    color: "red",
  },
  bottomTwoSpan: {
    display: "flex",
    gap: 20,
    marginTop: 10,
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
    fontSize: 14,
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
