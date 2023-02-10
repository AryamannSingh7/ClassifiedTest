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
    MenuItem,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Pagination from '@material-ui/lab/Pagination';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withRouter} from 'react-router-dom';
import { Menu } from "@szhsin/react-menu";
import CharmainInvoicesController, {Props} from "./CharmainInvoicesController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import {withTranslation} from 'react-i18next';
import {SearchIconImage} from "../../user-profile-basic/src/assets"
import {SuggestionStyleWeb} from "../../user-profile-basic/src/SuggestionStyle.web";
import {confirmIcon, DownloadIcon} from "./assets"
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import 'web/src/i18n.js';
import {CloseButton, dashBoardActions, PublishButton} from "./chairmanUIStyles"
//resorces
// import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import '../../dashboard/src/style.css'
import AlertError from "../../../components/src/AlertError.web";
import AlertSuccess from "../../../components/src/AlertSuccess.web";
import PaginationModule from "../../StoreCredits/src/PaginationModule.web";

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

class CharmainInvoices extends CharmainInvoicesController {
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
                                {t("Invoices & Receipts")} / <Box component="span" style={{color: "blue"}}>{t("Invoices")}</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>{t("Invoices")}</Typography>
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
                                <Select displayEmpty  value={this.state.filterFloor || ""} className="select-input" onChange={this.selectFloor}>
                                    <MenuItem value="">
                                        {t("Select Floor")}
                                    </MenuItem>
                                    {
                                        this.state.floorList?.map((item:any,key:any)=> {
                                            return(
                                                <MenuItem key={key} value={item}>
                                                    {item}
                                                </MenuItem>
                                            )
                                        })
                                    }
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
                                    <h3>{t("Invoices")}</h3>
                                    <Box className="filter">
                                        <Box className="search-box">
                                            <SearchIcon />
                                            <InputBase placeholder={t("Search")} className="search" onChange={this.handleSearch}/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Table className="table-box" style={{paddingBottom:"25px"}}  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{color:"grey"}}>#</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Name")}</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Unit No.")}</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Title")}</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Amount")}</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Type")}</TableCell>
                                            <TableCell style={{color:"grey"}} >{t("Status")}</TableCell>
                                            <TableCell style={{color:"grey"}} >Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.invoicesList?.length > 0 ?
                                            this.state.invoicesList?.map((row:any,key:any) => (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row">{key + 1}</TableCell>
                                                <TableCell>{row?.attributes?.name}</TableCell>
                                                <TableCell>{row?.attributes?.unit_number}</TableCell>
                                                <TableCell>{row?.attributes?.title}</TableCell>
                                                <TableCell>{row?.attributes?.currency?.currency} {row?.attributes?.amount}</TableCell>
                                                <TableCell>{row?.attributes?.invoice_type}</TableCell>
                                                <TableCell>{row?.attributes?.status}</TableCell>
                                                <TableCell>
                                                    <Menu
                                                        menuButton={
                                                            <IconButton>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <MenuItem onClick={() => this.handleModalOpen(row.id)}>
                                                            {t("View")}
                                                        </MenuItem>
                                                        <MenuItem onClick={() => this.manageDownload(row.id)}>{t("Download")}</MenuItem>
                                                        <MenuItem>{t("Share")}</MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                            )):
                                            <TableRow>
                                                <TableCell colSpan={6}>{t("No Invoice Data Available")}</TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                                <Divider />
                                <Box style={{width:"100%",height:"70px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <PaginationModule handlePagination={this.handleInvoicesPagination} pagination={this.state.pagination} page={this.state.page}/>
                                </Box>
                            </Grid>
                        </Box>
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
                                    {
                                        console.log("INVOICE DETAILS",this.state.invoiceDetails)
                                    }
                                    <Divider style={{marginLeft:"-100px",width:"200%"}}/>
                                    {
                                            this.state.generateReceipt ?
                                            <Box>
                                                <Box style={{marginTop:"15px",display:'flex',alignItems:"center"}}>
                                                    <IconButton onClick={()=> this.setState({generateReceipt:false})} style={{padding:"2px",marginLeft:'-3px',marginRight:'5px'}}>
                                                        <ArrowBackIcon/>
                                                    </IconButton>
                                                    <Typography variant="h6" style={{fontWeight:"bold",marginLeft:"5px"}}>Generate Receipts</Typography>
                                                </Box>
                                                <Box style={{margin:"20px 0px"}}>
                                                    <Typography>
                                                        Do you want to register the the payment for this invoice and generate a receipt for the payment? you can chose to recognize the full payment or partial payment by selecting one of the two payment options below
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex"}}>
                                                    <Typography color="textSecondary">
                                                        Resident ID:
                                                    </Typography>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold"}}>
                                                        {this.state.invoiceDetails?.resident_details?.resident_id}
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex"}}>
                                                    <Typography color="textSecondary">
                                                        Resident Name:
                                                    </Typography>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold"}}>
                                                        {this.state.invoiceDetails?.resident_details?.resident_name}
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex",marginTop:"20px"}}>
                                                    <Typography>
                                                        Total amount to be paid:
                                                    </Typography>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold",color:"#FC8434"}}>
                                                        {this.state.invoiceDetails?.currency} {this.state.invoiceDetails?.total_amount?.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex",marginTop:"20px"}}>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold"}}>
                                                        Select Payment Type
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <FormControl component="fieldset" style={{marginLeft:"10px",marginTop:"5px"}}>
                                                        <RadioGroup style={{display:"flex",flexDirection:"row"}} aria-label="quiz" name="quiz" value={this.state.paymentType} onChange={(e)=> this.setState({paymentType:e.target.value})}>
                                                            <FormControlLabel value="full" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#CCCCCC"}}/>} checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}}/>} />} label="Register Full payment" />
                                                            <FormControlLabel value="partial" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#CCCCCC"}}/>} checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}}/>} />} label="Register Partial Payment" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                {
                                                    this.state.paymentType === "partial" &&
                                                    <Box style={{display:'flex',alignItems:"center",marginTop:"20px"}}>
                                                        <TextField type="number" placeholder="Enter partial paid amount" value={this.state.partialPaymentAmount} onChange={(e)=> this.setState({partialPaymentAmount:e.target.value})} id="reminAmountFiled"  variant="outlined" />
                                                        <Typography style={{marginLeft:"30px"}}>
                                                            Remaining Amount :  {this.state.invoiceDetails?.currency} {parseInt(this.state.invoiceDetails?.total_amount) - parseInt(this.state.partialPaymentAmount || 0)}
                                                        </Typography>
                                                    </Box>
                                                }
                                                <Box style={{marginTop:"50px",width:"100%",display:"flex",justifyContent:"flex-end"}}>
                                                    <Button variant="contained" style={dashBoardActions.receiptCancel} color="primary" onClick={()=> this.setState({generateReceipt:false})}>{t("Close")}</Button>
                                                    <Button variant="contained" style={dashBoardActions.paymentbtn} color="primary" onClick={this.registerPaymentConfirmation}>{t("Register Payment")}</Button>
                                                </Box>
                                            </Box>
                                            :
                                            <Box style={{marginTop:"20px"}}>
                                                <Grid container spacing={2} style={dashBoardActions.residetails}>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Owner Name:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.owner_name}</b>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Resident Name:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.resident_details?.resident_name}</b>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Building Name:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.building_name}</b>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Unit Number:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.unit_number}</b>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2} xs={12} style={dashBoardActions.residetails}>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Resident ID:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.resident_details?.resident_id}</b>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography style={dashBoardActions.commonColor} component="h5">{t("Generated on:")}</Typography>
                                                        <b>{this.state.invoiceDetails?.generated_on}</b>
                                                    </Grid>
                                                </Grid>
                                                <div style={{marginTop:"30px",marginBottom:"5px"}}>
                                                    <b style={{color:"#2b6fed"}}>{t("Summary")} </b>
                                                </div>
                                                <Paper elevation={0} style={dashBoardActions.summary}>
                                                    <div>
                                                        <div className='resident-data'>
                                                            <Typography component="h5">{t("Management Fee Amount")}:</Typography>
                                                            <b> {this.state.invoiceDetails?.currency}  {this.state.invoiceDetails?.management_fee_amount?.toLocaleString()}</b>
                                                        </div>
                                                        <div className='resident-data'>
                                                            <Typography component="h5">{t("Late Charges")}:</Typography>
                                                            <b> {this.state.invoiceDetails?.currency}  {this.state.invoiceDetails?.late_charge?.toLocaleString()}</b>
                                                        </div>
                                                        <div className='resident-data'>
                                                            <Typography component="h5">{t("Tax")}:</Typography>
                                                            <b> {this.state.invoiceDetails?.currency}   {this.state.invoiceDetails?.tax?.toLocaleString()}</b>
                                                        </div>
                                                        <div className='resident-data'>
                                                            <Typography component="h5">{t("Others")}:</Typography>
                                                            <b> {this.state.invoiceDetails?.currency}  {this.state.invoiceDetails?.others?.toLocaleString()}</b>
                                                        </div>
                                                        <hr />
                                                        <div className='resident-data'>
                                                            <Typography style={dashBoardActions.commonColor} component="h5">{t("Total Amount")}</Typography>
                                                            <b style={{color:"#FC8434"}}> {this.state.invoiceDetails?.currency}  {this.state.invoiceDetails?.total_amount?.toLocaleString()}</b>
                                                        </div>
                                                    </div>
                                                </Paper>
                                                <Grid container xs={12} style={dashBoardActions.residetails}>
                                                    <Grid item xs={8} style={{display:"flex", marginTop:"10px",alignItems:"center",cursor:"pointer"}} onClick={()=> this.manageDownload(this.state.downloadId)}>
                                                        <img src={DownloadIcon} width="20px" height="20px" style={{marginRight:"10px"}}/>
                                                        <Typography component="h5" style={{fontWeight:"bold"}}>{t("Download Invoice")}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Button variant="contained" style={dashBoardActions.receiptbtn} color="primary" onClick={()=> this.setState({generateReceipt:true})}>{t("GENERATE RECEIPT")}</Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                    }
                                    {/* <div style={dashBoardActions.genrateReceipt}>
                                        <KeyboardBackspaceIcon style={{marginTop:"-3px"}}/><Typography  style={dashBoardActions.subHeading}>Generate Receipts</Typography>
                                    </div>
                                    <Typography>Do you want to register the payment for this invoice and and generate a receipt for the 
                                        payment? you can chose to recognize the full payment or partial payment by selecting one of the two payment option below.
                                    </Typography>
                                    <Typography style={dashBoardActions.commonColor} component="h5">Resident ID: <b style={{color:"#000"}}>3030304</b> </Typography>
                                    <Typography style={dashBoardActions.commonColor} component="h5">Resident Name: <b style={{color:"#000"}}>Jenil Patel</b> </Typography>
                                    <Typography>Total amount to be paid: <b style={{color:"#FC8434"}}>SR, 1303</b></Typography>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Select Payment Type</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" value={this.state.payment_type} onChange={this.handleSelect}>
                                            {console.log("selectvalue--->", this.state.payment_type)}
                                            <FormControlLabel value="fullpayment" control={<Radio />} label="Register Full Payments" />
                                            <FormControlLabel value="partialpayment" control={<Radio />} label="Register Partial Payments" />
                                        </RadioGroup>
                                    </FormControl> */}
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
                                        <span style={{color:"#FC8434",fontWeight:"bold",marginLeft:"5px"}}> {this.state.invoiceDetails?.currency}  {this.state.paymentType == "partial" ? this.state.partialPaymentAmount : this.state.invoiceDetails?.total_amount?.toLocaleString()}</span>. {t("This action can’t be undone.")}
                                    </Typography>
                                    <Box style={{marginTop:"20px",width:"90%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                        {/*@ts-ignore*/}
                                        <PublishButton variant="outlined" style={{marginRight:"10px"}} onClick={()=> this.setState({confirmPaymentModal:false})} >{t("Close")}</PublishButton>
                                        <CloseButton onClick={this.paymentRegistration}>{t("Confirm")}</CloseButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </Grid>
            </Box>
        </Box>
          <AlertError show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
          <AlertSuccess show={this.state.showSuccess} handleClose={()=> this.setState({showSuccess:false})} message={this.state.successMessage} />
      </>
      // Customizable Area End
    );
  }
}

export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(CharmainInvoices)));

// Customizable Area Start



  // Customizable Area End