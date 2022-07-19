//@ts-ignore
//@ts-nocheck

import React, { Component } from "react";
import RichTextEditor from "react-rte";

const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'c<ustom-css-class>'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
    //   {label: 'textAlign', style: 'center'}
    ]
  };

export default class TextEditor extends Component {
  value = RichTextEditor.createValueFromString(this.props.markup, "html");
  state = {
    value: this.value
  };

  onChange = (value) => {
    this.setState({ value  });
    if (this.props.onChange) {
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    return <RichTextEditor 
    toolbarConfig={toolbarConfig}
    value={this.state.value} 
    onChange={this.onChange} />;
  }
}
