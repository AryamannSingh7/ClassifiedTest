// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddConditionController, { Props } from "./AddConditionController.web";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo } from "./assets";
import RichTextEditor from "react-rte";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

const toolbarConfig: any = {
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
    const { t }: any = this.props;

    console.log();

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.changedTemplate}>
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
                      <RichTextEditor value={this.state.value} onChange={this.onChange} toolbarConfig={toolbarConfig} />
                    </div>
                    <div className="upload-button">
                      <Box className="button-group">
                        <Button className="condition-button">Back Condition Listing</Button>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(AddCondition));
// Customizable Area End
