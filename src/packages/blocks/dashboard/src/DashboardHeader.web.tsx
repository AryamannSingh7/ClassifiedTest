// Customizable Area Start
// @ts-ignore
// @ts-nocheck

import React from "react";
import "./Dashboard.web.css";
// Components imported start
import DashboardGeneral from "./DashboardGeneral.web";
import DashboardActions from "./DashboardActions.web";
import DashboardTicket from "./DashboardTicket.web";
import DashboardBudget from "./DashboardBudget.web";
import BudgetDetails from "./BudgetDetails.web";
import Polling from "../../Polling/src/Polling.web";
import PollsGrid from "../../Polling/src/PollsallData.web";
import SurveyGrid from "../../Polling/src/SurveyGrid.web";

// Components imported end
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { buildingLogo, chairmanUser, globalIcon, chatIcon, notification } from "./assets";
import "../../../web/src/assets/css/style.scss";
import { Typography, Link, Menu, MenuItem, Grid, Box } from "@material-ui/core";

import BuildingImage from "../assets/BuildingLogo.png";
import UserImage from "../assets/ChairmanUser.jpg";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import DashboardController, { Props } from "./DashboardController";
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';

class DashboardHeader extends DashboardController {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleLanguage = (event: any) => {
    this.setState({
      anchorEl: event?.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl:null
    })
  }

  handleEngLngChange = () => {
    i18next.changeLanguage('en')
    this.setState({
      anchorEl:null
    })
  }

  handleAreLngChange = () => {
    i18next.changeLanguage('ar')
    this.setState({
      anchorEl:null
    })
  }
  render() {
    const open = Boolean(this.state.anchorEl)
    return (
      <>
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
            <div className="right-icon" style={{display:"flex"}}>
                  <div style={{position:"relative"}}>
                    <span
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e:any) => this.handleLanguage(e)}>
                      <img src={globalIcon} alt="GlobalIcon" />
                    </span>
                    <Menu
                      id="basic-menu"
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
              <Link href="#">
                <KeyboardArrowDownIcon />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
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
export default withTranslation()(withRouter(DashboardHeader));

// Customizable Area End
