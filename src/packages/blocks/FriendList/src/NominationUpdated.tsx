import * as React from "react";
import {
    Button, Grid, Box, TextField, Typography, LinearProgress,InputAdornment,Checkbox
} from "@material-ui/core";
import {success} from "../../Polling/src/assets"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import {withTranslation} from "react-i18next";
import '../../../web/src/i18n.js';

class SurveyParticipate extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
    const {t} = this.props
    return (
        <>
          <Grid container>
              <Grid xs={10} style={{ display:"flex", alignItems:"center", gap:"1rem",margin:"10px 10px"}}>

              </Grid>
              <Grid xs={12}>
              <Box style={{height:"94.5vh",display:'flex',flexDirection:"column",alignItems:'center'}}>
                <Box style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}}>
                    <img src={success} style={{marginBottom:"15px"}} />
                    <Typography variant="h5" style={{textAlign:'center',fontFamily: "Century Gothic",fontWeight:"bold"}}>
                        {t("Nomination Updated")}
                    </Typography>
                    <Typography variant="body1" style={{textAlign:'center',fontFamily: "Century Gothic",marginTop:"30px",width:"90%"}}>
                        {t("Your nomination for the election has been successfully Updated.")}
                    </Typography>
                </Box>
                <Box style={{width:"90%",marginBottom:"25px"}}>
                    <OkButton fullWidth size="large" onClick={() => window.history.go(-2)}>{t("Okay")}</OkButton>
                </Box>
              </Box>
          </Grid>
        </Grid>
        </>
    );
    }
}
export default withTranslation()(withRouter(SurveyParticipate));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const OkButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"55px",
        fontSize:"16px",
        textTransform:"uppercase",
        borderRadius:"100px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);
// Customizable Area End
