// Customizable Area Start
import React, {useRef} from "react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    Modal,
    styled,
    Switch,
    Typography,
    Container
} from "@material-ui/core";
import {withRouter} from 'react-router';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import {NoProfile_Img} from "../../user-profile-basic/src/assets";
import {DoubleTick, info, NoChat, Send} from "./assets";
import InboxController, {Props} from "./inboxController.web";
import Loader from "../../../components/src/Loader.web";
import moment from "moment";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GeneralSideBarWeb from "../../dashboard/src/GeneralSideBar.web";
import '../assets/css/style.scss'
import {withTranslation} from "react-i18next";

class ChairmanChat extends InboxController {
    constructor(props: Props) {
        super(props);
        const messagesEndRef = React.createRef()

    }

    async componentDidMount() {
        this.getInbox()
        this.getProfile()

        // this.getSingleInbox()
        this.markUnread()
        console.log('hello', window.history?.state?.state?.data)
        if (window.history?.state?.state?.data) {
            this.updateChatRoom()
        }

// @ts-ignore
// @ts-nocheck
// this.interval = setInterval(() => {
//   this.getSingleInbox()
// }, 3000);

    }

    async componentWillUnmount() {
        // @ts-ignore
        // @ts-nocheck
        clearInterval(this.interval)
    }

    displaytime(obj: any) {

        let value = obj[Object.keys(obj)[Object.keys(obj).length - 1]]

        //@ts-ignore
        //@ts-nocheck
        if (value) {


            let date = new Date(value[value.length - 1].message.created_at)


            return this.dateToFromNowDaily(value[value.length - 1].message.created_at)
            // return `${d}:${m < 9 ? `0` + m : m} (${moment(value[value.length-1].message.created_at).format("DD MMM YYYY")})`
        } else {
            return ''
        }

    }

    displaytime2(time: any) {


        let date = new Date(time || Date.now())

        let d = date.getHours();
        let m = date.getMinutes();
        //@ts-ignore
        //@ts-nocheck
        return `${d}:${m < 9 ? `0` + m : m}`

    }


    // Customizable Area Start
    // Customizable Area End

    _handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            this.createMessages()

        }
    }


    dateToFromNowDaily(myDate: any) {

        // get from-now for this date
        var fromNow = moment.utc(myDate).fromNow();

        // ensure the date is displayed with today and yesterday
        return moment(myDate).calendar(null, {
            // when the date is closer, specify custom values
            lastWeek: '[Last] dddd',
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            // when the date is further away, use from-now functionality
            sameElse: function () {
                return "[" + fromNow + "]";
            }
        });
    }

    getLastMessage = (obj: any) => {
        let value = obj[Object.keys(obj)[Object.keys(obj).length - 1]]
        if (value) {

            return value[value.length - 1].message.message || 'he'
        } else {
            return ''
        }

    }

    checkNosocialMedia(profileData: any) {


        if (!profileData?.attributes?.website[0].twitter_link) {
            if (!profileData?.attributes?.website[1].instagram_link) {
                if (!profileData?.attributes?.website[2].fb_link) {
                    if (!profileData?.attributes?.website[3].snapchat_link) {
                        return 'No social media handle'
                    }
                }

            }
        }

    }

    render() {
        //@ts-ignore
        //@ts-nocheck
        const {classes} = this.props;
        //@ts-ignore
        let profileData = this.state.profiledata
        //@ts-ignore
//@ts-nocheck
        let item = this.state.selectedChatRoom;
        const currentAccountId = localStorage.getItem('userId')
        return (
            <>
                <Box
                    style={{background: "#F4F7FF"}}
                    className=''
                >
                    {/* Dashboard Header -- */}
                    <DashboardHeader {...this.props} />
                    <Box style={{display: "flex"}}>
                        <Grid item xs={3} md={3} sm={3} className="SideBar">
                            {/* Chairman Sidebar -- */}
                            <GeneralSideBarWeb {...this.props}></GeneralSideBarWeb>
                        </Grid>
                        <Grid item xs={9}>
                            <Container>
                                <Grid container>
                                    <Grid item justifyContent="space-between" style={{
                                        width: '100%',
                                        display: 'flex',
                                        marginTop:"20px",
                                        marginBottom:"10px"
                                    }}>
                                        <p className="bold-text" style={{fontWeight: 600, fontSize: '32px'}}>
                                            Chat
                                        </p>
                                        <Box display={'flex'} alignItems='center' gridGap={'1rem'}>
                                            <p className="bold-text" style={{fontSize:"16px"}}>
                                                {/* {this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? 'Enable Chat' :'Disable Chat'} */}Enable
                                                Chat
                                            </p>
                                            {/* <FormControlLabel
                                                control={<PurpleSwitch enable={this.state.switchVaule}
                                                value="start" labelPlacement="start"
                                                diableChat={() => this.setState({
                                                    showSuccessModal: !this.state.showSuccessModal,
                                                    switchVaule: !this.state.switchVaule
                                                })}/>}
                                                label=""
                                                
                                            /> */}
                                            <FormControlLabel
                                                style={{marginRight:"0px"}}
                                                control={<IOSSwitch sx={{m: 1}} enable={this.state.switchVaule}
                                                            value="start" labelPlacement="start"
                                                            diableChat={() => this.setState({
                                                                showSuccessModal: !this.state.showSuccessModal,
                                                                switchVaule: !this.state.switchVaule
                                                            })}/>}
                                                            label=''
                                            />
                                        </Box>

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4} md={4} sm={4}
                                          style={{boxShadow: 'rgb(0 0 0 / 15%) 9px -3px 8px 0px'}}>
                                        <>
                                            <Box className="login-wrapper reg-wrapper"
                                                 style={{margin: 0, background: '#FFFFFF'}}>
                                                <Grid container style={{padding: '0 1rem'}}>
                                                    <Grid item xs={12}
                                                          style={{display: 'flex', justifyContent: 'space-between'}}>
                                                           <Box display='flex' alignItems='center'
                                                             width={this.state.isSearch ? '7%' : '100%'} style={{display:"flex",justifyContent:"center"}}>
                                                            {/* <KeyboardBackspaceIcon onClick={() => window.history.back()}/> */}
                                                            <input autoFocus className="inputbox" placeholder="search"
                                                                   onChange={(e) => this.getInboxBySearch(e.target.value)}
                                                                   style={{
                                                                       border: '1px solid #F1F1F1',
                                                                       borderRadius: '10px',
                                                                       fontSize: '1rem',
                                                                       height: '50px',
                                                                       padding: '0.75rem',
                                                                       marginTop: '1rem',
                                                                       width:"100%"
                                                                   }}/>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs={12} md={12}
                                                          style={{justifyContent: 'normal'}}>
                                                        {
                                                            this.state.allInbox.length != 0 ? this.state.allInbox.map(item =>
                                                                    <>
                                                                        <Box key={item} display='flex' style={{
                                                                            gap: '1rem',
                                                                            maxHeight: '5rem',
                                                                            padding:"0.5rem 1rem",
                                                                            marginTop: '1rem',
                                                                            cursor: 'pointer',
                                                                            borderBottom: '1px solid #f2f2f2'
                                                                        }} onClick={() => this.openChat2(item)}>
                                                                            <img
                                                                                src={item?.attributes?.chat_with_account?.attributes?.profile_pic?.url || NoProfile_Img}
                                                                                width='50' height='50'
                                                                                style={{borderRadius: 50}}/>
                                                                            <InBoxCard item={item}
                                                                                       displaytime={this.displaytime}
                                                                                       getLastMessage={this.getLastMessage}/>
                                                                            {/* <Box padding='0.25rem' width='100%' >
                          <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>

                          <h5>
                          {item?.attributes?.chat_with_account?.id != localStorage.getItem('userId') ?item?.attributes?.chat_with_account?.attributes?.full_name || 'N/A':item?.attributes?.chatable?.attributes?.full_name || 'N/A' }

                          </h5>
                          <p>
                           { this.displaytime(item.attributes.messages)}
                          </p>
                          </Box>
                          <Box style={{display:'flex',justifyContent:'space-between'}}>

                          <p>

                            {
                              Object.keys(item.attributes.messages).length !=0 && this.getLastMessage(item.attributes.messages)
                            }
                          </p>
                          {
                             item?.attributes?.is_mark_unread===0 ?null :
                          <p style={{background:'#FC8434',color:'white',borderRadius:'50%',width:'12px',height:'12px',fontSize:'12px',padding:'4px 6px 8px 6px',textAlign:'center'}}>
                           {item?.attributes?.is_mark_unread}
                          </p>
                          }
                          </Box>
                        </Box> */}
                                                                        </Box>

                                                                    </>
                                                                )
                                                                :
                                                                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:'Center'}}>
                                                                    <Typography className="bold-text" color="textSecondary">{"No chat"}</Typography>
                                                                </div>
                                                        }
                                                    </Grid>

                                                </Grid>
                                            </Box>

                                            <Dialog
                                                open={this.state.showSuccessModal}
                                                onClose={() => this.setState({showSuccessModal: false})}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                className="diloag-wrapper"
                                                PaperProps={{
                                                    style: {
                                                        borderRadius: '15px',
                                                        padding: '2rem',
                                                        width: '450px'
                                                    },
                                                }}
                                            >
                                                <DialogBox allInbox={this.state.allInbox} disableChat={this.disablechat}
                                                           onClickHandle={() => this.setState({showSuccessModal: false})}/>
                                                {/* <Grid container>
                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                  <img src={NoChat} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                  <p style={{ fontWeight: 800, fontSize: '1.5rem', textAlign: 'center' }}>
                   {
                    this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? 'Enable Chat' :'Disable Chat'
                   }  Functionality?

                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <p style={{ fontWeight: 400, fontSize: '0.8rem', textAlign: 'center' }}>
                    Are you sure want to {
                    this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? 'Enable Chat' :'Disable Chat'
                   } functionality? No one will be able to send you any messages while it is disabled.
                  </p>
                </Grid>
              </Grid>
              <Box className="dialog-footer desktop-ui">
                <DialogActions className="customButton" style={{display:'flex',gap:'1rem',justifyContent:'center',flexDirection:'row-reverse'}}>
                  <Button variant="contained" onClick={() => this.disablechat()} style={{width:'12rem'}}  >
                    Yes
                    {
                      this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? ' Enable' :' Disable'
                    }

                  </Button>
                  <Button variant='text' onClick={() => this.setState({ showSuccessModal: false })} style={{width:'fit-content',border:'1px solid #668DE7',color:'#668DE7'}} >
                    No, don’t
                    {
                      this.state.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? ' Enable' :' Disable'
                    }
                  </Button>
                </DialogActions>
              </Box> */}
                                            </Dialog>
                                            < Loader loading={this.state.loading}/>
                                        </>

                                    </Grid>
                                    <Grid item xs={8} md={8} sm={8} style={{
                                        borderLeft: '1px solid #EFEFEF',
                                        boxShadow: 'rgb(0 0 0 / 15%) 9px -3px 8px 0px'
                                    }}>
                                        <Grid item xs={12} md={12} className="auth-cols">
                                            <Box display={{xs: 'none', md: 'flex'}}>
                                                <div style={{
                                                    padding: "0.3rem",
                                                    backgroundColor: "#ffff",
                                                    paddingLeft: '0.3rem',
                                                    minWidth: '99%'
                                                }}>
                                                    <Grid container>
                                                        <Grid item xs={12} style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            paddingBottom: '.8rem',
                                                            borderBottom:"1px solid #F0F0F0"
                                                        }}>
                                                            {/* <Box display='flex' alignItems='center' >
                  <span style={{ fontWeight: 'bold',display:'flex',gap:'0.5rem',marginTop:'1rem' }}>
                  {item?.attributes?.chat_with_account?.id != localStorage.getItem('userId')  ? <img src={item?.attributes?.chat_with_account?.attributes?.profile_pic?.url} width='25' height='25'/> || <img src={NoProfile_Img} width='25' height='25' />:<img src={item?.attributes?.chatable?.attributes?.profile_pic?.url} width='25' height='25'/>   || <img src={NoProfile_Img} width='25' height='25'/> }

                    {item?.attributes?.chat_with_account?.id != localStorage.getItem('userId') ?item?.attributes?.chat_with_account?.attributes?.full_name || 'N/A':item?.attributes?.chatable?.attributes?.full_name || 'N/A' }
                  </span>
                </Box> */}
                                                            <ChatRoomSection item={item}/>
                                                        </Grid>

                                                        <Grid xs={12}>
                                                            <List style={{
                                                                overflowY: "auto",
                                                                maxHeight: "55vh",
                                                                minHeight: "55vh",
                                                                overflowX: 'hidden'
                                                            }}>
                                                                {this.state.allInboxKey?.length != 0 && this.state.allInboxKey?.map((date, i) => (
                                                                    <>
                                                                        <Box key={i} display='flex' justifyContent='center'
                                                                             position='relative'>
                                                                            <p className="oval-shape bold-text" style={{fontSize:"11px",padding:"5px 12px"}}>
                                                                                {
                                                                                    i > 1 ? this.dateToFromNowDaily(date) : moment.utc(date).format('DD MMM, YYYY')
                                                                                }
                                                                            </p>
                                                                        </Box>
                                                                        {
                                                                            this.state.singleChatRoom[date]?.map((message: any, i: any) => <>

                                                                                <ListItem key={i}>
                                                                                    <Grid container>
                                                                                        <MessageSection handleClick={() => {//@ts-ignore
    //@ts-nocheck
                                                                                            this.setState({selectedMedia: message.message.images[0]})
                                                                                        }} message={message}
                                                                                                        displaytime2={this.displaytime2}
                                                                                                        currentAccountId={currentAccountId}/>
                                                                                    </Grid>
                                                                                </ListItem>
                                                                            </>)
                                                                        }
                                                                    </>
                                                                ))}
                                                            </List>
                                                            <SendMessage newMessage={this.state.newMessage}
                                                                         selectedChatRoom={this.state.selectedChatRoom}
                                                                         handleFile2={this.handleFile2}
                                                                         createMessages={this.createMessages}
                                                                         CreateNewMessage={this.CreateNewMessage}/>

                                                        </Grid>
                                                    </Grid>


                                                    <Modal
                                                        //@ts-ignore
                                                        //@ts-nocheck

                                                        open={this.state.selectedMedia}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flexDirection: 'column-reverse',
                                                            justifyContent: 'center'
                                                        }}
                                                        onClose={() => this.setState({selectedMedia: null, accept: false})}
                                                        aria-labelledby="alert-Modal-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <div>

                                                            {this.state.selectedMedia?.mimetype !== "application/pdf" ? (
                                                                <Avatar src={this.state.selectedMedia?.url} style={{
                                                                    width: '300px',
                                                                    height: '26rem',
                                                                    borderRadius: 0
                                                                }}/>
                                                            ) : (
                                                                <iframe src={this.state.selectedMedia?.url}
                                                                        style={{width: '300px', height: '26rem'}}/>
                                                            )}


                                                            {
                                                                this.state.accept &&
                                                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                                                    <button onClick={() => this.setState({
                                                                        selectedMedia: null,
                                                                        accept: false
                                                                    })} style={{
                                                                        marginRight: '2rem',
                                                                        backgroundColor: 'rgb(241, 78, 36)',
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
                                                                    <button onClick={() => this.setState({
                                                                        selectedMedia: null,
                                                                        accept: false
                                                                    }, () => this.handleSelectFile(this.state.file))}
                                                                            style={{
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
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Box>

                    <Dialog
                        open={this.state.showDialog}
                        onClose={() => this.setState({showDialog: false})}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="diloag-wrapper"
                        PaperProps={{
                            style: {
                                borderRadius: '15px',
                                maxWidth: 650

                            },
                        }}
                    >
                        <Grid container>
                            <Grid xs={12} style={{borderBottom: '1px solid #e9dede', padding: '1rem'}}>
                                <Box display='flex' justifyContent='space-between'>
                                    <p style={{fontWeight: 600}}>
                                        Edit My Profile
                                    </p>
                                    <p onClick={() => this.setState({showDialog: false})} style={{cursor: 'pointer'}}>
                                        X
                                    </p>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container className="main-content-block" style={{marginTop: '1.5rem', padding: '1rem'}}>
                            <Grid xs={12}>

                            </Grid>
                        </Grid>


                        <Box className="dialog-footer desktop-ui">
                            <DialogActions className="customButton">

                                {/* <Button  onClick={() => this.publicViewAPI()}  variant='text'>
                SAVE
              </Button> */}
                            </DialogActions>
                        </Box>
                    </Dialog>


                </Box>
            </>
        );
    }
}
const PurpleSwitch = withStyles({
    switchBase: {
        color: "#B0BEC5" ,
        '&$checked': {
            color: "#FC8434",
        },
        '&$checked + $track': {
            backgroundColor: "#FC8434",
        },
    },
    checked: {},
    track: {},
})(Switch);


// export default ChairmanChat;
// export default withRouter(ChairmanChat)
export default withTranslation()(withRouter(ChairmanChat));
// Customizable Area End


// @ts-ignore
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" inputProps={{'aria-label': 'controlled'}}
            onChange={props.diableChat} checked={!props.enable} {...props}/>
))(({theme}) => ({
    switchBase: {
        color: "#B0BEC5" ,
        '&$checked': {
            color: "#FC8434",
        },
        '&$checked + $track': {
            backgroundColor: "#FC8434",
        },
        '& .MuiSwitch-thumb':{
            backgroundColor:'white          '
        }
    },
    checked: {},
    track: {},
    color: "#B0BEC5" ,
    '&$checked': {
        color: "#FC8434",
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: "#FC8434",
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track':{
        backgroundColor:'#FC8434'
    }
   
}));


const InBoxCard = (props: any) => {
    console.log(props)
    function displaytime(obj: any) {
        let value = obj[Object.keys(obj)[Object.keys(obj).length - 1]]
        //@ts-ignore
        //@ts-nocheck
        if (value) {
            return dateToFromNowDaily1(value[value.length - 1].message.created_at)
        } else {
            return ''
        }
    }

    const dateToFromNowDaily1 = (myDate: any) => {
        // get from-now for this date
        let fromNow = moment.utc(myDate).fromNow();
        // ensure the date is displayed with today and yesterday
        return moment(myDate).calendar(null, {
            // when the date is closer, specify custom values
            lastWeek: '[Last] dddd',
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            // when the date is further away, use from-now functionality
            sameElse: function () {
                return "[" + fromNow + "]";
            }
        });
    }
    return (
        <Box padding='0.25rem' width='100%'>
            <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
                <p style={{fontSize:"16px"}} className="bold-text">
                    {props?.item?.attributes?.chat_with_account?.id != localStorage.getItem('userId') ? props?.item?.attributes?.chat_with_account?.attributes?.full_name || 'N/A' : props?.item?.attributes?.chatable?.attributes?.full_name || 'N/A'}
                </p>
                <p style={{fontSize:"12px",color:"#8D8D8D"}}>
                    {displaytime(props?.item.attributes.messages)}
                </p>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                <p className="textwrap" style={{fontSize:"14px",color:"#8D8D8D"}}>
                    {
                        Object.keys(props?.item.attributes.messages).length != 0 && props?.getLastMessage(props?.item.attributes.messages)
                    }
                </p>
                {
                    props?.item?.attributes?.is_mark_unread === 0 ?
                        <div style={{position: 'relative', marginRight: '0.25rem'}}>
                            <img src={DoubleTick}/>
                            <img src={DoubleTick} style={{position: 'absolute', left: '-4px'}}/>
                        </div>
                        :
                        <p
                            className="bold-text"
                            style={{
                            background: '#FC8434',
                            color: 'white',
                            borderRadius: '50%',
                            width: '12px',
                            height: '12px',
                            fontSize: '12px',
                            padding: '4px 6px 8px 6px',
                            textAlign: 'center'
                        }}>
                            {props?.item?.attributes?.is_mark_unread}
                        </p>
                }
            </Box>
        </Box>
    )
}

const DialogBox = (props: any) => {
    const checkPrime = () => {

        return props.allInbox[0]?.attributes?.chat_with_account?.id == localStorage.getItem('userId') ?
            check2()
            :
            check3()

    }
    const check2 = () => {
        return props.allInbox[0]?.attributes?.chat_with_account?.attributes?.disable_chat ? ' Enable Chat' : ' Disable Chat'
    }
    const check3 = () => {
        return props.allInbox[0]?.attributes?.chatable?.attributes?.disable_chat ? ' Enable Chat' : ' Disable Chat'
    }
    return (
        <>
            <Grid container>
                <Grid xs={12}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>

                    <img src={NoChat}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>

                    <p style={{fontWeight: 800, fontSize: '1.5rem', textAlign: 'center'}}>
                        {checkPrime()} Functionality?

                    </p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <p style={{fontWeight: 400, fontSize: '0.8rem', textAlign: 'center'}}>
                        Are you sure want to {checkPrime()} functionality? No one will be able to send you any messages
                        while it is disabled.
                    </p>
                </Grid>
            </Grid>
            <Box className="dialog-footer desktop-ui">
                <DialogActions className="customButton" style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexDirection: 'row-reverse'
                }}>
                    <Button variant="contained" onClick={() => props.disableChat()} style={{width: '12rem'}}>
                        Yes
                        {checkPrime()}

                    </Button>
                    <Button variant='text' onClick={props.onClickHandle}
                            style={{width: 'fit-content', border: '1px solid #668DE7', color: '#668DE7'}}>
                        No, don’t
                        {checkPrime()}
                    </Button>
                </DialogActions>
            </Box>
        </>
    )
}


const ChatRoomSection = (props: any) => {

    return (
        <>
            <Box display='flex' alignItems='center'>
             <span style={{fontWeight: 'bold', display: 'flex', gap: '0.5rem', marginTop: '.8rem',alignItems:"center"}}>
             {
                 console.log("PROFILE DETAILS",props?.item?.attributes)
             }
             {props.item?.attributes?.chat_with_account?.id != localStorage.getItem('userId') ?
                 <img src={props.item?.attributes?.chat_with_account?.attributes?.profile_pic?.url||NoProfile_Img} width='50'
                      height='50' style={{marginLeft:"10px",borderRadius:"50px"}} /> || <img src={NoProfile_Img} width='50' height='50' style={{marginLeft:"10px",borderRadius:"50px"}}/> :
                 <img src={props.item?.attributes?.chatable?.attributes?.profile_pic?.url||NoProfile_Img} width='50' height='50' style={{marginLeft:"10px",borderRadius:"50px"}}/> ||
                 <img src={NoProfile_Img} width='50' height='50' style={{marginLeft:"10px",borderRadius:"50px"}}/>}
                 {props.item?.attributes?.chat_with_account?.id != localStorage.getItem('userId') ? props.item?.attributes?.chat_with_account?.attributes?.full_name || 'N/A' : props.item?.attributes?.chatable?.attributes?.full_name || 'N/A'}
             </span>
            </Box>
        </>
    )
}

const SendMessage = (props: any) => {
    const inputRef = useRef(null);
    console.log(props.item)
    console.log(props)

    console.log(props?.item?.attributes?.chat_with_account?.attributes?.disable_chat)
    console.log(props?.item?.attributes?.chatable?.attributes?.disable_chat)
    console.log(props?.item?.attributes?.chat_with_account?.attributes?.disable_chat)
// console.log( props?.item?.attributes?.chatable?.attributes?.disable_chat || props?.item?.attributes?.chat_with_account?.attributes?.disable_chat)
    return (<>
        {
            props?.selectedChatRoom?.attributes?.chatable?.attributes?.disable_chat || props?.selectedChatRoom?.attributes?.chat_with_account?.attributes?.disable_chat ? <>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#E7E1E1',
                        borderRadius: '6px',
                        boxShadow: '0px 4px 14px #f4f6fb',
                        padding: '0.75rem'
                    }}>
                        <img src={info} width='20' height='20'/>
                        <p>

                            {props?.selectedChatRoom?.attributes?.chatable?.attributes?.disable_chat ? props?.selectedChatRoom?.attributes?.chatable?.attributes?.full_name : props?.selectedChatRoom?.attributes?.chat_with_account?.attributes?.full_name} has
                            disabled his chat. You won’t be able to send him message unit he enables it.
                        </p>
                    </div>

                </> :


                <Grid container
                      style={{padding: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                    <Grid item xs={11} style={{display: 'flex', alignItems: 'center'}}>
                        <input
                            disabled={!props.selectedChatRoom}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    props.createMessages()
                                }
                            }}
                            onChange={(e) => props.CreateNewMessage(e)} type="" style={{
                            border: '1px solid #F0F0F0',
                            color: '#726363',
                            backgroundColor:"#F9F9F9",
                            borderRadius: "25px",
                            padding: 10,
                            height:"50px",
                            width: '100%',
                        }} placeholder="Type your message" value={props.newMessage}/>
                        {// @ts-ignore
// @ts-nocheck
                            <AttachFileIcon
                                onClick={() => {
                                    // @ts-ignore
                                    // @ts-nocheck
                                    inputRef.current.click();
                                }}
                                for="BtnBrowseHidden" style={{cursor: 'pointer'}}/>}
                        <input
                            disabled={!props.selectedChatRoom}
                            ref={inputRef}
                            id="BtnBrowseHidden"
                            type="file"
                            onChange={(e: any) =>
                                props?.handleFile2(
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
                            accept="image/png, image/jpeg, image/jpg,.pdf"
                        />
                    </Grid>
                    <Box style={{cursor: 'pointer', borderRadius: '50px', padding: '1rem', background: '#2B6FED'}} onClick={() => props.createMessages()}>
                        <img src={Send}/>
                    </Box>
                    {/* <SendIcon style={{ cursor: 'pointer' }} onClick={()=>this.createMessages()} /> */}

                </Grid>

        }
    </>)
}

const MessageSection = (props: any) => {
    return (
        <>
        <Grid item xs={12}
            // @ts-ignore
              style={props.message.message.account_id == props.currentAccountId ? {
                  'display': 'flex',
                  'justifyContent': 'end',
                  alignItems: 'center',
                  gap: '0.5rem'
              } : {'display': 'flex', 'justifyContent': 'start', alignItems: 'center', gap: '0.5rem'}}
        >
            {
                props.message.message.account_id != props.currentAccountId ?
                    <img src={props.message.message.profile_pic.url} alt='profile-pic' width='50' height='50'
                         style={{borderRadius: 20, marginRight: 5}}/> : null
            }
            {props.message.message.account_id == props.currentAccountId &&
                <div style={{position: 'relative', marginBottom: '22px'}}>
                    <img src={DoubleTick}/>
                    <img src={DoubleTick} style={{position: 'absolute', left: '-4px'}}/>
                </div>
            }
            <Box>

                <Box style={{background: '#f6f6f6', borderRadius: '6px', padding: '0.5rem', borderTopRightRadius: 0}}>
                    <Typography
                        style={{
                            color: "#081F32",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: 14,
                            marginLeft: 5
                        }}
                        align={
                            props.message.message.account_id == props.currentAccountId
                                ? "right"
                                : "left"
                        }
                    >
                    </Typography>
                    {
                        props.message.message.message.length > 45 ?
                            <>
                                <Typography
                                    style={{
                                        color: "#081F32",
                                        fontWeight: 500,
                                        fontSize: 14,
                                        wordBreak: 'break-all'
                                    }}
                                    align='left'
                                >
                                    {props.message.message.message}
                                </Typography>
                            </>
                            :
                            <>
                                <Typography
                                    style={{
                                        color: "#081F32",
                                        fontWeight: 500,
                                        fontSize: 14,
                                        wordBreak: 'break-all',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {props.message.message.message}
                                </Typography>
                            </>
                    }
                    {
                        props.message?.message?.images.length != 0 ?
                            <Grid item xs={12}
                            >
                                <img style={{'cursor': 'pointer'}} onClick={props.handleClick}
                                     src={props.message.message.images[0].url} width="75" height="75"/>
                            </Grid>
                            :
                            null
                    }
                </Box>
                <ListItemText
                    style={props.message.message.account_id == props.currentAccountId ? {textAlign: "right",fontSize:"11px"} : {textAlign: "left",fontSize:"11px"}}
                    secondary={props.displaytime2(props.message.message.created_at)}
                />
            </Box>
        </Grid>
    </>)
}