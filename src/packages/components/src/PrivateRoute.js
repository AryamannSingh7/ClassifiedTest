import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { ROLE } from "../../framework/src/Enum";

function Wrapper({ element, history, match, routeMap, closeModal }) {
  const navigate = (to, params) => {
    let url = routeMap[to].path;
    // replace params ids in the url with actual values
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((param) => {
        const re = RegExp(`\:${param}\\??`); // eslint-disable-line no-useless-escape
        url = url.replace(re, escape(params[param]));
      });
    }
    // removing empty params from url - every string between /: and ?
    url = url.replace(/\/:(.*?)(?=\/|$)/g, "");
    // if the route is not a modal
    if (!routeMap[to].modal) {
      history.push(url);
      // if the route is a modal
    } else {
      // checking if the url ends with a slash or not
      const slash = /\/$/.test(match.url) ? "" : "/";
      // current url in the browser + slash + modal url with parameters
      url = match.url + slash + url;
      // removing the */ from the url
      url = url.replace(/\*\/?/g, "");
      history.push(url);
    }
  };

  const getParam = (param, alternative) => {
    return match.params[param] || alternative;
  };

  const goBack = () => {
    history.goBack();
  };

  return React.cloneElement(element, {
    navigation: { navigate, getParam, goBack },
    closeModal,
  });
}

Wrapper.propTypes = {
  element: PropTypes.element,
  history: PropTypes.object,
  routeMap: PropTypes.object,
  closeModal: PropTypes.func,
  match: PropTypes.object,
};

const PrivateRoute = ({ roles, routeMap, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let currentUserRole = localStorage.getItem("userType");
      let userToken = localStorage.getItem("userToken");

      if (currentUserRole === undefined) {
        currentUserRole = "";
      }

      if (roles === undefined) {
        return <Wrapper element={<Component />} routeMap={routeMap} {...props} />;
      } else if (roles.includes(ROLE.PRIVATE) && userToken) {
        if (currentUserRole === ROLE.OWNER || currentUserRole === ROLE.PROPERTY_MANAGER) {
          return <Redirect to={{ pathname: "/OwnerDashboard", state: { from: props.location } }} />;
        } else if (currentUserRole === ROLE.CHAIRMAN) {
          return (
            <Redirect to={{ pathname: "/DashboardGeneral", state: { from: props.location } }} />
          );
        } else if (currentUserRole === ROLE.TENANT || currentUserRole === ROLE.OWNER_RESIDENT) {
          return (
            <Redirect to={{ pathname: "/ResidentDashboard", state: { from: props.location } }} />
          );
        } else {
          return <Wrapper element={<Component />} routeMap={routeMap} {...props} />;
        }
      } else if (roles.includes(ROLE.PRIVATE) && !userToken) {
        return <Wrapper element={<Component />} routeMap={routeMap} {...props} />;
      } else if (userToken === undefined || userToken === "" || !roles.includes(currentUserRole)) {
        return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
      } else {
        return <Wrapper element={<Component />} routeMap={routeMap} {...props} />;
      }
    }}
  />
);

export default PrivateRoute;
