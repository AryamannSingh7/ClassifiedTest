import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  
} from "@material-ui/core";


//resources
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SuggestionController,{Props} from './SuggestionController.web';
import { Book, Clipboard, Layout } from './assets';
import { Building1 } from '../../ContentManagement/src/assets';
class Suggestion extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
     this.getRealtedToData()
    
  }
  render() {

    return (
      <>
         <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Add New Suggestion</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui create-reservation-wrapper">
                  <Formik
                    initialValues={{
                      title:  "",
                      relatedTo:" ",
                      description:"",
                    }}
                    enableReinitialize
                    validationSchema={this.createSuggtionSchema()}
                    validateOnMount={true}
                    onSubmit={(values:any) => {
                     this.createSuggestion(values)
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                      <Form translate="yes" className="commonForm CreateClassifiedFrm">
                        <h5 className="frm-title incident-preview-title"></h5>
                        <Box className='formGroup'>

                        <Box
                            className="formInputGrp"
                          >


                            <Field
                              className="formInput"
                              name="title"
                              placeholder={"Suggestion Title"}

                            />
                            <span className="frmLeftIcons">
                              <img src={Book} />
                            </span>
                          </Box>

                          {errors.title && touched.title ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="title" />
                            </Typography>
                          ) : null}
                        <Box className="formGroup customSelect">
                          <FormControl variant="outlined" >
                            <span className="frmLeftIcons">
                              <img src={Layout} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                              name="relatedTo"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              style={{ paddingLeft: 50 }}
                              
                              placeholder='Suggestion is related to'
                              onChange={(e) => {
                                (e.target.value != "") && setFieldValue("relatedTo", e.target.value)
                              }}
                              value={values.relatedTo}
                            >
                              <MenuItem disabled value=" ">
                              Suggestion is related to
                              </MenuItem>
                              {
                                this.state.realtedData.map((item:any)=><MenuItem value={item.attributes.id}>{item.attributes.related_to}</MenuItem>)
                              }
                             
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="relatedTo" />
                          </FormControl>
                        </Box>
                        <Box
                            className="formInputGrp"
                          >


                            <textarea
                            rows={10}
                              className="formInput"
                              name="description"
                              placeholder={"Add Description"}
                              style={{height:'7rem !important'}}

                            />
                            <span className="frmLeftIcons">
                              <img src={Clipboard} style={{top:'1rem'}}/>
                            </span>
                          </Box>

                          {errors.description && touched.description ? (
                            <Typography
                              style={{
                                color: "#F14E24",

                                fontWeight: 300,
                                fontSize: 14,
                                marginTop: 5,
                                marginLeft: 10
                              }}
                            >
                              <ErrorMessage className="text-error" component="Typography" name="description" />
                            </Typography>
                          ) : null}
                        
                        <Box className="customButton" style={{marginTop:'29rem'}}>
                          <Button variant="contained" type="submit">submit</Button>
                        </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
             
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(Suggestion)
