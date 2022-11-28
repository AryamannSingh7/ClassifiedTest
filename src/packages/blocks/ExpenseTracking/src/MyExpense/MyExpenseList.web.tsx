import React from "react";
import { withTranslation } from "react-i18next";
import MyExpenseListController, { Props } from "./MyExpenseListController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { FilterIcon, RightArrowIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";

class MyExpenseList extends MyExpenseListController {
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
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("My Expenses")}</span>
                  </Box>
                  <Box className="right-icon">
                    <img src={FilterIcon} alt="filter" />
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Link href={`/MyExpenseList/1`}>
                            <Card className="tenant">
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Box className="header">
                                    <h4>Building 1 Unit 1</h4>
                                    <Box className="right-menu">
                                      <img src={RightArrowIcon} alt="" />
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                              <Grid container spacing={2} className="info">
                                <Grid item xs={12}>
                                  <span>{t("City")}:</span>
                                  <p>Dubai</p>
                                </Grid>
                              </Grid>
                            </Card>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Link href="/AddExpense">
                            <Button>{t("Add new Expense")}</Button>
                          </Link>
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

export default withTranslation()(withStyles(ExpenseTrackingStyle)(MyExpenseList));
