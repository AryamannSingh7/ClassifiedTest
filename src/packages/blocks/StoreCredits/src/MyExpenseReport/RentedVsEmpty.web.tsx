import React from "react";
import { withTranslation } from "react-i18next";
import RentedVsEmptyController, { Props } from "./RentedVsEmptyController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { DashboardVs } from "../assets";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import UnitCard from "../../../../components/src/ExpenseCard/UnitCard.web";
import { ICityWiseRentedEmpty } from "../../../../framework/src/Interfaces/IExpenseReport.web";

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
                              <Link href="/RentedVsEmpty/Rented">
                                <div className="left-content">
                                  <h4 className="heading">{t("Rented")}</h4>
                                  <div className="state">
                                    <p>{t("Rented")}</p>
                                    <Button className="yellow">{this.state.rentedUnit}</Button>
                                  </div>
                                </div>
                              </Link>
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
                              <Link href="/RentedVsEmpty/Empty">
                                <div className="right-content">
                                  <h4 className="heading">{t("Empty Units")}</h4>
                                  <div className="state">
                                    <p>{t("Empty")}</p>
                                    <Button className="yellow">{this.state.emptyUnit}</Button>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box className="heading">
                            <h4>{t("Citywise Rented vs Empty Units")}</h4>
                          </Box>
                        </Grid>
                        {this.state.cityWiseRentedVsEmpty.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="rented-empty-card">{t("City data not available")}</Card>
                          </Grid>
                        )}
                        {this.state.cityWiseRentedVsEmpty.map((city: ICityWiseRentedEmpty) => {
                          return (
                            <Grid item xs={12} key={city.city_name}>
                              <UnitCard
                                heading={city.city_name}
                                titleOne={t("Rented")}
                                valueOne={city.rented}
                                titleTwo={t("Empty")}
                                valueTwo={city.empty}
                              />
                            </Grid>
                          );
                        })}
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
