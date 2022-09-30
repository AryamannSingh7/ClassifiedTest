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
  Tab,
  MenuItem,
  Card,
  Dialog,
  Typography,
  DialogContent,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ContractsListController, { Props } from "./ContractsListController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
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
import { BuildingLogo, SortIcon, FilterIcon, TemplateIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import moment from "moment";

class ContractsList extends ContractsListController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getTemplatesList();
    this.getContractsList();
  }

  render() {
    const { classes } = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.contractList}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/OwnerDashboard">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    Contracts
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem>Ascending</MenuItem>
                      <MenuItem>Descending</MenuItem>
                    </Menu>
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="FilterIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem>Active</MenuItem>
                      <MenuItem>Terminated</MenuItem>
                      <MenuItem>Pending</MenuItem>
                      <MenuItem>Closed</MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <Box className="select">
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isContractOpen: true,
                          },
                          () => {}
                        );
                      }}
                      label="My Contracts"
                      className={this.state.isContractOpen ? "active" : ""}
                    />
                    <Tab
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            isContractOpen: false,
                          },
                          () => {}
                        );
                      }}
                      label="Saved Templates"
                      className={!this.state.isContractOpen ? "active" : ""}
                    />
                  </Box>
                  {this.state.isContractOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="contracts-list">
                          <Grid container spacing={2}>
                            {this.state.contractsList.length === 0 && (
                              <Grid item xs={12}>
                                <Card className="contract">No Contract Available!!</Card>
                              </Grid>
                            )}
                            {this.state.contractsList.map((contract: any) => {
                              return (
                                <Grid item xs={12} key={contract.id}>
                                  <Card className="contract">
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <div className="header">
                                          <Link href={`/Contract/${contract.id}`}>
                                            <h4>{`Contract ${contract.id}`}</h4>
                                          </Link>
                                          <div className="right-menu">
                                            <Menu
                                              menuButton={
                                                <IconButton>
                                                  <MoreVertIcon />
                                                </IconButton>
                                              }
                                            >
                                              <MenuItem>
                                                <Link href={contract.attributes.template_pdf.url} target="_blank">
                                                  Download
                                                </Link>
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() => {
                                                  this.setState(
                                                    { shareUrl: contract.attributes.template_pdf.url },
                                                    () => {
                                                      this.handleShareModal();
                                                    }
                                                  );
                                                }}
                                              >
                                                Share
                                              </MenuItem>
                                            </Menu>
                                          </div>
                                        </div>
                                      </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="info">
                                      <Grid item xs={6}>
                                        <span>Expires on</span>
                                        <p>
                                          {moment(contract.attributes.expires_on, "YYYY-MM-DD").format("MMMM DD, YYYY")}
                                        </p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>Building</span>
                                        <p>-</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>Unit</span>
                                        <p>-</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>Tenant Name</span>
                                        <p>{contract.attributes.tenant_name}</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>Contract Type</span>
                                        <p>-</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>Contract State</span>
                                        <p className="state">{contract.attributes.status}</p>
                                      </Grid>
                                    </Grid>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                        <div className="upload-button">
                          <Grid container>
                            <Grid item xs={12} md={12}>
                              <Link href="/IssueContract">
                                <Button>Issue A New Contract</Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
                  {!this.state.isContractOpen && (
                    <Box className="list-box">
                      <div className="content-box">
                        <div className="templates-list">
                          <Grid container spacing={2}>
                            {this.state.templatesList.length === 0 && (
                              <Grid item xs={12}>
                                <Card className="template">No Template Available!!</Card>
                              </Grid>
                            )}
                            {this.state.templatesList.map((template: any) => {
                              console.log(template);

                              return (
                                <Grid item xs={6} key={template.id}>
                                  <Card className="template">
                                    <div className="content">
                                      <div className="image">
                                        <img src={TemplateIcon} alt="" />
                                      </div>
                                      <h4>{template.attributes.title}</h4>
                                    </div>
                                    <div className="right-menu">
                                      <Menu
                                        menuButton={
                                          <IconButton>
                                            <MoreVertIcon />
                                          </IconButton>
                                        }
                                      >
                                        <MenuItem>
                                          <Link href={template.attributes.template_pdf.url} target="_blank">
                                            Download
                                          </Link>
                                        </MenuItem>
                                        <MenuItem>Edit</MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            this.setState({ shareUrl: template.attributes.template_pdf.url }, () => {
                                              this.handleShareModal();
                                            });
                                          }}
                                        >
                                          Share
                                        </MenuItem>
                                      </Menu>
                                    </div>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                        <div className="upload-button">
                          <Grid container>
                            <Grid item xs={12} md={12}>
                              <Link href="/IssueLease">
                                <Button>Create Another Template</Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Box>
                  )}
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
          fullWidth
          onClose={() => this.handleShareModal()}
          open={this.state.isShareModalOpen}
          className="select-meeting"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Share</Typography>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(ContractsList));
// Customizable Area End
