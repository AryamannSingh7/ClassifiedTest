import React from "react";
import { Card, Grid } from "@material-ui/core";

const UnitCard = ({ heading, titleOne, valueOne, titleTwo, valueTwo }: any) => {
  return (
    <Card className="rented-empty-card">
      <h4>{heading}</h4>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span>{titleOne}</span>
          <p className="orange">{valueOne}</p>
        </Grid>
        <Grid item xs={6}>
          <span>{titleTwo}</span>
          <p className="orange">{valueTwo}</p>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UnitCard;
