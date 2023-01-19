import * as React from "react";
// custom components
import {
    Grid,
    Box,
    Divider,
    AppBar,
    Tabs,
    Tab,
    Link,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    Select,
    InputAdornment,
    Input
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {shortIcon,filterIcon} from "../../BroadcastMessage/src/assets"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import RegisterRentPaymentController, {
  Props
} from "./RegisterRentPaymentController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Building, Unit} from "../../CollectTransactionFees/src/assets";
import {calendar, currency} from "./assets"
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import AlertErrorWeb from "../../../components/src/AlertError.web";

class RegisterRentPayment extends RegisterRentPaymentController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem',  width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon className="backButtonRegisterRent" onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Register Rent Payments")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:".5rem"}}>
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                disableUnderline
                                className="selectBuildingBoxRent rentMonthDropdown"
                                native
                                style={{backgroundColor:"#F9F9F9",borderRadius:"100px",height:"60px",border:"1px solid #f0f0f0"}}
                                value={this.state.selectedMonth}
                                onChange={(e:any)=> this.setState({selectedMonth:e.target.value},this.getAmountDue)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img src={calendar} style={{marginLeft:"25px"}} />
                                    </InputAdornment>
                                }
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="" disabled>Month</option>
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                disableUnderline
                                className="selectBuildingBoxRent rentBuildingDropdown"
                                native
                                style={{backgroundColor:"#F9F9F9",borderRadius:"100px",height:"60px",border:"1px solid #f0f0f0"}}
                                value={this.state.selectedBuilding}
                                onChange={this.manageSelectBuilding}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img src={Building} style={{marginLeft:"25px"}} />
                                    </InputAdornment>
                                }
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="" disabled>Building Name</option>
                                {
                                    this.state.BuildingListing?.map((item:any,key:any)=> {
                                        return(
                                            <option key={key} value={item.id}>{item.attributes.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                disableUnderline
                                className="selectBuildingBoxRent"
                                native
                                style={{backgroundColor:"#F9F9F9",borderRadius:"100px",height:"50px",border:"1px solid #f0f0f0"}}
                                value={this.state.selectedUnit}
                                onChange={(e:any)=> this.setState({selectedUnit:e.target.value},this.getAmountDue)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <img src={Unit} style={{marginLeft:"25px"}} />
                                    </InputAdornment>
                                }
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="" disabled>Unit Number</option>
                                {
                                    this.state.UnitListing?.map((item:any,key:any)=> {
                                        return(
                                            <option key={key} value={item.attributes?.unit_number?.id}> {item.attributes?.unit_number?.apartment_name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {t("Tenant Name")}:
                            </Typography>
                            <Typography variant="subtitle2" color="textPrimary" style={{fontWeight:"bold",marginLeft:"5px"}}>
                                {this.state.tenantName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <FormControl component="fieldset" style={{marginLeft:"10px",marginTop:"5px"}}>
                                    <RadioGroup style={{display:"flex",flexDirection:"row"}} aria-label="quiz" name="quiz" value={this.state.paymentType} onChange={(e)=> this.setState({paymentType:e.target.value})}>
                                        <FormControlLabel value="full" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#CCCCCC",fontSize:"22px"}}/>} checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434",fontSize:"22px"}}/>} />} label={<Typography variant="subtitle2" style={this.state.paymentType === "full" ? {fontWeight:"bold",color:"#FC8434"} : {fontWeight:"bold",color:"#939292"} }>Full payment</Typography>} />
                                        <FormControlLabel value="partial" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#CCCCCC",fontSize:"22px"}}/>} checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434",fontSize:"22px"}}/>} />} label={<Typography variant="subtitle2" style={this.state.paymentType === "partial" ? {fontWeight:"bold",color:"#FC8434"} : {fontWeight:"bold",color:"#939292"} }>Partial payment</Typography>} />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                        {
                            this.state.paymentType === "partial" &&
                            <Grid item xs={12}>
                                <FormControl style={{width:"100%",display:'flex',alignItems:"center"}}>
                                    <Input
                                        style={{backgroundColor:"#F9F9F9",height:"60px",width:"100%",display:'flex',alignItems:"center",borderRadius:"100px",border:"1px solid #f0f0f0"}}
                                        id="paritalPaymentBox"
                                        type="number"
                                        disableUnderline
                                        placeholder="Enter Partial paid amount"
                                        fullWidth
                                        value={this.state.partialPaymentAmount}
                                        onChange={(e:any)=> this.setState({partialPaymentAmount:e.target.value,amountError:""})}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={currency} height="20px" width="20px" style={{marginLeft:"15px"}}/>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Typography variant="subtitle2" color="error">{this.state.amountError}</Typography>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Typography style={{color:"#2B6FED",fontWeight:"bold"}}>
                                {t("Rent Amount")} : {this.state.currency}{this.amountFormatConvert(this.state.rentAmount)}
                            </Typography>
                        </Grid>
                        {
                            this.state.paymentType === "partial" &&
                            <Grid item xs={12}>
                                <Typography style={{color:"#F93E3E",fontWeight:"bold"}}>
                                    {t("Payment Due Amount")} : {this.state.currency}{this.state.rentAmount - this.state.partialPaymentAmount}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"30px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large" onClick={this.createPayment}>
                            {t("Register Rent Payment")}
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
            <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        </>
    );
  }
}
export default withTranslation()(withRouter(RegisterRentPayment))

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

// Customizable Area End
