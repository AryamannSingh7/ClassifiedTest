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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, UploadIcon, PdfIcon } from "./assets";
import RegisterTenantController, { Props } from "./RegisterTenantController.web";
import { withTranslation } from "react-i18next";
import { TenantStyle } from "./TenantStyle.web";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class RegisterTenantContract extends RegisterTenantController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box
          style={{
            background: "#F4F7FF",
            //  background: "white",
            height: "100vh",
          }}
          className={classes.selectTemplate}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link to="/RegisterTenant">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Register A Tenant")}</span>
                  </div>
                </Box>

                {/* <Container className="page-container">
                  <Box className="issue-lease-content">
                    <Box className="select-input-box">
                      <FormControl fullWidth>
                        <Box className="upload-box">
                          <img src={UploadIcon} alt="" />
                          <p>{t("Upload Rent Contract")}</p>
                        </Box>
                        <Input type="file" style={{ display: "none" }} />
                      </FormControl>

                      <Box className="divider-box">
                        <Divider />
                        <span>{t("OR")}</span>
                        <Divider />
                      </Box>

                      <Box className="register-button-box">
                        <Button className="now">{t("Issue A Lease Now")}</Button>
                        <Button className="later">{t("Issue A Lease Later")}</Button>
                      </Box>
                    </Box>
                  </Box>
                </Container> */}

                <Box className="pdf-submit">
                  <Container>
                    <Box className="pdf-preview">
                      <Box className="pdf-box">
                        <img src={PdfIcon} alt="" />
                        <Box className="pdf-info">
                          <Box className="heading">
                            <h4>Pdf</h4>
                            <div className="right-menu">
                              <Menu
                                menuButton={
                                  <IconButton>
                                    <MoreVertIcon />
                                  </IconButton>
                                }
                              >
                                <MenuItem>{t("Download")}</MenuItem>
                                <MenuItem>{t("Delete")}</MenuItem>
                              </Menu>
                            </div>
                          </Box>
                          <Box className="data">
                            <span>55</span> pages <span>5</span> MB 08/10/2022
                          </Box>
                        </Box>
                      </Box>
                      <Box className="submit-button-box">
                        <Button className="submit">{t("Submit")}</Button>
                      </Box>
                    </Box>
                  </Container>
                </Box>
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
