// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SelectedTemplateController, { Props } from "./SelectedTemplateController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo } from "./assets";
import { withTranslation } from "react-i18next";

class SelectedTemplate extends SelectedTemplateController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.commonPage}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.goBackPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span className="bold-text">{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box">
                    <div className="template-view">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.template,
                        }}
                      />
                    </div>
                    <div className="upload-button">
                      <Button onClick={() => this.gotoContractFrom()}>{t("Use This Template")}</Button>
                    </div>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(SelectedTemplate));
// Customizable Area End
