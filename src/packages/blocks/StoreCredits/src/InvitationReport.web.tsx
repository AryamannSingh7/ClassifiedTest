// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Button,
  IconButton,
  Divider,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Card,
  FormControl,
  TextareaAutosize,
} from "@material-ui/core";
import InvitationReportController, { Props } from "./InvitationReportController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "web/src/i18n";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { CheckIcon } from "../../user-profile-basic/src/assets";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { DownloadIcon, PdfIcon } from "./assets";

class InvitationReport extends InvitationReportController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.reportDetails}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Typography variant="body1">
                    {t("Documents & Reports")} / {t("Reports")} /
                    <Box component="span" style={{ color: "blue" }}>
                      {t("Invitations Reports")}
                    </Box>
                  </Typography>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="sub-heading">
                      {t("Invitations Reports")}
                    </Typography>
                    <select name="" id="">
                      <option value="">2021</option>
                      <option value="">2022</option>
                      <option value="">2023</option>
                      <option value="">2024</option>
                      <option value="">2025</option>
                      <option value="">2026</option>
                    </select>
                  </Box>
                </Box>

                <Box className="budget-box audit-box">
                  <Card>
                    <Box className="heading">
                      <h4>{t("Invitations Reports")}</h4>
                    </Box>
                    <Divider />
                    <Box className="budget-content-box">
                      <Box className="head audit-line">
                        <p>Title</p>
                        <span>Count</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Total Sent Invitations</p>
                        <span>12 </span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Accepted Invitations by users</p>
                        <span>2022</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Rejected Invitation by users</p>
                        <span>2022</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Total Received Invitations</p>
                        <span>2022</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Pending join requests</p>
                        <span>2022</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Sent invitations awaiting acceptance</p>
                        <span>2022</span>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(InvitationReport));

// Customizable Area End
