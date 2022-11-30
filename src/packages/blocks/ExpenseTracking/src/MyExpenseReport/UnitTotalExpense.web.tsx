import React from "react";
import { withTranslation } from "react-i18next";
import UnitTotalExpenseController, { Props } from "./UnitTotalExpenseController.web";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Link,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ExpenseDateIcon, FilterIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { Menu } from "@szhsin/react-menu";

class UnitTotalExpense extends UnitTotalExpenseController {
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
                    />
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Input
                            value=""
                            name="date"
                            className="date-box"
                            placeholder={t("Start Date")}
                            type="text"
                            onFocus={(e: any) => (e.target.type = "date")}
                            startAdornment={
                              <InputAdornment position="start">
                                <img src={ExpenseDateIcon} alt="" />
                              </InputAdornment>
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Box className="input-date-box">
                            <input
                              value=""
                              name="date"
                              className="select-input input"
                              placeholder={t("End Date")}
                              type="text"
                              onFocus={(e: any) => (e.target.type = "date")}
                            />
                            <img src={ExpenseDateIcon} alt="" />
                          </Box>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>10-12-2022</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="expense-card">
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Cost</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Issue</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Category</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Building Name</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Unit Number</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="unit-expense-card-box">
                                  <span>Resolved By</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="unit-expense-card-box">
                                  <span>Summary</span>
                                  <p>SR 400</p>
                                </Box>
                              </Grid>
                            </Grid>
                          </Card>
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

export default withTranslation()(withStyles(TotalExpenseStyle)(UnitTotalExpense));
