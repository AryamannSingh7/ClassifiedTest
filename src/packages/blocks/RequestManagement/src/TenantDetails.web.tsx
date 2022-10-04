import React from "react";
import { withTranslation } from "react-i18next";
import TenantListController, { Props } from "./TenantListController.web";
import { TenantStyle } from "./TenantStyle.web";
import { Box, Card, Container, Grid, IconButton, Link, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingImage,
  BuildingName,
  CalenderIcon,
  CityIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  EmailIcon,
  IdNumber,
  IdType,
  LeaseIcon,
  PdfIcon,
  PhoneNumber,
  TenantName,
  TenantType,
  UnitNumber,
} from "./assets";

class TenantDetails extends TenantListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.tenantDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/Tenants">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Tenant")}</span>
                  </div>
                  <div className="right-icon">
                    <img src={DeleteIcon} alt="" />
                    <img src={EditIcon} alt="" />
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="detail">
                      <h4>Tenant Details</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={TenantName} alt="" />
                              <Box className="item-data">
                                <span>Tenant Name</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={TenantType} alt="" />
                              <Box className="item-data">
                                <span>Tenant Type</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BuildingName} alt="" />
                              <Box className="item-data">
                                <span>Building Name</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={UnitNumber} alt="" />
                              <Box className="item-data">
                                <span>Unit Number</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={CityIcon} alt="" />
                              <Box className="item-data">
                                <span>City</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={PhoneNumber} alt="" />
                              <Box className="item-data">
                                <span>Phone Number</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={EmailIcon} alt="" />
                              <Box className="item-data">
                                <span>Email Address</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={LeaseIcon} alt="" />
                              <Box className="item-data">
                                <span>Lease Issued</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="detail">
                      <h4>Identity Proof</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={IdType} alt="" />
                              <Box className="item-data">
                                <span>ID Type</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={IdNumber} alt="" />
                              <Box className="item-data">
                                <span>ID Number</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={CalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>ID Expiration Date</span>
                                <p>Ali Khab</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="pdf-list-box">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="pdf-card">
                            <Box className="heading">
                              <img src={PdfIcon} alt="" />
                              <span>Aadhaar Card</span>
                            </Box>
                            <img src={DownloadIcon} alt="" />
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="pdf-card">
                            <Box className="heading">
                              <img src={PdfIcon} alt="" />
                              <span>Aadhaar Card</span>
                            </Box>
                            <img src={DownloadIcon} alt="" />
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="pdf-card">
                            <Box className="heading">
                              <img src={PdfIcon} alt="" />
                              <span>Aadhaar Card</span>
                            </Box>
                            <img src={DownloadIcon} alt="" />
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </Box>
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

export default withTranslation()(withStyles(TenantStyle)(TenantDetails));
