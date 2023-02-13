import * as React from "react";
// custom components
import {
    Grid, Box,Typography,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withRouter } from 'react-router';
import FeesAndPaymentController, {
  Props
} from "./FeesAndPaymentController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListingComponent from "./LisitingComponent.web";
class FishAndPaymentOwner extends FeesAndPaymentController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols forFees">
                <Grid container style={{ margin: '1.1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1.1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1.1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                              {t("Budget")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box className="mainWindowInvoice">
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <ListingComponent name="Review Building Budget" link="/BuildingBudget" />
                        <ListingComponent name="Review Management fee" link="/MyManagementFee" />
                        <ListingComponent name="View Budget Spending" link="/BudgetSpending" />
                    </Grid>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(FishAndPaymentOwner))
// Customizable Area End
