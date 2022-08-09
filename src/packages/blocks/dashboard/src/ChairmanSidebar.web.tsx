// Customizable Area Start
// @ts-ignore
// @ts-nocheck

import React from "react";
import "./Dashboard.web.css";

import TenantLogo from "../assets/TenantLogo.png";

import "../../../web/src/assets/css/style.scss";

//images and Icons end

import { Typography, Link, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { withRouter } from "react-router-dom";
import DashboardController, { Props } from "./DashboardController";

const ItemsList = [
  "My Team",
  "Community Management",
  "Invoices & Receipts",
  "Meetings",
  "Buildings & Apartments",
];

class ChairmanSidebar extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Box className="AccordinoList">
          <Accordion
            expanded={this.state.expanded == `panel2`}
            onChange={this.handleAccordinoChange(`panel2`)}
          >
            <AccordionSummary
              expandIcon={
                <ArrowForwardIosOutlinedIcon
                  style={{ width: 16, height: 16 }}
                />
              }
              aria-controls={"panel2bh-content"}
              id={"panel2bh-header"}
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">My Dashboard</Typography>
            </AccordionSummary>

            <AccordionDetails
              onClick={() => this.props.history.push("/DashboardGeneral")}
            >
              <Typography variant="body2">General Dashboard</Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => this.props.history.push("/DashboardTicket")}
            >
              <Typography variant="body2">Ticket Dashboard</Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => this.props.history.push("/DashboardBudget")}
            >
              <Typography variant="body2">Budget Dashboard</Typography>
            </AccordionDetails>
            <AccordionDetails
              onClick={() => this.props.history.push("/DashboardActions")}
            >
              <Typography variant="body2">Action Assigned to me</Typography>
            </AccordionDetails>
          </Accordion>

          {ItemsList.map((val, index) => (
            <Accordion
              key={index}
              expanded={this.state.expanded == `panel + ${index}`}
              onChange={this.handleAccordinoChange(`panel + ${index}`)}
            >
              <AccordionSummary
                expandIcon={
                  <ArrowForwardIosOutlinedIcon
                    style={{ width: 16, height: 16 }}
                  />
                }
                aria-controls={"panel" + index + "bh-content"}
                id={"panel" + index + "bh-header"}
                className="ListItem"
              >
                <Typography>
                  <DashboardOutlinedIcon />
                </Typography>
                <Typography className="ListItemText">{val}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">sub headings</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.history.push("/Polling")}>
              <Typography className="SingleLinkSize">Poll/Survey</Typography>
            </div>
          </Box>
          {/*  Documents & Reports */}
          <Accordion
            expanded={this.state.expanded == `panel4`}
            onChange={this.handleAccordinoChange(`panel4`)}
          >
            <AccordionSummary
              expandIcon={
                <ArrowForwardIosOutlinedIcon
                  style={{ width: 16, height: 16 }}
                />
              }
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">
                Documents & Reports
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.history.push("/DocumentChairman")}
            >
              <Typography variant="body2">Document</Typography>
            </AccordionDetails>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.history.push("/ReportChairman")}
            >
              <Typography variant="body2">Report</Typography>
            </AccordionDetails>
          </Accordion>
          {/* Chat */}
          <Box className="SingleLink">
            <Typography className="SingleLinkSize">
              <DashboardOutlinedIcon />
            </Typography>
            <div onClick={() => this.props.history.push("/Chat")}>
              <Typography className="SingleLinkSize">Chat</Typography>
            </div>
          </Box>
          {/* Help */}
          <Accordion
            expanded={this.state.expanded == `panel3`}
            onChange={this.handleAccordinoChange(`panel3`)}
          >
            <AccordionSummary
              expandIcon={
                <ArrowForwardIosOutlinedIcon
                  style={{ width: 16, height: 16 }}
                />
              }
              style={dashBoard.ListItem}
            >
              <Typography>
                <DashboardOutlinedIcon />
              </Typography>
              <Typography className="ListItemText">Help</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.history.push("/SubscriptionDetail")}
            >
              <Typography variant="body2">Subscription</Typography>
            </AccordionDetails>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.history.push("/FaqChairman")}
            >
              <Typography variant="body2">
                Frequently asked questions
              </Typography>
            </AccordionDetails>
            <AccordionDetails
              style={dashBoard.Item}
              onClick={() => this.props.history.push("/ContactUsChairman")}
            >
              <Typography variant="body2">Contact Us</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box className="SideBarBottom">
          <Box>
            <Typography style={{ fontSize: 10, fontWeight: 600 }}>
              <Box component="span" style={dashBoard.PremimumPlan}>
                Premimum
              </Box>
              Plan
            </Typography>
            <Typography style={{ fontSize: 12, marginTop: 10 }}>
              Expires in 125 days
            </Typography>
          </Box>
          <Box>
            <img src={TenantLogo} alt="TenantLogo" width={110} />
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(dashBoard)(withRouter(ChairmanSidebar));

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
  },
  ListItemText: {
    marginLeft: 15,
    fontSize: 14,
  },
  Item: {
    cursor: "pointer",
  },
};

// Customizable Area End
