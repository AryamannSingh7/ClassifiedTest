import React from "react";
import { withTranslation } from "react-i18next";
import ChairmanNotificationController, { Props } from "./ChairmanNotificationController.web";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from "@material-ui/core";
import { NotificationStyle } from "./NotificationStyle.web";
import DashboardHeaderWeb from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

class ChairmanNotification extends ChairmanNotificationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box className={classes.chairmanNotification} style={{ background: "#F4F7FF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeaderWeb {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <ChairmanSidebarWeb {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Home")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Notifications")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Notifications")}
                    </Typography>
                  </Box>
                </Box>

                <Box className="content-boxes">
                  <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
                    <Tab label={t("Tasks")} />
                    <Tab label={t("Messages")} />
                  </Tabs>
                  <Box className="tab-content">
                    <TabPanel value={this.state.currentTab} index={0}>
                      <>
                        <Box className="tab-content-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="tag-box">
                                  <span className="building">Building 1</span>
                                  <span className="unit">Unit 1</span>
                                  <span className="category">Meeting</span>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <p className="time">20 Mins ago</p>
                                <Button className="view-button">View Document</Button>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="tag-box">
                                  <span className="building">Building 1</span>
                                  <span className="unit">Unit 1</span>
                                  <span className="category">Meeting</span>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <p className="time">20 Mins ago</p>
                                <Button className="view-button">View Document</Button>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="tag-box">
                                  <span className="building">Building 1</span>
                                  <span className="unit">Unit 1</span>
                                  <span className="category">Meeting</span>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <p className="time">20 Mins ago</p>
                                <Button className="view-button">View Document</Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={1}>
                      <>
                        <Box className="tab-content-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="header">
                                  <Box className="tag-box">
                                    <span className="building">Building 1</span>
                                    <span className="unit">Unit 1</span>
                                    <span className="category">Meeting</span>
                                  </Box>
                                  <Box>
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Mark as read")}</MenuItem>
                                      <MenuItem>{t("MArk as unread")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </Box>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <p className="time">20 Mins ago</p>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="header">
                                  <Box className="tag-box">
                                    <span className="building">Building 1</span>
                                    <span className="unit">Unit 1</span>
                                    <span className="category">Meeting</span>
                                  </Box>
                                  <Box>
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Mark as read")}</MenuItem>
                                      <MenuItem>{t("MArk as unread")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </Box>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <p className="time">20 Mins ago</p>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className="notification-box">
                                <Box className="header">
                                  <Box className="tag-box">
                                    <span className="building">Building 1</span>
                                    <span className="unit">Unit 1</span>
                                    <span className="category">Meeting</span>
                                  </Box>
                                  <Box>
                                    <Menu
                                      menuButton={
                                        <IconButton>
                                          <MoreVertIcon />
                                        </IconButton>
                                      }
                                    >
                                      <MenuItem>{t("Mark as read")}</MenuItem>
                                      <MenuItem>{t("MArk as unread")}</MenuItem>
                                      <MenuItem>{t("Delete")}</MenuItem>
                                    </Menu>
                                  </Box>
                                </Box>
                                <h4>John doe has sent MOM appproval request</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <p className="time">20 Mins ago</p>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(NotificationStyle)(ChairmanNotification));
