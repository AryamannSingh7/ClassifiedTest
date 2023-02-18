// Customizable Area Start
import React from "react";
import { Button, Container, IconButton, Link, withStyles, Box, Grid, Card } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerRequestController, { Props } from "./PropertyManagerRequestController.web";
import { BuildingLogo } from "./assets";
import { withTranslation } from "react-i18next";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import Loader from "../../../components/src/Loader.web";

class PropertyManagerRequest extends PropertyManagerRequestController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F7F9FE", height: "100vh" }} className={classes.managerList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    {t("New Request")}
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <div className="content-box">
                      <div className="contracts-list">
                        <Grid container spacing={2}>
                          {this.state.requestList.length === 0 && (
                            <Grid item xs={12}>
                              <Card className="contract">{t("No request found")}</Card>
                            </Grid>
                          )}
                          {this.state.requestList.map((request: any) => {
                            return (
                              <Grid item xs={12} key={request.id}>
                                <Card className="contract">
                                  <Link href={`/PropertyManagers/Request/${request.id}`}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <div className="header">
                                          <h4>
                                            {request.attributes.property_manager &&
                                              this.validationText(request.attributes.property_manager.name)}
                                          </h4>
                                        </div>
                                      </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="info">
                                      <Grid item xs={12}>
                                        <span>{t("Manages")}</span>
                                        <p>
                                          Building {this.validationText(request.attributes.building_management.name)}{" "}
                                          Unit{" "}
                                          {this.validationText(
                                            request.attributes.apartment_management.data.attributes.apartment_name
                                          )}
                                        </p>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <span>{t("Company Name")}</span>
                                        <p>
                                          {request.attributes.property_manager &&
                                            this.validationText(request.attributes.property_manager.company_name)}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Link>
                                  <Grid container spacing={2} className="request-buttons">
                                    <Grid item xs={6}>
                                      <Button
                                        className="decline"
                                        onClick={() => {
                                          this.setState({ loading: true }, () => {
                                            this.updateManagerRequest(request.id, "Rejected");
                                          });
                                        }}
                                      >
                                        {t("Decline")}
                                      </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Button
                                        onClick={() => {
                                          this.setState({ loading: true }, () => {
                                            this.updateManagerRequest(request.id, "Accepted");
                                          });
                                        }}
                                      >
                                        {t("Accept")}
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </div>
                    </div>
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

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(PropertyManagerRequest));
// Customizable Area End
