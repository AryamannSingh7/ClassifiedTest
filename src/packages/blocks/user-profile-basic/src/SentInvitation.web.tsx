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
  withStyles
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
//@ts-ignore
import Pagination from '@material-ui/lab/Pagination';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';

import SentInvitationController, { Props } from "./SentInvitationController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

//resorces
// import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
// import './style.css'

function createData( no:any, name:any, unit:any, invitation:any, phone:any, email:any, more:any) {
    return { no, name, unit, invitation, phone, email, more };
  }
  
  const rows = [
    createData(1, 'Ainara Vergara', "A-159", '25/06/2022', '+1 9874563210', 'Ainaraergara@gmail.com', <MoreVertIcon color='disabled' />),
    createData(2, 'Beth Murphy', "A-237", '25/06/2022', '+1 9874563210', 'Bethurphy@gmail.com', <MoreVertIcon color='disabled' />),
    createData(3, 'Farrokh Rastegar', "A-262",'25/06/2022', '+1 9874563210', 'Farrokhrastegar@gmail.com', <MoreVertIcon color='disabled' />),
    createData(4, 'Marti Valencia', "A-305",'25/06/2022', '+1 9874563210', 'Martialencia@gmail.com',  <MoreVertIcon color='disabled' />),
    createData(5, 'Mgbankwo Orjee', "A-356",'25/06/2022', '+1 9874563210', 'Mgbankworjee@gmail.com', <MoreVertIcon color='disabled' />),
    createData(6, 'Tamas Bunce', "A-159", '25/06/2022', '+1 9874563210', 'Tamasbunce@gmail.com', <MoreVertIcon color='disabled' />),
    createData(7, 'Alex Walker', "A-237", '25/06/2022', '+1 9874563210', 'Alexwalker@gmail.com', <MoreVertIcon color='disabled' />),
    createData(8, 'Cammy Hedling', "A-262",'25/06/2022', '+1 9874563210', 'Cammyhedling@gmail.com',<MoreVertIcon color='disabled' />),
    createData(9, 'Gauthier Drewitt', "A-305",'25/06/2022', '+1 9874563210', 'Gauthierdrewitt@gmail.com', <MoreVertIcon color='disabled' />),
    createData(10, 'Merrile Burgett', "A-356",'25/06/2022', '+1 9874563210', 'Merrileburgett@gmail.com', <MoreVertIcon color='disabled' />),
  ];

class SentInvitation extends SentInvitationController {
constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}

async componentDidMount() {
    this.getInvitation()
    
  }

render() {
    const {t}: any = this.props
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
                                {t("Community Management")} / {t("Request Management")} / <Box component="span" style={{color: "blue"}}>{t("Total Sent Invitations")}</Box>
                                </Typography>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>{t("Total Sent Invitations")}</Typography>
                            </Box>
                        </Box>

                        <Box style={{marginTop: 25,marginBottom:50, background:"#fff", borderRadius:10}}>
                            <Box style={dashBoardActions.TableHeader}>
                                <Typography variant="h5" style={dashBoardActions.subHeading}>{t("Invitations")}</Typography>
                                {/* <SearchOutlinedIcon/> */}
                                <TextField
                                    // className={classes.margin}
                                    id="input-with-icon-textfield"
                                    placeholder="Search"
                                    onChange={(e) => this.setState({dataSearch: e.target.value},()=>this.getInvitation())}
                                    // onChange={(e) => this.handleSearchChange()}
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
                                            <TableCell style={{color:"grey"}} align="left">{t("Name")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Unit Number")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Invitation sent on")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Phone Number")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left">{t("Email Address")}</TableCell>
                                            <TableCell style={{color:"grey"}} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.allInvitation.map((row:any,i:any) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">{i+1}</TableCell>
                                                <TableCell align="left">{row?.attributes?.full_name}</TableCell>
                                                <TableCell align="left">{row?.attributes?.apartment_management?.apartment_name}</TableCell>
                                                <TableCell align="left">{row?.attributes?.created_at}</TableCell>
                                                <TableCell align="left">{row?.attributes?.phone_number}</TableCell>
                                                <TableCell align="left">{row?.attributes?.email_address}</TableCell>
                                                <TableCell align="left" onClick={(e: any) => this.handleClick(e)}>{row.more}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box style={dashBoardActions.TableHeader}>
                                <Typography  style={dashBoardActions.subHeading}>{t("Showing")} {this.state.allInvitation.length>10 ? '10' : this.state.allInvitation.length} {t("of")} {this.state.allInvitation.length} {t("results")}</Typography>
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
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("View")}</MenuItem>
                            <hr style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("Download")}</MenuItem>
                            <hr style={{margin:"0px"}}/>
                            <MenuItem onClick={this.handleClose} style={{margin:"7px", cursor:'pointer'}}>{t("Share")}</MenuItem>
                        </Menu>                           
                    </Container>
                </Grid>
            </Box>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(dashBoardActions)(withRouter(SentInvitation)));

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
};
  // Customizable Area End