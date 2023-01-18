// Customizable Area Start
import React from "react";
import "./Dashboard.web.css";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from "react-router-dom";
import DashboardController, { Props } from "./DashboardController.web";
import { withTranslation } from "react-i18next";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";

class GeneralSideBar extends React.Component {
  constructor(props: Props) {
    super(props);
  }

//   async componentDidMount() {
//     this.getUnreadCount();
//   }
  render() {
    const { t }: any = this.props;
    const { classes }: any = this.props;
    const userType  = localStorage.getItem("userType");

    return (
      <>
         {
               userType === "Security" ? 
                  <VisitorsSidebar {...this.props} />
                      :
                  <ChairmanSidebarWeb {...this.props} /> 
         }
      </>
    );
  }
}


//@ts-ignore
export default withTranslation()(withRouter(GeneralSideBar));
// Customizable Area End
