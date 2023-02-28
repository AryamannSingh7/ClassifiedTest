// Customizable Area Start
import React from "react";
import { Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IssueContractController, { Props } from "./IssueContractController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, TemplateIcon } from "./assets";
import { withTranslation } from "react-i18next";

class IssueContract extends IssueContractController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getTemplateListFromAdmin();
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/Contracts">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span className="bold-text">{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <Box className="templates-list">
                      <h4 className="bold-text">{t("Select Lease Template")}</h4>
                      <Grid container spacing={2}>
                        {this.state.templatesList.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="template">{t("No Template Available!")}</Card>
                          </Grid>
                        )}
                        {this.state.templatesList.map((template: any, index: number) => {
                          return (
                            <Grid item xs={6} key={template.id}>
                              <Card className="template" onClick={() => this.handleGotoTemplateLease(template.id)}>
                                <div className="content">
                                  <div className="image">
                                    <img src={TemplateIcon} alt="" />
                                  </div>
                                  <h4 className="bold-text">{template.attributes.title}</h4>
                                </div>
                                {index === 0 && (
                                  <div className="right-menu">
                                    <span>{t("Default")}</span>
                                  </div>
                                )}
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(IssueContract));
// Customizable Area End
