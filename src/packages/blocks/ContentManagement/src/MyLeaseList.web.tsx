// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid, MenuItem } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyLeaseListController, { Props } from "./MyLeaseListController.web";
import { BuildingLogo, PdfImage } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class MyLeaseList extends MyLeaseListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box className={classes.personalDocument} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link href="/ResidentDashboard">
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                {t("My Lease")}
              </Box>
              <Container className="content-area document-box list">
                <div className="personal-documents">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box className="item document">
                        <div className="left-side">
                          <div className="image">
                            <img src={PdfImage} />
                          </div>
                          <div className="info">
                            <h4>qwerty</h4>
                          </div>
                        </div>
                        <div className="right-menu">
                          <Menu
                            menuButton={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                          >
                            <MenuItem>
                              <Link>{t("Download")}</Link>
                            </MenuItem>
                          </Menu>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(DocumentReportStyleWeb)(MyLeaseList));
// Customizable Area End
