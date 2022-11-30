import React from "react";
import { withTranslation } from "react-i18next";
import TotalExpenseController, { Props } from "./TotalExpenseController.web";
import { Box, Card, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ExpenseIcon, FilterIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import ExpenseCard from "../../../../components/src/ExpenseCard.web";
import { Menu } from "@szhsin/react-menu";

class TotalExpense extends TotalExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.totalExpense}>
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
                            <select name="" id="">
                              <option value="">2021</option>
                              <option value="">2022</option>
                              <option value="">2023</option>
                              <option value="">2024</option>
                              <option value="">2025</option>
                              <option value="">2026</option>
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
                                <h4>Total Expenses</h4>
                                <h4 className="amount">SR 50,000</h4>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Categorywise Expense Report</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Electricity" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Plumbing" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Maintenance" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Cleaning Service" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Misc" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Unitwise Expense Report</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Unit 101 Building 5" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Unit 101 Building 5" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Unit 101 Building 5" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Unit 101 Building 5" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Citywise Expense Report</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Dubai" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="New York" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="London" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                        <Grid item xs={6}>
                          <ExpenseCard heading="Chicago" title="Total Expenses" value="SR 1,500" />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <OwnerSidebarImage />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(TotalExpenseStyle)(TotalExpense));
