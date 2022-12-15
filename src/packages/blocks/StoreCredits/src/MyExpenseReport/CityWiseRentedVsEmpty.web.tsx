import React from "react";
import { withTranslation } from "react-i18next";
import CityWiseRentedVsEmptyController, { Props } from "./CityWiseRentedVsEmptyController.web";
import { Box, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SidebarImageComponent from "../../../../components/src/OwnerSidebarImage.web";
import { TotalExpenseStyle } from "./TotalExpenseStyle.web";
import RentedVsEmptyUnitCard from "../../../../components/src/ExpenseCard/RentedVsEmptyUnitCard.web";
import { Menu } from "@szhsin/react-menu";
import { DownArrowIcon } from "../assets";

class CityWiseRentedVsEmpty extends CityWiseRentedVsEmptyController {
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
                        <h4>Dubai</h4>
                        <Box className="right-menu">
                          <Menu
                            align="end"
                            arrow={true}
                            direction="bottom"
                            menuButton={
                              <Box className="select-box">
                                <span>{t("All")}</span>
                                <img src={DownArrowIcon} alt="" />
                              </Box>
                            }
                          >
                            <MenuItem>{t("Rented")}</MenuItem>
                            <MenuItem>{t("Empty")}</MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <RentedVsEmptyUnitCard
                            heading="Green Villa Park, Dubai"
                            titleOne="Rented"
                            valueOne="06"
                            titleTwo="Empty"
                            valueTwo="00"
                            status="Empty"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RentedVsEmptyUnitCard
                            heading="Vincent Park, New York"
                            titleOne="Rented"
                            valueOne="06"
                            titleTwo="Empty"
                            valueTwo="00"
                            status="Rented"
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

export default withTranslation()(withStyles(TotalExpenseStyle)(CityWiseRentedVsEmpty));
