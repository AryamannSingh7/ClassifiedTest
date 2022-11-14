import React from "react";
import { withTranslation } from "react-i18next";
import MyUnitListController, { Props } from "./MyUnitListController.web";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BuildingImage, DeleteUnitIcon, FilterIcon } from "./assets";
import { Menu } from "@szhsin/react-menu";
import { MyUnitStyle } from "./MyUnitStyle.web";

class MyUnitList extends MyUnitListController {
  constructor(props: Props) {
    super(props);
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
                        {this.state.myUnitList.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="tenant">
                              <h6>{t("No Unit Registered")}</h6>
                            </Card>
                          </Grid>
                        )}
                        {this.state.myUnitList.map((unit: any, index: number) => {
                          return (
                            <Grid item xs={12} key={index}>
                              <Card className="tenant">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <Link href={`/MyUnitDetails/${unit.id}`}>
                                        <h4>{unit.attributes.society_management.name}</h4>
                                      </Link>
                                      <div className="right-menu">
                                        <Menu
                                          menuButton={
                                            <IconButton>
                                              <MoreVertIcon />
                                            </IconButton>
                                          }
                                        >
                                          <MenuItem
                                            onClick={() =>
                                              this.props.navigation.navigate("EditMyUnit", { id: unit.id })
                                            }
                                          >
                                            {t("Edit")}
                                          </MenuItem>
                                          <MenuItem>{t("Delete")}</MenuItem>
                                          <MenuItem>{t("Delete Request")}</MenuItem>
                                        </Menu>
                                      </div>
                                    </div>
                                    <span className="city">{unit.attributes.city}</span>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2} className="info">
                                  <Grid item xs={4}>
                                    <span className="header">{t("Unit Number")}</span>
                                    <Button>{unit.attributes.apartment_name}</Button>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <span className="header">{t("Floor Number")}</span>
                                    <Button>{unit.attributes.floor_number}</Button>
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
                          );
                        })}
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

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteUnitModal()}
          open={this.state.isDeleteUnitModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteUnitIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Delete added unit")}?</Typography>
              <Typography variant="body1">
                {t(
                  "Are you sure want to delete added unit details from this app? once deleted you won't be able to view deleted unit again."
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button>{t("Yes, Delete")}</Button>
                <Button onClick={() => this.handleDeleteUnitModal()}>{t("No, Don’t Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(MyUnitStyle)(MyUnitList));
