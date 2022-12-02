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
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { EditIcon, DeleteIcon, DeleteExpenseIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";

class ExpenseDetail extends ExpenseDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.myExpenseList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <Link href="/MyExpenseList/1">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Expense Details")}</span>
                  </Box>
                  <Box className="right-icon">
                    <IconButton onClick={() => this.handleExpenseModal()}>
                      <img src={DeleteIcon} alt="filter" />
                    </IconButton>
                    <IconButton onClick={() => this.props.navigation.navigate("EditExpense", { id: 1 })}>
                      <img src={EditIcon} alt="filter" />
                    </IconButton>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4 style={{ marginBottom: "15px" }}>20-06-2022</h4>
                          <Card className="tenant">
                            <Grid container spacing={2} className="info expense-details">
                              <Grid item xs={6}>
                                <span>{t("Cost")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Issue")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Category")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Building")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Unit Number")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Resolved By")}</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("Summary")}</span>
                                <p>Dubai</p>
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
                <Button>{t("Yes, Delete")}</Button>
                <Button onClick={() => this.handleExpenseModal()}>{t("No, Don’t Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(ExpenseDetail));
