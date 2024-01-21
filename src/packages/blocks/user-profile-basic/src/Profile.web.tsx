import * as React from "react";
// custom components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  Menu,
  MenuItem,
  CardActionArea,
} from "@material-ui/core";
import {Chat_Disable_Icon, Chat_Icon, Contact_Icon,  Email_Msg_Icon, FB_Icon, Instagram_Icon, NoProfile_Img,  Pencil, Snapchat_Icon, Twitter_Icon } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import '../assets/css/style.scss';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileController from "./ProfileController.web";
import AlertErrorWeb from "../../../components/src/AlertError.web";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import { Menu, MenuItem } from "@szhsin/react-menu";
import { withTranslation } from "react-i18next";
import { DeleteIcon, Building1, NoClassifiedIcon, Setting_Icon, Filter_Icon } from "../../ContentManagement/src/assets";
import ClassifiedController, { Props } from "../../ContentManagement/src/ClassifiedController.web";

class Profile extends ClassifiedController {



  render() {

    return (

      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-header">
                <Box className="left-block blocks">
                  <Box className="backIcons BackArrow" onClick={this.redirectToDashboard}><KeyboardBackspaceIcon/></Box>
                  <h4 className="Heading">Classifieds</h4>
                </Box>
                {
                  this.state?.myOrAllClassified ?
                    <Box className="incident-right-block blocks">
                      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick_1(e)}>
                        <img src={Filter_Icon} className="filter-icon icons" alt="" />
                      </Button>
                      <Menu
                        id="fade-menu"
                        anchorEl={this.state.anchorEl_1}
                        keepMounted
                        open={Boolean(this.state.anchorEl_1)}
                        onClose={() => this.handleClose_1("", "")}
                      >
                        <MenuItem onClick={(e) => this.handleClose_1(e, "seller")}>Sell</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose_1(e, "buyer")}>Buy</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose_1(e, "generic")}>Generic</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose_1(e, "All")}>All</MenuItem>
                      </Menu>

                    </Box>
                    :
                    null
                }
            </Box>
            <Box className="common_content_block content-block">
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <div className="classified-header">
                      <Box className={this.state?.myOrAllClassified ? "customButton" : "customButton btn-gray"}>
                        <Button variant="contained" onClick={() => this.getClassifiedListing(this.state.status)}>All Classifieds</Button>
                      </Box>
                      <Box className={this.state?.myOrAllClassified ? "customButton btn-gray" : "customButton"}>
                        <Button variant="contained" onClick={() => this.getMyClassifiedList()}>My Classifieds</Button>
                      </Box>
                    </div>
                    {
                      this.state?.classifiedListing?.length === 0 ?
                        <>
                          <Box className='no-classification-wrapper'>
                            <Box className='no-classification'>
                              <img src={NoClassifiedIcon} className="lock-logo" alt="Lock_Icon" />
                              <h1>No classifieds were <br></br>found</h1>
                              <p>Looks like you havn’t added any classifieds! You can create a new request by tapping the below button.</p>
                            </Box>
                          </Box>
                        </>
                        :
                        this.state?.classifiedListing?.map((val: any, index: any) => (
                          <>
                            {
                              this.state?.myOrAllClassified ?
                                null
                                :
                                <Box className="classifiedCardRow">
                                  {/* <IconButton onClick={(e: any) => { this.handleClick(e, val?.attributes?.id) }} style={{ padding: "5px" }}>
                                    <MoreVertIcon style={{ color: "#000000", fontSize: "1.8rem" }} />
                                  </IconButton> */}
                                  <Button className="menu-btn" aria-controls="simple-menu" onClick={(e: any) => { this.handleClick(e, val?.attributes?.id,val?.attributes?.classified_type) }}>
                                    <img src={Setting_Icon} className="grid-icon icons" alt="" />
                                  </Button>
                                  <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={() => this.handleClose("", "")}
                                  >
                                    <MenuItem onClick={(e) => this.handleClose(e, "edit")}>Edit</MenuItem>
                                    <MenuItem onClick={(e) => this.handleClose(e, "delete")}>Delete </MenuItem>
                                  </Menu>
                                </Box>
                            }
                            <Card className="classified-card card" key={val?.attributes?.id} >
                              <CardContent className="costom-card-content" onClick={(e: any) => { this.getClassifiedDetails(e, val.id) }}>
                                <Box className="classified-card-header">
                                  <Typography component="h4">
                                    {val?.attributes?.title}
                                  </Typography>

                                </Box>
                                <Typography className="" component="h5">
                                  {val?.attributes?.description}
                                </Typography>
                                { val?.attributes?.classified_type === "seller" ?
                                   <Typography component="span">
                                   Available to sell:
                                 </Typography>
                                 :
                                 val?.attributes?.classified_type === "buyer" 
                                 ?
                                 <Typography component="span">
                                 Available to buy:
                               </Typography>
                                :
                                <Typography component="span">
                                Available :
                              </Typography>
                                }
                                <Typography className="" component="h5">
                                  {val?.attributes?.duration_from} to {val?.attributes?.duration_to}
                                </Typography>
                                <hr />
                                <Box className="card-footer classified-footer">
                                  {
                                    val?.attributes?.classified_type === "buyer" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.price_from} {val?.attributes?.currency?.currency} - {val?.attributes?.price_to} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }

                                  {
                                    val?.attributes?.classified_type === "generic" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.payment_detail} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }

                                  {
                                    val?.attributes?.classified_type === "seller" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.price} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }



                                  {
                                    val?.attributes?.classified_type === "buyer" ?
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain success" type="submit" >Buy</Button>
                                      </Box>
                                      :
                                      (val?.attributes?.classified_type === "generic") ?
                                        <Box className="customButton">
                                          <Button variant="contained" className="contain blue" type="submit" >Generic</Button>
                                        </Box>
                                        :
                                        <Box className="customButton">
                                          <Button variant="contained" className="contain danger" type="submit" >Sell</Button>
                                        </Box>
                                  }
                                  <StatusButton val ={val}/>
                                </Box>
                              </CardContent>
                            </Card>
                            {/* </Box> */}
                          </>
                        ))
                    }
                  </Box>
                </Box>
                {
                  this.state?.myOrAllClassified ?
                    null
                    :
                    <Box className="footer-block desktop-ui">
                      <Box className="customButton add-incident">
                        <Button variant="contained" onClick={() => {
                          this.setState({ loading: true });//@ts-ignore
                          this.props.history.push("/ClassifiedType")
                        }} >{this.state?.classifiedListing?.length === 0 ? 'Add Classified Request'
                          :
                          'ADD Classified'}</Button>
                      </Box>
                    </Box>
                }
              </Box>
              
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Loader loading={this.state.loading} />

        {/* <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} /> */}
      </>
    )
  }
}

// @ts-ignore
// @ts-nocheck
export default withTranslation()(withRouter(Profile));



const StatusButton = (props:any) => {
  const val =props?.val;
  return(
    <>
             <Box className="customButton">
              <Button variant="contained" className={val?.attributes?.classified_status === 'Pending Approval' ? "contain" : val?.attributes?.classified_status === 'Published' ? 'contain success' : 'contain danger'} type="submit">
              {val?.attributes?.classified_status}</Button>
            </Box>
  </>
  )
}