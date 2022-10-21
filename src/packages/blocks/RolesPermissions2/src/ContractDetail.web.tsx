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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import ContractDetailController, { Props } from "./ContractDetailController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, DownloadIcon, ShareIcon, ExclamationIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class ContractDetail extends ContractDetailController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.detailPage}>
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
                    Contracts {this.state.contractId}
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
                          <div
                            dangerouslySetInnerHTML={{
                              __html: this.state.contractData.templateText,
                            }}
                          />
                        )}
                      </div>
                      <Box className="upload-button">
                        <Box className="upload-button-group">
                          <Box className="top">
                            <Button onClick={() => this.handleTerminateContractModal()}>{t("Terminate")}</Button>
                            <Button>{t("Close")}</Button>
                          </Box>
                          <Box className="bottom">
                            <Link href={`/Contract/${this.state.contractId}/Renew`}>
                              <Button>{t("ReNew Contract")}</Button>
                            </Link>
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
              <Typography variant="h6">{t("Terminate Contract?")}</Typography>
              <Typography variant="body1">
                {t("Are you sure want to terminate lease contract with")} {this.state.contractData.tenantName}
                {t("? Once terminated you won't be able to retrieve.")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleTerminateContractModal()}>{t("Yes, Terminate")}</Button>
                <Button onClick={() => this.handleTerminateContractModal()}>{t("No, Don't Terminate")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth
          onClose={() => this.handleShareModal()}
          open={this.state.isShareModalOpen}
          className="select-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Share")}</Typography>
            <IconButton onClick={() => this.handleShareModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent>
            <div className="share-box">
              <FacebookShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<FacebookIcon />}
                translate
              />
              <TwitterShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TwitterIcon />}
                translate
              />
              <WhatsappShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                separator=":: "
                // @ts-ignore
                children={<WhatsappIcon />}
                translate
              />
              <LinkedinShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<LinkedinIcon />}
                translate
              />
              <EmailShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<EmailIcon />}
                translate
              />
              <RedditShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<RedditIcon />}
                translate
              />
              <TelegramShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TelegramIcon />}
                translate
              />
              <TumblrShareButton
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                // @ts-ignore
                children={<TumblrIcon />}
                translate
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(ContractDetail));
// Customizable Area End
