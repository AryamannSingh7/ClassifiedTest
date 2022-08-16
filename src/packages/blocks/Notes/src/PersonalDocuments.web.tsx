// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BuildingLogo from "../assets/building.png";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import Document from "../assets/document.png";
import PersonalDocumentController, {
  Props,
} from "./PersonalDocumentsController.web";

class PersonalDocument extends PersonalDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box
          className={classes.personalDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link
                  href={
                    localStorage.getItem("userType") === "Owner"
                      ? "/OwnerDashboard"
                      : ""
                  }
                >
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                Personal Documents
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contract">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Rent Contract</h4>
                        </div>
                        <div>
                          {this.state.rent_contract > 0 && (
                            <Button className="color-btn">
                              {this.state.rent_contract}
                            </Button>
                          )}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Unit-Plan">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Unit Plan</h4>
                        </div>
                        <div>
                          {this.state.unit_plan > 0 && (
                            <Button className="color-btn">
                              {this.state.unit_plan}
                            </Button>
                          )}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Other-Documents">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Other Documents</h4>
                        </div>
                        <div>
                          {this.state.other_document > 0 && (
                            <Button className="color-btn">
                              {this.state.other_document}
                            </Button>
                          )}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(DocumentReportStyleWeb)(PersonalDocument);
// Customizable Area End
