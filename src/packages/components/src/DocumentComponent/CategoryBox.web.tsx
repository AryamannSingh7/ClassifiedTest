import React from "react";
import { Box, Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const CategoryBox = ({ image, heading, value }: any) => {
  return (
    <Box className="item">
      <div className="heading">
        <img src={image} />
        <h4 className="bold-text">{heading}</h4>
      </div>
      <div>
        {value > 0 && <Button className="color-btn">{value}</Button>}
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default CategoryBox;
