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
import { BuildingLogo, TemplateIcon, BuildingIcon, CubeIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";

class IssueLease extends IssueContractController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

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
                    <span>{t("Issue a Lease")}</span>
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
                          {t("Building Name")}
                        </MenuItem>
                        {this.state.buildingList.map((building: any) => {
                          return (
                            <MenuItem
                              key={building.id}
                              value={building.id}
                              onClick={() => this.setState({ buildingName: building.name })}
                            >
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
                          {t("Unit Number")}
                        </MenuItem>
                        {this.state.unitList.map((unit: any) => {
                          return (
                            <MenuItem
                              key={unit.id}
                              value={unit.id}
                              onClick={() => this.setState({ unitName: unit.apartment_name })}
                            >
                              {unit.apartment_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Box>
                    <Box className="tenant-info">
                      <Box>
                        {this.state.tenant && (
                          <>
                            <span>{t("Tenant Name")}:</span>
                            <p>{this.state.tenant && this.state.tenant.full_name}</p>
                          </>
                        )}
                      </Box>
                      <Box>
                        <Link href="/RegisterTenant">{t("Register a New Tenant")}</Link>
                      </Box>
                    </Box>

                    {this.state.contract &&
                    (this.state.contract.attributes.status === "Pending" ||
                      this.state.contract.attributes.status === "Active") &&
                    this.state.tenant ? (
                      <Box className="contract-info">
                        <Card className="contract">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <div className="header">
                                <h4>Contract {this.state.contract.id}</h4>
                                <div className="right-menu">
                                  <Menu
                                    menuButton={
                                      <IconButton>
                                        <MoreVertIcon />
                                      </IconButton>
                                    }
                                  >
                                    <MenuItem
                                      onClick={() =>
                                        this.props.navigation.navigate("ContractDetail", {
                                          id: this.state.contract.id,
                                        })
                                      }
                                    >
                                      {t("View")}
                                    </MenuItem>
                                    <MenuItem>
                                      <Link
                                        target="_blank"
                                        href={
                                          this.state.contract.attributes.custom_contract
                                            ? this.state.contract.attributes.custom_contract_image.url
                                            : this.state.contract.attributes.contract_template_pdf.url
                                        }
                                      >
                                        {t("Download")}
                                      </Link>
                                    </MenuItem>
                                  </Menu>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} className="info">
                            <Grid item xs={6}>
                              <span>{t("Expires on")}</span>
                              <p>
                                {this.state.contract.attributes.expires_on
                                  ? moment(this.state.contract.attributes.expires_on, "YYYY-MM-DD").format(
                                      "MMMM DD, YYYY"
                                    )
                                  : "-"}
                              </p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Building")}</span>
                              <p>{this.state.buildingName}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Unit")}</span>
                              <p>{this.state.unitName}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Tenant Name")}</span>
                              <p>{this.state.contract.attributes.tenant_name}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Contract Type")}</span>
                              <p>{this.state.contract.attributes.contract_type}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Contract State")}</span>
                              <p>{this.state.contract.attributes.status}</p>
                            </Grid>
                          </Grid>
                        </Card>
                        <p>
                          {t("Contract is already assigned to")} <span>{this.state.tenant.full_name}</span> {t("for")}{" "}
                          <span>
                            Building {this.state.buildingName} Unit {this.state.unitName}
                          </span>
                          . {t("You will have to end or terminate contract in order to issue a new contract.")}
                        </p>
                      </Box>
                    ) : (
                      <Box className="templates-list">
                        <h3>{t("Select Lease Template")}</h3>
                        <Grid container spacing={2}>
                          {this.state.templatesList.length === 0 && (
                            <Grid item xs={12}>
                              <Card className="template">{t("No Template Available")}</Card>
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
                                      <span>{t("Default")}</span>
                                    </div>
                                  )}
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    )}
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
