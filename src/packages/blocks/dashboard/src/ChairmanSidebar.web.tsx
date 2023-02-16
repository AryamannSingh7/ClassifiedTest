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

class ChairmanSidebar extends DashboardController {
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
          {/* My Team */}
          <Accordion expanded={this.state.expanded == `panel2`} onChange={this.handleAccordinoChange(`panel2`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              id="ListItem"
              className="ListItem"
            >
              <Typography>
                <img src={myTeam} alt="" />
              </Typography>
              <Typography className="ListItemText">{t("My Team")}</Typography>
            </AccordionSummary>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/TeamMembers");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Team Members")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/Nominations");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Chairman and Vice Chairman Nomination")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/TaskManagement");
              }}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Task Management")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Community Management */}
          <Accordion expanded={this.state.expanded == `panel3`} onChange={this.handleAccordinoChange(`panel3`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              aria-controls={"panel2bh-content"}
              id={"Dashboards"}
              style={dashBoard.ListItem}
            >
              <Typography>
                <img src={communityManagement} alt="" />
              </Typography>
              <Typography className="ListItemText">{t("Community Management")}</Typography>
            </AccordionSummary>

            <AccordionDetails onClick={() => this.props.navigation.navigate("CommunityUserProfile")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("User Profiles")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                // this.props.history.push("/CommunityRequestManagement");
              }}
            >
              <Typography variant="body2" className="cursor-pointer" onClick={() => this.props.navigation.navigate("CommunityRequestManagement")}>
                {t("Request Management")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails onClick={() => this.props.navigation.navigate("Announcements")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("Announcements")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails onClick={() => this.props.navigation.navigate("Suggestions")}>
              <Typography variant="body2" className="cursor-pointer">
                {t("Suggestion")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Invoices & Receipts */}
          <Accordion expanded={this.state.expanded == `panel4`} onChange={this.handleAccordinoChange(`panel4`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              aria-controls={"panel2bh-content"}
              id={"panel2bh-header"}
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">{t("Invoices & Receipts")}</Typography>
            </AccordionSummary>

            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/CharmainInvoices");
              }}
            >
              <Typography variant="body2">{t("Invoices")}</Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/CharmainReceipts");
              }}
            >
              <Typography variant="body2">{t("Receipts")}</Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/PaymentHistory");
              }}
            >
              <Typography variant="body2">{t("Payment History")}</Typography>
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
          {/* Meetings */}
          <Accordion expanded={this.state.expanded == `panel5`} onChange={this.handleAccordinoChange(`panel5`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosOutlinedIcon style={{ width: 16, height: 16 }} />}
              style={dashBoard.ListItem}
            >
              <Typography>
                <img src={meetings} alt="" />
              </Typography>
              <Typography className="ListItemText">{t("Meeting")}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.navigation.navigate("ChairmanScheduledMeeting")}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Scheduled Meetings")}
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.navigation.navigate("ChairmanMeetingMinutes")}
            >
              <Typography variant="body2" className="cursor-pointer">
                {t("Meeting Minutes")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Poll / Survey */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/Polling");
              }}
            >
              <Typography className="SingleLinkSize">{t("Poll/Survey")}</Typography>
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
          {/* Incident Management */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/IncidentManagement");
              }}
            >
              <Typography className="SingleLinkSize">{t("Incident Management")}</Typography>
            </div>
          </Box>

          {/* Facility Reservation */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div
              onClick={() => {
                //@ts-ignore
                this.props.history.push("/ManagerFacilityReservation");
              }}
            >
              <Typography className="SingleLinkSize">{t("Facility Reservation")}</Typography>
            </div>
          </Box>
        </Box>

        <Box className="SideBarBottom">
          <Box>
            <Typography style={{ fontSize: 10, fontWeight: 600 }}>
              <Box component="span" style={dashBoard.PremimumPlan}>
                {t("Premimum")}
              </Box>
              {t("Plan")}
            </Typography>
            <Typography style={{ fontSize: 12, marginTop: 10 }}>
              {t("Expires in")} 125 {t("days")}
            </Typography>
          </Box>
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
export default withTranslation()(withStyles(dashBoard)(withRouter(ChairmanSidebar)));
// Customizable Area End
