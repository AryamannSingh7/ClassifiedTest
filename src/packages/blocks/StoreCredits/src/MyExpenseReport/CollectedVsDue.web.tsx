import React from "react";
import { withTranslation } from "react-i18next";
import CollectedVsDueController, { Props } from "./CollectedVsDueController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { DashboardVs, FilterIcon } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import { Menu } from "@szhsin/react-menu";
import UnitCard from "../../../../components/src/ExpenseCard/UnitCard.web";

class CollectedVsDue extends CollectedVsDueController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.totalExpense}>
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
                    <span>{t("Rent Amount Collected vs Due")}</span>
                  </Box>
                  <Box className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="filter" />
                        </IconButton>
                      }
                    />
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Rent Amount Collected vs Due</h4>
                            <select name="" id="">
                              <option value="">2021</option>
                              <option value="">2022</option>
                              <option value="">2023</option>
                              <option value="">2024</option>
                              <option value="">2025</option>
                              <option value="">2026</option>
                            </select>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="big-box">
                            <div className="content-box">
                              <div className="left-content">
                                <h4 className="heading">{t("Rent Amount Collected")}</h4>
                                <div className="state">
                                  <p>{t("Collected")}</p>
                                  <Button className="yellow">75</Button>
                                </div>
                              </div>
                              <div className="center-content">
                                <div className="image">
                                  <img src={DashboardVs} alt="keyhand" />
                                </div>
                                <div className="vertical-line" />
                                <div className="image text">
                                  <h4>VS</h4>
                                </div>
                                <div className="vertical-line" />
                              </div>
                              <div className="right-content">
                                <h4 className="heading">{t("Rent Amount Due")}</h4>
                                <div className="state">
                                  <p>{t("Due")}</p>
                                  <Button className="yellow">SR 75</Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Unitwise Rent amount collected vs Due Report</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard
                            heading="Unit 202 Buliding 5"
                            titleOne="Collected"
                            valueOne="SR 06"
                            titleTwo="Due"
                            valueTwo="00"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard
                            heading="Unit 202 Buliding 5"
                            titleOne="Collected"
                            valueOne="SR 06"
                            titleTwo="Due"
                            valueTwo="00"
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>Citywise Rent amount collected vs Due Report</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard
                            heading="Dubai"
                            titleOne="Collected"
                            valueOne="SR 06"
                            titleTwo="Due"
                            valueTwo="00"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard
                            heading="London"
                            titleOne="Collected"
                            valueOne="SR 06"
                            titleTwo="Due"
                            valueTwo="00"
                          />
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
      </>
    );
  }
}

export default withTranslation()(withStyles(TotalExpenseStyle)(CollectedVsDue));
