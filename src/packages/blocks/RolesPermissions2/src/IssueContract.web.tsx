// Customizable Area Start
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
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IssueContractController, { Props } from "./IssueContractController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, TemplateIcon, EarthIcon, BuildingIcon, CubeIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class IssueLease extends IssueContractController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
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
                        value={this.state.buildingId}
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                        onChange={(e: any) => {
                          this.setState({ buildingId: e.target.value }, () => {
                            this.getUnits();
                          });
                        }}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={BuildingIcon} alt="" />
                          </ListItemIcon>
                          Building Name
                        </MenuItem>
                        {this.state.buildingList.map((building: any) => {
                          return (
                            <MenuItem key={building.id} value={building.id}>
                              {building.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <Select
                        displayEmpty
                        value={this.state.unitId}
                        variant="filled"
                        fullWidth
                        className="select-input"
                        input={<OutlinedInput />}
                        onChange={(e: any) => {
                          this.setState({ unitId: e.target.value }, () => {
                            this.handleCheckContractExist();
                          });
                        }}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          Unit Number
                        </MenuItem>
                        {this.state.unitList.map((unit: any) => {
                          return (
                            <MenuItem key={unit.id} value={unit.id}>
                              {unit.apartment_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Box>
                    <Box className="tenant-info">
                      <Box>
                        <span>Tenant Name:</span>
                        <p>Mr. Ali Khan</p>
                      </Box>
                      <Box>
                        <Link href="/IssueContract">Register a New Tenant</Link>
                      </Box>
                    </Box>
                    <Box className="templates-list">
                      <h3>Select Lease Template</h3>
                      <Grid container spacing={2}>
                        {this.state.templatesList.length === 0 && (
                          <Grid item xs={12}>
                            <Card className="template">No Template Available</Card>
                          </Grid>
                        )}
                        {this.state.templatesList.map((template: any, index: number) => {
                          return (
                            <Grid item xs={6} key={template.id}>
                              <Card className="template" onClick={() => this.handleGotoTemplate(template.id)}>
                                <div className="content">
                                  <div className="image">
                                    <img src={TemplateIcon} alt="" />
                                  </div>
                                  <h4>{template.attributes.title}</h4>
                                </div>
                                {index === 0 && (
                                  <div className="right-menu">
                                    <span>Default</span>
                                  </div>
                                )}
                              </Card>
                            </Grid>
                          );
                        })}
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
                        Contract is already assigned to <span>Mr Ali Khan</span> for <span>Building 1 Unit 102</span>.
                        You will have to end or terminate contract in order to issue a new contract.
                      </p>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingLogo.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(IssueLease));
// Customizable Area End
