// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import { Button, Container, withStyles } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FaqResidentController, { Props } from "./FaqResidentController.web";
import { FaqChairmanStyleWeb } from "./FaqChairmanStyle.web";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import BuildingLogo from "../assets/building.png";

class FaqResident extends FaqResidentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF", height: "100vh" }}
          className={classes.faqOwner}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                {this.state.faqStep === 1 && (
                  <>
                    <Box
                      display={{ xs: "flex", md: "flex" }}
                      className="backIcon"
                      onClick={() => window.history.back()}
                    >
                      <KeyboardBackspaceIcon /> FAQs
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        <div
                          className="faq-item"
                          onClick={() => this.changeFaqState(2)}
                        >
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles</p>
                          <NavigateNextIcon />
                        </div>
                      </Box>
                    </Container>
                  </>
                )}
                {this.state.faqStep === 2 && (
                  <>
                    <Box
                      display={{ xs: "flex", md: "flex" }}
                      className="backIcon"
                      onClick={() => this.changeFaqState(1)}
                    >
                      <KeyboardBackspaceIcon /> Vehicle's FAQs
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        <div
                          className="faq-item"
                          onClick={() => this.changeFaqState(3)}
                        >
                          <p>Vehicles registration process</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles registration process</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles registration process</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles registration process</p>
                          <NavigateNextIcon />
                        </div>
                        <div className="faq-item" onClick={() => {}}>
                          <p>Vehicles registration process</p>
                          <NavigateNextIcon />
                        </div>
                      </Box>
                    </Container>
                  </>
                )}
                {this.state.faqStep === 3 && (
                  <>
                    <Box
                      display={{ xs: "flex", md: "flex" }}
                      className="backIcon"
                      onClick={() => this.changeFaqState(2)}
                    >
                      <KeyboardBackspaceIcon /> Vehicle's FAQs
                    </Box>
                    <Container>
                      <Box className="faq-list">
                        <div className="faq-ans" onClick={() => {}}>
                          <span>Vehicles registration process</span>
                          <p>
                            Lorem ipsum is a placeholder text commonly used to
                            demonstrate the visual form of a document or a
                            typeface without relying on meaningful content.
                            Lorem ipsum may be used as a placeholder before
                            final copy is available.
                          </p>
                        </div>
                        <Button
                          fullWidth
                          variant="contained"
                          disableElevation
                          onClick={() => this.changeFaqState(1)}
                        >
                          Close
                        </Button>
                      </Box>
                    </Container>
                  </>
                )}
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

export default withStyles(FaqChairmanStyleWeb)(FaqResident);
// Customizable Area End
