//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, info, NoVehicles, owner, resident_owner, tenet } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';








class VeichleList extends VeichleListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {

    this.getVehicle()

  }

  render() {
    return (

      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset',}}>
              <Grid container>
                <Grid xs={12} style={{display:'flex',alignItems:'center'}}>
                  <ArrowBackIcon onClick={() => window.history.back()} />
                  <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  My Vehicles
                  </p>
                </Grid>
              </Grid>



              {
                this.state.allVehcile.length>0 ?
                <>
                  <Grid container style={{ height:'79vh',display:'block',overflow:'hidden',overflowY:'auto'}}>
                      {
                        this.state.allVehcile.map((item,i)=><>
                          <Grid xs={12} >
                            <div className="card" style={{ cursor: 'pointer' }} onClick={()=>this.addVehicle(item)}>
                              <div className="status">
                                {item.attributes.status}
                              </div>
                              <div className="card-content">

                                <img src='https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car-with-fire-smoke_110488-1759.jpg' style={{ marginRight: 5 }} />
                                <div className="content">
                                  <p className="title">
                                    {item.attributes.company_name}
                                  </p>
                                  <p className="sub-title">
                                    {item.attributes.model_number}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Grid>


                        </>)
                      }

                      </Grid>
                    <Grid container >
                      <Grid xs={12}>
                        <Button
                          fullWidth={true}
                          className={'btn'}
                          variant="contained"
                          onClick={()=>this.checkVehicle()}
                          style={{
                            backgroundColor: "#2B6FEC",
                            borderRadius: 16,
                            height: 54,
                            marginBottom: 14,
                            boxShadow: "none",
                            color: "#F7F7FC",
                            fontWeight: 600,
                            fontSize: 16,
                            marginTop: 30,

                          }}

                        >
                          REGISTER ANOTHER VEHICLE
                        </Button>
                      </Grid>
                    </Grid>
                </>
                :
                <div >
                  <NoVehicle props={this.props} />
                  </div>
              }
              {/* <Grid container>
                <Grid xs={12}>
                  <div className="card">
                    <div className="status">
                      Pending Approval
                    </div>
                    <div className="card-content">

                      <img src={building1.default} />
                      <div className="content">
                        <p className="title">
                          Dubai 60833
                        </p>
                        <p className="sub-title">
                          Bentley SUV WHite
                        </p>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid xs={12}>
                  <div className="card">
                    <div className="status">
                      Pending Approval
                    </div>
                    <div className="card-content">

                    <img src={building1.default} />
                    <div className="content">
                      <p className="title">
                        Dubai 60833
                      </p>
                      <p className="sub-title">
                        Bentley SUV WHite
                      </p>
                    </div>
                    </div>
                  </div>
                </Grid>

              </Grid> */}


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

              <img src={info} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem',textAlign:'center' }}>
                Unable to add vehicle
                <br />
                request
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Sorry! You have reached the maximum number of of vehicles. consider removing some vehicles to be able to add new ones.
              </p>
            </Grid>
          </Grid>
          <Grid container >
            <Grid xs={12} style={{display:'flex',justifyContent:'center'}}>
              <Button
                fullWidth={true}
                className={'btn'}
                variant="contained"
                type="submit"
                onClick={() => this.setState({ showDialog: false })}
                style={{
                  backgroundColor: "#2B6FEC",
                  borderRadius: 16,
                  height: 54,
                  marginBottom: 14,
                  boxShadow: "none",
                  color: "#F7F7FC",
                  fontWeight: 600,
                  fontSize: 16,
                  marginTop: 30,
                  maxWidth:'14rem'
                }}

              >
                okay, got it
              </Button>
            </Grid>
          </Grid>
          </Dialog>
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
export default withRouter(VeichleList)

function NoVehicle({props}){
return <>
<div style={{height:'81vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>

  <Grid container>
    <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:10 }}>

      <img src={NoVehicles} />
    </Grid>
  </Grid>
  <Grid container>
    <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

      <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
        No Vehicle
        <br />
        Registered
      </p>
    </Grid>
  </Grid>
  <Grid container>
    <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
      <p style={{ fontWeight: 400, fontSize: '0.8rem',textAlign:'center' }}>
        Looks like you havn’t registered any vehicle!
        You can register a new vehicle by tapping the below button.
      </p>
    </Grid>
  </Grid>
</div>
  <Grid container >
    <Grid xs={12} style={{display:'flex',justifyContent:'center'}}>
      <Button
        fullWidth={true}
        className={'btn'}
        variant="contained"
        type="submit"
        onClick={() => props.history.push("/newVeichleList")}
        style={{
          backgroundColor: "#2B6FEC",
          borderRadius: 16,
          height: 54,
          boxShadow: "none",
          color: "#F7F7FC",
          fontWeight: 600,
          fontSize: 16,
          maxWidth:350
        }}

      >
        REGISTER VEHICLE
      </Button>
    </Grid>
  </Grid>
</>
}

