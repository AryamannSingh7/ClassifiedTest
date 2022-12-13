import React from "react";

// Customizable Area Start
import { withTranslation } from "react-i18next";
import UnitExpenseListController, { IExpense, IExpenseCategory, Props } from "./UnitExpenseListController.web";
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
  MenuItem,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { FilterIcon, SortIcon } from "./assets";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import moment from "moment";
import Loader from "../../../components/src/Loader.web";
// Customizable Area End

class UnitExpenseList extends UnitExpenseListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { t, classes } = this.props;

    return (
      // Customizable Area Start
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF" }} className={classes.myExpenseList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <IconButton onClick={() => this.handleNavigationToExpense()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>
                      Building {this.state.buildingName} Unit {this.state.unitName}
                    </span>
                  </Box>
                  <Box className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="" />
                        </IconButton>
                      }
                    >
                      <MenuItem onClick={() => this.handleSortFilter("asc")}>{t("Acs")}</MenuItem>
                      <MenuItem onClick={() => this.handleSortFilter("desc")}>{t("Desc")}</MenuItem>
                    </Menu>
                    <IconButton onClick={() => this.handleFilterModal()}>
                      <img src={FilterIcon} alt="filter" />
                    </IconButton>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list">
                      <Grid container spacing={2}>
                        {this.state.expenseList.map((expense: IExpense) => {
                          return (
                            <Grid item xs={12} key={expense.id}>
                              <Card className="tenant">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <Box className="header">
                                      <h4>
                                        {moment(expense.attributes.expense_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                      </h4>
                                      <Box className="right-menu">
                                        <Menu
                                          menuButton={
                                            <IconButton>
                                              <MoreVertIcon />
                                            </IconButton>
                                          }
                                        >
                                          <MenuItem onClick={() => this.handleNavigationToDetails(expense.id)}>
                                            {t("View")}
                                          </MenuItem>
                                          <MenuItem onClick={() => this.handleNavigationToEditExpense(expense.id)}>
                                            {t("Edit")}
                                          </MenuItem>
                                          <MenuItem onClick={() => this.handleDeleteExpense(expense.id)}>
                                            {t("Delete")}
                                          </MenuItem>
                                        </Menu>
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2} className="info">
                                  <Grid item xs={6}>
                                    <span>{t("Cost")}:</span>
                                    <p>
                                      {expense.attributes.address.currency + " " + expense.attributes.expense_amount}
                                    </p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{t("Issue")}:</span>
                                    <p>{expense.attributes.issue_title}</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{t("Category")}:</span>
                                    <p>{expense.attributes.expense_category.title}</p>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <span>{t("Resolved By")}:</span>
                                    <p>{expense.attributes.resolved_by}</p>
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                    <Box className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Button onClick={() => this.handleNavigationToAddExpense()}>
                            {t("Add Another Expense")}
                          </Button>
                        </Grid>
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
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(UnitExpenseList));
