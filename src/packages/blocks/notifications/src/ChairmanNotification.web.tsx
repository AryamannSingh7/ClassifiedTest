import React from "react";
import { withTranslation } from "react-i18next";
import ChairmanNotificationController, { Props } from "./ChairmanNotificationController.web";
import { Box, Button, Container, Grid, IconButton, Tab, Tabs, Typography, withStyles } from "@material-ui/core";
import { NotificationStyle } from "./NotificationStyle.web";
import DashboardHeaderWeb from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { Menu, MenuItem } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

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
    const { t, classes }: any = this.props;

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
                    <Typography variant="h5" className="sub-heading bold-text">
                      {t("Notifications")}
                    </Typography>
                  </Box>
                </Box>

                <Box className="content-boxes">
                  <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
                    <Tab label={t("Tasks")} onClick={() => this.getAllChairmanNotification(true)} />
                    <Tab label={t("Messages")} onClick={() => this.getAllChairmanNotification(false)} />
                  </Tabs>
                  <Box className="tab-content">
                    <TabPanel value={this.state.currentTab} index={0}>
                      <>
                        <Box className="tab-content-box">
                          <Grid container spacing={2}>
                            {this.state.notificationList.length == 0 && (
                              <Grid item xs={12}>
                                <Box className="notification-box">{t("No task found")}</Box>
                              </Grid>
                            )}
                            {this.state.notificationList.map((notification: any) => {
                              return (
                                <Grid item xs={12} key={notification.id}>
                                  <Box className="notification-box">
                                    <Box className="tag-box">
                                      {notification.attributes.building_name && (
                                        <span className="building">{notification.attributes.building_name}</span>
                                      )}
                                      {notification.attributes.notification_type && (
                                        <span className="category">{notification.attributes.notification_type}</span>
                                      )}
                                      {/* <span className="unit">Unit 1</span> */}
                                    </Box>
                                    <h4 className="bold-text">{notification.attributes.contents}</h4>
                                    <p>{notification.attributes.description}</p>
                                    <p className="time">{moment(notification.attributes.created_at).fromNow()}</p>
                                    <Button
                                      className="view-button"
                                      onClick={() => {
                                        window.open(notification.attributes.app_url, "_self", "noopener");
                                      }}
                                    >
                                      {t("View Document")}
                                    </Button>
                                  </Box>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={1}>
                      <>
                        <Box className="tab-content-box">
                          <Grid container spacing={2}>
                            {this.state.notificationList.length == 0 && (
                              <Grid item xs={12}>
                                <Box className="notification-box">{t("No message found")}</Box>
                              </Grid>
                            )}
                            {this.state.notificationList.map((notification: any) => {
                              return (
                                <Grid item xs={12} key={notification.id}>
                                  <Box
                                    className={`notification-box ${notification.attributes.is_read === false &&
                                      "unRead"}`}
                                  >
                                    <Box className="header">
                                      <Box className="tag-box">
                                        {notification.attributes.building_name && (
                                          <span className="building">{notification.attributes.building_name}</span>
                                        )}
                                        {notification.attributes.notification_type && (
                                          <span className="category">{notification.attributes.notification_type}</span>
                                        )}
                                      </Box>
                                      <Box>
                                        <Menu
                                          menuButton={
                                            <IconButton>
                                              <MoreVertIcon />
                                            </IconButton>
                                          }
                                        >
                                          <MenuItem
                                            onClick={() => this.updateReadNotificationStatus(notification.id, true)}
                                          >
                                            {t("Mark as read")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={() => this.updateReadNotificationStatus(notification.id, false)}
                                          >
                                            {t("Mark as unread")}
                                          </MenuItem>
                                          <MenuItem onClick={() => this.deleteSingleNotification(notification.id)}>
                                            {t("Delete")}
                                          </MenuItem>
                                        </Menu>
                                      </Box>
                                    </Box>
                                    <h4 className="bold-text">{notification.attributes.contents}</h4>
                                    <p>{notification.attributes.description}</p>
                                    <p className="time">{moment(notification.attributes.created_at).fromNow()}</p>
                                  </Box>
                                </Grid>
                              );
                            })}
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
