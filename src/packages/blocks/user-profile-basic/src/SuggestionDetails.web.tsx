// Customizable Area Start
import React from "react";
import { Container, Typography, withStyles, Box, Grid, Card, TextareaAutosize, Button } from "@material-ui/core";
import SuggestionsController, { Props } from "./SuggestionsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import { avatarIcon, calenderIcon, phone } from "./assets";
import { withRouter } from 'react-router';
class SuggestionDetails extends SuggestionsController {
  constructor(props: Props) {
    super(props);
  }

 
  render() {
    const { classes } = this.props;
    const item:any=JSON.parse(localStorage.getItem('selectSuggestion')!)



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
                          Suggestion is related to: <span>{item?.attributes?.suggestion_related?.related_to}</span>
                        </p>
                        <span className={item?.attributes?.response ? "green-span":"red-span"}>{item?.attributes?.response ? item?.attributes?.response?.data.length:0} Response</span>
                      </Box>
                      <p>Description</p>
                      <p>
                      {
                        item?.attributes?.description
                      }
                      </p>
                      <Box className="suggestion-info">
                        <Box className="info">
                          <img src={phone} />
                          <Box>
                            <p className="heading">Building</p>
                            <p>{item?.attributes?.building_management?.building_name}</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={avatarIcon} />
                          <Box>
                            <p className="heading">Sent By</p>
                            <p>{item?.attributes?.sent_by?.name || 'N/A'}</p>
                          </Box>
                        </Box>
                        <Box className="info">
                          <img src={calenderIcon} />
                          <Box>
                            <p className="heading">Sent On</p>
                            <p>{item?.attributes?.date}</p>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                  <Box className="response-input">
                    <Card>
                      <TextareaAutosize minRows={3} placeholder="Your Response" value={this.state.reposne} onChange={(e)=>this.setState({reposne:e.target.value})}/>
                      <Button onClick={()=>this.addResponse(item)}>Submit</Button>
                    </Card>
                  </Box>
                  <Box className="responses-box">
                    {
                     item?.attributes?.response !=null && 
                      item?.attributes?.response.data.map((data:any)=><>
                       <Card>
                      <Box className="response">
                        <p>
                          Response By: <span>{data?.attributes?.account?.full_name || 'N/A'}</span>
                        </p>
                        <pre>{data?.attributes?.description}</pre>
                      </Box>
                    </Card>
                      </>)
                   
                    }
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
// @ts-ignore
// @ts-nocheck
export default withRouter(withStyles(SuggestionStyleWeb)(SuggestionDetails));
// Customizable Area End
