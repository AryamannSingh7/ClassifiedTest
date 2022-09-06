// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
    Container,
    Typography,
    Link,
    Button,
    withStyles
  } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DashboardController, { Props } from "../../../blocks/dashboard/src/DashboardController";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class DashboardActions extends DashboardController {
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
                        <Box>
                            <Typography variant="body1" >
                            {t("My Dashboard")} / <Box component="span" style={{color: "blue"}}>{t("Action Assign to me")}</Box>
                            </Typography>
                            <Typography variant="h5" style={dashBoardActions.subHeading}>{t("Action Assign to me")}</Typography>
                        </Box>
                        <Box>
                            <Box style={dashBoardActions.Cards}>
                                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                                {t("To schedule a meeting")}
                                </Typography>
                                <Typography style={dashBoardActions.Cardspara}>
                                {t("Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.")}
                                </Typography>
                                <Button variant="contained" color="primary">Schedule a meeting</Button>
                            </Box>

                            <Box style={dashBoardActions.Cards}>
                                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                                {t("To assign rights to user")}
                                </Typography>
                                <Typography style={dashBoardActions.Cardspara}>
                                {t("Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.")}
                                </Typography>
                                <Button variant="contained" color="primary">{t("Assign Rights")}</Button>
                            </Box>

                            <Box style={dashBoardActions.Cards}>
                                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                                {t("To start chairman nomination process")}
                                </Typography>
                                <Typography style={dashBoardActions.Cardspara}>
                                {this.toggleState("Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.")}
                                </Typography>
                                <Button variant="contained" color="primary">{t("chairman Nomination")} </Button>
                            </Box>

                            <Box style={dashBoardActions.Cards}>
                                <Typography variant="subtitle1" style={dashBoardActions.CardsTitle}>
                                {t("To approve budget")}
                                </Typography>
                                <Typography style={dashBoardActions.Cardspara}>
                                {t("Display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.")}
                                </Typography>
                                <Button variant="contained" color="primary">{t("Approve Budget")}</Button>
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
 
  export default withTranslation()(withStyles(dashBoardActions)(withRouter(DashboardActions)));  
  
const dashBoardActions = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
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