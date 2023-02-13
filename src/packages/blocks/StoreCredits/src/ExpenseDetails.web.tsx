// Customizable Area Start
import React from "react";
import {
    Container,
    Typography,
    withStyles,
    Box,
    Grid,
    Divider,

} from "@material-ui/core";
import VisitorDetailsController, { Props } from "./ExpenseDetailsController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "../../user-profile-basic/src/SuggestionStyle.web";
// @ts-ignore
import Pagination from '@material-ui/lab/Pagination';
import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";
import {expenseDownloadButton, pdfLogo} from "./assets";

class ExpenseDetails extends VisitorDetailsController {
    constructor(props: Props) {
        super(props);
    }

    render() {
        // @ts-ignore
        const { classes } = this.props;
        //@ts-ignore
        const {t} = this.props
        const userType  = localStorage.getItem("selectUserType");
        return (
            <>
                <Box style={{ background: "#F4F7FF" }} className={classes.announcements}>
                    {/* Dashboard Header -- */}
                    <DashboardHeader {...this.props} />
                    <Box style={{ display: "flex" }}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            <ChairmanSidebarWeb {...this.props} />
                        </Grid>
                        <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
                            <Container>
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            {t("My Dashboards")} /{" "} {t("Expense Reports")} /{" "} {t("Expense Report Details")} /{" "}
                                            <Box component="span" style={{ color: "blue" }}>
                                                {t("Expense Report Details")}
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading">
                                            {t("Expense Report Details")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h5>Report Details</h5>
                                        </Box>
                                        <Divider />
                                        <Box width="100%" style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
                                            <Box style={{width:"95%"}}>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Building")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state?.expenseDetails?.Building}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Title")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state?.expenseDetails?.title}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Expense Number")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.expenseDetails?.Expence_Number}</Typography>
                                                </Box>
                                                <Divider/>

                                                     <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Expense Registered on")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.expenseDetails?.Expence_Registered_on}</Typography>
                                                </Box>
                                                <Divider/>
                                              
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Amount")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}> SR {this.state.expenseDetails?.Amount?.toLocaleString()}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Category")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.expenseDetails.Category}</Typography>
                                                </Box>
                                                <Divider/>
                                                
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Description")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state?.expenseDetails?.description}</Typography>
                                                </Box>
                                                <Box onClick={()=> this.manageExpenseDetailsDownload(this.state.expenseDetails?.pdf?.url,this.state.expenseDetails?.Expence_Number)} style={{margin:"15px 0px",width:'100%',height:"70px",border:"1px solid #e4e4e4",borderRadius:"10px",display:'flex',alignItems:"center",justifyContent:"space-between"}}>
                                                    <Box style={{display: 'flex',alignItems:'center',marginLeft:"20px"}}>
                                                        <img src={pdfLogo} />
                                                        <Typography style={{marginLeft:"20px"}}>{this.state.expenseDetails?.pdf?.url?.split("/")[6]}</Typography>
                                                    </Box>
                                                    <Box style={{display: 'flex'}}>
                                                        <img style={{marginRight:"20px"}} src={expenseDownloadButton} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Container>
                        </Grid>
                    </Box>
                </Box>
            </>
        );
    }
}

export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(ExpenseDetails)));
// Customizable Area End
