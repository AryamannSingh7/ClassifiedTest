import React, { PureComponent } from 'react';
import {Box, Grid, Typography} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {withRouter} from "react-router-dom"
import {withTranslation} from "react-i18next";
interface OwnProps {
  t:any;
  history:any;
  location:any;
  match:any;
  name:any;
  link:any;
}

type Props = OwnProps;

class ListingComponent extends PureComponent<Props> {
  render() {
    const {t} = this.props
    return (
        <Grid item xs={12}>
          <Box
              display="flex"
              justifyContent='space-between'
              alignItems="center"
              borderRadius="15px"
              bgcolor="white"
              marginTop='1.5rem'
              padding='1.5rem'
              style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
              onClick={()=>this.props.history.push(this.props.link)}
          >
            <Box style={{minWidth:"100%"}}>
              <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                  {t(this.props.name)}
                </Typography>
                <ArrowForwardIosIcon fontSize="small"/>
              </Box>
            </Box>
          </Box>
        </Grid>
    );
  }
}

export default withTranslation()(withRouter(ListingComponent));
