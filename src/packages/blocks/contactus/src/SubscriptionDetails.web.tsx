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

class SubscriptionDetail extends SubscriptionDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
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
                      Help /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Subscription Detail
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Subscription Detail
                    </Typography>
                  </Box>
                </Box>

                <Box className="subscription-detail">
                  <Box className="info">
                    <Typography variant="h6" className="heading">
                      Tenant International Premium Plan
                    </Typography>
                    <Link href="">Learn More</Link>
                  </Box>
                  <hr />
                  <Box className="info data">
                    <Typography variant="body1">Plan Name</Typography>
                    <Typography variant="body1" className="heading">
                      Tenant International Premium Plan
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">Validity</Typography>
                    <Typography variant="body1" className="heading">
                      01-02-2022 to 26-25-2056
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">Paid on</Typography>
                    <Typography variant="body1" className="heading">
                      01-02-2022
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">Payment Status</Typography>
                    <Typography variant="body1" className="heading">
                      Paid
                    </Typography>
                  </Box>
                  <Box className="info data">
                    <Typography variant="body1">
                      Remaining Days till expiration
                    </Typography>
                    <Typography variant="body1" className="heading">
                      158 days
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

export default withStyles(FaqChairmanStyleWeb)(SubscriptionDetail);
// Customizable Area End
