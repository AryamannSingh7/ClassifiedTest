// Customizable Area Start
import React from "react";
import {Container, Typography, withStyles, Divider, Box, Grid, Card, MenuItem} from "@material-ui/core";
import InvitationReportController, { Props } from "./InvitationReportController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "web/src/i18n";
import { ReportsStyleWeb } from "./ReportsStyle.web";

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
                    <select name="" id="" value={this.state.selectedYear} onChange={this.manageChangeYear}>
                      <option value={(new Date().getFullYear()) - 3}>{(new Date().getFullYear()) - 3}</option>
                      <option value={(new Date().getFullYear()) - 2}>{(new Date().getFullYear()) - 2}</option>
                      <option value={(new Date().getFullYear()) - 1}>{(new Date().getFullYear()) - 1}</option>
                      <option value={(new Date().getFullYear())}>{(new Date().getFullYear())}</option>
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
                        <span>{this.state.invitationData?.total_member_invitation_sent|| 0} </span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Accepted Invitations by users</p>
                        <span>{this.state.invitationData?.member_invitation_accepted || 0}</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Rejected Invitation by users</p>
                        <span>{this.state.invitationData?.member_invitation_rejected || 0}</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Total Received Invitations</p>
                        <span>{this.state.invitationData?.total_ragistration_request || 0}</span>
                      </Box>
                      <hr />
                      <Box className="audit-line">
                        <p>Pending join requests</p>
                        <span>{this.state.invitationData?.total_member_invitation_pending || 0}</span>
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
