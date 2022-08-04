// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  Link,
  FormControl,
  Tabs,
  Tab,
  AppBar,
  withStyles,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import TabPanel from "../../Polling/src/TabPanel.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import ContactUsController, { Props } from "./ContactusController.web";

class ContactUsChairman extends ContactUsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
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
                      Help /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Contact us
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Contact Us
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
                      <input placeholder="Title" className="title-input" />
                    </FormControl>
                    <FormControl fullWidth>
                      <select className="select-input">
                        <option aria-label="None">Select Category</option>
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
                      Send Message
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

export default withStyles(FaqChairmanStyleWeb)(ContactUsChairman);
// Customizable Area End
