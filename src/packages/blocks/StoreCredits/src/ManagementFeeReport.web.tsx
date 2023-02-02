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
import ManagementFeeReportController, { Props } from "./ManagementFeeReportController.web";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import { withTranslation } from "react-i18next";
import { ROLE } from "../../../framework/src/Enum";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { SearchIconImage } from "./assets";

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

class ManagementFeeReport extends ManagementFeeReportController {
  constructor(props: Props) {
    super(props);
  }

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
                        {t("Management Fee Reports")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Management Fee Reports")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Select displayEmpty value={this.state.buildingId} className="select-input" onChange={(e:any) => this.setState({buildingId:e.target.value})}>
                        <MenuItem value="">
                          {t("Select Building")}
                        </MenuItem>
                      </Select>
                    )}
                    <Select displayEmpty className="select-input" value={this.state.filterYear} onChange={(e:any) => this.setState({filterYear:e.target.value})}>
                      <MenuItem value="">
                        {t("Select Year")}
                      </MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 3}>{(new Date().getFullYear()) - 3}</MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 2}>{(new Date().getFullYear()) - 2}</MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 1}>{(new Date().getFullYear()) - 1}</MenuItem>
                      <MenuItem value={(new Date().getFullYear())}>{(new Date().getFullYear())}</MenuItem>
                    </Select>
                    <Select displayEmpty className="select-input" value={this.state.filterMonth} onChange={(e:any) => this.setState({filterMonth:e.target.value})}>
                      <MenuItem value="">
                        {t("Select Month")}
                      </MenuItem>
                      {
                        month.map((item,key)=> {
                          return(
                              <MenuItem key={key} value={key + 1}>{item}</MenuItem>
                          )
                        })
                      }

                    </Select>
                    <Select displayEmpty className="select-input" value={this.state.status} onChange={(e:any) => this.setState({status:e.target.value})}>
                      <MenuItem value="">
                        {t("Select Status")}
                      </MenuItem>
                      <MenuItem value="due">{t("Due")}</MenuItem>
                      <MenuItem value="over_due">{t("Over Due")}</MenuItem>
                      <MenuItem value="paid">{t("Paid")}</MenuItem>
                      <MenuItem value="partially_paid">{t("Partially Paid")}</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />} onClick={() => {}}>
                      {t("Search")}
                    </Button>
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h4>{t("Management Fee Reports")}</h4>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase placeholder={t("Search by unit number")} className="search" value={this.state.searchUnit} onChange={this.manageUnitSearch}/>
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>{t("Unit Number")}</TableCell>
                          <TableCell>{t("Paid On")}</TableCell>
                          <TableCell>{t("Paid By")}</TableCell>
                          <TableCell>{t("Month & Year")}</TableCell>
                          <TableCell>{t("Amount")}</TableCell>
                          <TableCell>{t("Status")}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          this.state.feeListing?.length > 0 ?
                              this.state.feeListing.map((item:any,key:any)=> {
                                return(
                                    <TableRow key={key}>
                                      <TableCell>{key+1}</TableCell>
                                      <TableCell>{item.attributes.unit_number}</TableCell>
                                      <TableCell>{item.attributes.paid_on}</TableCell>
                                      <TableCell>{item.attributes.paid_by}</TableCell>
                                      <TableCell>{item.attributes.Month_year}</TableCell>
                                      <TableCell>SR {item.attributes.amount}</TableCell>
                                      <TableCell>
                                        <span className="Due">{item.attributes.status}</span>
                                      </TableCell>
                                      <TableCell>
                                        <Menu
                                            menuButton={
                                              <IconButton>
                                                <MoreVertIcon />
                                              </IconButton>
                                            }
                                        >
                                          <MenuItem>{t("Download")}</MenuItem>
                                          <MenuItem>{t("Share")}</MenuItem>
                                        </Menu>
                                      </TableCell>
                                    </TableRow>
                                )
                              })
                              :
                            <TableRow>
                              <TableCell colSpan={8}>{t("No Management Fee Reports Available")}</TableCell>
                            </TableRow>
                        }
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

export default withTranslation()(withStyles(ReportsStyleWeb)(ManagementFeeReport));
// Customizable Area End
