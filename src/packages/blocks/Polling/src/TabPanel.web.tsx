
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"

import PollingController, {
    Props,
    configJSON,
  } from "./PollingController";

export default class TabPanel extends PollingController {
    constructor(props: Props) {
        super(props);
      }
      
    render(){
        return (
            <div
              role="tabpanel"
              hidden={this.props.value !== this.props.index}
              id={`simple-tabpanel-${this.props.index}`}
              style={{marginBottom:"25px"}}
            >

            {this.props.value === this.props.index && <div>{this.props.children}</div>}

            </div>
          );
    }

  }