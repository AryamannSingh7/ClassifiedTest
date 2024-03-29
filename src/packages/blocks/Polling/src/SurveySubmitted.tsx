import * as React from "react";
import {
    Button, Grid, Box, TextField, Typography, LinearProgress,InputAdornment,Checkbox
} from "@material-ui/core";
import {success} from "./assets"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import SurveyParticipateController, {
  Props
} from "./SurveyParticipateController";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"
import {withTranslation} from "react-i18next";
import '../../../web/src/i18n.js';

class SurveyParticipate extends SurveyParticipateController {
    constructor(props: Props) {
        super(props);
    }
    render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
          <Grid container>
              <Grid xs={10} style={{ display:"flex", alignItems:"center", gap:"1rem",margin:"10px 10px"}}>
                <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} style={{cursor:"pointer",marginLeft:"5px"}}/>
              </Grid>
              <Grid xs={12}>
              <Box style={{height:"94.5vh",display:'flex',flexDirection:"column",alignItems:'center'}}>
                <Box style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}}>
                    <img src={success} style={{marginBottom:"15px"}} />
                    <Typography variant="h5" style={{textAlign:'center',fontFamily: "Century Gothic",fontWeight:"bold"}}>
                        {t("Survey Response Submitted")}
                    </Typography>
                    <Typography variant="body1" style={{textAlign:'center',fontFamily: "Century Gothic",marginTop:"30px",width:"90%"}}>
                        {t("Survey Response Submitted Description")}
                    </Typography>
                </Box>
                <Box style={{width:"90%",marginBottom:"25px"}}>
                    <OkButton fullWidth size="large" onClick={() => this.props.history.push("/pollsSurvey")}>{t("Okay")}</OkButton>
                </Box>
              </Box>
          </Grid>
        </Grid>
        </>
    );
    }
}
export default withTranslation()(withRouter(SurveyParticipate));

const OkButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"45px",
        fontSize:"16px",
        textTransform:"initial",
        borderRadius:"100px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
