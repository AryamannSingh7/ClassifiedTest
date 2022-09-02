// Customizable Area Start
//@ts-nocheck
//@ts-ignore
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
import BuildingLogo from "../assets/building.png";
import SortIcon from "../assets/sort.png";
import FilterIcon from "../assets/filter.png";
import TemplateIcon from "../assets/template.png";

class ContractsList extends ContractsListController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): Promise<void> {
    this.getTemplatesList();
  }

  render() {
    const { classes } = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

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
                      <MenuItem>New</MenuItem>
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
                            <Grid item xs={12}>
                              <Card className="contract">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <Link href={``}>
                                        <h4>asdasdasdadd</h4>
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
                                    <span>Company Name</span>
                                    <p>Company Name</p>
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
                            </Grid>
                            <Grid item xs={12}>
                              <Card className="contract">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="header">
                                      <Link href={``}>
                                        <h4>asdasdasdadd</h4>
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
                            </Grid>
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
                                No Template Available!!
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
                                          <Link
                                            href={template.attributes.lease_template[0].url}
                                            target="_blank"
                                          >
                                            Download
                                          </Link>
                                        </MenuItem>
                                        <MenuItem>Edit</MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            this.setState(
                                              {
                                                shareUrl: template.attributes.lease_template[0].url,
                                                shareQuote: template.attributes.title,
                                              },
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
                <img src={BuildingLogo} className="building-logo" alt="" />
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
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TwitterIcon />
              </TwitterShareButton>
              <WhatsappShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
                separator=":: "
              >
                <WhatsappIcon />
              </WhatsappShareButton>
              <LinkedinShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <LinkedinIcon />
              </LinkedinShareButton>
              <EmailShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <EmailIcon />
              </EmailShareButton>
              <RedditShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <RedditIcon />
              </RedditShareButton>
              <TelegramShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TelegramIcon />
              </TelegramShareButton>
              <TumblrShareButton
                quote={this.state.shareQuote}
                url={this.state.shareUrl}
                title={shareTitle}
                windowWidth={sharePopupWidth}
                windowHeight={sharePopupHeight}
              >
                <TumblrIcon />
              </TumblrShareButton>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(ContractsStyleWeb)(ContractsList);
// Customizable Area End
