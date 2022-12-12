// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Button,
  IconButton,
  Divider,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Card,
  FormControl,
  TextareaAutosize,
} from "@material-ui/core";
import BudgetReportDetailsController, { Props } from "./BudgetReportDetailsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "web/src/i18n";
import { ReportsStyleWeb } from "./ReportsStyle.web";
import { CheckIcon } from "../../user-profile-basic/src/assets";
import { BuildingImage } from "../../TaskAllocator/src/assets";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

class BudgetReportDetails extends BudgetReportDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.reportDetails}>
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
                  <Typography variant="body1">
                    {t("Documents & Reports")} / {t("Reports")} / {t("Budget Reports")} /{" "}
                    <Box component="span" style={{ color: "blue" }}>
                      {t("Report Details")}
                    </Box>
                  </Typography>
                  <Box className="sub-heading-box">
                    <Typography variant="h5" className="sub-heading">
                      {t("Budget Report Details")}
                    </Typography>
                    <span className="pending">{t("Pending Approval")}</span>
                  </Box>
                </Box>

                <Box className="building-box">
                  <Card>
                    <Grid container spacing={2}>
                      <Grid md={8} item>
                        <Box className="left-box">
                          <Box className="building">
                            <img src={BuildingImage.default} alt="" />
                            <h4>Building Name</h4>
                          </Box>
                          <p>Managed By: Qwerty</p>
                        </Box>
                      </Grid>
                      <Grid md={4} item>
                        <Box className="right-box">
                          <img src={BuildingImage.default} alt="" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>

                <Box className="budget-box">
                  <Card>
                    <Box className="heading">
                      <h4>Budget 2022</h4>
                    </Box>
                    <Divider />
                    <Box className="budget-content-box">
                      <Box className="head content-line">
                        <p>Name</p>
                        <span>Amount</span>
                      </Box>
                      <hr />
                      <Box className="content-line">
                        <p>Budget 2022</p>
                        <span>SR 2022</span>
                      </Box>
                      <hr />
                      <Box className="content-line">
                        <p>Budget 2022</p>
                        <span>SR 2022</span>
                      </Box>
                      <hr />
                      <Box className="content-line">
                        <p>Budget 2022</p>
                        <span>SR 2022</span>
                      </Box>
                      <hr />
                      <Box className="content-line">
                        <p>Budget 2022</p>
                        <span>SR 2022</span>
                      </Box>
                    </Box>
                    <Divider />
                    <Box className="footer">
                      <Box className="content-line">
                        <p>Budget 2022</p>
                        <span>SR 2022</span>
                      </Box>
                    </Box>
                  </Card>
                </Box>

                <Box className="rejection-box">
                  <Card>
                    <h4>{t("Rejection Reason")}</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, recusandae delectus. Non rem sequi
                      dignissimos porro incidunt quas quis nam libero, culpa, dolorem architecto quod iure minus
                      mollitia labore. Id?
                    </p>
                  </Card>
                </Box>

                <Box className="button-box">
                  <Button className="cancel" onClick={() => this.handleRejectReportModal()}>
                    {t("Reject")}
                  </Button>
                  <Button className="edit" onClick={() => this.handleApproveReportModal()}>
                    {t("Approve")}
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog fullWidth className="add-meeting" open={this.state.isRejectReportModalOpen}>
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Reject Budget Report</Typography>
            <IconButton onClick={() => this.handleRejectReportModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <TextareaAutosize className="reject-note" placeholder={t("Add Notes")} />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleRejectReportModal()}>
              {t("Cancel")}
            </Button>
            <Button className="add-button">{t("Submit")}</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth
          onClose={() => this.handleApproveReportModal()}
          open={this.state.isApproveReportModalOpen}
          className="cancel-meeting-dialog"
        >
          <DialogContent style={{ margin: "15px 0" }}>
            <Box textAlign="center">
              <img className="comment-image" src={CheckIcon} alt="check" />
              <Typography variant="h6">Approve Budget Report</Typography>
              <Typography variant="body1" style={{ marginBottom: "0px" }}>
                Are you sure you want to approve budget report?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  className="cancel-button"
                  style={{ width: "200px" }}
                  onClick={() => this.handleApproveReportModal()}
                >
                  {t("Close")}
                </Button>
                <Button style={{ width: "200px" }} className="add-button">
                  {t("Approve")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(BudgetReportDetails));

// Customizable Area End
