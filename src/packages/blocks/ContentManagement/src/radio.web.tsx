import * as React from "react";
// custom components
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from "@material-ui/core";
import "../../../web/src/assets/css/content/radio.styles.scss";

const CustomRadioButton = (props: any) => {
    console.log("props.....", props)
    const { label } = props
    return (
        <div className="customRadio">
            <FormControl component="fieldset">
                <RadioGroup aria-label="quiz" name={props.name}>
                    <FormControlLabel value={props.id} control={<Radio />} label={label} />
                </RadioGroup>
            </FormControl>
        </div >
    );
}
export default CustomRadioButton
