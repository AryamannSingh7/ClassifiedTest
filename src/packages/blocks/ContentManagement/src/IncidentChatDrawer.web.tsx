//@ts-ignore
//@ts-nocheck
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FormControl from '@material-ui/core/FormControl';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import { Formik, Form, Field, ErrorMessage } from "formik";
// import IncidentManagementController, { Props } from "./IncidentManagementController.web";
import { Button } from '@material-ui/core';

import { Building1 } from "../src/assets";

const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function IncidentChatDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="chatRightDrawer">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="ToolbarHeader">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className="drawerHeader">
          <Typography component="h4">
            Ticket
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="drawerMainContainer">
          <Box className='content-header'>
            <Box>
              <Typography component="h6">
                Incident Title
              </Typography>

              <Typography component="span">
                Incident Title
              </Typography>
            </Box>
            <Box className="customButton">
              <Button variant="contained" className="contain success" type="submit" >Resolved</Button>
            </Box>
          </Box>
          <Box className='main-content'>
            <Box className='receive-row'>
              <img src={building1.default} className="profile-img" alt="Profile Img" />
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row sent-row'>
              <Box className='correct-icon'>
                <DoneAllIcon />
              </Box>
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='date-row'>
              <Typography component="h6">
                Today
              </Typography>
            </Box>
            <Box className='receive-row'>
              <img src={building1.default} className="profile-img" alt="Profile Img" />
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row sent-row'>
              <Box className='correct-icon'>
                <DoneAllIcon />
              </Box>
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row'>
              <img src={building1.default} className="profile-img" alt="Profile Img" />
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row sent-row'>
              <Box className='correct-icon'>
                <DoneAllIcon />
              </Box>
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row'>
              <img src={building1.default} className="profile-img" alt="Profile Img" />
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row sent-row'>
              <Box className='correct-icon'>
                <DoneAllIcon />
              </Box>
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row'>
              <img src={building1.default} className="profile-img" alt="Profile Img" />
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
            <Box className='receive-row sent-row'>
              <Box className='correct-icon'>
                <DoneAllIcon />
              </Box>
              <Box className='receive-block'>
                <Box className='receive-box'>
                  Hi Ali
                </Box>
                <Typography component="span">
                  10:56 PM
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className='content-footer desktop-ui'>
            <Formik>
              <Form translate="yes" className="commonForm">
                <Box className='frm-row'>
                  <Box className="formGroup">
                    <Field name="incidentTitle" type="text" placeholder="Type your message" className="formInput" />
                    <Button className="frmLeftIcons">
                      <InsertEmoticonIcon />
                    </Button>
                    <Button className="frmRightIcons">
                      <AttachFileIcon />
                    </Button>
                  </Box>
                  <Button className='SendIconBtn'>
                    <SendIcon />
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

