// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  Typography,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  DialogActions,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
                <div>
                  <Link href={`/PersonalDocument/${this.state.documentType}`}>
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Link>{" "}
                  {this.state.documentTitle}
                </div>
                <Link href={this.state.documentDownloadUrl} target="_blank">
                  <img src={DownloadImage} alt="download" />
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
