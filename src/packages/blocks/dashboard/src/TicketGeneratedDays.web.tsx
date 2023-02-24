// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Link,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import DashboardTicketController, { Props } from "./DashboardTicketController.web";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { ROLE } from "../../../framework/src/Enum";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";

class TicketGeneratedDays extends DashboardTicketController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const days = this.props.navigation.getParam("days");
    this.setState({ tookDays: days }, () => {
      this.getTicketDashboardYearList();
      this.getAllBuildingList();
      this.getIncidentCategoryList();
      this.getTicketByDays();
    });
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.searchResident !== this.state.searchResident ||
      prevState.status !== this.state.status ||
      prevState.category !== this.state.category ||
      prevState.filterYear !== this.state.filterYear ||
      prevState.filterStatus !== this.state.filterStatus ||
      prevState.filterBuilding !== this.state.filterBuilding ||
      prevState.page !== this.state.page
    ) {
      await this.getTicketByDays();
    }
  }

  render() {
    const { t, classes }: any = this.props;
    const userType = localStorage.getItem("userType");

    return (
      <>
        <Box className={classes.generalDashboard}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboard")} / <Link href="/DashboardTicket">{t("Ticket Dashboard")}</Link> /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Tickets Took More Than")} {this.state.tookDays} {t("Days")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="bold-text">
                      {t("Tickets Took More Than")} {this.state.tookDays} {t("Days")}
                    </Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <>
                          <select
                            value={this.state.filterStatus}
                            onChange={(e: any) => this.setState({ filterStatus: e.target.value })}
                            className="select-year"
                          >
                            <option value="">{t("Status")}</option>
                            <option value="Unresolved">{t("Unresolved")}</option>
                            <option value="Pending Confirmation">{t("Pending Confirmation")}</option>
                            <option value="Ongoing">{t("Ongoing")}</option>
                            <option value="Open">{t("Open")}</option>
                          </select>
                          <select
                            value={this.state.filterBuilding}
                            className="select-year"
                            onChange={(e: any) => this.setState({ filterBuilding: e.target.value })}
                          >
                            <option value="" disabled>
                              {t("Select Building")}
                            </option>
                            {this.state.buildingList.map((building: any) => {
                              return (
                                <option value={building.id} key={building.id}>
                                  {building.attributes.name}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            value={this.state.filterYear}
                            onChange={(e: any) => this.setState({ filterYear: e.target.value })}
                            className="select-year"
                          >
                            {this.state.yearList.map((year: any) => {
                              return (
                                <option value={year} key={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </>
                      )}
                    </Box>
                  </Box>
                  {userType === ROLE.CHAIRMAN && (
                    <Box className="chairman-filter">
                      <Box className="action-filter-box">
                        <select
                          value={this.state.chairmanStatus}
                          className="select-year"
                          onChange={(e: any) => this.setState({ chairmanStatus: e.target.value })}
                        >
                          <option value={2022}>{t("Status")}</option>
                          <option value="Unresolved">{t("Unresolved")}</option>
                          <option value="Pending Confirmation">{t("Pending Confirmation")}</option>
                          <option value="Ongoing">{t("Ongoing")}</option>
                          <option value="Open">{t("Open")}</option>
                        </select>
                        <select
                          className="select-year"
                          value={this.state.chairmanCategory}
                          onChange={(e: any) => this.setState({ chairmanCategory: e.target.value })}
                        >
                          <option value="">{t("Category")}</option>
                          {this.state.categoryList.map((category: any) => {
                            return (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </select>
                        <Button
                          startIcon={<SearchIcon />}
                          onClick={() =>
                            this.setState({ status: this.state.chairmanStatus, category: this.state.chairmanCategory })
                          }
                        >
                          {t("Search")}
                        </Button>
                      </Box>
                      <Box className="right-filter-box">
                        <select
                          value={this.state.filterYear}
                          className="select-year"
                          onChange={(e: any) => this.setState({ filterYear: e.target.value })}
                        >
                          {this.state.yearList.map((year: any) => {
                            return (
                              <option value={year} key={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </Box>
                    </Box>
                  )}
                </Box>

                <Box className="content-boxes ticket-table">
                  <Box className="top-content">
                    <Box className="heading">
                      <h2 className="bold-text">{t("Tickets")}</h2>
                    </Box>
                    <Box className="right-content">
                      <TextField
                        className="search-unit"
                        value={this.state.searchResident}
                        onChange={(e: any) => this.setState({ searchResident: e.target.value })}
                        placeholder={t("Search by ticket number")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {userType === ROLE.MANAGER && (
                        <select className="unit-select" value="">
                          <option disabled value="">
                            {t("Sort By")}
                          </option>
                        </select>
                      )}
                    </Box>
                  </Box>
                  <Divider />
                  <TableContainer>
                    <Table className="unit-table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("#")}</TableCell>
                          <TableCell>{t("Ticket No")}</TableCell>
                          <TableCell>{t("Raised By")}</TableCell>
                          <TableCell>{t("Incident related to")}</TableCell>
                          <TableCell>{t("Open Date")}</TableCell>
                          <TableCell>{t("Close Date")}</TableCell>
                          <TableCell>{t("Days to Close")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.ticketList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={8}>{t("No ticket found")}</TableCell>
                          </TableRow>
                        )}
                        {this.state.ticketList.map((incident: any, index: number) => {
                          return (
                            <TableRow key={incident.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell
                                className="ticket-number"
                                onClick={() => {
                                  localStorage.setItem("incidentManagementDetailId", incident.id);
                                  this.props.navigation.navigate("IncidentManagementDetail");
                                }}
                              >
                                {incident.id}
                              </TableCell>
                              <TableCell>{incident.attributes.raised_by}</TableCell>
                              <TableCell>{incident.attributes.incident_related_to}</TableCell>
                              <TableCell>
                                {moment(incident.attributes.open_date, "DD-MM-YYYY").format("DD MMM YYYY")}
                              </TableCell>
                              <TableCell>
                                {incident.attributes.close_date &&
                                  moment(incident.attributes.close_date, "DD-MM-YYYY").format("DD MMM YYYY")}
                              </TableCell>
                              <TableCell>{incident.attributes.day_to_close}</TableCell>
                              <TableCell>
                                <span className="status">{incident.attributes.status}</span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box className="unit-pagination">
                    <p>
                      {t("Showing")} <span>{this.state.ticketList.length}</span> {t("of")}{" "}
                      <span>{this.state.pagination ? this.state.pagination.total_count : 0}</span> {t("results")}
                    </p>
                    {this.state.pagination && (
                      <Pagination
                        onChange={(event: any, value: any) => this.setState({ page: Number(value) })}
                        count={this.state.pagination.total_pages}
                        page={this.state.pagination.current_page}
                        siblingCount={2}
                        variant="outlined"
                        shape="rounded"
                      />
                    )}
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(TicketGeneratedDays)));
// Customizable Area End
