import React from "react";
import { Card, Grid, Box } from "@material-ui/core";

const RentedVsEmptyUnitCard = ({ heading, titleOne, valueOne, titleTwo, valueTwo, status }: any) => {
  return (
    <Card className="rented-empty-card">
      <Box className="heading">
        <h4 className="bold-text">{heading}</h4>
        {status && <span className={status}>{status}</span>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span>{titleOne}</span>
          <p>{valueOne}</p>
        </Grid>
        <Grid item xs={6}>
          <span>{titleTwo}</span>
          <p>{valueTwo}</p>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RentedVsEmptyUnitCard;
