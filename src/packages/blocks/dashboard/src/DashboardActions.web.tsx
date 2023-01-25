// Customizable Area Start
import React from "react";
import { Container, Typography, Link, Button, withStyles, NativeSelect, Card } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DashboardActionsController, { Props } from "../../../blocks/dashboard/src/DashboardActionsController.web";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import SearchIcon from "@material-ui/icons/Search";
import { ActionAssign, ActionBuilding, ActionCalender } from "./assets";

class DashboardActions extends DashboardActionsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.generalDashboard}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Typography variant="body1">
                    {t("My Dashboard")} /{" "}
                    <Box component="span" style={{ color: "blue" }}>
                      {t("Action Assign to me")}
                    </Box>
                  </Typography>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("Action Assign to me")}</Typography>
                  </Box>
                  <Box className="action-filter-box">
                    <NativeSelect className="select-year">
                      <option value={2022}>Select Building</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </NativeSelect>
                    <NativeSelect className="select-year">
                      <option value={2022}>Sort By</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </NativeSelect>
                    <NativeSelect className="select-year">
                      <option value={2022}>Category</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </NativeSelect>
                    <Button startIcon={<SearchIcon />}>Search</Button>
                  </Box>
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <Card className="action-card">
                        <h4>To approve a budget report 2022</h4>
                        <p className="description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida, enim ut tincidunt
                          vehicula, liberoan te laoreet nisl, nec vulputate nibh ligula quis risus.
                        </p>
                        <Box className="action-info-box">
                          <Box className="action-content-box">
                            <Box className="action-info">
                              <img src={ActionBuilding} alt="" />
                              <Box>
                                <span>Building</span>
                                <p>Building 1</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionAssign} alt="" />
                              <Box>
                                <span>Assigned by</span>
                                <p>John Deo</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionCalender} alt="" />
                              <Box>
                                <span>Assigned on</span>
                                <p>June 14, 2023</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionCalender} alt="" />
                              <Box>
                                <span>Due till</span>
                                <p>June 14, 2023</p>
                              </Box>
                            </Box>
                          </Box>
                          <Button> View Assigned Task</Button>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                  {/* <Box style={dashBoardActions.Cards}>
                    <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                      {t("To schedule a meeting")}
                    </Typography>
                    <Typography style={dashBoardActions.Cardspara}>
                      {t(
                        "Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards."
                      )}
                    </Typography>
                    <Button variant="contained" color="primary">
                      Schedule a meeting
                    </Button>
                  </Box>

                  <Box style={dashBoardActions.Cards}>
                    <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                      {t("To assign rights to user")}
                    </Typography>
                    <Typography style={dashBoardActions.Cardspara}>
                      {t(
                        "Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards."
                      )}
                    </Typography>
                    <Button variant="contained" color="primary">
                      {t("Assign Rights")}
                    </Button>
                  </Box>

                  <Box style={dashBoardActions.Cards}>
                    <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                      {t("To start chairman nomination process")}
                    </Typography>
                    <Typography style={dashBoardActions.Cardspara}>
                      {this.toggleState(
                        "Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards."
                      )}
                    </Typography>
                    <Button variant="contained" color="primary">
                      {t("chairman Nomination")}{" "}
                    </Button>
                  </Box>

                  <Box style={dashBoardActions.Cards}>
                    <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                      {t("To approve budget")}
                    </Typography>
                    <Typography style={dashBoardActions.Cardspara}>
                      {t(
                        "Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards."
                      )}
                    </Typography>
                    <Button variant="contained" color="primary">
                      {t("Approve Budget")}
                    </Button>
                  </Box> */}
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(DashboardActions)));

const dashBoardActions = {
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
    marginBottom: 20,
  },
  Cards: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 25,
    paddingRight: 5,
    background: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  CardsTitle: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 10,
  },
  Cardspara: {
    fontSize: 14,
    marginBottom: 15,
  },
};

// Customizable Area End
