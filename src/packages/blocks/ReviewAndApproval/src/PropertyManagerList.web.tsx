// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, MenuItem, Card } from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerListController, { Props } from "./PropertyManagerListController.web";
import { BuildingLogo, SortIcon } from "./assets";
import { withTranslation } from "react-i18next";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Loader from "../../../components/src/Loader.web";

class PropertyManagerList extends PropertyManagerListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F7F9FE", height: "100vh", overflowY: "hidden" }} className={classes.managerList}>
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
                    <span className="bold-text">{t("Property Manager")}</span>
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem onClick={() => this.handleSort("asc")}>{t("Ascending")}</MenuItem>
                      <MenuItem onClick={() => this.handleSort("desc")}>{t("Descending")}</MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <div className="content-box">
                      <div className="contracts-list">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Link href="/PropertyManagers/Request">
                              <Card className="contract">
                                <Box className="new-req-box">
                                  <h4 className="bold-text">{t("New Request")}</h4>
                                  <Box className="right-side-req-box">
                                    {this.state.requestPropertyManagerList.length > 0 && (
                                      <Button>{this.state.requestPropertyManagerList.length}</Button>
                                    )}
                                    <NavigateNextIcon />
                                  </Box>
                                </Box>
                              </Card>
                            </Link>
                          </Grid>
                          {this.state.propertyManagerList.length === 0 && (
                            <Grid item xs={12}>
                              <Card className="contract">{t("No Property Manager Available")}</Card>{" "}
                            </Grid>
                          )}
                          {this.state.propertyManagerList.map((propertyManager: any, index: number) => {
                            const building: any[] = propertyManager.attributes.properties.data.map((property: any) => {
                              return `Building ${property.attributes.building_management.name} unit ${
                                property.attributes.apartment_management.apartment_name
                              }`;
                            });
                            return (
                              <Grid item xs={12} key={index}>
                                <Card className="contract manager-card">
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                      <div className="header">
                                        <h4 className="bold-text">{propertyManager.attributes.name || "-"}</h4>
                                        <div className="right-menu">
                                          <Menu
                                            menuButton={
                                              <IconButton>
                                                <MoreVertIcon />
                                              </IconButton>
                                            }
                                          >
                                            <MenuItem
                                              onClick={() => this.handleNavigationToDetails(propertyManager.id)}
                                            >
                                              {t("View")}
                                            </MenuItem>
                                            <MenuItem onClick={() => this.handleNavigationToEdit(propertyManager.id)}>
                                              {t("Edit")}
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() => this.handleDeletePropertyManager(propertyManager.id)}
                                            >
                                              {t("Delete")}
                                            </MenuItem>
                                          </Menu>
                                        </div>
                                      </div>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2} className="info">
                                    <Grid item xs={12}>
                                      <span>{t("Manages")}</span>
                                      <p>{building.toString()}</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <span>{t("Company Name")}</span>
                                      <p>{propertyManager.attributes.company_name || "-"}</p>
                                    </Grid>
                                  </Grid>
                                </Card>
                              </Grid>
                            );
                          })}
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
