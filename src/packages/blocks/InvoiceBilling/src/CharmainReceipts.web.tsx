//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
    Backdrop,
    Box,
    Button,
    Container,
    Divider,
    Fade,
    Grid,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import {withRouter} from 'react-router-dom';

import CharmainReceiptsController, {Props} from "./CharmainReceiptsController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import {withTranslation} from 'react-i18next';
import {SearchIconImage} from "../../user-profile-basic/src/assets"
import {SuggestionStyleWeb} from "../../user-profile-basic/src/SuggestionStyle.web";
import {confirmIcon, DownloadIcon} from "./assets"
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
import 'web/src/i18n.js';
import {CloseButton, dashBoardActions, PublishButton} from "./chairmanUIStyles"
//resorces
// import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import '../../dashboard/src/style.css'

function createData( no:any, name:any, unit:any, title:any, amount:any, type:any, status:any, more:any) {
    return { no, name, unit, title, amount, type, status, more };
  }
  
  const rows = [
    createData(1, 'Frozen yoghurt', 159, 'May - 2022 invoices', 'SR 6', 'Managment Fees', 'Overdue', <MoreVertIcon color='disabled' />),
    createData(2, 'Ice cream sandwich', 237, 'May - 2022 invoices', 'SR 200', 'Rent Fees', 'Paid', <MoreVertIcon color='disabled' />),
    createData(3, 'Eclair', 262,'May - 2022 invoices', 'SR 160', 'Managment Fees', 'Due', <MoreVertIcon color='disabled' />),
    createData(4, 'Cupcake', 305,'May - 2022 invoices', 'SR 670', 'Rent Fees', 'partialy Paid', <MoreVertIcon color='disabled' />),
    createData(5, 'Gingerbread', 356,'May - 2022 invoices', 'SR 300', 'Managment Fees', 'partialy Paid', <MoreVertIcon color='disabled' />),
    createData(6, 'Frozen yoghurt', 159, 'May - 2022 invoices', 'SR 6', 'Managment Fees', 'Overdue', <MoreVertIcon color='disabled' />),
    createData(7, 'Ice cream sandwich', 237, 'May - 2022 invoices', 'SR 200', 'Rent Fees', 'Paid', <MoreVertIcon color='disabled' />),
    createData(8, 'Eclair', 262,'May - 2022 invoices', 'SR 160', 'Managment Fees', 'Due', <MoreVertIcon color='disabled' />),
    createData(9, 'Cupcake', 305,'May - 2022 invoices', 'SR 670', 'Rent Fees', 'partialy Paid', <MoreVertIcon color='disabled' />),
    createData(10, 'Gingerbread', 356,'May - 2022 invoices', 'SR 300', 'Managment Fees', 'partialy Paid', <MoreVertIcon color='disabled' />),
  ];

class CharmainInvoices extends CharmainReceiptsController {
constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.state = {
        dataSearch: "",
        anchorEl: null
    }
    // Customizable Area End
}

render() {
    const {t} = this.props
    const { classes } = this.props;
    var searchData = rows.filter((item) => {
        if (this.state.dataSearch === "") {
          return item;
        } else if (
          item.name.toLowerCase().includes(this.state.dataSearch.toLowerCase())
        ) {
          return item;
        }
      });
    
    const { navigation } = this.props;
    return (
      // Customizable Area Start
      <>
        <Box style={{background: "#E5ECFF"}} className={classes.announcements}>
            {/* Dashboard Header -- */}
            <DashboardHeader {...this.props}/>
            <Box style={{display: "flex"}}>
                
                <Grid item xs={3} md={3} sm={3} className="SideBar">
                    {/* Chairman Sidebar -- */}
                    <ChairmanSidebar {...this.props}/>
                </Grid>

                <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
                    <Container>
                        <Box style={dashBoardActions.navigation}>
                            <Box>
                                <Typography variant="body1" >
                                {t("Invoices & Receipts")} / <Box component="span" style={{color: "blue"}}>{t("Receipts")}</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>{t("Receipts")}</Typography>
                            </Box>
                        </Box>
                        <Box className="top-bar">
                            <Box className="filter">
                                <Select displayEmpty value={this.state.filterBuilding || ""} className="select-input" onChange={this.selectBuilding}>
                                    <MenuItem value="">
                                        {t("Select Building")}
                                    </MenuItem>
                                    {
                                        this.state.buildingList?.map((item:any,key:any)=> {
                                            return(
                                                <MenuItem key={key} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                <Select displayEmpty  value={this.state.filterFloor || ""} className="select-input" onChange={(e) => this.setState({filterFloor:e.target.value})}>
                                    <MenuItem value="">
                                        {t("Select Floor")}
                                    </MenuItem>
                                </Select>
                                <Select displayEmpty value={this.state.filterUnit || ""} className="select-input" onChange={(e:any) => this.setState({filterUnit:e.target.value})}>
                                    <MenuItem value="">
                                        {t("Select Unit")}
                                    </MenuItem>
                                    {
                                        this.state.unitList?.map((item:any,key:any)=> {
                                            return(
                                                <MenuItem key={key} value={item.id}>
                                                    {item.apartment_name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                <Select displayEmpty value={""} className="select-input">
                                    <MenuItem value="">{t("Select Type")}</MenuItem>
                                    <MenuItem value="management_fees">{t("Management Fee")}</MenuItem>
                                    <MenuItem value="rent_payments">{t("Rent Payments")}</MenuItem>
                                </Select>
                                <Select displayEmpty value={""} className="select-input">
                                    <MenuItem value="">
                                        {t("Select Status")}
                                    </MenuItem>
                                    <MenuItem value="due">{t("Due")}</MenuItem>
                                    <MenuItem value="over_due">{t("Over Due")}</MenuItem>
                                    <MenuItem value="paid">{t("Paid")}</MenuItem>
                                    <MenuItem value="partially_paid">{t("Partially Paid")}</MenuItem>
                                </Select>
                                <Button onClick={this.handleFilterBy} startIcon={<img src={SearchIconImage} />}>{t("Search")}</Button>
                            </Box>
                        </Box>
                        <Box className="meeting-table">
                            <Grid item sm={12} md={12} xs={12}>
                                <Box className="table-top">
                                    <h3>{t("Receipts")}</h3>
                                    <Box className="filter">
                                        <Box className="search-box">
                                            <SearchIcon />
                                            <InputBase placeholder={t("Search By Name")} className="search" onChange={this.handleSearch}/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Table className="table-box" style={{paddingBottom:"25px"}}  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{color:"grey"}}>#</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Name")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Unit No.")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Title")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Amount")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Type")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">{t("Status")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {searchData.map((row) => (
                                            <TableRow key={row.no}>
                                                <TableCell component="th" scope="row">{row.no}</TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.unit}</TableCell>
                                                <TableCell align="center">{row.title}</TableCell>
                                                <TableCell align="center">{row.amount}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center" onClick={(e: any) => this.handleClick(e)}>{row.more}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <Box style={{width:"100%",height:"70px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <Box style={{display:"flex",marginLeft:"15px"}}>
                                        <Typography style={{marginRight:"5px"}}>{t("Showing")} </Typography>
                                        <Typography style={{marginRight:"5px",fontWeight:"bold",color:"#FC8434"}}>5</Typography>
                                        <Typography style={{marginRight:"5px"}}> {t("of")} </Typography>
                                        <Typography style={{fontWeight:"bold"}}>50</Typography>
                                    </Box>
                                    <Box style={{marginRight:"10px"}}>
                                        <Pagination count={10} variant="outlined" shape="rounded" />
                                    </Box>
                                </Box>
                            </Grid>
                        </Box>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                            style={{padding:"0px", cursor:'pointer'}}
                            >
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}} onClick={this.handleModalOpen}>{t("View")}</MenuItem>
                            <Divider style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("Download")}</MenuItem>
                            <Divider style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("Share")}</MenuItem>
                            </Menu>

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
                                <div style={dashBoardActions.paper}>
                                    <div style={dashBoardActions.modalHeader}>
                                    <Typography variant="h5" style={dashBoardActions.subHeadingFont}>{t("Management Fee Invoice")} - May 2022</Typography>
                                        <IconButton onClick={this.handleModalClose}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                    <Divider style={{marginLeft:"-100px",width:"200%"}}/>
                                        <Box style={{marginTop:"20px"}}>
                                            <Grid container spacing={2} style={dashBoardActions.residetails}>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Owner Name:")}</Typography>
                                                    <b>John Doe</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Resident Name:")}</Typography>
                                                    <b>Jenil Patel</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Building Name:")}</Typography>
                                                    <b>Building</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Unit Number:")}</Typography>
                                                    <b>1406</b>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} xs={12} style={dashBoardActions.residetails}>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Resident ID:")}</Typography>
                                                    <b>ABCDE1254Q</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Generated on:")}</Typography>
                                                    <b>15-05-2022</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Generated By")}:</Typography>
                                                    <b>Atik Khan</b>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography style={dashBoardActions.commonColor} component="h5">{t("Status")}:</Typography>
                                                    <b>Paid</b>
                                                </Grid>
                                            </Grid>
                                            <div style={{marginTop:"30px",marginBottom:"5px"}}>
                                                <b style={{color:"#2b6fed"}}>{t("Summary")} </b>
                                            </div>
                                            <Paper elevation={0} style={dashBoardActions.summary}>
                                                <div>
                                                    <div className='resident-data'>
                                                        <Typography component="h5">{t("Management Fee Amount")}:</Typography>
                                                        <b>SR 1,250</b>
                                                    </div>
                                                    <div className='resident-data'>
                                                        <Typography component="h5">{t("Late Charges")}:</Typography>
                                                        <b>SR 29</b>
                                                    </div>
                                                    <div className='resident-data'>
                                                        <Typography component="h5">{t("Tax")}:</Typography>
                                                        <b>SR 24</b>
                                                    </div>
                                                    <div className='resident-data'>
                                                        <Typography component="h5">{t("Others")}:</Typography>
                                                        <b>SR 00</b>
                                                    </div>
                                                    <hr />
                                                    <div className='resident-data'>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Total Amount")}</Typography>
                                                        <b style={{color:"#FC8434"}}>SR 1303</b>
                                                    </div>
                                                </div>
                                            </Paper>
                                            <Grid container xs={12} style={dashBoardActions.residetails}>
                                                <Grid item xs={8} style={{display:"flex", marginTop:"10px",alignItems:"center",cursor:"pointer"}}>
                                                    <img src={DownloadIcon} width="20px" height="20px" style={{marginRight:"10px"}}/>
                                                    <Typography component="h5" style={{fontWeight:"bold"}}>{t("Download Receipt")}</Typography>
                                                </Grid>
                                                <Grid item xs={4} style={{display:'flex',justifyContent:"flex-end"}}>
                                                    <Typography variant="subtitle2" className="statusOngoingGreen" style={{width:"100px",textAlign:"center"}}>PAID</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                </div>
                                </Fade>
                            </Modal>
                    </Container>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className="modalStyle"
                        // @ts-ignore
                        open={this.state.confirmPaymentModal}
                        onClose={()=> this.setState({confirmPaymentModal:false})}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {/*@ts-ignore*/}
                        <Fade in={this.state.confirmPaymentModal}>
                            <Box style={{width:"425px",marginTop:'20px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                                <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"15px",marginBottom:"30px"}}>
                                    <Box>
                                        <img src={confirmIcon} />
                                    </Box>
                                    <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center"}}>
                                       {t("Payment Confirmation")}?
                                    </Typography>
                                    <Typography variant="body2" style={{textAlign:"center"}}>
                                        {t("Please confirm that you want to register the payment amount")}
                                        <span style={{color:"#FC8434",fontWeight:"bold",marginLeft:"5px"}}>SR 500</span>. {t("This action can’t be undone.")}
                                    </Typography>
                                    <Box style={{marginTop:"20px",width:"90%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                        {/*@ts-ignore*/}
                                        <PublishButton variant="outlined" style={{marginRight:"10px"}} >{t("Close")}</PublishButton>
                                        <CloseButton >{t("Confirm")}</CloseButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </Grid>
            </Box>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(CharmainInvoices)));

// Customizable Area Start


  // Customizable Area End