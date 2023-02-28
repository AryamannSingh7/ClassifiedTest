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
import ContractDetailController, { Props } from "./ContractDetailController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, DownloadIcon, ShareIcon, ExclamationIcon } from "./assets";
import { withTranslation } from "react-i18next";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";

class ContractDetail extends ContractDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.detailPage}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step top-bar-contract-details">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/Contracts">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span className="bold-text">
                      {t("Contracts")} {this.state.contractId}
                    </span>
                  </div>
                  <div className="right-icon">
                    <Link target="_blank" href={this.state.contractData.templateUrl}>
                      <img src={DownloadIcon} alt="SortIcon" />
                    </Link>
                  </div>
                </Box>
                <Box className="contract-detail">
                  <Container>
                    <Box className="content-box">
                      <div className="contracts-list">
                        {this.state.contractData.isCustomContract ? (
                          <iframe src={this.state.contractData.templateText} />
                        ) : (
                          <>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.contractData.templateText,
                              }}
                            />
                            <br />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.contractData.conditionText,
                              }}
                            />
                            <br />
                          </>
                        )}
                      </div>
                      <Box className="upload-button">
                        <Box className="upload-button-group">
                          <Box className="top">
                            <Button onClick={() => this.handleTerminateContractModal()}>{t("Terminate")}</Button>
                            <Button onClick={() => this.handleClosedContractModal()}>{t("Close")}</Button>
                          </Box>
                          <Box className="bottom">
                            <Button
                              disabled={this.state.contractData.status !== "Active"}
                              onClick={() =>
                                this.props.navigation.navigate("RenewContract", { id: this.state.contractId })
                              }
                            >
                              {t("ReNew Contract")}
                            </Button>
                            <Box
                              className="image"
                              onClick={() => {
                                this.setState({ shareUrl: this.state.contractData.templateUrl }, () => {
                                  this.handleShareModal();
                                });
                              }}
                            >
                              <img src={ShareIcon} alt="" />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
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
          onClose={() => this.handleTerminateContractModal()}
          open={this.state.isTerminateContractModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Terminate Contract?")}
              </Typography>
              <Typography variant="body1">
                {t("Are you sure want to terminate lease contract with")} {this.state.contractData.tenantName}
                {t("? Once terminated you won't be able to retrieve.")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleUpdateContractStatus("Terminated")}>{t("Yes, Terminate")}</Button>
                <Button onClick={() => this.handleTerminateContractModal()}>{t("No, Don't Terminate")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleClosedContractModal()}
          open={this.state.isClosedContractModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6" className="bold-text">
                {t("Close Contract")}?
              </Typography>
              <Typography variant="body1">
                {t("Are you sure want to close the contract with")} {this.state.contractData.tenantName}?
                {t("Once closed you won't be able to retrieve")}.
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleUpdateContractStatus("Closed")}>{t("Yes, Close")}</Button>
                <Button onClick={() => this.handleClosedContractModal()}>{t("No, Don't Close")}</Button>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(ContractDetail));
// Customizable Area End
