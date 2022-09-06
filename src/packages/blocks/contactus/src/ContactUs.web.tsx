// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  FormControl,
  withStyles,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import ContactUsController, { Props } from "./ContactusController.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class ContactUsChairman extends ContactUsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t} = this.props
    const { classes } = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.contactUs}>
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
                        {t("Contact Us")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Contact Us")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="contact-us-form">
                  <Typography
                    variant="body1"
                    style={{ color: "black", marginBottom: "15px" }}
                  >
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate the visual form of a document or a typeface
                    without relying on meaningful content. Lorem ipsum may be
                    used as a placeholder before final copy is available.
                  </Typography>

                  <Grid xs={6} style={{ paddingTop: 35 }}>
                    <FormControl fullWidth>
                      <input placeholder={t("Title")} className="title-input" />
                    </FormControl>
                    <FormControl fullWidth>
                      <select className="select-input">
                        <option aria-label="None">{t("Select Category")}</option>
                        <option>Ten</option>
                        <option>Twenty</option>
                        <option>Thirty</option>
                      </select>
                    </FormControl>
                    <FormControl fullWidth>
                      <input
                        placeholder="Mobile Number"
                        className="title-input"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <textarea
                        placeholder="Message"
                        className="textarea-input"
                      />
                    </FormControl>
                    <Button variant="contained" fullWidth>
                      {t("Send Message")}
                    </Button>
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

export default withTranslation()(withStyles(FaqChairmanStyleWeb)(ContactUsChairman));
// Customizable Area End
