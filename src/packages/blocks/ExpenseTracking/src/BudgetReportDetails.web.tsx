// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Button,
  IconButton,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import BudgetReportDetailsController, { Props } from "./BudgetReportDetailsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "web/src/i18n";
import i18next from "i18next";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {CheckIcon} from "../../user-profile-basic/src/assets"
class BudgetReport extends BudgetReportDetailsController {
  constructor(props: Props) {
    super(props);
  } 

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

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
                      {t("Documents & Reports")} / {t("Reports")} / {t("Budget Reports")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Budget Report Details")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Budget Report Details")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar" />
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h4>{t("Budget")} 2022</h4>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">{t("Name")}</TableCell>
                          <TableCell align="right" style={{ paddingRight: "50px" }}>
                            {t("Amount")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={6}>{t("No Budget Details are Available")}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left" style={{ display: "flex", alignItems: "center" }}>
                            Electricity Bill
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Box style={{ margin: "10px" }}>
                                    <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                      Electricity Bill
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      {" "}
                                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out
                                      print{" "}
                                    </Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            >
                              <IconButton style={{ padding: "2px" }}>
                                <InfoOutlinedIcon style={{ color: "#2B6FED", fontSize: "20px" }} />
                              </IconButton>
                            </HtmlTooltip>
                          </TableCell>
                          <TableCell align="right" style={{ paddingRight: "50px" }}>
                            SR 12,000
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Divider />
                  </Grid>
                </Grid>
                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ApproveButton>Reject</ApproveButton>
                  <RejectButton onClick={() => this.setState({ ApproveModal: true })}>Approve</RejectButton>
                </Box>
              </Container>
            </Grid>
            <Dialog
              fullWidth
              onClose={() => this.setState({ApproveModal:false})}
              open={this.state.ApproveModal}
              className="cancel-meeting-dialog"
            >   
              <DialogContent style={{ margin: "15px 0" }}>
                <Box textAlign="center">
                  <img className="comment-image" src={CheckIcon} alt="check" />
                  <Typography variant="h6">{t("Approve Budget Report")}</Typography>
                  <Typography variant="body1" style={{ marginBottom: "0px" }}>
                    {t("Are you sure you want to approve budget report?")}
                  </Typography>
                  <DialogActions className="dialog-button-group">
                    <Button className="cancel-button" style={{ width: "200px",marginRight:"15px" }} onClick={() => this.setState({ApproveModal:false})}>
                      {t("Close")}
                    </Button>
                    <Button style={{ width: "200px" }} className="add-button" onClick={() => this.setState({ApproveModal:false})}>
                      {t("Approve")}
                    </Button>
                  </DialogActions>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(BudgetReport));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "white",
    color: "black",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const RejectButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#2b6fed",
    fontWeight: "bold",
    height: "55px",
    width: "200px",
    "&:hover": {
      backgroundColor: "#2b6fef",
    },
  },
}))(Button);

const ApproveButton = withStyles((theme) => ({
  root: {
    color: "#2b6fed",
    backgroundColor: "white",
    fontWeight: "bold",
    height: "55px",
    width: "200px",
    border: "#2B6FED 1px solid",
    marginRight: "20px",
  },
}))(Button);

// Customizable Area End
