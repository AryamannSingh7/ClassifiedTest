// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import {
  Container,
  Typography,
  FormControl,
  Tab,
  withStyles,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import ChairmanProfileController, {
  Props,
} from "./ChairmanProfileController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { ProfileStyleWeb } from "./ProfileStyle.web";

import SettingIcon from "../assets/setting.png";
import AvatarIcon from "../assets/avatar.png";
import ChatIcon from "../assets/chat.png";
import CallIcon from "../assets/call.png";
import EmailIcon from "../assets/email.png";
import FacebookIcon from "../assets/facebook.png";
import InstagramIcon from "../assets/instagram.png";
import TwitterIcon from "../assets/twitter.png";
import SnapchatIcon from "../assets/snapchat.png";
import UserIcon from "../assets/user.png";

import NameIcon from "../assets/name.png";
import KeypadIcon from "../assets/keypad.png";
import FEmailIcon from "../assets/femail.png";

class ChairmanProfile extends ChairmanProfileController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF" }}
          className={classes.ChairmanProfile}
        >
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      <Box component="span" style={{ color: "blue" }}>
                        My Profile
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      My Profile
                    </Typography>
                  </Box>
                </Box>
                <Box className="my-profile-box">
                  <Box className="heading">
                    <Typography variant="h6" className="sub-heading">
                      General Details
                    </Typography>
                    <Box className="setting">
                      <img src={SettingIcon} alt="setting" />
                      <span>Other Can See</span>
                    </Box>
                  </Box>
                  <Card className="profile-details-box">
                    <Grid container>
                      <Grid item xs={3} className="left-side">
                        <img
                          src={AvatarIcon}
                          alt="avatar"
                          className="profile"
                        />
                        <Typography variant="h6" className="sub-heading">
                          Marleah Esgleston
                        </Typography>
                        <p>B-1405</p>
                        <Box className="icons">
                          <img src={ChatIcon} alt="chat" />
                          <img src={CallIcon} alt="phone" />
                          <img src={EmailIcon} alt="email" />
                        </Box>
                      </Grid>
                      <Grid item xs={1} className="border" />
                      <Grid item xs={8} className="right-side">
                        <Grid container className="about">
                          <Grid item xs={12}>
                            <span>About</span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Etiam posuere augue id iaculis condimentum.
                              In hac habitasse platea dictumst. Sed tincidunt
                              quam id Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Etiam posuere augue id iaculis.
                            </p>
                          </Grid>
                        </Grid>
                        <Grid container className="info">
                          <Grid item xs={3}>
                            <span>Gender</span>
                            <p>Female</p>
                          </Grid>
                          <Grid item xs={3}>
                            <span>Birthday</span>
                            <p>12-12-1212</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Hobbies</span>
                            <Box className="hobbies">
                              <span>Traveling</span>
                              <span>Cooking</span>
                              <span>Gardening</span>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container className="social">
                          <Grid item xs={12}>
                            <span>Social Media</span>
                            <Box className="icons">
                              <img src={FacebookIcon} alt="chat" />
                              <img src={InstagramIcon} alt="chat" />
                              <img src={TwitterIcon} alt="phone" />
                              <img src={SnapchatIcon} alt="email" />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
                <Box className="edit-button">
                  <Button onClick={() => this.handleEditProfileModal()}>
                    Edit Detail
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Box>

          <Dialog
            className="edit-profile"
            open={this.state.isEditProfileModalOpen}
            scroll="paper"
            fullWidth
            maxWidth="md"
          >
            <MuiDialogTitle disableTypography className="dialog-heading">
              <Typography variant="h6">Edit My Profile</Typography>
              <IconButton onClick={() => this.handleEditProfileModal()}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers>
              <Box className="profile-picture">
                {/* <img src={AvatarIcon} alt="profile" className="picture" /> */}
                <img src={UserIcon} alt="profile" className="no-picture" />
                <p>Add Profile Picture</p>
              </Box>
              <Grid container spacing={2} className="profile-top">
                <Grid item xs={6}>
                  <Input
                    className="input-with-icon"
                    variant="filled"
                    fullWidth
                    placeholder="Name"
                    startAdornment={
                      <InputAdornment position="start">
                        <img src={NameIcon} alt="icon" />
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box className="mobile-box">
                    <Select value="in" displayEmpty>
                      <MenuItem value="" disabled>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="in">
                        <ListItemIcon>
                          <img
                            src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg`}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        +91
                      </MenuItem>
                    </Select>
                    <Input
                      variant="filled"
                      fullWidth
                      placeholder="Mobile Number"
                      className="input"
                      startAdornment={
                        <InputAdornment position="start">
                          <img src={KeypadIcon} alt="icon" />
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    className="input-with-icon"
                    variant="filled"
                    fullWidth
                    placeholder="Email Id"
                    startAdornment={
                      <InputAdornment position="start">
                        <img src={FEmailIcon} alt="icon" />
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="dialog-button-group">
              <Button
                className="cancel-button"
                onClick={() => this.handleEditProfileModal()}
              >
                Cancel
              </Button>
              <Button className="add-button">Save</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </>
    );
  }
}

export default withStyles(ProfileStyleWeb)(ChairmanProfile);
// Customizable Area End
