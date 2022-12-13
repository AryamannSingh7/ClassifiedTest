// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RegisterPropertyManagerController, { Props } from "./RegisterPropertyManagerController.web";
import { withTranslation } from "react-i18next";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import { BuildingLogo, SuccessIcon } from "./assets";

class RegisterPropertyManagerSuccess extends RegisterPropertyManagerController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes, t } = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.registerManager}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.props.navigation.navigate("PropertyManagerList")}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="success-page">
                    <img src={SuccessIcon} alt="" />
                    <h4>{t("Property Manager added Successfully")}</h4>
                    <p>
                      {t(
                        "Property Manager has been added successfully to manage your property. He will receive link to register himself using the provided email address and mobile number."
                      )}
                    </p>
                  </Box>
                  <div className="next-button">
                    <Button onClick={() => this.props.navigation.navigate("PropertyManagerList")}>{t("Okay")}</Button>
                  </div>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(RegisterPropertyManagerSuccess));
// Customizable Area End
