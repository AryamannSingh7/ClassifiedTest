// Customizable Area Start
import React from "react";
import {
    Container,
    Typography,
    withStyles,
    Button,
    IconButton,
    Select,
    MenuItem,
    Divider,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    InputBase,
    Box,
    Grid,
} from "@material-ui/core";
import PaymentHistoryController, {Props} from "./PaymentHistoryController.web";
import {Menu} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import {withTranslation} from "react-i18next";
import {ROLE} from "../../../framework/src/Enum";
import {ReportsStyleWeb} from "../../StoreCredits/src/ReportsStyle.web";
import {SearchIconImage} from "../../StoreCredits/src/assets";

class PaymentHistory extends PaymentHistoryController {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {t, classes}: any = this.props;

        return (
            <>
                <Box style={{background: "#F4F7FF"}} className={classes.reportList}>
                    {/* Dashboard Header -- */}
                    <DashboardHeader {...this.props} />
                    <Box style={{display: "flex"}}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            {/* Chairman Sidebar -- */}
                            <ChairmanSidebarWeb {...this.props} />
                        </Grid>

                        <Grid item xs={9} md={9} sm={9} style={{paddingTop: 35}}>
                            <Container>
                                <Box className="navigation">
                                    <Box>
                                        <Typography variant="body1">
                                            {t("Invoices & Receipts")}{" "}/{" "}
                                            <Box component="span" style={{color: "blue"}}>
                                                {t("Payment History")}
                                            </Box>
                                        </Typography>
                                        <Typography variant="h5" className="sub-heading">
                                            {t("Payment History")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="top-bar">
                                    <Box className="filter">
                                        <Select displayEmpty value="" className="select-input">
                                            <MenuItem value="" disabled>
                                                {t("Select Building")}
                                            </MenuItem>
                                        </Select>
                                        <Select displayEmpty className="select-input" value="">
                                            <MenuItem value="" disabled>
                                                {t("Select Floor")}
                                            </MenuItem>
                                        </Select>
                                        <Select displayEmpty className="select-input" value="">
                                            <MenuItem value="" disabled>
                                                {t("Select Unit")}
                                            </MenuItem>
                                        </Select>
                                        <Button startIcon={<img src={SearchIconImage}/>} onClick={() => {
                                        }}>
                                            {t("Search")}
                                        </Button>
                                    </Box>
                                </Box>
                                <Grid className="meeting-table">
                                    <Grid item sm={12} md={12} xs={12}>
                                        <Box className="table-top">
                                            <h4>{t("Payment History")}</h4>
                                        </Box>
                                        <Divider/>
                                        <Table className="table-box">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>{t("Name")}</TableCell>
                                                    <TableCell>{t("Unit No.")}</TableCell>
                                                    <TableCell>{t("Title")}</TableCell>
                                                    <TableCell>{t("Paid Amount")}</TableCell>
                                                    <TableCell>{t("Type")}</TableCell>
                                                    <TableCell>{t("Status")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={6}>{t("No records found. Please select Building and Unit to view payment history")}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>1</TableCell>
                                                    <TableCell>Name here</TableCell>
                                                    <TableCell>Unit</TableCell>
                                                    <TableCell>12 Dec 2022</TableCell>
                                                    <TableCell>SR 12,000</TableCell>
                                                    <TableCell>Management fee</TableCell>
                                                    <TableCell>Pending</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <Divider/>
                                        <Box className="table-bottom">
                                            <p>
                                                Showing <span className="current-page">{0}</span> of <span
                                                className="total-page">0</span>{" "}
                                                results
                                            </p>
                                            <Pagination siblingCount={2} variant="outlined" shape="rounded"/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Box>
                </Box>
            </>
        );
    }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(PaymentHistory));
// Customizable Area End
