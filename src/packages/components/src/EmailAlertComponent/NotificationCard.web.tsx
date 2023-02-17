import React from "react";
import { Box, Card, Switch } from "@material-ui/core";

const NotificationCard = ({ heading, emailAlert, t, updateStatus, updateTime, message }: any) => {
  return (
    <Card className="main-setting-box">
      <Box className="card-box-setting">
        <Box className="setting-content-box">
          <h4 className="bold-text">{t(heading)}</h4>
          <Switch checked={emailAlert.activated} onChange={(e: any) => updateStatus(e)} name="lease" color="primary" />
        </Box>
        {emailAlert.activated && (
          <Box className="setting-on-box">
            <p>{message}</p>
            <span className="setting-text" onClick={() => updateTime()}>
              {t("Change Settings")}
            </span>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default NotificationCard;
