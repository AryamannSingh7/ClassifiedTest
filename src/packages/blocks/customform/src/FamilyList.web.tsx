import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, Dialog, DialogActions, Avatar
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, info, NoVehicles } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";

import '../assets/css/style.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FamilyController from "./FamilyController.web";








class FamilyList extends FamilyController {


  async componentDidMount() {

    this.getVehicle()

  }

  render() {
    return (

      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset', overflowY: 'auto', overflowX: 'hidden' }}>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex', alignItems: 'center',borderBottom:'1px solid #0000001f',paddingBottom:'0.25rem',marginBottom:'1rem' }}>
                <ArrowBackIcon onClick={this.redirectToDashboard} className='backtesticon' />
                <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>

                  My Family
                </p>
              </Grid>
            </Grid>



            {
              this.state.allVehcile.length > 0 ?
                <>
                <Grid container style={{height:'85%',overflowX:'auto'}}>
                  {
                      this.state.allVehcile.map(item=><>
                        <Grid xs={12} key={item.id} className="card fam" style={{margin:'0.25rem'}}>
                          <div className="flex">
                            <div style={{display:"flex",alignItems:'center',gap:'0.5rem'}}>

                            <Avatar src={item?.attributes?.member_pic}/>
                            <p className="text-bold">

                              {item.attributes.name}
                            </p>
                            </div>
                            <IconButton
                            className="iconBtntest"
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e)=>this.handleClick(e,item)}
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
                              <MenuItem key={item.id} onClick={() => this.handleClose(item)}>
                                Edit
                              </MenuItem>
                              <MenuItem key={item.id} onClick={() => { this.setState({ showDialogDelete: true });  }}>
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
                        onClick={() =>{
                          //@ts-ignore
                          //@ts-nocheck
                          this.props.history.push("/NewFamily")}}
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

                      <img src={Building1.default} />
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

                    <img src={Building1.default} />
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
          open={this.state.showDialogDelete}
          onClose={() => this.setState({ showDialogDelete: false, showDialog: false })}
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

              {/* <img src={deleteI} /> */}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Delete registered
                <br />
                Family Member
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Are you should want to delete this registered family member from this App?
              </p>
            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button variant="contained" onClick={() => this.deleteRequest()} >
                yes, delete
              </Button>
              <Button onClick={() => this.setState({ showDialogDelete: false, showDialog: false })} variant='text'>
                No, don’t delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Loader loading={this.state.loading} />
      </>

    )

  }

}
//@ts-ignore
      //@ts-nocheck
export default withRouter(FamilyList)
// @ts-ignore
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

          <p style={{ fontWeight: 600, fontSize: '1.25rem',textAlign:'center' }}>
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
          onClick={() => {
            //@ts-ignore
      //@ts-nocheck
            props.history.push("/NewFamily")}}
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

