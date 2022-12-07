import React from "react";
import { withTranslation } from "react-i18next";
import RentedVsEmptyController, { Props } from "./RentedVsEmptyController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { DashboardVs } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import UnitCard from "../../../../components/src/ExpenseCard/UnitCard.web";

class RentedVsEmpty extends RentedVsEmptyController {
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
                    <span>{t("Rented vs Empty Unit")}</span>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="big-box">
                            <div className="content-box">
                              <div className="left-content">
                                <h4 className="heading">{t("Rented")}</h4>
                                <div className="state">
                                  <p>{t("Rented")}</p>
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
                                <h4 className="heading">{t("Empty Units")}</h4>
                                <div className="state">
                                  <p>{t("Empty")}</p>
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
                            <h4>Citywise Rented vs Empty Units</h4>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard heading="Dubai" titleOne="Rented" valueOne="06" titleTwo="Empty" valueTwo="00" />
                        </Grid>
                        <Grid item xs={12}>
                          <UnitCard heading="London" titleOne="Rented" valueOne="06" titleTwo="Empty" valueTwo="00" />
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

export default withTranslation()(withStyles(TotalExpenseStyle)(RentedVsEmpty));
