// Customizable Area Start
import React from "react";
import { riyal, expense, statistic, removeuser, approvedbudget, keyrented } from "./assets";
import { Container, Typography, withStyles, Card, Link, Box, Grid } from "@material-ui/core";
import DashboardBudgetController, { Props } from "../../../blocks/dashboard/src/DashboardBudgetController.web";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { ROLE } from "../../../framework/src/Enum";
import ChairmanNumberCard from "../../../components/src/DashboardCard/ChairmanNumberCard.web";

function createData(Name: any, Amount: any) {
  return { Name, Amount };
}

const rows = [
  createData("Sales Revenue", 10000),
  createData("Cost of Services Sold", 2300),
  createData("Operating Expenses", 26285),
  createData("Operating Income", 30050),
  createData("Other Revenue and Expenses", 10356),
];

class DashboardBudget extends DashboardBudgetController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getBudgetDashboardYearList();
    this.getAllBuildingList();
    this.getBudgetDashboardData();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filterBuilding !== this.state.filterBuilding || prevState.filterYear !== this.state.filterYear) {
    }
  }

  render() {
    const { t, classes }: any = this.props;
    const userType = localStorage.getItem("userType");

    return (
      <>
        <Box className={classes.generalDashboard}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <ChairmanSidebar {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboard")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Budget Dashboard")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="bold-text">
                      {t("Budget Dashboard")}
                    </Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <select
                          className="select-year"
                          value={this.state.filterBuilding}
                          onChange={(e: any) => this.setState({ filterBuilding: e.target.value })}
                        >
                          <option value="" disabled>
                            {t("Select Building")}
                          </option>
                          {this.state.buildingList.map((building: any) => {
                            return (
                              <option value={building.id} key={building.id}>
                                {building.attributes.name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <select
                        value={this.state.filterYear}
                        onChange={(e: any) => this.setState({ filterYear: e.target.value })}
                        className="select-year"
                      >
                        {this.state.yearList.map((year: any) => {
                          return (
                            <option value={year} key={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={riyal} alt="image" />
                      </Box>
                      <h4 className="bold-text">{t("Collected vs Budget Amount")}</h4>
                      <Box className="info-box">
                        <p>{t("Collected")}</p>
                        <span>
                          {this.state.currency} {this.state.budgetCollected}
                        </span>
                      </Box>
                      <Box className="info-box">
                        <p>{t("Budget")}</p>
                        <span>
                          {this.state.currency} {this.state.budgetAmount}
                        </span>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={keyrented} alt="image" />
                      </Box>
                      <h4 className="bold-text">{t("Total Rent Due vs Rent Collected")}</h4>
                      <Box className="info-box">
                        <p>{t("Rent Due")}</p>
                        <span>
                          {this.state.currency} {this.state.rentDue}
                        </span>
                      </Box>
                      <Box className="info-box">
                        <p>{t("Rent Collected")}</p>
                        <span>
                          {this.state.currency} {this.state.rentCollected}
                        </span>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={removeuser} alt="image" />
                      </Box>
                      <h4 className="bold-text">{t("Number of members have not paid management fee")}</h4>
                      <Box className="info-box">
                        <span>{this.state.member}</span>
                        <p>{t("Members")}</p>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={expense}
                      heading={t("Total Expenses")}
                      titleOne=""
                      valueOne={`${this.state.currency} ${this.state.totalExpense}`}
                      titleTwo=""
                      valueTwo=""
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={statistic}
                      heading={t("Occupancy Rate")}
                      titleOne={t("Sold")}
                      valueOne={`${this.state.rateSold} %`}
                      titleTwo={t("Unsold")}
                      valueTwo={`${this.state.rateUnsold} %`}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Link href="/BudgetDetails">
                      <ChairmanNumberCard
                        image={approvedbudget}
                        heading={
                          userType === ROLE.CHAIRMAN ? t("Approved Budget Amount") : t("Remaining budget amount")
                        }
                        titleOne=""
                        valueOne={`${this.state.currency} ${this.state.totalBudget}`}
                        titleTwo=""
                        valueTwo=""
                      />
                    </Link>
                  </Grid>
                </Grid>

                <Grid container spacing={4} style={{ marginTop: 15, marginBottom: 30 }}>
                  <Grid item sm={6}>
                    <Card className="budget-table-content-box">
                      <Box className="header">
                        <h4 className="bold-text">{t("Total Expenses Breakdown")}</h4>
                      </Box>
                      <hr />
                      <Box className="body">
                        <Box className="table-header">
                          <span>{t("Name")}</span>
                          <span>{t("Amount")}</span>
                        </Box>
                        {rows.map((row: any) => (
                          <Box className="table-content">
                            <p>{row.Name}</p>
                            <span>{row.Amount}</span>
                          </Box>
                        ))}
                      </Box>
                      <hr />
                      <Box className="footer">
                        <p>Total Expenses</p>
                        <h4 className="bold-text">SR 12,000</h4>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={6}>
                    <Card className="budget-table-content-box">
                      <Box className="header">
                        <h4 className="bold-text">{t("Collected Fees")}</h4>
                      </Box>
                      <hr />
                      <Box className="body">
                        <Box className="table-header">
                          <span>{t("Name")}</span>
                          <span>{t("Amount")}</span>
                        </Box>
                        {rows.map((row: any) => (
                          <Box className="table-content">
                            <p>{row.Name}</p>
                            <span>{row.Amount}</span>
                          </Box>
                        ))}
                      </Box>
                      <hr />
                      <Box className="footer">
                        <p>Total Collection</p>
                        <h4 className="bold-text">SR 12,000</h4>
                      </Box>
                    </Card>
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

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(DashboardBudget)));
// Customizable Area End
