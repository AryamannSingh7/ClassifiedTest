import React from "react";
import { withTranslation } from "react-i18next";
import TotalExpenseController, { Props } from "./TotalExpenseController.web";
import { Box, Card, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ExpenseIcon, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { handleFilterValue, handleSelectFilterList } from "./FilterComponent.web";
import { Menu } from "@szhsin/react-menu";
import ExpenseCard from "../../../../components/src/ExpenseCard";
import { ICategoryExpense, ICityExpense, IUnitExpense } from "../../../../framework/src/Interfaces/IExpenseReport.web";
import Loader from "../../../../components/src/Loader.web";

class TotalExpense extends TotalExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F7F9FE" }} className={classes.totalExpense}>
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
                    <span className="bold-text">{t("Total Expenses")}</span>
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
                            <h4 className="bold-text">
                              {this.state.selectedYear} {t("Expense Report")}
                            </h4>
                            <select
                              name="year"
                              id="year"
                              value={handleFilterValue(this.state)}
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
                              {handleSelectFilterList(this.state)}
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
                                <h4 className="bold-text">{t("Total Expenses")}</h4>
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
                            <h4 className="bold-text">{t("Categorywise Expense Report")}</h4>
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
                                title={t("Total Expenses")}
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
                            <h4 className="bold-text">{t("Unitwise Expense Report")}</h4>
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
                                  heading={`${t("Unit")} ${expense.unit_name} ${t("Building")} ${
                                    expense.building_name
                                  }`}
                                  title={t("Total Expenses")}
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
                            <h4 className="bold-text">{t("Citywise Expense Report")}</h4>
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
                                title={t("Total Expenses")}
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
