import * as React from "react";
import { Button, Card } from "@material-ui/core";

const DashboardCard = ({ image, heading, title, value }: any) => {
  return (
    <Card>
      <div className="image">
        <img src={image} alt="keyhand" />
      </div>
      <h4 className="heading">{heading}</h4>
      <div className="state">
        <p>{title}</p>
        <Button className="yellow">{value}</Button>
      </div>
    </Card>
  );
};

export default DashboardCard;
