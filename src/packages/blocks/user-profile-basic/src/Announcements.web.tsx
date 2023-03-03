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
import {withTranslation} from "react-i18next";
class Announcements extends AnnouncementsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    //@ts-ignore
    const {t} = this.props
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
                      {t("Community Management")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Announcements")}
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="sub-heading bold-text">
                      {t("Announcements")}
                    </Typography>
                  </Box>
                </Box>
                <Box className="top-bar">
                  <Box className="filter">
                    <Select displayEmpty
                            value={this.state.filterCategory}
                            className="select-input Announcmenentcetaogry"
                            onChange={(e) => this.setState({filterCategory:e.target.value})}
                      >
                      <MenuItem value="">
                        {t("Category")}
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
                      <MenuItem value="">
                        {t("Year")}
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
                    <Button onClick={this.handleFilterBy} startIcon={<img src={SearchIconImage} />}>{t("Search")}</Button>
                  </Box>
                  <Box className="create-meeting">
                    <Button onClick={() => this.handleCreateAnnouncementModal()}>{t("Create New Announcement")}</Button>
                  </Box>
                </Box>
                <Box className="meeting-table" style={{boxShadow:"4px 0px 14px #e9e9e9"}}>
                  <Grid item sm={12} md={12} xs={12}>
                    <Box className="table-top">
                      <h3 className="bold-text">{t("Announcements")}</h3>
                      <Box className="filter">
                        <Box className="search-box">
                          <SearchIcon />
                          <InputBase placeholder={t("Search")} className="search" onChange={this.handleSearch}/>
                        </Box>
                        <Select displayEmpty value={this.state.shortBy} className="select-input" onChange={(e)=>this.shortByAction(e)} >
                          <MenuItem value="" disabled>
                            {t("Sort By")}
                          </MenuItem>
                          <MenuItem value="announcement_by">{t("Announcement By")}</MenuItem>
                          <MenuItem value="announcement_on">{t("Announcement Date")}</MenuItem>
                          <MenuItem value="title">{t("Title")}</MenuItem>
                          <MenuItem value="building">{t("Building Name")}</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Divider />
                    <Table className="table-box" style={{paddingBottom:"25px"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>{t("Title")}</TableCell>
                          <TableCell>{t("Announced On")}</TableCell>
                          <TableCell>{t("Category")}</TableCell>
                          <TableCell>{t("Building / Complex Name")}</TableCell>
                          <TableCell>{t("Announcement By")}</TableCell>
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
                                    <TableCell>{item.attributes?.building_name !== null ? item.attributes?.building_name : item.attributes?.society_management?.name }</TableCell>
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
            <Typography variant="h6">{t("Create Announcement")}</Typography>
            <IconButton onClick={() => this.handleCreateAnnouncementModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <FormControl fullWidth style={{marginBottom:"15px"}}>
              <select className="dialog-select-input" style={{backgroundColor:"#f9f9f9"}} value={this.state.selectedBuilding} onChange={(e)=> this.setState({selectedBuilding:e.target.value})}>
                <option value="" disabled>
                  {t("Select Building")}
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
                placeholder={t("Title")}
                value={this.state.selectedTitle}
                onChange={(e)=> this.setState({selectedTitle:e.target.value})}
                className="dialog-input"
                style={{
                  marginTop: "0",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <select className="dialog-select-input" style={{backgroundColor:"#f9f9f9"}} value={this.state.selectedCategory} onChange={(e)=> this.setState({selectedCategory:e.target.value})}>
                <option value="" disabled>
                  {t("Select Category")}
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
              <textarea className="dialog-textarea-input" style={{backgroundColor:"#f9f9f9"}} placeholder={t("Description")} value={this.state.selectedDescription} onChange={(e) => this.setState({selectedDescription:e.target.value})} />
            </FormControl>
            <FormControl fullWidth>
              <div
                className="image-box"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <img src={this.state.blobImage||UploadImage} style={{maxWidth:'-webkit-fill-available'}}/>
                <Typography variant="body1">{t("Upload Image (Optional)")}</Typography>
                <Typography variant="body1" color="textSecondary">{this.state.selectedImage.name}</Typography>
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
              {t("Cancel")}
            </Button>
            <Button className="add-button" onClick={this.handleSubmit}>
              {t("Create")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withStyles(SuggestionStyleWeb)(withRouter(Announcements)));
// Customizable Area End
