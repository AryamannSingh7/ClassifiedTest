import React from 'react';
//components
import {
  Box,
  Button,
  Grid,
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

class Suggestion extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
     this.getSuggtionListing()
  }
  render() {
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => this.redirectToDashboard()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incidents</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                   

                    

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    {
                      this.state.suggestionList.map((item:any)=>{
                return  <Box className='suggestion-card' style={{marginTop:'1rem'}}>
                    <p>{item?.attributes?.title}</p>
                    <br/>
                    <p>
                    {item?.attributes?.description}  
                    </p>

                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={Claender}/>
                      <p>
                      21-06-22
                      </p>
                      </div>
                      <p>
                        {
                          item?.attributes?.reponse?.length
                        }
                      {
                        item?.attributes?.reponse && <>Response</>
                      }
                      </p>
                    </div>

                   </Box>

                      })
                    }
                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                     this.props.history.push("/CreateIncident") }} >ADD NEW SUGGESTION</Button>
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

export default withRouter(Suggestion)
