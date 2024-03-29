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
import moment from "moment";
import Loader from "../../../components/src/Loader.web";

class TenantDetails extends TenantListController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const tenant_id = this.props.navigation.getParam("id");
    this.setState({ tenantId: tenant_id }, () => {
      this.getTenantDetails();
    });
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

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
                    <span className="bold-text">{t("Tenant")}</span>
                  </div>
                  <div className="right-icon">
                    <img src={DeleteIcon} alt="" onClick={() => this.handleDeleteTenant()} />
                    <img
                      src={EditIcon}
                      alt=""
                      onClick={() => this.props.navigation.navigate("EditTenant", { id: this.state.tenantId })}
                    />
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="detail">
                      <h4 className="bold-text">{t("Tenant Details")}</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={TenantName} alt="" />
                              <Box className="item-data">
                                <span>{t("Tenant Name")}</span>
                                <p className="bold-text">{this.state.tenantData.tenantName || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={TenantType} alt="" />
                              <Box className="item-data">
                                <span>{t("Tenant Type")}</span>
                                <p className="bold-text">{this.state.tenantData.tenantType || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={BuildingName} alt="" />
                              <Box className="item-data">
                                <span>{t("Building Name")}</span>
                                <p className="bold-text">{this.state.tenantData.buildingName || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={UnitNumber} alt="" />
                              <Box className="item-data">
                                <span>{t("Unit Number")}</span>
                                <p className="bold-text">{this.state.tenantData.unitNumber || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={CityIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("City")}</span>
                                <p className="bold-text">{this.state.tenantData.city || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={PhoneNumber} alt="" />
                              <Box className="item-data">
                                <span>{t("Phone Number")}</span>
                                <p className="bold-text">{this.state.tenantData.phoneNumber || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={EmailIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Email Address")}</span>
                                <p className="bold-text">{this.state.tenantData.email || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={LeaseIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("Lease Issued")}</span>
                                <p className="bold-text">
                                  {this.state.tenantData.isLeaseIssued ? `${t("Yes")}` : `${t("No")}`}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="detail">
                      <h4 className="bold-text">{t("Identity Proof")}</h4>
                      <Card className="detail-box">
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={IdType} alt="" />
                              <Box className="item-data">
                                <span>{t("ID Type")}</span>
                                <p className="bold-text">{this.state.tenantData.IdType || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="info-item">
                              <img src={IdNumber} alt="" />
                              <Box className="item-data">
                                <span>{t("ID Number")}</span>
                                <p className="bold-text">{this.state.tenantData.IdNumber || "-"}</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="info-item">
                              <img src={CalenderIcon} alt="" />
                              <Box className="item-data">
                                <span>{t("ID Expiration Date")}</span>
                                <p className="bold-text">
                                  {moment(this.state.tenantData.IdExpDate, "YYYY-MM-DD").format("MMMM DD, YYYY") || "-"}
                                </p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="pdf-list-box">
                      <Grid container spacing={2}>
                        {this.state.tenantData.documentList.map((document: any) => {
                          return (
                            <Grid item xs={12} key={document.file_name}>
                              <Card className="pdf-card">
                                <Box className="heading">
                                  <img src={PdfIcon} alt="" />
                                  <span className="bold-text">{document?.file_name?.split(".")[0] || "Contract"}</span>
                                </Box>
                                <Link href={document.url} target="_blank">
                                  <img src={DownloadIcon} alt="" />
                                </Link>
                              </Card>
                            </Grid>
                          );
                        })}
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
