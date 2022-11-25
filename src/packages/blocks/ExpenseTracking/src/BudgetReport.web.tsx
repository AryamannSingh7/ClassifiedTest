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
import { withRouter } from 'react-router';
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";
import { ROLE } from "../../../framework/src/Enum";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { SearchIconImage } from "./assets";

class BudgetReport extends BudgetReportController {
  constructor(props: Props) {
    super(props);
  } 

  async componentDidMount(): Promise<void> {
    // this.getBuildingsList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {}

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

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
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Select
                        displayEmpty
                        value=""
                        // onChange={(e: any) => this.setState({ selectedBuilding: e.target.value })}
                        className="select-input"
                      >
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                        {/* {this.state.buildingsList.map((building: any) => {
                          return <MenuItem value={building.name}>{building.name}</MenuItem>;
                        })} */}
                      </Select>
                    )}
                    <Select
                      displayEmpty
                      className="select-input"
                      value=""
                      // onChange={(e: any) => this.setState({ selectedYear: e.target.value })}
                    >
                      <MenuItem value="" disabled>
                        {t("Select Year")}
                      </MenuItem>
                      <MenuItem value="scheduled">{t("Scheduled")}</MenuItem>
                      <MenuItem value="completed">{t("Completed")}</MenuItem>
                      <MenuItem value="cancelled">{t("Cancelled")}</MenuItem>
                    </Select>
                    <Select
                      displayEmpty
                      className="select-input"
                      value=""
                      // onChange={(e: any) => this.setState({ selectedStatus: e.target.value })}
                    >
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
                    <Box className="create-meeting">
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
                        <InputBase
                          placeholder={t("Search")}
                          className="search"
                          value=""
                          onChange={(e: any) => {
                            // this.setState({ filter: { ...this.state.filter, search: e.target.value } });
                          }}
                        />
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
                              <MenuItem onClick={()=> this.props.history.push("/BudgetReports/1")}>{t("View")}</MenuItem>
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
                        Showing <span className="current-page">{0}</span> of{" "}
                        <span className="total-page">
                          0{/* {this.state.pagination ? this.state.pagination.total_count : 0} */}
                        </span>{" "}
                        results
                      </p>
                      {/* {this.state.pagination && ( */}
                      <Pagination
                        // onChange={(event: any, value: any) => {
                        //   this.setState({
                        //     ...this.state,
                        //     filter: {
                        //       ...this.state.filter,
                        //       page: Number(value),
                        //     },
                        //   });
                        // }}
                        // count={this.state.pagination.total_pages}
                        // page={this.state.pagination.current_page}
                        siblingCount={2}
                        variant="outlined"
                        shape="rounded"
                      />
                      {/* )} */}
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
