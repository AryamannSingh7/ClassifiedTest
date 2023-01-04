import React from "react";
import { withTranslation } from "react-i18next";
import TotalExpenseController, { Props } from "./TotalExpenseController.web";
import { Box, Card, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ExpenseIcon, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { Menu } from "@szhsin/react-menu";
import ExpenseCard from "../../../../components/src/ExpenseCard";
import { ICategoryExpense, ICityExpense, IUnitExpense } from "../../../../framework/src/Interfaces/IExpenseReport.web";

class TotalExpense extends TotalExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;

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
                    <span>{t("Total Expenses")}</span>
                  </Box>
                  <Box className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="filter" />
                        </IconButton>
                      }
                    >
                      <MenuItem>{t("Yearly")}</MenuItem>
                      <MenuItem>{t("Quarterly")}</MenuItem>
                      <MenuItem>{t("Monthly")}</MenuItem>
                    </Menu>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>2021 Expense Report</h4>
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
                          <Card className="main-box">
                            <Box className="expense-card-box">
                              <Box className="image-box">
                                <img src={ExpenseIcon} alt="" />
                              </Box>
                              <Box className="content-box">
                                <h4>{t("Total Expenses")}</h4>
                                <h4 className="amount">
                                  {this.validateCurrency(
                                    this.state.totalExpense.currency,
                                    this.state.totalExpense.expense
                                  )}
                                </h4>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Categorywise Expense Report")}</h4>
                          </Box>
                        </Grid>
                        {this.state.categoryWiseExpense.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="expense-card">{t("No Expense Available")}</Card>
                          </Grid>
                        )}
                        {this.state.categoryWiseExpense.map((expense: ICategoryExpense) => {
                          return (
                            <Grid item xs={6} key={expense.title}>
                              <ExpenseCard
                                heading={expense.title}
                                title="Total Expenses"
                                value={this.validateCurrency(expense.currency, expense.expenses)}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Unitwise Expense Report")}</h4>
                          </Box>
                        </Grid>
                        {this.state.unitWiseExpense.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="expense-card">{t("No Expense Available")}</Card>
                          </Grid>
                        )}
                        {this.state.unitWiseExpense.map((expense: IUnitExpense) => {
                          return (
                            <Grid item xs={6} key={expense.id}>
                              <Link href={`/TotalExpense/${expense.id}`}>
                                <ExpenseCard
                                  heading={`Unit ${expense.unit_name} Building ${expense.building_name}`}
                                  title="Total Expenses"
                                  value={this.validateCurrency(expense.currency, expense.expenses)}
                                />
                              </Link>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Citywise Expense Report")}</h4>
                          </Box>
                        </Grid>
                        {this.state.cityWiseExpense.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="expense-card">{t("No Expense Available")}</Card>
                          </Grid>
                        )}
                        {this.state.cityWiseExpense.map((expense: ICityExpense, index: number) => {
                          return (
                            <Grid item xs={6} key={expense.city_name}>
                              <ExpenseCard
                                heading={expense.city_name}
                                title="Total Expenses"
                                value={this.validateCurrency(expense.currency, expense.expenses)}
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

export default withTranslation()(withStyles(TotalExpenseStyle)(TotalExpense));
