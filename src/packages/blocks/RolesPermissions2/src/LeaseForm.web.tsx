// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React, { useRef } from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  Tab,
  MenuItem,
  Card,
  Select,
  ListItemIcon,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LanguageIcon from "@material-ui/icons/Language";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TemplateIcon from "../assets/template.png";
import EarthIcon from "../assets/earth.png";
import BuildingIcon from "../assets/select-building.png";
import CubeIcon from "../assets/cube.png";
import LeaseFormController, { Props } from "./LeaseFormController.web";

class LeaseForm extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "white", height: "100vh" }}
          className={classes.selectTemplate}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/IssueContract/1">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    Issue a Lease
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <h4 style={{ marginTop: "18px" }}>
                      Residential Rental Lease Agreement
                    </h4>
                    <Box className="select-input-box">
                      <Input
                        variant="filled"
                        fullWidth
                        className="select-input input"
                        placeholder="Tenant Name"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={EarthIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      <Input
                        variant="filled"
                        fullWidth
                        className="select-input input"
                        placeholder="Landlord Name"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={EarthIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={EarthIcon} alt="" />
                          </ListItemIcon>
                          Country
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={BuildingIcon} alt="" />
                          </ListItemIcon>
                          Region
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          City
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Complex Name
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Building Name
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Unit Name
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      <Input
                        variant="filled"
                        fullWidth
                        className="select-input input"
                        placeholder="Enter Agreement Duration"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={EarthIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      <Input
                        variant="filled"
                        fullWidth
                        className="select-input input"
                        placeholder="Start Contract Date"
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={EarthIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      <Input
                        variant="filled"
                        fullWidth
                        className="select-input input"
                        placeholder="Enter Monthly Rent Amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={EarthIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      <Select
                        displayEmpty
                        value=""
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Select Currency
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>

                      <div className="next-button">
                        <Link to="/">
                          <Button>Next</Button>
                        </Link>
                      </div>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(ContractsStyleWeb)(LeaseForm);
// Customizable Area End
