// Customizable Area Start
//@ts-ignore
//@ts-nocheck

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
import Pagination from '@material-ui/lab/Pagination';
import SurveyReportController, {
  Props,
  configJSON,
} from "./SurveyReportController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import SearchIcon from '@material-ui/icons/Search';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import SurveryResponse from "./SurveyResponseModal.web"
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
function createData(name:any, unit:any, response:any) {
    return { name, unit, response};
}
const rows = [
    createData('Frozen yoghurt', 159, "Yes"),
    createData('Ice cream', 237, "Yes"),
    createData('Eclair', 262, "No"),
    createData('Cupcake', 305, "No"),
    createData('Gingerbread', 35, "Yes"),
    createData('Ginger', 56, "Yes"),
    createData('bread', 56, "No"),
    createData('Gingerbread', 56, "No"),
    createData('Gingerbread', 35, "No"),
    createData('Ginger', 56, "Yes"),
    createData('bread', 56, "No"),
    createData('Gingerbread', 56, "Yes"),
];


class PollReport extends SurveyReportController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    const {t} = this.props
    const surveyId =  window.location.search ? window.location.search.split("=")[1] : null;
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
                                    <Box component="span" onClick={()=> this.props.history.push("/SurveyAllData")} style={{cursor:"pointer"}}>
                                        {t("Created Surveys")}
                                    </Box>{" "}/ {" "} <Box component="span" onClick={()=> this.props.history.push(`/SurveyDetails?id=${surveyId}`)} style={{cursor:"pointer"}}> {t("Survey Details")} </Box> /{" "}
                                    <Box component="span" style={{color: "blue"}}>{t("Survey Report")}</Box>
                                </Typography>
                                <Typography variant="h5" className="subHeading">{t("Survey Report")}</Typography>
                            </Box>  
                            <Box className="downloadReport">
                                <button onClick={this.handleDownload} className="reportbtn"  style={{backgroundColor:"2B6FED",border:"0px"}}>
                                    {t("DOWNLOAD REPORT")}
                                </button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid style={{marginTop: "2rem", marginBottom:"5rem"}} className="PollResponseMain">
                        <Grid item sm={12} md={12} xs={12}>
                            <Box class="tableTopSearch" style={{marginTop:"0px"}}>
                                <h4>{this.state.surveyName}</h4>
                                <div className="searchBox" style={{width:"250px"}}>
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
                                            <TableCell style={{fontWeight:"600"}}>#</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Name")}</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Unit Number")}</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Response")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        this.state.surveyReport?.length > 0 &&
                                        <TableBody>
                                            {this.state.surveyReport?.map((row, index) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                                    <TableCell align="start">{row.name}</TableCell>
                                                    <TableCell align="start">
                                                        {
                                                            row.unit_number?.map((item,key)=>{
                                                                return(
                                                                    <>
                                                                        {item}
                                                                    </>
                                                                )
                                                            })

                                                        }
                                                    </TableCell>
                                                    <TableCell align="start"><Button variant="contained" color="inherit" onClick={()=>this.handleOpenAudienceModal(row.response_details)}>{t("View")}</Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    }
                                </Table>
                            </TableContainer>

                            <Divider />
                            <Box className="TableHeader">
                                <h5>{t("Showing")} {this.state?.reportPagination?.total_count > 10 ? (this.state.reportPagination?.total_count * this.state.reportPagination?.page) : this.state.reportPagination?.total_count} of {this.state.reportPagination?.total_count} {t("results")}</h5>
                                <Pagination count={Math.round(this.state.reportPagination?.total_count/10)} onChange={this.handleReportPagination} variant="outlined" shape="rounded" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Modal
                        aria-labelledby="filterModal"
                        aria-describedby="filtermodal"
                        className="modalStyle"
                        open={this.state.audienceModal}
                        onClose={this.handleCloseAudienceModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {/*@ts-ignore*/}
                        <Fade in={this.state.audienceModal}>
                            <div>
                                <SurveryResponse handleClose={this.handleCloseAudienceModal} response={this.state.responseModalData} />
                            </div>
                        </Fade>
                    </Modal>
                </Container>
            </Grid>
        </Box>
    </Box>
    
     </>
      );
  }
}

export default withTranslation()(withRouter(PollReport));

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
