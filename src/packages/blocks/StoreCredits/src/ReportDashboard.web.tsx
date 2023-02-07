// Customizable Area Start
import React from "react";
import { Button, Card, Container, Link, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ReportDashboardController, { Props } from "./ReportDashboardController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { AuditReportIcon, BudgetReportIcon, ExpenseReportIcon, FeeReportIcon, InvitationReportIcon } from "./assets";

class ReportDashboard extends ReportDashboardController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    // window.addEventListener("pageshow", (event) => {
    //   const historyTraversal =
    //     event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);

    //   if (historyTraversal) {
    //     window.location.reload();
    //   }
    // });

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.reportChairman}>
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
                  <Box>
                    <Typography variant="body1">
                      {t("Documents & Reports")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Reports")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Reports")}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Link href="/BudgetReports">
                        <Card className="report-items">
                          <Box className="img-box">
                            <img src={BudgetReportIcon} />
                          </Box>
                          <h4>{t("Budget Reports")}</h4>
                          <Button className="color-btn">{this.state.budgetReportCount < 9 ? ("0" + this.state.budgetReportCount) : this.state.budgetReportCount}</Button>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Link>
                        <Card className="report-items">
                          <Box className="img-box">
                            <img src={ExpenseReportIcon} />
                          </Box>
                          <h4>{t("Expense Reports")}</h4>
                          <Button className="color-btn">02</Button>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Link>
                        <Card className="report-items">
                          <Box className="img-box">
                            <img src={FeeReportIcon} />
                          </Box>
                          <h4>{t("Management Fee Reports")}</h4>
                          <Button className="color-btn">02</Button>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Link>
                        <Card className="report-items">
                          <Box className="img-box">
                            <img src={AuditReportIcon} />
                          </Box>
                          <h4>{t("Audit Reports")}</h4>
                          <Button className="color-btn">02</Button>
                        </Card>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Link>
                        <Card className="report-items">
                          <Box className="img-box">
                            <img src={InvitationReportIcon} />
                          </Box>
                          <h4>{t("Invitations Reports")}</h4>
                          <Button className="color-btn">02</Button>
                        </Card>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(ReportDashboard));
// Customizable Area End
