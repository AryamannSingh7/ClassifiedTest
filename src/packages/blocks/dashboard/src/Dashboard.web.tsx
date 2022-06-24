// Customizable Area Start
// @ts-ignore
// @ts-nocheck

import React from "react";
import './Dashboard.web.css'
// Components imported start
import DashboardGeneral from "./DashboardGeneral.web";
import DashboardActions from "./DashboardActions.web"
import DashboardTicket from "./DashboardTicket.web"
import DashboardBudget from "./DashboardBudget.web"
import BudgetDetails from "./BudgetDetails.web"
import Polling from "../../Polling/src/Polling.web";
import PollsGrid from "../../Polling/src/PollsGrid.web";
import SurveyGrid from "../../Polling/src/SurveyGrid.web";

// Components imported end
//images and Icons start
// import tenantLogo from "./assets"
// import globalIcon from "./assets"
// import buildingLogo from "./assets"
// import chairmanUser from "./assets"

import TenantLogo from "../assets/TenantLogo.png"
import GlobalIcon from "../assets/globalicon.png"
import BuildingLogo from "../assets/BuildingLogo.png"
import ChairmanUser from "../assets/ChairmanUser.jpg"

import "../../../web/src/assets/css/style.scss";

//images and Icons end

import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
  } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import { styled } from "@material-ui/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import DashboardController, { Props } from "./DashboardController";


const ItemsList = [
    
    "My Dashboards",
    "My Team",
    "Community Management",
    "Invoices & Receipts",
    "Meetings",
    "Buildings & Apartments",
    "Poll/Survey",
    "Documents & Reports",
    "Chat",
    "Help"
]

export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return ( 
    <>
    <Box>
        <Box>
            <Box style={dashBoard.Header}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6} sm={6}
                        style={dashBoard.HeaderSecLft}
                    >
                        <img src={BuildingLogo} alt="BuildingLogo" width={70}/>
                        {/* <buildingLogo/> */}
                        <Typography variant="h6">Building Name</Typography>
                    </Grid>
                    <Grid item xs={6} md={6} sm={6}
                        style={dashBoard.HeaderSecRft}
                    >
                        <img src={GlobalIcon} alt="GlobalIcon" />
                        {/* <globalIcon/> */}
                        <NotificationsNoneOutlinedIcon/>
                        <Box 
                            style={dashBoard.HeaderSecRtBox}
                        >
                            <img src={ChairmanUser} alt="ChairmanUser"
                            width={50}
                            style={{borderRadius: "50%"}}
                            />
                            {/* <chairmanUser/> */}
                            <Box>
                                <Typography variant="subtitle1">User Name</Typography>
                                <Typography variant="body2">Chairman</Typography>
                            </Box>
                            
                        </Box>
                        <KeyboardArrowDownIcon/>
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
        <Box container spacing={4} style={{display: "flex"}}>

            <Grid item xs={3} md={3} sm={3} style={dashBoard.SideBar}>
                <Box className='AccordinoList'>
                    {ItemsList.map((val, index) => 
                        <Accordion 
                        expanded={this.state.expanded == `panel + ${index}`} 
                        onChange={this.handleAccordinoChange(`panel + ${index}`)}
                        >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel" + index + "bh-content"}
                        id={"panel" + index + "bh-header"}
                        style={dashBoard.ListItem}
                        >
                        <Typography><DashboardOutlinedIcon/></Typography>
                        <Typography style={dashBoard.ListItemText}>{val}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>sub headings</Typography>
                        </AccordionDetails>
                        </Accordion>
                    )}
                </Box>

                <Box style={dashBoard.SideBarBottom}>
                    <Box>
                        <Typography style={{fontSize:10, fontWeight: 600}}>
                            <Box component="span" style={dashBoard.PremimumPlan}>
                                Premimum
                            </Box>
                                Plan
                        </Typography>   
                        <Typography style={{fontSize:12, marginTop:10}}>Expires in 125 days</Typography>
                    </Box>
                    <Box>
                        {/* <tenantLogo/> */}
                        <img src={TenantLogo} alt="TenantLogo"
                        width={110}
                        />
                    </Box>
                </Box> 
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35, background:"#C8E3D4"}}>
                        <DashboardGeneral/>
                    {/* <DashboardTicket/> */}
                    {/* <DashboardBudget/> */}
                    {/* <BudgetDetails/> */}
                    {/* <DashboardActions/> */}

                    {/* <Polling/> */}
                    {/* <PollsGrid/> */}
                    {/* <SurveyGrid/> */} 
            </Grid>
        </Box> 
    </Box>
   </>
    );
  }
}


const dashBoard = {
    container: {
         overflowX: "hidden",
        overflowY: "auto"
    },
    Header: {
        background: "#fff",
        padding:20,
    },
    HeaderSecLft: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "20px",
    },
    HeaderSecRft: {
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: "20px",
    },
    HeaderSecRtBox: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "20px",
    },
    PremimumPlan:{
        background: "#ff8100",
        padding: 8,
        borderRadius: "5px",
        marginRight: 8,
    },
    
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
    SideBarBottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems:"last baseline",
        gap: 60,
        position: "absolute",
        bottom: 0,
        paddingBottom: 20,
        marginLeft:20,
        marginRight:25,
    },
    ListItem: {
        color: "black",
        marginTop:25,
    },
    ListItemText: {
        marginLeft:15,
        fontSize:14,
    }
  };

// Customizable Area End