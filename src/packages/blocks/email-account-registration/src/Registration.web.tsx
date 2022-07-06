import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";



export default class Registration extends EmailAccountRegistrationController  {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
  return (
    <>
    <Grid container>
      <Grid xs={12}>
          <ArrowBackIcon/>
      </Grid>
    </Grid>

      <Grid container>
        <Grid xs={12}>
          <p className="text-center" style={{fontSize:'1.75rem',fontWeight:'700'}}>
            Client <br />
            Logo

          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <p className="text-center">
            Create an account with your credentials
          </p>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12}>
          <Formik initialValues={{
            full_name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",

            showPassword: false,
            showConfirmPassword: false



          }}
            onSubmit={(values) => {this.createAccoun(values)}}
          >
            {({ values,
              errors,
              touched,
              isValid, handleChange,
              setFieldValue }) => (
              <Form translate="yes" className=''>
                <Box display="flex" flexDirection="column">
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
                    <PermIdentityIcon />

                    <Field
                      name="full_name"
                      placeholder={"full Name"}
                      style={{
                        border: "none",
                        height: "100%",
                        width: "80%",
                        color: "rgba(0, 0, 0, 0.6)",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 16,
                        marginRight: 10,
                        marginLeft: 21,
                        outline: "none"
                      }}
                    />
                  </Box>
                  {errors.full_name && touched.full_name ? (
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
                      {errors.full_name}
                    </Typography>
                  ) : null}
                  {this.state.error ? (
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
                    <MailOutlineIcon />

                    <Field
                      name="email"
                      placeholder={"Email"}
                      style={{
                        border: "none",
                        height: "100%",
                        width: "80%",
                        color: "rgba(0, 0, 0, 0.6)",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 16,
                        marginRight: 10,
                        marginLeft: 21,
                        outline: "none"
                      }}
                    />
                  </Box>
                  {errors.full_name && touched.full_name ? (
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
                      {errors.full_name}
                    </Typography>
                  ) : null}
                  {this.state.error ? (
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
                    <MailOutlineIcon />

                    <Field
                      name="phone"
                      placeholder={"Mobile"}
                      style={{
                        border: "none",
                        height: "100%",
                        width: "80%",
                        color: "rgba(0, 0, 0, 0.6)",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 16,
                        marginRight: 10,
                        marginLeft: 21,
                        outline: "none"
                      }}
                    />
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
                      {errors.email}
                    </Typography>
                  ) : null}
                  {this.state.error ? (
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
                    <Field
                      name="password"
                      placeholder="Password"
                      type={values.showPassword ? "text" : "password"}
                      style={{
                        border: "none",
                        height: "100%",
                        width: "80%",
                        color: "rgba(0, 0, 0, 0.6)",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 16,
                        marginRight: 10,
                        marginLeft: 21,
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
                        fontFamily: "Poppins",
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
                    <Field
                      name="confirm_password"
                      placeholder="Confirm Password"
                      type={values.showConfirmPassword ? "text" : "password"}
                      style={{
                        border: "none",
                        height: "100%",
                        width: "80%",
                        color: "rgba(0, 0, 0, 0.6)",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 16,
                        marginRight: 10,
                        marginLeft: 21,
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
                  {errors.password && touched.password ? (
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
                      {errors.password}
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
                      fontFamily: "Poppins",
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
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 12,
                        textAlign: "center"
                      }}
                    >
                      Already have an account ?
                    </Typography>
                    <Link
                      href="/login"
                      underline="none"
                      style={{
                        fontSize: 14,
                        color: "#2B6FEC",
                        fontFamily: "Poppins",
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
                        fontFamily: "Poppins",
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

                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  )
                    }
}
