import React from 'react';
//components
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => this.redirectToDashboard()}><KeyboardBackspaceIcon /></Box>
                    <h4>{data?.attributes?.title}</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                   
                 

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                    <Box style={{display:'flex',justifyContent:'space-between'}}>

                <Typography className="sub-title h5-title" component="h5">
                  Suggestion Details
                    </Typography>
                    <Box className="customButton">
                      <Button variant="contained" className="contain blue" type="submit" >1 Response</Button>
                    </Box>
                    </Box>

                    <Box>
                    <Typography className="sub-title h5-title" component="h5">
                    Suggestion is related to: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.suggestion_related?.related_to}
                    </Typography>
                    </Box>
                    <br/>

                    <Box>
                    <Typography className="sub-title h5-title" component="h5">
                    Description: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.description}
                    </Typography>
                    </Box>

                    <br/>

                    <Box>
                    <Typography className="sub-title h5-title" component="h5">
                    Status: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.status}
                    </Typography>
                    </Box>

                    <Box style={{display:'flex',justifyContent:'space-between'}}>

                    <Typography className="sub-title h5-title" component="h5">
                 Sent Details
                    </Typography>
                    
                    
                    </Box>
                    <Box style={{display:'flex',justifyContent:'space-between'}}>

                    <Typography className="sub-title h5-title" component="h5">
<img src={Claender}/> Sent To:
<br/>
{data?.attributes?.sent_by.name|| 'N/A'}
</Typography>
<Typography className="sub-title h5-title" component="h5">
<img src={Claender}/> Sent On:
<br/>
{data?.attributes?.sent_on}
</Typography>


</Box>

                    
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                     this.props.history.push("/newsuggestion") }} >Close</Button>
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
