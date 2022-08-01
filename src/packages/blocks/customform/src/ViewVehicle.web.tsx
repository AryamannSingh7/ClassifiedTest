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
import { Building1, Car, deleteIcon, edit, ListCopy, NoVehicles, owner, palette, resident_owner, tenet, user } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import '../assets/css/style.scss';
import { InsertEmoticon } from "@material-ui/icons";








class ViewVeichle extends VeichleListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this.getVehicle()

  }

  render() {
    let item = JSON.parse(localStorage.getItem('selectCar'))
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <div style={{ margin: 'auto' }}>

              <Grid container className="main-content-block">
                <Grid xs={12} style={{display:'flex',justifyContent:'space-between'}}>
                  <div>

                  <ArrowBackIcon onClick={() => window.history.back()} />
                  <p>
                    My Vehicles
                  </p>
                  </div>
                  <div>
                    <img src={edit}/>
                    <img src={ deleteIcon} />

                  </div>
                </Grid>
              </Grid>

               <Grid container>
                <Grid xs={12}>
                  <div className="card">
                    <div className="status">
                      Pending Approval
                    </div>
                    <div className="card-content">

                      <img src={Building1} />
                      <div className="content">
                        <p className="title">
                          Dubai 60833
                        </p>
                        <p className="sub-title">
                          Bentley SUV WHite
                        </p>
                      </div>
                    </div>

                    <div className="details">
                      <div>

                        <div style={{ display: 'flex' }}>
                          <img src={user} />
                          Owner Name :
                        </div>
                        <div style={{ marginLeft: 25 }}>

                          {item.attributes.owner_name}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex' }}>
                          <img src={Car} />
                          Car Manufacturer: :
                        </div>
                        <div style={{ marginLeft: 25 }}>

                          {item.attributes.company_name}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex' }}>
                          <img src={ListCopy} />
                          Plate Number: :
                        </div>
                        <div style={{ marginLeft: 25 }}>

                          {item.attributes.plate_number}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex' }}>
                          <img src={palette} />
                          Car Color: :
                        </div>
                        <div style={{ marginLeft: 25 }}>

                          {item.attributes.color}
                        </div>
                      </div>
                    </div>
                  </div>
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
              <img src={Building1} className="building-logo" alt="" />
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
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <img src={NoVehicles} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
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
            <Grid xs={12}>
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
                  marginTop: 30
                }}

              >
                okay, got it
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </>

    )

  }

}
export default withRouter(ViewVeichle)


