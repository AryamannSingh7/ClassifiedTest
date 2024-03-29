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
    InputAdornment,
    TextField,
    Dialog,
    IconButton,
    DialogContent,
    FormControl,
    DialogActions,
} from "@material-ui/core";
import VisitorsListController, { Props } from "./VisitorsListController";
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
import {withTranslation} from "react-i18next";
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";
import GeneralSideBarWeb from "../../dashboard/src/GeneralSideBar.web";
class VisitorsList extends VisitorsListController {
    constructor(props: Props) {
        super(props);
    }
    render() {
        // @ts-ignore
        const { classes } = this.props;
        const userType  = localStorage.getItem("selectUserType");
        console.log("date =========>",this.state?.date)
        // @ts-ignore
        const {t} = this.props
        return (
            <>
                <Box style={{ background: "#F4F7FF" }} className={classes.announcements}>
                    {/* Dashboard Header -- */}
                    <DashboardHeader {...this.props} />
                    <Box style={{ display: "flex" }}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            {/* Chairman Sidebar -- */}           
                        <GeneralSideBarWeb {...this.props}></GeneralSideBarWeb>
                        </Grid>

                        <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
                            <Container className="commonForm">
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            {t("My Dashboards")} /{" "} {t("General Dashboards")} /{" "}
                                            <Box component="span" style={{ color: "blue" }}>
                                                {t("Visitors")}
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading bold-text">
                                            {t("Visitors")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="top-bar">
                                    <Box className="filter">
                                        <Select displayEmpty value={this.state.buildingID} className="select-input" placeholder="Select Building" onChange={(e)=> this.setState({buildingID:e.target.value},()=>this.getUnitVisitorList(e.target.value))}>
                                            <MenuItem value="" disabled>
                                                {t("Select Building")}
                                            </MenuItem>
                                            {
                                                this.state?.buildingList?.length > 0 &&
                                                    this.state.buildingList.map((item:any,key:any) => {
                                                        return(
                                                            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
                                                        )
                                                    })
                                            }
                                        </Select>
                                        <Select displayEmpty value={this.state.unitId} className="select-input" placeholder="Select Unit" onChange={(e)=> this.setState({unitId:e.target.value})}>
                                            <MenuItem value="" disabled>
                                                {t("Select Unit")}
                                            </MenuItem>
                                            {
                                                this.state.unitList.length > 0 &&
                                                    this.state.unitList.map((item:any,key:any) => {
                                                        return(
                                                            <MenuItem key={key} value={item.id}>{item.apartment_name}</MenuItem>
                                                        )
                                            })
                                            }
                                        </Select>
                                        {
                                            localStorage.getItem("userType") === "security" &&
                                            <Box className="classifiedFormGroup">
                                                <Box className="visitorTextfield">
                                                    <TextField
                                                        label="date" variant="outlined"
                                                        style={{ borderRadius: "8px", border: "1px solid #F0F0F0" ,backgroundColor:"white"}}
                                                        type="date" name="date"
                                                        format='DD/MM/YYYY'
                                                        value={this.state.date}
                                                        onChange={(e)=> this.setState({date:e.target.value})}
                                                        InputProps={{
                                                            // min: "2019-01-24",
                                                            //@ts-ignore
                                                            max: "5000-05-31",
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    {/* <DateRangeOutlinedIcon /> */}
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {/* <DateRangeOutlinedIcon /> */}
                                                                </InputAdornment>
                                                            ),
                                                        }
                                                        }
                                                    />
                                                </Box>
                                            </Box>
                                        }
                          <Button onClick={()=> this.getVisitorList(this.state.searchQuery,1)} startIcon={<img src={SearchIconImage} />}>Search</Button>
                                    </Box>
                                </Box>
                                <Box className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h3 className="bold-text">Visitors</h3>
                                            <Box className="filter">
                                                <Box className="search-box">
                                                    <SearchIcon />
                                                    <InputBase placeholder={t("Search")} className="search" onChange={this.manageSearch} />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <Table className="table-box">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>{t("Visitor Name")}</TableCell>
                                                    <TableCell>{t("Resident Name")}</TableCell>
                                                    <TableCell>{t("Building")}</TableCell>
                                                    <TableCell>{t("Unit Number")}</TableCell>
                                                    <TableCell>{t("Date")}</TableCell>
                                                    <TableCell>{t("Phone Number")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.visitorList.length > 0 ?
                                                        this.state.visitorList.map((item:any,key:any)=>{
                                                            return(
                                                                <TableRow key={key} onClick={() => this.props.history.push(`/VisitorsDetails?id=${item.id}`)} style={{cursor:"pointer"}}>
                                                                    <TableCell>{key + 1}</TableCell>
                                                                    <TableCell className="ellipse">{item.attributes.name}</TableCell>
                                                                    <TableCell>{item.attributes.resident_name}</TableCell>
                                                                    <TableCell>{item.attributes.building_management.name} </TableCell>
                                                                    <TableCell>{item.attributes.unit_number}</TableCell>
                                                                    <TableCell>{item.attributes.schedule_date}</TableCell>
                                                                    <TableCell>{item.attributes.mobile_number.full_mobile_number}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                       :
                                                        <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                            <TableCell>{t("No data found..!!")}</TableCell>
                                                        </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                        <Divider />
                                        <Box style={{width:"100%",height:"70px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                            {
                                                this.state.visitorList.length > 0 &&
                                                <Box style={{display:"flex",marginLeft:"15px"}}>
                                                    <Typography style={{marginRight:"5px"}}>{t("Showing")} </Typography>
                                                    <Typography style={{marginRight:"5px",fontWeight:"bold",color:"#FC8434"}}>{this.state.pagination?.total_count < this.state.count ? this.state.pagination?.total_count : (this.state?.count * this.state.page)} </Typography>
                                                    <Typography style={{marginRight:"5px"}}> {t("of")} </Typography>
                                                    <Typography style={{fontWeight:"bold"}}>{this.state.pagination?.total_count} </Typography>
                                                </Box>
                                            }
                                            {
                                                this.state.visitorList.length <= 0 &&
                                                <Box style={{display:"flex",marginLeft:"15px"}} />
                                            }
                                            <Box style={{marginRight:"10px"}}>
                                                <Pagination count={this.state.pagination?.total_pages} onChange={this.handleVistorPagination} variant="outlined" shape="rounded" />
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

export default withStyles(SuggestionStyleWeb)(withTranslation()(withRouter(VisitorsList)));
// Customizable Area End
