// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import { globalIcon, notification, chatIcon } from "./assets";
import "../../../web/src/assets/css/style.scss";
import { Box, Grid, IconButton, Typography, Link, MenuItem } from "@material-ui/core";
import { ProfileIcon, LogoutIcon, buildingLogo, chairmanUser } from "./assets";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DashboardController, { Props } from "./DashboardController";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import i18next from "i18next";

class DashboardHeader extends DashboardController {
  constructor(props: Props) {
    super(props);
    this.state = {
      //@ts-ignore
      anchorEl: null,
    };
  }

  handleLanguage = (event: any) => {
    this.setState({
      //@ts-ignore
      anchorEl: event?.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      //@ts-ignore
      anchorEl:null
    })
  }

  handleEngLngChange = () => {
    i18next.changeLanguage('en')
    this.setState({
      //@ts-ignore
      anchorEl:null
    })
  }

  handleAreLngChange = () => {
    i18next.changeLanguage('ar')
    this.setState({
      //@ts-ignore
      anchorEl:null
    })
  }

  logout = () => {
    localStorage.clear();
    this.props.navigation.navigate("ChairmanLogin");
  };

  gotoProfilePage = () => {
    this.props.navigation.navigate("ChairmanProfile");
  };

  render() {
    //@ts-ignore
    const open = Boolean(this.state.anchorEl)
    return (
      <Box style={dashBoard.Header}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecLft}>
            <img src={buildingLogo.default} alt="BuildingLogo" width={70} />
            <Link href="#" style={{ textDecoration: "none" }}>
              <Typography variant="h6" style={dashBoard.buildingName}>
                Building Name
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecRft}>
           <div className="right-icon" style={{display:"flex"}}>
                    <div style={{position:"relative"}}>
                      <span
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={(e:any) => this.handleLanguage(e)}
                        >
                        <img src={globalIcon} alt="GlobalIcon" />
                      </span>
                      <Menu
                        id="basic-menu"
                        //@ts-ignore
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button"
                        }}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <MenuItem onClick={() => this.handleEngLngChange()}>English</MenuItem>
                        <MenuItem onClick={() => this.handleAreLngChange()}>Arabic</MenuItem>
                      </Menu>
                    </div>
                    <div>
                        <Link href="#">
                          <img src={chatIcon} alt="GlobalIcon" style={{marginLeft:"10px"}}/>
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                          <img src={notification} alt="GlobalIcon" style={{marginLeft:"10px"}}/>
                        </Link>
                      </div>
              </div>
            {/* <img src={GlobalIcon} alt="GlobalIcon" /> */}

            <Box style={dashBoard.HeaderSecRtBox}>
              <img
                src={chairmanUser.default}
                alt="ChairmanUser"
                width={50}
                style={{ borderRadius: "50%" }}
              />
              <Box>
                <Typography variant="subtitle1">User Name</Typography>
                <Typography variant="body2">Chairman</Typography>
              </Box>
            </Box>
            <Menu
              className="chairman-top-menu"
              arrow={true}
              align="end"
              menuButton={
                <IconButton>
                  <KeyboardArrowDownIcon />
                </IconButton>
              }
            >
              <MenuItem onClick={() => this.gotoProfilePage()}>
                <img src={ProfileIcon} alt="profile" /> Profile
              </MenuItem>
              <MenuItem onClick={() => this.logout()}>
                <img src={LogoutIcon} alt="logout" /> Logout
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const dashBoard = {
  Header: {
    background: "#fff",
    padding: 20,
  },
  HeaderSecLft: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: "20px",
  },
  HeaderSecRft: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: "20px",
  },
  HeaderSecRtBox: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: "20px",
  },
  PremimumPlan: {
    background: "#ff8100",
    padding: 8,
    borderRadius: "5px",
    marginRight: 8,
  },

  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  SideBarBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "last baseline",
    gap: 60,
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 25,
  },
  ListItem: {
    color: "black",
    marginTop: 25,
  },
  ListItemText: {
    marginLeft: 15,
    fontSize: 14,
  },
  buildingName: {
    fontWeight: 600,
  },
};

export default DashboardHeader;
// Customizable Area End
