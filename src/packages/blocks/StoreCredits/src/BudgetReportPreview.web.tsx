// Customizable Area Start
import React from "react";
import "../../Polling/src/Polling.web.css"
// @ts-ignore
import DOMPurify from 'dompurify'
import 'draft-js/dist/Draft.css';

import {
    Container,
    Typography,
    Button, Divider, Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import GenerateBudgetReportController, {
  Props
} from "./GenerateBudgetReportController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import 'web/src/i18n.js';
import {withStyles} from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";

class SurveyPreview extends GenerateBudgetReportController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return ( 
      <>
          <Box style={{background: "#E5ECFF"}}>
              <DashboardHeader {...this.props}/>

              <Box style={{display: "flex"}}>

                  <Grid item xs={3} md={3} sm={3} className="SideBar">
                      <ChairmanSidebar {...this.props}/>
                  </Grid>

                  <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
                      <Container>
                          <Box className="navigation">
                              <Box>
                                  <Typography variant="body1" >
                                      {t("Budget Report")} / {t("Generate Report")} / <Box component="span" style={{color: "blue"}}>{t("Preview Report")}</Box>
                                  </Typography>
                                  <Typography variant="h5" className="subHeading">{t("Preview Report")}</Typography>
                              </Box>
                          </Box>

                          <Grid style={{marginBottom:"5rem"}} className="createPSCards">
                              <Grid className="meeting-table">
                                  <Grid item sm={12} md={12} xs={12}>
                                      <Box className="table-top" style={{marginBottom:"20px"}}>
                                          <h4>{t("Budget")} {this.state.budgetYear}</h4>
                                      </Box>
                                      <Divider />
                                      <Table className="table-box">
                                          <TableHead>
                                              <TableRow>
                                                  <TableCell align="left" style={{color:"#181D25"}}>{t("Name")}</TableCell>
                                                  <TableCell align="right" style={{ paddingRight: "50px",color:"#181D25" }}>
                                                      {t("Amount")}
                                                  </TableCell>
                                              </TableRow>
                                          </TableHead>
                                          <TableBody>
                                              {
                                                  this.state.budgetItems.map((item:any,key:any)=> {
                                                      return(
                                                          <TableRow key={key}>
                                                              <TableCell align="left" style={{ display: "flex", alignItems: "center" }}>
                                                                  {item.budget_category}
                                                                  <HtmlTooltip
                                                                      title={
                                                                          <React.Fragment>
                                                                              <Box style={{ margin: "10px" }}>
                                                                                  <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                                                                      {item.budget_category}
                                                                                  </Typography>
                                                                                  <Typography variant="subtitle2"
                                                                                              dangerouslySetInnerHTML={
                                                                                                  { __html: DOMPurify.sanitize(item.description) }
                                                                                              }/>
                                                                              </Box>
                                                                          </React.Fragment>
                                                                      }
                                                                  >
                                                                      <IconButton style={{ padding: "2px" }}>
                                                                          <InfoOutlinedIcon style={{ color: "#2B6FED", fontSize: "20px" }} />
                                                                      </IconButton>
                                                                  </HtmlTooltip>
                                                              </TableCell>
                                                              <TableCell align="right" style={{ paddingRight: "50px" }}>
                                                                  SR {item.allocate_budget}
                                                              </TableCell>
                                                          </TableRow>
                                                      )
                                                  })
                                              }
                                              <TableRow>
                                                  <TableCell  align="left" style={{ display: "flex", alignItems: "center" }}>
                                                      <Typography variant="body1">Budget Amount</Typography>
                                                  </TableCell>
                                                  <TableCell align="right" style={{ paddingRight: "50px" }}>
                                                      <Typography variant="body1" style={{fontWeight:"bold",color:"#FC8434",paddingRight:"0px"}}> SR {this.state.totalBudget} </Typography>
                                                  </TableCell>
                                              </TableRow>
                                          </TableBody>
                                      </Table>
                                  </Grid>
                              </Grid>
                              <Grid  item sm={12} md={12} xs={12}>
                                  <Box className="BottomButtonSurvey">
                                      <Box className="Previewbtn">
                                          <AudienceButton onClick={this.handlePreviewForm} variant="contained" color="primary">{t("Edit")}</AudienceButton>
                                      </Box>
                                      <Box className="Publishbtn">
                                          <PublishButton onClick={this.handleGenerateReport} type="submit" variant="outlined" color="primary">{t("PUBLISH")}</PublishButton>
                                      </Box>
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


export default withTranslation()(withRouter(SurveyPreview));

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "white",
        color: "black",
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}))(Tooltip);


const AudienceButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);
// Customizable Area End
