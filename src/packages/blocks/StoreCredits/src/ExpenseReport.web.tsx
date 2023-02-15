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
import AlertError from "../../../components/src/AlertError.web";
import AlertSuccess from "../../../components/src/AlertSuccess.web";
import PaginationModule from "./PaginationModule.web";
import {withRouter} from "react-router-dom"
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
                      <Select displayEmpty value={this.state.filterBuilding} onChange={(e:any)=> this.setState({filterBuilding:e.target.value})} className="select-input">
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                        {
                          this.state.buildingExpenseList?.map((item:any,key:any)=> {
                            return(
                                <MenuItem key={key} value={item.id}>
                                  {item.name}
                                </MenuItem>
                            )
                          })
                        }
                      </Select>
                    )}
                    <Select displayEmpty className="select-input" value={this.state.filterCategory} onChange={(e:any)=> this.setState({filterCategory:e.target.value})}>
                      <MenuItem value="" disabled>
                        {t("Select Category")}
                      </MenuItem>
                      {
                        this.state.categoryExpenseList?.map((item:any,key:any)=> {
                          return(
                              <MenuItem key={key} value={item.id}>
                                {item.budget_category}
                              </MenuItem>
                          )
                        })
                      }
                    </Select>
                    <Select displayEmpty className="select-input" value={this.state.filterYear} onChange={(e:any)=> this.setState({filterYear:e.target.value})}>
                      <MenuItem value="" disabled>
                        {t("Select Year")}
                      </MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 3}>{(new Date().getFullYear()) - 3}</MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 2}>{(new Date().getFullYear()) - 2}</MenuItem>
                      <MenuItem value={(new Date().getFullYear()) - 1}>{(new Date().getFullYear()) - 1}</MenuItem>
                      <MenuItem value={(new Date().getFullYear())}>{(new Date().getFullYear())}</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />} onClick={this.handleSearch}>
                      {t("Search")}
                    </Button>
                  </Box>
                  <Box className="expense-right-heading">
                    <Box className="sort-by">
                      <select value={this.state.filterShort} onChange={this.handleShorting}>
                        <option value="">Sort By</option>
                        <option value="Asc">Ascending</option>
                        <option value="Desc">Descending</option>
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
                        <InputBase placeholder={t("Search By Expense Number")} className="search" value={this.state.filterSearch} onChange={this.handleExpenseSearch} />
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
                        {
                          this.state.expenseList.length > 0 ?
                              this.state.expenseList?.map((item:any,key:any)=> {
                                return(
                                    <TableRow key={key}>
                                      <TableCell>{key + 1}</TableCell>
                                      <TableCell className="ellipse">{item?.attributes?.title}</TableCell>
                                      <TableCell>{item.attributes.Expence_Number}</TableCell>
                                      <TableCell>{item?.attributes?.Expence_Registered_on}</TableCell>
                                      <TableCell>{item?.attributes?.currency} {item?.attributes?.Amount?.toLocaleString()}</TableCell>
                                      <TableCell>{item?.attributes?.Category}</TableCell>
                                      <TableCell>
                                        <Menu
                                            menuButton={
                                              <IconButton>
                                                <MoreVertIcon />
                                              </IconButton>
                                            }
                                        >
                                          <MenuItem onClick={() => this.props.history.push(`/ExpenseReportDetails?id=${item.id}`)} >{t("View")}</MenuItem>
                                          <MenuItem onClick={()=> this.manageExpenseDownload(item.attributes?.pdf?.url,item.attributes.Expence_Number)}>{t("Download")}</MenuItem>
                                          <MenuItem>{t("Share")}</MenuItem>
                                        </Menu>
                                      </TableCell>
                                    </TableRow>
                                )
                              })
                              :
                              <TableRow>
                                <TableCell colSpan={7}>{t("No Expense Reports Available")}</TableCell>
                              </TableRow>
                        }
                      </TableBody>
                    </Table>
                    <Divider />
                    <Box className="table-bottom">
                      <PaginationModule pagination={this.state.pagination} page={this.state.page} handlePagination={this.handleExpenseReportPagination} />
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
                           value={this.state.title}
                           onChange={(e)=> this.setState({title:e.target.value,titleError:""})}
                           fullWidth
                           inputProps={{ maxLength: 50 }}
                           style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}>{this.state.titleError}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <Select variant="outlined" displayEmpty
                              fullWidth
                              className="select-input"
                              value={this.state.building}
                              onChange={(e)=> this.setState({building:e.target.value,buildingError:""})}
                              style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}>
                        <MenuItem value="" disabled>
                          {t("Select Building")}
                        </MenuItem>
                        {
                          this.state.buildingExpenseList?.map((item:any,key:any)=> {
                            return(
                                <MenuItem key={key} value={item.id}>
                                  {item.name}
                                </MenuItem>
                            )
                          })
                        }
                      </Select>
                      <p style={{color:"red"}}>{this.state.buildingError}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <Select variant="outlined"
                              displayEmpty
                              fullWidth
                              className="select-input"
                              value={this.state.category}
                              onChange={(e)=> this.setState({category:e.target.value,categoryError:""})}
                              style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}>
                        <MenuItem value="" disabled>
                          {t("Select Category")}
                        </MenuItem>
                        {
                          this.state.categoryExpenseList?.map((item:any,key:any)=> {
                            return(
                                <MenuItem key={key} value={item.id}>
                                  {item.budget_category}
                                </MenuItem>
                            )
                          })
                        }
                      </Select>
                      <p style={{color:"red"}}>{this.state.categoryError}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label={t("Enter Amount")} variant="outlined"
                                 name="amount"
                                 type="number"
                                 fullWidth
                                 value={this.state.amount}
                                 onChange={(e)=> this.setState({amount:e.target.value,amountError:""})}
                                 inputProps={{ maxLength: 50 }}
                                 style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}>{this.state.amountError}</p>
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
                            this.setState({selectedFile:e.currentTarget.files[0],fileUploadError:""});
                          }}
                          name="document"
                      />
                      <p style={{color:"red"}}>{this.state.fileUploadError}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label={t("Description")} variant="outlined"
                                 name="Description"
                                 fullWidth
                                 multiline
                                 value={this.state.description}
                                 onChange={(e)=> this.setState({description:e.target.value,descriptionError:""})}
                                 rows={7}
                                 inputProps={{ maxLength: 50 }}
                                 style={{backgroundColor:"#F9F9F9",borderRadius:"10px"}}
                      />
                      <p style={{color:"red"}}>{this.state.descriptionError}</p>
                    </Grid>
                    <Grid item xs={12} style={{display:"flex",justifyContent:'flex-end'}}>
                      <PublishButton style={{marginRight:"10px",height:"40px"}} onClick={()=> this.setState({openModal:false})}>Cancel</PublishButton>
                      <CloseButton style={{height:"40px"}} onClick={this.handleValidation}>Add</CloseButton>
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            </Modal>
          </Box>
        </Box>
        <AlertError show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        <AlertSuccess show={this.state.showSuccess} handleClose={()=>this.setState({showSuccess:false,successMessage:""})} message={this.state.successMessage} />
      </>
    );
  }
}

export default withTranslation()(withStyles(ReportsStyleWeb)(withRouter(ExpenseReport)));
// Customizable Area End
