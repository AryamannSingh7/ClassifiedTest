// Customizable Area Start
// @ts-ignore
// @ts-nocheck

import React from "react";
import "./Dashboard.web.css";
import { globalIcon, notification } from "./assets";
import "../../../web/src/assets/css/style.scss";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Link,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import { withRouter } from "react-router";
import BuildingImage from "../assets/BuildingLogo.png";
import UserImage from "../assets/ChairmanUser.jpg";
import ProfileIcon from "../assets/profile.png";
import LogoutIcon from "../assets/logout.png";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DashboardController, { Props } from "./DashboardController";

class DashboardHeader extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): Promise<void> {}

  logout = () => {
    localStorage.clear();
    this.props.history.push("/ChairmanLogin");
  };

  gotoProfilePage = () => {
    this.props.history.push("/ChairmanProfile");
  };

  render() {
    return (
      <Box style={dashBoard.Header}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecLft}>
            <img src={BuildingImage} alt="BuildingLogo" width={70} />
            <Link href="#" style={{ textDecoration: "none" }}>
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                Building Name
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecRft}>
            <Link href="#">
              <img src={globalIcon} alt="GlobalIcon" />
            </Link>
            <Link href="#">
              <img src={notification} alt="GlobalIcon" />
            </Link>
            {/* <img src={GlobalIcon} alt="GlobalIcon" /> */}

            <Box style={dashBoard.HeaderSecRtBox}>
              <img
                src={UserImage}
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
};

export default withStyles()(withRouter(DashboardHeader));
// Customizable Area End
