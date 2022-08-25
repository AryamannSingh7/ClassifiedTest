// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Button,
  Container,
  IconButton,
  // Link,
  withStyles,
  Box,
  Grid,
  Tab,
  MenuItem,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import AddConditionController, { Props } from "./AddConditionController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import RichTextEditor from "react-rte";

const toolbarConfig = {
  display: ["INLINE_STYLE_BUTTONS"],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "c<ustom-css-class>" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ],
};

class AddCondition extends AddConditionController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log();

    return (
      <>
        <Box
          style={{ background: "white", height: "100vh" }}
          className={classes.changedTemplate}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton onClick={() => this.goBackPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    Add More Condition
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box add-condition">
                    <div className="template-view">
                      <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                        toolbarConfig={toolbarConfig}
                      />
                    </div>
                    <div className="upload-button">
                      <Box className="button-group">
                        <Button className="condition-button">
                          Back Condition Listing
                        </Button>
                        <Link to="/IssueContract/1/LeaseForm/Template/Review">
                          <Button>Add This Conditions to Lease</Button>
                        </Link>
                      </Box>
                    </div>
                  </div>
                </Container>
              </Box>
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

export default withStyles(ContractsStyleWeb)(AddCondition);
// Customizable Area End
