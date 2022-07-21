//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';


class ResidentDashboard extends  React.Component {
  
  render() {
    return (
        <>
    
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Box style={{ marginLeft: '1rem', width:'90%'}}>
            <Grid style={{textAlign: "center", marginTop: "50%"}}>
                <h1>Resident Dashboard</h1>
                <h3>Comming Soon</h3>
            </Grid>
        </Box>

      </>
    );
  }
}
export default withRouter(ResidentDashboard)


// Customizable Area End
