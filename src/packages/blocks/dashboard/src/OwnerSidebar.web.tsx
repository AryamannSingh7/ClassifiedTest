// Customizable Area Start
// @ts-ignore
// @ts-nocheck
import * as React from "react";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  Link,
  Divider,
  List,
  Drawer,
  ListItem,
  Avatar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { keyhand } from "./assets";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const MenuList = [
  {
    name: "Profile",
    url: "",
    img: "",
  },
  {
    name: "Fees & Payments",
    url: "",
    img: "",
  },
  {
    name: "My Units",
    url: "",
    img: "",
  },
  {
    name: "My Neighbors",
    url: "",
    img: "",
  },
  {
    name: "Email Alerts",
    url: "",
    img: "",
  },
  {
    name: "FAQ",
    url: "/FaqOwner",
    img: "",
  },
];

const OwnerSidebar = ({ isMenuOpen, handleClose }: any) => {
  return (
    <React.Fragment>
      <Drawer open={isMenuOpen} onClose={() => handleClose()}>
        <div style={{ width: 350 }}>
          <div
            onClick={() => handleClose()}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 20px",
            }}
          >
            <IconButton>
              <CloseIcon />
            </IconButton>{" "}
            Menu
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px 20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src=""
              style={{
                width: "80px",
                height: "80px",
                marginBottom: "10px",
              }}
            >
              HN
            </Avatar>
            <h4>Remy Sharp</h4>
            <p>abc@gmail.com</p>
          </div>
          <Divider />
          <List>
            {MenuList.map((menu, index) => (
              <ListItem key={index}>
                <Link
                  href={menu.url}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        borderRadius: "50%",
                        background: "#FFEBDB",
                        padding: "15px",
                        marginRight: "15px",
                      }}
                    >
                      <img src={keyhand} alt="" width="25px" height="25px" />
                    </div>
                    <p>{menu.name}</p>
                  </div>
                  <ArrowForwardIosOutlinedIcon
                    style={{ width: "14px", fill: "black" }}
                  />
                </Link>
              </ListItem>
            ))}
            <ListItem>
              <div
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      borderRadius: "50%",
                      background: "#FFEBDB",
                      padding: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <img src={keyhand} alt="" width="25px" height="25px" />
                  </div>
                  <p>Logout</p>
                </div>
                <ArrowForwardIosOutlinedIcon style={{ width: "14px" }} />
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles()(withRouter(OwnerSidebar));

// Customizable Area End
