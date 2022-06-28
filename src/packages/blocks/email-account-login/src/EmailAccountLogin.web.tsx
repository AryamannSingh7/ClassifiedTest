import React from "react";
//components
import {
  Box,
  Button,
} from "@material-ui/core";
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';

//resources
//import { Landing_Banner, Tenant_Logo } from "../src/assets";
// Customizable Area End

import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController";

// const [values, setValues] = React.useState({
//   amount: '',
//   password: '',
//   weight: '',
//   weightRange: '',
//   showPassword: false,
// });

// const handleChange = (prop:any) => (event:any) => {
//   setValues({ ...values, [prop]: event.target.value });
// };

// const handleClickShowPassword = () => {
//   setValues({
//     ...values,
//     showPassword: !values.showPassword,
//   });
// };

// const handleMouseDownPassword = (event:any) => {
//   event.preventDefault();
// };

export default class EmailAccountLogin extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box className="login-wrapper">
          <Box className="header-block">
            <img src={'#'} className="tenant-logo" alt="" />
            <h1>Welcome Back</h1>
            <p>Login with your account credentials </p>
          </Box>
          <Box>
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />} 
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}
          </Box>
          <Box className="customButton row-btn">
            <Button variant="contained">login</Button>
          </Box>
        </Box>
      </>
    );
  }
}

// Customizable Area End