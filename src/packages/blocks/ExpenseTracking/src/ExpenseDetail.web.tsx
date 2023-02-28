import React from "react";

// Customizable Area Start
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
import moment from "moment";
// Customizable Area End

class ExpenseDetail extends ExpenseDetailController {
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

        <Box style={{ background: "#F7F9FE" }} className={classes.myExpenseList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <IconButton onClick={() => this.handleNavigationToUnitExpenseList()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span className="bold-text">{t("Expense Details")}</span>
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
                          <h4 className="bold-text" style={{ marginBottom: "15px" }}>
                            {moment(this.state.expenseDetails.expenseDate, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                          </h4>
                          <Card className="tenant">
                            <Grid container spacing={2} className="info expense-details">
                              <Grid item xs={6}>
                                <span>{t("Cost")}</span>
                                <p className="bold-text">
                                  {this.state.expenseDetails.currency + " " + this.state.expenseDetails.expenseCost}
                                </p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Issue")}</span>
                                <p className="bold-text">{this.state.expenseDetails.expenseIssue}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Category")}</span>
                                <p className="bold-text">{this.state.expenseDetails.category}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Building")}</span>
                                <p className="bold-text">{this.state.expenseDetails.buildingName}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Unit Number")}</span>
                                <p className="bold-text">{this.state.expenseDetails.unitName}</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Resolved By")}</span>
                                <p className="bold-text">{this.state.expenseDetails.resolvedBy}</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("Summary")}</span>
                                <p className="bold-text">{this.state.expenseDetails.summary}</p>
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
              <Typography variant="h6" className="bold-text">
                {t("Delete registered expense confirmation")}
              </Typography>
              <Typography variant="body1">
                {t(
                  "Are you sure want to delete registered expense from this app? Once deleted you will lose its details"
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleDeleteExpense()}>{t("Yes, Delete")}</Button>
                <Button onClick={() => this.handleExpenseModal()}>{t("No, Don’t Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(ExpenseDetail));
