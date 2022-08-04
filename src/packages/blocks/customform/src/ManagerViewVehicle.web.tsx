//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Box, Grid, Typography, Dialog, Avatar, DialogActions , Container, TextField
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
                      My Dashboard / General Dashboard / Vehicles <Box component="span" style={{ color: "blue" }}>Vehicles Details</Box>
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
                    <div className="status">
                      {item.attributes.status}
                    </div>
                    </div>
                  <div className="details">
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          {/* <img src={userBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p>   Owner Name :</p>  {item.attributes.owner_name}
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.owner_name} */}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          {/* <img src={CarBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Building Name:</p>  Green Villa
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.company_name} */}
                        </div>
                      </div>
                      <div>

                        <div style={{ display: 'flex', fontWeight: 500 }}>
                          {/* <img src={List} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Unit NUmber:</p>   A-101
                        </div>
                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                          {/* {item.attributes.plate_number} */}
                        </div>
                      </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Manufacturer:</p>         {item.attributes.car_company}
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Model:</p>         {item.attributes.model_number}
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>
                              <div>

                                <div style={{ display: 'flex', fontWeight: 500 }}>
                                  {/* <img src={paletteBlue} width='25' height='25' style={{ marginRight: 10 }} /> */}
                                  <p> Car Color:</p>         {item.attributes.color}
                                </div>
                                <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                  {/* {item.attributes.color} */}
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                      <Button style={{ width: 150, marginRight: 15 }} onClick={() => this.setState({ showDialogDelete: true })} variant='text' disabled={item.attributes.status == 'rejected'}>
                        Reject
                      </Button>
                    </Box>
                    <Box className="row-btn customButton desktop-ui">
                      <Button variant="contained" style={{ width: 150 }} onClick={() => this.setState({ showDialog: true })} disabled={item.attributes.status == 'approved'} >
                        Accept
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
              padding: '2rem'
            },
          }}
        >
          <Grid container>
            <Grid xs={12}>
              <TextField
                multiline
                rows={4}
                id="outlined-multiline-static"
                label="add notes"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
              />

            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button onClick={() => this.setState({ showDialogDelete: false })}>
                CLOSE
              </Button>
              <Button variant="contained" onClick={() => this.rejectRequest()} >
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
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button  onClick={() => this.setState({ showDialog: false })}>
                CLOSE
              </Button>
              <Button variant="contained" onClick={() => this.acceptRequest()} >
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

