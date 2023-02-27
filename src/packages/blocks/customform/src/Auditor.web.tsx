// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "../../dashboard/src/Dashboard.web.css";
import { Container, Typography, FormControl, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
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
        <Box style={{ background: "#F7F9FE" }}>
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
                    
                      <Typography style={dashBoard.subHeading}>
                        {t("Building 1")}
                      </Typography>

                      <Box style={dashBoard.cardBottom}>
                        <Typography variant="body2">{t("Generated Audit Report ")}</Typography>
                        <Box component="span" style={dashBoard.bottomColor}>
                          5
                        </Box>
                        
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                    
                      <Typography style={dashBoard.subHeading}>
                        {t("Building 2")}
                      </Typography>

                      <Box style={dashBoard.cardBottom}>
                        <Typography variant="body2">{t("Generated Audit Report ")}</Typography>
                        <Box component="span" style={dashBoard.bottomColor}>
                          5
                        </Box>
                        
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box style={dashBoard.Cards}>
                    
                      <Typography style={dashBoard.subHeading}>
                        {t("Building 3")}
                      </Typography>

                      <Box style={dashBoard.cardBottom}>
                        <Typography variant="body2">{t("Generated Audit Report ")}</Typography>
                        <Box component="span" style={dashBoard.bottomColor}>
                          5
                        </Box>
                        
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
