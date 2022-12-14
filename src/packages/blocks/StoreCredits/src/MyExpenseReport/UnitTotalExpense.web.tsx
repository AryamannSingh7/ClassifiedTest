import React from "react";
import { withTranslation } from "react-i18next";
import UnitTotalExpenseController, { IExpense, IExpenseCategory, Props } from "./UnitTotalExpenseController.web";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Link,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ExpenseDateIcon, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import moment from "moment";

class UnitTotalExpense extends UnitTotalExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.totalExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <Link href="/TotalExpense">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{`Unit ${this.state.unitName} Building ${this.state.buildingName}`}</span>
                  </Box>
                  <Box className="right-icon">
                    <IconButton onClick={() => this.handleFilterModal()}>
                      <img src={FilterIcon} alt="filter" />
                    </IconButton>
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
                      <Box>
                        <Grid container spacing={2}>
                          {this.state.expenseList.map((expense: IExpense) => {
                            return (
                              <Grid item xs={12} key={expense.id}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <Box className="heading">
                                      <h4>
                                        {moment(expense.attributes.expense_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                      </h4>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Card className="expense-card">
                                      <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Cost</span>
                                            <p>{`${expense.attributes.address.currency} ${
                                              expense.attributes.expense_amount
                                            }`}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Issue</span>
                                            <p>{expense.attributes.issue_title}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Category</span>
                                            <p>{expense.attributes.expense_category.title}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Building Name</span>
                                            <p>{expense.attributes.building_management.name}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Unit Number</span>
                                            <p>{expense.attributes.apartment_management.apartment_name}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Box className="unit-expense-card-box">
                                            <span>Resolved By</span>
                                            <p>{expense.attributes.resolved_by}</p>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Box className="unit-expense-card-box">
                                            <span>Summary</span>
                                            <p>{expense.attributes.summary}</p>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Card>
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
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

        <Drawer
          anchor="bottom"
          className="condition-modal"
          open={this.state.isFilterOpen}
          onClose={() => this.handleFilterModal()}
        >
          <Box className="condition-box filter-box">
            <Box className="heading">
              <p>{t("Filter")}</p>
              <span className="clear-all-text" onClick={() => this.handleClearFilter()}>
                {t("Clear All")}
              </span>
            </Box>
            <Box className="content-box">
              {this.state.expenseCategoryList.map((category: IExpenseCategory) => {
                return (
                  <Box className="condition" key={category.id}>
                    <p>{category.title}</p>
                    <Checkbox
                      className="condition-check"
                      checked={this.state.categoryList.includes(category.id)}
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.handleChangeCheckboxEvent(e, category.id);
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
            <br />
            <Divider />
            <Box className="button-group">
              <Button className="add-button" onClick={() => this.handleApplyFilter()}>
                {t("Apply")}
              </Button>
            </Box>
          </Box>
        </Drawer>
      </>
    );
  }
}

export default withTranslation()(withStyles(TotalExpenseStyle)(UnitTotalExpense));
