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
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import ContractsListController, { Props } from "./ContractsListController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";

import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TemplateIcon from "../assets/template.png";

class ContractsList extends ContractsListController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          style={{ background: "#F4F7FF", height: "100vh" }}
          className={classes.contractList}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    Contracts
                  </div>
                  <div className="right-icon">
                    <img src={SortIcon} alt="SortIcon" />
                    <img src={FilterIcon} alt="FilterIcon" />
                  </div>
                </Box>
                <Container>
                  <Box className="select">
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isContractOpen: true,
                          },
                          () => {}
                        );
                      }}
                      label="My Contracts"
                      className={this.state.isContractOpen ? "active" : ""}
                    />
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isContractOpen: false,
                          },
                          () => {}
                        );
                      }}
                      label="Saved Templates"
                      className={!this.state.isContractOpen ? "active" : ""}
                    />
                  </Box>
                  {this.state.isContractOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="contracts-list">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Card className="contract">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <Link href={``}>
                                        <h4>asdasdasdadd</h4>
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
                                    <span>Company Name</span>
                                    <p>Company Name</p>
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
                            </Grid>
                            <Grid item xs={12}>
                              <Card className="contract">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <Link href={``}>
                                        <h4>asdasdasdadd</h4>
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
                            </Grid>
                          </Grid>
                        </div>
                        <div className="upload-button">
                          <Grid container>
                            <Grid item xs={12} md={12}>
                              <Link href="/IssueContract">
                                <Button>Issue A New Contract</Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
                  {!this.state.isContractOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="templates-list">
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
                              </Card>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="upload-button">
                          <Grid container>
                            <Grid item xs={12} md={12}>
                              <Link href="/IssueLease">
                                <Button>Create Another Template</Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
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

export default withStyles(ContractsStyleWeb)(ContractsList);
// Customizable Area End
