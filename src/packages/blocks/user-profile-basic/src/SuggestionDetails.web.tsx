// Customizable Area Start
import React from "react";
import { Container, Typography, withStyles, Box, Grid, Card, TextareaAutosize, Button } from "@material-ui/core";
import SuggestionsController, { Props } from "./SuggestionsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import { phone } from "./assets";

class SuggestionDetails extends SuggestionsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {}

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.suggestionDetails}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      Community Management / Suggestion /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Suggestion Details
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading">
                    <h3>Suggestion Details</h3>
                  </Box>
                </Box>
                <Box className="content-box">
                  <Box className="suggestion-detail">
                    <Card>
                      <Box className="heading">
                        <p>
                          Suggestion is related to: <span>Management Fee</span>
                        </p>
                        <span className="green-span">1 Response</span>
                      </Box>
                      <p>Description</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aliquid sint non numquam repellat
                        quos, at culpa inventore dicta totam dolore asperiores molestias accusamus, dolorum, saepe
                        assumenda natus nobis sequi.
                      </p>
                      <Box className="suggestion-info">
                        <Box className="info">
                          <img src={phone} />
                          <Box>
                            <p className="heading">Building</p>
                            <p>Building Name</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={phone} />
                          <Box>
                            <p className="heading">Sent By</p>
                            <p>Mr. Ali Khan</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={phone} />
                          <Box>
                            <p className="heading">Sent On</p>
                            <p>11-11-1111 11:11</p>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                  <Box className="response-input">
                    <Card>
                      <TextareaAutosize minRows={3} placeholder="Your Response" />
                      <Button>Submit</Button>
                    </Card>
                  </Box>
                  <Box className="responses-box">
                    <Card>
                      <Box className="response">
                        <p>
                          Response By: <span>Ali Khan</span>
                        </p>
                        <pre>Hi Ali! Your Suggestion sounds good. Thanks for the suggestion.</pre>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(SuggestionStyleWeb)(SuggestionDetails);
// Customizable Area End
