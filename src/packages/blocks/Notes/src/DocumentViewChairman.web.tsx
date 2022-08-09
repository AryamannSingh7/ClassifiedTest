// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  Typography,
  withStyles,
  Box,
  Grid,
} from "@material-ui/core";
import DocumentViewChairmanController, {
  Props,
} from "./DocumentViewChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";

class DocumentViewChairman extends DocumentViewChairmanController {
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
                    <Typography variant="body1">
                      Documents / {this.state.docName} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        name
                      </Box>
                    </Typography>
                    <Box className="top-heading">
                      <Typography variant="h5" className="sub-heading">
                        name
                      </Typography>
                      <Button variant="contained">Download</Button>
                    </Box>
                  </Box>
                </Box>
                <Box className="document-box">
                  <iframe
                    src="http://www.africau.edu/images/default/sample.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    title="W3Schools Free Online Web Tutorials"
                  />
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(DocumentReportStyleWeb)(DocumentViewChairman);
// Customizable Area End
