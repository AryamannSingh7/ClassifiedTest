import * as React from "react";
// custom components
import {
  Button,
} from "@material-ui/core";
import "../../web/src/assets/css/content/button.scss";

export default function CustomButton(props: any) {

  return (
    <div className="customButton">
      <Button {...props}>
        <span className="plus_icon"></span>
        <span>{props.label}</span>
      </Button>
    </div>
  );
}
