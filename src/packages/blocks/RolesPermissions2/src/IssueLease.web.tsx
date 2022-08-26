// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Card,
  Select,
  ListItemIcon,
  OutlinedInput,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IssueContractController, { Props } from "./IssueContractController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import BuildingLogo from "../assets/building.png";
import TemplateIcon from "../assets/template.png";
import EarthIcon from "../assets/earth.png";

class IssueContract extends IssueContractController {
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

export default withStyles(ContractsStyleWeb)(IssueContract);
// Customizable Area End
