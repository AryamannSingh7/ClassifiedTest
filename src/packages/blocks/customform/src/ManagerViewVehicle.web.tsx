//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Box, Grid, Typography, Dialog, Avatar, DialogActions , Container, TextField, IconButton
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Car, CarBlue, deleteI, deleteIcon, edit, List, ListCopy, NoVehicles, owner, palette, paletteBlue, Rc, resident_owner, tenet, Tick, user, userBlue } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import { InsertEmoticon } from "@material-ui/icons";
import ManagerController from "./ManagerController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import CloseIcon from '@material-ui/icons/Close';








class ManagerViewVeichle extends ManagerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // this.getVehicle()

  }

  render() {
    let item = JSON.parse(localStorage.getItem('selectCar'))
    return (

      <>
        <Box style={{ background: "#fffff" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>

            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoardBudget.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      My Dashboard / General Dashboard / Vehicles /<Box component="span" style={{ color: "blue" }}>Vehicle Details</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoardBudget.subHeading}>Vehicles Details</Typography>
                  </Box>
                </Box>

        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={12} className="auth-cols" style={{ justifyContent: 'unset' }}>

            <div>


              <Grid container>
                <Grid xs={12}>
                  <div className="card" style={{ padding: '2rem' }}>
                    <div className="card-top">
                      <h4>
                                {item.attributes.company_name}
                      </h4>
                    <div className="status" style={{fontWeight:600}}>
                      {item.attributes.status}
                    </div>
                    </div>
                  <div className="details">
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500,alignItems:'center' }}>
                          {/* <img src={userBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p >   Owner Name :</p>  <p style={{ marginLeft: 10, fontWeight: 600 }}>
                                    {item.attributes.owner_name}
                                    </p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.owner_name} */}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          {/* <img src={CarBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Building Name:</p>   <p style={{ marginLeft: 10, fontWeight: 600 }}>
      {item.attributes.building_management.name}
                                  </p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.company_name} */}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          {/* <img src={List} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Unit Number:</p>   <p style={{ marginLeft: 10, fontWeight: 600 }}>
                                    {item.attributes.apartment_management.apartment_name}
                                  </p>
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.plate_number} */}
                        </div>
                      </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Manufacturer:</p>
                                  <p style={{ marginLeft: 10, fontWeight: 600 }}>

                                        {item.attributes.company_name}
                                  </p>
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Model:</p>
                                  <p style={{ marginLeft: 10, fontWeight: 600 }}>

                                       {item.attributes.model_number}
                                  </p>
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Color:</p>
                                  <p style={{ marginLeft: 10, fontWeight: 600 }}>

                                     {item.attributes.color}
                                    </p>
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #00000014', borderRadius: 10, padding:'0.5rem 1rem 0.5rem 1rem' }}>
                                <div style={{ display: 'flex',alignItems:'center' }}>

                                <img src={CarBlue}/> <p style={{fontWeight:600,whiteSpace:'nowrap',marginLeft:10}}>Registration Card</p>
                                </div>
                                <Box className="row-btn customButton desktop-ui">
                                  <Button variant="contained" style={{ width: 100 }} onClick={() => this.setState({ showDialogPhoto:true})}>
                                    View
                                  </Button>
                                </Box>
                              </div>

                    </div>
                  </div>


                </Grid>


              </Grid>

              {/* <Grid container>
                <Grid xs={12}>
                  <p style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    ID
                  </p>
                </Grid>
              </Grid> */}
              {/* <Grid container>
                <Grid xs={12}>
                  <img src={Rc} />
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
            </div>
          </Grid>
                  <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
                    <Box className="row-btn customButton desktop-ui">
                      <Button style={{ width: 150, marginRight: 15, borderRadius: 10, border:'1px solid #5000f4' }} onClick={() => this.setState({ showDialogDelete: true })} variant='text' disabled={item.attributes.status == 'rejected'}>
                        Reject
                      </Button>
                    </Box>
                    <Box className="row-btn customButton desktop-ui">
                      <Button variant="contained" style={{ width: 150,borderRadius:10 }} onClick={() => this.setState({ showDialog: true })} disabled={item.attributes.status == 'approved'} >
                        APPROVE
                      </Button>
                    </Box>
                  </div>
        </Grid>

        </Container>
        </Grid>
        </Box>

        </Box>
        <Dialog
          open={this.state.showDialogPhoto}
          onClose={() => this.setState({ showDialogPhoto: false })}
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
          <img src={item.attributes.registration_card_copy} style={{ width: '600px', height: '56rem', borderRadius: 0 }} />
          {/* <iframe src='https://yuppgg-68443-ruby.b68443.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2NEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--670a8cdc5598c28e801317f826ac739e28a142c8/mohit.pdf' style={{ width: '600px', height: '56rem' }} /> */}
          </Dialog>
        <Dialog
          open={this.state.showDialogDelete}
          onClose={() => this.setState({ showDialogDelete: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="diloag-wrapper"
          PaperProps={{
            style: {
              borderRadius: '15px',
              padding: '0rem'
            },
          }}
        >
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #00000029', padding:'0 0.5rem 0px 0.5rem'}}>
              <p style={{fontWeight:'bold'}}>
                Reject Vehicle Request
              </p>
              <IconButton aria-label="close" onClick={()=>this.setState({ showDialogDelete: false })}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} >
              <TextField
              style={{width:'100%'}}
                multiline
                rows={4}
                id="outlined-multiline-static"
                variant="outlined"
                label="add notes"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
              />

            </Grid>
          </Grid>
          <Box className="">
            <DialogActions className="customButton" style={{flexDirection:'row'}}>
              <Button style={{ width: '15rem', borderRadius: 10, border: '1px solid #5000f4' }} onClick={() => this.setState({ showDialogDelete: false })}>
                CLOSE
              </Button>
              <Button variant="contained" style={{borderRadius:10}} onClick={() => this.rejectRequest()} >
                CONFRIM
              </Button>
            </DialogActions>
          </Box>
          </Dialog>
        <Dialog
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

              <img src={Tick} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Approve Vehicle Request

              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Are you sure you want to approve vehicle request ?
              </p>
            </Grid>
          </Grid>
          <Box >
            <DialogActions className="customButton" style={{flexDirection:'row'}}>
              <Button style={{ width: '15rem', borderRadius: 10, border: '1px solid #5000f4' }}   onClick={() => this.setState({ showDialog: false })}>
                CLOSE
              </Button>
              <Button variant="contained" style={{borderRadius:10}} onClick={() => this.acceptRequest()} >
                CONFRIM
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </>

    )

  }

}
export default withRouter(ManagerViewVeichle)
const dashBoardBudget = {
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  YearMain: {
    background: "#fff",
    border: "1px solid #dfd4d4",
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Cards: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 25,
    background: "#fff",
    borderRadius: 10,
    height: 140,
  },
  CardsIcons: {
    border: "1px solid #d9d4d3",
    borderRadius: "50%",
    width: 25,
    height: 25,
    padding: 10,
    color: "#054c94",
  },
  bottomColor: {
    color: "red"
  },
  bottomTwoSpan: {
    display: "flex",
    gap: 5,
    marginTop: 10
  },
  TableHeader: {
    display: "flex",
    borderBottom: "2px solid #e2e2ef",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  TableFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  FooterTotal: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
  },
  cardBottom: {
    display: "flex",
    gap: 10,
    marginRight: 10,
  },
};


