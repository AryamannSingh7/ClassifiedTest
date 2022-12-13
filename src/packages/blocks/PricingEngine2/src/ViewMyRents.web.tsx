import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Menu,MenuItem,Modal,Backdrop,Fade,FormControl,Input,InputAdornment
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {shortIcon,filterIcon} from "../../BroadcastMessage/src/assets"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ViewMyInvoicesController, {
  Props
} from "./ViewMyRentsController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {exclamation,currency} from "./assets";

class ViewMyRents extends ViewMyInvoicesController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                             Building / Unit name
                          </p>
                      </Box>
                      <Box>
                        <IconButton style={{padding:"8px"}} onClick={this.handleClick}>
                            <img src={shortIcon} />
                        </IconButton>
                        <IconButton style={{padding:"8px"}} >
                            <img src={filterIcon} />
                        </IconButton>
                          <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={Boolean(this.state.anchorEl)}
                              onClose={this.handleClose}
                          >
                              <MenuItem onClick={this.handleClose} style={{padding:"0px",minHeight:"20px"}}>Paid</MenuItem>
                              <MenuItem onClick={this.handleClose}>Due</MenuItem>
                              <MenuItem onClick={this.handleClose}>OverDue</MenuItem>
                          </Menu>
                    </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:".5rem"}}>
                        {
                            this.state.invoiceListing?.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <Box
                                            display="flex"
                                            justifyContent='space-between'
                                            alignItems="center"
                                            borderRadius="15px"
                                            bgcolor="white"
                                            marginTop='.5rem'
                                            padding='1.5rem'
                                            style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}

                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Grid container spacing={1} onClick={()=>this.props.history.push(`/RentDetails/${item.id}`)}>
                                                    <Grid xs={12}>
                                                        <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                            <Typography variant={"subtitle2"}>
                                                                {item?.attributes?.month} {item?.attributes?.year}
                                                            </Typography>
                                                            <Typography variant="subtitle2" className="paymentStatusRed">
                                                                Due
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={6} style={{marginTop:"15px"}}>
                                                        <Typography variant={"subtitle2"} >
                                                            {t("Tenant")}
                                                        </Typography>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            {item.attributes.tenant_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} style={{marginTop:"15px"}}>
                                                        <Typography variant={"subtitle2"} >
                                                            {t("Building Name")}
                                                        </Typography>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            {item.attributes.building_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} style={{marginTop:"8px"}}>
                                                        <Typography variant={"subtitle2"} >
                                                            {t("Unit Number")}
                                                        </Typography>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            {item.attributes.unit_no}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} style={{marginTop:"8px"}}>
                                                        <Typography variant={"subtitle2"} >
                                                            {t("Amount")}
                                                        </Typography>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            SR{item.attributes.amount}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2} style={{marginTop:"10px"}}>
                                                    <Grid item xs={6} >
                                                        <PartialButton fullWidth onClick={() => this.handlePaymentClick(item,true)}>Partial Payment</PartialButton>
                                                    </Grid>
                                                    <Grid item xs={6} >
                                                        <FullButton fullWidth onClick={() => this.handlePaymentClick(item,false)}>Full Payment</FullButton>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.paymentConfirmModal}
                    onClose={()=> this.setState({paymentConfirmModal:false })}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.paymentConfirmModal}>
                        <Box style={{width:"80%",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                            <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"15px"}}>
                                <Box>
                                    <img src={exclamation} />
                                </Box>
                                <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center"}}>
                                    {
                                        this.state.isPartialPayment ?
                                            t("Partial Rent Payment Confirmation")
                                            :
                                            t("Full Rent Payment Confirmation")
                                    }
                                </Typography>
                                {
                                    this.state.isPartialPayment ?
                                        <Typography variant="body2" style={{textAlign:"center"}}>
                                            {this.state.tenantName} {t("is claiming to have paid")} SR {this.state.paymentAmount} {t("out of")} SR {this.state.paymentAmount} {t("rent towards")} {this.state.paymentMonth} {t("for Flat No.")} {this.state.unitName} of {this.state.buildingName}. {t("Please confirm by typing paid amount.")}
                                        </Typography>
                                            :
                                        <Typography variant="body2" style={{textAlign:"center"}}>
                                            {this.state.tenantName} {t("is claiming to have paid")} SR {this.state.paymentAmount} {t("rent towards")} {this.state.paymentMonth} {t("for Flat No.")} {this.state.unitName} of {this.state.buildingName}. {t("Please confirm")}
                                        </Typography>
                                }
                                {
                                    this.state.isPartialPayment &&
                                    <Box style={{marginTop:"15px",width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                        <FormControl style={{width:"100%",display:'flex',alignItems:"center"}}>
                                            <Input
                                                style={{backgroundColor:"#F9F9F9",height:"60px",width:"90%",display:'flex',alignItems:"center",borderRadius:"100px"}}
                                                id="paritalPaymentBox"
                                                type="number"
                                                value={this.state.partialPayment}
                                                onChange={(e:any)=> this.setState({partialPayment:e.target.value})}
                                                disableUnderline
                                                placeholder="Enter Partial paid amount"
                                                fullWidth
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                       <img src={currency} height="20px" width="20px" style={{marginLeft:"15px"}}/>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                }
                                <Box style={{marginTop:"15px",width:"90%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    {/*@ts-ignore*/}
                                    <CloseButton variant="outlined" fullWidth style={{marginRight:"10px",marginBottom:"15px"}} onClick={this.managePayment}  >{t("Yes")}, {t("Paid")}</CloseButton>
                                    {
                                        !this.state.isPartialPayment &&
                                        <Button fullWidth onClick={this.handleCloseDeleteModal}>{t("No, Not Paid")}</Button>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(ViewMyRents))

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);


const PartialButton = withStyles((theme) => ({
    root: {
        color: "#2B6FED",
        backgroundColor: "white",
        fontWeight:"bold",
        border:"#2B6FED 1px solid",
        fontSize:"12px",
        borderRadius:"100px",
        height:"35px",
    },
}))(Button);


const FullButton = withStyles((theme) => ({ 
    root: {
        color: "white",
        backgroundColor: "#2B6FED",
        fontWeight:"bold",
        borderRadius:"100px",
        fontSize:"12px",
        height:"35px",
    },
}))(Button);


// Customizable Area End
