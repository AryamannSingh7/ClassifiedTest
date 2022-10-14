import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography, Button, FormControl, Select, MenuItem, Input,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {editPencil, list} from "./assets";
import { Building1, company_logo, email, password, user } from "../../email-account-registration/src/assets";
import VisitorAddController, {
  Props
} from "./VisitorAddController";
import './style.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { dailCode } from '../../email-account-registration/src/code'
import moment from "moment";
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
class Visitors extends VisitorAddController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
      // @ts-ignore
      return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem",marginBottom:"05px"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {this.state.visitorId ? "Edit Visitor Request":"Add Visitor Request"}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Divider/>
                <Box style={{minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Formik initialValues={{
                            visitorName:this.state?.visitorDetails?.name,
                            phone: this.state?.visitorDetails?.mobile_number?.mobile_number,
                            photo:"",
                            date:this.state?.visitorDetails?.schedule_date,
                            time:this.state?.visitorDetails?.schedule_time ? moment(this.state?.visitorDetails?.schedule_time).format("hh:mm") : "",
                            withCar:this.state?.visitorDetails?.comming_with_vehicle ? "true" : "false",
                            carPlateNo: this.state?.visitorDetails?.vehicle_detail?.car_number || "",
                        }}
                                validationSchema={this.visitorAddSchema()}
                                validateOnMount={true}
                                enableReinitialize
                                onSubmit={(values) => { this.createVisitorRequest(values) }}
                        >
                        {({   values,
                              errors,
                              touched,
                              handleBlur,
                              isValid, handleChange,
                              setFieldValue }) => (
                                <Form className="commonForm" translate="yes" style={{width:"100%",marginTop:"25px"}} >
                                    <Grid container spacing={1}>
                                        <Grid className='formGroup' item xs={12}>
                                            <Box className="formInputGrp">
                                                <Field
                                                    className="formInput"
                                                    name="visitorName"
                                                    placeholder={"Visitor Name"}
                                                />
                                                <span className="frmLeftIcons">
                                                    <img src={user} />
                                                </span>
                                            </Box>
                                            {errors.visitorName && touched.visitorName && <small className="error">{errors.visitorName}</small>}
                                        </Grid>
                                        <Grid className='formGroup' item xs={12} style={{marginTop:"-10px"}}>
                                            <Box
                                                marginTop='.5rem'
                                                className='formInputGrp'
                                                display="flex"
                                                overflow="hidden"
                                                alignItems="center"
                                                height="56px"
                                                border="0.1px solid rgb(209 209 209 / 44%)"
                                                borderRadius="25px"
                                                bgcolor="#f9f9f9"
                                            >
                                                <Box>
                                                    <FormControl variant="outlined" >
                                                        <Select
                                                            name='selectCode'
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            onChange={this.handleChange}
                                                            label="Unit"
                                                            value={this.state.selectCode}
                                                            style={{color:'gray'}}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {dailCode.map((item) =>
                                                                <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' style={{marginRight:'5px'}}   />
                                                                    {item.dial_code}</MenuItem>

                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                <Field
                                                    name="phone"
                                                    placeholder={"Visitor Phone"}
                                                    id="mobile"
                                                    style={{
                                                        border: "none",
                                                        height: "42%",
                                                        width: "80%",
                                                        color: "rgba(0, 0, 0, 0.6)",
                                                        fontWeight: 400,
                                                        fontSize: 16,
                                                        marginRight: 10,
                                                        backgroundColor:'#f9f9f9',
                                                        marginLeft: 21,
                                                        outline: "none"
                                                    }}
                                                />
                                            </Box>
                                            {errors.phone && touched.phone && <small className="error">{errors.phone}</small>}
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop:"-10px"}}>
                                            <FormControl fullWidth>
                                                {
                                                    this.state.visitorDetails?.image?.url ?
                                                        <Box style={{height:"170px",backgroundImage:`url(${this.state.visitorDetails?.image?.url})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",display:'flex',justifyContent:'flex-end'}}>
                                                            <IconButton onClick={() => this.upload.click()} style={{backgroundColor:"#2B6FED",height:"50px",width:"50px"}}><img src={editPencil}/></IconButton>
                                                        </Box> :
                                                        <div
                                                            className="image-box"
                                                            onClick={() => {
                                                                this.upload.click();
                                                            }}
                                                        >
                                                            <AddIcon style={{fontSize:"45px",color:"#9c9c9c"}}/>
                                                            <Typography variant="body1" color="textSecondary">Add Visitor ID copy</Typography>
                                                            <Typography variant="body1">(optional)</Typography>
                                                        </div>
                                                }
                                                <input
                                                    id="myInput"
                                                    type="file"
                                                    ref={(ref: any) => (this.upload = ref)}
                                                    style={{ display: "none" }}
                                                    accept="image/png, image/gif, image/jpeg"
                                                    onChange={(e: any) => {
                                                        setFieldValue("photo", e.currentTarget.files[0]);
                                                    }}
                                                    onBlur={handleBlur}
                                                    name="photo"
                                                />
                                                {/*@ts-ignore*/}
                                                {values.photo && <span className="file-name">{values.photo.name}</span>}
                                                {errors.photo && touched.photo && <small className="error">{errors.photo}</small>}
                                                <span />
                                            </FormControl>
                                        </Grid>
                                        <Grid className="add-visitor" item xs={6}>
                                            <FormControl fullWidth>
                                                <div className="date-time">
                                                    <Input
                                                        value={values.date}
                                                        style={{color:"gray"}}
                                                        onChange={(e: any) => {
                                                            setFieldValue("date", e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        name="date"
                                                        placeholder="Select Date"
                                                        className="date"
                                                        // @ts-ignore
                                                        inputProps={{
                                                            min:moment().format("YYYY-MM-DD")
                                                        }}
                                                        type={this.state.inputType1}
                                                        onFocus={()=> this.setState({inputType1:"date"})}
                                                    />
                                                </div>
                                                {errors.date && touched.date && <small className="error">{errors.date}</small>}
                                            </FormControl>
                                        </Grid>
                                        <Grid className="add-visitor" item xs={6}>
                                            <FormControl fullWidth>
                                                <div className="date-time">
                                                    <Input
                                                        value={values.time}
                                                        style={{color:"gray"}}
                                                        onChange={(e: any) => {
                                                            setFieldValue("time", e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        placeholder="Select Time"
                                                        name="time"
                                                        fullWidth
                                                        type={this.state.inputType2}
                                                        onFocus={()=> this.setState({inputType2:"time"})}

                                                    />
                                                </div>
                                                {errors.time && touched.time && <small className="error">{errors.time}</small>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop:"10px"}}>
                                            <Typography>
                                                Is visitor coming with car?
                                            </Typography>
                                            <FormControl component="fieldset" >
                                                <RadioGroup aria-label="gender" style={{flexDirection:"row"}} name="gender1" value={values.withCar} onChange={(e)=> setFieldValue("withCar", e.target.value)}>
                                                    <FormControlLabel value="true" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                                                                                   checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="Yes" />
                                                    <FormControlLabel value="false" control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                                                                                    checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid className='formGroup' item xs={12} style={{marginTop:"-10px"}}>
                                            <Box className="formInputGrp">
                                                <Field
                                                    className="formInput"
                                                    name="carPlateNo"
                                                    placeholder={"Car Plate Number"}
                                                />
                                                <span className="frmLeftIcons">
                                                    <img src={list} />
                                                </span>
                                            </Box>
                                            {errors.carPlateNo && touched.carPlateNo && <small className="error">{errors.carPlateNo}</small>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CloseButton type="submit" variant="contained" fullWidth size="large">
                                                Submit
                                            </CloseButton>
                                        </Grid>
                                </Grid>
                            </Form>
                        )}
                        </Formik>
                    </Grid>

                </Box>
            </Grid>
        </>
    );
  }
}
export default withRouter(Visitors)

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
