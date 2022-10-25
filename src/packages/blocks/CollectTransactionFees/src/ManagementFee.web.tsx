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
import ViewMyInvoicesController, {
  Props
} from "./ViewMyInvoicesController";
import './style.css'
import Select from '@material-ui/core/Select';
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Visitors extends ViewMyInvoicesController{
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
                              {t("View Management Fee")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
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
                            <Box style={{backgroundColor:"#2b6fed",borderRadius:"15px 15px 0px 0px"}}>
                                <Grid container style={{padding:"10px 15px"}}>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2" style={{color:"white",fontWeight:"bold"}}>
                                            {t("Facility")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2" style={{color:"white",fontWeight:"bold"}}>
                                            {t("Area(sq.ft)")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" style={{color:"white",fontWeight:"bold",textAlign:"right"}}>
                                            {t("Management Fee")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                bgcolor="white"
                                padding='15px'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Grid container style={{marginTop:"8px",marginBottom:"7px"}}>
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                {t("My Unit")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                200
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subtitle2" style={{textAlign:"right"}}>
                                                SR 20,000
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{marginTop:"8px",marginBottom:"7px"}}>
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                {t("Common")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                200
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subtitle2" style={{textAlign:"right"}}>
                                                SR 20,000
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{marginTop:"8px",marginBottom:"7px"}}>
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                {t("Tax")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                200
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subtitle2" style={{textAlign:"right"}}>
                                                SR 20,000
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Box style={{marginTop:"1px",backgroundColor:"white",padding:"10px 0px",borderRadius:"0px 0px 15px 15px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                                <Box style={{padding:"7px 15px",display:"flex",justifyContent:"space-between"}}>
                                    <Typography variant="body2">
                                        {t("Yearly Management fee")}
                                    </Typography>
                                    <Typography variant="body2" style={{fontWeight:"bold"}}>
                                        SR 44,500
                                    </Typography>
                                </Box>
                                <Box style={{padding:"7px 15px",display:"flex",justifyContent:"space-between"}}>
                                    <Typography variant="body2">
                                        {t("Monthly Management Fee")}
                                    </Typography>
                                    <Typography variant="body2" style={{fontWeight:"bold"}}>
                                        SR 44,500
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Typography variant="body2" style={{fontWeight:"bold",marginBottom:"10px"}}>
                                    {t("Note")}:
                                </Typography>
                                <Box display="flex">
                                    <Typography variant="subtitle2" style={{fontWeight:"bold",fontSize:"12px"}}>
                                        1.
                                    </Typography>
                                    <Typography variant="subtitle2" style={{marginLeft:"7px",fontSize:"12px"}}>
                                         Management Fee should be paid by 15th of every month.
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography variant="subtitle2" style={{fontWeight:"bold",fontSize:"12px"}}>
                                        2.
                                    </Typography>
                                    <Typography variant="subtitle2" style={{marginLeft:"7px",fontSize:"12px"}}>
                                        SR 15 will be charged per day for late payments
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{padding:"5px 0px",display:"flex",justifyContent:"space-between"}}>
                                        <Typography variant="body2">
                                            {t("Yearly Management fee")}
                                        </Typography>
                                        <Typography variant="body2" style={{fontWeight:"bold"}}>
                                            SR 44,500
                                        </Typography>
                                    </Box>
                                    <Box style={{padding:"5px 0px",display:"flex",justifyContent:"space-between"}}>
                                        <Typography variant="body2">
                                            {t("Monthly Management Fee")}
                                        </Typography>
                                        <Typography variant="body2" style={{fontWeight:"bold"}}>
                                            SR 44,500
                                        </Typography>
                                    </Box>
                                    <Box style={{padding:"5px 0px",display:"flex",justifyContent:"space-between"}}>
                                        <Typography variant="body2">
                                            {t("Total Area")}
                                        </Typography>
                                        <Typography variant="body2" style={{fontWeight:"bold"}}>
                                            625 sq.ft.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
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
