// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
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
    TableRow
  } from "@material-ui/core";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NativeSelect from "@material-ui/core/NativeSelect";
import Select from "@material-ui/core/Select";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";

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

export default class DashboardBudget extends DashboardController {
    constructor(props: Props) {
      super(props);
      this.state = {
        dashboardData: [],
        errorMsg: "",
        token: "",
        loading: false,
        Year: "",
        expanded: '',
      };
       this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (event: any) => {
        // console.log('click', event.target.value)
        // this.setState({year: event.target.value});
    };
  

    render() {
      return ( 
      <>
      <Container>
        <Box style={dashBoardBudget.navigation}>
            <Box>
                <Typography variant="body1" >
                My Dashboard / <Box component="span" style={{color: "blue"}}>Budget Dashboard</Box>
                </Typography>
                <Typography variant="h5" style={dashBoardBudget.subHeading}>Budget Dashboard</Typography>
            </Box>
            <Box>
                <FormControl style={dashBoard.YearMain} className='yearTab'>
                    <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange} displayEmpty notchedOutline>
                         <option value="">None</option>
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>
            </Box>
        </Box>

        <Grid container spacing={4} >
            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><AccessTimeIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>Collected vs Budget Amount</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Typography variant="body2">Collected</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                    </Box> 
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Typography variant="body2">Budget</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 50000</Box>
                    </Box> 
                </Box>
            </Grid>
            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><PersonOutlineIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>Total Rent Due vs Rent Collected</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Typography variant="body2">Collected</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                    </Box> 
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Typography variant="body2">Budget</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 50000</Box>
                    </Box> 
                </Box>
            </Grid> 
            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><TodayOutlinedIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>Number of members have not paid management fee</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Box component="span" style={dashBoardBudget.bottomColor}>27</Box>
                        <Typography variant="body2">Members</Typography>
                    </Box> 
                </Box>
            </Grid>   


            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><TodayOutlinedIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>Total Expenses</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10000</Box>
                    </Box> 
                </Box>
            </Grid>  
            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><TodayOutlinedIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>Occupancy Rate</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Box style={dashBoardBudget.cardBottom}>
                            <Typography variant="body2">Sold</Typography>
                            <Box component="span" style={dashBoardBudget.bottomColor}>75%</Box>
                        </Box>
                        <Box style={dashBoardBudget.cardBottom}>
                            <Typography variant="body2">Unsold</Typography>
                            <Box component="span" style={dashBoardBudget.bottomColor}>25%</Box>
                        </Box>
                    </Box> 
                </Box>
            </Grid>  
            <Grid item sm={4}>
                <Box style={dashBoardBudget.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardBudget.CardsIcons}><TodayOutlinedIcon/></Box>
                    <Typography style={dashBoardBudget.subHeading}>View Approved Budget</Typography>
                    <Box style={dashBoardBudget.bottomTwoSpan}>
                        <Typography variant="body2">View Budget</Typography>
                    </Box> 
                </Box>
            </Grid>  
        </Grid>

        <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>
            <Grid item sm={6}>
                <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                    <Box style={dashBoardBudget.TableHeader}>
                        <Typography variant="h5" style={dashBoardBudget.subHeading}>Cash Flow</Typography>
                    </Box>
                    <TableContainer >
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color:"grey"}}>Name</TableCell>
                                    <TableCell style={{color:"grey"}} align="right">Amount</TableCell>
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
                        <Typography variant="h5" style={dashBoardBudget.FooterTotal}>Net Income</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10005</Box>
                    </Box>
                </Box>
            </Grid>

            <Grid item sm={6}>
                <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                    <Box style={dashBoardBudget.TableHeader}>
                        <Typography variant="h5" style={dashBoardBudget.subHeading}>Track Collected Money</Typography>
                    </Box>
                    <TableContainer >
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color:"grey"}}>Name</TableCell>
                                    <TableCell style={{color:"grey"}} align="right">Amount</TableCell>
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
                        <Typography variant="h5" style={dashBoardBudget.FooterTotal}>Net Collection</Typography>
                        <Box component="span" style={dashBoardBudget.bottomColor}>SR 10005</Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>

      </Container>
     </>
      );
    }
  }
  
  
  
const dashBoardBudget = {
    navigation:{
        display: "flex",
        justifyContent: "space-between",
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
        padding: 10,
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