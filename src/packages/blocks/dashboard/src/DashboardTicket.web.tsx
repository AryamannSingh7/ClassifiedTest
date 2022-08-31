// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import './Dashboard.web.css'
import {ticket_calendar, ticket, ticketclock} from "./assets"
import {
    Container,
    Typography,
    FormControl,
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
import Pagination from '@material-ui/lab/Pagination';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";

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
    }


    render() {
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
                        <Box style={dashBoardActions.navigation}>
                            <Box>
                                <Typography variant="body1" >
                                My Dashboards / <Box component="span" style={{color: "blue"}}>Ticket Dashboard</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>Ticket Dashboard</Typography>
                            </Box>
                            <Box>
                                <FormControl style={dashBoardActions.YearMain} className='yearTab'>
                                    <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                                        <option value={2022}>2022</option>
                                        <option value={2021}>2021</option>
                                        <option value={2020}>2020</option>
                                        <option value={2019}>2019</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>

                        <Grid container spacing={4} >
                            <Grid item sm={4}>
                                <Box style={dashBoardActions.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}>
                                        <img src={ticketclock} alt="ticketclock" width={25}/>
                                    </Box>
                                    <Typography style={dashBoardActions.subHeading}>Avereage Resolution Time</Typography>
                                    <Box style={dashBoardActions.bottomTwoSpan}>
                                        <Box component="span" style={dashBoardActions.bottomColor}>2</Box>
                                        <Typography variant="body2">days</Typography>
                                    </Box> 
                                </Box>
                            </Grid>
                            <Grid item sm={4}>
                                <Box style={dashBoardActions.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}>
                                        <img src={ticket} alt="ticket" />
                                    </Box>
                                    <Typography style={dashBoardActions.subHeading}>Ticket generated in 2022</Typography>
                                    <Box style={dashBoardActions.bottomTwoSpan}>
                                        <Box component="span" style={dashBoardActions.bottomColor}>73</Box>
                                        <Typography variant="body2">tickets</Typography>
                                    </Box> 
                                </Box>
                            </Grid> 
                            <Grid item sm={4}>
                                <Box style={dashBoardActions.Cards}>
                                    <Box sx={{ml:1, mb:2}} style={dashBoardActions.CardsIcons}>
                                    <img src={ticket_calendar} alt="ticket_calendar" width={25} />
                                    </Box>
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
                                <Typography  style={dashBoardActions.subHeading}>Showing 5 of 180 results</Typography>
                                <Pagination count={10} variant="outlined" shape="rounded" />
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
        borderBottom: "1px solid grey",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 55,
    },
};
  
  // Customizable Area End
