import React from "react";
import { Box, Button } from "@material-ui/core";

const ChairmanCategoryBox = ({ image, heading, value }: any) => {
  return (
    <Box className="item">
      <div className="heading">
        <img src={image} />
        <h4>{heading}</h4>
      </div>
      {value > 0 && <Button className="color-btn">{value}</Button>}
    </Box>
  );
};

export default ChairmanCategoryBox;
