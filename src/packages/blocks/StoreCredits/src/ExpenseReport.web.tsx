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
  Grid, Backdrop, Fade, TextField, Modal,
} from "@material-ui/core";
import ExpenseReportController, { Props } from "./ExpenseReportController.web";
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
import { SearchIconImage,UploadLogo } from "./assets";
import CloseIcon from "@material-ui/icons/Close";
import {dashBoardActions,PublishButton,CloseButton} from "../../InvoiceBilling/src/chairmanUIStyles"

class ExpenseReport extends ExpenseReportController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

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
                        {t("Expense Reports")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      {t("Expense Reports")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Select displayEmpty value="" className="select-input">
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                      </Select>
                    )}
                    <Select displayEmpty className="select-input" value="">
                      <MenuItem value="" disabled>
                        {t("Select Category")}
                      </MenuItem>
                      <MenuItem value="scheduled">{t("Scheduled")}</MenuItem>
                      <MenuItem value="completed">{t("Completed")}</MenuItem>
                      <MenuItem value="cancelled">{t("Cancelled")}</MenuItem>
                    </Select>
                    <Select displayEmpty className="select-input" value="">
                      <MenuItem value="" disabled>
                        {t("Select Year")}
                      </MenuItem>
                      <MenuItem value="scheduled">{t("Pending")}</MenuItem>
                      <MenuItem value="completed">{t("Approved")}</MenuItem>
                      <MenuItem value="cancelled">{t("Rejected")}</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />} onClick={() => {}}>
                      {t("Search")}
                    </Button>
                  </Box>
                  <Box className="expense-right-heading">
                    <Box className="sort-by">
                      <select>
                        <option value="">Sort By</option>
                        <option value="Asc">Asc</option>
                        <option value="Desc">Desc</option>
                      </select>
                    </Box>
                    {localStorage.getItem("userType") === ROLE.MANAGER && (
                      <Box className="create-meeting">
                        <Button onClick={()=> this.setState({openModal:true})}>{t("Add New Expense")}</Button>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Grid className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h4>{t("Expense Reports")}</h4>
                      <div className="search-box">
                        <SearchIcon />
                        <InputBase placeholder={t("Search By Expense Number")} className="search" value="" />
                      </div>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>{t("Title")}</TableCell>
                          <TableCell>{t("Expense Number")}</TableCell>
                          <TableCell>{t("Expense Registered On")}</TableCell>
                          <TableCell>{t("Amount")}</TableCell>
                          <TableCell>{t("Category")}</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={7}>{t("No Expense Reports Available")}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell className="ellipse">2022 Title</TableCell>
                          <TableCell>2022123</TableCell>
                          <TableCell>12 Dec 2022</TableCell>
                          <TableCell>SR 12,000</TableCell>
                          <TableCell>Plumbing</TableCell>
                          <TableCell>
                            <Menu
                              menuButton={
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            >
                              <MenuItem>{t("View")}</MenuItem>
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
                        Showing <span className="current-page">{0}</span> of <span className="total-page">0</span>{" "}
                        results
                      </p>
                      <Pagination siblingCount={2} variant="outlined" shape="rounded" />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Modal
                style={dashBoardActions.modal}
                open={this.state.openModal}
                onClose={()=> this.setState({openModal:false})}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
              <Fade in={this.state.openModal}>
                <div style={dashBoardActions.expensePaper}>
                  <div style={dashBoardActions.expenseModalHeader}>
                    <Typography variant="h6" style={dashBoardActions.subHeadingFont}>{t("Add New Expense")}</Typography>
                    <IconButton onClick={()=> this.setState({openModal:false})}>
                      <CloseIcon/>
                    </IconButton>
                  </div>
                  <Divider/>
                  <Grid container spacing={2} style={{marginTop:"10px"}}>
                    <Grid item xs={12}>
                      <TextField label={t("Title")} variant="outlined"
                           name="title"
                           fullWidth
                           inputProps={{ maxLength: 50 }}
                           style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}></p>
                    </Grid>
                    <Grid item xs={6}>
                      <Select variant="outlined" displayEmpty fullWidth value="" className="select-input" style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}>
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                      </Select>
                      <p style={{color:"red"}}></p>
                    </Grid>
                    <Grid item xs={6}>
                      <Select variant="outlined" displayEmpty fullWidth value="" className="select-input" style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}>
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                      </Select>
                      <p style={{color:"red"}}></p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label={t("Enter Amount")} variant="outlined"
                                 name="amount"
                                 fullWidth
                                 inputProps={{ maxLength: 50 }}
                                 style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}></p>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                          onClick={() => {
                            if(!this.state.selectedFile?.name){
                              this.upload.click();
                            }
                          }}
                          style={{backgroundColor:"#F9F9F9",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",height:"55px",borderRadius:"10px"}}
                      >
                        {
                          this.state.selectedFile?.name ?
                              <div style={{backgroundColor: "white",height:"40px",display:"flex",alignItems:"center",marginLeft:"10px",borderRadius:'10px',justifyContent:'space-between'}}>
                                <Typography variant="body1" style={{marginLeft:"10px"}}>{this.state.selectedFile.name}</Typography>
                                <IconButton onClick={()=> this.setState({selectedFile:{}})}><CloseIcon/></IconButton>
                              </div>
                              :
                              <Typography variant="body1" color="textSecondary" style={{marginLeft:"10px"}}>{t("Select Document")}</Typography>
                        }
                        <img src={UploadLogo} style={{marginRight:'10px'}}/>
                      </div>
                      <input
                          id="myInput"
                          type="file"
                          ref={(ref: any) => (this.upload = ref)}
                          style={{ display: "none" }}
                          accept=".docx, .pdf, .doc, .xlsx"
                          onChange={(e: any) => {
                            this.setState({selectedFile:e.currentTarget.files[0]});
                          }}
                          name="document"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label={t("Description")} variant="outlined"
                                 name="Description"
                                 fullWidth
                                 multiline
                                 rows={7}
                                 inputProps={{ maxLength: 50 }}
                                 style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}></p>
                    </Grid>
                    <Grid item xs={12} style={{display:"flex",justifyContent:'flex-end'}}>
                      <PublishButton style={{marginRight:"10px",height:"40px"}} onClick={()=> this.setState({openModal:false})}>Cancel</PublishButton>
                      <CloseButton style={{height:"40px"}}>Add</CloseButton>
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(ExpenseReport));
// Customizable Area End
