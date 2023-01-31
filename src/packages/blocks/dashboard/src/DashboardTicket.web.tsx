// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import { ticket_calendar, ticket, ticketclock } from "./assets";
import {
  Container,
  Typography,
  FormControl,
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
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import Pagination from "@material-ui/lab/Pagination";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import DashboardTicketController, { Props } from "../../../blocks/dashboard/src/DashboardTicketController.web";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import { DashboardStyleWeb } from "./DashboardStyle.web";
import { ROLE } from "../../../framework/src/Enum";
import ChairmanNumberCard from "../../../components/src/DashboardCard/ChairmanNumberCard.web";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

function createData(name: any, building: any, unit: any, ticket: any) {
  return { name, building, unit, ticket };
}

const rows = [
  createData("Frozen yoghurt", "Building 1", 159, 6),
  createData("Ice cream sandwich", "Building 1", 237, 9),
  createData("Eclair", "Building 1", 262, 16),
  createData("Cupcake", "Building 1", 305, 67),
  createData("Gingerbread", "Building 1", 356, 3),
];

class DashboardTicket extends DashboardTicketController {
  constructor(props: Props) {
    super(props);
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
                      {t("My Dashboard")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Ticket Dashboard")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("Ticket Dashboard")}</Typography>
                    <Box className="select-box">
                      {userType === ROLE.MANAGER && (
                        <NativeSelect className="select-year">
                          <option value={2022}>Building 1</option>
                          <option value={2021}>Building 2</option>
                          <option value={2020}>Building 3</option>
                          <option value={2019}>Building 4</option>
                        </NativeSelect>
                      )}
                      <NativeSelect className="select-year">
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={ticketclock}
                      heading={t("Average Resolution Time")}
                      titleOne=""
                      valueOne="12"
                      titleTwo={t("days")}
                      valueTwo=""
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ChairmanNumberCard
                      image={ticket}
                      heading={`${t("Ticket generated in")} 2022`}
                      titleOne=""
                      valueOne="12"
                      titleTwo={t("tickets")}
                      valueTwo=""
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Card className="dashboard-card-box">
                      <Box className="card-image">
                        <img src={ticket_calendar} alt="image" />
                      </Box>
                      <h4>
                        {t("Ticket took more than")} X {t("days")}
                      </h4>
                      <Box className="card-bottom-info configuration-day">
                        <Box className="info-box">
                          <span>12</span>
                          <p>{t("tickets")}</p>
                        </Box>
                        <p className="config">{t("Configure Days")}</p>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>

                <Box className="content-boxes">
                  <Box className="top-content">
                    <Box className="heading">
                      <h2>{t("Number of tickets opened by Residents")}</h2>
                    </Box>
                    <Box className="right-content">
                      <TextField
                        className="search-unit"
                        placeholder={t("Search Resident")}
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
                          <TableCell>{t("Buildings")}</TableCell>
                          <TableCell>{t("Unit Numbers")}</TableCell>
                          <TableCell>{t("Total Tickets")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.building}</TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>{row.ticket}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box className="unit-pagination">
                    <p>
                      {t("Showing")} <span>1</span> {t("of")} <span>10</span> {t("results")}
                    </p>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog fullWidth scroll="paper" open={false} className="add-meeting configuration-dialog">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Configure Days")}</Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <Divider />
          <DialogContent>
            <Box className="config-dialog-box">
              Tickets took more than <Input placeholder="Enter Days" /> days
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button">{t("Cancel")}</Button>
            <Button className="add-button">{t("Save")}</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(DashboardTicket)));
// Customizable Area End
