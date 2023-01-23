// Customizable Area Start
import React from "react";
import { Container, Link, Typography, withStyles, Box, Grid } from "@material-ui/core";
import DocumentChairmanController, { Props } from "./DocumentChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { Document } from "./assets";
import { withTranslation } from "react-i18next";
import ChairmanCategoryBox from "../../../components/src/DocumentComponent/ChairmanCategoryBox.web";

class DocumentChairman extends DocumentChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    window.addEventListener("pageshow", (event) => {
      const historyTraversal =
        event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);

      if (historyTraversal) {
        window.location.reload();
      }
    });

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.documentChairman}>
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
                    <Typography variant="body1">{t("Documents")}</Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Documents")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="document-box">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Policy">
                        <ChairmanCategoryBox image={Document} heading={t("Policy")} value={this.state.policy} />
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Guidelines">
                        <ChairmanCategoryBox image={Document} heading={t("Guidelines")} value={this.state.guidelines} />
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Roles">
                        <ChairmanCategoryBox image={Document} heading={t("Roles")} value={this.state.roles} />
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Resolutions">
                        <ChairmanCategoryBox
                          image={Document}
                          heading={t("Resolutions")}
                          value={this.state.resolution}
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Building-Plans">
                        <ChairmanCategoryBox
                          image={Document}
                          heading={t("Building Plans")}
                          value={this.state.buildingPlans}
                        />
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(DocumentChairman));
// Customizable Area End
