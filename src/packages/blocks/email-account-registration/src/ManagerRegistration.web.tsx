import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, FormControl, InputLabel, Select, MenuItem, TextField
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import { Building1, company_logo, compnayName, email, password, user } from "./assets";
import { dailCode } from './code'
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
// @ts-ignore
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


class ManagerRegistration extends EmailAccountRegistrationController {
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
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" >


        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <div style={{display: 'flex' ,justifyContent: 'center' ,cursor: 'pointer'}} onClick={()=> //@ts-ignore 
          window.open("https://www.TenantInt.com", '_blank').focus()}>
              <img className="text-center" src={company_logo} alt="" />
          </div>
            <Grid container>
              <Grid xs={12}>
                <p className="text-center" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                  Welcome

                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12}>
                <p className="text-center">
                  Property Manager Sign up
                </p>
              </Grid>
            </Grid>

            <Grid container className="main-content-block">
          <Grid xs={12}>
            <Formik initialValues={{

              email: "",
              phone: "",
              password: "",
              confirm_password: "",
              managerName:'',
              company_name:'',
              owner_phone:'',
              owner_email:'',
              ownerName:'',
              showPassword: false,
              showConfirmPassword: false



            }}
                  validationSchema={this.signupSchemaManager()}
                  validateOnMount={true}
              onSubmit={(values) => { this.createAccountManager(values) }}
            >
              {({ values,
                errors,
                touched,
                isValid, handleChange,
                setFieldValue }) => (
                <Form translate="yes" className=''>
                  <Box display="flex" flexDirection="column">
                    <Box
                          className='formInputGrp'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                          <img src={compnayName} style={{paddingLeft:'0.5rem'}} />

                      <Field
                        name="company_name"
                            placeholder={"Company Name"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",
                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.company_name && touched.company_name ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.company_name}
                      </Typography>
                    ) : null}


                    {/* Manager Name */}

                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                          <img src={user} style={{ paddingLeft: '0.5rem' }} />

                      <Field
                        name="managerName"
                            placeholder={"Manager Full name"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.managerName && touched.managerName ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.managerName}
                      </Typography>
                    ) : null}


                    {/* email */}
                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                          <img src={email} style={{ paddingLeft: '0.5rem' }} />


                      <Field
                        name="email"
                            placeholder={"Email ID (will be your user name)"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.email && touched.email ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.email}
                      </Typography>
                    ) : null}


                    {/* mobile */}

                    <Box
                      marginTop='1rem'
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                    >
                      <Box>
                        <FormControl variant="outlined" >
                          {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                          <Select
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
                              <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' />
                                {item.dial_code}</MenuItem>

                            )
                            }

                          </Select>
                                               {/* <Autocomplete
  id="combo-box-demo"
  options={dailCode}
  autoComplete="new-password"
  value={this.getSelectedItem()}
  filterOptions={filterOptions}
  getOptionLabel={(option:any) => this.handleChangeCode(option)}
  onInputChange={(event:any, newInputValue:any)=>this.setState({selectCode:newInputValue})}
  style={{ width: 100 }}
  renderOption={(props:any, option:any) => { console.log(props)
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
                      id="mobile"
                        name="phone"
                        placeholder={"Mobile"}
                        style={{
                          border: "none",
                          height: "42%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
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
                        {errors.phone}
                      </Typography>
                    ) : null}


                    {/* Owner Name */}

                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                          <img src={user} style={{ paddingLeft: '0.5rem' }} />

                      <Field
                        name="ownerName"
                            placeholder={"Owner full name"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.ownerName && touched.ownerName ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.ownerName}
                      </Typography>
                    ) : null}


                    {/* email */}
                    <Box
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                      marginTop='1rem'

                    >
                          <img src={email} style={{ paddingLeft: '0.5rem' }} />


                      <Field
                        name="owner_email"
                            placeholder={"Owner Email ID"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.owner_email && touched.owner_email ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.owner_email}
                      </Typography>
                    ) : null}


                    {/* mobile */}

                    <Box
                      marginTop='1rem'
                      className='input'
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                    >
                      <Box>
                        <FormControl variant="outlined" >
                          {/* <InputLabel id="demo-simple-select-outlined-label"><img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg`} width='15' height='15' />
                          sd</InputLabel> */}
                          <Select
                            name='selectCode'
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={this.handleChange}
                            label="Unit"
                                value={this.state.selectCode2}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {dailCode.map((item) =>
                              <MenuItem key={item.dial_code} value={item.dial_code}> <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} width='15' height='15' />
                                {item.dial_code}</MenuItem>

                            )
                            }

                          </Select>
                                               {/* <Autocomplete
  id="combo-box-demo"
  options={dailCode}
  autoComplete="new-password"
  value={this.getSelectedItem()}
  filterOptions={filterOptions}
  getOptionLabel={(option:any) => this.handleChangeCode(option)}
  onInputChange={(event:any, newInputValue:any)=>this.setState({selectCode:newInputValue})}
  style={{ width: 100 }}
  renderOption={(props:any, option:any) => { console.log(props)
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
                      id="mobile"
                        name="owner_phone"
                        placeholder={"Mobile"}
                        style={{
                          border: "none",
                          height: "42%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
                    </Box>
                    {errors.owner_phone && touched.owner_phone ? (
                      <Typography
                        style={{
                          color: "#F14E24",

                          fontWeight: 300,
                          fontSize: 14,
                          marginTop: 5,
                          marginLeft: 10
                        }}
                      >
                        {errors.owner_phone}
                      </Typography>
                    ) : null}


                    {/* pass */}
                    <Box
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      mt="20px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                    >
                          <img src={password} style={{ paddingLeft: '0.5rem' }} />
                      <Field
                        name="password"
                            placeholder="Enter Password"
                        type={values.showPassword ? "text" : "password"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
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
                        {errors.password}
                      </Typography>
                    ) : null}

                    {/* confirm */}
                    <Box
                      display="flex"
                      overflow="hidden"
                      alignItems="center"
                      height="56px"
                      mt="20px"
                      border="0.1px solid rgb(209 209 209 / 44%)"
                      borderRadius="16px"
                      bgcolor="white"
                    >
                          <img src={password} style={{ paddingLeft: '0.5rem' }} />

                      <Field
                        name="confirm_password"
                        placeholder="Confirm Password"
                        type={values.showConfirmPassword ? "text" : "password"}
                        style={{
                          border: "none",
                          height: "100%",
                          width: "80%",
                          color: "rgba(0, 0, 0, 0.6)",

                          fontWeight: 400,
                          fontSize: 16,
                          marginRight: 10,
                          marginLeft: 10,
                          outline: "none"
                        }}
                      />
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
                        {errors.confirm_password}
                      </Typography>
                    ) : null}



                    <Button
                      className={'btn'}
                      variant="contained"
                      type="submit"
                      style={{
                        backgroundColor: "#2B6FEC",
                        borderRadius: 16,
                        height: 54,
                        marginBottom: 14,
                        boxShadow: "none",
                        color: "#F7F7FC",
                        fontWeight: 600,
                        fontSize: 16,
                        marginTop: 30
                      }}
                    >
                      SIGN UP
                    </Button>

                    <Box
                      display="flex"
                      mt="25px"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <Typography
                        style={{
                          color: "#A0A3BD",
                          fontWeight: "normal",
                          fontSize: 12,
                          textAlign: "center"
                        }}
                      >
                        Already have an account ?
                      </Typography>
                      <Link
                        href="/EmailAccountLogin"
                        underline="none"
                        style={{
                          fontSize: 14,
                          color: "#FC8434",
                          fontWeight: 500,
                          marginLeft: 5,
                          textTransform: "uppercase"
                        }}
                      >
                        Login
                      </Link>
                    </Box>

                    <Box
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



                        {/* , {t("including the")} */}
                        {" "}

                      </Typography>
                    </Box>
                    <Box display='flex' justifyContent='center' style={{ cursor: 'pointer'}} onClick={()=>//@ts-ignore
                      window.open("https://www.TenantInt.com", '_blank').focus()}>
                      <img src={company_logo} width='125' height='125' />
                    </Box>

                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
            </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
            </Grid>
        <Loader loading={this.state.loading} />

      </>
    )
  }
}
//@ts-ignore
export default withRouter(ManagerRegistration)
