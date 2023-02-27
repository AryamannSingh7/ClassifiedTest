import React from "react";
import { withTranslation } from "react-i18next";
import RentedAndEmptyController, { Props } from "./RentedAndEmptyController.web";
import { Box, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import RentedVsEmptyUnitCard from "../../../../components/src/ExpenseCard/RentedVsEmptyUnitCard.web";

class RentedAndEmpty extends RentedAndEmptyController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F7F9FE" }} className={classes.totalExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <Link href="/RentedVsEmpty">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    {this.state.isRentedUnit ? (
                      <span className="bold-text">{t("Rented Unit")}</span>
                    ) : (
                      <span className="bold-text">{t("Empty Unit")}</span>
                    )}
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        {this.state.unitData.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="rented-empty-card">{t("No data available")}</Card>
                          </Grid>
                        )}
                        {this.state.unitData.map((unit: any) => {
                          return (
                            <Grid item xs={12} key={unit.id}>
                              <RentedVsEmptyUnitCard
                                heading={`${unit.attributes.building_management.name}, ${
                                  unit.attributes.society_management.name
                                }, ${unit.attributes.address[0].city}`}
                                titleOne={t("Unit Number")}
                                valueOne={unit.attributes.apartment_name}
                                titleTwo={t("Floor Number")}
                                valueTwo={unit.attributes.floor_number}
                                status=""
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

export default withTranslation()(withStyles(TotalExpenseStyle)(RentedAndEmpty));
