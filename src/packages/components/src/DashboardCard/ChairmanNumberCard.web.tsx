import * as React from "react";
import { Box, Card } from "@material-ui/core";

const ChairmanNumberCard = ({ image, heading, titleOne, valueOne, titleTwo, valueTwo }: any) => {
  return (
    <Card className="dashboard-card-box">
      <Box className="card-image">
        <img src={image} alt="image" />
      </Box>
      <h4 className="bold-text">{heading}</h4>
      <Box className="card-bottom-info">
        <Box className="info-box">
          {titleOne && <p>{titleOne}</p>}
          {valueOne && <span>{valueOne}</span>}
        </Box>
        <Box className="info-box">
          <p>{titleTwo}</p> <span>{valueTwo}</span>
        </Box>
      </Box>
    </Card>
  );
};

export default ChairmanNumberCard;
