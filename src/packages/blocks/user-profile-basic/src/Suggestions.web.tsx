// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  Divider,
} from "@material-ui/core";
import { withRouter } from 'react-router';
import SuggestionsController, { Props } from "./SuggestionsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

class Suggestions extends SuggestionsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getSuggtionListing()

  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.suggestion}>
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
                      Community Management /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Suggestion
                      </Box>
                    </Typography>
                    <Box className="heading-top-bar">
                      <Typography variant="h5" className="sub-heading">
                        Suggestion
                      </Typography>
                      <Box className="filter">
                        {/* <select value="">
                          <option disabled value="">
                            Building
                          </option>
                          <option>Building</option>
                          <option>Building</option>
                          <option>Building</option>
                        </select> */}
                        {/* <select value="">
                          <option disabled value="">
                            Sort By
                          </option>
                          <option>Building</option>
                          <option>Building</option>
                          <option>Building</option>
                        </select> */}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3>Suggestion</h3>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase placeholder="Search" className="search" onChange={(e)=>this.searchSuggestion(e.target.value)} />
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Suggestion Title</TableCell>
                          <TableCell>Building</TableCell>
                          <TableCell>Unit Number</TableCell>
                          <TableCell>Sent By</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          this.state.suggestionList.map((item:any,index:any)=>(

                        <TableRow onClick={()=>this.openSuggestion(item)}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell className="ellipse">{item?.attributes?.title}</TableCell>
                          <TableCell>{item?.attributes?.building_management?.building_name}</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>{item?.attributes?.sent_by?.name || 'N/A'}</TableCell>
                          <TableCell>{item?.attributes?.date}</TableCell>
                          <TableCell>
                            <span className={item?.attributes?.response ?"green-span":"red-span"}>{item?.attributes?.response ? item?.attributes?.response?.data.length:0} Response</span>
                          </TableCell>
                        </TableRow>
                          ))
}
                      
                      </TableBody>
                    </Table>
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
// @ts-ignore
// @ts-nocheck
export default withRouter(withStyles(SuggestionStyleWeb)(Suggestions));
// Customizable Area End
