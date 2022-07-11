import React from "react";
import { CircularProgress, Backdrop } from "@material-ui/core";
interface myProps {
  loading: boolean;
}

export default function Loader(props: myProps) {
  return (
    <Backdrop
      style={{ zIndex: 9999, color: "#ffffff" }}
      open={props.loading}
      onClick={() => {}}
    >
      <CircularProgress style={{ color: "#2c6fed" }} />
    </Backdrop>
  );
}
