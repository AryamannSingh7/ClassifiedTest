// Customizable Area Start

import React from "react";
import {
    Container,
    Typography,
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

import Select from "@material-ui/core/Select";
import DashboardController, { Props } from "./DashboardController";

function createData(Name:any, Amount:any) {
    return { Name, Amount };
  }
  
  const rows = [
    createData('Sales Revenue', 10000),
    createData('Cost of Services Sold', 2300),
    createData('Operating Expenses', 26285),
    createData('Operating Income', 30050),
    createData('Other Revenue and Expenses', 10356),
    createData('Sales Revenue', 10000),
    createData('Cost of Services Sold', 2300),
    createData('Operating Expenses', 26285),
    createData('Operating Income', 30050),
    createData('Other Revenue and Expenses', 10356),
  ];

export default class BudgetDetails extends DashboardController {
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
        console.log('click', event.target.value)
        // this.setState({year: event.target.value});
    };
  

    render() {
      return ( 
      <>
      <Container>
        <Box style={dashBoardBudget.navigation}>
            <Box>
                <Typography variant="body1" >
                My Dashboard / Budget Dashboard / <Box component="span" style={{color: "blue"}}>Budget 2022</Box>
                </Typography>
                <Typography variant="h5" style={dashBoardBudget.subHeading}>Budget 2022</Typography>
            </Box>
            <Box>
                <FormControl style={dashBoardBudget.YearMain}>
                    <Select value={this.state.Year} onChange={this.handleChange} displayEmpty>
                        <MenuItem value="">
                            <em>2020</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>

        <Grid container spacing={4} style={{marginBottom:30}}>
            <Grid item sm={12}>
                <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                    <Box style={dashBoardBudget.TableHeader}>
                        <Typography variant="h5" style={dashBoardBudget.subHeading}>Budget 2022</Typography>
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