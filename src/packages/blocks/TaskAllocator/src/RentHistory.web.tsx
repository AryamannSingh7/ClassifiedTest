import React from "react";
import { withTranslation } from "react-i18next";
import RentHistoryController, { Props } from "./RentHistoryController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import { Box, Card, Checkbox, Container, Divider, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, DeleteRentIcon } from "./assets";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";

class RentHistory extends RentHistoryController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {}

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.tenantDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Rent History")}</span>
                  </div>
                  <div className="right-icon">
                    <p>{t("Select All")}</p>
                    <img src={DeleteRentIcon} alt="" />
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="rent-history-box">
                      <Box className="rent-history">
                        <Box className="header">
                          <Box className="left-side">
                            <h4>Mr. Mohd Khan</h4>
                            <p className="date">Tenant Name</p>
                          </Box>
                          <Checkbox checked={true} icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />
                        </Box>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                      <Box className="rent-history">
                        <Box className="header">
                          <Box className="left-side">
                            <h4>Mr. Mohd Khan</h4>
                            <p className="date">Tenant Name</p>
                          </Box>
                          <Checkbox checked={true} icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />
                        </Box>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                      <Box className="rent-history">
                        <Box className="header">
                          <Box className="left-side">
                            <h4>Mr. Mohd Khan</h4>
                            <p className="date">Tenant Name</p>
                          </Box>
                          <Checkbox checked={true} icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />
                        </Box>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                      <Box className="rent-history">
                        <Box className="header">
                          <Box className="left-side">
                            <h4>Mr. Mohd Khan</h4>
                            <p className="date">Tenant Name</p>
                          </Box>
                          <Checkbox checked={true} icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />
                        </Box>
                        <Divider />
                        <Box className="info">
                          <p>{t("Rent Amount")}</p>
                          <span>$123</span>
                        </Box>
                        <Box className="info">
                          <p>{t("Received Amount")}</p>
                          <span>$123</span>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(MyUnitStyle)(RentHistory));
