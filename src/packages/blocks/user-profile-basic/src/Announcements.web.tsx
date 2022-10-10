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
import { Link,withRouter } from "react-router-dom";
import { SearchIconImage, UploadImage } from "./assets";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment"
class Announcements extends AnnouncementsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
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
                    <Select displayEmpty value={this.state.filterCategory} className="select-input"  onChange={(e) => this.setState({filterCategory:e.target.value})}>
                      <MenuItem value="" disabled>
                        Category
                      </MenuItem>
                      {
                        this.state.categoryList.length > 0 &&
                          this.state.categoryList.map((item:any,key:any)=>{
                            return(
                                <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>
                            )
                          })
                      }
                    </Select>
                    <Select displayEmpty value={this.state.filerYear} className="select-input" onChange={(e)=> this.setState({filerYear:e.target.value})}>
                      <MenuItem value="" disabled>
                        Year
                      </MenuItem>
                      {
                        this.state.yearArray.map((item:any,key:any)=>{
                          let year = (new Date().getFullYear()) - item
                          return(
                              <MenuItem key={key} value={year}>{year}</MenuItem>
                          )
                        })
                      }
                    </Select>
                    <Button onClick={this.handleFilterBy} startIcon={<img src={SearchIconImage} />}>Search</Button>
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
                          <InputBase placeholder="Search" className="search" onChange={this.handleSearch}/>
                        </Box>
                        <Select displayEmpty value={this.state.shortBy} className="select-input" onChange={(e)=>this.shortByAction(e)} >
                          <MenuItem value="" disabled>
                            Sort By
                          </MenuItem>
                          <MenuItem value="announcement_by">Announcement By</MenuItem>
                          <MenuItem value="announcement_on">Announcement Date</MenuItem>
                          <MenuItem value="title">Title</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Divider />
                    <Table className="table-box" style={{paddingBottom:"25px"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Announced On</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Announcement By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          this.state.announcementList?.length > 0 ?
                            this.state.announcementList?.map((item:any,key:any)=> {
                              return(
                                  <TableRow key={key} onClick={()=> this.props.history.push(`AnnouncementDetails?id=${item.id}`)} style={{cursor:"pointer"}}>
                                    <TableCell>{key+1}</TableCell>
                                    <TableCell className="ellipse">{item.attributes.title}</TableCell>
                                    <TableCell>{moment(item.attributes.announcement_on,'DD/MM/YYYY').format("MMMM DD,YYYY")}</TableCell>
                                    <TableCell>{item.attributes.announcement_category}</TableCell>
                                    <TableCell>{item.attributes.announcement_by}</TableCell>
                                  </TableRow>
                              )
                            }) :
                              <TableRow>
                                <TableCell>No Data available!</TableCell>
                              </TableRow>
                        }
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
            <FormControl fullWidth style={{marginBottom:"15px"}}>
              <select className="dialog-select-input" value={this.state.selectedBuilding} onChange={(e)=> this.setState({selectedBuilding:e.target.value})}>
                <option value="" disabled>
                  Select Building
                </option>
                {
                  this.state.buildingList.length > 0 &&
                    this.state.buildingList.map((item:any,key:any)=> {
                      return(
                          <option key={key} value={item.id}>{item.name}</option>
                      )
                    })
                }
              </select>
            </FormControl>
            <FormControl fullWidth>
              <input
                placeholder="Title"
                value={this.state.selectedTitle}
                onChange={(e)=> this.setState({selectedTitle:e.target.value})}
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <select className="dialog-select-input" value={this.state.selectedCategory} onChange={(e)=> this.setState({selectedCategory:e.target.value})}>
                <option value="" disabled>
                  Select Category
                </option>
                {
                    this.state.categoryList.length > 0 &&
                    this.state.categoryList.map((item:any,key:any)=>{
                      return(
                          <option key={key} value={item.id}>{item.attributes.category_title}</option>
                      )
                    })
                }
              </select>
            </FormControl>
            <FormControl fullWidth>
              <textarea className="dialog-textarea-input" placeholder="Description" value={this.state.selectedDescription} onChange={(e) => this.setState({selectedDescription:e.target.value})} />
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
                accept="image/png, image/gif, image/jpeg"
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
            <Button className="add-button" onClick={this.handleSubmit}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// @ts-ignore
export default withStyles(SuggestionStyleWeb)(withRouter(Announcements));
// Customizable Area End
