import React from "react";

// Customizable Area Start
import { withTranslation } from "react-i18next";
import MyExpenseListController, { IBuilding, IExpenseBuilding, IUnit, Props } from "./MyExpenseListController.web";
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
import { FilterIcon, RightArrowIcon } from "./assets";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Loader from "../../../components/src/Loader.web";
// Customizable Area End

class MyExpenseList extends MyExpenseListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const { t, classes } = this.props;

    console.log(this.state);

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
                    <IconButton onClick={() => this.handleNavigationToOwnerDashboard()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("My Expenses")}</span>
                  </Box>
                  <IconButton className="right-icon" onClick={() => this.handleFilterModal()}>
                    <img src={FilterIcon} alt="filter" />
                  </IconButton>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list">
                      <Grid container spacing={2}>
                        {this.state.expenseBuildingList.map((building: IExpenseBuilding) => {
                          return (
                            <Grid item xs={12} key={building.id}>
                              <Link href={`/MyExpenseList/${building.attributes.apartment_management.id}`}>
                                <Card className="tenant">
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                      <Box className="header">
                                        <h4>
                                          Building {building.attributes.building_management.name} Unit{" "}
                                          {building.attributes.apartment_management.apartment_name}
                                        </h4>
                                        <Box className="right-menu">
                                          <img src={RightArrowIcon} alt="" />
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2} className="info">
                                    <Grid item xs={12}>
                                      <span>{t("City")}:</span>
                                      <p>{building.attributes.building_management.city || "N/A"}</p>
                                    </Grid>
                                  </Grid>
                                </Card>
                              </Link>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                    <Box className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Button onClick={() => this.handleNavigationToAddExpense()}>{t("Add new Expense")}</Button>
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
              <p>{t("Add More Conditions")}</p>
              <span onClick={() => this.handleClearFilter()}>{t("Clear All")}</span>
            </Box>
            <Box className="accordion-box">
              {this.state.buildingList.length === 0 && <p>{t("No unit available")}</p>}
              {this.state.buildingList.map((building: IBuilding) => {
                return (
                  <Accordion
                    key={building.id}
                    square
                    expanded={this.state.expanded === building.id}
                    onChange={this.handleChangeFilterAccordion(building.id)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{building.attributes.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="content-box">
                        {building.attributes.apartment_managements.map((unit: IUnit) => {
                          return (
                            <Box key={unit.id} className="condition">
                              <p>{unit.apartment_name}</p>
                              <Checkbox
                                className="condition-check"
                                checked={this.state.unitList.includes(unit.id)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  this.handleChangeCheckboxEvent(e, unit.id);
                                }}
                                icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />}
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              <br />
              <Divider />
              <Box className="button-group">
                <Button className="add-button" onClick={() => this.handleApplyFilter()}>
                  {t("Apply")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </>
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(MyExpenseList));
