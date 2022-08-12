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
  Card,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ViewBuildingDocumentController, {
  Props,
} from "./ViewBuildingDocumentController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";

import DownloadImage from "../assets/download.png";
import BuildingLogo from "../assets/building.png";
import PdfImage from "../assets/pdf.png";
import ShareImage from "../assets/share.png";

class ViewBuildingDocument extends ViewBuildingDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          className={classes.buildingDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box
                display={{ xs: "flex", md: "flex" }}
                className="menu building-document-menu"
              >
                <div>
                  <Link
                    href={
                      localStorage.getItem("userType") === "Owner"
                        ? "/OwnerDashboard"
                        : ""
                    }
                  >
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Link>{" "}
                  Policy
                </div>
                <div>
                  <img src={DownloadImage} alt="download" />
                </div>
              </Box>
              <Container className="content-area document-box">
                <div className="document-view">
                  <iframe src="http://www.africau.edu/images/default/sample.pdf" />
                </div>
                <div className="meeting-item view">
                  <div className="item-title">
                    <img src={PdfImage} />
                    <h6>Policy</h6>
                  </div>
                  <div className="icons">
                    <img src={ShareImage} />
                    <img src={DownloadImage} />
                  </div>
                </div>
                <div className="meeting-details">
                  <h4>Meeting Details</h4>
                  <Card className="card">
                    <p>Date & Time:</p>
                    <span>Date & Time</span>
                    <p>Place:</p>
                    <span>Place</span>
                    <p>Building:</p>
                    <span>Building</span>
                    <p>Agenda:</p>
                    <span>Agenda</span>
                  </Card>
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

export default withStyles(DocumentReportStyleWeb)(ViewBuildingDocument);
// Customizable Area End
