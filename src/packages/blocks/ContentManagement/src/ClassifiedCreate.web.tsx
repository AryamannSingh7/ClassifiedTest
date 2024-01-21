import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  TextareaAutosize,
  InputAdornment,
  TextField
} from "@material-ui/core";
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
// import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import TitleIcon from '@material-ui/icons/Title';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BackupIcon from '@material-ui/icons/Backup';

//Customizable Area End

//resorces
import {
  Upload_Icon,
  Building1,
  Checkmark_Icon,
  Error_Icon,
  EmailIcon,
  DescIcon,
  CurrencyIcon,
  PayDetailIcon,
  TimeIcon,
} from "../src/assets";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { dailCode } from "../../email-account-registration/src/code";

class ClassifiedCreate extends ClassifiedController{
    constructor(props: Props){
        super(props);
    }

    componentDidMount(): any {
        this.getCurrencyList();
        //@ts-ignore
        const id = this.props?.history?.location?.state?.id;
        console.log("this.props?.history?.location?.id;==============>", this.props?.history?.location)
        if (id)
          this.getClassifiedDetailsById(id)
      }

    render(){
    const { navigation } = this.props;
    //@ts-ignore
    const checkEditmode = this.props?.history?.location?.state?.id;
    const classifiedUserType = localStorage.getItem("classifiedUserType")
    const classified_type = this.state?.getClassifiedDetails?.attributes?.classified_type;
    console.log("classifiedUserType==============>", classifiedUserType)
    const id = this.state?.getClassifiedDetails?.id;
    const attributes = this.state?.getClassifiedDetails?.attributes;
    if (!checkEditmode && !classifiedUserType) {
      //@ts-ignore
       this.props.history.replace("/ClassifiedListing");
    }

    return(
        <>
            <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    {classifiedUserType === "buyer" ? <h4>Buyers Request </h4>
                      : classifiedUserType === "seller" ? <h4>Sellers Request</h4>
                        : classifiedUserType === "generic" ? <h4>Generic Request</h4>
                          : <h4>Edit Classified</h4>
                    }
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Formik
                    initialValues={{
                      phone: attributes?.phone_number.phone_number || "",
                      selectCode: attributes?.phone_number?.country_code === "+"? "":attributes?.phone_number?.country_code|| '+966',
                      email: attributes?.email || "",
                      classifiedTitle: attributes?.title || "",
                      description: attributes?.description || "",
                      media: attributes?.attachments || [],
                      price: attributes?.price || "",
                      currency: attributes?.currency?.id || ' ',
                      startDate: moment(attributes?.duration_from,'DD-MM-YYYY' ).format('YYYY-MM-DD') || "",
                      endDate: moment(attributes?.duration_to,'DD-MM-YYYY' ).format('YYYY-MM-DD') || "",
                      priceFrom: attributes?.price_from || "",
                      priceTo: attributes?.price_to || "",
                      timeFrom: attributes?.time_from || "",
                      timeTo: attributes?.time_to || "",
                      paymentDetail: attributes?.payment_detail || "",
                      id: id || "",
                    }}
                    enableReinitialize
                    validationSchema={classifiedUserType === "generic" || classified_type ==="generic"  ? this.createClassifiedSchemaGerenic() : classifiedUserType === "buyer" || classified_type ==="buyer"? this.createClassifiedSchemaBuy() : this.createClassifiedSchemaSell()}
                    validateOnMount={true}
                    onSubmit={(values) => {
                      !this.state?.sizeError && !this.state?.notImageOrVideoError ?
                        ( //@ts-ignore
                          classifiedUserType ?
                            this.onSubmit(values)
                            : this.updateClassified(values)
                        )
                        :
                        null
                    }
                    }
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm CreateClassifiedFrm">
                        <Box style={{marginBottom:"1rem"}}>
                        <Box
                          marginTop='1rem'
                          marginBottom='0rem'
                          className='formInputGrp'
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(0 0 0 / 61%)"
                          borderRadius="15px"
                          bgcolor="#f9f9f9"
                        >
                          {/* <Box>
                            <FormControl variant="outlined" >
                              
                              <Select
                                name='selectCode'
                                labelId="demo-simple-select-outlined-label"

                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                value={values.selectCode}
                              >
                                <MenuItem  disabled value="">
                                  <em>None</em>
                                </MenuItem>
                                {dailCode.map((item) =>
                                  <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' style={{ marginRight: '5px' }} />
                                    {item.dial_code}</MenuItem>
                                )
                                }
                              </Select>
                            </FormControl>
                          </Box> */}
                          <span className="frmLeftIcons" style={{marginLeft:"15px"}}>
                                    <PhoneIcon fontSize="medium"/>
                          </span>
                          <Field
                            name="phone"
                            // type="number"
                            // id="mobile"
                            placeholder="Mobile Number"
                            style={{
                              border: "none",
                              height: "42%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.9)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 10,
                              outline: "none",
                              backgroundColor: '#f9f9f9'
                            }}
                          />
                          
                        </Box>
                        <ErrorMessage className="text-error" component="Typography" name="phone" />
                        </Box>
                        <Box marginBottom="1rem" >
                            <Box className="formGroup" marginTop='1rem'
                          marginBottom='0rem'
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(0 0 0 / 61%)"
                          borderRadius="15px"
                          bgcolor="#f9f9f9">
                                <Field name="email" type="text" placeholder="Email" className="formInput" />
                                <span className="frmLeftIcons">
                                    <MailOutlineIcon fontSize="medium"/>
                                </span>
                            </Box>
                            <ErrorMessage className="text-error" component="Typography" name="email" />
                        </Box>
                        <Box marginBottom="1rem">
                            <Box className="formGroup" style={{marginBottom:"0px"}}
                          marginTop='1rem'
                          marginBottom='0rem'
                          display="flex"
                          overflow="hidden"
                          alignItems="center"
                          height="56px"
                          border="0.1px solid rgb(0 0 0 / 61%)"
                          borderRadius="15px"
                          bgcolor="#f9f9f9" >
                                <Field name="classifiedTitle" type="text" placeholder="Title" className="formInput" />
                                <span className="frmLeftIcons">
                                    <TitleIcon fontSize="medium"/>
                                  </span>
                            </Box>
                            <ErrorMessage className="text-error" component="Typography" name="classifiedTitle" />
                        </Box>
                        <Box marginBottom="1rem">
                            <Box className="formGroup" style={{marginBottom:"0px"}}
                            marginTop='1rem'
                            marginBottom='0rem'
                            display="flex"
                            overflow="hidden"
                            alignItems="center"
                            height="56px"
                            border="0.1px solid rgb(0 0 0 / 61%)"
                            borderRadius="15px"
                            bgcolor="#f9f9f9">
                                <Field name="description" type="text" placeholder="Description" className="formInput" />
                                <span className="frmLeftIcons">
                                    <DescriptionIcon fontSize="medium"/>
                                </span>
                            </Box>
                            <ErrorMessage className="text-error" component="Typography" name="description" />
                        </Box>
                        {/* <Box className="formGroup">
                          <Field name="description" type="text" placeholder="Add description" className="formInput" />
                        </Box> */}

                        {/* ADD THIS CLASSES ONLY WHEN YOU WANT SMALL FILE-UPLOAD OPTION 
                        "fileuploadBlock ,buyersFileupload"*/}
                        {classifiedUserType !== "generic" && classified_type !== "generic" ?
                          <Box>
                            <Box className="formGroup customFileupload">
                              <Button
                                variant="contained"
                                component="label"
                              >

                                   <div className="imgLayer">
                                   <img src={values?.media[0]?.url} className="bg-img" alt="" />
                                 </div>

                                <div className="uploadLayer">
                                  <div className="content-text">
                                    <BackupIcon fontSize="large"/>
                                    Upload Any Photos
                                  </div>
                                </div>
                                <input
                                  name='media'
                                  type="file"
                                  hidden
                                  accept="image/jpg ,image/jpeg,image/gif,image/png"
                                  onChange={(e: any) =>
                                    this.handleSelectMedia(
                                      e,
                                      values.media,
                                      setFieldValue,
                                      setFieldError
                                    )
                                  }
                                />
                              </Button>
                              {this.state?.upload ?
                                <>
                                  <Box className="result-disp-row">
                                    <img src={Checkmark_Icon.default} className="successful-icon" alt="card-img" />
                                    <span className="text-success">
                                      uploaded successfully
                                    </span>
                                  </Box>
                                </>
                                : this.state.notImageOrVideoError ?
                                  <Box className="result-disp-row">
                                    <img src={Error_Icon.default} className="error-icon" alt="card-img" />
                                    <span className="text-error">
                                      Only image are supported.
                                    </span>
                                  </Box>
                                  :
                                  this.state.sizeError ?
                                    <Box className="result-disp-row">
                                      <img src={Error_Icon.default} className="error-icon" alt="card-img" />
                                      <span className="text-error">
                                        size is less than 10 mb.
                                      </span>
                                    </Box>
                                    : null
                              }
                              {/* <ErrorMessage className="text-error" component="Typography" name="media" /> */}
                            </Box>
                            {/* <Box className="imgLayer">
                             <img src={Landing_Banner.default} className="buyerphoto" alt="Building1" />
                             <img src={CloseIcon} className="close_icon" alt="Building1" />
                           </Box>
                           <Box className="imgLayer">
                             <img src={Landing_Banner.default} className="buyerphoto" alt="Building1" />
                             <img src={CloseIcon} className="close_icon" alt="Building1" />
                           </Box>
                           <Box className="imgLayer">
                             <img src={Landing_Banner.default} className="buyerphoto" alt="Building1" />
                             <img src={CloseIcon} className="close_icon" alt="Building1" />
                           </Box> */}
                          </Box>
                          : null
                        }

                        {
                          classifiedUserType === "generic" || classified_type === "generic" ?
                            <>
                              <Box  marginBottom="1rem">
                                  <Box className="formGroup customSelect" style={{ marginTop: 20,marginBottom:"0px" }}
                                  marginTop='1rem'
                                  marginBottom='0rem'
                                  display="flex"
                                  overflow="hidden"
                                  alignItems="center"
                                  height="56px"
                                  border="0.1px solid rgb(0 0 0 / 61%)"
                                  borderRadius="25px"
                                  bgcolor="#f9f9f9">
                                      <FormControl variant="outlined" >
                                      <span className="frmLeftIcons">
                                        <AttachMoneyIcon fontSize="medium"/>
                                      </span>
                                          <Select
                                              name="currency"
                                              labelId="demo-simple-select-outlined-label"
                                              id="demo-simple-select-outlined"
                                              style={{ paddingLeft: 50, marginTop: -3,border:"0px" }}
                                              onChange={(e) => {
                                                  (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                              }}
                                              value={values.currency}
                                          >
                                              <MenuItem disabled value=" ">
                                                  Currency
                                              </MenuItem>
                                              {
                                                  this.state?.getCurrencyList?.map((val: any, index: any) => (
                                                      <MenuItem
                                                          key={index}
                                                          value={val?.id}
                                                      >
                                                          {val?.attributes?.currency}
                                                      </MenuItem>
                                                  ))
                                              }
                                          </Select>
                                      </FormControl>
                                  </Box>
                                  <ErrorMessage className="text-error" component="Typography" name="currency" />
                              </Box>
                              <Box marginBottom="1rem">
                                  <Box className="formGroup"  style={{marginBottom:"0px"}}>
                                      <Field name="paymentDetail" type="text" placeholder="Payment Detail" className="formInput" />
                                      <span className="frmLeftIcons">
                                          <img src={PayDetailIcon} className="frm-icons" alt="Warning Icon" />
                                      </span>
                                  </Box>
                                  <ErrorMessage className="text-error" component="Typography" name="paymentDetail" />
                              </Box>
                              <p style={{marginLeft:"5px"}}>Select timing for which you are willing to
                                provide/receive the service</p>
                              <Grid container>
                                <Grid xs={6}>
                                  <Box className="formGroup classifiedFormGroup">
                                    <Field name="timeFrom" type="time" placeholder="From" className="formInput" format="hh:mm" />
                                    <span className="frmLeftIcons">
                                      <img src={TimeIcon} className="frm-icons" alt="Warning Icon" />
                                    </span>
                                    <ErrorMessage className="text-error" component="Typography" name="timeFrom" />
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box className="formGroup">
                                    <Field name="timeTo" type="time" placeholder="To" className="formInput formInputBox" format="hh:mm" />
                                    <span className="frmLeftIcons">
                                      <img src={TimeIcon} className="frm-icons" alt="Warning Icon" />
                                    </span>
                                    <ErrorMessage className="text-error" component="Typography" name="timeTo" />
                                  </Box>
                                </Grid>
                                <p>Select duration to let your potential clients know how long your offer stays</p>
                              </Grid>
                            </>
                            :
                            null
                        }

                        {
                          classifiedUserType === "buyer" || classified_type === "buyer" ?
                            <>
                              <Grid container>
                                <Grid xs={12} className="classifiedPriceBlock">
                                  <p>Price Range</p>
                                  <Box className="formGroup priceSelect">
                                    <FormControl variant="outlined" >
                                      {/* <span className="frmLeftIcons">
                                        <img src={Box_Icon} className="frm-icons" alt="House Icon" />
                                      </span> */}
                                      <Select
                                        name="currency"
                                        labelId="demo-simple-select-outlined-label"
                                        style={{ paddingLeft: 50, marginTop: -3 }}
                                        onChange={(e) => {
                                          (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                        }}
                                        value={values.currency}
                                      >
                                        <MenuItem disabled value=" ">
                                          Currency
                                        </MenuItem>
                                        {
                                          this.state?.getCurrencyList?.map((val: any, index: any) => (
                                            <MenuItem
                                              key={index}
                                              value={val?.id}
                                            >
                                              {val?.attributes?.currency}
                                            </MenuItem>
                                          ))
                                        }
                                      </Select>
                                      <ErrorMessage className="text-error-currency1" component="Typography" name="currency" />
                                    </FormControl>
                                  </Box>
                                </Grid>
                                {/* <Grid xs={6} >
                                 
                                </Grid> */}
                                <Grid xs={6}>
                                  <Box marginBottom="1rem">
                                      <Box className="formGroup classifiedFormGroup" style={{marginBottom:"0px"}}>
                                          <Field name="priceFrom" type="text" placeholder="From" className="formInput" />
                                          <span className="frmLeftIcons">
                                              <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                          </span>
                                      </Box>
                                      <ErrorMessage className="text-error" component="Typography" name="priceFrom" />
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box marginBottom="1rem">
                                      <Box className="formGroup" style={{marginBottom:"0px"}}>
                                          <Field name="priceTo" type="text" placeholder="To" className="formInput" />
                                          <span className="frmLeftIcons">
                                              <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                          </span>
                                      </Box>
                                      <ErrorMessage className="text-error" component="Typography" name="priceTo" />
                                  </Box>
                                </Grid>
                              </Grid>
                              <p>Select duration to let buyers know how long your offer stays</p>
                            </>
                            : null
                        }
                        {classifiedUserType === "seller" || classified_type === "seller" ?
                          <>
                            <Box className="sellerPriceBox" style={{ marginTop: 20 }}>
                              <Box marginBottom="1rem">
                                  <Box className="formGroup" style={{marginBottom:"0px"}}
                                  marginTop='1rem'
                                  marginBottom='0rem'
                                  display="flex"
                                  overflow="hidden"
                                  alignItems="center"
                                  height="56px"
                                  border="0.1px solid rgb(0 0 0 / 61%)"
                                  borderRadius="25px"
                                  bgcolor="#f9f9f9">
                                      <Field name="price" type="text" placeholder="Price" className="formInput" />
                                      <span className="frmLeftIcons">
                                          <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                      </span>

                                  </Box>
                                  <ErrorMessage className="text-error" component="Typography" name="price" />
                              </Box>
                              <Box>

                              </Box>
                              <Box className="formGroup priceSelect">
                                <FormControl variant="outlined" >
                                  <Select
                                    name="currency"
                                    labelId="demo-simple-select-outlined-label"
                                    style={{ paddingLeft: 50, marginTop: -3 }}
                                    onChange={(e) => {
                                      (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                    }}
                                    value={values.currency}
                                  >
                                    <MenuItem disabled value=" ">
                                      Currency
                                    </MenuItem>
                                    {
                                      this.state?.getCurrencyList?.map((val: any, index: any) => (
                                        <MenuItem
                                          key={index}
                                          value={val?.id}
                                        >
                                          {val?.attributes?.currency}
                                        </MenuItem>
                                      ))
                                    }
                                  </Select>
                                  <ErrorMessage className="text-error-currency" component="Typography" name="currency" />
                                </FormControl>
                              </Box>
                            </Box>
                            <p style={{marginLeft:"5px"}}>Select duration to let buyers know how long your offer stays</p>
                          </>
                          : null
                        }
                        <Box className="DateSection">
                          <Grid container>
                            <Grid xs={6}>
                              <Box className="formGroup classifiedFormGroup"
                              marginTop='1rem'
                              marginBottom='0rem'
                              display="flex"
                              overflow="hidden"
                              alignItems="center"
                              height="56px"
                              border="0.1px solid rgb(0 0 0 / 61%)"
                              borderRadius="25px"
                              bgcolor="#f9f9f9">
                                <TextField
                                  label="Start Date" variant="outlined"
                                  style={{ width: "100%", borderRadius: "25px", border: "1px solid #e9dede" }}
                                  type="date" name="startDate" fullWidth
                                  id="SurveyQuestion"
                                  format='DD/MM/YYYY'
                                  value={values?.startDate}
                                  onChange={handleChange}
                                  InputProps={{
                                    // min: "2019-01-24",
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {/* <DateRangeOutlinedIcon /> */}
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {/* <DateRangeOutlinedIcon /> */}
                                      </InputAdornment>
                                    ),
                                  }
                                  }
                                />
                                <ErrorMessage className="text-error" component="Typography" name="startDate" />
                              </Box>
                            </Grid>
                            <Grid xs={6}>
                              <Box className="formGroup classifiedFormGroup"
                              marginTop='1rem'
                              marginBottom='0rem'
                              display="flex"
                              overflow="hidden"
                              alignItems="center"
                              height="56px"
                              border="0.1px solid rgb(0 0 0 / 61%)"
                              borderRadius="25px"
                              bgcolor="#f9f9f9">
                                <TextField label="End Date" variant="outlined"
                                  type="date" name="endDate" fullWidth
                                  style={{ width: "100%", borderRadius: "25px", border: "1px solid #e9dede" }}
                                  id="SurveyQuestion"
                                  format='DD/MM/YYYY'
                                  value={values?.endDate}
                                  onChange={handleChange}
                                  InputProps={{
                                    // min: "2019-01-24",
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                <ErrorMessage className="text-error" component="Typography" name="endDate" />
                              </Box>
                            </Grid>
                          </Grid>
                        </Box >
                        {
                          !classifiedUserType ? <Box className="customButton">
                            <Button variant="contained" type="submit" >SAVE CHANGES</Button>
                          </Box>
                            :
                            <Box className="customButton">
                              <Button variant="contained" type="submit">preview</Button>
                            </Box>
                        }

                      </Form>
                    )}
                  </Formik >
                </Box >
                {/* desktop footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box> */}
              </Box >
            </Grid >
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid >
        </Box >
        <Loader loading={this.state.loading} />
        
        </>
    )
    }
}

export default withRouter(ClassifiedCreate)