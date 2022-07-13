// @ts-ignore
// @ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton, ListItemIcon, ListItemText
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
import { building, city, country, unit } from "./assets";



export default class Address extends EmailAccountRegistrationController {
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label" style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                <img src={country}/>
                Country</InputLabel>
              <Select
                name='selectCountry'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="Country"
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
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <Button
            onClick={this.createRequest}
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
      </>
    )
  }
}
