import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Menu,MenuItem
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {shortIcon,filterIcon} from "../../BroadcastMessage/src/assets"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {Calander} from "./assets"
import BudgetSpendingController, {
  Props
} from "./BudgetSpendingController";
import './style.css'
import Select from '@material-ui/core/Select';
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Visitors extends BudgetSpendingController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("View my invoices")}
                          </p>
                      </Box>
                      <Box>
                        <IconButton style={{padding:"8px"}} onClick={this.handleClick}>
                            <img src={shortIcon} />
                        </IconButton>
                        <IconButton style={{padding:"8px"}} >
                            <img src={filterIcon} />
                        </IconButton>
                          <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={Boolean(this.state.anchorEl)}
                              onClose={this.handleClose}
                              
                          >
                              <MenuItem onClick={this.handleClose} style={{padding:"0px",minHeight:"20px"}}>Paid</MenuItem>
                              <MenuItem onClick={this.handleClose}>Due</MenuItem>
                              <MenuItem onClick={this.handleClose}>OverDue</MenuItem>
                          </Menu>
                    </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"75%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:".5rem"}}>
                        <Grid item xs={12}>
                            <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                <Typography variant={"body1"} style={{fontWeight:"bold"}} >
                                    Building Name
                                </Typography>
                                <Select
                                    native
                                    label="Age"
                                    value={10}
                                    className="selectFYBox"
                                    disableUnderline
                                    style={{backgroundColor:"white",borderRadius:"100px"}}
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option value={10}>FY 2022-23</option>
                                    <option value={20}>FY 2023-24</option>
                                    <option value={30}>FY 2024-25</option>
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/Spent/1")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            Yearly Elevator Service - 2022
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} color="textSecondary" >
                                                {t("Payment Amount")}:
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                SR 2,500
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"15px",alignSelf:'flex-end'}}>
                                            <Typography variant={"subtitle2"} color="textSecondary" >
                                                {t("Payment Date")}:
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                15-04-2022
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} style={{marginBottom:"15px",marginTop:"10px"}}>
                                            <Divider />
                                        </Grid>
                                        <Grid xs={12} style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
                                            <Box display="flex" alignItems="center">
                                                <img src={Calander} />
                                                <Typography variant="subtitle2" style={{marginLeft:"10px"}}>
                                                    21-06-22
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle2" className="paymentStatusGreen">
                                                Paid
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/Invoice/1")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            Yearly Elevator Service - 2022
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} color="textSecondary" >
                                                {t("Payment Amount")}:
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                SR 2,500
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"15px",alignSelf:'flex-end'}}>
                                            <Typography variant={"subtitle2"} color="textSecondary" >
                                                {t("Payment Date")}:
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                15-04-2022
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} style={{marginBottom:"15px",marginTop:"10px"}}>
                                            <Divider />
                                        </Grid>
                                        <Grid xs={12} style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
                                            <Box display="flex" alignItems="center">
                                                <img src={Calander} />
                                                <Typography variant="subtitle2" style={{marginLeft:"10px"}}>
                                                    21-06-22
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle2" className="paymentStatusGreen">
                                                Paid
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{position:"sticky",bottom:"0px",width:"100%",height:"125px",padding:"20px",backgroundColor:"white",borderRadius:"15px 15px 0px 0px"}}>
                    <Box style={{width:"90%",border:"1px solid #e4e4e4",borderRadius:"12px",marginRight:"20px",padding:"10px 0px"}}>
                        <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 15px"}}>
                            <Typography>
                                {t("Approved Budget Amount")}
                            </Typography>
                            <Typography style={{fontWeight:"bold"}}>
                                SR 44,500
                            </Typography>
                        </Box>
                        <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 15px"}}>
                            <Typography>
                                {t("Spent Amount")}
                            </Typography>
                            <Typography style={{fontWeight:"bold"}}>
                                SR 44,500
                            </Typography>
                        </Box>
                        <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 15px"}}>
                            <Typography>
                                {t("Reserve Amount")}
                            </Typography>
                            <Typography style={{fontWeight:"bold"}}>
                                SR 44,500
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(Visitors))

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
