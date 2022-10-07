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

import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
//Customizable Area End

//resorces
import {
  Tenant_Logo,
  Upload_Icon,
  Clipboard_Icon,
  Warning_Icon,
  House_Icon,
  Box_Icon,
  Building1,
  Checkmark_Icon,
  Error_Icon,
  EmailIcon,
  DescIcon,
  TitleIcon,
  CurrencyIcon
} from "../src/assets";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { dailCode } from "../../email-account-registration/src/code";

class CreateClassified extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): any {
    // this.getCurrencyList();
    //@ts-ignore
    const id = this.props?.history?.location?.id;
    console.log("this.props?.history?.location?.id;==============>",id)
    if (id)
      this.getClassifiedDetailsById(id)
  }
  render() {
    const { navigation } = this.props;
    // console.log("this.state?.getClassifiedDetails?==============>",this.state?.getClassifiedDetails?.attributes)
    const id = this.state?.getClassifiedDetails?.id;
    const attributes = this.state?.getClassifiedDetails?.attributes;
    const classifiedUserType = localStorage.getItem("classifiedUserType")
    // if (!classifiedUserType) {
    //   //@ts-ignore
    //   this.props.history.replace("/ClassifiedType");
    //   return null;
    // }

    return (
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
                      phone:attributes?.full_phone_number ||"",
                      email:attributes?.email||"",
                      classifiedTitle:attributes?.title||"",
                      description:attributes?.description||"",
                      media: [],
                      price:"",
                      currency:attributes?.currency?.currency||' ',
                      endDate:attributes?.duration_to||"",
                      startDate:attributes?.duration_from||"",
                      selectCode:'+966',
                      priceFrom:attributes?.price_from||"",
                      priceTo:attributes?.price_to||"",
                      timeFrom:attributes?.time_from||"",
                      timeTo:attributes?.time_to||"",
                      paymentDetail:attributes?.payment_detail||"",
                      id : id || ""
                    }}
                    enableReinitialize
                    validationSchema={classifiedUserType === "generic" ? this.createClassifiedSchemaGerenic() : classifiedUserType === "buyer" ? this.createClassifiedSchemaBuy() : this.createClassifiedSchemaSell()}
                    validateOnMount={true}
                    onSubmit={(values) =>{
                      !this.state?.sizeError && !this.state?.notImageOrVideoError ?
                      ( //@ts-ignore
                        this.props?.history?.location?.id ?
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
                        <Box
                          marginTop='1rem'
                          marginBottom='1rem'
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
                              {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                              <Select
                                name='selectCode'
                                labelId="demo-simple-select-outlined-label"

                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                value={values.selectCode}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {dailCode.map((item) =>
                                  <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' style={{ marginRight: '5px' }} />
                                    {item.dial_code}</MenuItem>

                                )
                                }

                              </Select>
                            </FormControl>

                          </Box>

                          <Field
                            name="phone"
                            id="mobile"
                            placeholder={"Mobile"}
                            style={{
                              border: "none",
                              height: "42%",
                              width: "80%",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: 400,
                              fontSize: 16,
                              marginRight: 10,
                              marginLeft: 21,
                              outline: "none",
                              backgroundColor: '#f9f9f9'
                            }}
                          />
                        </Box>

                        {errors.phone && touched.phone ? (
                          <Typography
                            style={{
                              color: "#F14E24",
                              fontWeight: 300,
                              fontSize: 14,
                              marginTop: 5,
                              marginLeft: 10
                            }}
                          >
                            <ErrorMessage className="text-error" component="Typography" name="phone" />
                          </Typography>
                        ) : null}

                        <Box className="formGroup">
                          <Field name="email" type="text" placeholder="email" className="formInput" />
                          <span className="frmLeftIcons">
                            <img src={EmailIcon} className="frm-icons" alt="Warning Icon" />
                          </span>
                          <ErrorMessage className="text-error" component="Typography" name="email" />
                        </Box>
                        <Box className="formGroup">
                          <Field name="classifiedTitle" type="text" placeholder="Classified Title" className="formInput" />
                          <span className="frmLeftIcons">
                            <img src={TitleIcon} className="frm-icons" alt="Warning Icon" />
                          </span>
                          <ErrorMessage className="text-error" component="Typography" name="classifiedTitle" />
                        </Box>

                        <Box className="formGroup">
                          <Field name="description" type="text" placeholder="Add description" className="formInput" />
                          <span className="frmLeftIcons">
                            <img src={EmailIcon} className="frm-icons" alt="Warning Icon" />
                          </span>
                          <ErrorMessage className="text-error" component="Typography" name="description" />
                        </Box>
                        {/* <Box className="formGroup">
                          <Field name="description" type="text" placeholder="Add description" className="formInput" />
                        </Box> */}
                        <Box className="formGroup customFileupload">
                          <Button
                            variant="contained"
                            component="label"
                          >
                            <img src={Upload_Icon} className="upload-icon" alt="upload-icon" />
                            Add Image / Video
                            <input
                              name='media'
                              type="file"
                              hidden
                              multiple
                              accept="image/jpg ,image/jpeg,image/gif,image/png,video/mp4,video/x-m4v"
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
                                  Only image and video are supported.
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
                        {
                          classifiedUserType === "generic" ?
                            <>
                              <Box className="formGroup customSelect">
                                <FormControl variant="outlined" >
                                  <span className="frmLeftIcons">
                                    <img src={Box_Icon} className="frm-icons" alt="House Icon" />
                                  </span>
                                  <Select
                                    name="currency"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    style={{ paddingLeft: 50, marginTop: -3 }}
                                    onChange={(e) => {
                                      (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                    }}
                                    value={values.currency}
                                  >
                                    <MenuItem disabled value=" ">
                                      currency
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
                                  <ErrorMessage className="text-error" component="Typography" name="currency" />
                                </FormControl>
                              </Box>

                              <Box className="formGroup">
                                <Field name="paymentDetail" type="text" placeholder="paymentDetail" className="formInput" />
                                <span className="frmLeftIcons">
                                  <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                </span>
                                <ErrorMessage className="text-error" component="Typography" name="paymentDetail" />
                              </Box>

                              <p>Select timing for which you are willing to
                                provide/receive the service</p>

                              <Box className="formGroup">
                                <Field name="timeFrom" type="time" placeholder="From" className="formInput" />
                                <span className="frmLeftIcons">
                                  <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                </span>
                                <ErrorMessage className="text-error" component="Typography" name="timeFrom" />
                              </Box>

                              <Box className="formGroup">
                                <Field name="timeTo" type="time" placeholder="To" className="formInput formInputBox" />
                                <span className="frmLeftIcons">
                                  <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                </span>
                                <ErrorMessage className="text-error" component="Typography" name="timeTo" />
                              </Box>
                              <p>Select duration to let your potential clients know how long your offer stays</p>
                            </>
                            :
                            null
                        }

                        {
                          classifiedUserType === "buyer" ?
                            <>
                              <Grid container>
                                <Grid xs={6}>
                                  <p>Price Range</p>
                                </Grid>
                                <Grid xs={6} >
                                  <Box className="formGroup customSelect">
                                    <FormControl variant="outlined" >
                                      <span className="frmLeftIcons">
                                        <img src={Box_Icon} className="frm-icons" alt="House Icon" />
                                      </span>
                                      <Select
                                        name="currency"
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        style={{ paddingLeft: 50, marginTop: -3 }}
                                        onChange={(e) => {
                                          (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                        }}
                                        value={values.currency}
                                      >
                                        <MenuItem disabled value=" ">
                                          currency
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
                                      <ErrorMessage className="text-error" component="Typography" name="currency" />
                                    </FormControl>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box className="formGroup classifiedFormGroup">
                                    <Field name="priceFrom" type="text" placeholder="From" className="formInput" />
                                    <span className="frmLeftIcons">
                                      <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                    </span>
                                    <ErrorMessage className="text-error" component="Typography" name="priceFrom" />
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box className="formGroup">
                                    <Field name="priceTo" type="text" placeholder="To" className="formInput" />
                                    <span className="frmLeftIcons">
                                      <img src={CurrencyIcon} className="frm-icons" alt="Warning Icon" />
                                    </span>
                                    <ErrorMessage className="text-error" component="Typography" name="priceTo" />
                                  </Box>
                                </Grid>
                              </Grid>
                              <p>Select duration to let buyers know how long your offer stays</p>
                            </>
                            : null
                        }
                        {classifiedUserType === "seller" ?
                          <>
                            <Box className="formGroup">
                              <Field name="price" type="text" placeholder="price" className="formInput" />
                              <span className="frmLeftIcons">
                                <img src={Warning_Icon} className="frm-icons" alt="Warning Icon" />
                              </span>
                              <ErrorMessage className="text-error" component="Typography" name="price" />
                            </Box>
                            <Box className="formGroup customSelect">
                              <FormControl variant="outlined" >
                                <span className="frmLeftIcons">
                                  <img src={Box_Icon} className="frm-icons" alt="House Icon" />
                                </span>
                                <Select
                                  name="currency"
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  style={{ paddingLeft: 50, marginTop: -3 }}
                                  onChange={(e) => {
                                    (e.target.value != " ") && setFieldValue("currency", e.target.value)
                                  }}
                                  value={values.currency}
                                >
                                  <MenuItem disabled value=" ">
                                    currency
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
                                <ErrorMessage className="text-error" component="Typography" name="currency" />
                              </FormControl>
                            </Box>
                            <p>Select duration to let buyers know how long your offer stays</p>
                          </>
                          : null
                        }
                        <Box className="DateSection">
                                        <Box style={{width:"100%"}}>
                                            <TextField
                                                label="Start Date" variant="outlined"
                                                style={{width:"100%"}}
                                                type="date" name="startDate"  fullWidth
                                                id="SurveyQuestion"
                                                format='DD/MM/YYYY'
                                                onChange={handleChange}
                                                InputProps={{
                                                    // min: "2019-01-24",
                                                    //@ts-ignore
                                                    max: "5000-05-31",
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }
                                                }
                                            />
                                             <ErrorMessage className="text-error" component="Typography" name="startDate" />
                                        </Box>
                                        <Box style={{width:"100%"}}>
                                            <TextField label="End Date" variant="outlined"
                                                       type="date" name="endDate"  fullWidth
                                                       style={{width:"100%"}}
                                                       id="SurveyQuestion"
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
                                    </Box>
                      {//@ts-ignore
                        this.props?.history?.location?.id ? 
                        <Box className="customButton">
                        <Button variant="contained" type="submit" >SAVE CHANGES</Button>
                        </Box>
                        :
                        <Box className="customButton">
                        <Button variant="contained" type="submit">preview</Button>
                        </Box>
                                    }
                        
                      </Form>
                    )}
                  </Formik>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box> */}
              </Box>
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

export default withRouter(CreateClassified)
