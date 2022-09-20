import React, { Component } from 'react';
import {Box, IconButton, Button, TextField, Select, Typography, Divider, MenuItem,Paper} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class SurveyResponseModal extends Component<any, any> {
  constructor(props:any) {
    super(props);
  }
  render() {
    const {t,response,handleClose} = this.props
    return (
      <>
        <Box style={{width:"55vw",maxHeight:"500px",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"10px",overflowY:"scroll"}}>
            <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                <Typography variant="h5" style={{fontWeight:"bold"}}> {t("Response Details")} </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider/>
            <Box style={{marginTop:"15px"}}>
                <Box className="PollName">
                    <Typography className="subHeading">{t("Survey Name")}:</Typography>
                    <Typography className="PollNameText">
                        {response[0].survey_name || ""}
                    </Typography>
                </Box>
            </Box>
            {
                response.map((item:any,key:any)=>{
                    console.log("item",item)
                    return(
                        <Box style={{marginTop:"20px"}} key={key}>
                            <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{key+1}. {item.survey_question}</Typography>
                            {
                                item.response &&
                                <Typography style={{marginTop:"5px"}}>Response : {item.response}</Typography>
                            }
                            {
                                item.concern &&
                                <Typography style={{marginTop:"5px"}}>{item.response && item.concern ? "Comment":"Short Answer"} : {item.concern}</Typography>
                            }

                        </Box>
                    )
                })
            }
        </Box>
      </>
    );
  }
}

export default withTranslation()(SurveyResponseModal);
