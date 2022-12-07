import React from "react";

// Customizable Area Start
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { SuccessExpenseIcon } from "./assets";
import AddEditExpenseController, { Props } from "./AddEditExpenseController.web";
import { withTranslation } from "react-i18next";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
// Customizable Area End

class AddExpenseSuccess extends AddEditExpenseController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { classes, t } = this.props;

    console.log(this.state);

    return (
      // Customizable Area Start
      <>
        <Box className={classes.addEditExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <IconButton onClick={() => this.handleNavigationBackSuccessPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Container className="page-container">
                  <Box className="success-page">
                    <img src={SuccessExpenseIcon} alt="" />
                    <h4>{t("Expense Added")}</h4>
                    <p>{t("Your expense detail added successfully.")}</p>
                  </Box>
                  <Box className="next-button">
                    <Button onClick={() => this.handleNavigationBackSuccessPage()}>{t("Okay")}</Button>
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
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(AddExpenseSuccess));
