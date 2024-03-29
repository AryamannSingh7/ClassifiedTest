import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, FormControl, InputLabel, Select, MenuItem, TextField
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field, ErrorMessage } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { Back_btn, Building1, company_logo, company_logo2, email, password, user } from "./assets";
import {dailCode} from './code'
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
// @ts-ignore
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AlertErrorWeb from "../../../components/src/AlertError.web";
import { Tenant_Logo } from "../../email-account-login/src/assets";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import "../../../web/src/assets/css/content/auth.styles.scss";




class Registration extends EmailAccountRegistrationController  {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  getSelectedItem(){
    const item = dailCode.find((opt)=>{
      // @ts-ignore
      if (opt.dial_code == this.state.selectCode)
        return opt;
    })
    return item || {};
  }

  render() {
    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option:any) => option.name,
    });
  return (
    <>
      <Grid container spacing={2} className="auth-container">
        <Grid item xs={12} md={7} className="auth-cols" >
          <Grid container   >
            <Grid xs={12}>
            <img src={Back_btn} onClick={() => window.history.back()} style={{marginTop:'1rem',marginLeft:'0.5rem'}} />
            </Grid>
          </Grid>

          <div style={{display: 'flex' ,justifyContent: 'center' ,cursor: 'pointer'}}  onClick={()=>//@ts-ignore
            window.open("https://www.TenantInt.com", '_blank').focus()}>
              <img className="text-center" src={company_logo} alt="" style={{width:'10rem'}} />
          </div>
    
          <Grid container>
          <Grid xs={12}>
              <p className="text-center bold-text" style={{ fontSize: '1.75rem', fontWeight: 900,marginTop:'1.5rem' }}>
                Welcome
              </p>
            </Grid>
            <Grid xs={12} style={{marginBottom:'2rem'}}>
              <p className="text-center"  style={{fontSize:'15px'}}>
                Create an account with your credentials
              </p>
            </Grid>
          </Grid>

          <Grid container className="main-content-block">
            <Grid xs={12} className="inputPlaceholderRegistration">
              <Formik initialValues={{
                full_name: "",
                email: "",
                phone: "",
                password: "",
                confirm_password: "",

                showPassword: false,
                showConfirmPassword: false



              }}
                validationSchema={this.signupSchema()}
                validateOnMount={true}
                onSubmit={(values) => { this.createAccoun(values) }}
              >
                {({ values,
                  errors,
                  touched,
                  isValid, handleChange,
                  setFieldValue }) => (
                  <Form className="commonForm" translate="yes" >
                    <Box className='formGroup'>
                      <Box
                        className="formInputGrp"
                        style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}
                      >
                        <Field
                          className="formInput"
                          name="full_name"
                          placeholder={"Full Name"}

                        />
                        <span className="frmLeftIcons">
                          <img src={user} />
                        </span>
                      </Box>

                      {errors.full_name && touched.full_name ? (
                        <Typography
                          style={{
                            color: "#F14E24",

                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="full_name" />
                        </Typography>
                      ) : null}
                      {/* {this.state.error ? (
                    <Typography
                      style={{
                        color: "#F14E24",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                        fontSize: 14,
                        marginTop: 5,
                        marginLeft: 10
                      }}
                    >
                      {this.state.error}
                    </Typography>
                  ) : null} */}

                      {/* email */}
                      <Box
                        className="formInputGrp"
                        style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}
                      >


                        <Field
                          name="email"
                          placeholder={"Email ID (will be your user name)"}
                          className="formInput"
                        />
                        <span className="frmLeftIcons">

                          <img src={email} />
                        </span>
                      </Box>
                      {errors.email && touched.email ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontFamily: "Poppins",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="email" />
                        </Typography>
                      ) : null}
                      {/* {this.state.error ? (
                    <Typography
                      style={{
                        color: "#F14E24",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                        fontSize: 14,
                        marginTop: 5,
                        marginLeft: 10
                      }}
                    >
                      {this.state.error}
                    </Typography>
                  ) : null} */}

                      {/* mobile */}

                      <Box
                        marginTop='1rem'
                        className='formInputGrp'
                        display="flex"
                        overflow="hidden"
                        alignItems="center"
                        height="56px"
                        border="0.1px solid rgb(209 209 209 / 44%)"
                        borderRadius="25px"
                        style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9",overflow:"visible"}}
                      >
                        <Box>
                          <FormControl variant="outlined" >
                            {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                            {/* <Select
                              name='selectCode'
                              labelId="demo-simple-select-outlined-label"

                              id="demo-simple-select-outlined"
                              onChange={this.handleChange}
                              label="Unit"
                              value={this.state.selectCode}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {dailCode.map((item) =>
                                <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' style={{ marginRight: '5px' }} />
                                  {item.dial_code}</MenuItem>

                              )
                              }

                            </Select> */}
                            <PhoneInput
                            inputProps={{name:'selectCode'}}
                            // name='selectCode'
                            enableSearch={true}
                            value={this.state.selectCode}
                            onChange={this.handleChangeCCode}
  country={'us'}
/>
                     {/* <Autocomplete
  id="new"
  options={dailCode}
  autoComplete="new-password"
  value={this.getSelectedItem()}
  filterOptions={filterOptions}
  getOptionLabel={option => option.dial_code || ""}
  // onInputChange={(event:any, newInputValue:any)=>this.setState({selectCode:newInputValue})}
  // onInputChange={(event:any, newInputValue:any)=>console.log(newInputValue)}
  
  style={{ width: 150 }}
  renderOption={(props:any, option:any) => {
    return <MenuItem>{props.dial_code} <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${props.code}.svg`} width='15' height='15' style={{ marginRight: '5px' }} /></MenuItem>;
  }}
  renderInput={(params:any) => <TextField {...params}  inputProps={{
    ...params.inputProps,
    autoComplete: 'new-password',
  }}  variant="outlined" />}
/> */}
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
                            marginLeft: 5,
                            outline: "none",
                            backgroundColor:'#f9f9f9'
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
                      {/* {this.state.error ? (
                    <Typography
                      style={{
                        color: "#F14E24",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                        fontSize: 14,
                        marginTop: 5,
                        marginLeft: 10
                      }}
                    >
                      {this.state.error}
                    </Typography>
                  ) : null} */}
                      {/* pass */}
                      <Box
                        className="formInputGrp"
                        style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}
                      >

                        <Field
                          className="formInput"
                          name="password"
                          placeholder="Enter Password"
                          type={values.showPassword ? "text" : "password"}

                        />
                        <span className="frmrightIcons">

                          {values.showPassword ? (
                            <IconButton
                              onClick={() => setFieldValue("showPassword", false)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <Visibility
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => setFieldValue("showPassword", true)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <VisibilityOff
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54
                                }}
                              />
                            </IconButton>
                          )}
                        </span>

                        <span className="frmLeftIcons">
                          <img src={password} />
                        </span>
                      </Box>

                      {errors.password && touched.password ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="password" />
                        </Typography>
                      ) : null}

                      {/* confirm */}
                      <Box
                        className="formInputGrp"
                        style={{border:"0.1px solid rgb(209 209 209 / 100%)",borderRadius:"25px",backgroundColor:"#f9f9f9"}}
                      >
                        <span className="frmLeftIcons">

                          <img src={password} />
                        </span>

                        <Field
                          className="formInput"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          type={values.showConfirmPassword ? "text" : "password"}

                        />
                        <span className="frmrightIcons">

                          {values.showConfirmPassword ? (
                            <IconButton
                              onClick={() => setFieldValue("showConfirmPassword", false)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <Visibility
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => setFieldValue("showConfirmPassword", true)}
                              style={{ padding: 0, backgroundColor: "transparent" }}
                              disableRipple={true}
                            >
                              <VisibilityOff
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 16,
                                  color: "#000000",
                                  opacity: 0.54
                                }}
                              />
                            </IconButton>
                          )}
                        </span>
                      </Box>

                      {errors.confirm_password && touched.confirm_password ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="confirm_password" />
                        </Typography>
                      ) : null}


                      <Box className="customButton formInputGrp">

                        <Button
                          variant="contained"
                          type="submit"
                          style={{borderRadius:'25px'}}

                        >
                          SIGN UP
                        </Button>

                      </Box>

                      <Box
                        display="flex"
                        mt="25px"
                        alignItems="flex-start"
                        justifyContent="center"
                      >
                        <Typography
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: 15,
                            textAlign: "center",
                            marginTop:'55px'
                          }}
                        >
                          Already have an account ?
                        </Typography>
                        <Link
                          href="/EmailAccountLogin"
                          underline="none"
                          style={{
                            fontSize: 15,
                            color: "#FC8434",
                            marginLeft: 1,
                            fontWeight: 'bold',
                            marginTop:'57px'
                          }}
                        >
                          Login
                        </Link>
                      </Box>

                      {/* <Box
                        display="flex"
                        mt="25px"
                        alignItems="flex-start"
                        justifyContent='center'
                        className={'sign'}
                      >
                        <Typography
                          style={{
                            color: "#A0A3BD",
                            textAlign: "center",
                            fontWeight: "normal",
                            fontSize: 12
                          }}
                        >
                          POWERED BY

                        </Typography>
                      </Box> */}
                       <Box className="footer-main-block1 bottomBlock1" style={{backgroundColor:"white",marginTop: '25px'}}>
                  <h6 className="bottom-text" style={{color:'#A0A3BD'}}>POWERED BY</h6>
                  {/* <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" /> */}
                </Box>
                      <Box display='flex' justifyContent='center'>
                        <a href="http://www.tenantint.com/" target="_blank">
                          <img src={company_logo} width='125' height='125' />
                        </a>
                      </Box>

                    </Box>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
          <Loader loading={this.state.loading} />
          </Grid>
        <Grid item xs={12} md={5} className="auth-cols">
          <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
          </Box>
        </Grid>
          </Grid>
          <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />

    </>
  )
                    }
}
// @ts-ignore
export default withRouter(Registration)
