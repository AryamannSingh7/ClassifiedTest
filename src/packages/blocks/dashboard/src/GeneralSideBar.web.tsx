// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";
import ServiceProviderSideBarWeb from "./ServiceProviderSideBar.web";

class GeneralSideBar extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const userType = localStorage.getItem("userType");

    return (
      <>{userType === "Security" ? <VisitorsSidebar {...this.props} /> : userType === "ServiceProvider" ? <ServiceProviderSideBarWeb/>: <ChairmanSidebarWeb {...this.props} />}</>
    );
  }
}

//@ts-ignore
export default withTranslation()(withRouter(GeneralSideBar));
// Customizable Area End
