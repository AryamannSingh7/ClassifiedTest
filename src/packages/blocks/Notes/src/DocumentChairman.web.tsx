// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DocumentChairmanController, {
  Props,
} from "./DocumentChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";

import Document from "../assets/document.png";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class DocumentChairman extends DocumentChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t} = this.props
    const { classes } = this.props;

    window.addEventListener("pageshow", (event) => {
      const historyTraversal =
        event.persisted ||
        (typeof window.performance != "undefined" &&
          window.performance.navigation.type === 2);

      if (historyTraversal) {
        window.location.reload();
      }
    });

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.documentChairman}
        >
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
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>{t("Policy")}</h4>
                          </div>
                          {this.state.policy > 0 && (
                            <Button className="color-btn">
                              {this.state.policy}
                            </Button>
                          )}
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Guidelines">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>{t("Guidelines")}</h4>
                          </div>
                          {this.state.guidelines > 0 && (
                            <Button className="color-btn">
                              {this.state.guidelines}
                            </Button>
                          )}
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Roles">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>{t("Roles")}</h4>
                          </div>
                          {this.state.roles > 0 && (
                            <Button className="color-btn">
                              {this.state.roles}
                            </Button>
                          )}
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Resolutions">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>{t("Resolution")}</h4>
                          </div>
                          {this.state.resolution > 0 && (
                            <Button className="color-btn">
                              {this.state.resolution}
                            </Button>
                          )}
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Building-Plans">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>{t("Building Plans")}</h4>
                          </div>
                          {this.state.buildingPlans > 0 && (
                            <Button className="color-btn">
                              {this.state.buildingPlans}
                            </Button>
                          )}
                        </Box>
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
