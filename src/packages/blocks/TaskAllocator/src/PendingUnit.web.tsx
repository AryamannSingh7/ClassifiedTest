// Customizable Area Start
import React, { useRef } from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, UnderProcessIcon, UnitRegisterCompleteIcon } from "./assets";
import MyUnitListController, { Props } from "./MyUnitListController.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { MyUnitStyle } from "./MyUnitStyle.web";

class PendingUnit extends MyUnitListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.registerUnit}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>Complex Name</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="pending-page">
                    <img src={UnderProcessIcon} alt="" />
                    <h4>{t("Registration Request Under process")}</h4>
                    <p>
                      Your registration request for A-104 of central park Height is sent and under process. You will
                      receive notification once it is processed.
                    </p>
                  </Box>
                  <div className="pending-buttons next-button">
                    <Button>{t("Delete Registration Request")}</Button>
                    <Button className="okay">{t("Okay")}</Button>
                  </div>
                </Container>
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

export default withTranslation()(withStyles(MyUnitStyle)(PendingUnit));
// Customizable Area End
