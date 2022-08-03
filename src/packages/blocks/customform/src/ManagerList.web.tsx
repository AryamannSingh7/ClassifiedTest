//@ts-ignore
//@ts-nocheck
import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  FormControl,
  NativeSelect,
  TableBody,
} from "@material-ui/core";

//resources
import { Building1, CarBlue, CarFront, Delete_Icon, Landing_Banner, request, userBlue } from "./assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Loader from "../../../components/src/Loader.web";
import ManagerController from "./ManagerController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
class ManagerList extends ManagerController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    this.getVehicle()

  }

  render() {

    //console.log("getRegistrationRequest===================>",building_name ,apartment_name);
    return (
      <>
        <Box style={{ background: "#E5ECFF" }}>
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
                      My Dashboard / General Dashboard / <Box component="span" style={{ color: "blue" }}>Vehicles</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoardBudget.subHeading}>Vehicles</Typography>
                  </Box>
                </Box>
                  <Box style={{display:'flex'}}>
                    <FormControl className='yearTab' style={dashBoardBudget.YearMain}>
                      <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                        <option value="">None</option>
                        <option value={10}>Pending</option>
                        <option value={20}>Approval</option>

                      </NativeSelect>
                    </FormControl>
                    <FormControl className='yearTab' style={dashBoardBudget.YearMain}>
                      <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                    <FormControl className='yearTab' style={dashBoardBudget.YearMain}>
                      <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                  <Box className="row-btn customButton desktop-ui">
                    <Button variant="contained">
                      Search
                    </Button>
                    </Box>
                    </Box>

             <Grid container>
              <Grid xs={12}>

                    {
                      this.state.allVehcile.length >= 0 &&
                        <>
                          <Grid container >
                            {
                              this.state.allVehcile.map((item, i) => <>
                                <Grid xs={3} style={{ margin: 10 }} >
                                  <div className="card" style={{ cursor: 'pointer',maxWidth:450,background:'white' }} onClick={() => this.addVehicle(item)}>
                                    <div className="status">
                                      {item.attributes.status}
                                    </div>
                                    <div className="card-content">

                                      <img src='https://img.freepik.com/premium-photo/generic-brandless-modern-sport-car-with-fire-smoke_110488-1759.jpg' />
                                      <div className="content">
                                        <p className="title">
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
                                          <img src={userBlue} width='25' height='25' style={{ marginRight: 10 }} />
                                          <p>   Owner Name :</p>
                                        </div>
                                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                          {item.attributes.owner_name}
                                        </div>
                                      </div>
                                      <div>

                                        <div style={{ display: 'flex', fontWeight: 500 }}>
                                          <img src={CarBlue} width='25' height='25' style={{ marginRight: 10 }} />
                                          <p> Car Manufacturer:</p>
                                        </div>
                                        <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                          {item.attributes.company_name}
                                        </div>
                                      </div>
                                      </div>
                                  </div>
                                </Grid>


                              </>)
                            }

                          </Grid>

                        </>

                    }

              </Grid>
             </Grid>
              </Container>
            </Grid>
          </Box>
        </Box>
        < Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(ManagerList)

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
// Customizable Area End
