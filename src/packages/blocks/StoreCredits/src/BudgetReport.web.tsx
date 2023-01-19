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
import BudgetReportController, { Props } from "./BudgetReportController.web";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import { ROLE } from "../../../framework/src/Enum";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { SearchIconImage } from "./assets";

class BudgetReport extends BudgetReportController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.reportList}>
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
                      {t("Documents & Reports")} / {t("Reports")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Budget Reports")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Budget Reports")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    <Select displayEmpty className="select-input" value={this.state.budgetYear} onChange={this.handleYearChange} >
                      <MenuItem value="" disabled>
                        {t("Select Year")}
                      </MenuItem>
                      <MenuItem value="scheduled">{(new Date().getFullYear()) - 3}</MenuItem>
                      <MenuItem value="scheduled">{(new Date().getFullYear()) - 2}</MenuItem>
                      <MenuItem value="completed">{(new Date().getFullYear()) - 1}</MenuItem>
                      <MenuItem value="completed">{(new Date().getFullYear())}</MenuItem>
                      <MenuItem value="completed">{(new Date().getFullYear()) + 1}</MenuItem>
                    </Select>
                    <Select displayEmpty className="select-input" value={this.state.status} onChange={this.handleStatusChange}>
                      <MenuItem value="" disabled>
                        {t("Select Status")}
                      </MenuItem>
                      <MenuItem value="scheduled">{t("Pending")}</MenuItem>
                      <MenuItem value="completed">{t("Approved")}</MenuItem>
                      <MenuItem value="cancelled">{t("Rejected")}</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />} onClick={() => {}}>
                      {t("Search")}
                    </Button>
                  </Box>
                  {localStorage.getItem("userType") === ROLE.MANAGER && (
                    <Box className="create-meeting" onClick={()=> this.props.history.push("/GenerateBudgetReport")}>
                      <Button onClick={() => {}}>{t("Generate Report")}</Button>
                    </Box>
                  )}
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h4>{t("Budget Reports")}</h4>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase placeholder={t("Search")} className="search" value="" />
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>{t("Year")}</TableCell>
                          <TableCell>{t("Report Generated On")}</TableCell>
                          <TableCell>{t("Amount")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={6}>{t("No Budget Reports Available")}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>2022</TableCell>
                          <TableCell>12 Dec 2022</TableCell>
                          <TableCell>SR 12,000</TableCell>
                          <TableCell>
                            <span className="Pending">Pending</span>
                          </TableCell>
                          <TableCell>
                            <Menu
                              menuButton={
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            >
                              <MenuItem onClick={() => this.props.history.push("/BudgetReports/1")}>
                                {t("View")}
                              </MenuItem>
                              <MenuItem>{t("Download")}</MenuItem>
                              <MenuItem>{t("Share")}</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Divider />
                    <Box className="table-bottom">
                      <p>
                        Showing <span className="current-page">{0}</span> of <span className="total-page">0</span>{" "}
                        results
                      </p>
                      <Pagination siblingCount={2} variant="outlined" shape="rounded" />
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

export default withTranslation()(withStyles(ReportsStyleWeb)(withRouter(BudgetReport)));
// Customizable Area End
