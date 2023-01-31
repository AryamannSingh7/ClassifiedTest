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

class TicketGeneratedYear extends DashboardTicketController {
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
                      {t("My Dashboard")} / {t("Ticket Dashboard")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Tickets Generated in 2022")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box className="sub-heading-box">
                    <Typography variant="h5">{t("Tickets Generated in 2022")}</Typography>
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
                      <NativeSelect className="select-year">
                        <option value={2022}>Status</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    </Box>
                  </Box>
                </Box>

                <Box className="content-boxes ticket-table">
                  <Box className="top-content">
                    <Box className="heading">
                      <h2>{t("Tickets")}</h2>
                    </Box>
                    <Box className="right-content">
                      <TextField
                        className="search-unit"
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
                          <TableCell>{t("Incident related to")}</TableCell>
                          <TableCell>{t("Unit Number")}</TableCell>
                          <TableCell>{t("Raised By")}</TableCell>
                          <TableCell>{t("Open Date")}</TableCell>
                          <TableCell>{t("Close Date")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell>7</TableCell>
                          <TableCell>
                            <span className="status">Resolved</span>
                          </TableCell>
                        </TableRow>
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
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(DashboardStyleWeb)(withRouter(TicketGeneratedYear)));
// Customizable Area End
