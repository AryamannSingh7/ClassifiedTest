// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ViewPersonalDocumentController, {
  Props,
} from "./ViewPersonalDocumentController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DownloadImage from "../assets/download.png";
import BuildingLogo from "../assets/building.png";

class ViewPersonalDocument extends ViewPersonalDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box
          className={classes.personalDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box
                display={{ xs: "flex", md: "flex" }}
                className="menu personal-document-menu"
              >
                <div className="name">
                  <Link href={`/PersonalDocument/${this.state.documentType}`}>
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Link>{" "}
                  <span>{this.state.documentTitle}</span>
                </div>
                <Link href={this.state.documentDownloadUrl} target="_blank">
                  <IconButton>
                    <img src={DownloadImage} alt="download" />
                  </IconButton>
                </Link>
              </Box>
              <Container className="content-area document-box">
                <div className="document-view">
                  <iframe src={this.state.documentUrl} />
                </div>
              </Container>
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

export default withStyles(DocumentReportStyleWeb)(ViewPersonalDocument);
// Customizable Area End
