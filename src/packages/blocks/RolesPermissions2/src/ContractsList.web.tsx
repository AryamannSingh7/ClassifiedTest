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
  Card,
  Dialog,
  Typography,
  DialogContent,
} from "@material-ui/core";
import { Menu, MenuItem } from "@szhsin/react-menu";
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
import moment from "moment";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";

class ContractsList extends ContractsListController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    this.getTemplatesList();
    this.getContractsList();
  }

  async componentDidUpdate(prevProps: any, prevState: any): Promise<void> {
    if (prevState.filter.sort !== this.state.filter.sort || prevState.filter.status !== this.state.filter.status) {
      await this.getContractsList();
    }
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    const sharePopupWidth = 500;
    const sharePopupHeight = 700;
    const shareTitle = "TI 1 Final Leap";

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.contractList}>
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
                    {t("Contracts")}
                  </div>
                  <div className="right-icon">
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={SortIcon} alt="SortIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, sort: "asc" } });
                        }}
                      >
                        {t("Ascending")}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, sort: "desc" } });
                        }}
                      >
                        {t("Descending")}
                      </MenuItem>
                    </Menu>
                    <Menu
                      menuButton={
                        <IconButton>
                          <img src={FilterIcon} alt="FilterIcon" />
                        </IconButton>
                      }
                    >
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, status: "active" } });
                        }}
                      >
                        {t("Active")}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, status: "terminated" } });
                        }}
                      >
                        {t("Terminated")}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, status: "pending" } });
                        }}
                      >
                        {t("Pending")}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({ filter: { ...this.state.filter, status: "closedF" } });
                        }}
                      >
                        {t("Closed")}
                      </MenuItem>
                    </Menu>
                  </div>
                </Box>
                <Container>
                  <Box className="select">
                    <Tab
                      onClick={() => this.setState({ isContractOpen: true })}
                      label={t("My Contracts")}
                      className={this.state.isContractOpen ? "active" : ""}
                    />
                    <Tab
                      onClick={() => this.setState({ isContractOpen: false })}
                      label={t("Saved Templates")}
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
                                <Card className="contract">{t("No Contract Available!")}</Card>
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
                                                <Link
                                                  href={
                                                    contract.attributes.custom_contract
                                                      ? contract.attributes.custom_contract_image.url
                                                      : contract.attributes.contract_template_pdf.url
                                                  }
                                                  target="_blank"
                                                >
                                                  {t("Download")}
                                                </Link>
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() => {
                                                  this.setState(
                                                    {
                                                      shareUrl: contract.attributes.custom_contract
                                                        ? contract.attributes.custom_contract_image.url
                                                        : contract.attributes.contract_template_pdf.url,
                                                    },
                                                    () => {
                                                      this.handleShareModal();
                                                    }
                                                  );
                                                }}
                                              >
                                                {t("Share")}
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
                                          {contract.attributes.expires_on
                                            ? moment(contract.attributes.expires_on, "YYYY-MM-DD").format(
                                                "MMMM DD, YYYY"
                                              )
                                            : "-"}
                                        </p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>{t("Building")}</span>
                                        <p>{contract.attributes.building_name}</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>{t("Unit")}</span>
                                        <p>{contract.attributes.unit_name}</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>{t("Tenant Name")}</span>
                                        <p>{contract.attributes.tenant_name}</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>{t("Contract Type")}</span>
                                        <p>{contract.attributes.contract_type || "-"}</p>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <span>{t("Contract State")}</span>
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
                                <Button>{t("Issue A New Contract")}</Button>
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
                                <Card className="template">{t("No Template Available!")}</Card>
                              </Grid>
                            )}
                            {this.state.templatesList.map((template: any) => {
                              return (
                                <Grid item xs={6} key={template.id}>
                                  <Card className="template">
                                    <Link href={`Template/${template.id}`}>
                                      <div className="content">
                                        <div className="image">
                                          <img src={TemplateIcon} alt="" />
                                        </div>
                                        <h4>{template.attributes.template_name}</h4>
                                      </div>
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
                                          <Link
                                            href={template.attributes.custom_lease_template_pdf.url}
                                            target="_blank"
                                          >
                                            {t("Download")}
                                          </Link>
                                        </MenuItem>
                                        <MenuItem onClick={() => this.handleEditTemplate(template)}>
                                          {t("Edit")}
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            this.setState(
                                              { shareUrl: template.attributes.custom_lease_template_pdf.url },
                                              () => {
                                                this.handleShareModal();
                                              }
                                            );
                                          }}
                                        >
                                          {t("Share")}
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
                                <Button>{t("Create Another Template")}</Button>
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

export default withTranslation()(withStyles(ContractsStyleWeb)(ContractsList));
// Customizable Area End
