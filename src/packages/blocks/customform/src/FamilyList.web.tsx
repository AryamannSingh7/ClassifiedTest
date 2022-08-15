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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FamilyController from "./FamilyController.web";








class FamilyList extends FamilyController {
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
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset', overflowY: 'auto', overflowX: 'hidden' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  My Family
                </p>
              </Grid>
            </Grid>



            {
              this.state.allVehcile.length > 0 ?
                <>
                <Grid container>
                  {
                      this.state.allVehcile.map(item=><>
                        <Grid xs={12} className="card fam">
                          <div className="flex">
                            <p className="text-bold">
                              {item.attributes.name}
                            </p>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={this.handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={this.state.showDialog}
                              onClose={this.handleClose}


                            >
                              <MenuItem key="1" onClick={()=>this.handleClose(item)}>
                                Edit
                              </MenuItem>
                              <MenuItem key="2" onClick={()=>this.handleClose(item) }>
                                Delete
                              </MenuItem>
                            </Menu>
                          </div>
                          <div>
                            <p className="fam-label">
                              Relation:
                            </p>
                            <p className="fam-value">
                              {item.attributes.relation.name}
                            </p>
                          </div>
                          <div>
                            <p className="fam-label">
                              ID:
                            </p>
                            <p className="fam-value">
                              {item.attributes.id_number}
                            </p>
                          </div>
                        </Grid>


                      </>)
                  }

                </Grid>
                  <Grid container >
                    <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        fullWidth={true}
                        className={'btn'}
                        variant="contained"
                        type="submit"
                        onClick={() => this.props.history.push("/NewFamily")}
                        style={{
                          backgroundColor: "#2B6FEC",
                          borderRadius: 16,
                          height: 54,
                          boxShadow: "none",
                          color: "#F7F7FC",
                          fontWeight: 600,
                          fontSize: 16,
                          maxWidth: 350
                        }}

                      >
                        Add another family member
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
                  </div>
                </Grid>
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
              <img src={Building1} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
        {/* <Dialog
          open={this.state.showDialog}
          onClose={() => this.setState({ showDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '2rem'
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

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
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
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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
                  maxWidth: '14rem'
                }}

              >
                okay, got it
              </Button>
            </Grid>
          </Grid>
        </Dialog> */}
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
export default withRouter(FamilyList)

function NoVehicle({ props }) {
  return <>
    <div style={{ height: '81vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

          {/* <img src={NoVehicles} /> */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

          <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
            No Family Member
            <br />
            Registered
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
            Looks like you havn’t registered any family Members!
            You can register a new family member by tapping the below button.
          </p>
        </Grid>
      </Grid>
    </div>
    <Grid container >
      <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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
            maxWidth: 350
          }}

        >
          Add member to my family
        </Button>
      </Grid>
    </Grid>
  </>
}

