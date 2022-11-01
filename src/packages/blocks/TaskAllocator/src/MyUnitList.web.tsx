import React from "react";
import { withTranslation } from "react-i18next";
import MyUnitListController, { Props } from "./MyUnitListController.web";
import { Box, Button, Card, Container, Grid, IconButton, Link, MenuItem, withStyles } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BuildingImage, FilterIcon } from "./assets";
import { Menu } from "@szhsin/react-menu";
import { MyUnitStyle } from "./MyUnitStyle.web";

class MyUnitList extends MyUnitListController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    // this.getTenantList();
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.myUnitList}>
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
                    <span>{t("My Units")}</span>
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="" />
                        </IconButton>
                      }
                    >
                      <MenuItem>{t("Rented")}</MenuItem>
                      <MenuItem>{t("Empty")}</MenuItem>
                      <MenuItem>{t("All")}</MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <div className="tenant-list-box">
                    <div className="tenant-list">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div className="header">
                                  <h4>Complex</h4>
                                  <div className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Edit")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                                <span className="city">city</span>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={4}>
                                <span className="header">{t("Unit Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Floor Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Status")}</span>
                                {/* <Button className="Rented">{t("Rented")}</Button> */}
                                {/* <Button className="Empty">{t("Empty")}</Button> */}
                                <Button className="Pending">{t("Pending")}</Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div className="header">
                                  <h4>Complex</h4>
                                  <div className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Edit")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                                <span className="city">city</span>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={4}>
                                <span className="header">{t("Unit Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Floor Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Status")}</span>
                                {/* <Button className="Rented">{t("Rented")}</Button> */}
                                {/* <Button className="Empty">{t("Empty")}</Button> */}
                                <Button className="Pending">{t("Pending")}</Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div className="header">
                                  <h4>Complex</h4>
                                  <div className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Edit")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                                <span className="city">city</span>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={4}>
                                <span className="header">{t("Unit Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Floor Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Status")}</span>
                                {/* <Button className="Rented">{t("Rented")}</Button> */}
                                {/* <Button className="Empty">{t("Empty")}</Button> */}
                                <Button className="Pending">{t("Pending")}</Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className="tenant">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <div className="header">
                                  <h4>Complex</h4>
                                  <div className="right-menu">
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Edit")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                                <span className="city">city</span>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} className="info">
                              <Grid item xs={4}>
                                <span className="header">{t("Unit Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Floor Number")}</span>
                                <Button>04</Button>
                              </Grid>
                              <Grid item xs={4}>
                                <span className="header">{t("Status")}</span>
                                {/* <Button className="Rented">{t("Rented")}</Button> */}
                                {/* <Button className="Empty">{t("Empty")}</Button> */}
                                <Button className="Pending">{t("Pending")}</Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="upload-button">
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Link href="/RegisterMyUnit">
                            <Button>{t("Register Another Unit")}</Button>
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

export default withTranslation()(withStyles(MyUnitStyle)(MyUnitList));