// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, withStyles, Box, Grid } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LeaseFormController, { Props } from "./LeaseFormController.web";
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

class AddCondition extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const condition = JSON.parse(window.sessionStorage.getItem("condition") as any);
    const template_id: any = this.props.navigation.getParam("templateId");
    this.setState(
      {
        templateId: template_id,
        editor: RichTextEditor.createValueFromString(condition.editorCondition, "html"),
      },
      () => {}
    );
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.changedTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton
                      onClick={() => {
                        this.setState({ editor: RichTextEditor.createEmptyValue() }, () => {
                          this.props.navigation.navigate("ChangedSelectedTemplate", {
                            templateId: this.state.templateId,
                          });
                        });
                      }}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Add More Condition")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box add-condition">
                    <div className="template-view">
                      <RichTextEditor
                        value={this.state.editor}
                        onChange={(value: any) => {
                          value.toString("html");
                          this.setState({ editor: value });
                        }}
                        toolbarConfig={toolbarConfig}
                      />
                    </div>
                    <div className="upload-button">
                      <Box className="button-group">
                        <Button
                          onClick={() => {
                            this.setState({ editor: RichTextEditor.createEmptyValue() }, () => {
                              this.props.navigation.navigate("ChangedSelectedTemplate", {
                                templateId: this.state.templateId,
                              });
                            });
                          }}
                          className="condition-button"
                        >
                          {t("Back Condition Listing")}
                        </Button>
                        <Button
                          onClick={() => {
                            console.log(this.state.editor._cache.html);
                          }}
                        >
                          {t("Add This Conditions to Lease")}
                        </Button>
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
