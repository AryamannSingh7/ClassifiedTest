// Customizable Area Start
import React from "react";
import {
    Container,
    Typography,
    withStyles,
    Box,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    InputBase,
    Divider,
    Button,
    Select,
    MenuItem,
    Dialog,
    IconButton,
    DialogContent,
    FormControl,
    DialogActions,
} from "@material-ui/core";
import VisitorDetailsController, { Props } from "./VisitorDetailsController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "../../user-profile-basic/src/SuggestionStyle.web";
import SearchIcon from "@material-ui/icons/Search";
// @ts-ignore
import Pagination from '@material-ui/lab/Pagination';
import { Link,withRouter } from "react-router-dom";
import { SearchIconImage, UploadImage } from "../../user-profile-basic/src/assets";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import {withTranslation} from "react-i18next";
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";

class VisitorDetails extends VisitorDetailsController {
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
                            {/* Chairman Sidebar -- */}
                            {
                             userType === "Visitors" ? 
                            <VisitorsSidebar {...this.props} />
                            :
                            <ChairmanSidebarWeb {...this.props} /> 
                           }
                            
                        </Grid>

                        <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
                            <Container>
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            {t("My Dashboards")} /{" "} {t("General Dashboards")} /{" "} {t("Visitors")} /{" "}
                                            <Box component="span" style={{ color: "blue" }}>
                                                {t("Visitors Details")}
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading">
                                            {t("Visitors Details")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h5>{t("Visitors Details")}</h5>
                                        </Box>
                                        <Divider />
                                        <Box width="100%" style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
                                            <Box style={{width:"95%"}}>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Visitor Name")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Resident Name")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.resident_name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Building Name")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails?.building_management?.name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Unit Number")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.unit_number}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Date")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{moment(this.state?.visitorDetails?.schedule_date).format("DD MMMM YYYY")}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Phone Number")} : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state?.visitorDetails?.mobile_number?.full_mobile_number}</Typography>
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

export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(VisitorDetails)));
// Customizable Area End
