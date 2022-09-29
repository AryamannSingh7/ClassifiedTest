import React from "react";
import {
  Container,
  Typography,
  Link,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
  Grid,
  Card,
  Tabs,
  Tab,
  Divider,
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
  InputLabel,
  Input,
  Select,
  MenuItem,
  ListItemIcon,
  OutlinedInput,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BuildingsController, { Props } from "./BuildingsController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
import {
  upload,
  Document,
  sizebw,
  unitbw,
  bentalyLogo,
  location,
  uploadbw,
  del_image,
  floorIcon,
  earthIcon,
  complexbw,
} from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function createData(
  no: any,
  Unit_Number: any,
  Floor_Number: any,
  Resident_Name: any,
  Owner: any,
  Status: any,
  more: any
) {
  return { no, Unit_Number, Floor_Number, Resident_Name, Owner, Status, more };
}

const rows = [
  createData(1, "A202", "15", "Anaru Hakopa", "Andries Grootoonk", "Rented", <MoreVertIcon color="disabled" />),
  createData(2, "A203", "15", "Anaru Hakopa", "Florieke Krebber", "Empty", <MoreVertIcon color="disabled" />),
  createData(3, "A204", "15", "Beatriz Brito", "Gabriel Soares", "Occupied", <MoreVertIcon color="disabled" />),
  createData(4, "A205", "15", "-", "Miriam de Jesús", "Empty", <MoreVertIcon color="disabled" />),
  createData(5, "A206", "15", "Mbah Enow", "Slavcho Karbashewski", "Occupied", <MoreVertIcon color="disabled" />),
  createData(6, "A207", "15", "-", "Somun Ae-Ri", "Rented", <MoreVertIcon color="disabled" />),
  createData(7, "A208", "15", "Sakane Miiko", "Somun Ae-Ri", "Empty", <MoreVertIcon color="disabled" />),
];

const settings = {
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
};

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500",
];

class Buildings extends BuildingsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    var searchData = rows.filter((item) => {
      if (this.state.dataSearch === "") {
        return item;
      } else if (item.Unit_Number.toLowerCase().includes(this.state.dataSearch.toLowerCase())) {
        return item;
      }
    });

    return (
      <>
        <Box className={classes.building} style={{ background: "#F4F7FF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1">
                      {t("Building & Apartments")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Buildings")}
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container style={dashBoard.gaMemberMain}>
                    <Grid item xs={6}>
                      <Typography variant="h5" style={dashBoard.subHeading}>
                        {t("Buildings & Apartments")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        className="edit-button"
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleEditBuildingModal()}
                      >
                        Edit Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="building-info">
                  <Card>
                    <Box className="building-info-top">
                      <Box className="building-info-left">
                        <img src={bentalyLogo} alt="logo" />
                        <Box className="building-name-country">
                          <h4>Building Name</h4>
                          <p>Abu Dhabi</p>
                        </Box>
                      </Box>
                      <Box className="building-info-right">
                        <img src={location} alt="|" />
                        <span>See building on map</span>
                      </Box>
                    </Box>
                    <Box className="building-info-bottom">
                      <Slider {...settings}>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                        <div onClick={() => this.setState({ imageBox: true })}>
                          <img src="https://tinyurl.com/5dznmsms" alt="" />
                        </div>
                      </Slider>
                    </Box>
                  </Card>
                </Box>

                <Box className="about-building">
                  <Card>
                    <h4>{t("About Building Name")}</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining essentially unchanged
                    </p>
                  </Card>
                </Box>

                <Box className="stat-boxes">
                  <Grid container spacing={2}>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Building Area")}</p>
                        <h2>1500 sqft</h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Floors")}</p>
                        <h2>1500 sqft</h2>
                      </Card>
                    </Grid>
                    <Grid item sm={4}>
                      <Card>
                        <p>{t("Total Units")}</p>
                        <h2>1500 sqft</h2>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="content-boxes">
                  <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
                    <Tab label={t("Documents")} />
                    <Tab label={t("Units")} />
                    <Tab label={t("Shared Area")} />
                  </Tabs>
                  <Box className="tab-content">
                    <TabPanel value={this.state.currentTab} index={0}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Documents")}</h2>
                          </Box>
                          <Box className="right-content">
                            <img src={upload} alt="|" />
                            <span>Upload</span>
                          </Box>
                        </Box>
                        <Divider />
                        <Box className="document-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Policy">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Policy")}</h4>
                                  </div>
                                  <Button className="color-btn">{/* {this.state.policy}  */}0</Button>
                                  {/* {this.state.policy > 0 && (
                                      <Button className="color-btn">
                                        {this.state.policy}
                                      </Button>
                                    )} */}
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Guidelines">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Guidelines")}</h4>
                                  </div>
                                  <Button className="color-btn">{/* {this.state.policy}  */}0</Button>
                                  {/* {this.state.guidelines > 0 && (
                                      <Button className="color-btn">
                                        {this.state.guidelines}
                                      </Button>
                                    )} */}
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Roles">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Roles")}</h4>
                                  </div>
                                  <Button className="color-btn">{/* {this.state.policy}  */}0</Button>
                                  {/* {this.state.roles > 0 && (
                                      <Button className="color-btn">
                                        {this.state.roles}
                                      </Button>
                                    )} */}
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Resolutions">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Resolution")}</h4>
                                  </div>
                                  <Button className="color-btn">{/* {this.state.policy}  */}0</Button>
                                  {/* {this.state.resolution > 0 && (
                                      <Button className="color-btn">
                                        {this.state.resolution}
                                      </Button>
                                    )} */}
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Building-Plans">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Building Plans")}</h4>
                                  </div>
                                  <Button className="color-btn">{/* {this.state.policy}  */}0</Button>
                                  {/* {this.state.buildingPlans > 0 && (
                                      <Button className="color-btn">
                                        {this.state.buildingPlans}
                                      </Button>
                                    )} */}
                                </Box>
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={1}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Units")}</h2>
                          </Box>
                          <Box className="right-content">
                            <select value="" className="unit-select">
                              <option disabled value="">
                                Status
                              </option>
                            </select>
                            <TextField
                              className="search-unit"
                              placeholder="Search by unit number"
                              onChange={(e) => this.setState({ dataSearch: e.target.value })}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        </Box>
                        <Divider />
                        <TableContainer>
                          <Table className="unit-table">
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>{t("Unit Number")}</TableCell>
                                <TableCell>{t("Floor Number")}</TableCell>
                                <TableCell>{t("Resident Name")}</TableCell>
                                <TableCell>{t("Owner")}</TableCell>
                                <TableCell>{t("Status")}</TableCell>
                                <TableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {searchData.map((row) => (
                                <TableRow key={row.no}>
                                  <TableCell>{row.no}</TableCell>
                                  <TableCell>{row.Unit_Number}</TableCell>
                                  <TableCell>{row.Floor_Number}</TableCell>
                                  <TableCell>{row.Resident_Name}</TableCell>
                                  <TableCell>{row.Owner}</TableCell>
                                  <TableCell>{row.Status}</TableCell>
                                  {/* <TableCell onClick={(e: any) => this.handleMoreClick(e)}>{row.more}</TableCell> */}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box className="unit-pagination">
                          <p>
                            {t("Showing")} <span>5</span> {t("of")} <span>{rows.length}</span> {t("results")}
                          </p>
                          <Pagination count={10} variant="outlined" shape="rounded" />
                        </Box>
                      </>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={2}>
                      <>
                        <Box className="top-content">
                          <Box className="heading">
                            <h2>{t("Shared Area")}</h2>
                          </Box>
                        </Box>
                        <Divider />
                        <Box className="document-box">
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                              {/* <Link href="/DocumentChairman/Policy"> */}
                              <Box className="item" style={dashBoard.cursorPointer}>
                                <div className="heading" onClick={() => this.props.navigation.navigate("SharedArea")}>
                                  <img src={Document} />
                                  <h4>{t("Community Hall")}</h4>
                                </div>
                              </Box>
                              {/* </Link> */}
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Guidelines">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Garden")}</h4>
                                  </div>
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Roles">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Common Parking")}</h4>
                                  </div>
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Resolutions">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Swimming Pool")}</h4>
                                  </div>
                                </Box>
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                              <Link href="/DocumentChairman/Building-Plans">
                                <Box className="item">
                                  <div className="heading">
                                    <img src={Document} />
                                    <h4>{t("Park")}</h4>
                                  </div>
                                </Box>
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    </TabPanel>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        {this.state.imageBox && (
          <Lightbox
            mainSrc={images[this.state.photoIndex]}
            nextSrc={images[(this.state.photoIndex + 1) % images.length]}
            prevSrc={images[(this.state.photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ imageBox: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (this.state.photoIndex + 1) % images.length,
              })
            }
          />
        )}

        <Dialog
          className="edit-profile"
          open={this.state.isEditBuildingModalOpen}
          scroll="paper"
          fullWidth
          maxWidth="md"
        >
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Edit Details</Typography>
            <IconButton onClick={() => this.handleEditBuildingModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <Box className="profile-picture">
              <img src={bentalyLogo} alt="profile" className="picture building" />
              <p>Change Logo</p>
            </Box>
            <Grid container spacing={2} className="edit-building">
              <Grid item md={12}>
                <InputLabel>Upload Photos</InputLabel>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className="upload-photo">
                      <img src={uploadbw} alt="" />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className="building-image">
                      <img src={del_image} className="delete-image" />
                      <img src="https://tinyurl.com/5dznmsms" alt="" />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className="building-image">
                      <img src={del_image} className="delete-image" />
                      <img src="https://tinyurl.com/5dznmsms" alt="" />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className="building-image">
                      <img src={del_image} className="delete-image" />
                      <img src="https://tinyurl.com/5dznmsms" alt="" />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <InputLabel>About Us</InputLabel>
                <TextareaAutosize className="about-us" placeholder="About Us" />
              </Grid>
              <Grid item md={6}>
                <InputLabel>Building Name</InputLabel>
                <Select fullWidth value="" className="select-box" displayEmpty input={<OutlinedInput />}>
                  <MenuItem value="" disabled>
                    <ListItemIcon>
                      <img src={complexbw} alt="" />
                    </ListItemIcon>
                    Building Name
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6}>
                <InputLabel>Country</InputLabel>
                <Select fullWidth value="" className="select-box" displayEmpty input={<OutlinedInput />}>
                  <MenuItem value="" disabled>
                    <ListItemIcon>
                      <img src={earthIcon} alt="" />
                    </ListItemIcon>
                    Country Name
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6}>
                <InputLabel>Building Area</InputLabel>
                <Input
                  className="input-with-icon"
                  fullWidth
                  placeholder="Building Area"
                  startAdornment={
                    <InputAdornment position="start">
                      <img src={sizebw} alt="icon" />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel>Total Floors</InputLabel>
                <Input
                  className="input-with-icon"
                  fullWidth
                  placeholder="Total Floors"
                  startAdornment={
                    <InputAdornment position="start">
                      <img src={floorIcon} alt="icon" />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item md={12}>
                <InputLabel>Total Units</InputLabel>
                <Input
                  className="input-with-icon"
                  fullWidth
                  placeholder="Total Units"
                  startAdornment={
                    <InputAdornment position="start">
                      <img src={unitbw} alt="icon" />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleEditBuildingModal()}>
              Cancel
            </Button>
            <Button className="add-button">Save</Button>
          </DialogActions>
        </Dialog>

        {/* <Loader loading={this.state.loading} /> */}
      </>
    );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(BuildingApartmentStyle)(Buildings));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
  },
  buildingCount: {
    color: "#FC8434",
    fontWeight: 600,
    marginTop: 15,
  },
  tabLabel: {
    color: "#FC8434",
    fontWeight: 600,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    padding: 5,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  searchButton: {
    margin: 8,
  },
  backColor: {
    backgroundColor: "#2D6EED",
    padding: "9px 16px",
  },
  boxStyling: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  gaMemberMain: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  viewMore: {
    marginTop: 15,
    textDecoration: "underline",
    color: "#E5B08D",
    fontWeight: 600,
  },
  gaMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20,
  },
  relatedMemberCard: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr",
    gap: 20,
  },
  profileImage: {
    borderRadius: "100%",
    width: 70,
    height: 70,
    margin: "35px auto",
  },
  userType: {
    backgroundColor: "aliceblue",
    borderRadius: 30,
    display: "inline-block",
    padding: "3px 20px",
    color: "#2D6EED",
    fontWeight: 600,
  },
  unitno: {
    marginTop: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  contactIcon: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  commonDisplay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStyle: {
    borderRadius: 10,
    maxWidth: 345,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  managementPaper: {
    padding: 20,
    borderRadius: 10,
  },
  TableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px 20px 0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  commonFont: {
    fontWeight: 600,
  },
  labelsStyle: {
    color: "#212121",
    margin: "10px 0px 10px 0px",
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    // boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    width: "700px",
  },
  inviteInput: {
    padding: "18px 18px 18px 50px",
    color: "#b5b5b5",
    borderRadius: "10px",
    border: "1px solid #e9dede",
    backgroundColor: "#f9f9f9",
    fontSize: "16px",
    outline: 0,
    width: "100%",
  },
  formLeftIcn: {
    position: "absolute",
    left: 20,
    top: 44,
    color: "#b9b9b9",
  },
};

// Customizable Area End
