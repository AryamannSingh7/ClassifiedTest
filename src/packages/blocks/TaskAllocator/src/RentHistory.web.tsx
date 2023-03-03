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

  handleRentHistoryError = (errors: any, touched: any, t: any) => {
    if (errors && touched) {
      return <small className="error">{t(errors)}</small>;
    }
  };

  render() {
    const { t, classes }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.tenantDetails}>
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
                    <span className="bold-text">{t("Rent History")}</span>
                  </div>
                  <div className="right-icon">
                    {this.state.isDeleteOpen ? (
                      <>
                        <p onClick={() => this.selectAllHistory()}>{t("Select All")}</p>
                        <img src={DeleteRentIcon} alt="delete" onClick={() => this.deleteRentHistories()} />
                      </>
                    ) : (
                      <img src={DeleteRentIcon} alt="delete" onClick={() => this.setState({ isDeleteOpen: true })} />
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
                                <h4 className="bold-text">
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
                            <Box className="history-info-box">
                              <Box className="info">
                                <p>{t("Rent Amount (Monthly)")}</p>
                                <span>
                                  {(history.attributes.currency &&
                                    this.validationText(history.attributes.currency.currency)) +
                                    " " +
                                    Number(this.validationText(history.attributes.rent_amount)).toLocaleString()}
                                </span>
                              </Box>
                              <Box className="info">
                                <p>{t("Received Amount")}</p>
                                <span>
                                  {(history.attributes.currency &&
                                    this.validationText(history.attributes.currency.currency)) +
                                    " " +
                                    Number(this.validationText(history.attributes.received_amount)).toLocaleString()}
                                </span>
                              </Box>
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
                    <h4 className="bold-text">{t("Rent History")}</h4>
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
                          {this.handleRentHistoryError(errors.startDate, touched.startDate, t)}
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
                          {this.handleRentHistoryError(errors.endDate, touched.endDate, t)}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <Box className="unit-box-currency">
                        <Input
                          value={values.rentAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="rentAmount"
                          className="select-input input"
                          placeholder={t("Rent Amount (Monthly)")}
                          type="text"
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={RentAmountHistoryIcon} alt="" />
                            </InputAdornment>
                          }
                        />
                        <Box className="unit-box-value">{this.state.currency}</Box>
                      </Box>
                      {this.handleRentHistoryError(errors.rentAmount, touched.rentAmount, t)}
                    </FormControl>
                    <FormControl fullWidth>
                      <Box className="unit-box-currency">
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
                        <Box className="unit-box-value">{this.state.currency}</Box>
                      </Box>
                      {this.handleRentHistoryError(errors.receivedAmount, touched.receivedAmount, t)}
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
                      {this.handleRentHistoryError(errors.tenantName, touched.tenantName, t)}
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
