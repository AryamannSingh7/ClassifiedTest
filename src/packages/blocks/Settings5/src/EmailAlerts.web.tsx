import React from "react";
import { withTranslation } from "react-i18next";
import EmailAlertsController, { Props } from "./EmailAlertsController.web";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";
import { EmailAlertsStyle } from "./EmailAlertsStyle.web";
import { TimeIcon } from "./assets";
import NotificationCard from "../../../components/src/EmailAlertComponent/NotificationCard.web";

class EmailAlerts extends EmailAlertsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F7F9FE" }} className={classes.totalExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar-navigation">
                  <Box className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span className="bold-text">{t("Email Alert Settings")}</span>
                  </Box>
                </Box>
                <Container>
                  <Box className="setting-page-email">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <NotificationCard
                          heading={t(this.state.alertList[0])}
                          emailAlert={this.state.leaseDetails}
                          t={t}
                          updateStatus={(e: any) => {
                            this.setState(
                              {
                                leaseDetails: {
                                  ...this.state.leaseDetails,
                                  activated: e.target.checked,
                                },
                              },
                              () => {
                                this.updateStatus(this.state.leaseDetails.activated, this.state.leaseDetails.id);
                              }
                            );
                          }}
                          updateTime={() => {
                            this.openLeaseExpirationModal(
                              this.state.alertList[0],
                              this.state.leaseDetails.id,
                              this.state.leaseDetails.timeLimit
                            );
                          }}
                          message={`${t("Lease expiration alert will be sent")} ${
                            this.state.leaseDetails.timeLimit
                          } ${t("days before lease expires to you and your tenant.")}`}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <NotificationCard
                          heading={t(this.state.alertList[1])}
                          emailAlert={this.state.rentDetails}
                          t={t}
                          updateStatus={(e: any) => {
                            this.setState(
                              {
                                rentDetails: {
                                  ...this.state.rentDetails,
                                  activated: e.target.checked,
                                },
                              },
                              () => {
                                this.updateStatus(this.state.rentDetails.activated, this.state.rentDetails.id);
                              }
                            );
                          }}
                          updateTime={() => {
                            this.openLeaseExpirationModal(
                              this.state.alertList[1],
                              this.state.rentDetails.id,
                              this.state.rentDetails.timeLimit
                            );
                          }}
                          message={`${t("Rent due alert will be sent")} ${this.state.rentDetails.timeLimit} ${t(
                            "days before rent expires to you and your tenant."
                          )}`}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <NotificationCard
                          heading={t(this.state.alertList[2])}
                          emailAlert={this.state.feeDetails}
                          t={t}
                          updateStatus={(e: any) => {
                            this.setState(
                              {
                                feeDetails: {
                                  ...this.state.feeDetails,
                                  activated: e.target.checked,
                                },
                              },
                              () => {
                                this.updateStatus(this.state.feeDetails.activated, this.state.feeDetails.id);
                              }
                            );
                          }}
                          updateTime={() => {
                            this.openLeaseExpirationModal(
                              this.state.alertList[2],
                              this.state.feeDetails.id,
                              this.state.feeDetails.timeLimit
                            );
                          }}
                          message={`${t("Management fee alert will be sent")} ${this.state.feeDetails.timeLimit} ${t(
                            "days before management fee due."
                          )}`}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>

        <Dialog
          className="lease-expiration-modal personal"
          fullWidth
          onClose={() => this.closeLeaseExpirationModal()}
          open={this.state.isLeaseExpirationModal}
        >
          <DialogContent>
            <Box textAlign="center">
              <Typography variant="h6">
                {this.state.title} {t("Settings")}
              </Typography>
              <Box>
                <Select
                  value={this.state.time}
                  onChange={(e: any) => this.setState({ time: e.target.value })}
                  name="meetingType"
                  displayEmpty
                  className="dialog-select-input"
                >
                  <MenuItem value="" disabled>
                    {t("Select Time")}
                  </MenuItem>
                  <MenuItem value="7">7 {t("Days")}</MenuItem>
                  <MenuItem value="15">15 {t("Days")}</MenuItem>
                  <MenuItem value="30">30 {t("Days")}</MenuItem>
                </Select>
              </Box>
              <DialogActions className="dialog-button-group">
                <Button
                  onClick={() => {
                    this.updateEmailTime();
                    this.closeLeaseExpirationModal();
                  }}
                >
                  {t("Submit")}
                </Button>
                <Button onClick={() => this.closeLeaseExpirationModal()}>{t("Cancel")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="delete-document personal lease-expiration-set"
          fullWidth
          onClose={() => this.handleLeaseExpirationSetModal()}
          open={this.state.isLeaseExpirationSetModal}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={TimeIcon} alt="delete" />
              <Typography variant="h6">{this.state.title} Set</Typography>
              <Typography variant="body1">
                {this.state.title === this.state.alertList[0] &&
                  `${t("Your lease expiration alert has been set.")} ${this.state.time} ${t(
                    "days before lease expires you and tenant will receive email notification for the same."
                  )}`}
                {this.state.title === this.state.alertList[1] &&
                  `${t("Your rent due alert has been set.")} ${this.state.time} ${t(
                    "days before rent expires you and tenant will receive email notification for the same."
                  )}`}
                {this.state.title === this.state.alertList[2] &&
                  `${t("Your management fee alert has been set.")} ${this.state.time} ${t(
                    "days before management fee due you will receive email notification."
                  )}`}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button className="okay" onClick={() => this.handleLeaseExpirationSetModal()}>
                  {t("Okay")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(EmailAlertsStyle)(EmailAlerts));
