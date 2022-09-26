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

class VisitorsList extends VisitorsListController {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount(): Promise<void> {}

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
                                            My Dashboards /{" "} General Dashboards /{" "}
                                            <Box component="span" style={{ color: "blue" }}>
                                                Visitors
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading">
                                            Visitors
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="top-bar">
                                    <Box className="filter">
                                        <Select displayEmpty value="" className="select-input" placeholder="Select Building">
                                            <MenuItem value="" disabled>
                                                <em>Select Building</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        <Select displayEmpty value="" className="select-input" placeholder="Select Unit">
                                            <MenuItem value="" disabled>
                                                <em>Select Unit</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        <Button startIcon={<img src={SearchIconImage} />}>Search</Button>
                                    </Box>
                                </Box>
                                <Box className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h3>Visitors</h3>
                                            <Box className="filter">
                                                <Box className="search-box">
                                                    <SearchIcon />
                                                    <InputBase placeholder="Search" className="search" />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <Table className="table-box">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>Visitor Name</TableCell>
                                                    <TableCell>Resident Name</TableCell>
                                                    <TableCell>Building</TableCell>
                                                    <TableCell>Unit Number</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Phone Number</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                    <TableCell>1</TableCell>
                                                    <TableCell className="ellipse">Alex Walker</TableCell>
                                                    <TableCell>Alex Walker</TableCell>
                                                    <TableCell>Building 1 </TableCell>
                                                    <TableCell>A-101</TableCell>
                                                    <TableCell>25/06/2022</TableCell>
                                                    <TableCell>+1 84544 45845</TableCell>
                                                </TableRow>
                                                <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                    <TableCell>2</TableCell>
                                                    <TableCell className="ellipse">Alex Walker</TableCell>
                                                    <TableCell>Alex Walker</TableCell>
                                                    <TableCell>Building 1 </TableCell>
                                                    <TableCell>A-101</TableCell>
                                                    <TableCell>25/06/2022</TableCell>
                                                    <TableCell>+1 84544 45845</TableCell>
                                                </TableRow>
                                                <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                    <TableCell>3</TableCell>
                                                    <TableCell className="ellipse">Alex Walker</TableCell>
                                                    <TableCell>Alex Walker</TableCell>
                                                    <TableCell>Building 1 </TableCell>
                                                    <TableCell>A-101</TableCell>
                                                    <TableCell>25/06/2022</TableCell>
                                                    <TableCell>+1 84544 45845</TableCell>
                                                </TableRow>
                                                <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                    <TableCell>4</TableCell>
                                                    <TableCell className="ellipse">Alex Walker</TableCell>
                                                    <TableCell>Alex Walker</TableCell>
                                                    <TableCell>Building 1 </TableCell>
                                                    <TableCell>A-101</TableCell>
                                                    <TableCell>25/06/2022</TableCell>
                                                    <TableCell>+1 84544 45845</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <Divider />
                                        <Box style={{width:"100%",height:"70px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                            <Box style={{display:"flex",marginLeft:"15px"}}>
                                                <Typography style={{marginRight:"5px"}}>Showing </Typography>
                                                <Typography style={{marginRight:"5px",fontWeight:"bold",color:"#FC8434"}}>{10} </Typography>
                                                <Typography style={{marginRight:"5px"}}> of </Typography>
                                                <Typography style={{fontWeight:"bold"}}>{180} </Typography>
                                            </Box>
                                            <Box style={{marginRight:"10px"}}>
                                                <Pagination count={10} variant="outlined" shape="rounded" />
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

export default withStyles(SuggestionStyleWeb)(withRouter(VisitorsList));
// Customizable Area End
