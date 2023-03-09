import React from "react";
//components
import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
  FormControl,
  Select,
  MenuItem,
  InputAdornment, withStyles,
} from "@material-ui/core";

//resources
import {buildingImg, userBlue,CarLogo} from "./assets";
import { withRouter } from 'react-router';
import { Formik, Form, ErrorMessage } from "formik";
import Loader from "../../../components/src/Loader.web";
import ManagerController from "./ManagerController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import { ReportsStyleWeb } from "../../StoreCredits/src/ReportsStyle.web";
import SearchIcon from "@material-ui/icons/Search";
import '../../../web/src/i18n.js';
import { SearchIconImage } from "../../ExpenseTracking/src/assets";
class ManagerList extends ManagerController {
  //@ts-ignore
  //@ts-nocheck
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    this.getBuildingName();
    this.getVehicle()

  }

  render() {
    //@ts-ignore
  //@ts-nocheck
    const {t,classes} = this.props
    //console.log("getRegistrationRequest===================>",building_name ,apartment_name);
    return (
      <>
        <Box style={{ background: "#F7F9FE" }} className={classes.reportList}>
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
                      {t("My Dashboard")} / {t("General Dashboard")} / <Box component="span" style={{ color: "blue" }}>{t('Vehicles')}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoardBudget.subHeading} >{t("Vehicles")}</Typography>
                  </Box>
                </Box>
                {/* <Formik
                  initialValues={{
                    buildingName: " ",
                    unit: " ",
                    status: " ",
                  }}
                  validationSchema={this.searchIncidentSchema()}
                  validateOnMount={true}
                  //@ts-ignore
              //@ts-nocheck
                  onSubmit={(values:any) => this.getVehicle2(values)
                  }
                >
                  {({ values, touched, errors, isValid, setFieldError, setFieldValue, handleChange }) => (
                    <Form translate="yes" className="commonForm">
                      <Box className="sorting-header">
                        <Box className="formGroup1 customSelect ">
                          <FormControl variant="outlined" style={{ width: '12rem' }}>
                            <Select
                              name="status"
                              labelId="demo-simple-select-outlined-label"
                              className="select-input"
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("status", e.target.value)
                              }}
                              value={values.status}
                            >
                              <MenuItem value=" " >
                                {t("Status")}
                              </MenuItem>
                              <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>
                              <MenuItem value="Pending Approval">
                                {t("Pending")}
                              </MenuItem>
                              <MenuItem value="Approved">
                                {t("Approved")}
                              </MenuItem>
                              <MenuItem value="Rejected">
                                {t("Rejected")}
                              </MenuItem>

                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="status" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup1 customSelect">
                          <FormControl variant="outlined" style={{width:'12rem'}} >
                            <Select
                              name="selectBuilding"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              onChange={(e) => {
                                //@ts-ignore
              //@ts-nocheck
                                (e.target.value != " ") && setFieldValue("buildingName", e.target.value) && this.handleChange(e)

                              }}
                              value={values.buildingName}
                            >
                              <MenuItem disabled value=" " >
                                {t("Select Building")}
                              </MenuItem>
                              <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>
                              {
                                this.state?.buildingNameData?.map((val:any, index:any) => (
                                  <MenuItem
                                    key={index}
                                    value={`${val?.id} ${val?.attributes.name}`}
                                  >
                                    {val?.attributes.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="buildingName" />
                          </FormControl>
                        </Box>
                        <Box className="formGroup1 customSelect">
                          <FormControl variant="outlined" style={{ width: '12rem' }} >
                            <Select
                              name="unit"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              onChange={(e) => {
                                (e.target.value != " ") && setFieldValue("unit", e.target.value)
                              }}
                              value={values.unit}
                            >

                                  <MenuItem disabled value=" " >
                                    {t("Select Unit")}
                                  </MenuItem>
                                  <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>

                              {    this.state?.allUnit?.map((val:any, index:any) => (
                                    <MenuItem
                                      key={index}
                                      value={val?.apartment_name}
                                    >
                                      {val?.apartment_name}
                                    </MenuItem>
                                  ))}


                            </Select>
                            <ErrorMessage className="text-error" component="Typography" name="unit" />
                          </FormControl>
                        </Box>

                        
                        <Button className='btnMy' variant="contained" type="submit"style={{ backgroundColor: "#2D6EED",
   padding:"9px 10px",height:'3.3rem'}}><InputAdornment position="start" style={{color:'white'}}>
                                <SearchIcon />
                              </InputAdornment>{t("Search")}</Button>
                      </Box>
                    </Form>
                  )}
                </Formik> */}
 <Box className="filter">
 <Select
                              name="status"
                              labelId="demo-simple-select-outlined-label"
                              className="select-input"
                              displayEmpty 
                              onChange={(e) => {
                                (e.target.value != " ") && this.handleChange(e)
                              }}
                            >
                              <MenuItem value=" " >
                                {t("Status")}
                              </MenuItem>
                              <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>
                              <MenuItem value="Pending Approval">
                                {t("Pending")}
                              </MenuItem>
                              <MenuItem value="Approved">
                                {t("Approved")}
                              </MenuItem>
                              <MenuItem value="Rejected">
                                {t("Rejected")}
                              </MenuItem>

                            </Select>
                    <Select
                              name="selectBuilding"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              displayEmpty className="select-input"
                              onChange={(e) => {
                                //@ts-ignore
              //@ts-nocheck
                                (e.target.value != " ")&& this.handleChange(e)

                              }}
                            >
                              <MenuItem disabled value=" " >
                                {t("Select Building")}
                              </MenuItem>
                              <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>
                              {
                                this.state?.buildingNameData?.map((val:any, index:any) => (
                                  <MenuItem
                                    key={index}
                                    value={`${val?.id} ${val?.attributes.name}`}
                                  >
                                    {val?.attributes.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                    <Select
                              name="unit"
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              displayEmpty className="select-input"
                              onChange={(e) => {
                                (e.target.value != " ") && this.handleChange(e)
                              }}
                             
                            >

                                  <MenuItem disabled value=" " >
                                    {t("Select Unit")}
                                  </MenuItem>
                                  <MenuItem value="All" >
                                {t("All")}
                              </MenuItem>

                              {    this.state?.allUnit?.map((val:any, index:any) => (
                                    <MenuItem
                                      key={index}
                                      value={val?.apartment_name}
                                    >
                                      {val?.apartment_name}
                                    </MenuItem>
                                  ))}


                            </Select>
                    <Button startIcon={<img src={SearchIconImage} />} onClick={() => this.getVehicle2(this.state.status,this.state.selectBuilding,this.state.unit)}>
                      {t("Search")}
                    </Button>
                  </Box>
             <Grid container>
              <Grid xs={12}>

                    {
                      this.state.allVehcile.length >= 0 &&
                        <>
                          <Grid container spacing={2} style={{marginLeft:"0px"}}>
                            {
                              this.state.allVehcile.map((item, i) => <>
                                <Grid md={4} sm={6} xs={12} >
                                  <div className="card" style={{ cursor: 'pointer',width:"96%",background:'white' }} onClick={() => this.addVehicle(item)}>
                                    <div className="customButton status1" style={{width:'fit-content',margin:'1rem'}}>
                                      <Button variant="contained" className={item.attributes.status === 'Pending Approval' ? "contain warning" : item.attributes.status === 'Approved' ? 'contain success' : 'contain danger'} type="submit">
                                        {item.attributes.status == 'Pending Approval' ? 'Pending' :item.attributes.status }</Button>
                                    </div>
                                    <div className="card-content" style={{paddingTop: "5px",paddingBottom:"10px"}}>
                                      <Box style={{marginRight:"10px",border:".1px solid #80808042",display:"flex",alignItems:"center",justifyContent:'center',borderRadius:"10px"}}>
                                        <img src={CarLogo} width="90%" style={{height:"25px"}}/>
                                      </Box>
                                      <div className="content" style={{padding:0}}>
                                        <p className="title" style={{padding:'12px 0px 0px 0px',marginBottom:'1px'}}>
                                          {item.attributes.company_name}
                                        </p>
                                        <p className="sub-title">
                                          {item.attributes.model_number}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="details" style={{paddingTop: "5px"}}>
                                      <div>
                                        <div style={{ display: 'flex', fontWeight: 500 }}>
                                          <img src={userBlue.default} width='25' height='25' style={{ marginRight: 10 }} />
                                          <p>   {item.attributes.owner_name}
                                          </p>
                                        </div>
                                        {/* <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                          {item.attributes.owner_name}
                                        </div> */}
                                      </div>
                                      <div>

                                        <div style={{ display: 'flex', fontWeight: 500,marginTop:'0.5rem' }}>
                                          <img src={buildingImg} width='20' height='20' style={{ marginRight: 10,marginLeft:"2px" }} />
                                          <p> {item?.attributes?.apartment_management?.apartment_name || 'N/A'}, {item.attributes?.building_management?.name}</p>
                                        </div>
                                        {/* <div style={{ marginLeft: 35, marginBottom: 20 }}>

                                          {item.attributes.company_name}
                                        </div> */}
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
//@ts-nocheck
//@ts-ignore
export default withTranslation()(withStyles(ReportsStyleWeb)(withRouter(ManagerList)))

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
    marginBottom:"1rem"
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
