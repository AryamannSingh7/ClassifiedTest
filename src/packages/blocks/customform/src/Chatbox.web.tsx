import React from "react";
import { StyleSheet, Platform } from "react-native";
import {
  Grid,
  Box,
  Divider,
  TextField,
  Fab,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Modal,
} from "@material-ui/core";
import { withRouter } from "react-router";
import SendIcon from "@material-ui/icons/Send";
import Loader from "../../../components/src/Loader.web";
import moment from "moment";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';




// import { backIcon, logo, newMessage, pdfIcon } from "./assets";
import { Formik, Form, Field } from "formik";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InboxController,{Props} from "./inboxController.web";
import '../assets/css/style.scss'
import { info } from "./assets";

class ChatBox extends InboxController {
  constructor(props: Props) {
    const messagesEndRef = React.createRef()
    super(props);
    this.handleClick1 = this.handleClick1.bind(this);


    // Customizable Area Start
    // Customizable Area End
  }

  handleClick1(e:any) {
    console.log(e)
    //@ts-ignore
//@ts-nocheck
    this.refs.fileUploader.click();
  }

  handleFile2(file:any) {
    //@ts-ignore
//@ts-nocheck
    this.setState({ selectedMedia: { url: URL.createObjectURL(file), mimetype: file.type }, accept: true, file: file },)

  }

  // Customizable Area Start
  // Customizable Area End

  _handleKeyDown(e:any) {
    if (e.key === 'Enter') {
      this.createMessages()

    }
  }


  async componentDidMount() {
this.getAllChat()

  }

   dateToFromNowDaily( myDate:any ) {

    // get from-now for this date
    var fromNow = moment.utc( myDate ).fromNow();
console.log(moment( myDate ).calendar())
    // ensure the date is displayed with today and yesterday
    return moment( myDate ).calendar( null, {
        // when the date is closer, specify custom values
        lastWeek: '[Last] dddd',
        lastDay:  '[Yesterday]',
        sameDay:  '[Today]',
        nextDay:  '[Tomorrow]',
        nextWeek: 'dddd',
        // when the date is further away, use from-now functionality             
        sameElse: function () {
            return "[" + fromNow + "]";
        }
    });
}

  displaytime(time: any) {
    

    let date = new Date(time|| Date.now())

    let d = date.getHours();
    let m = date.getMinutes();
    //@ts-ignore
    //@ts-nocheck
    return `${d}:${m < 9 ? `0` + m : m}`

  }

  render() {
    //@ts-ignore
//@ts-nocheck
    const item =JSON.parse(localStorage.getItem('selectedChat') || {})
    const currentAccountId = localStorage.getItem('userId')


    return (
      <div style={{ padding: "0.3rem", backgroundColor: "#ffff",paddingLeft:'0.3rem',marginTop:'1rem'}}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box display='flex' alignItems='center' onClick={() => window.history.back()}>
              <KeyboardBackspaceIcon />
              <span style={{ fontWeight: 'bold' }}>
                {item?.attributes?.chat_with_account?.attributes?.full_name}
              </span>
            </Box>


          </Grid>

          <Grid xs={12}>
            <List style={{ overflowY: "auto", maxHeight: "84vh", minHeight: "84vh" }} >
{/* {
  this.state.allInboxKey ? 'hey':'bye'
} */}
            {this.state.allInboxKey?.length!=0 && this.state.allInboxKey?.map((date, i) => (
                <>

                <Box key={i} display='flex' justifyContent='center'>
                  <p>

                    {
                      i > 1 ? this.dateToFromNowDaily(date) : moment.utc(date).format('MMM-DD-YYYY')
                    }

                  </p>
                </Box>

                {
                  this.state.singleChatRoom[date]?.map((message:any,i:any)=><>


                  <ListItem key={i}>
                    <Grid container>
                      <Grid item xs={12}
                      style={{display:'flex',alignItems:'flex-start',gap:'0.5rem'}}
                      // @ts-ignore
                          style={message.message.account_id == currentAccountId ? { 'display': 'flex', 'justifyContent': 'end', alignItems: 'center' } : { 'display': 'flex', 'justifyContent': 'start', alignItems: 'center' }}
                      >




                      <Box style={{background:'#f6f6f6',borderRadius:'6px',padding:'0.5rem',borderTopRightRadius:0}}>


                        <Typography
                          style={{
                            color: "#081F32",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: 14,
                            marginLeft: 5
                          }}
                        align={
                          message.message.account_id == currentAccountId
                            ? "right"
                            : "left"
                        }
                        >

                        </Typography>


                        {
                              message.message.message.length > 45 ?
                            <>
                              <Typography
                                style={{
                                  color: "#081F32",
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  wordBreak: 'break-all'
                                }}
                                align='left'
                              >
                                    {message.message.message}
                              </Typography>


                            </>

                            :

                            <>
                              <Typography
                                style={{
                                  color: "#081F32",
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  wordBreak: 'break-all'
                                }}
                              >
                                    {message.message.message}
                              </Typography>

                            </>
                        }



                      {
                              message?.message?.images.length !=0 ?
                          <Grid item xs={12}
                          >

                                  <img style={{ 'cursor': 'pointer' }} onClick={() => {//@ts-ignore
//@ts-nocheck
this.setState({ selectedMedia: message.message.images[0] })}} src={message.message.images[0].url} width="75" height="75" />
                          </Grid>
                          :
                          null

                      }

                        <ListItemText
                              secondary={this.displaytime(message.message.created_at)}
                        />
                     </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                  </>)
                }
                </>
              ))}
            </List>

{
  item?.attributes?.chatable?.attributes?.disable_chat ? <>

  <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'0.5rem',background:'rgb(255 226 226)',borderRadius:'6px',boxShadow:'0px 4px 14px #f4f6fb',padding:'0.75rem'}}>
  <img src={info} width='20' height='20'/>
  <p>

  Aryn Hossain has disabled his chat. You won’t be able to send him message unit he enables it.
  </p>
  </div>
  
  </>:


            <Grid container style={{ padding: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>

                <input
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.createMessages()
                    }
                  }}

                  onChange={(e) => this.CreateNewMessage(e)} type="" style={{ border: '1px solid #EDEDED', color: '#726363', borderRadius: 15, padding: 10, width: '100%' }} placeholder="Start a new message" value={this.state.newMessage}/>
                {// @ts-ignore
// @ts-nocheck
<AttachFileIcon onClick={this.handleClick1} for="BtnBrowseHidden" style={{ cursor: 'pointer' }} />}
                <input

                  id="BtnBrowseHidden"
                  type="file"
                  onChange={(e: any) =>
                    this.handleFile2(
                      e.target.files[0]
                    )
                  }
                  style={{
                    position: "absolute",
                    height: "10px",
                    width: "10px",
                    zIndex: 2,
                    cursor: "pointer",
                    opacity: 0
                  }}
                  ref="fileUploader"
                  accept="image/png, image/jpeg, image/jpg,.pdf"
                />
              </Grid>

              <SendIcon style={{ cursor: 'pointer' }} onClick={()=>this.createMessages()} />

            </Grid>

}

          </Grid>
        </Grid>



        <Modal
        //@ts-ignore
//@ts-nocheck

          open={this.state.selectedMedia}
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'column-reverse', justifyContent: 'center' }}
             onClose={() => this.setState({ selectedMedia: null, accept: false })}
          aria-labelledby="alert-Modal-title"
          aria-describedby="alert-dialog-description"
        >
          <div>

            {this.state.selectedMedia?.mimetype !== "application/pdf" ? (
              <Avatar src={this.state.selectedMedia?.url} style={{ width: '300px', height: '26rem', borderRadius: 0 }} />
            ) : (
              <iframe src={this.state.selectedMedia?.url} style={{ width: '300px', height: '26rem' }} />
            )}


            {
              this.state.accept &&
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => this.setState({ selectedMedia: null, accept: false })} style={{
                  marginRight: '2rem', backgroundColor: 'rgb(241, 78, 36)',
                  border: '1px solid rgb(217, 219, 233)',
                  borderRadius: '16px',
                  height: 35,
                  boxShadow: 'none',
                  color: ' rgb(247, 247, 252)',
                  fontFamily: 'Poppins',
                  fontSize: 13,
                  marginTop: 10,
                  // @ts-ignore
// @ts-nocheck
                  marginRight: 10,
                  width: 150
                }}>
                  Cancel
                </button>
                  <button onClick={() => this.setState({ selectedMedia: null, accept: false }, () => this.handleSelectFile(this.state.file))} style={{
                  backgroundColor: '#ffff',
                  border: '1px solid red',
                  borderRadius: '16px',
                  height: 35,
                  boxShadow: 'none',
                  color: ' red',
                  fontFamily: 'Poppins',
                  fontSize: 13,
                  marginTop: 10,
                  marginRight: 10,
                  width: 150
                }}>
                  Send
                </button>
              </div>
            }

          </div>

        </Modal>


      </div>
    );
  }


}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },

  titleWhySignUp: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  title: {
    marginBottom: 2,
    fontSize: 14,
    textAlign: "left",
    marginTop: 16
  },

  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },

  bgDummyPassword: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    opacity: 0.4,
    fontWeight: "bold",
    paddingStart: Platform.OS === "web" ? 0 : 10
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 0,
    padding: 12,
    marginTop: 0
  },

  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true
  },
  passwordShowHide: {
    alignSelf: "center"
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },
  bgMobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    marginTop: 0,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  helperText: { marginTop: 10 }
});
// Customizable Area End
// @ts-ignore
// @ts-nocheck
export default withRouter(ChatBox as React.ComponentType<any>)
