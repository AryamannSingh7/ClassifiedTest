import React from "react";
import { withTranslation } from "react-i18next";
import SpentVsCollectedController, { Props } from "./SpentVsCollectedController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { DashboardVs, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { Menu } from "@szhsin/react-menu";
import UnitCard from "../../../../components/src/ExpenseCard/UnitCard.web";

class SpentVsCollected extends SpentVsCollectedController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.totalExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Spent vs collected amount")}</span>
                  </Box>
                  <Box className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="filter" />
                        </IconButton>
                      }
                    />
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Spent vs collected amount")}</h4>
                            <select
                              name="year"
                              id="year"
                              value={this.state.selectedYear}
                              onChange={(e: any) => this.setState({ selectedYear: e.target.value })}
                            >
                              {this.state.yearList.map((year: number) => {
                                return (
                                  <option value={year} key={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="big-box">
                            <div className="content-box">
                              <div className="left-content">
                                <h4 className="heading">{t("Spent Amount")}</h4>
                                <div className="state">
                                  <p>{t("Collected")}</p>
                                  <Button className="yellow">{this.state.spentAmount}</Button>
                                </div>
                              </div>
                              <div className="center-content">
                                <div className="image">
                                  <img src={DashboardVs} alt="keyhand" />
                                </div>
                                <div className="vertical-line" />
                                <div className="image text">
                                  <h4>VS</h4>
                                </div>
                                <div className="vertical-line" />
                              </div>
                              <div className="right-content">
                                <h4 className="heading">{t("Collected Amount")}</h4>
                                <div className="state">
                                  <p>{t("Due")}</p>
                                  <Button className="yellow">{this.state.collectedAmount}</Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Unitwise spent vs collected report")}</h4>
                          </Box>
                        </Grid>
                        {this.state.unitWiseData.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="rented-empty-card">{t("No unit data available")}</Card>
                          </Grid>
                        )}
                        {this.state.unitWiseData.map((unit: any) => {
                          return (
                            <Grid item xs={12} key={unit.id}>
                              <UnitCard
                                heading={`Unit ${unit.unit_name} Buliding ${unit.building_name}`}
                                titleOne={t("Spent")}
                                valueOne={unit.spent_amount}
                                titleTwo={t("Collected")}
                                valueTwo={unit.collectd_amount}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Citywise spent vs collected report")}</h4>
                          </Box>
                        </Grid>
                        {this.state.cityWiseData.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="rented-empty-card">{t("No city data available")}</Card>
                          </Grid>
                        )}
                        {this.state.cityWiseData.map((city: any) => {
                          return (
                            <Grid item xs={12} key={city.city}>
                              <UnitCard
                                heading={city.city}
                                titleOne={t("Spent")}
                                valueOne={city.spent_amount}
                                titleTwo={t("Collected")}
                                valueTwo={city.collectd_amount}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(TotalExpenseStyle)(SpentVsCollected));
