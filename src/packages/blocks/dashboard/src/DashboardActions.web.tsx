// Customizable Area Start

import React from "react";
import {
    Container,
    Typography,
    Link,
    FormControl,
    MenuItem,
    Button
  } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";


export default class DashboardActions extends DashboardController {
    constructor(props: Props) {
      super(props);

    }
  

    render() {
      return ( 
      <>
      <Container>
        <Box>
            <Typography variant="body1" >
            My Dashboard / <Box component="span" style={{color: "blue"}}>Action Assign to me</Box>
            </Typography>
            <Typography variant="h5" style={dashBoardActions.subHeading}>Action Assign to me</Typography>
        </Box>
        <Box>
            <Box style={dashBoardActions.Cards}>
                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                To schedule a meeting
                </Typography>
                <Typography style={dashBoardActions.Cardspara}>
                Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.
                </Typography>
                <Button variant="contained" color="primary">Schedule a meeting</Button>
            </Box>

            <Box style={dashBoardActions.Cards}>
                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                To assign rights to user
                </Typography>
                <Typography style={dashBoardActions.Cardspara}>
                Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.
                </Typography>
                <Button variant="contained" color="primary">Assign Rights</Button>
            </Box>

            <Box style={dashBoardActions.Cards}>
                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                To start chairman nomination process
                </Typography>
                <Typography style={dashBoardActions.Cardspara}>
                Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.
                </Typography>
                <Button variant="contained" color="primary">chairman Nomination </Button>
            </Box>

            <Box style={dashBoardActions.Cards}>
                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                To approve budget
                </Typography>
                <Typography style={dashBoardActions.Cardspara}>
                Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.
                </Typography>
                <Button variant="contained" color="primary">Approve Budget</Button>
            </Box>
        </Box>
        
      </Container>
     </>
      );
    }
  }
  
  
  
const dashBoardActions = {
    subHeading: {
        fontWeight:600,
        marginTop:15,
        marginBottom: 20,
    },
    Cards: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingBottom: 25,
        paddingRight:5,
        background: "#fff",
        borderRadius: 10,
        marginBottom: 20,
    },
    CardsTitle:{
        fontWeight:600,
        fontSize:16,
        marginBottom:10,
    },
    Cardspara:{
        fontSize:14,
        marginBottom:15,
    }
};
  
  // Customizable Area End