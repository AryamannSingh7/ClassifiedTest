// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  MenuItem,
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
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import BuildingDocumentListController, {
  Props,
} from "./BuildingDocumentListController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";

import UploadImage from "../assets/upload.png";
import DeleteImage from "../assets/delete.png";
import NoPdf from "../assets/no-pdf.png";
import BuildingLogo from "../assets/building.png";
import PdfImage from "../assets/pdf.png";
import ShareImage from "../assets/share.png";
import DownloadImage from "../assets/download.png";

class BuildingDocumentList extends BuildingDocumentListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box
          className={classes.buildingDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
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
                Rent Contract
              </Box>
              <Container className="content-area document-box list">
                <div className="personal-documents">
                  {/* <div className="empty-list">
                    <div className="content-box">
                      <img src={NoPdf} />
                      <h3>No Document Found</h3>
                    </div>
                  </div> */}
                  <Grid container spacing={2} className="">
                    <Grid item xs={12} md={6} lg={6}>
                      <Card className="card-item">
                        <div className="heading">
                          <h4>Resolution Title</h4>
                        </div>
                        <div className="res-info">
                          <div className="info-item">
                            <p>Date & Time</p>
                            <span>Date & Time</span>
                          </div>
                          <div className="info-item">
                            <p>Building</p>
                            <span>Building</span>
                          </div>
                        </div>
                        <div className="meeting-item">
                          <div className="item-title">
                            <img src={PdfImage} />
                            <h6>Policy</h6>
                          </div>
                          <div className="icons">
                            <img src={ShareImage} />
                            <img src={DownloadImage} />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Card className="card-item">
                        <div className="heading">
                          <h4>Resolution Title</h4>
                        </div>
                        <div className="res-info">
                          <div className="info-item">
                            <p>Date & Time</p>
                            <span>Date & Time</span>
                          </div>
                          <div className="info-item">
                            <p>Building</p>
                            <span>Building</span>
                          </div>
                        </div>
                        <div className="meeting-item">
                          <div className="item-title">
                            <img src={PdfImage} />
                            <h6>Policy</h6>
                          </div>
                          <div className="icons">
                            <img src={ShareImage} />
                            <img src={DownloadImage} />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Card className="card-item">
                        <div className="heading">
                          <h4>Resolution Title</h4>
                        </div>
                        <div className="res-info">
                          <div className="info-item">
                            <p>Date & Time</p>
                            <span>Date & Time</span>
                          </div>
                          <div className="info-item">
                            <p>Building</p>
                            <span>Building</span>
                          </div>
                        </div>
                        <div className="meeting-item">
                          <div className="item-title">
                            <img src={PdfImage} />
                            <h6>Policy</h6>
                          </div>
                          <div className="icons">
                            <img src={ShareImage} />
                            <img src={DownloadImage} />
                          </div>
                        </div>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact/12/view">
                          <div className="left-side">
                            <div className="image">
                              <img src={PdfImage} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              {/* <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div> */}
                            </div>
                          </div>
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact/12/view">
                          <div className="left-side">
                            <div className="image">
                              <img src={PdfImage} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              {/* <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div> */}
                            </div>
                          </div>
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <Link href="/PersonalDocument/Rent-Contact/12/view">
                          <div className="left-side">
                            <div className="image">
                              <img src={PdfImage} />
                            </div>
                            <div className="info">
                              <h4>Rent Contract</h4>
                              {/* <div className="more-info">
                                <p>
                                  <span>55</span>pages
                                </p>
                                <p>
                                  <span>5</span>MB
                                </p>
                                <p>08/12/2022</p>
                              </div> */}
                            </div>
                          </div>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
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

export default withStyles(DocumentReportStyleWeb)(BuildingDocumentList);
// Customizable Area End
