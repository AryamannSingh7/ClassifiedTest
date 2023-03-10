// Customizable Area Start

import React from "react";
import "./Polling.web.css"
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  InputBase
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// @ts-ignore
import Pagination from '@material-ui/lab/Pagination';
import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import SearchIcon from '@material-ui/icons/Search';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

function createData(name:any, unit:any, response:any) {
    return { name, unit, response};
}

class PollReport extends PollingController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    const pollID =  window.location.search ? window.location.search.split("=")[1] : null;
    return ( 
      <>
    <Box style={{background: "#F7F9FE"}}>
        <DashboardHeader {...this.props}/>
      
        <Box style={{display: "flex"}}>
            
            <Grid item xs={3} md={3} sm={3} className="SideBar">
                <ChairmanSidebar {...this.props}/>
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
                <Container>

                    <Grid item sm={12} md={12} xs={12}>
                        <Box className="navigation">
                            <Box>
                                <Typography variant="body1" >
                                    <Box component="span" onClick={()=> this.props.history.push("/Polling")} style={{cursor:"pointer"}}>{t("Poll and survey")}
                                    </Box>
                                    {" "}/{" "}
                                    <Box component="span" onClick={()=> this.props.history.push("/PollsallData")} style={{cursor:"pointer"}}>
                                        {t("Created Polls")}
                                    </Box>{" "}/ {" "} <Box component="span" onClick={()=> this.props.history.push(`/PollDetails?id=${pollID}`)} style={{cursor:"pointer"}}> {t("Poll Details")} </Box> /
                                    <Box component="span" style={{color: "blue"}}>{t("Poll Report")}</Box>
                                </Typography>
                                <Typography variant="h5" className="subHeading">{t("Poll Report")}</Typography>
                            </Box>  
                            <Box className="downloadReport">
                                <button onClick={this.handleDownload} className="reportbtn" style={{backgroundColor:"2B6FED",border:"0px"}}>
                                    {t("DOWNLOAD REPORT")}
                                </button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid style={{marginTop: "2rem", marginBottom:"5rem"}} className="PollResponseMain">
                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="tableTopSearch" marginTop="0px">
                                <h4>{this.state.pollName}</h4>
                                <div className="searchBox">
                                    <div className="searchIcon">
                                    <SearchIcon />
                                    </div>
                                    <InputBase
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{marginLeft:"2.5rem"}}
                                    value={this.state.reportSearch}
                                    onChange={this.handleReportSearch}
                                    />
                                </div>
                            </Box>

                            <Divider />

                            <TableContainer >
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{fontWeight:600}}>#</TableCell>
                                            <TableCell style={{fontWeight:600}} align="left">{t("Name")}</TableCell>
                                            <TableCell style={{fontWeight:600}} align="left">{t("Unit Number")}</TableCell>
                                            <TableCell style={{fontWeight:600}} align="left">{t("Response")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        this.state.generatePollReport?.length > 0 &&
                                        <TableBody>
                                            {this.state?.generatePollReport?.map((row:any, index:any) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                                    <TableCell align="left">{row.attributes?.name_and_option?.data?.attributes?.full_name}</TableCell>
                                                    <TableCell align="left">
                                                        {
                                                            row.attributes?.name_and_option?.data?.attributes?.unit_number?.join(",")
                                                        }
                                                    </TableCell>
                                                    <TableCell align="left">{row.attributes?.name_and_option?.data?.attributes?.option}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    }
                                </Table>
                            </TableContainer>

                            <Divider />
                            <Box className="TableHeader">
                                <h5>{t("Showing")} {this.state.reportPagination.total_count > 10 ? (this.state.reportPagination.total_count * this.state.reportPagination.page) : this.state.reportPagination.total_count} of {this.state.reportPagination.total_count} {t("results")}</h5>
                                <Pagination count={Math.round(this.state.reportPagination.total_count/10)} onChange={this.handleReportPagination} variant="outlined" shape="rounded" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Box>
    </Box>
    
     </>
      );
  }
}

// @ts-ignore
export default  withTranslation()(withRouter(PollReport));

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
