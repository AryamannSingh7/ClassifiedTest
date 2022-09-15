// Customizable Area Start
import React from "react";
import {
  Container,
  Typography,
  withStyles,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  Divider,
  Button,
  Select,
  MenuItem,
  Dialog,
  IconButton,
  DialogContent,
  FormControl,
  DialogActions,
} from "@material-ui/core";
import AnnouncementsController, { Props } from "./AnnouncementsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebarWeb from "../../dashboard/src/ChairmanSidebar.web";
import { SuggestionStyleWeb } from "./SuggestionStyle.web";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { SearchIconImage, UploadImage } from "./assets";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

class Announcements extends AnnouncementsController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {}

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "#F4F7FF" }} className={classes.announcements}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebarWeb {...this.props} />
            </Grid>

            <Grid item xs={9} md={9} sm={9} style={{ paddingTop: 35 }}>
              <Container>
                <Box className="navigation">
                  <Box>
                    <Typography variant="body1">
                      Community Management /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        Announcements
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading">
                      Announcements
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Category</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Select displayEmpty value="" className="select-input">
                      <MenuItem value="" disabled>
                        <em>Year</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button startIcon={<img src={SearchIconImage} />}>Search</Button>
                  </Box>
                  <Box className="create-meeting">
                    <Button onClick={() => this.handleCreateAnnouncementModal()}>Create New Announcement</Button>
                  </Box>
                </Box>
                <Box className="meeting-table">
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3>Announcements</h3>
                      <Box className="filter">
                        <Box className="search-box">
                          <SearchIcon />
                          <InputBase placeholder="Search" className="search" />
                        </Box>
                        <Select displayEmpty value="" className="select-input">
                          <MenuItem value="" disabled>
                            <em>Sort By</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Divider />
                    <Table className="table-box">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Announced On</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Announced By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell className="ellipse">Title</TableCell>
                          <TableCell>Announced On</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Announced By</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell className="ellipse">Title</TableCell>
                          <TableCell>Announced On</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Announced By</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog
          fullWidth
          onClose={() => this.handleCreateAnnouncementModal()}
          open={this.state.isCreateAnnouncementModalOpen}
          className="add-document resolutions"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Create Announcement</Typography>
            <IconButton onClick={() => this.handleCreateAnnouncementModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth>
              <input
                placeholder="Title"
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <select className="dialog-select-input" value="">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="1">Select Category 1</option>
                <option value="2">Select Category 2</option>
                <option value="3">Select Category 3</option>
              </select>
            </FormControl>
            <FormControl fullWidth>
              <textarea className="dialog-textarea-input" placeholder="Description" />
            </FormControl>
            <FormControl fullWidth>
              <div
                className="image-box"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <img src={UploadImage} />
                <Typography variant="body1">Upload Image (Optional)</Typography>
              </div>
              <input
                id="myInput"
                type="file"
                ref={(ref: any) => (this.upload = ref)}
                style={{ display: "none" }}
                onChange={this.onChangeFile.bind(this)}
              />
            </FormControl>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleCreateAnnouncementModal()}>
              Cancel
            </Button>
            <Button className="add-button" onClick={() => {}}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(SuggestionStyleWeb)(Announcements);
// Customizable Area End
