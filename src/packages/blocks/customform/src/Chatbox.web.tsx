//@ts-ignore
//@ts-nocheck
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
import InboxController from "./inboxController.web";

class ChatBox extends InboxController {
  constructor(props: Props) {
    super(props);
    this.handleClick1 = this.handleClick1.bind(this);
    this.state = {
      selectedMedia: null,
      accept: false,
      file: null

    }


    // Customizable Area Start
    // Customizable Area End
  }

  handleClick1(e) {
    console.log(e)
    this.refs.fileUploader.click();
  }

  handleFile2(file) {
    this.setState({ selectedMedia: { url: URL.createObjectURL(file), mimetype: file.type }, accept: true, file: file },)

  }

  // Customizable Area Start
  // Customizable Area End
  displaytime(time) {
    let date = new Date(time)

    let d = date.getHours();
    let m = date.getMinutes();

    return `${d}:${m < 9 ? `0` + m : m}   (${moment(time).format("DD MMM YYYY")})`

  }
  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.createMessage()

    }
  }



  componentDidMount() {

    this.getAllChat()

  }

  render() {

    const item =JSON.parse(localStorage.getItem('selectedChat'))



    return (
      <div style={{ paddingRight: "0.3rem", backgroundColor: "#ffff" }}>
        <Grid container>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box display='flex' alignItems='center' onClick={() => window.history.back()}>
              <KeyboardBackspaceIcon />
              <span style={{ fontWeight: 'bold' }}>
                {item.attributes.chatable.attributes.full_name}
              </span>
            </Box>


          </Grid>

          <Grid xs={12}>
            <List style={{ overflowY: "auto", minHeight: "84vh" }}>
              {this.state.singleChatRoom && this.state.singleChatRoom.map((message, i) => (
                <>
                  <ListItem key={i}>
                    <Grid container>
                      <Grid item xs={12}
                      style={{display:'flex',alignItems:'flex-start',gap:'0.5rem'}}
                      // style={message.attributes.account_id == currentAccountId ? { 'display': 'flex', 'justifyContent': 'end', alignItems: 'center' } : { 'display': 'flex', 'justifyContent': 'start', alignItems: 'center' }}
                      >

                        <Avatar style={{ width: '40px', height: '40px' }} src={message?.attributes?.account?.data?.attributes?.profile_picture} />


                      <Box>


                        <Typography
                          style={{
                            color: "#081F32",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: 14,
                            marginLeft: 5
                          }}
                        // align={
                        //   message.attributes.account_id == currentAccountId
                        //     ? "right"
                        //     : "left"
                        // }
                        >
                          {/* {item.attributes.chatable.attributes.full_name} */}
                        </Typography>


                        {
                          message.attributes.message.length > 45 ?
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
                                {message.attributes.message}
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
                                // align={
                                //   message.attributes.account_id == currentAccountId
                                //     ? "right"
                                //     : "left"
                                // }
                              >
                                {message.attributes.message}
                              </Typography>

                            </>
                        }



                      {
                        message.attributes.attachments ?
                          <Grid item xs={12}
                          // style={message.attributes.account_id == currentAccountId ? { 'display': 'flex', 'justifyContent': 'end', flexDirection: 'column', alignItems: 'end', marginTop: 5 } : { 'display': 'flex', 'justifyContent': 'start', flexDirection: 'column', alignItems: 'start', marginTop: 5 }}
                          >
                            <img style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ selectedMedia: message.attributes.attachments[0] })} src={message.attributes.attachments[0].url} width="75" height="75" />
                            {/* {message.attributes.attachments[0]?.mimetype !== "application/pdf" ? (
                              <img style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ selectedMedia: message.attributes.attachments[0] })} src={message.attributes.attachments[0].url} width="75" height="75" />
                            ) : (
                              <>
                                <img style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ selectedMedia: message.attributes.attachments[0].filename })} src={pdfIcon} width="75" height="75" />
                                <p style={{ maxWidth: '10rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{message.attributes.attachments[0].filename}</p>
                              </>

                            )} */}
                          </Grid>
                          :
                          null

                      }

                        <ListItemText

                          // align={
                          //   message.attributes.account_id == currentAccountId
                          //     ? "right"
                          //     : "left"
                          // }
                          secondary={this.displaytime(message.attributes.created_at)}
                        />
                     </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                </>
              ))}
            </List>


            <Grid container style={{ padding: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>

                <input
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      createMessage()
                    }
                  }}

                  onChange={(e) => this.CreateNewMessage(e)} type="" style={{ border: '1px solid #EDEDED', color: '#726363', borderRadius: 15, padding: 10, width: '100%' }} placeholder="Start a new message" />
                <AttachFileIcon onClick={this.handleClick1} for="BtnBrowseHidden" style={{ cursor: 'pointer' }} />
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

              <SendIcon style={{ cursor: 'pointer' }} onClick={()=>this.createMessages(item.id)} />

            </Grid>

          </Grid>
        </Grid>



        <Modal
          open={this.state.selectedMedia}
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'column-reverse', justifyContent: 'center' }}

          onClose={() => this.setState({ selectedMedia: null, accept: false })}
          aria-labelledby="alert-Modal-title"
          aria-describedby="alert-dialog-description"
        >
          <div>

            {this.state.selectedMedia?.mimetype !== "application/pdf" ? (
              <Avatar src={this.state.selectedMedia?.url} style={{ width: '600px', height: '56rem', borderRadius: 0 }} />
            ) : (
              <iframe src={this.state.selectedMedia?.url} style={{ width: '600px', height: '56rem' }} />
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
  text: {

    fontSize: '1.2rem'

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

export default withRouter(ChatBox as React.ComponentType<any>)
