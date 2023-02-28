import React from "react";
import { Box, Card } from "@material-ui/core";

const ExpenseCard = ({ heading, title, value }: any) => {
  return (
    <Card className="expense-card">
      <Box className="expense-card-box">
        <h4 className="bold-text">{heading}</h4>
        <p>{title}</p>
        <h4 className="amount">{value}</h4>
      </Box>
    </Card>
  );
};

export default ExpenseCard;
