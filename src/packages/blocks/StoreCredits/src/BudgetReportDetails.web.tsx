// Customizable Area Start
import React from "react";
import {
    Backdrop,
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Fade,
    FormControl,
    Grid,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextareaAutosize,
    TextField,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import BudgetReportDetailsController, {Props} from "./BudgetReportDetailsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import {withTranslation} from "react-i18next";
import "web/src/i18n";
import {ReportsStyleWeb} from "./ReportsStyle.web";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {cancle, CheckIcon} from "../../user-profile-basic/src/assets"
import {buildingLogo, GroupLogo, manageLogo} from "./assets"
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {withRouter} from "react-router";
// @ts-ignore
import DOMPurify from 'dompurify'
import AlertSuccess from "../../../components/src/AlertSuccess.web";

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
                  <Box className="sub-heading-box" style={{marginBottom:"30px"}}>
                    <Typography variant="h5" className="sub-heading">
                      {t("Budget Report Details")}
                    </Typography>
                      {
                          this.state?.budgetDetails?.status == "Pending" &&
                          <Typography variant="body1" className={"statusOngoingRed"}>Pending Approval</Typography>
                      }
                      {
                          this.state?.budgetDetails?.status == "Rejected" &&
                          <Typography variant="body1" className={"statusRejected"}>{this.state?.budgetDetails?.status}</Typography>
                      }
                      {
                          this.state?.budgetDetails?.status == "Approved" &&
                          <Typography variant="body1" className={"statusOngoingGreen"}>{this.state?.budgetDetails?.status}</Typography>
                      }
                  </Box>
                </Box>
                  {
                      this.state.budgetDetails.status === "check" &&
                      <Box style={{backgroundColor:"white",marginBottom:"30px"}}>
                          <Grid container spacing={4}>
                              <Grid item xs={12} sm={7} style={{display:'flex',flexDirection:"column",justifyContent:"space-around"}} >
                                  <Box style={{display:'flex',alignItems:'center',marginLeft:"20px"}}>
                                      <img src={GroupLogo} style={{marginRight:"15px"}} />
                                      <Typography variant="h6" style={{fontWeight:"bold"}}>Building Name</Typography>
                                  </Box>
                                  <Box style={{display:'flex',alignItems:'center',marginLeft:"20px"}}>
                                      <Typography variant="body1">Managed By:</Typography>
                                      <img src={manageLogo} style={{marginLeft:"10px"}}/>
                                  </Box>
                              </Grid>
                              <Grid item xs={12} sm={5} >
                                  <img src={buildingLogo.default} width="95%" height="130px"/>
                              </Grid>
                          </Grid>
                      </Box>
                  }
                <Box className="top-bar" />
                <Grid className="meeting-table" style={{backgroundColor:"white",marginBottom:"20px"}}>
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top" >
                      <h4 style={{padding:" 20px 10px"}}>{t("Budget")} {this.state?.budgetDetails?.year}</h4>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow >
                          <TableCell align="left" style={{color:"gray",padding:"10px 10px"}}>
                              <Typography style={{color:"gray"}} variant="subtitle1">{t("Name")} </Typography>
                          </TableCell>
                          <TableCell align="right"  style={{ padding:"10px 10px", paddingRight: "50px",color:"gray" }}>
                              <Typography style={{color:"gray"}} variant="subtitle1">{t("Amount")}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                              this.state.budgetDetails?.facilities?.length > 0 ?
                              this.state.budgetDetails?.facilities?.map((item:any,key:any) => {
                                  return(
                                      <TableRow key={key}>
                                          <TableCell align="left" style={{ display: "flex", alignItems: "center",color:"#181d25",padding:"10px 10px" }}>
                                              <Typography  variant="subtitle1">{item.budget_category}</Typography>
                                              <HtmlTooltip
                                                  title={
                                                      <React.Fragment>
                                                          <Box style={{ margin: "10px" }}>
                                                              <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                                                  {item.budget_category}
                                                              </Typography>
                                                              <Typography variant="subtitle2" dangerouslySetInnerHTML={
                                                                  { __html: DOMPurify.sanitize(item.description) }
                                                              }/>
                                                          </Box>
                                                      </React.Fragment>
                                                  }
                                              >
                                                  <IconButton style={{ padding: "2px" }}>
                                                      <InfoOutlinedIcon style={{ color: "#2B6FED", fontSize: "20px" }} />
                                                  </IconButton>
                                              </HtmlTooltip>
                                          </TableCell>
                                          <TableCell align="right" style={{padding:"10px 10px",paddingRight: "50px" }}>
                                              <Typography  variant="subtitle1" style={{fontWeight:"bold"}}>{this.state?.budgetDetails?.currency?.currency} {item.allocate_budget?.toLocaleString()}</Typography>
                                          </TableCell>
                                      </TableRow>
                                  )
                              })
                              :
                                  <TableRow>
                                      <TableCell style={{color:"gray",padding:"5px 10px"}} colSpan={6}>{t("No Budget Details are Available")}</TableCell>
                                  </TableRow>
                              }
                          {
                              this.state.budgetDetails?.facilities?.length > 0 &&
                              <TableRow>
                                  <TableCell  align="left" style={{ display: "flex", alignItems: "center",padding:"10px 10px" }}>
                                      <Typography style={{fontWeight:"bold"}}>Budget Amount</Typography>
                                  </TableCell>
                                  <TableCell align="right" style={{ padding:"10px 10px",paddingRight: "50px" }}>
                                      <Typography style={{fontWeight:"bold",color:"#FC8434",paddingRight:"0px"}}> {this.state?.budgetDetails?.currency?.currency} {this.state?.budgetDetails?.approved_amount?.toLocaleString() || 0} </Typography>
                                  </TableCell>
                              </TableRow>
                          }
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
                  {
                      this.state?.budgetDetails?.status == "Rejected" &&
                      <Grid className="rejection-box">
                          <Card>
                              <h4>{t("Rejection Reason")}</h4>
                              <p>
                                  {this.state?.budgetDetails?.note}
                              </p>
                          </Card>
                      </Grid>
                  }
                  {
                      this.state?.budgetDetails?.status === "Pending" && localStorage.getItem("userType") === "Chairman" &&
                      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                          <ApproveButton onClick={() => this.setState({ setOpen: true })}>Reject</ApproveButton>
                          <RejectButton onClick={() => this.setState({ ApproveModal: true })}>Approve</RejectButton>
                      </Box>
                  }
                  {
                      this.state?.budgetDetails?.status !== "Pending" && this.state?.budgetDetails?.status !== "Rejected" &&
                      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                          <RejectButton onClick={this.manageDownloadFiles}>Download Report</RejectButton>
                      </Box>
                  }
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
                    <Button style={{ width: "200px" }} className="add-button" onClick={this.manageBudgetApproval}>
                      {t("Approve")}
                    </Button>
                  </DialogActions>
                </Box>
              </DialogContent>
            </Dialog>
            <Modal
            style={dashBoard.modal}
            open={Boolean(this.state.setOpen)}
            onClose={()=> this.setState({setOpen:false})}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={Boolean(this.state.setOpen)}>
                <div style={dashBoard.paper}>
                    <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>
                            {t("Reject Budget Report")}
                        </Typography>
                        <IconButton onClick={()=> this.setState({setOpen:false})}>
                            <img src={cancle}
                                //@ts-ignore
                                 style={dashBoard.modalCacle}/>
                        </IconButton>
                    </Box>
                    <Box style={{display:'flex',alignItems:"center",marginLeft:"-50px"}}>
                        <Divider style={{width:"120%"}}/>
                    </Box>
                    <Grid container spacing={2} style={{marginTop:"20px"}}>
                        <Grid xs={12} style={{marginTop:"10px",padding:"0px 7px"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label={t("Add Notes")}
                                multiline
                                value={this.state.rejectReason}
                                onChange={(e:any)=> {
                                    this.setState({rejectReason:e.target.value,RejectReasonError:""}) 
                                }}
                                fullWidth
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                rows={7}
                                variant="outlined"
                            />
                            <p style={{color:"red"}}>{this.state.RejectReasonError}</p>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"40px",marginBottom:"10px"}}>
                        <Box>
                            <ApproveButton variant="contained" style={{marginRight:"15px",height:"40px"}} onClick={()=> this.setState({setOpen:false})}>{t("Cancel")}</ApproveButton>
                            <RejectButton variant="contained" style={{height:"40px"}} onClick={this.handleRejectBudget}>{t("Submit")}</RejectButton>
                        </Box>
                    </Grid>
                </div>
            </Fade>
            </Modal>
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
        <AlertSuccess show={this.state.showSuccess} handleClose={()=> {this.setState({showSuccess:false})}} message={this.state.successMessage} />
      </>
    );
  }
}
const dashBoard = {
  navigation: {
      display: "flex",
      justifyContent: "space-between",
  },
  subHeading: {
      fontWeight: 600,
      // marginTop: 15,
  },
  invitationCont:{
      fontWeight: 600,
      margin:'10px 0px 10px 0px'
  },
  inviteTitle:{
      margin:'10px 0px 10px 0px'
  },
  SideBar: {
      background: "#f9f6f6",
      position: "relative",
      paddingBottom: 150,
  },
  gaMemberCard:{
      display: "grid",
      gridTemplateColumns: "4fr 4fr 4fr",
      gap: 20
  },
  managementPaper:{
      padding:20
  },
  imgRound:{
      border: "2px solid #F7F9FE",
      borderRadius: "100%",
      height: 50,
      width: 50
  },
  mailIcon:{
      padding:8
  },
  invitemember:{
      border: "2px solid #F7F9FE",
      borderRadius: "100%",
      height: 50,
      width: 50,
      backgroundColor:"#FC8434"
  },
  inviteIcon:{
      padding:13
  },
  cancleIcon:{
      position:"absolute",
      top:15,
      right:15
  },
  modalCacle:{
      top:15,
      right:15,
      float:"right",
      cursor:"pointer"
  },
  invitationReq:{
      marginTop:30
  },
  facility: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom:"1px solid #f8f8f8",
      cursor:"pointer"
  },
  modal:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      backgroundColor: "#fff",
      borderRadius: '10px',
      // boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      width:"700px",
      overflow:"hidden"
  },
  formLabels:{
      paddingLeft:35
  },
  labelsStyle:{
      color:"#212121",
      margin:"10px 0px 10px 0px"
  },
  formLeftIcn:{
      position:"absolute",
      left: 20,
      top: 44,
      color: "#b9b9b9"
  },
  inviteInput:{
      padding: "18px 18px 18px 50px",
      color: "#b5b5b5",
      borderRadius: "10px",
      border: "1px solid #e9dede",
      backgroundColor: "#f9f9f9",
      fontSize: "16px",
      outline: 0,
      width:"100%"
  }
};


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
// @ts-ignore
export default withTranslation()(withStyles(ReportsStyleWeb)(withRouter(BudgetReportDetails)));
// Customizable Area End
