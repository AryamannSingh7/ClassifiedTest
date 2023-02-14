// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import { communityManagement, meetings, myTeam, TenantLogo } from "./assets";
import "../../../web/src/assets/css/style.scss";
import { Typography, Link, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { withRouter } from "react-router-dom";
import DashboardController, { Props } from "./DashboardController.web";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

class VisitorsSidebar extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    this.getUnreadCount();
  }
  render() {
    const { t }: any = this.props;
    const { classes }: any = this.props;

    return (
      <>
        <Box className="AccordinoList">
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.navigation.navigate("VisitorList")}>
              <Typography className="SingleLinkSize">{t("Visitor")}</Typography>
            </div>
          </Box>

          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.navigation.navigate("Unit")}>
              <Typography className="SingleLinkSize">{t("Units")}</Typography>
            </div>
          </Box>

          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div
              onClick={() =>
                //@ts-ignore
                this.props.history.push("/TeamMembers/Core_member")
              }
            >
              <Typography className="SingleLinkSize">{t("My team")}</Typography>
            </div>
          </Box>

          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.navigation.navigate("Complex")}>
              <Typography className="SingleLinkSize">{t("Complex Page")}</Typography>
            </div>
          </Box>

          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.navigation.navigate("FaqChairman")}>
              <Typography className="SingleLinkSize">{t("FAQ")}</Typography>
            </div>
          </Box>
        </Box>

        <Box className="SideBarBottom">
          <Box>
            <img src={TenantLogo.default} alt="TenantLogo" width={110} />
          </Box>
        </Box>
      </>
    );
  }
}

const dashBoard = {
  PremimumPlan: {
    background: "#ff8100",
    padding: 8,
    borderRadius: "5px",
    marginRight: 8,
  },
  ListItem: {
    // color: "black",
    marginTop: "20px",
    alignItems: "center",
  },
  ListItemText: {
    marginLeft: 15,
    fontSize: 14,
  },
  Item: {
    cursor: "pointer",
  },
};

//@ts-ignore
export default withTranslation()(withStyles(dashBoard)(withRouter(VisitorsSidebar)));
// Customizable Area End
