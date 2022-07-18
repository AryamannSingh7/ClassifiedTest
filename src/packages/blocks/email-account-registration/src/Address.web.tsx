// @ts-ignore
// @ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, ListItemIcon, ListItemText, DialogContent, Dialog, DialogTitle, DialogActions
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InboxIcon from '@material-ui/icons/Inbox';
import { building, city, country, modalbuilding, search, unit } from "./assets";
import { withRouter } from 'react-router';



class Address extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
    // Customizable Area Start
  componentDidMount() {

    this.getCountry()

  }
    // Customizable Area End
  render() {
    return (
      <>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <ArrowBackIcon />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Select Building and Unit

            </p>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left">
              Please select the unit you would like to link with your account.If you have more than one Unit you can link the other ones later on.
            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <FormControl variant="outlined" fullWidth >
              <InputLabel id="demo-simple-select-outlined-label" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                <img src={country}/>
                Country</InputLabel>
              <Select
                name='selectCountry'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="Country"
                style={{ borderRadius: 25, border: '0px solid #e9dede', color:'#b5b5b5' }}
              >
               {/* <MenuItem>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  </MenuItem> */}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.allContries && this.state.allContries.map((item) =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>

                )
                }

              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <FormControl variant="outlined" fullWidth>

              <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={city} />
                City</InputLabel>
              <Select
                name='selectCity'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="City"
                style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
              >
                <MenuItem value="f">
                  <em>None</em>
                </MenuItem>
                {this.state.allCity && this.state.allCity.map((item) =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>

                )
                }

              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box className="commonForm">
          <Box className="formGroup">
            <Box
              className="formInputGrp"
            >

              <Select options={this.state.allComplex} className="formInput" style={{ border: 'none' }} placeholder="Search Complex" onChange={this.handleInputChange} />

              <span className="frmLeftIcons" style={{ top: '1.5rem' }}>
                <img src={search} />
              </span>
            </Box>
          </Box>
        </Box>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={building} />
                Building</InputLabel>
              <Select
                name='selectBuilding'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="Building"
                style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
              >
                <MenuItem value="f">
                  <em>None</em>
                </MenuItem>
                {this.state.allBuilding && this.state.allBuilding.map((item) =>
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

                )
                }

              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={unit} />Unit</InputLabel>
              <Select
                name='selectUnit'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="Unit"
                style={{ borderRadius: 25, border: '0px solid #e9dede', color: '#b5b5b5' }}
              >
                <MenuItem value="f">
                  <em>None</em>
                </MenuItem>
                {this.state.allUnit && this.state.allUnit.map((item) =>
                  <MenuItem key={item.id} value={item.id}>{item.apartment_name}</MenuItem>

                )
                }

              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%', position: 'absolute', bottom: 0 }}>
          <Grid xs={12}>
            <Button
            // onClick={this.createRequest}
              onClick={() => { this.setState({ showDialog: true }) }}
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
                marginTop: 30,
                width:'100%'
              }}
            >
              Next
            </Button>
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
          <Box className="diloag-body">
            <Box className="diloag-header">
              <img src={building} className="tenet-logo" alt="" />
              <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                Are you sure you want to register unit?
              </DialogTitle>
              <p>Are you sure that you want to delete the regestration request for the unit ({this.state.selectUnit}) of {this.state.selectBuilding}.</p>
            </Box>
            <Box className="dialog-footer desktop-ui">
              <DialogActions className="customButton">
                <Button variant="contained" onClick={() => this.createRequest()} >
                  Yes Register
                </Button>
                <Button onClick={() => this.setState({ showDialog: false })}  variant='text'>
                  No, Don’t Regsiter
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </>
    )
  }
}
export default withRouter(Address)
