// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import TemplateDetailController, { Props } from "./TemplateDetailController.web";
import { BuildingLogo, DownloadIcon, ShareIcon, ExclamationIcon } from "./assets";
import { withTranslation } from "react-i18next";
import Loader from "../../../components/src/Loader.web";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";

class TemplateDetail extends TemplateDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.detailPage}>
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
                    <span className="bold-text">{this.state.templateData.templateName}</span>
                  </div>
                  <div className="right-icon">
                    <Link href={this.state.templateData.templateUrl} target="_blank">
                      <img src={DownloadIcon} alt="SortIcon" />
                    </Link>
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <div className="contracts-list">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.templateData.templateText,
                        }}
                      />
                      <br />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.templateData.conditionText,
                        }}
                      />
                      <br />
                    </div>
                    <Box className="upload-button">
                      <Box className="upload-button-group">
                        <Box className="top">
                          <Button onClick={() => this.handleEditTemplate()}>{t("Edit Document")}</Button>
                          <Button onClick={() => this.handleDeleteTemplateModal()}>{t("Delete Template")}</Button>
                        </Box>
                        <Box className="bottom">
                          <Button
                            onClick={() => {
                              this.setState({ loading: true }, () => {
                                this.handleCreateContract();
                              });
                            }}
                          >
                            {t("Generate a Lease")}
                          </Button>
                          <Box className="image" onClick={() => this.handleShareModal()}>
                            <img src={ShareIcon} alt="" />
                          </Box>
                        </Box>
                      </Box>
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

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteTemplateModal()}
          open={this.state.isTerminateContractModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Delete lease Template?")}
              </Typography>
              <Typography variant="body1">
                {t("Are you sure want to delete lease template?")} {t("Once deleted you won't be able to retrieve.")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.deleteTemplateDetails()}>{t("Yes, Delete")}</Button>
                <Button onClick={() => this.handleDeleteTemplateModal()}>{t("No, Don't Delete")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <ShareDocumentModal
          isOpen={this.state.isShareModalOpen}
          handleClose={this.handleShareModal}
          heading={t("Share")}
          documentURL={this.state.shareUrl}
        />
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(TemplateDetail));
// Customizable Area End
