import React from "react";
import { Box, Card } from "@material-ui/core";

const LocationCard = ({ image, style, heading, value }: any) => {
  return (
    <Card>
      <img src={image} style={style} />
      <Box className="location-info">
        <p>{heading}</p>
        <h4>{value}</h4>
      </Box>
    </Card>
  );
};

export default LocationCard;
