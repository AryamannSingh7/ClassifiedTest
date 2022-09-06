// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  Grid,
  withStyles,
} from "@material-ui/core";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import SubscriptionDetailController, {
  Props,
} from "./SubscriptionDetailController.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class SubscriptionDetail extends SubscriptionDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t} = this.props
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.subscriptionDetails}
        >
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("Help")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Subscription Detail")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Subscription Detail")}
                    </Typography>
                  </Box>
                </Box>

                <Box className="subscription-detail">
                  <Box className="info">
                    <Typography variant="h6" className="heading">
                      {t("Tenant International Premium Plan")}
                    </Typography>
                    <Link href="">{t("Learn More")}</Link>
                  </Box>
                  <hr />
                  <Box className="info data">
                    <Typography variant="body1">{t("Plan Name")}</Typography>
                    <Typography variant="body1" className="heading">
                      {t("Tenant International Premium Plan")}
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">{t("Validity")}</Typography>
                    <Typography variant="body1" className="heading">
                      01-02-2022 to 26-25-2056
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">{t("Paid on")}</Typography>
                    <Typography variant="body1" className="heading">
                      01-02-2022
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">{t("Payment Status")}</Typography>
                    <Typography variant="body1" className="heading">
                      Paid
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">
                      {t("Remaining Days till expiration")}
                    </Typography>
                    <Typography variant="body1" className="heading">
                      158 {t("days")}
                    </Typography>
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

export default withTranslation()(withStyles(FaqChairmanStyleWeb)(SubscriptionDetail));
// Customizable Area End
