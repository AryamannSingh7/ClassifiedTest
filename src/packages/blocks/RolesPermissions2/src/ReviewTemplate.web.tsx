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
  Input,
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
import LeaseFormController, { Props } from "./LeaseFormController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, DownloadIcon, ShareIcon, ExclamationIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import toast from "react-hot-toast";

class ReviewTemplate extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const template_id: any = this.props.navigation.getParam("templateId");
    this.setState({ ...this.state, templateId: template_id }, () => {
      // this.getTemplateText();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    // const sharePopupWidth = 500;
    // const sharePopupHeight = 700;
    // const shareTitle = "TI 1 Final Leap";

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.detailPage}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    {/* <Link href="/OwnerDashboard"> */}
                    <IconButton onClick={() => this.goBackFromReviewPage()}>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    {/* </Link> */}
                    <span>{t("Review Lease Document")}</span>
                  </div>
                  <div className="right-icon" onClick={() => toast.error("You need to generate a lease first")}>
                    <img src={DownloadIcon} alt="SortIcon" />
                  </div>
                </Box>
                <Container>
                  <Box className="content-box">
                    <div className="contracts-list">
                      <div
                        dangerouslySetInnerHTML={{ __html: window.sessionStorage.getItem("changedTemplate") as any }}
                      />
                    </div>
                    <Box className="upload-button">
                      <Box className="upload-button-group review">
                        <Box className="top">
                          <Button
                            onClick={() =>
                              this.props.navigation.navigate("LeaseFormIssueLease", {
                                templateId: this.state.templateId,
                              })
                            }
                          >
                            {t("Edit Document")}
                          </Button>
                          <Button onClick={() => this.handleSaveLeaseModal()}>{t("Save Template")}</Button>
                        </Box>
                        <Box className="bottom">
                          <Button onClick={() => this.handleGenerateLeaseModal()}>{t("Generate Lease")}</Button>
                          <Box className="image" onClick={() => toast.error("You need to generate a lease first")}>
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
          className="save-lease"
          maxWidth="xs"
          onClose={() => this.handleSaveLeaseModal()}
          open={this.state.isSaveLeaseModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Save Lease Template")}</Typography>
              <Typography variant="body1">
                {t(
                  "Your lease document will be saved as template. You can access this document from contracts section of the app."
                )}
              </Typography>
              <Input placeholder={t("Template Name")} />
              <DialogActions className="dialog-button-group">
                <Button className="add-button" onClick={() => this.handleSaveLeaseModal()}>
                  {t("Save")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="save-lease"
          maxWidth="xs"
          onClose={() => this.handleGenerateLeaseModal()}
          open={this.state.isGenerateLeaseModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Lease Document Generated")}</Typography>
              <Typography variant="body1">
                {t(
                  "Your lease document has been generated. You can access this document from contracts section of the app."
                )}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button className="add-button" onClick={() => this.handleGenerateLeaseModal()}>
                  {t("Okay")}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        {/* <Dialog
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
        </Dialog> */}
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(ReviewTemplate));
// Customizable Area End
