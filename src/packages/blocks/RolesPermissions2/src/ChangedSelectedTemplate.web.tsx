// Customizable Area Start
import React from "react";
import {
  Button,
  Container,
  IconButton,
  withStyles,
  Box,
  Grid,
  MenuItem,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Select,
  OutlinedInput,
  ListItemIcon,
  Input,
  InputAdornment,
  Checkbox,
  Drawer,
  FormControl,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import LeaseFormController, { Props } from "./LeaseFormController.web";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { ContractsStyleWeb } from "./ContractsStyle.web";
import { BuildingLogo, CardIcon, CubeIcon, EditIcon, PenaltyAmountIcon } from "./assets";
import { withTranslation } from "react-i18next";
import "../../../web/src/i18n.js";

class ChangedSelectedTemplate extends LeaseFormController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    const latePaymentPenalty = JSON.parse(window.sessionStorage.getItem("isLatePaymentPenalty") as any);
    const template_id: any = this.props.navigation.getParam("templateId");
    this.setState({ ...this.state, templateId: template_id, isLatePaymentPenalty: latePaymentPenalty }, () => {
      this.getTemplateText();
      this.getPenaltyDetails();
    });
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Box style={{ background: "white", height: "100vh" }} className={classes.changedTemplate}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box className="faq-step">
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton>
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <span>{t("Issue a Lease")}</span>
                  </div>
                </Box>
                <Container className="page-container">
                  <div className="template-box">
                    <div className="template-view">
                      <div dangerouslySetInnerHTML={{ __html: this.state.changedTemplate }} />
                    </div>
                    <div className="upload-button">
                      <Box className="condition-select">
                        <Checkbox
                          checked={this.state.isLatePaymentPenalty}
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onChange={(e) => {
                            this.setState(
                              {
                                isLatePaymentPenalty: e.target.checked,
                              },
                              () => {
                                window.sessionStorage.setItem(
                                  "isLatePaymentPenalty",
                                  this.state.isLatePaymentPenalty.toString()
                                );
                                if (!this.state.penalty && this.state.isLatePaymentPenalty) {
                                  this.handlePenaltyCountModal();
                                }
                              }
                            );
                          }}
                        />
                        <span>{t("Include Penalty for late Payment")}</span>
                      </Box>
                      <Box className="penalty-detail">
                        {this.state.penalty && (
                          <>
                            <div className="header">
                              <h4>{t("Penalty Details")}</h4>
                              <img
                                src={EditIcon}
                                onClick={() => {
                                  this.setState(
                                    {
                                      penaltyId: this.state.penalty.id,
                                      penaltyType: this.state.penalty.penanlty_counted,
                                      penaltyAmount: this.state.penalty.amount,
                                    },
                                    () => {
                                      this.handlePenaltyCountModal();
                                    }
                                  );
                                }}
                              />
                            </div>
                            <div className="content">
                              <Grid container spacing={2}>
                                <Grid item xs={12} className="content-item">
                                  <Box>
                                    <img src={CardIcon} />
                                  </Box>
                                  <Box>
                                    <span>{t("How Penalty will be counted?")}</span>
                                    <p>{t(this.state.penalty.penanlty_counted)}</p>
                                  </Box>
                                </Grid>
                                <Grid item xs={6} className="content-item">
                                  <Box>
                                    <img src={PenaltyAmountIcon} />
                                  </Box>
                                  <Box>
                                    <span>{t("Penalty Amount")}</span>
                                    <p>{this.state.penalty.amount}</p>
                                  </Box>
                                </Grid>
                              </Grid>
                            </div>
                          </>
                        )}
                      </Box>
                      <Box className="button-group">
                        <Button className="condition-button" onClick={() => this.handleConditionModal()}>
                          {t("Add More Condition")}
                        </Button>
                        <Link to={`${window.location.pathname}/Review`}>
                          <Button>{t("Review A Lease")}</Button>
                        </Link>
                      </Box>
                    </div>
                  </div>
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
          className="condition-modal"
          open={this.state.isConditionModalOpen}
          onClose={() => this.handleConditionModal()}
        >
          <Box className="condition-box">
            <h2>{t("Add More Conditions")}</h2>
            <Box className="content-box">
              <h4>{t("Personal Condition")}</h4>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
            </Box>
            <Box className="content-box">
              <h4>Personal Condition</h4>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
              <Box className="condition">
                <p>No Pet Allowed</p>
                <Checkbox
                  className="condition-check"
                  value={true}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              </Box>
            </Box>
          </Box>
          <Box className="button-group">
            <Button className="add-more-button">{t("Copy Checked Condition")}</Button>
            <Button className="add-button">{t("Add Checked Condition to a Lease")}</Button>
          </Box>
        </Drawer>

        <Drawer
          anchor="bottom"
          className="condition-modal penalty-dialog"
          open={this.state.isPenaltyCountModalOpen}
          onClose={() => this.handlePenaltyCountModal()}
        >
          <Formik
            initialValues={{
              penaltyType: this.state.penaltyType,
              penaltyAmount: this.state.penaltyAmount,
            }}
            validationSchema={this.PenaltyFormValidation}
            onSubmit={(values, { resetForm }) => {
              if (this.state.penaltyId) {
                this.editPenalty(values);
              } else {
                this.createPenalty(values);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} translate="true">
                  <Box>
                    <h4>{t("Penalty for late payments")}</h4>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={values.penaltyType}
                        variant="filled"
                        name="penaltyType"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-with-icon"
                        input={<OutlinedInput />}
                      >
                        <MenuItem value="" disabled>
                          <ListItemIcon>
                            <img src={CubeIcon} alt="" />
                          </ListItemIcon>
                          {t("How penalty will be counted")}
                        </MenuItem>
                        <MenuItem value="Fixed Percentage">{t("Fixed Percentage of Rent")}</MenuItem>
                        <MenuItem value="Fixed Amount">{t("Fixed Amount")}</MenuItem>
                      </Select>
                      {errors.penaltyType && touched.penaltyType && <p className="error">{t(errors.penaltyType)}</p>}
                    </FormControl>
                    {values.penaltyType && (
                      <FormControl fullWidth>
                        <Input
                          value={values.penaltyAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="penaltyAmount"
                          className="select-input"
                          placeholder={
                            values.penaltyType === "Fixed Amount"
                              ? `${t("Enter Fixed Amount")}`
                              : `${t("Enter Fixed Percentage of Rent")}`
                          }
                          startAdornment={
                            <InputAdornment position="start">
                              <img src={CubeIcon} alt="" />
                            </InputAdornment>
                          }
                        />
                        {errors.penaltyAmount && touched.penaltyAmount && (
                          <p className="error">{t(errors.penaltyAmount)}</p>
                        )}
                      </FormControl>
                    )}
                  </Box>
                  <Box className="button-group">
                    <Button className="add-button" type="submit">
                      {this.state.penaltyId ? `${t("Edit")}` : `${t("Add")}`}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Drawer>

        <Dialog
          className="penalty-dialog"
          maxWidth="xs"
          fullWidth
          onClose={() => this.handlePenaltyAmountModal()}
          open={this.state.isPenaltyAmountModalOpen}
        >
          <DialogContent>
            <Box>
              <Typography variant="h6">Penalty for late payments</Typography>
              <Select
                displayEmpty
                value=""
                variant="filled"
                fullWidth
                className="select-with-icon"
                input={<OutlinedInput />}
              >
                <MenuItem value="" disabled>
                  <ListItemIcon>
                    <img src={CubeIcon} alt="" />
                  </ListItemIcon>
                  {t("Fixed Amount")}
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                // variant="filled"
                fullWidth
                className="select-input"
                placeholder="Enter Fixed Amount"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={CubeIcon} alt="" />
                  </InputAdornment>
                }
              />
              <DialogActions className="dialog-button-group">
                <Button
                  className="add-button"
                  onClick={() => {
                    this.handlePenaltyAmountModal();
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(withStyles(ContractsStyleWeb)(ChangedSelectedTemplate));
// Customizable Area End
