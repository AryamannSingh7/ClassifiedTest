import React from "react";
import { withTranslation } from "react-i18next";
import RentedAndEmptyController, { Props } from "./RentedAndEmptyController.web";
import { Box, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
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
                    {this.state.isRentedUnit ? <span>{t("Rented Unit")}</span> : <span>{t("Empty Unit")}</span>}
                  </Box>
                </Box>
                <Container>
                  <Box className="tenant-list-box">
                    <Box className="tenant-list total-expense">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <RentedVsEmptyUnitCard
                            heading="Green Villa Park, Dubai"
                            titleOne="Rented"
                            valueOne="06"
                            titleTwo="Empty"
                            valueTwo="00"
                            status=""
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RentedVsEmptyUnitCard
                            heading="Vincent Park, New York"
                            titleOne="Rented"
                            valueOne="06"
                            titleTwo="Empty"
                            valueTwo="00"
                            status=""
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

export default withTranslation()(withStyles(TotalExpenseStyle)(RentedAndEmpty));
