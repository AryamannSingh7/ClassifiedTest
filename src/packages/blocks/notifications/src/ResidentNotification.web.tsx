import React from "react";
import { withTranslation } from "react-i18next";
import ResidentNotificationController, { Props } from "./ResidentNotificationController.web";
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

class ResidentNotification extends ResidentNotificationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }}
          className={classes.ownerNotification}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/ResidentDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Notification")}</span>
                  </div>
                  <div className="right-icon">
                    {this.state.isDeleteOpen ? (
                      <>
                        <p className="select-text">{t("Select All")}</p>
                        <img src={DeleteRentIcon} alt="" onClick={() => this.handleDeleteNotificationModal()} />
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
                      <Card>
                        <Box className="rent-history">
                          <Box className="header">
                            <Box className="left-side">
                              <span>Building</span>
                              <span>Unit 1</span>
                              <span>Classified</span>
                            </Box>
                            {this.state.isDeleteOpen && (
                              <Checkbox
                                onChange={(e: any) => {}}
                                checked={true}
                                icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />}
                              />
                            )}
                          </Box>
                          <h4 className="heading">Your Request Has Been Rejected</h4>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, expedita, quia, magni
                            commodi amet quos hic aliquid nesciunt asperiores nisi officiis repudiandae. Pariatur
                            voluptatum, non dolorum accusamus enim incidunt doloremque.
                          </p>
                          <p className="time">20 min ago</p>
                        </Box>
                      </Card>
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
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteNotificationModal()}
          open={this.state.isDeleteNotificationModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">Delete 1 Selected Notification</Typography>
              <Typography variant="body1">
                Are you sure want to delete 2 selected notification? Once deleted you won't be able to view deleted
                notification again.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button>{t("Yes Delete")}</Button>
                <Button onClick={() => this.handleDeleteNotificationModal()}>{t("No, Don't Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(NotificationStyle)(ResidentNotification));
