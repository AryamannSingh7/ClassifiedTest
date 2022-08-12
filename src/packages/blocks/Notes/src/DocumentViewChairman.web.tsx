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
  Link,
} from "@material-ui/core";
import DocumentViewChairmanController, {
  Props,
} from "./DocumentViewChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";

import { Document, Page } from "react-pdf";

class DocumentViewChairman extends DocumentViewChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    // console.log(
    //   `${this.state.document &&
    //     this.state.document.attributes.images[0]
    //       .url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
    // );
    console.log(
      `${this.state.document &&
        this.state.document.attributes.images[0]
          .url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
    );

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
                      Documents / {this.state.documentType} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {this.state.document &&
                          this.state.document.attributes.title}
                      </Box>
                    </Typography>
                    <Box className="top-heading">
                      <Typography variant="h5" className="sub-heading">
                        {this.state.document &&
                          this.state.document.attributes.title}
                      </Typography>
                      <Link
                        href={
                          this.state.document &&
                          this.state.document.attributes.images[0].download_url
                        }
                        target="_blank"
                      >
                        <Button variant="contained">Download</Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box className="document-box">
                  {/* <Document
                    file={
                      this.state.document &&
                      this.state.document.attributes.images[0].url
                    }
                    // file="http://www.africau.edu/images/default/sample.pdf"
                    options={{
                      workerSrc:
                        "https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.worker.min.js",
                    }}
                  >
                    <Page pageNumber={1} />
                  </Document> */}
                  <iframe
                    allowpaymentrequest="true"
                    // src="http://www.africau.edu/images/default/sample.pdf"
                    src={`https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9JYTJWNVNTSWhlWFJ6WVRWME5tZzBOM3AyWnpOclpuSmhhV0ZrYWpNeE9HRmhZUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUDJsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SW5OaGJYQnNaUzV3WkdZaU95Qm1hV3hsYm1GdFpTbzlWVlJHTFRnbkozTmhiWEJzWlM1d1pHWUdPd1pVT2hGamIyNTBaVzUwWDNSNWNHVkpJaFJoY0hCc2FXTmhkR2x2Ymk5d1pHWUdPd1pVIiwiZXhwIjoiMjAyMi0wOC0xMlQwNjo1NDowNS45NDVaIiwicHVyIjoiYmxvYl9rZXkifX0=--057c6cd11c91758619b4475e2d2b77494ec81c16/sample.pdf?content_type=application%2Fpdf&disposition=inline%3B+filename%3D%22sample.pdf%22%3B+filename%2A%3DUTF-8%27%27sample.pdf`}
                    // src={`${this.state.document &&
                    //   this.state.document.attributes.images[0]
                    //     .url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    // title="Document"
                    // seamless
                    // type="application/pdf"
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
