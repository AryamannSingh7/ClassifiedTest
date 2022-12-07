import React from "react";
import { withTranslation } from "react-i18next";
import ExpenseDetailController, { Props } from "./ExpenseDetailController.web";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { EditIcon, DeleteIcon, DeleteExpenseIcon } from "./assets";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import Loader from "../../../components/src/Loader.web";

class ExpenseDetail extends ExpenseDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF" }} className={classes.myExpenseList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <IconButton onClick={() => this.handleNavigationToUnitExpenseList()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Expense Details")}</span>
                  </Box>
                  <Box className="right-icon">
                    <IconButton onClick={() => this.handleExpenseModal()}>
                      <img src={DeleteIcon} alt="filter" />
                    </IconButton>
                    <IconButton onClick={() => this.handleNavigationToEditExpense()}>
                      <img src={EditIcon} alt="filter" />
                    </IconButton>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4 style={{ marginBottom: "15px" }}>{this.state.expenseDetails.expenseDate}</h4>
                          <Card className="tenant">
                            <Grid container spacing={2} className="info expense-details">
                              <Grid item xs={6}>
                                <span>{t("Cost")}</span>
                                <p>{this.state.expenseDetails.expenseCost}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Issue")}</span>
                                <p>{this.state.expenseDetails.expenseIssue}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Category")}</span>
                                <p>{this.state.expenseDetails.category}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Building")}</span>
                                <p>{this.state.expenseDetails.buildingName}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Unit Number")}</span>
                                <p>{this.state.expenseDetails.unitName}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Resolved By")}</span>
                                <p>{this.state.expenseDetails.resolvedBy}</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("Summary")}</span>
                                <p>{this.state.expenseDetails.summary}</p>
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
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleExpenseModal()}
          open={this.state.isExpenseModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteExpenseIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Delete registered expense confirmation")}</Typography>
              <Typography variant="body1">
                {t(
                  "Are you sure want to delete registered expense from this app? Once deleted you will lose its details"
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleDeleteExpense()}>{t("Yes, Delete")}</Button>
                <Button data-test-id="close-delete-expense-button" onClick={() => this.handleExpenseModal()}>
                  {t("No, Don’t Delete")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(ExpenseDetail));
