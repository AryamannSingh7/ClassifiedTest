// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  Link,
  MenuItem,
  Typography,
  withStyles,
  Box,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  DialogActions,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PersonalDocumentListController, { Props } from "./PersonalDocumentListController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import { UploadImage, DeleteImage, NoPdf, PdfImage } from "./assets";
import moment from "moment";
import { withTranslation } from "react-i18next";
import ShareDocumentModal from "../../../components/src/DocumentComponent/ShareModal.web";
import SidebarImageComponent from "../../../components/src/OwnerSidebarImage.web";

class PersonalDocumentList extends PersonalDocumentListController {
  constructor(props: Props) {
    super(props);
  }

  handleCheckAddDocumentValidation = () => {
    return (
      this.state.title.length === 0 ||
      this.state.title.length > 100 ||
      this.isInputOnlyWhiteSpace(this.state.title) ||
      this.state.file === null
    );
  };

  documentType = (t: any) => {
    if (this.state.documentType === "rent-contract") {
      return `${t("rent contract")}`;
    } else if (this.state.documentType === "unit-plan") {
      return `${t("unit plan")}`;
    } else if (this.state.documentType === "other-documents") {
      return `${t("other documents")}`;
    } else {
      return "";
    }
  };

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Box className={classes.personalDocument} style={{ background: "#F8F9FE", height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link href="/PersonalDocument">
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                {this.state.documentType === "rent-contract" && `${t("Rent Contract")}`}
                {this.state.documentType === "unit-plan" && `${t("Unit Plan")}`}
                {this.state.documentType === "other-documents" && `${t("Other Documents")}`}
              </Box>
              <Container className="content-area document-box list">
                <div className="personal-documents">
                  {this.state.documentsList.length === 0 && (
                    <div className="empty-list">
                      <div className="content-box">
                        <img src={NoPdf} />
                        <h3>{t("No Document Found")}</h3>
                        <p>
                          {t("Looks like you haven't uploaded any documents! you can upload")}{" "}
                          {this.state.documentType === "rent-contract" && `${t("rent contract")}`}
                          {this.state.documentType === "unit-plan" && `${t("unit plan")}`}
                          {this.state.documentType === "other-documents" && `${t("other documents")}`}{" "}
                          {t("by tapping on below  button.")}
                        </p>
                      </div>
                    </div>
                  )}
                  <Grid container spacing={2}>
                    {this.state.documentsList.map((document: any) => {
                      return (
                        <Grid item xs={12} md={12} lg={12} key={document.id}>
                          <Box className="item document">
                            <Link href={`/PersonalDocument/${this.state.documentType}/${document.id}/view`}>
                              <div className="left-side">
                                <div className="image">
                                  <img src={PdfImage} />
                                </div>
                                <div className="info">
                                  <h4>{document.attributes.title}</h4>
                                  <div className="more-info">
                                    <p>
                                      <span>{document.attributes.images[0].file_size}</span>
                                      MB
                                    </p>
                                    <p>{moment(document.attributes.created_at).format("DD/MM/YYYY")}</p>
                                  </div>
                                </div>
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
                                  <Link href={document.attributes.images[0].download_url} target="_blank">
                                    {t("Download")}
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    this.setState({ selectedDocumentId: document.id }, () => {
                                      this.handleDeleteDocumentModal();
                                    });
                                  }}
                                >
                                  {t("Delete")}
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    this.setState({ shareUrl: document.attributes.images[0].url }, () => {
                                      this.handleShareModal();
                                    });
                                  }}
                                >
                                  {t("Share")}
                                </MenuItem>
                              </Menu>
                            </div>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
                <div className="upload-button">
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Button onClick={() => this.handleAddDocumentModal()}>{t("Upload Document")}</Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <SidebarImageComponent />
            </Grid>
          </Grid>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleAddDocumentModal()}
          open={this.state.isAddDocumentModalOpen}
          className="add-document"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">{t("Add New Document")}</Typography>
            <IconButton onClick={() => this.handleAddDocumentModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <input
                value={this.state.title}
                onChange={(e: any) => {
                  this.setState({
                    ...this.state,
                    title: e.target.value,
                  });
                }}
                placeholder={t("Title")}
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
              {this.state.title.length > 100 && (
                <span className="error">{t("Maximum length of title should be 100 character")}</span>
              )}
            </FormControl>
            {this.state.file ? (
              <Box className="modal-document-box">
                <Box className="left-side-document">
                  <img src={PdfImage} alt="pdf-img" />
                  <p>{this.state.file.name}</p>
                </Box>
                <Box className="right-side-document">
                  <CloseIcon onClick={() => this.setState({ file: null })} />
                </Box>
              </Box>
            ) : (
              <FormControl fullWidth>
                <div
                  className="image-box"
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  <img src={UploadImage} />
                  <Typography variant="body1">{t("Upload file")}</Typography>
                </div>
                <input
                  id="myInput"
                  type="file"
                  ref={(ref: any) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.onChangeFile.bind(this)}
                  accept=".pdf"
                />
              </FormControl>
            )}
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button onClick={() => this.handleAddDocumentModal()} className="cancel-button">
              {t("Cancel")}
            </Button>
            <Button
              disabled={this.handleCheckAddDocumentValidation()}
              onClick={() => this.createPersonalDocument()}
              className="add-button"
            >
              {t("Create")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleDeleteDocumentModal()}
          open={this.state.isDeleteDocumentModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">
                {t("Delete uploaded")} {this.documentType(t)}
              </Typography>
              <Typography variant="body1">
                {t("Are you sure want to delete uploaded")} {this.documentType(t)}{" "}
                {t("from this app? Once deleted you won't be able to view deleted contract again.")}
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.deletePersonalDocument()}>{t("Yes Delete")}</Button>
                <Button onClick={() => this.handleDeleteDocumentModal()}>{t("No, Don't Delete")}</Button>
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

export default withTranslation()(withStyles(DocumentReportStyleWeb)(PersonalDocumentList));
// Customizable Area End
