// Customizable Area Start
//@ts-nocheck
//@ts-ignore

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
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DocumentListChairmanController, {
  Props,
} from "./DocumentListChairmanController.web";
import { DocumentReportStyleWeb } from "./DocumentReportStyle.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";

import Document from "../assets/document.png";
import UploadImage from "../assets/upload.png";
import DeleteImage from "../assets/delete.png";
import ShareImage from "../assets/share.png";
import DownloadImage from "../assets/download.png";
import BuildingLogo from "../assets/building.png";

import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import Loader from "../../../components/src/Loader.web";

class PersonalDocumentList extends DocumentListChairmanController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Loader loading={this.state.loading} />
        <Box
          className={classes.personalDocument}
          style={{ background: "#F8F9FE", height: "100vh" }}
        >
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box display={{ xs: "flex", md: "flex" }} className="menu">
                <Link
                  href={
                    localStorage.getItem("userType") === "Owner"
                      ? "/OwnerDashboard"
                      : ""
                  }
                >
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>{" "}
                Rent Contract
              </Box>
              <Container className="content-area document-box">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Rent-Contact">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Rent Contract</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Unit-Plan">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Unit Plan</h4>
                        </div>
                        <div>
                          <Button className="color-btn">04</Button>
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Link href="/PersonalDocument/Other-Documents">
                      <Box className="item">
                        <div className="heading">
                          <img src={Document} />
                          <h4>Other Documents</h4>
                        </div>
                        <div>
                          {/* <Button className="color-btn">04</Button> */}
                          <IconButton>
                            <ChevronRightIcon />
                          </IconButton>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                className="right-block right-image"
                display={{ xs: "none", md: "flex" }}
              >
                <img src={BuildingLogo} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleAddDocumentModal()}
          open={this.state.idAddDocumentModalOpen}
          className="add-document"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Add New Document</Typography>
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
                    ...Box.state,
                    title: e.target.value,
                  });
                }}
                placeholder="Title"
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <div
                className="image-box"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <img src={UploadImage} />
                <Typography variant="body1">Upload file</Typography>
              </div>
              <input
                id="myInput"
                type="file"
                ref={(ref: any) => (this.upload = ref)}
                style={{ display: "none" }}
                onChange={this.onChangeFile.bind(this)}
                accept=".pdf"
              />
              {this.state.file && <span>{this.state.file.name}</span>}
              <span />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button
              variant="outlined"
              onClick={() => this.handleAddDocumentModal()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              disabled={
                this.state.title.length === 0 || this.state.file === null
              }
              variant="contained"
              onClick={() => this.createDocument()}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="delete-document"
          fullWidth
          onClose={() => this.handleDeleteDocumentModal()}
          open={this.state.idDeleteDocumentModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={DeleteImage} alt="delete" />
              <Typography variant="h6">Delete Document</Typography>
              <Typography variant="body1">
                Are you sure want to delete?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button
                  variant="outlined"
                  onClick={() => this.handleDeleteDocumentModal()}
                  color="primary"
                >
                  No, Don't Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.deleteCategory();
                  }}
                  color="primary"
                >
                  Yes Delete
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(DocumentReportStyleWeb)(PersonalDocumentList);
// Customizable Area End
