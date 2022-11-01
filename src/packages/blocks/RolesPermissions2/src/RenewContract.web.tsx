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
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Card,
  FormControl,
  InputAdornment,
  Input,
  MenuItem,
  Select,
  OutlinedInput,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RenewContractController, { Props } from "./RenewContractController.web";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, ExclamationIcon, CalenderIcon, DurationIcon, RentAmountIcon, CurrencyIcon } from "./assets";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import "../../../web/src/i18n.js";

class RenewContract extends RenewContractController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    console.log(this.state);

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.selectTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step top-bar-contract-details">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <Link href={`/Contract/${this.state.contractId}`}>
                      <IconButton>
                        <KeyboardBackspaceIcon />
                      </IconButton>
                    </Link>
                    <span>{t("Renew Contract")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form renew-form">
                    <Box className="select-input-box">
                      <Box className="contract-info-box">
                        <Card className="contract-info">
                          <h4>Contract {this.state.contractId}</h4>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <span>{t("Tenant Name")}</span>
                              <p>{this.state.contractData.tenantName}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Complex")}</span>
                              <p>{this.state.contractData.complexName}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Building")}</span>
                              <p>{this.state.contractData.buildingName}</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>{t("Unit")}</span>
                              <p>{this.state.contractData.unitName}</p>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>

                      <Formik
                        enableReinitialize={true}
                        initialValues={this.state.renewForm}
                        validationSchema={this.RenewFormValidation}
                        onSubmit={(values, { resetForm }) => {
                          this.setState(
                            {
                              renewForm: {
                                duration: values.duration,
                                endDate: values.startDate,
                                startDate: values.startDate,
                                monthlyRent: values.monthlyRent,
                                currency: values.currency,
                              },
                            },
                            () => {
                              this.handleRenewContractModal();
                            }
                          );
                        }}
                      >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                          return (
                            <Form onSubmit={handleSubmit} translate="true">
                              <FormControl fullWidth>
                                <Input
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                  className="select-input input"
                                  placeholder={t("Enter Agreement Duration")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={DurationIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />
                                {errors.duration && touched.duration && <p className="error">{t(errors.duration)}</p>}
                              </FormControl>

                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <input
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="endDate"
                                    className="select-input input"
                                    placeholder={t("End Contract Date")}
                                    type="text"
                                    onFocus={(e: any) => (e.target.type = "date")}
                                    min={values.startDate}
                                  />
                                  <img src={CalenderIcon} alt="" />
                                </Box>
                                {errors.endDate && touched.endDate && <p className="error">{t(errors.endDate)}</p>}
                              </FormControl>

                              <FormControl fullWidth>
                                <Input
                                  value={values.monthlyRent}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="monthlyRent"
                                  className="select-input input"
                                  placeholder={t("Enter Monthly Rent Amount")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={RentAmountIcon} alt="" />
                                    </InputAdornment>
                                  }
                                />

                                {errors.monthlyRent && touched.monthlyRent && (
                                  <p className="error">{t(errors.monthlyRent)}</p>
                                )}
                              </FormControl>

                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.currency}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="currency"
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Select Currency")}
                                    </MenuItem>
                                    {this.state.currencyList.map((currency: any) => {
                                      return (
                                        <MenuItem value={currency.attributes.currency} key={currency.id}>
                                          {currency.attributes.currency}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <img src={CurrencyIcon} alt="" />
                                </Box>
                                {errors.currency && touched.currency && <p className="error">{t(errors.currency)}</p>}
                              </FormControl>

                              <div className="next-button">
                                <Button type="submit">{t("ReNew Contract")}</Button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
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

        <Dialog
          className="delete-document personal"
          fullWidth
          onClose={() => this.handleRenewContractModal()}
          open={this.state.isRenewContractModalOpen}
        >
          <DialogContent>
            <Box textAlign="center">
              <img src={ExclamationIcon} alt="ExclamationIcon" />
              <Typography variant="h6">{t("Renew Contract")}</Typography>
              <Typography variant="body1">
                {t("Are you sure want to renew contract with")} {this.state.contractData.tenantName}?
              </Typography>
              <DialogActions className="dialog-button-group">
                <Button onClick={() => this.handleRenewContract()}>{t("Yes, Renew")}</Button>
                <Button onClick={() => this.handleRenewContractModal()}>{t("No, Don't Renew")}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(RenewContract));
// Customizable Area End
