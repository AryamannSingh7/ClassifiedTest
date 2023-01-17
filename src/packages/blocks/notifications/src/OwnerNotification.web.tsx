import React from "react";
import { withTranslation } from "react-i18next";
import OwnerNotificationController, { Props } from "./OwnerNotificationController.web";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, DeleteImage, DeleteRentIcon, FilterIcon } from "./assets";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import { NotificationStyle } from "./NotificationStyle.web";
import Loader from "../../../components/src/Loader.web";
import moment from "moment";
import { toast } from "react-hot-toast";

class OwnerNotification extends OwnerNotificationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box
          style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }}
          className={classes.ownerNotification}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.handleNavigationBack()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Notification")}</span>
                  </div>
                  <div className="right-icon">
                    {this.state.isDeleteOpen ? (
                      <>
                        <p
                          className="select-text"
                          onClick={() => {
                            const idList = this.state.notificationList.map((notification: any) => notification.id);
                            this.setState({ selectedNotification: idList });
                          }}
                        >
                          {t("Select All")}
                        </p>
                        <img
                          src={DeleteRentIcon}
                          alt="delete"
                          onClick={() => {
                            if (this.state.selectedNotification.length > 0) {
                              this.handleDeleteNotificationModal();
                            } else {
                              toast.error("Please Select Notification");
                            }
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <img src={FilterIcon} alt="" />
                        <img src={DeleteRentIcon} alt="" onClick={() => this.setState({ isDeleteOpen: true })} />
                      </>
                    )}
                  </div>
                </Box>
                <Box className="tenant-detail-box">
                  <Container>
                    <Box className="rent-history-box">
                      {this.state.notificationList.length === 0 && <Card>{t("No notification found")}</Card>}
                      {this.state.notificationList.map((notification: any) => {
                        return (
                          <Card key={notification.id}>
                            <Box className="rent-history">
                              <Box className="header">
                                <Box className="left-side">
                                  {notification.attributes.building_name && (
                                    <span className="building">{notification.attributes.building_name}</span>
                                  )}
                                  {notification.attributes.notification_type && (
                                    <span className="type">{notification.attributes.notification_type}</span>
                                  )}
                                </Box>
                                {this.state.isDeleteOpen && (
                                  <Checkbox
                                    onChange={(e: any) => {
                                      if (e.target.checked) {
                                        this.setState({
                                          selectedNotification: [...this.state.selectedNotification, notification.id],
                                        });
                                      } else {
                                        const newList = this.state.selectedNotification.filter(
                                          (id: any) => id != notification.id
                                        );
                                        this.setState({
                                          selectedNotification: newList,
                                        });
                                      }
                                    }}
                                    checked={this.state.selectedNotification.includes(notification.id)}
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                  />
                                )}
                              </Box>
                              <h4 className="heading">{notification.attributes.contents}</h4>
                              <p>{notification.attributes.description}</p>
                              <p className="time">{moment(notification.attributes.created_at).fromNow()}</p>
                            </Box>
                          </Card>
                        );
                      })}
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

        <Dialog
          className="delete-document personal delete-notification-owner-modal"
          fullWidth
          onClose={() => this.handleDeleteNotificationModal()}
          open={this.state.isDeleteNotificationModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">
                Delete {this.state.selectedNotification.length} Selected Notification
              </Typography>
              <Typography variant="body1">
                Are you sure want to delete {this.state.selectedNotification.length} selected notification? Once deleted
                you won't be able to view deleted notification again.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  onClick={() => {
                    this.setState({ loading: true, isDeleteNotificationModalOpen: false, isDeleteOpen: false }, () => {
                      this.deleteNotification();
                    });
                  }}
                >
                  {t("Yes Delete")}
                </Button>
                <Button onClick={() => this.handleDeleteNotificationModal()}>{t("No, Don't Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(NotificationStyle)(OwnerNotification));
