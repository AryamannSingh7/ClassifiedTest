// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SelectedTemplateController, { Props } from "./SelectedTemplateController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class SelectedTemplate extends SelectedTemplateController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log();

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.commonPage}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.goBackPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    Issue a Lease
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
                      <Link to="/IssueContract/1/LeaseForm">
                        <Button>Use This Template</Button>
                      </Link>
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
