import * as React from "react";
import { Button, Card } from "@material-ui/core";
import { DashboardVs } from "../assets";

const DashboardBigCard = ({ FHeader, fTitle, fValue, sHeader, sTitle, sValue }: any) => {
  return (
    <Card className="big-box">
      <div className="content-box">
        <div className="left-content">
          <h4 className="heading">{FHeader}</h4>
          <div className="state">
            <p>{fTitle}</p>
            <Button className="yellow">{fValue}</Button>
          </div>
        </div>
        <div className="center-content">
          <div className="image">
            <img src={DashboardVs} alt="keyhand" />
          </div>
          <div className="vertical-line" />
          <div className="image text">
            <h4>VS</h4>
          </div>
          <div className="vertical-line" />
        </div>
        <div className="right-content">
          <h4 className="heading">{sHeader}</h4>
          <div className="state">
            <p>{sTitle}</p>
            <Button className="yellow">{sValue}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardBigCard;
