// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FaqOwnerController, { Props } from "./FaqOwnerController.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingLogo } from "./assets";
import { withTranslation } from "react-i18next";

class FaqOwner extends FaqOwnerController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F7F9FE", height: "100vh" }} className={classes.faqOwner}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                {this.state.faqStep === 1 && (
                  <>
                    <Box display={{ xs: "flex", md: "flex" }} className="backIcon">
                      <Link href="/OwnerDashboard">
                        <IconButton>
                          <KeyboardBackspaceIcon />
                        </IconButton>
                      </Link>
                      <span className="bold-text heading">{t("FAQs")}</span>
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        {this.state.catagoriesList.map((category: any) => {
                          return (
                            <div
                              key={category.id}
                              className="faq-item"
                              onClick={() => {
                                this.setState(
                                  {
                                    ...this.state,
                                    faqList: category.attributes.FAQ,
                                    faq: category.attributes.name,
                                  },
                                  () => {
                                    this.changeFaqState(2);
                                  }
                                );
                              }}
                            >
                              <p className="bold-text">{category.attributes.name}</p>
                              <NavigateNextIcon />
                            </div>
                          );
                        })}
                      </Box>
                    </Container>
                  </>
                )}
                {this.state.faqStep === 2 && (
                  <>
                    <Box display={{ xs: "flex", md: "flex" }} className="backIcon">
                      <IconButton onClick={() => this.changeFaqState(1)}>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                      <span className="bold-text heading">{this.state.faq}'s FAQs</span>
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        {this.state.faqList.map((faq: any) => {
                          return (
                            <div
                              key={faq.id}
                              className="faq-item"
                              onClick={() => {
                                this.setState(
                                  {
                                    ...this.state,
                                    question: faq.title,
                                    answer: faq.content,
                                  },
                                  () => {
                                    this.changeFaqState(3);
                                  }
                                );
                              }}
                            >
                              <p className="bold-text">{faq.title}</p>
                              <NavigateNextIcon />
                            </div>
                          );
                        })}
                      </Box>
                    </Container>
                  </>
                )}
                {this.state.faqStep === 3 && (
                  <>
                    <Box display={{ xs: "flex", md: "flex" }} className="backIcon">
                      <IconButton onClick={() => this.changeFaqState(2)}>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                      <span className="bold-text heading">{this.state.faq}'s FAQs</span>
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        <div className="faq-ans" onClick={() => {}}>
                          <span className="bold-text">{this.state.question}</span>
                          <p>{this.state.answer}</p>
                        </div>
                        <Button fullWidth variant="contained" disableElevation onClick={() => this.changeFaqState(2)}>
                          {t("Close")}
                        </Button>
                      </Box>
                    </Container>
                  </>
                )}
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

export default withTranslation()(withStyles(FaqChairmanStyleWeb)(FaqOwner));
// Customizable Area End
