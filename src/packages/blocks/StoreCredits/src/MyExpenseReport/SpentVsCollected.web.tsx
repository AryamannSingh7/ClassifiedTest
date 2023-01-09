import React from "react";
import { withTranslation } from "react-i18next";
import SpentVsCollectedController, { Props } from "./SpentVsCollectedController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles, MenuItem } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { DashboardVs, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { Menu } from "@szhsin/react-menu";
import UnitCard from "../../../../components/src/ExpenseCard/UnitCard.web";
import Loader from "../../../../components/src/Loader.web";

class SpentVsCollected extends SpentVsCollectedController {
  constructor(props: Props) {
    super(props);
  }

  handleSelectFilterList = () => {
    if (this.state.selectedFilter === "year") {
      return this.state.yearList.map((year: number) => {
        return (
          <option value={year} key={year}>
            {year}
          </option>
        );
      });
    } else if (this.state.selectedFilter === "quarter") {
      return this.state.quarterList.map((quarter: any) => {
        return (
          <option value={quarter.value} key={quarter.value}>
            {quarter.key}
          </option>
        );
      });
    } else {
      return this.state.monthList.map((month: number) => {
        return (
          <option value={month} key={month}>
            {month}
          </option>
        );
      });
    }
  };

  handleFilterValue = () => {
    if (this.state.selectedFilter === "year") {
      return this.state.selectedYear;
    } else if (this.state.selectedFilter === "quarter") {
      return this.state.selectedQuarter;
    } else {
      return this.state.selectedMonth;
    }
  };

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

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
                    >
                      <MenuItem onClick={() => this.handleYearFilter()}>{t("Yearly")}</MenuItem>
                      <MenuItem onClick={() => this.handleQuarterFilter()}>{t("Quarterly")}</MenuItem>
                      <MenuItem onClick={() => this.handleMonthFilter()}>{t("Monthly")}</MenuItem>
                    </Menu>
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
                              value={this.handleFilterValue()}
                              onChange={(e: any) => {
                                if (this.state.selectedFilter === "year") {
                                  this.setState({ loading: true, selectedYear: e.target.value });
                                } else if (this.state.selectedFilter === "quarter") {
                                  this.setState({ loading: true, selectedQuarter: e.target.value });
                                } else {
                                  this.setState({ loading: true, selectedMonth: e.target.value });
                                }
                              }}
                            >
                              {this.handleSelectFilterList()}
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
                                  <Button className="yellow">{this.validateCurrency(this.state.spentAmount)}</Button>
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
                                  <Button className="yellow">
                                    {this.validateCurrency(this.state.collectedAmount)}
                                  </Button>
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
                                valueOne={this.validateCurrency(unit.spent_amount)}
                                titleTwo={t("Collected")}
                                valueTwo={this.validateCurrency(unit.collectd_amount)}
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
                                valueOne={this.validateCurrency(city.spent_amount)}
                                titleTwo={t("Collected")}
                                valueTwo={this.validateCurrency(city.collectd_amount)}
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
