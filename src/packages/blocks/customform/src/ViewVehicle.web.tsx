import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogActions
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, CarBlue, deleteI, deleteIcon, edit, List, ListCopy, NoVehicles, palette, paletteBlue, Rc, user, userBlue } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController,{Props} from "./VeichleListController.web";
import '../assets/css/style.scss';
import { InsertEmoticon } from "@material-ui/icons";








class ViewVeichle extends VeichleListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // this.getVehicle()

  }

  render() {
        // @ts-ignore
    let item = JSON.parse(localStorage.getItem('selectCar')||{})
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
              <Grid container className="main-content-block">
                <Grid xs={12} style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex' ,alignItems:'center'}}>

                  <ArrowBackIcon onClick={() => window.history.back()} />
                  <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                    My Vehicles
                  </p>
                  </div>
                  <div>
                  <img src={edit} style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => this.props.history.push('/editVehicle')} />
                  <img src={deleteIcon} style={{cursor: 'pointer'}} onClick={()=>this.setState({showDialog:true})} />

                  </div>
                </Grid>
              </Grid>
            <div style={{ margin: 'auto' }}>


               <Grid container>
                <Grid xs={12}>
                  <div className="card" style={{padding:'2rem'}}>
                    <div className="status">
                      {item.attributes.status}
                    </div>
                    <div className="card-content">

                      <img src="https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car-with-fire-smoke_110488-1759.jpg" style={{marginRight:5}} />
                      <div className="content" style={{padding:'0px 0px 0px 5px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <p className="title" style={{padding:0,marginBottom:10}}>
                          {item.attributes.company_name}
                        </p>
                        <p className="sub-title">
                          {item.attributes.model_number}
                        </p>
                      </div>
                    </div>

                    <div className="details">
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          <img src={userBlue.default} width='25' height='25' style={{ marginRight: 10 }} />
                          <p>   Owner Name :</p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20, fontWeight: 'bold' }}>

                          {item.attributes.owner_name}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex',fontWeight:500 }}>
                          <img src={CarBlue} width='25' height='25' style={{ marginRight: 10 }} />
                          <p> Car Manufacturer:</p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20, fontWeight: 'bold' }}>

                          {item.attributes.company_name}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex',fontWeight:500 }}>
                          <img src={List} width='25' height='25' style={{ marginRight: 10 }} />
                          <p> Plate Number:</p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20, fontWeight: 'bold' }}>

                          {item.attributes.plate_number}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} />
                          <p> Car Color:</p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20,fontWeight:'bold' }}>

                          {item.attributes.color}
                        </div>
                      </div>
                    </div>
                  </div>


                </Grid>


              </Grid>

              <Grid container>
                <Grid xs={12}>
                  <p style={{ fontWeight: 800, fontSize: '1.25rem',marginBottom:'0.5rem' }}>
                    ID
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={12}>
                  <img src={item?.attributes?.registration_card_copy?.url} width='350'/>
                </Grid>
              </Grid>


              {/*
              <Grid container >
                <Grid xs={12}>
                  <Button
                    fullWidth={true}
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
                    REGISTER ANOTHER VEHICLE
                  </Button>
</Grid>
              </Grid> */}
            </div>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding:'2rem'
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={deleteI} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem',textAlign:'center' }}>
                Delete registered
                <br />
                vehicle Confirmation
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Please select the building you would like to unregister the vehicle from.Upon doing that you may not be able to enter the building with this vehicle
              </p>
            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button variant="contained" onClick={() => this.deleteRequest()} >
                yes, delete
              </Button>
              <Button onClick={() => this.setState({ showDialog: false })} variant='text'>
                No, don’t delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>

    )

  }

}
export default withRouter(ViewVeichle)


