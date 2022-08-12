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
import BuildingDocumentController, {
  Props,
} from "./BuildingDocumentsController.web";

class BuildingDocuments extends BuildingDocumentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          className={classes.buildingDocument}
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
                Building Documents
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/BuildingDocuments/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Policy</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Resolutions</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Roles</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Guidelines</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Building Plans</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
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

export default withStyles(DocumentReportStyleWeb)(BuildingDocuments);
// Customizable Area End
