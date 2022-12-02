// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { SuccessExpenseIcon } from "../assets";
import AddEditExpenseController, { Props } from "./AddEditExpenseController.web";
import { withTranslation } from "react-i18next";
import "../../../../web/src/i18n.js";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";

class AddExpenseSuccess extends AddEditExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.addEditExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.props.navigation.navigate("MyExpenseList")}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="success-page">
                    <img src={SuccessExpenseIcon} alt="" />
                    <h4>{t("Expense Added")}</h4>
                    <p>{t("Your expense detail added successfully.")}</p>
                  </Box>
                  <div className="next-button">
                    <Button onClick={() => this.props.navigation.navigate("MyExpenseList")}>{t("Okay")}</Button>
                  </div>
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

export default withTranslation()(withStyles(ExpenseTrackingStyle)(AddExpenseSuccess));
// Customizable Area End
