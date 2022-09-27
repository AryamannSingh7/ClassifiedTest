import React from "react";
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  TextareaAutosize,
  withStyles,
  Card,
  Divider,
  Dialog,
  IconButton,
  Input,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import "../../dashboard/src/Dashboard.web.css";
import Box from "@material-ui/core/Box";
//@ts-ignore
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import SharedAreaController, { Props } from "./SharedAreaController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import "./style.css";
//@ts-ignore
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { uploadbw, del_image, downloadIcon, Document } from "./assets";
import { BuildingApartmentStyle } from "./BuildingApartmentStyle.web";

const maxNumber = 69;

function createData(no: any, Reserved_By: any, Building: any, Unit_Number: any, Reserved_On: any, Duration: any) {
  return { no, Reserved_By, Building, Unit_Number, Reserved_On, Duration };
}

const rows = [
  createData(1, "John Doe", "Building 1", "A-101", "12 July 2022", "9:00 - 12:00"),
  createData(2, "Stellina Pareker", "Building 2", "A-102", "12 July 2021", "9:00 - 12:00"),
  createData(3, "Kevin", "Building 3", "A-103", "12 July 2020", "9:00 - 12:00"),
  createData(4, "Harper Hawking", "Building 4", "A-104", "12 July 2019", "9:00 - 12:00"),
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

class SharedArea extends SharedAreaController {
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
                      {t("Building & Apartments")} / {t("Buildings")} /{" "}
                      <Box component="span" style={{ color: "blue" }}>
                        {t("Commercial Hall")}
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container style={dashBoard.gaMemberMain}>
                    <Grid item xs={6}>
                      <Typography variant="h5" style={dashBoard.subHeading}>
                        {t("Commercial Hall")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        className="edit-button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplexEditModal}
                      >
                        Edit Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="building-info">
                  <Card>
                    <Box className="building-info-bottom shared-area-image">
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

                <Box className="about-building">
                  <Card>
                    <h4> {t("Details")}</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining essentially unchanged
                    </p>

                    <Box className="bottom-detail">
                      <Box className="left-detail">
                        <p>
                          Total Area: <span>1800 sqft</span>
                        </p>
                        <p>
                          Reservation fees: <span>SR 50 per hour</span>
                        </p>
                      </Box>
                      <Box className="right-detail">
                        <Box className="name">
                          <img src={Document} alt="" />
                          <h6>Floor Plan</h6>
                        </Box>
                        <img src={downloadIcon} alt="" />
                      </Box>
                    </Box>
                  </Card>
                </Box>

                <Box className="content-boxes shared-table">
                  <Card>
                    <Box className="top-content">
                      <Box className="heading">
                        <h2>{t("Upcoming Reservation")}</h2>
                      </Box>
                      <Box className="right-content">
                        <select value="" className="unit-select">
                          <option disabled value="">
                            Building
                          </option>
                        </select>
                      </Box>
                    </Box>
                    <Divider />
                    <TableContainer className="unit-table">
                      <Table className="unit-table">
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>{t("Reserved By")}</TableCell>
                            <TableCell>{t("Building")}</TableCell>
                            <TableCell>{t("Unit Number")}</TableCell>
                            <TableCell>{t("Reserved On")}</TableCell>
                            <TableCell>{t("Duration")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchData.map((row) => (
                            <TableRow key={row.no}>
                              <TableCell>{row.no}</TableCell>
                              <TableCell align="left">{row.Reserved_By}</TableCell>
                              <TableCell align="left">{row.Building}</TableCell>
                              <TableCell align="left">{row.Unit_Number}</TableCell>
                              <TableCell align="left">{row.Reserved_On}</TableCell>
                              <TableCell align="left">{row.Duration}</TableCell>
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
                  </Card>
                </Box>
              </Container>
            </Grid>
          </Box>
        </Box>

        <Dialog className="edit-profile" open={this.state.setComplexEditOpen} scroll="paper" fullWidth maxWidth="md">
          <MuiDialogTitle disableTypography className="dialog-heading">
            <Typography variant="h6">Edit Details</Typography>
            <IconButton onClick={() => this.handleComplexEditModal()}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
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
                <InputLabel>Details</InputLabel>
                <TextareaAutosize className="about-us" placeholder="Details" />
              </Grid>
              <Grid item md={12}>
                <InputLabel>Total Area</InputLabel>
                <Input className="input-with-icon" fullWidth placeholder="Total Area" />
              </Grid>
              <Grid item md={12}>
                <InputLabel>Reservation Fees (Per hour)</InputLabel>
                <Input className="input-with-icon" fullWidth placeholder="Reservation Fees (Per hour)" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-button-group">
            <Button className="cancel-button" onClick={() => this.handleComplexEditModal()}>
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
export default withTranslation()(withStyles(BuildingApartmentStyle)(SharedArea));

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 0,
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
    padding: "18px 18px 18px 18px",
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
  headerFont: {
    color: "#000",
    fontWeight: 600,
  },
  formLabels: {
    paddingLeft: 35,
  },
};

// Customizable Area End
