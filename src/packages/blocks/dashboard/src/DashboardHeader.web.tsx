// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import "../../../web/src/assets/css/style.scss";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Link,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  ProfileIcon,
  LogoutIcon,
  buildingLogo,
  chairmanUser,
  globalIcon,
  notification,
  LogoutDialogIcon,
  NewNotification,
} from "./assets";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DashboardController from "./DashboardController";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

class DashboardHeader extends DashboardController {
  handleEngLngChange = () => {
    localStorage.setItem("language", "en");
    i18next.changeLanguage("en");
  };

  handleAreLngChange = () => {
    localStorage.setItem("language", "ar");
    i18next.changeLanguage("ar");
  };

  handleLogoutModal = () => {
    this.setState({ isLogoutModalOpen: !this.state.isLogoutModalOpen });
  };

  logout = () => {
    localStorage.clear();
    this.props.navigation.navigate("ChairmanLogin");
  };

  gotoProfilePage = () => {
    if (localStorage.getItem("selectUserType") == "Auditor") {
      this.props.navigation.navigate("AuditorProfile");
    } else {
      this.props.navigation.navigate("ChairmanProfile");
    }
  };

  render() {
    const { t }: any = this.props;

    return (
      <Box style={dashBoard.Header}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecLft}>
            <img src={buildingLogo.default} alt="BuildingLogo" width={70} />
            <Link href="#" style={{ textDecoration: "none" }}>
              <Typography variant="h6" style={dashBoard.buildingName}>
                {localStorage.getItem("complexName") || "Complex_Name"}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} md={6} sm={6} style={dashBoard.HeaderSecRft}>
            <div className="right-icon" style={{ display: "flex", gap: "15px" }}>
              <Box>
                <Menu
                  className="chairman-lang-menu"
                  arrow={true}
                  align="center"
                  menuButton={<img src={globalIcon} alt="GlobalIcon" />}
                >
                  <MenuItem
                    className={localStorage.getItem("language") === "en" ? "active" : ""}
                    onClick={() => this.handleEngLngChange()}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    className={localStorage.getItem("language") === "ar" ? "active" : ""}
                    onClick={() => this.handleAreLngChange()}
                  >
                    Arabic
                  </MenuItem>
                </Menu>
              </Box>
              <Link href="/AdminNotification">
                {this.state.isNewNotification ? (
                  <img src={NewNotification} alt="GlobalIcon" />
                ) : (
                  <img src={notification} alt="GlobalIcon" />
                )}
              </Link>
            </div>

            <Box style={dashBoard.HeaderSecRtBox}>
              <img src={chairmanUser.default} alt="ChairmanUser" width={50} style={{ borderRadius: "50%" }} />
              <Box>
                <p style={{ textTransform: "capitalize" }}>{localStorage.getItem("username") || "User_Name"}</p>
                <Typography variant="body2">{localStorage.getItem("userType") || "User_Role"}</Typography>
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
                <img src={ProfileIcon} alt="profile" /> {t("Profile")}
              </MenuItem>
              <MenuItem onClick={() => this.handleLogoutModal()}>
                <img src={LogoutIcon} alt="logout" /> {t("Logout")}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>

        <Dialog
          className="delete-document personal chairman-logout"
          fullWidth
          onClose={() => this.handleLogoutModal()}
          open={this.state.isLogoutModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={LogoutDialogIcon} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Are you sure you want to logout?")}
              </Typography>
              <Typography variant="body1">{t("You will be returned to the login screen")}</Typography>
              <DialogActions className="dialog-button-group">
                <Button className="close" onClick={() => this.handleLogoutModal()}>
                  {t("Close")}
                </Button>
                <Button className="logout" onClick={() => this.logout()}>
                  {t("Logout")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
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

export default withTranslation()(DashboardHeader);
// Customizable Area End
