// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import { ticket_calendar, ticket, ticketclock } from "./assets";
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
  Card,
  TextField,
  InputAdornment,
  Divider,
  Dialog,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  Input,
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
import ChairmanNumberCard from "../../../components/src/DashboardCard/ChairmanNumberCard.web";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Loader from "../../../components/src/Loader.web";

class DashboardTicket extends DashboardTicketController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getTicketDashboardYearList();
    this.getAllBuildingList();
    this.getTicketByResident();
    this.GetTicketCardData();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.searchResident !== this.state.searchResident || prevState.page !== this.state.page) {
      await this.getTicketByResident();
    }
  }

  render() {
    const { t, classes }: any = this.props;
    const userType = localStorage.getItem("userType");

    return (
      <>
        <Loader loading={this.state.loading} />

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
                      {t("My Dashboard")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Ticket Dashboard")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="bold-text">
                      {t("Ticket Dashboard")}
                    </Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <select
                          className="select-year"
                          value={this.state.filterBuilding}
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
                      )}
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
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item sm={4}>
                    <Link href="/AvgResolutionTicket">
                      <ChairmanNumberCard
                        image={ticketclock}
                        heading={t("Average Resolution Time")}
                        titleOne=""
                        valueOne={this.state.avgResolutionDay + ""}
                        titleTwo={t("days")}
                        valueTwo=""
                      />
                    </Link>
                  </Grid>
                  <Grid item sm={4}>
                    <Link href={`/DashboardTicket/Year/${this.state.filterYear}`}>
                      <ChairmanNumberCard
                        image={ticket}
                        heading={`${t("Ticket generated in")} ${this.state.filterYear}`}
                        titleOne=""
                        valueOne={this.state.ticketYear + ""}
                        titleTwo={t("tickets")}
                        valueTwo=""
                      />
                    </Link>
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Link href={`/DashboardTicket/Days/${this.state.configDays}`}>
                        <Box className="card-image">
                          <img src={ticket_calendar} alt="image" />
                        </Box>
                        <h4 className="bold-text">
                          {t("Ticket took more than")} {this.state.configDays} {t("days")}
                        </h4>
                      </Link>
                      <Box className="card-bottom-info configuration-day">
                        <Box className="info-box">
                          <span>{this.state.ticketDays}</span>
                          <p>{t("tickets")}</p>
                        </Box>
                        <p className="config" onClick={() => this.handleConfigModal()}>
                          {t("Configure Days")}
                        </p>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>

                <Box className="content-boxes">
                  <Box className="top-content">
                    <Box className="heading">
                      <h2 className="bold-text">{t("Number of tickets opened by Residents")}</h2>
                    </Box>
                    <Box className="right-content">
                      <TextField
                        className="search-unit"
                        placeholder={t("Search Resident")}
                        value={this.state.searchResident}
                        onChange={(e: any) => this.setState({ searchResident: e.target.value })}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <select className="unit-select" value="">
                        <option disabled value="">
                          {t("Sort By")}
                        </option>
                      </select>
                    </Box>
                  </Box>
                  <Divider />
                  <TableContainer>
                    <Table className="unit-table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("Name")}</TableCell>
                          {userType === ROLE.MANAGER && <TableCell>{t("Buildings")}</TableCell>}
                          <TableCell>{t("Unit Numbers")}</TableCell>
                          <TableCell>{t("Total Tickets")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.ticketList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={userType === ROLE.MANAGER ? 4 : 3}>{t("No ticket found")}</TableCell>
                          </TableRow>
                        )}
                        {this.state.ticketList.map((incident: any) => (
                          <TableRow key={incident.id}>
                            <TableCell>{incident.attributes.name}</TableCell>
                            {userType === ROLE.MANAGER && <TableCell>{incident.attributes.unit_number}</TableCell>}
                            <TableCell>{incident.attributes.unit_number}</TableCell>
                            <TableCell>{incident.attributes.totle_ticket.count}</TableCell>
                          </TableRow>
                        ))}
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

        <Dialog
          className="add-meeting configuration-dialog"
          fullWidth
          open={this.state.isConfigModalOpen}
          scroll="paper"
          onClose={() => this.handleConfigModal()}
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6" className="bold-text">
              {t("Configure Days")}
            </Typography>
            <IconButton onClick={() => this.handleConfigModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Divider />
          <DialogContent>
            <Box className="config-dialog-box bold-text">
              {t("Tickets took more than")}{" "}
              <Input
                placeholder={t("Enter Days")}
                value={this.state.modalConfigDays}
                onChange={(e: any) => this.setState({ modalConfigDays: e.target.value })}
              />{" "}
              {t("days")}
            </Box>
          </DialogContent>
          <hr className="config-hr" />
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleConfigModal()}>
              {t("Cancel")}
            </Button>
            <Button
              className="add-button"
              onClick={() =>
                this.setState({ loading: true }, () => {
                  this.handleChangeConfig();
                  this.handleConfigModal();
                })
              }
            >
              {t("Save")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(DashboardTicket)));
// Customizable Area End
