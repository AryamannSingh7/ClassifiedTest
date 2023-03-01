// Customizable Area Start
import React from "react";
import { Container, Typography, Button, withStyles, NativeSelect, Card } from "@material-ui/core";
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
import AuditorSideBarWeb from "../../customform/src/AuditorSideBar.web";

class DashboardActions extends DashboardActionsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.generalDashboard}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {localStorage.getItem("selectUserType") == "Auditor" ? (
                <AuditorSideBarWeb {...this.props} />
              ) : (
                <ChairmanSidebar {...this.props} />
              )}
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
                    <Typography variant="h5" className="bold-text">
                      {t("Action Assign to me")}
                    </Typography>
                  </Box>
                  <Box className="action-filter-box">
                    <select className="select-year">
                      <option value={2022}>Select Building</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </select>
                    <select className="select-year">
                      <option value={2022}>Sort By</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </select>
                    <select className="select-year">
                      <option value={2022}>Category</option>
                      <option value={2021}>2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </select>
                    <Button startIcon={<SearchIcon />}>Search</Button>
                  </Box>
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <Card className="action-card">
                        <h4 className="bold-text">To approve a budget report 2022</h4>
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
                                <p className="bold-text">Building 1</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionAssign} alt="" />
                              <Box>
                                <span>Assigned by</span>
                                <p className="bold-text">John Deo</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionCalender} alt="" />
                              <Box>
                                <span>Assigned on</span>
                                <p className="bold-text">June 14, 2023</p>
                              </Box>
                            </Box>
                            <Box className="action-info">
                              <img src={ActionCalender} alt="" />
                              <Box>
                                <span>Due till</span>
                                <p className="bold-text">June 14, 2023</p>
                              </Box>
                            </Box>
                          </Box>
                          <Button> View Assigned Task</Button>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
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
// Customizable Area End
