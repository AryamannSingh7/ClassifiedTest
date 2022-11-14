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
  MenuItem,
  Card,
  Drawer,
  FormControl,
  Select,
  OutlinedInput,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Menu } from "@szhsin/react-menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PropertyManagerDetailsController, { Props } from "./PropertyManagerDetailsController.web";
import {
  BuildingLogo,
  SortIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  BlueManagerIcon,
  BlueNumberIcon,
  BlueCompanyIcon,
  BluePhoneIcon,
  BlueEmailIcon,
  BlueTypeIcon,
  BlueDateIcon,
  PdfIcon,
  DownloadIcon,
  CountryIcon,
  CityIcon,
  BuildingIcon,
  UnitIcon,
  IDDateIcon,
  FeeTypeIcon,
} from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";
import { PropertyManagerStyleWeb } from "./PropertyManagerStyle.web";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Form, Formik } from "formik";

class PropertyManagerDetails extends PropertyManagerDetailsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "#F4F7FF", height: "100vh" }} className={classes.managerDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href="/PropertyManagers">
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>Ali Khan</span>
                  </div>
                  <div className="right-icon">
                    <img src={EditIcon} alt="edit" />
                    <img src={DeleteIcon} alt="delete" />
                  </div>
                </Box>
                <Container>
                  <Box className="list-box">
                    <Box className="details-box-item">
                      <h4>Property Manager Details</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueManagerIcon} alt="" />
                              <Box className="box-item-content">
                                <span>Manager Name</span>
                                <p>Manager Name</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueCompanyIcon} alt="" />
                              <Box className="box-item-content">
                                <span>Company Name</span>
                                <p>Company Name</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BluePhoneIcon} alt="" />
                              <Box className="box-item-content">
                                <span>Phone Number</span>
                                <p>1234567890</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="box-item">
                              <img src={BlueEmailIcon} alt="" />
                              <Box className="box-item-content">
                                <span>Email Address</span>
                                <p>john.deo@yopmail.com</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="details-box-item">
                      <h4>Property Details</h4>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Card>
                            <Box className="heading-box-item">
                              <h4>Building 5 Unit 508</h4>
                              <Box className="right-box-item">
                                <img src={EditIcon} alt="edit" onClick={() => this.handleEditPropertyModal()} />
                                <img src={DeleteIcon} alt="delete" />
                                {/* <span>See building on map</span> */}
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Box className="box-item-content">
                                  <span>Contract</span>
                                  <p> 01 April, 2020 - 31 March, 2025</p>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="box-item-content">
                                  <span>Charges</span>
                                  <p>SR 1400/Month</p>
                                </Box>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Card>
                            <Box className="heading-box-item">
                              <h4>Building 5 Unit 508</h4>
                              <Box className="right-box-item">
                                {/* <img src={EditIcon} alt="edit" />
                                    <img src={DeleteIcon} alt="delete" /> */}
                                <span>See building on map</span>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Box className="box-item-content">
                                  <span>Contract</span>
                                  <p> 01 April, 2020 - 31 March, 2025</p>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="box-item-content">
                                  <span>Charges</span>
                                  <p>SR 1400/Month</p>
                                </Box>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box className="details-box-item">
                      <h4>Identity Proof</h4>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueTypeIcon} alt="" />
                              <Box className="box-item-content">
                                <span>ID Type</span>
                                <p>Aadhar Card</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueNumberIcon} alt="" />
                              <Box className="box-item-content">
                                <span>ID Number</span>
                                <p>8567-5231-1456</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="box-item">
                              <img src={BlueDateIcon} alt="" />
                              <Box className="box-item-content">
                                <span>ID Expiration Date</span>
                                <p>14-March-2024</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>

                    <Box className="pdf-content-box">
                      <Card>
                        <Box className="heading">
                          <img src={PdfIcon} alt="" />
                          <h4>Ali Khan Aadhaar Card </h4>
                        </Box>
                        <img src={DownloadIcon} alt="" />
                      </Card>
                    </Box>

                    <Box className="button-box">
                      <Button className="decline">Decline</Button>
                      <Button className="accept">Accept</Button>
                    </Box>
                  </Box>
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

        <Drawer
          anchor="bottom"
          className="condition-modal penalty-dialog rent-history-dialog"
          open={this.state.isEditPropertyModalOpen}
          onClose={() => this.handleEditPropertyModal()}
        >
          <Formik
            enableReinitialize
            initialValues={{}}
            validationSchema={{}}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              // resetForm();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate="true">
                  <Box>
                    <h4>{t("Edit Another Property")}</h4>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Country")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={CountryIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("City")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={CityIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Building Name")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={BuildingIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Unit Number")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={UnitIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="startDate"
                        className="select-input input"
                        placeholder={t("Contract Start Date")}
                        type="text"
                        onFocus={(e: any) => (e.target.type = "date")}
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={IDDateIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {/* {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="startDate"
                        className="select-input input"
                        placeholder={t("Contract End Date")}
                        type="text"
                        onFocus={(e: any) => (e.target.type = "date")}
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={IDDateIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {/* {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="select-box">
                        <Select
                          displayEmpty
                          value=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="country"
                          className="select-input"
                          input={<OutlinedInput />}
                        >
                          <MenuItem value="" disabled>
                            {t("Select Fee Type")}
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <img src={FeeTypeIcon} alt="" />
                      </Box>
                      {/* {errors.buildingId && touched.buildingId && (
                                  <p className="error">{t(errors.buildingId)}</p>
                                )} */}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rentAmount"
                        className="select-input input"
                        placeholder={t("Enter Fixed Percentage of Rent")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={FeeTypeIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {/* {errors.rentAmount && touched.rentAmount && <p className="error">{t(errors.rentAmount)}</p>} */}
                    </FormControl>
                  </Box>
                  <Box className="button-group">
                    <Button className="add-button" type="submit">
                      {t("Edit")}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Drawer>
      </>
    );
  }
}

export default withTranslation()(withStyles(PropertyManagerStyleWeb)(PropertyManagerDetails));
// Customizable Area End
