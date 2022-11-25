import React from "react";
import { withTranslation } from "react-i18next";
import RentHistoryController, { Props } from "./RentHistoryController.web";
import { MyUnitStyle } from "./MyUnitStyle.web";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { BuildingImage, CalenderIcon, DeleteRentIcon, ReceivedIcon, RentAmountHistoryIcon, TenantIcon } from "./assets";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import moment from "moment";
import { Form, Formik } from "formik";
import Loader from "../../../components/src/Loader.web";

class RentHistory extends RentHistoryController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t }: any = this.props;
    const { classes } = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "#F4F7FF", height: "100vh", overflowY: "hidden" }} className={classes.tenantDetails}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton
                      onClick={() => this.props.navigation.navigate("MyUnitDetails", { id: this.state.unitId })}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Rent History")}</span>
                  </div>
                  <div className="right-icon">
                    {this.state.isDeleteOpen && <p onClick={() => this.selectAllHistory()}>{t("Select All")}</p>}
                    {this.state.isDeleteOpen ? (
                      <img src={DeleteRentIcon} alt="delete" onClick={() => this.deleteRentHistories()} />
                    ) : (
                      !this.state.isDeleteOpen &&
                      this.state.rentHistory.length >= 0 && (
                        <img src={DeleteRentIcon} alt="delete" onClick={() => this.setState({ isDeleteOpen: true })} />
                      )
                    )}
                  </div>
                </Box>
                <Box className="">
                  <Container className="rent-history-grid">
                    <Box className="rent-history-box">
                      {this.state.rentHistory.length === 0 && (
                        <Box className="rent-history">{t("No history available")}</Box>
                      )}
                      {this.state.rentHistory.map((history: any) => {
                        return (
                          <Box className="rent-history" key={history.id}>
                            <Box className="header">
                              <Box className="left-side">
                                <h4>
                                  {moment(history.attributes.start_date, "YYYY-MM-DD").format("MMMM YYYY") +
                                    " to " +
                                    moment(history.attributes.end_date, "YYYY-MM-DD").format("MMMM YYYY")}
                                </h4>
                                <p className="date">{history.attributes.tenant_name || "-"}</p>
                              </Box>
                              {this.state.isDeleteOpen && (
                                <Checkbox
                                  onChange={(e: any) => {
                                    if (!e.target.checked) {
                                      const newIdList = this.state.selectedRentHistory.filter(
                                        (id: any) => id !== history.id
                                      );
                                      this.setState({
                                        selectedRentHistory: newIdList,
                                      });
                                    } else {
                                      this.setState({
                                        selectedRentHistory: [...this.state.selectedRentHistory, history.id],
                                      });
                                    }
                                  }}
                                  checked={this.state.selectedRentHistory.includes(history.id)}
                                  icon={<CircleUnchecked />}
                                  checkedIcon={<CircleCheckedFilled />}
                                />
                              )}
                            </Box>
                            <Divider />
                            <Box className="info">
                              <p>{t("Rent Amount")}</p>
                              <span>{this.validationText(history.attributes.rent_amount)}</span>
                            </Box>
                            <Box className="info">
                              <p>{t("Received Amount")}</p>
                              <span>{this.validationText(history.attributes.received_amount)}</span>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                    {!this.state.isDeleteOpen && (
                      <div className="upload-button">
                        <Grid container>
                          <Grid item xs={12} md={12}>
                            <Button onClick={() => this.handleRentHistoryModal()}>
                              {t("Add Another Rent History")}
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </Container>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
                <img src={BuildingImage.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Drawer
          anchor="bottom"
          className="condition-modal penalty-dialog rent-history-dialog"
          open={this.state.isRentHistoryModalOpen}
          onClose={() => this.handleRentHistoryModal()}
        >
          <Formik
            enableReinitialize
            initialValues={this.state.rentHistoryForm}
            validationSchema={this.validationRentHistoryFormSchema}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: true }, () => {
                this.handleRentHistoryModal();
                this.addRentHistory(values);
                resetForm();
              });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate="true">
                  <Box>
                    <h4>{t("Rent History")}</h4>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <Box className="custom-input-box">
                            <input
                              value={values.startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="startDate"
                              className="select-input input"
                              placeholder={t("Start Date")}
                              type="text"
                              onFocus={(e: any) => (e.target.type = "date")}
                              max={moment().format("YYYY-MM-DD")}
                            />
                            <img src={CalenderIcon} alt="" />
                          </Box>
                          {errors.startDate && touched.startDate && <p className="error">{t(errors.startDate)}</p>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <Box className="custom-input-box">
                            <input
                              value={values.endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="endDate"
                              className="select-input input"
                              placeholder={t("End Date")}
                              type="text"
                              onFocus={(e: any) => (e.target.type = "date")}
                              min={values.startDate}
                              max={moment().format("YYYY-MM-DD")}
                            />
                            <img src={CalenderIcon} alt="" />
                          </Box>
                          {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Input
                        value={values.rentAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="rentAmount"
                        className="select-input input"
                        placeholder={t("Rent Amount")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={RentAmountHistoryIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.rentAmount && touched.rentAmount && <p className="error">{t(errors.rentAmount)}</p>}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.receivedAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="receivedAmount"
                        className="select-input input"
                        placeholder={t("Received Amount")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={ReceivedIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.receivedAmount && touched.receivedAmount && (
                        <p className="error">{t(errors.receivedAmount)}</p>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <Input
                        value={values.tenantName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="tenantName"
                        className="select-input input"
                        placeholder={t("Tenant Name")}
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src={TenantIcon} alt="" />
                          </InputAdornment>
                        }
                      />
                      {errors.tenantName && touched.tenantName && <p className="error">{t(errors.tenantName)}</p>}
                    </FormControl>
                  </Box>
                  <Box className="button-group">
                    <Button className="add-button" type="submit">
                      {t("Add")}
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

export default withTranslation()(withStyles(MyUnitStyle)(RentHistory));
