// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, MenuItem, Card } from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerListController, { Props } from "./PropertyManagerListController.web";
import { BuildingLogo, SortIcon, FilterIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

class PropertyManagerList extends PropertyManagerListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.managerList}>
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
                    {t("Property Manager")}
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem>{t("Ascending")}</MenuItem>
                      <MenuItem>{t("Descending")}</MenuItem>
                    </Menu>
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="FilterIcon" />
                        </IconButton>
                      }
                    />
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <div className="content-box">
                      <div className="contracts-list">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Card className="contract">
                              <Box className="new-req-box">
                                <h4>New Request</h4>
                                <Box className="right-side-req-box">
                                  <Button>02</Button>
                                  <NavigateNextIcon />
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                          <Grid item xs={12}>
                            <Card className="contract">
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <div className="header">
                                    <h4>Ali Khan</h4>
                                    <div className="right-menu">
                                      <Menu
                                        menuButton={
                                          <IconButton>
                                            <MoreVertIcon />
                                          </IconButton>
                                        }
                                      />
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={2} className="info">
                                <Grid item xs={12}>
                                  <span>{t("Manages")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                                <Grid item xs={12}>
                                  <span>{t("Company Name")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                                <Grid item xs={12}>
                                  <span>{t("Charges")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                          <Grid item xs={12}>
                            <Card className="contract">
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <div className="header">
                                    <h4>Ali Khan</h4>
                                    <div className="right-menu">
                                      <Menu
                                        menuButton={
                                          <IconButton>
                                            <MoreVertIcon />
                                          </IconButton>
                                        }
                                      />
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={2} className="info">
                                <Grid item xs={12}>
                                  <span>{t("Manages")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                                <Grid item xs={12}>
                                  <span>{t("Company Name")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                                <Grid item xs={12}>
                                  <span>{t("Charges")}</span>
                                  <p>Lorem Ipsum</p>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="upload-button">
                        <Grid container>
                          <Grid item xs={12} md={12}>
                            <Link href="/RegisterPropertyManagers">
                              <Button>{t("Add another property manager")}</Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Box>
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(PropertyManagerList));
// Customizable Area End
