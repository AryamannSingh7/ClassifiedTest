// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, UnitRegisterCompleteIcon } from "./assets";
import RegisterUnitController, { Props } from "./RegisterUnitController.web";
import { withTranslation } from "react-i18next";
import { MyUnitStyle } from "./MyUnitStyle.web";

class RegisterMyUnitSuccess extends RegisterUnitController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.registerUnit}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.props.navigation.navigate("MyUnitList")}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="success-page">
                    <img src={UnitRegisterCompleteIcon} alt="" />
                    <h4>{t("Unit Added Successfully")}</h4>
                    <p>
                      {t(
                        "A verification ownership request has been sent to the building/complex manger for approval, Upon approval of ownership the unit will be added to his list of units"
                      )}
                    </p>
                  </Box>
                  <div className="next-button">
                    <Button onClick={() => this.props.navigation.navigate("MyUnitList")}>{t("Okay")}</Button>
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

export default withTranslation()(withStyles(MyUnitStyle)(RegisterMyUnitSuccess));
// Customizable Area End
