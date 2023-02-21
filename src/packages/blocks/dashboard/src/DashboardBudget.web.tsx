// Customizable Area Start
import React from "react";
import { riyal, expense, statistic, removeuser, approvedbudget, keyrented } from "./assets";
import { Container, Typography, withStyles, Card, Link, Box, Grid } from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
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

  render() {
    const { t, classes }: any = this.props;
    const userType = localStorage.getItem("userType");

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
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboard")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Budget Dashboard")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("Budget Dashboard")}</Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <select className="select-year">
                          <option value={2022}>Building 1</option>
                          <option value={2021}>Building 2</option>
                          <option value={2020}>Building 3</option>
                          <option value={2019}>Building 4</option>
                        </select>
                      )}
                      <select className="select-year">
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
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
                      <h4>{t("Collected vs Budget Amount")}</h4>
                      <Box className="info-box">
                        <p>{t("Collected")}</p>
                        <span>SR 12000</span>
                      </Box>
                      <Box className="info-box">
                        <p>{t("Budget")}</p>
                        <span>SR 12000</span>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={keyrented} alt="image" />
                      </Box>
                      <h4>{t("Total Rent Due vs Rent Collected")}</h4>
                      <Box className="info-box">
                        <p>{t("Rent Due")}</p>
                        <span>SR 12000</span>
                      </Box>
                      <Box className="info-box">
                        <p>{t("Rent Collected")}</p>
                        <span>SR 12000</span>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={removeuser} alt="image" />
                      </Box>
                      <h4> {t("Number of members have not paid management fee")}</h4>
                      <Box className="info-box">
                        <span>27</span>
                        <p>{t("Members")}</p>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={expense}
                      heading={t("Total Expenses")}
                      titleOne=""
                      valueOne="SR 12,000"
                      titleTwo=""
                      valueTwo=""
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={statistic}
                      heading={t("Occupancy Rate")}
                      titleOne={t("Sold")}
                      valueOne="12%"
                      titleTwo={t("Unsold")}
                      valueTwo="12%"
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
                        valueOne="SR 19,000"
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
                        <h4>{t("Total Expenses Breakdown")}</h4>
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
                        <h4>SR 12,000</h4>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item sm={6}>
                    <Card className="budget-table-content-box">
                      <Box className="header">
                        <h4>{t("Collected Fees")}</h4>
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
                        <h4>SR 12,000</h4>
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
