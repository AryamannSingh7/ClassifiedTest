// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
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
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LanguageIcon from "@material-ui/icons/Language";
import IssueLeaseController, {
  Props,
} from "./IssueLeaseController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TemplateIcon from "../assets/template.png";
import EarthIcon from "../assets/earth.png";
import BuildingIcon from "../assets/select-building.png";
import CubeIcon from "../assets/cube.png";

class IssueLease extends IssueLeaseController {
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
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/Contracts">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    Issue a Lease
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content">
                    <Box className="select-input-box">
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
                          Unit Number
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Box>
                    <Box className="tenant-info">
                      <Box>
                        <span>Tenant Name:</span>
                        <p>Mr. Ali Khan</p>
                      </Box>
                      <Box>
                        <Link>Register a New Tenant</Link>
                      </Box>
                    </Box>
                    <Box className="templates-list">
                      <h3>Select Lease Template</h3>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                            <div className="right-menu">
                              <span>Default</span>
                            </div>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card className="template">
                            <div className="content">
                              <div className="image">
                                <img src={TemplateIcon} alt="" />
                              </div>
                              <h4>Lease Template 1</h4>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="contract-info">
                      <Card className="contract">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <div className="header">
                              <Link href={``}>
                                <h4>Contract 1</h4>
                              </Link>
                              <div className="right-menu">
                                <Menu
                                  menuButton={
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                >
                                  <MenuItem>Download</MenuItem>
                                  <MenuItem>Share</MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="info">
                          <Grid item xs={6}>
                            <span>Expires on</span>
                            <p>30-04-2022</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Building</span>
                            <p>Building</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Unit</span>
                            <p>Unit</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Tenant Name</span>
                            <p>Tenant Name</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Contract Type</span>
                            <p>Contract Type</p>
                          </Grid>
                          <Grid item xs={6}>
                            <span>Contract State</span>
                            <p>Contract State</p>
                          </Grid>
                        </Grid>
                      </Card>
                      <p>
                        Contract is already assigned to <span>Mr Ali Khan</span>{" "}
                        for <span>Building 1 Unit 102</span>. You will have to
                        end or terminate contract in order to issue a new
                        contract.
                      </p>
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

export default withStyles(ContractsStyleWeb)(IssueLease);
// Customizable Area End
