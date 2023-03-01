// Customizable Area Start
import React from "react";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { Container, Typography, withStyles, Card, Link, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import DashboardBudgetController, { Props } from "./DashboardBudgetController.web";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { withTranslation } from "react-i18next";
import { ROLE } from "../../../framework/src/Enum";

function createData(Name: any, Amount: any) {
  return { Name, Amount };
}

const rows = [
  createData("Sales Revenue", 10000),
  createData("Cost of Services Sold", 2300),
  createData("Operating Expenses", 26285),
  createData("Operating Income", 30050),
  createData("Other Revenue and Expenses", 10356),
  createData("Sales Revenue", 10000),
  createData("Cost of Services Sold", 2300),
  createData("Operating Expenses", 26285),
  createData("Operating Income", 30050),
  createData("Other Revenue and Expenses", 10356),
];

class BudgetDetails extends DashboardBudgetController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getBudgetDashboardYearList();
    this.getAllBuildingList();
    this.getBudgetDetails();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filterBuilding !== this.state.filterBuilding || prevState.filterYear !== this.state.filterYear) {
      this.getBudgetDetails();
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
                      {t("My Dashboards")} / <Link href="/DashboardBudget">{t("Budget Dashboard")}</Link> /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Budget")} {this.state.filterYear}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="bold-text">
                      {t("Budget")} {this.state.filterYear}
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
                <Grid container spacing={4} style={{ marginBottom: 30 }}>
                  <Grid item sm={12}>
                    <Card className="budget-table-content-box" id="budget-details">
                      <Box className="header">
                        <h4 className="bold-text">
                          {t("Budget")} {this.state.filterYear}
                        </h4>
                      </Box>
                      <hr />
                      <Box className="body">
                        <Box className="table-header">
                          <span>{t("Name")}</span>
                          <span>{t("Amount")}</span>
                        </Box>
                        {this.state.facility.map((facility: any) => (
                          <Box className="table-content" key={facility.id}>
                            <p>{facility.budget_category}</p>
                            <span className="bold-text">
                              {this.state.currency} {facility.allocate_budget}
                            </span>
                          </Box>
                        ))}
                      </Box>
                      <hr />
                      <Box className="footer">
                        <p>{t("Approved Amount")}</p>
                        <h4 className="bold-text">
                          {this.state.currency} {this.state.approveAmount}
                        </h4>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
                {userType === ROLE.MANAGER && (
                  <Box className="print-report-box">
                    <Button
                      onClick={() => {
                        window.print();
                        // let printContents: any = window.document.getElementById("budget-details");
                        // if (printContents != null) {
                        //   printContents = printContents.innerHTML;
                        //   var originalContents = document.body.innerHTML;
                        //   document.body.innerHTML = printContents;
                        //   document.body.innerHTML = originalContents;
                        // }
                      }}
                    >
                      {t("Print Report")}
                    </Button>
                  </Box>
                )}
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(BudgetDetails));
// Customizable Area End
