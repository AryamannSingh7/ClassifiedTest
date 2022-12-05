// Customizable Area Start
import React from "react";
import "../../Polling/src/Polling.web.css"
import 'draft-js/dist/Draft.css';
import {
    Container,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import 'date-fns';
import InfoIcon from '@material-ui/icons/Info';
// Icons

import GenerateBudgetReportController, {
  Props
} from "./GenerateBudgetReportController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import TextEditor from "./TextEditorGenerateReport.web";
import Backdrop from "@material-ui/core/Backdrop";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

class CreateSurveys extends GenerateBudgetReportController {
  constructor(props: Props) {
    super(props);

  }
  render() {
    // @ts-ignore
    const {t} = this.props
    return ( 
      <>
    <Box style={{background: "#E5ECFF"}}>
        <DashboardHeader {...this.props}/>
      
        <Box style={{display: "flex"}}>
            
            <Grid item xs={3} md={3} sm={3} className="SideBar">
                <ChairmanSidebar {...this.props}/>
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
                <Container>
                    <Box className="navigation">
                        <Box>
                            <Typography variant="body1" >
                                {t("Documents & Reports")} / {t("Reports")} / {t("Budget Reports")} /{" "}
                                <Box component="span" style={{color: "blue"}}>{t("Generate Budget Report")}</Box>
                            </Typography>
                            <Typography variant="h4" className="subHeading">{t("Generate Budget Report")}</Typography>
                        </Box>
                    </Box>
                    <form>
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={12} xs={12}>
                                <Box className="createPSCards">
                                    <TextField label={t("Enter budget year")} variant="outlined"
                                    name="title"
                                    id="SurveyQuestion"
                                    value={this.state.budgetYear}
                                    onChange={(e)=> this.setState({budgetYear:e.target.value})}
                                    inputProps={{
                                        maxLength: 40
                                    }}
                                    required fullWidth
                                    />
                                    <p style={{color:"red"}}>{t(this.state.budgetYearError)}</p>
                                </Box>
                            </Grid>
                            {
                                this.state.budgetItems.map((item:any,key:any)=>{
                                    return(
                                        <Grid item sm={12} md={12} xs={12} style={key === 0 ? {marginTop:"-20px"}: {marginTop:"35px"}}>
                                            <Box className="createPSCards">
                                                <Grid container spacing={2} style={{marginTop:"-20px",marginBottom:"15px"}}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField  label={t("Enter Budget Category")} variant="outlined"
                                                                    name="question"
                                                                    inputProps={{
                                                                        maxLength: 255
                                                                    }}
                                                                    id="SurveyQuestion"
                                                                    value={item.budgetCategory}
                                                                    onChange={(e)=>this.handleBudgetCategory(key,e)}
                                                                    required fullWidth style={{marginTop:20,borderRadius:"10px"}}
                                                        />
                                                        <p style={{color:"red"}}>{t(item.budgetCategoryError)}</p>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField  label={t("Enter Amount")} variant="outlined"
                                                                    name="amount"
                                                                    type="number"
                                                                    inputProps={{
                                                                        maxLength: 255
                                                                    }}
                                                                    id="SurveyQuestion"
                                                                    value={item.amount}
                                                                    onChange={(e)=>this.handleBudgetAmount(key,e)}
                                                                    required fullWidth style={{marginTop:20,borderRadius:"10px"}}
                                                        />
                                                        <p style={{color:"red"}}>{t(item.amountError)}</p>
                                                    </Grid>
                                                </Grid>
                                                <Box className="infoIcon">
                                                    <Typography variant="subtitle1">{t("Description")}</Typography>
                                                    <InfoIcon style={{color:"grey", fontSize:18}}/>
                                                </Box>
                                                <Box className="descriptionEditor" style={{maxHeight:"200px",overflow:"hidden"}}>
                                                    <TextEditor
                                                        // @ts-ignore
                                                        markup={item.description}
                                                        onChange={(value:any) => this.onChangeTextEditor(value,key)} />
                                                </Box>
                                                <p style={{color:"red"}}>{item.descriptionError}</p>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Button variant="outlined" color="secondary" className="removeOptions" style={{marginTop:"20px"}} onClick={()=> this.deleteQuestion(key)}>
                                                        Remove Budget Item
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                            <Grid  item sm={12} md={12} xs={12} style={{marginTop:"50px"}}>
                                {/*@ts-ignore*/}
                                <Button onClick={this.addQuestionFields} fullWidth size="large" colo="primary" variant="outlined" style={{borderRadius:"8px",border:" 1px dashed #2b6fed",color:"#2b6fed",fontWeight:"bold"}}>+ {t("Add Another Budget Item")}</Button>
                            </Grid>
                            <Grid  item sm={12} md={12} xs={12}>
                                <Box className="BottomButtonSurvey">
                                    <Box className="Previewbtn">
                                        <AudienceButton onClick={this.handlePriviewData} variant="contained" color="primary">{t("PREVIEW")}</AudienceButton>
                                    </Box>
                                    <Box className="Publishbtn">
                                        <PublishButton onClick={this.handleSurveyDataSubmit} disabled={this.state.loading} type="submit" variant="outlined" color="primary">{this.state.loading && <CircularProgress color="inherit" size={20}/> } {" "}{t("PUBLISH")}</PublishButton>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.deleteModal}
                    onClose={this.closeDeleteModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.deleteModal}>
                        <Box style={{width:"30vw",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                            <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginBottom:"10px"}}>
                                Are you sure you want to submit the budget report for approval?
                            </Typography>
                            <Box style={{display:'flex',justifyContent:'flex-end',marginTop:"15px"}}>
                                {/*@ts-ignore*/}
                                <AudienceButton variant="outlined" style={{marginRight:"10px"}} onClick={this.closeDeleteModal}>{t("Cancel")}</AudienceButton>
                                <PublishButton variant="contained" onClick={this.deleteAudience} >{t("Confirm")}</PublishButton>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </Box>
    </Box>
     </>
      );
  }
}

export default withTranslation()(withRouter(CreateSurveys)); 

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}

const AudienceButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);
// Customizable Area End
