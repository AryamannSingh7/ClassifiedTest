import React from "react";
import { withTranslation } from "react-i18next";
import TenantListController, { Props } from "./TenantListController.web";
import { TenantStyle } from "./TenantStyle.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BuildingImage, NoTenant } from "./assets";
import { Menu } from "@szhsin/react-menu";

class TenantList extends TenantListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.tenantList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("My Tenants")}</span>
                  </div>
                </Box>

                {/* <Box className="empty-list">
                  <div className="content-box">
                    <img src={NoTenant} />
                    <h3>{t("No Tenant Registered")}</h3>
                    <Box>
                      <p>{t("Looks like you haven’t registered any tenant!")}</p>
                      <p>{t("You can fill form to register tenant by tapping on below button")}</p>
                    </Box>
                  </div>
                  <div className="upload-button">
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <Link href="">
                          <Button>{t("Register A Tenant")}</Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </Box> */}

                <Container>
                  <div className="tenant-list-box">
                    <div className="tenant-list">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div className="header">
                                  <Link href="/Tenant/1">
                                    <h4>aaaaaaa</h4>
                                  </Link>
                                  <div className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("View")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={12}>
                                <span>{t("Name")}:</span>
                                <p>qqqq</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("City")}:</span>
                                <p>qqqq</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("Tenant Type")}:</span>
                                <p>qqqq</p>
                              </Grid>
                              <Grid item xs={12}>
                                <span>{t("Lease Issued")}:</span>
                                <p>qqqq</p>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Link href="/RegisterTenant">
                            <Button>{t("Register Another Tenant")}</Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Container>
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

export default withTranslation()(withStyles(TenantStyle)(TenantList));
