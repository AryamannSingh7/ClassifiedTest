// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {riyal, expense, statistic, removeuser, approvedbudget, keyrented} from "./assets"

import {
    Container,
    Typography,
    Link,
    FormControl,
    MenuItem,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
  } from "@material-ui/core";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NativeSelect from "@material-ui/core/NativeSelect";
import Select from "@material-ui/core/Select";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

function createData(Name:any, Amount:any) {
    return { Name, Amount };
  }
  
  const rows = [
    createData('Sales Revenue', 10000),
    createData('Cost of Services Sold', 2300),
    createData('Operating Expenses', 26285),
    createData('Operating Income', 30050),
    createData('Other Revenue and Expenses', 10356),
  ];

class DashboardBudget extends DashboardController {
    constructor(props: Props) {
      super(props);
      
    }
  

    render() {
        const {t} = this.props
      return ( 
      <>
        <Box style={{background: "#E5ECFF"}}>
            {/* Dashboard Header -- */}
            <DashboardHeader {...this.props}/>
            <Box style={{display: "flex"}}>
                
                <Grid item xs={3} md={3} sm={3} className="SideBar">
                    {/* Chairman Sidebar -- */}
                    <ChairmanSidebar {...this.props}/>
                </Grid>

                <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
                    <Container>
                        <Box style={dashBoardBudget.navigation}>
                            <Box>
                                <Typography variant="body1" >
                                {t("My Dashboard")} / <Box component="span" style={{color: "blue"}}>{t("Budget Dashboard")}</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardBudget.PageHeading}>{t("Budget Dashboard")}</Typography>
                            </Box>
                            <Box>
                                <FormControl style={dashBoardBudget.YearMain} className='yearTab'>
                                    <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                                        <option value={2022}>2022</option>
                                        <option value={2021}>2021</option>
                                        <option value={2020}>2020</option>
                                        <option value={2019}>2019</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>

                        <Grid container spacing={4} style={{marginTop: 15}}>
                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={riyal} alt="riyal" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t('Collected vs Budget Amount')}</Typography> 
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Typography variant="body2">{t("Collected")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                                    </Box> 
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Typography variant="body2">{t("Budget")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 50000</Box>
                                    </Box> 
                                </Box>
                            </Grid>
                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={keyrented} alt="keyrented"/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t("Total Rent Due vs Rent Collected")}</Typography>
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Typography variant="body2">{t("Collected")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                                    </Box> 
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Typography variant="body2">{t("Budget")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 50000</Box>
                                    </Box> 
                                </Box>
                            </Grid> 
                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={removeuser} alt="removeuser" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t("Number of members have not paid management fee")}</Typography>
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>27</Box>
                                        <Typography variant="body2"><table></table>{t("Members")}</Typography>
                                    </Box> 
                                </Box>
                            </Grid>   


                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={expense} alt="expense" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t("Total Expenses")}</Typography>
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                                    </Box> 
                                </Box>
                            </Grid>  
                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={statistic} alt="statistic" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t("Occupancy Rate")}</Typography>
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Box style={dashBoardBudget.cardBottom}>
                                            <Typography variant="body2">{t("Sold")}</Typography>
                                            <Box component="span" style={dashBoardBudget.bottomColor}>75%</Box>
                                        </Box>
                                        <Box style={dashBoardBudget.cardBottom}>
                                            <Typography variant="body2">{t("Unsold")}</Typography>
                                            <Box component="span" style={dashBoardBudget.bottomColor}>25%</Box>
                                        </Box>
                                    </Box> 
                                </Box>
                            </Grid>  
                            <Grid item sm={4}>
                                <Box style={dashBoardBudget.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}>
                                        <img src={approvedbudget} alt="approvedbudget" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardBudget.subHeading}>{t("View Approved Budget")}</Typography>
                                    <Box style={dashBoardBudget.bottomTwoSpan}>
                                        <Typography variant="body2">{t("View Budget")}</Typography>
                                    </Box> 
                                </Box>
                            </Grid>  
                        </Grid>

                        <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>
                            <Grid item sm={6}>
                                <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                                    <Box style={dashBoardBudget.TableHeader}>
                                        <Typography variant="h5" style={dashBoardBudget.subHeading}>{t("Cash Flow")}</Typography>
                                    </Box>
                                    <TableContainer >
                                        <Table  aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{color:"grey"}}>{t("Name")}</TableCell>
                                                    <TableCell style={{color:"grey"}} align="right">{t("Amount")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.Name}>
                                                        <TableCell component="th" scope="row">{row.Name}</TableCell>
                                                        <TableCell align="right" style={{fontWeight:600}}>SR {row.Amount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box style={dashBoardBudget.TableFooter}>
                                        <Typography variant="h5" style={dashBoardBudget.FooterTotal}>{t("Net Income")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10005</Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item sm={6}>
                                <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                                    <Box style={dashBoardBudget.TableHeader}>
                                        <Typography variant="h5" style={dashBoardBudget.subHeading}>{t("Track Collected Money")}</Typography>
                                    </Box>
                                    <TableContainer >
                                        <Table  aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{color:"grey"}}>{t("Name")}</TableCell>
                                                    <TableCell style={{color:"grey"}} align="right">{t("Amount")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.Name}>
                                                        <TableCell component="th" scope="row">{row.Name}</TableCell>
                                                        <TableCell align="right" style={{fontWeight:600}}>SR {row.Amount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box style={dashBoardBudget.TableFooter}>
                                        <Typography variant="h5" style={dashBoardBudget.FooterTotal}>{t("Net Collection")}</Typography>
                                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10005</Box>
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
  
  export default withTranslation()(withStyles(dashBoardBudget)(withRouter(DashboardBudget)));  
  
const dashBoardBudget = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
    navigation:{
        display: "flex",
        justifyContent: "space-between",
    },
    PageHeading: {
        fontWeight:600,
        marginTop:15,
    },
    subHeading: {
        fontWeight:600,
        fontSize:14,
        marginTop:15,
        marginBottom: 20,
    },
    YearMain:{
        background: "#fff",
        border: "1px solid #dfd4d4",
        borderRadius: 5,
        paddingLeft:15,
        paddingRight: 15,
    },
    Cards: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingBottom: 25,
        background: "#fff",
        borderRadius: 10,
        height: 140,
    },
    CardsIcons:{
        border: "1px solid #d9d4d3",
        borderRadius: "50%",
        width: 25,
        height: 25,
        padding: 15,
        color:"#054c94",
    },
    bottomColor:{
        color: "red"
    },
    bottomTwoSpan:{
        display: "flex", 
        gap: 5, 
        marginTop: 10
    },
    TableHeader:{
        display: "flex",
        borderBottom: "2px solid #e2e2ef",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    TableFooter:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    FooterTotal:{
        fontSize:18,
        marginTop:15,
        marginBottom: 20,
    },
    cardBottom:{
        display: "flex",
        gap: 10,
        marginRight: 10,
    },
};
  
  // Customizable Area End