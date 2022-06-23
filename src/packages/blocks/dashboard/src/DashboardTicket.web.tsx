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
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";

function createData(name:any, unit:any, ticket:any) {
    return { name, unit, ticket };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6),
    createData('Ice cream sandwich', 237, 9),
    createData('Eclair', 262, 16),
    createData('Cupcake', 305, 67),
    createData('Gingerbread', 356, 3),
  ];

export default class DashboardTicket extends DashboardController {
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
        <Box style={dashBoardActions.navigation}>
            <Box>
                <Typography variant="body1" >
                My Dashboard / <Box component="span" style={{color: "blue"}}>Ticket Dashboard</Box>
                </Typography>
                <Typography variant="h5" style={dashBoardActions.subHeading}>Ticket Dashboard</Typography>
            </Box>
            <Box>
                <FormControl style={dashBoardActions.YearMain} className='yearTab'>
                    <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange} displayEmpty>
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
                <Box style={dashBoardActions.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}><AccessTimeIcon/></Box>
                    <Typography style={dashBoardActions.subHeading}>Avereage Resolution Time</Typography>
                    <Box style={dashBoardActions.bottomTwoSpan}>
                        <Box component="span" style={dashBoardActions.bottomColor}>2</Box>
                        <Typography variant="body2">days</Typography>
                    </Box> 
                </Box>
            </Grid>
            <Grid item sm={4}>
                <Box style={dashBoardActions.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}><PersonOutlineIcon/></Box>
                    <Typography style={dashBoardActions.subHeading}>Ticket generated in 2022</Typography>
                    <Box style={dashBoardActions.bottomTwoSpan}>
                        <Box component="span" style={dashBoardActions.bottomColor}>73</Box>
                        <Typography variant="body2">tickets</Typography>
                    </Box> 
                </Box>
            </Grid> 
            <Grid item sm={4}>
                <Box style={dashBoardActions.Cards}>
                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}><TodayOutlinedIcon/></Box>
                    <Typography style={dashBoardActions.subHeading}>Ticket tooks more than X days</Typography>
                    <Box style={dashBoardActions.bottomTwoSpan}>
                        <Box component="span" style={dashBoardActions.bottomColor}>12</Box>
                        <Typography variant="body2">tickets</Typography>
                    </Box> 
                </Box>
            </Grid>   
        </Grid>

    <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
        <Box style={dashBoardActions.TableHeader}>
            <Typography variant="h5" style={dashBoardActions.subHeading}>Number of tickets opened by residents</Typography>
            <SearchOutlinedIcon/>
        </Box>
        <TableContainer >
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"grey"}}>Name</TableCell>
                        <TableCell style={{color:"grey"}} align="center">Unit Number</TableCell>
                        <TableCell style={{color:"grey"}} align="center">Total tickets</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="center">{row.unit}</TableCell>
                            <TableCell align="center">{row.ticket}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box style={dashBoardActions.TableHeader}>
            <Typography variant="h5" style={dashBoardActions.subHeading}>Number of tickets opened by residents</Typography>
            <SearchOutlinedIcon/>
        </Box>
    </Box>    
      </Container>
     </>
      );
    }
  }
  
  
  
const dashBoardActions = {
    navigation:{
        display: "flex",
        justifyContent: "space-between",
    },
    subHeading: {
        fontWeight:600,
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
        borderBottom: "1px solid grey",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 55,
    }
};
  
  // Customizable Area End