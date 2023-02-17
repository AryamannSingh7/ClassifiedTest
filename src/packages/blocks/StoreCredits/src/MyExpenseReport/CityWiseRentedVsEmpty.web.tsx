import React from "react";
import { withTranslation } from "react-i18next";
import CityWiseRentedVsEmptyController, { Props } from "./CityWiseRentedVsEmptyController.web";
import { Box, Container, Grid, IconButton, Link, MenuItem, withStyles, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import RentedVsEmptyUnitCard from "../../../../components/src/ExpenseCard/RentedVsEmptyUnitCard.web";
import { Menu } from "@szhsin/react-menu";
import { DownArrowIcon } from "../assets";
import Loader from "../../../../components/src/Loader.web";

class CityWiseRentedVsEmpty extends CityWiseRentedVsEmptyController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF" }} className={classes.totalExpense}>
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
                    <span>{t("Citywise Rented vs Empty Units")}</span>
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Box className="city-wise-heading">
                        <h4>{this.state.cityName}</h4>
                        <Box className="right-menu">
                          <Menu
                            align="end"
                            arrow={true}
                            direction="bottom"
                            menuButton={
                              <Box className="select-box">
                                <span>{t(this.state.filter)}</span>
                                <img src={DownArrowIcon} alt="" />
                              </Box>
                            }
                          >
                            <MenuItem onClick={() => this.setState({ loading: true, filter: "Rented" })}>
                              {t("Rented")}
                            </MenuItem>
                            <MenuItem onClick={() => this.setState({ loading: true, filter: "Empty" })}>
                              {t("Empty")}
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      <Grid container spacing={2}>
                        {this.state.unitDataByCity.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="rented-empty-card">{t("No data available")}</Card>
                          </Grid>
                        )}
                        {this.state.unitDataByCity.map((unit: any) => {
                          return (
                            <Grid item xs={12}>
                              <RentedVsEmptyUnitCard
                                heading={`${unit.attributes.building_management.name}, ${unit.attributes.society_management.name}, ${unit.attributes.address[0].city}`}
                                titleOne={t("Unit Number")}
                                valueOne={unit.attributes.apartment_name}
                                titleTwo={t("Floor Number")}
                                valueTwo={unit.attributes.floor_number}
                                status={t(unit.attributes.status)}
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

export default withTranslation()(withStyles(TotalExpenseStyle)(CityWiseRentedVsEmpty));
