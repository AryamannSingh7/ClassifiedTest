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
  Button
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

import CharmainInvoicesController, { Props } from "../../../blocks/dashboard/src/CharmainInvoicesController";
import DashboardHeader from "./DashboardHeader.web";
import ChairmanSidebar from "./ChairmanSidebar.web";

//resorces
// import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import './style.css'

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
        <Box style={{background: "#E5ECFF"}}>
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
                                Invoices & Receipts / <Box component="span" style={{color: "blue"}}>Invoices</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>Invoices</Typography>
                            </Box>
                        </Box>

                        <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                            <Box style={dashBoardActions.TableHeader}>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>Invoice</Typography>
                                {/* <SearchOutlinedIcon/> */}
                                <TextField
                                    // className={classes.margin}
                                    id="input-with-icon-textfield"
                                    placeholder="Search by Name"
                                    onChange={(e) => this.setState({dataSearch: e.target.value})}
                                    // label="TextField"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                            </Box>
                            <TableContainer >
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{color:"grey"}}>#</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Name</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Unit No.</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Title</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Amount</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Type</TableCell>
                                            <TableCell style={{color:"grey"}} align="center">Status</TableCell>
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
                            </TableContainer>
                            <Box style={dashBoardActions.TableHeader}>
                                <Typography  style={dashBoardActions.subHeading}>Showing 5 of {rows.length} results</Typography>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                            </Box>
                        </Box> 
                         <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                            style={{padding:"0px", cursor:'pointer'}}
                            >
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}} onClick={this.handleModalOpen}>View</MenuItem>
                            <hr style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>Download</MenuItem>
                            <hr style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>Share</MenuItem>
                            </Menu>

                            <Modal
                                style={dashBoardActions.modal}
                                open={Boolean(this.state.openModal)}
                                onClose={Boolean(this.state.openModal)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                <div style={dashBoardActions.paper}>
                                    <div style={dashBoardActions.modalHeader}>
                                    <Typography variant="h5" style={dashBoardActions.subHeadingFont}>Management Fee Invoice - May 2022</Typography>
                                    <span onClick={this.handleModalClose}>X</span>
                                    </div>
                                    <hr />
                                    <Grid container spacing={2} style={dashBoardActions.residetails}>
                                        <Grid item xs={3}>
                                            <Typography style={dashBoardActions.commonColor} component="h5">Owner Name:</Typography>
                                            <b>John Doe</b>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={dashBoardActions.commonColor} component="h5">Resident Name:</Typography>
                                            <b>Jenil Patel</b>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={dashBoardActions.commonColor} component="h5">Building Name:</Typography>
                                            <b>Building</b>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={dashBoardActions.commonColor} component="h5">Unit Number:</Typography>
                                            <b>1406</b>
                                        </Grid>
                                        </Grid>
                                    <Grid container spacing={2} xs={12} style={dashBoardActions.residetails}>
                                            <Grid item xs={3}>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Resident ID:</Typography>
                                                <b>ABCDE1254Q</b>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Generated on:</Typography>
                                                <b>15-05-2022</b>
                                            </Grid>
                                    </Grid>
                                    <div style={dashBoardActions.residetails}>
                                    <b style={{color:"#2b6fed"}}>Summary</b>
                                    </div>
                                    <Paper style={dashBoardActions.summary}>
                                        <div>
                                            <div className='resident-data'>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Management Fee Amount:</Typography>
                                                <b>SR 1,250</b>
                                            </div>
                                            <div className='resident-data'>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Late Charges:</Typography>
                                                <b>SR 29</b>
                                            </div>
                                            <div className='resident-data'>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Tax:</Typography>
                                                <b>SR 24</b>
                                            </div>
                                            <div className='resident-data'>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Others:</Typography>
                                                <b>SR 00</b>
                                            </div>
                                            <hr />
                                            <div className='resident-data'>
                                                <Typography style={dashBoardActions.commonColor} component="h5">Total Amount:</Typography>
                                                <b style={{color:"#FC8434"}}>SR 1303</b>
                                            </div>
                                        </div>
                                     </Paper>
                                     <Grid container spacing={2} xs={12} style={dashBoardActions.residetails}>
                                        <Grid item xs={8} style={{display:"flex", marginTop:"10px"}}>
                                            <GetAppOutlinedIcon />
                                            <Typography style={dashBoardActions.commonColor} component="h5">Download Invoice</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Button variant="contained" style={dashBoardActions.receiptbtn} color="primary">GENARATE RECEIPT</Button>
                                        </Grid>
                                    </Grid>

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
                </Grid>
            </Box>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

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
        width:"700px"
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginTop:15
    },
    receiptbtn:{
        borderRadius:8,
        width:"100%",
        backgroundColor:"#2b6fed",
        height:45,
        fontWeight:600,
        color:"#fff"
    }
};
  // Customizable Area End
  
  export default withRouter(CharmainInvoices);