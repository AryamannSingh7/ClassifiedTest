import React from "react";
import { Box, Button } from "@material-ui/core";

const ItemBox = ({ image, heading, value }: any) => {
  return (
    <Box className="item">
      <div className="heading">
        <img src={image} />
        <h4 className="bold-text">{heading}</h4>
      </div>
      {value > 0 && <Button className="color-btn">{value}</Button>}
    </Box>
  );
};

export default ItemBox;
