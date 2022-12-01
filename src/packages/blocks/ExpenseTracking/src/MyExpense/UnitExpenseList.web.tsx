import React from "react";
import { withTranslation } from "react-i18next";
import UnitExpenseListController, { Props } from "./UnitExpenseListController.web";
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
  Link,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { FilterIcon, SortIcon } from "../assets";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";

class UnitExpenseList extends UnitExpenseListController {
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
                    <Link href="/MyExpenseList">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>Building 1 Unit 1</span>
                  </Box>
                  <Box className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="" />
                        </IconButton>
                      }
                    >
                      <MenuItem>{t("Acs")}</MenuItem>
                      <MenuItem>{t("Desc")}</MenuItem>
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
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Box className="header">
                                  <h4>20-06-2022</h4>
                                  <Box className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem
                                        onClick={() => this.props.navigation.navigate("ExpenseDetail", { id: 1 })}
                                      >
                                        {t("View")}
                                      </MenuItem>
                                      <MenuItem>{t("Edit")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={6}>
                                <span>{t("Cost")}:</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Issue")}:</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Category")}:</span>
                                <p>Dubai</p>
                              </Grid>
                              <Grid item xs={6}>
                                <span>{t("Resolved By")}:</span>
                                <p>Dubai</p>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Link href="/AddExpense">
                            <Button>{t("Add Another Expense")}</Button>
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
            <Box className="content-box">
              <Box className="condition">
                <p>category 1</p>
                <Checkbox
                  className="condition-check"
                  checked={false}
                  onChange={(e: any) => {
                    console.log(e);
                  }}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>category 2</p>
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
            <br />
            <Divider />
            <Box className="button-group">
              <Button className="add-button">{t("Apply")}</Button>
            </Box>
          </Box>
        </Drawer>
      </>
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(UnitExpenseList));
