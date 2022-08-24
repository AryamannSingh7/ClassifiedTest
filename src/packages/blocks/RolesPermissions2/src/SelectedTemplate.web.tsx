// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Button,
  Container,
  IconButton,
  // Link,
  withStyles,
  Box,
  Grid,
  Tab,
  MenuItem,
  Card,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import CommonCreateController, { Props } from "./CommonCreateController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TemplateIcon from "../assets/template.png";

class SelectedTemplate extends CommonCreateController {
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
