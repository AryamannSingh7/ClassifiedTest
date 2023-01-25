// Customizable Area Start
import React from "react";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Card,
} from "@material-ui/core";
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
                      My Dashboards / Budget Dashboard /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Budget 2022
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("Budget Dashboard")}</Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <NativeSelect className="select-year">
                          <option value={2022}>Building 1</option>
                          <option value={2021}>Building 2</option>
                          <option value={2020}>Building 3</option>
                          <option value={2019}>Building 4</option>
                        </NativeSelect>
                      )}
                      <NativeSelect className="select-year">
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    </Box>
                  </Box>
                </Box>
                <Grid container spacing={4} style={{ marginBottom: 30 }}>
                  <Grid item sm={12}>
                    <Card className="budget-table-content-box">
                      <Box className="header">
                        <h4>Budget 2022</h4>
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
export default withTranslation()(withStyles(DashboardStyleWeb)(BudgetDetails));
// Customizable Area End
