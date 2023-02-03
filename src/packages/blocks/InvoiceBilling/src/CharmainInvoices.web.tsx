//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
    Box,
    TextField,
    InputAdornment,
    Typography,
    Grid,
    Container,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
    Fade,
    Backdrop,
    Modal,
    Paper,
    Button,
    withStyles, InputBase, Divider, IconButton
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Pagination from '@material-ui/lab/Pagination';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';

import CharmainInvoicesController, { Props } from "./CharmainInvoicesController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import {SearchIconImage} from "../../user-profile-basic/src/assets"
import { SuggestionStyleWeb } from "../../user-profile-basic/src/SuggestionStyle.web";
import {DownloadIcon,confirmIcon} from "./assets"
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import 'web/src/i18n.js';

//resorces
// import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import '../../dashboard/src/style.css'

import moment from "moment";

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
                                <Select displayEmpty  value={""} className="select-input">
                                    <MenuItem value="">
                                        {t("Select Building")}
                                    </MenuItem>
                                </Select>
                                <Select displayEmpty  value={""} className="select-input">
                                    <MenuItem value="">
                                        {t("Select Floor")}
                                    </MenuItem>
                                </Select>
                                <Select displayEmpty value={""} className="select-input">
                                    <MenuItem value="">
                                        {t("Select Unit")}
                                    </MenuItem>
                                </Select>
                                <Select displayEmpty value={""} className="select-input">
                                    <MenuItem value="">{t("Select Type")}</MenuItem>
                                    <MenuItem value="">{t("Management Fee")}</MenuItem>
                                    <MenuItem value="">{t("Rent Payments")}</MenuItem>
                                </Select>
                                <Select displayEmpty value={""} className="select-input">
                                    <MenuItem value="">
                                        {t("Select Status")}
                                    </MenuItem>
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
                                        <Pagination count={this.state.pagination?.total_count} variant="outlined" shape="rounded" />
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
                                    {
                                            this.state.generateReceipt ?
                                            <Box>
                                                <Box style={{marginTop:"15px",display:'flex',alignItems:"center"}}>
                                                    <IconButton onClick={()=> this.setState({generateReceipt:false})}>
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
                                                        ABCDE1234Q
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex"}}>
                                                    <Typography color="textSecondary">
                                                        Resident Name:
                                                    </Typography>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold"}}>
                                                        Jenil Patel
                                                    </Typography>
                                                </Box>
                                                <Box style={{display:"flex",marginTop:"20px"}}>
                                                    <Typography>
                                                        Total amount to be paid:
                                                    </Typography>
                                                    <Typography style={{marginLeft:"5px",fontWeight:"bold",color:"#FC8434"}}>
                                                        SR 1,303
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
                                                        <TextField placeholder="Enter partial paid amount" id="reminAmountFiled"  variant="outlined" />
                                                        <Typography style={{marginLeft:"30px"}}>
                                                            Remaining Amount : SR 0
                                                        </Typography>
                                                    </Box>
                                                }
                                                <Box style={{marginTop:"50px",width:"100%",display:"flex",justifyContent:"flex-end"}}>
                                                    <Button variant="contained" style={dashBoardActions.receiptCancel} color="primary" onClick={()=> this.setState({generateReceipt:false})}>{t("Close")}</Button>
                                                    <Button variant="contained" style={dashBoardActions.paymentbtn} color="primary" onClick={()=> this.setState({confirmPaymentModal:true})}>{t("Register Payment")}</Button>
                                                </Box>
                                            </Box>
                                            :
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
const dashBoardActions = {
    navigation:{
        display: "flex",
        justifyContent: "space-between",
    },
    subHeading: {
        fontWeight:600,
        marginTop:15,
        marginBottom: 20,
        marginLeft:10
    },
    YearMain:{
        background: "#fff",
        border: "1px solid #dfd4d4",
        borderRadius: 5,
        paddingLeft:15,
        paddingRight: 15,
    },
    Cards: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingBottom: 25,
        background: "#fff",
        borderRadius: 10,
    },
    CardsIcons:{
        border: "1px solid #d9d4d3",
        borderRadius: "50%",
        width: 25,
        height: 25,
        padding: 15,
        color:"#054c94",
    },
    bottomColor:{
        color: "red"
    },
    bottomTwoSpan:{
        display: "flex", 
        gap: 5, 
        marginTop: 10
    },
    TableHeader:{
        display: "flex",
        borderBottom: "1px solid grey",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 55,
    },
    modal: {
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
        overflow:"hidden",
        minHeight:"500px"
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:"10px 0px 20px 0px"
    },
    subHeadingFont:{
        fontWeight:600
    },
    genrateReceipt:{
        display: "flex",
        alignItems:'center'
    },
    commonColor:{
        color:"#181d257a"
    },
    residetails:{
        marginTop:15
    },
    summary:{
        backgroundColor:"#F9F9F9",
        padding:"10px 20px 20px",
        marginTop:15,
        boxShadow:"0px"
    },
    receiptbtn:{
        borderRadius:8,
        width:"100%",
        backgroundColor:"#2b6fed",
        height:45,
        fontWeight:600,
        color:"#fff"
    },
    paymentbtn:{
        borderRadius:8,
        width:"170px",
        backgroundColor:"#2b6fed",
        height:45,
        fontWeight:600,
        color:"#fff"
    },
    receiptCancel:{
        borderRadius:8,
        width:"170px",
        backgroundColor:"white",
        height:45,
        fontWeight:600,
        color:"#2b6fed",
        marginRight:"15px",
        border:"1px solid #2b6fed"
    }
};

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        width:"175px",
        fontWeight:"bold",
        borderRadius:"8px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        width:"175px",
        fontWeight:"bold",
        borderRadius:"8px",
        border:"1px solid #2b6fed",
        height:"55px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);

  // Customizable Area End