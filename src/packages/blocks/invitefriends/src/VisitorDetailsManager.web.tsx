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

class VisitorDetails extends VisitorDetailsController {
    constructor(props: Props) {
        super(props);
    }

    render() {
        // @ts-ignore
        const { classes } = this.props;

        return (
            <>
                <Box style={{ background: "#F4F7FF" }} className={classes.announcements}>
                    {/* Dashboard Header -- */}
                    <DashboardHeader {...this.props} />
                    <Box style={{ display: "flex" }}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            {/* Chairman Sidebar -- */}
                            <ChairmanSidebarWeb {...this.props} />
                        </Grid>

                        <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
                            <Container>
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            My Dashboards /{" "} General Dashboards /{" "} Visitors /{" "}
                                            <Box component="span" style={{ color: "blue" }}>
                                                Visitors Details
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading">
                                            Visitors Details
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h5>Visitors Details</h5>
                                        </Box>
                                        <Divider />
                                        <Box width="100%" style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
                                            <Box style={{width:"95%"}}>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Visitor Name : </Typography>
                                                    {
                                                        console.log("THIS IS VISITORS",this.state.visitorDetails)
                                                    }
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Resident Name : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.resident_name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Building Name : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails?.building_management?.name}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Unit Number : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.visitorDetails.unit_number}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Date : </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{moment(this.state?.visitorDetails?.schedule_date).format("DD MMMM YYYY")}</Typography>
                                                </Box>
                                                <Divider/>
                                                <Box style={{display:"flex",margin:"10px 0px"}}>
                                                    <Typography style={{marginRight:"5px"}}>Phone Number : </Typography>
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

export default withStyles(SuggestionStyleWeb)(withRouter(VisitorDetails));
// Customizable Area End
