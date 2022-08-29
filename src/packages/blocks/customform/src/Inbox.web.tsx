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
} from "@material-ui/core";

//resources
import { Building1, Delete_Icon, info, Landing_Banner, request, Search, Tick } from "./assets";
import { withRouter } from 'react-router';
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Loader from "../../../components/src/Loader.web";
import VeichleListController from "./VeichleListController.web";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InboxController from "./inboxController.web";
class Inbox extends InboxController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {

    this.getInbox()

  }
  displaytime(time) {

    let date = new Date(time.attributes.created_at)

    let d = date.getHours();
    let m = date.getMinutes();
    return `${d}:${m < 9 ? `0` + m : m} (${moment(time.attributes.created_at).format("DD MMM YYYY")})`

  }
  displayText(data) {
    const { t } = this.props;

    if (data.attributes.body) {
      return data.attributes.body
    } else {
      return t("file")
    }
  }
  displayOtherAccountName(data) {


    if (data.accounts.data.length > 1) {

      return `${data.admin.data.attributes.first_name} `

    } else {

      const id = localStorage.getItem("userId")
      const filteredPeople = data.accounts.data.filter((item) => item.id !== id);


      if (filteredPeople.length) {

        return filteredPeople[0].attributes?.first_name
      } else {
        return ` ${data.admin.data.attributes.first_name}`

      }
    }

    return null;



  }
  displayOtherAccountImage(data) {



    if (data.accounts.data.length > 1) {

      return data.admin.data.attributes.profile_picture

    } else {

      const id = localStorage.getItem("userId")
      const filteredPeople = data.accounts.data.filter((item) => item.id !== id);


      if (filteredPeople.length) {

        return filteredPeople[0].attributes?.profile_picture
      } else {
        return ` ${data.admin.data.attributes.profile_picture}`

      }
    }



  }

  render() {
    return (
      <>
        <Box className="login-wrapper reg-wrapper">
          <Grid container style={{padding:'0 1rem' }}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'space-between'}}>
          <Box  display='flex' alignItems='center' onClick={() => window.history.back()}>
            <KeyboardBackspaceIcon />
            <span style={{fontWeight:'bold'}}>
              My Chat
              </span>
          </Box>
<Box display='flex' alignItems='center'>

              <Box>
                <img src={Search} />
              </Box>
              <Box>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  // onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  // anchorEl={this.state.anchorEl}
                  // keepMounted
                  // open={this.state.showDialog}
                  // onClose={this.handleClose}


                >
                  <MenuItem key="1" >
                    Disable Chat
                  </MenuItem>

                </Menu>
              </Box>
</Box>

            </Grid>
          </Grid>
          <Grid container spacing={2} className="auth-container" style={{ padding: '0 2rem', marginTop: '1rem' }}>
            {
              this.state.allInbox.map(item=><>
                <Grid item xs={12} md={7} className="auth-cols" onClick={()=>this.openChat(item)}>
                  <Box display='flex' style={{ gap: '1rem' }}>
                    <img src='https://images.freeimages.com/images/large-previews/e04/yellow-frontal-with-ivy-1228121.jpg' width='50' height='50' style={{ borderRadius: 25 }} />
                    <Box padding='0.25rem'>
                      <h5>
                        {item?.attributes?.chatable?.attributes?.full_name}

                      </h5>
                      <p>
                        {item?.attributes?.messages[item?.attributes?.messages.length - 1].attributes?.message}
                      </p>
                    </Box>
                  </Box>
                </Grid>
              </>)
            }

            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>


        < Loader loading={this.state.loading} />
      </>
    );
  }
}
export default withRouter(Inbox)

// Customizable Area End
