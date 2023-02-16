// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import { communityManagement, meetings, myTeam, TenantLogo } from "./assets";
import "../../../web/src/assets/css/style.scss";
import { Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { withRouter } from "react-router-dom";
import DashboardController, { Props } from "./DashboardController.web";
import { withTranslation } from "react-i18next";

class ServiceProviderSideBar extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    this.getUnreadCount();
  }

  render() {
    const { t }: any = this.props;

    return (
      <>
        <Box className="AccordinoList">
          {/* Dashboard */}
          <Accordion expanded={this.state.expanded == `panel1`} onChange={this.handleAccordinoChange(`panel1`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              aria-controls={"panel2bh-content"}
              id={"Dashboards"}
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">{t("My Dashboard")}</Typography>
            </AccordionSummary>

            <AccordionDetails onClick={() => this.props.navigation.navigate("DashboardGeneral")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("General Dashboard")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/DashboardTicket");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Ticket Dashboard")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/VisitorList");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Visitors Dashboard")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/DashboardBudget");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Budget Dashboard")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/DashboardActions");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Action Assigned to me")}
              </Typography>
            </AccordionDetails>
          </Accordion>
       
        
          {/* Buildings & Apartments */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.navigation.navigate("Complex")}>
              <Typography className="SingleLinkSize">{t("Complex & Apartments")}</Typography>
            </div>
          </Box>
       
     
          {/* Document & Reports */}
          <Accordion expanded={this.state.expanded == `panel6`} onChange={this.handleAccordinoChange(`panel6`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">{t("Documents & Reports")}</Typography>
            </AccordionSummary>
            <AccordionDetails style={dashBoard.Item} onClick={() => this.props.navigation.navigate("DocumentChairman")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("Document")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails style={dashBoard.Item} onClick={() => this.props.navigation.navigate("ReportDashboard")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("Report")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Chat */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/chairmanchat");
              }}
            >
              <Typography className="SingleLinkSize">{t("Chat")}</Typography>
            </div>
          </Box>
          {/* Help */}
          <Accordion expanded={this.state.expanded == `panel7`} onChange={this.handleAccordinoChange(`panel7`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">{t("Help")}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.navigation.navigate("SubscriptionDetail")}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Subscription")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails style={dashBoard.Item} onClick={() => this.props.navigation.navigate("FaqChairman")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("Frequently asked questions")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.navigation.navigate("ContactUsChairman")}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Contact Us")}
              </Typography>
            </AccordionDetails>
          </Accordion>
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
export default withTranslation()(withStyles(dashBoard)(withRouter(ServiceProviderSideBar)));
// Customizable Area End
