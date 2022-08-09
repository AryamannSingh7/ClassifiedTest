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

class DocumentChairman extends DocumentChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

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
                    <Typography variant="body1">Documents</Typography>
                    <Typography variant="h5" className="sub-heading">
                      Documents
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
                            <h4>Policy</h4>
                          </div>
                          <Button className="color-btn">04</Button>
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Guidelines">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Guidelines</h4>
                          </div>
                          {/* <Button className="color-btn">04</Button> */}
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Roles">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Roles</h4>
                          </div>
                          <Button className="color-btn">04</Button>
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/Resolutions">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Resolution</h4>
                          </div>
                          <Button className="color-btn">04</Button>
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Link href="/DocumentChairman/BuildingPlans">
                        <Box className="item">
                          <div className="heading">
                            <img src={Document} />
                            <h4>Building Plans</h4>
                          </div>
                          <Button className="color-btn">04</Button>
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

export default withStyles(DocumentReportStyleWeb)(DocumentChairman);
// Customizable Area End
