// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SelectedTemplateController, {
  Props,
} from "./SelectedTemplateController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import BuildingLogo from "../assets/building.png";

class SelectedTemplate extends SelectedTemplateController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log();

    return (
      <>
        <Box
          style={{ background: "white", height: "100vh" }}
          className={classes.commonPage}
        >
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
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />a
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />a
                      <br />
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
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(ContractsStyleWeb)(SelectedTemplate);
// Customizable Area End
