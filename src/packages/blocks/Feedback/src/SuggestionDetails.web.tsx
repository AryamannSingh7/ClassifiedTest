import React from 'react';
//components
import {
  Box,
  Button,
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
import { Claender, User } from './assets';

class SuggestionDetails extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }

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
                    <h4>{data?.attributes?.title}</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                   
                 

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'95%',background:'#F8F9FE'}}>
                  <Box style={{paddingTop:'5rem'}}>

                    <Box style={{display:'flex',justifyContent:'space-between'}}>

                <Typography className="sub-title h5-title" component="h5" style={{fontWeight:600}}>
                  Suggestion Details
                    </Typography>
                    <Box className="customButton">
                      <Button variant="contained" className={data?.attributes?.response ?"contain green-span":"contain red-span"} type="submit" >{data?.attributes?.response ? data?.attributes?.response?.data.length:'0'} Response</Button>
                    </Box>
                    </Box>
                    <Box style={{border:'1px solid #F3F3F4',borderRadius:15,padding:'1rem'}}>

                    <Box>
                    <Typography  variant="caption">
                    Suggestion is related to: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.suggestion_related?.related_to}
                    </Typography>
                    </Box>
                    <br/>
                    <Box>
                    <Typography  variant="caption">
                    Description: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.description}
                    </Typography>
                    </Box>
                    <br/>
                    <Box>
                    <Typography  variant="caption">
                    Status: 
                    </Typography>
                    <Typography className="sub-title h5-title" component="h5">
                    {data?.attributes?.status}
                    </Typography>
                    </Box>
                    </Box>

                    <Box style={{display:'flex',justifyContent:'space-between'}}>

                    <Typography  className="sub-title h5-title" component="h5" style={{fontWeight:600,marginTop:'2rem'}}>
                 Sent Details
                    </Typography>
                    
                    
                    </Box>
                    <Box style={{display:'flex',justifyContent:'space-between',border:'1px solid #F3F3F4',borderRadius:15,padding:'1rem'}}>

                    <Typography className="sub-title h5-title" component="h5">
<img src={User}/> Sent To:
<br/>
{data?.attributes?.sent_by.name|| 'N/A'}
</Typography>
<Typography className="sub-title h5-title" component="h5">
<img src={Claender}/> Sent On:
<br/>
{data?.attributes?.sent_on} {" "} {data?.attributes?.sent_on_time.slice(0, -3)}
</Typography>


</Box>
                  </Box>





                    
                  <Box className="customButton">
                  {data?.attributes?.response ?
                  
                    <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                    this.props.history.push("/ResponseSuggestion") }} >VIEW RESPONSE</Button>
                    :
                    <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                    window.history.back() }} >Close</Button>
                    
                  }
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

export default withRouter(SuggestionDetails)
