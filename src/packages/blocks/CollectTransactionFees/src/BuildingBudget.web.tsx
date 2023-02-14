import * as React from "react";
// custom components
import {
    Grid, Box, Typography, Button, MenuItem,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import BuildingBudgetController, {
  Props
} from "./BuildingBudgetController";
import './style.css'
import Select from '@material-ui/core/Select';
import {withTranslation} from "react-i18next";


class BuildingBudget extends BuildingBudgetController{
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
                              {t("View Building Budget")}
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
                                    value={this.state.budgetYear}
                                    className="selectFYBox"
                                    disableUnderline
                                    style={{backgroundColor:"white",borderRadius:"100px"}}
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option value={(new Date().getFullYear() - 2)}>FY {(new Date().getFullYear() - 2)}-{(new Date().getFullYear() - 1).toString().slice(-2)}</option>
                                    <option value={(new Date().getFullYear() - 1)}>FY {(new Date().getFullYear() - 1)}-{(new Date().getFullYear()).toString().slice(-2)}</option>
                                    <option value={(new Date().getFullYear())}>FY {(new Date().getFullYear())}-{(new Date().getFullYear() + 1).toString().slice(-2)}</option>
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{backgroundColor:"#2b6fed",borderRadius:"15px 15px 0px 0px"}}>
                                <Box style={{padding:"10px 15px",display:"flex",justifyContent:"space-between"}}>
                                    <Typography variant="subtitle2" style={{color:"white",fontWeight:"bold"}}>
                                        {t("Facility")}
                                    </Typography>
                                    <Typography variant="subtitle2" style={{color:"white",fontWeight:"bold"}}>
                                        {t("Allocated Budget")}
                                    </Typography>
                                </Box>
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
                                    {
                                        this.state.budgetList?.map((item:any,key:any) => {
                                            return(
                                                <Box key={key} style={{display:"flex",justifyContent:"space-between",marginTop:"5px",marginBottom:"5px"}}>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        {t("Electricity")}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        SR 20,000
                                                    </Typography>
                                                </Box>
                                            )
                                        })
                                    }
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"5px",marginBottom:"5px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Electricity")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Water")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Cleaning")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Elevator")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Gym")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Swimming Pool")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Security")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Gardening")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Others")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                    <Box style={{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Complex Tax")}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SR 20,000
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{marginTop:"1px",backgroundColor:"white",borderRadius:"0px 0px 15px 15px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                                <Box style={{padding:"10px 15px",display:"flex",justifyContent:"space-between"}}>
                                    <Typography variant="body2">
                                        {t("Final Budget")}
                                    </Typography>
                                    <Typography variant="body2" style={{fontWeight:"bold"}}>
                                        SR 44,500
                                    </Typography>
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
                                padding='1rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{padding:"5px 0px",display:"flex",justifyContent:"space-between"}}>
                                        <Typography variant="body2">
                                            {t("Final Budget")}
                                        </Typography>
                                        <Typography variant="body2" style={{fontWeight:"bold"}}>
                                            SR 44,500
                                        </Typography>
                                    </Box>
                                    <Box style={{padding:"5px 0px",display:"flex",justifyContent:"space-between"}}>
                                        <Typography variant="body2">
                                            {t("Budget per sq. ft.")}
                                        </Typography>
                                        <Typography variant="body2" style={{fontWeight:"bold"}}>
                                            SR 44,500
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} style={{marginTop:"10px"}}>
                            <Box padding='10px'>
                                <CloseButton fullWidth>{t("Download budget document")}</CloseButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(BuildingBudget))

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
