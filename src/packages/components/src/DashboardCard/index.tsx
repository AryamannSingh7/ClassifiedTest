import * as React from "react";
import { Button, Card } from "@material-ui/core";

const DashboardCard = ({ image, heading, title, value }: any) => {
  return (
    <Card>
      <div className="image">
        <img src={image} alt="" style={{ width: "25px", height: "25px" }} />
      </div>
      <h4 className="heading bold-text">{heading}</h4>
      <div className="state">
        <p>{title}</p>
        <Button className="yellow">{value}</Button>
      </div>
    </Card>
  );
};

export default DashboardCard;
