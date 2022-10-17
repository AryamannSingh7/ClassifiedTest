import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
  Input,
  FormControl,
  Divider,
  MenuItem,
  Card,
  Link,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, UploadIcon, PdfIcon } from "./assets";
import RegisterTenantController, { Props } from "./RegisterTenantController.web";
import { withTranslation } from "react-i18next";
import { TenantStyle } from "./TenantStyle.web";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import Loader from "../../../components/src/Loader.web";

class RegisterTenantContract extends RegisterTenantController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const tenant_id = this.props.navigation.getParam("id");
    this.setState({ tenantId: tenant_id }, () => {
      this.getTenantDetails();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box
          style={{
            background: this.state.contract ? "#F4F7FF" : "white",
            height: "100vh",
          }}
          className={classes.selectTemplate}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/RegisterTenant">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Register A Tenant")}</span>
                  </div>
                </Box>

                {this.state.contract ? (
                  <Box className="pdf-submit">
                    <Container>
                      <Box className="pdf-preview">
                        <Box className="pdf-box">
                          <img src={PdfIcon} alt="" />
                          <Box className="pdf-info">
                            <Box className="heading">
                              <h4>{this.state.contract.name}</h4>
                              <div className="right-menu">
                                <Menu
                                  menuButton={
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                >
                                  {/* <MenuItem>{t("Download")}</MenuItem> */}
                                  <MenuItem onClick={() => this.setState({ contract: null })}>{t("Delete")}</MenuItem>
                                </Menu>
                              </div>
                            </Box>
                            <Box className="data">
                              <span>{this.state.contractPageCount}</span> pages{" "}
                              <span>{this.niceBytes(this.state.contract.size)}</span>{" "}
                              {moment(this.state.contract.astModifiedDate).format("MMMM DD, YYYY")}
                            </Box>
                          </Box>
                        </Box>
                        <Box className="submit-button-box">
                          <Button className="submit" onClick={() => this.handleSubmitTenantContract()}>
                            {t("Submit")}
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </Box>
                ) : (
                  <Container className="page-container">
                    <Box className="issue-lease-content">
                      <Box className="select-input-box">
                        <FormControl fullWidth>
                          <Box className="upload-box" onClick={() => this.uploadContract.click()}>
                            <img src={UploadIcon} alt="" />
                            <p>{t("Upload Rent Contract")}</p>
                          </Box>
                          <input
                            onChange={(e: any) => {
                              const file = e.target.files[0];

                              let reader: any = new FileReader();
                              reader.onloadend = () => {
                                const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                                this.setState({ contract: file, contractPageCount: count });
                              };
                              reader.readAsBinaryString(file);
                            }}
                            ref={(ref: any) => (this.uploadContract = ref)}
                            accept=".pdf"
                            type="file"
                            style={{ display: "none" }}
                            multiple
                          />
                        </FormControl>

                        <Box className="divider-box">
                          <Divider />
                          <span>{t("OR")}</span>
                          <Divider />
                        </Box>

                        <Box className="register-button-box">
                          <Link href="/IssueLease">
                            <Button className="now">{t("Issue A Lease Now")}</Button>
                          </Link>
                          <Link href="/Tenants">
                            <Button className="later">{t("Issue A Lease Later")}</Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(TenantStyle)(RegisterTenantContract));
