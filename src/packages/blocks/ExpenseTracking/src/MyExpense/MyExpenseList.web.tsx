import React from "react";
import { withTranslation } from "react-i18next";
import MyExpenseListController, { Props } from "./MyExpenseListController.web";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { FilterIcon, RightArrowIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
                  <Box className="right-icon" onClick={() => this.handleFilterModal()}>
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

        <Drawer
          anchor="bottom"
          className="condition-modal"
          open={this.state.isFilterOpen}
          onClose={() => this.handleFilterModal()}
        >
          <Box className="condition-box filter-box">
            <Box className="heading">
              <p>{t("Add More Conditions")}</p>
              <span>{t("Clear All")}</span>
            </Box>
            <Box className="accordion-box">
              <Accordion square expanded={this.state.expanded === "panel1"} onChange={this.handleChange("panel1")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Building 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className="content-box">
                    <Box className="condition">
                      <p>Unit 2</p>
                      <Checkbox
                        className="condition-check"
                        checked={true}
                        onChange={(e: any) => {
                          console.log(e);
                        }}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                      />
                    </Box>
                    <Box className="condition">
                      <p>Unit 2</p>
                      <Checkbox
                        className="condition-check"
                        checked={true}
                        onChange={(e: any) => {
                          console.log(e);
                        }}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <br />
              <Divider />
              <Box className="button-group">
                <Button className="add-button">{t("Apply")}</Button>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </>
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(MyExpenseList));
