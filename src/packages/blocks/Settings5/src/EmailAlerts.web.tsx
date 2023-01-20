import React from "react";
import { withTranslation } from "react-i18next";
import EmailAlertsController, { Props } from "./EmailAlertsController.web";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Link,
  withStyles,
  Switch,
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

class EmailAlerts extends EmailAlertsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.totalExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <Box className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Email Alert Settings")}</span>
                  </Box>
                </Box>
                <Container>
                  <Box className="setting-page">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Card className="main-setting-box">
                          <Box className="card-box-setting">
                            <Box className="setting-content-box">
                              <h4>{t("Lease Expiration Alert")}</h4>
                              <Switch checked={false} onChange={() => {}} name="lease" color="primary" />
                            </Box>
                            <Box className="setting-on-box">
                              <p>
                                Lease expiration alert will be sent 30 days before lease expires to you and your tenant.
                              </p>
                              <span className="setting-text" onClick={() => this.handleLeaseExpirationModal()}>
                                {t("Change Settings")}
                              </span>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="main-setting-box">
                          <Box className="card-box-setting">
                            <Box className="setting-content-box">
                              <h4>{t("Rent Due Alert")}</h4>
                              <Switch checked={false} onChange={() => {}} name="lease" color="primary" />
                            </Box>
                            <Box className="setting-on-box">
                              <p>
                                Lease expiration alert will be sent 30 days before lease expires to you and your tenant.
                              </p>
                              <span className="setting-text">Change Settings</span>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="main-setting-box">
                          <Box className="card-box-setting">
                            <Box className="setting-content-box">
                              <h4>{t("Management Fee Due")}</h4>
                              <Switch checked={false} onChange={() => {}} name="lease" color="primary" />
                            </Box>
                            <Box className="setting-on-box">
                              <p>
                                Lease expiration alert will be sent 30 days before lease expires to you and your tenant.
                              </p>
                              <span className="setting-text">Change Settings</span>
                            </Box>
                          </Box>
                        </Card>
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
          onClose={() => this.handleLeaseExpirationModal()}
          open={this.state.isLeaseExpirationModal}
        >
          <DialogContent>
            <Box textAlign="center">
              <Typography variant="h6">Lease Expiration Alert Settings</Typography>
              <Box>
                <Select
                  value=""
                  onChange={(e: any) => {}}
                  name="meetingType"
                  displayEmpty
                  className="dialog-select-input"
                >
                  <MenuItem value="" disabled>
                    {t("Select Time")}
                  </MenuItem>
                  <MenuItem value="ga_meeting">{t("GA Meeting")}</MenuItem>
                  <MenuItem value="regular_meeting">{t("Regular Meeting")}</MenuItem>
                </Select>
              </Box>
              <DialogActions className="dialog-button-group">
                <Button>{t("Submit")}</Button>
                <Button onClick={() => this.handleLeaseExpirationModal()}>{t("Cancel")}</Button>
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
              <Typography variant="h6">Lease Expiration Alert Set</Typography>
              <Typography variant="body1">
                Your lease expiration alert has been set. 30 days before lease expires you and tenant will receive email
                notification for the same.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button className="okay">{t("Okay")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(EmailAlertsStyle)(EmailAlerts));
