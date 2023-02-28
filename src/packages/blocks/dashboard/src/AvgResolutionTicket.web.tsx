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
  Link,
  Tab,
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
import moment from "moment";

class AvgResolutionTicket extends DashboardTicketController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getTicketDashboardYearList();
    this.getAllBuildingList();
    this.getIncidentCategoryList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (
      prevState.searchResident !== this.state.searchResident ||
      prevState.category !== this.state.category ||
      prevState.filterYear !== this.state.filterYear ||
      prevState.filterBuilding !== this.state.filterBuilding ||
      prevState.page !== this.state.page
    ) {
      await this.getAverageResolutionTicket();
    }
  }

  render() {
    const { t, classes }: any = this.props;
    const userType = localStorage.getItem("userType");

    return (
      <>
        <Box className={classes.generalDashboard}>
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              <ChairmanSidebar {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      {t("My Dashboard")} / <Link href="/DashboardTicket">{t("Ticket Dashboard")}</Link> /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Average Resolution Time")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="bold-text">
                      {t("Average Resolution Time")}
                    </Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <>
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
                          <select className="select-year">
                            <option value="">{t("Sort By")}</option>
                            <option value="">{t("Asc")}</option>
                            <option value="">{t("Desc")}</option>
                          </select>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box className="category-box">
                  <Box className="category">
                    {this.state.categoryList.map((category: any) => {
                      return (
                        <Tab
                          key={category.id}
                          onClick={() => {
                            this.setState({ category: category.id, page: 1 }, () => {});
                          }}
                          label={category.name}
                          className={category.id === this.state.category ? "active" : ""}
                        />
                      );
                    })}
                  </Box>
                </Box>

                <Box className="content-boxes ticket-table">
                  <Box className="top-content">
                    <Box className="heading">
                      <h2 className="bold-text">
                        {this.state.totalTicket} {t("Tickets")}
                      </h2>
                      <p>
                        Average Resolution Time <span>{this.state.avgDays} Days</span>
                      </p>
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
                          <TableCell>{t("Open Date")}</TableCell>
                          <TableCell>{t("Close Date")}</TableCell>
                          <TableCell>{t("Resolution Time")}</TableCell>
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
                              <TableCell>{incident.id}</TableCell>
                              <TableCell>{incident.attributes.raised_by}</TableCell>
                              <TableCell>
                                {moment(incident.attributes.open_date, "DD-MM-YYYY").format("DD MMM YYYY")}
                              </TableCell>
                              <TableCell>
                                {incident.attributes.close_date &&
                                  moment(incident.attributes.close_date, "DD-MM-YYYY").format("DD MMM YYYY")}
                              </TableCell>
                              <TableCell>{incident.attributes.day_to_close}</TableCell>
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
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(AvgResolutionTicket)));
// Customizable Area End
