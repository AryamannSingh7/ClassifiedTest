import React from 'react';
//components
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from "@material-ui/core";

//resources
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
//Customizable Area End

//resorces
import SuggestionController,{Props} from './SuggestionController.web';
import { Building1 } from '../../ContentManagement/src/assets';
import { Claender } from './assets';

class ResponseSuggestion extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }
//   componentDidMount():any {
//      this.getSuggtionListing()
//   }
render() {
  const data:any = JSON.parse(localStorage.getItem('selectSuggestion')!)
 console.log(data)
  return (
    <>
      <Box className="login-wrapper incident-wrapper">
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols">
            <Box className="content-block" style={{height:'100%',display:'block'}}>
              <Box className="content-header">
                <Box className="left-block blocks">
                  <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                  <h4>Response</h4>
                </Box>
                <Box className="incident-right-block blocks">
                 
               

                </Box>
              </Box>
              <Box className="content-block-wrapper common-incident-block" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'95%',background:'#F8F9FE'}}>
                <Box style={{paddingTop:'5rem'}}>

                  <Box style={{display:'flex',justifyContent:'space-between'}}>

              <Typography className="sub-title h5-title" component="h5" style={{fontWeight:600}}>
              {data?.attributes?.title}
                  </Typography>
                 
                  </Box>
                 
                  <br/>
                  <Box>
                  
                  <Typography className="sub-title h5-title" component="h5">
                  {data?.attributes?.description}
                  </Typography>
                  </Box>

                  <br/>
               
               <Box>
               {
                      data?.attributes?.response.length>0 && 
                      data?.attributes?.response.map((item:any)=><>
                       <Card>
                      <Box className="response" style={{padding:'2rem'}}>
                        <p>
                          Response By: <span>{data?.attributes?.sent_by?.name || 'N/A'}</span>
                        </p>
                        <pre>{item}</pre>
                      </Box>
                    </Card>
                      </>)
                   
                    }
               </Box>
      
                </Box>





                  
                <Box className="customButton add-incident">
              
                <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                window.history.back() }} >Close</Button>
                </Box>
              </Box>
              {/* <Box className="footer-main-block bottomBlock">
                <h6 className="bottom-text">POWERED BY</h6>
                <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
              </Box> */}
            </Box>
          </Grid>
          {/* desktop footer block */}
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

export default withRouter(ResponseSuggestion)
