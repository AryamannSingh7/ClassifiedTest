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
import { Building1, NoChat, Search, Tick } from "./assets";
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

  async componentDidMount() {

    this.getInbox()

  }
  displaytime(time:any) {

    let date = new Date(time.attributes.created_at)

    let d = date.getHours();
    let m = date.getMinutes();
    //@ts-ignore
//@ts-nocheck
    return `${d}:${m < 9 ? `0` + m : m} (${moment(time.attributes.created_at).format("DD MMM YYYY")})`

  }


  getLastMessage=(obj:any)=>{
    let value = obj[Object.keys(obj)[Object.keys(obj).length - 1]]
    console.log(value)
    return value[0].message.message || 'he'
  }

  render() {
    return (
      <>
        <Box className="login-wrapper reg-wrapper" style={{margin:0}}>
          <Grid container style={{padding:'0 1rem' }}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'space-between'}}>
          <Box  display='flex' alignItems='center' width={this.state.isSearch ? '7%':'100%'} onClick={() => window.history.back()}>
            <KeyboardBackspaceIcon />
            <span style={{fontWeight:'bold'}}>
             {
                    this.state.isSearch ? '' :'My Chat'
             }
              </span>
          </Box>
              <Box display='flex' alignItems='center' width="100%">

                <Box width="100%" display='flex' style={{gap:'0.5rem'}} justifyContent='end' alignItems='center'>
                {
                    this.state.isSearch ? <> <input autoFocus className="inputbox" onChange={(e) => this.getInboxBySearch(e.target.value)} /> <span onClick={this.handlesearchIcon} style={{ fontWeight: 'bold',cursor:'pointer' }} >X</span></> :
                      <img src={Search} style={{ float: 'right', cursor: 'pointer' }}  onClick={this.handlesearchIcon}/>

                }
              </Box>
              <Box>
                {
                    this.state.isSearch ? '' : <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                }

                <Menu
                  id="long-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={this.state.showDialog}
                  onClose={this.handleClose}


                >
                    <MenuItem key="1" onClick={() => this.setState({ showSuccessModal :true,showDialog:false})}>
                      {
                        this.state.allInbox[0]?.attributes?.chat_with_account_disable_chat ? 'Enable Chat' : 'Disable Chat'
                      }

                  </MenuItem>

                </Menu>
              </Box>
</Box>

            </Grid>
          </Grid>
          <Grid container spacing={2} className="auth-container" style={{ padding: '0 2rem', marginTop: '1rem' }}>
            <Grid item xs={12} md={7}
              className="auth-cols" style={{ justifyContent :'normal'}} >
            {
              this.state.allInbox.length!=0 ?     this.state.allInbox.map(item=>
              <>


                  <Box key={item} display='flex' style={{ gap: '1rem',maxHeight:'5rem',marginTop:'1rem' }} onClick={() => this.openChat(item)}>
                    <img src={item?.attributes?.chat_with_account?.attributes?.profile_pic?.url ||'https://images.freeimages.com/images/large-previews/e04/yellow-frontal-with-ivy-1228121.jpg'} width='50' height='50' style={{ borderRadius: 25 }} />
                    <Box padding='0.25rem'>
                      <h5>
                        {
                          item.attributes.chat_with_account.attributes.full_name || 'N/A'
                        }

                      </h5>
                      <p>

                        {
                          Object.keys(item.attributes.messages).length !=0 && this.getLastMessage(item.attributes.messages)
                        }
                      </p>
                    </Box>
                  </Box>

              </>
              
              )
              :
              <div>
                No chat 
              </div>
            }
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          open={this.state.showSuccessModal}
          onClose={() => this.setState({ showSuccessModal: false })}
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

              <img src={NoChat} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <p style={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Disabled Chat Functionality?

              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                Are you sure want to disabled chat functionality? No one will be able to send you any messages while it is disabled.
              </p>
            </Grid>
          </Grid>
          <Box className="dialog-footer desktop-ui">
            <DialogActions className="customButton">
              <Button variant="contained" onClick={() => this.disablechat()}   >
                Yes Disable
              </Button>
              <Button variant='text' onClick={() => this.setState({ showSuccessModal: false })}>
                No, don’t disable
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        < Loader loading={this.state.loading} />
      </>
    );
  }
}
//@ts-ignore
//@ts-nocheck
export default withRouter(Inbox)

// Customizable Area End
