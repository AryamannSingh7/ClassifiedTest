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
  Select,
  OutlinedInput,
  InputAdornment,
  Input,
  FormControl,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  BuildingIcon,
  CategoryIcon,
  ExpenseAmountIcon,
  ExpenseDateIcon,
  IssueIcon,
  ResolvedByIcon,
  SummaryIcon,
  UnitIcon,
} from "../assets";
import AddEditExpenseController, { Props } from "./AddEditExpenseController.web";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import "../../../../web/src/i18n.js";
import { ExpenseTrackingStyle } from "./ExpenseTrackingStyle.web";
import Loader from "../../../../components/src/Loader.web";
import OwnerSidebarImage from "../../../../components/src/OwnerSidebarImage.web";

class AddEditExpense extends AddEditExpenseController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { t }: any = this.props;

    return (
      <>
        <Loader loading={this.state.loading} />

        <Box style={{ background: "white", height: "100vh", overflowY: "hidden" }} className={classes.addEditExpense}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <Box>
                <Box display={{ xs: "flex", md: "flex" }} className="top-bar">
                  <div className="left-icon">
                    <IconButton
                      onClick={() => {
                        this.props.navigation.navigate("MyExpenseList");
                      }}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    {this.state.expenseId ? <span>{t("Edit Expense")}</span> : <span>{t("Add Another Expense")}</span>}
                  </div>
                </Box>
                <Container className="page-container">
                  <Box className="issue-lease-content form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state.expenseForm}
                      validationSchema={
                        this.state.expenseId ? this.validationEditUnitFormSchema : this.validationAddUnitFormSchema
                      }
                      onSubmit={(values, { resetForm }) => {
                        if (this.state.expenseId) {
                          console.log(values);
                        } else {
                          console.log(values);
                          this.props.navigation.navigate("AddExpenseSuccess");
                          resetForm();
                        }
                      }}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
                        return (
                          <Form onSubmit={handleSubmit} translate="true">
                            <Box className="select-input-box">
                              <FormControl fullWidth>
                                <Input
                                  value={values.expenseDate}
                                  name="expenseDate"
                                  className="select-input input"
                                  placeholder={t("Expense Date")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ExpenseDateIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.expenseDate && touched.expenseDate && (
                                  <p className="error">{t(errors.expenseDate)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.expenseAmount}
                                  name="expenseAmount"
                                  className="select-input input"
                                  placeholder={t("Expense Amount")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ExpenseAmountIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.expenseAmount && touched.expenseAmount && (
                                  <p className="error">{t(errors.expenseAmount)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.issueTitle}
                                  name="issueTitle"
                                  className="select-input input"
                                  placeholder={t("Issue Title")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={IssueIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.issueTitle && touched.issueTitle && (
                                  <p className="error">{t(errors.issueTitle)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.category}
                                    name="category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Category")}
                                    </MenuItem>
                                  </Select>
                                  <img src={CategoryIcon} alt="" />
                                </Box>
                                {errors.category && touched.category && <p className="error">{t(errors.category)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.building}
                                    name="building"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Building Name")}
                                    </MenuItem>
                                  </Select>
                                  <img src={BuildingIcon} alt="" />
                                </Box>
                                {errors.building && touched.building && <p className="error">{t(errors.building)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Box className="select-box">
                                  <Select
                                    displayEmpty
                                    value={values.unit}
                                    name="unit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                    className="select-input"
                                    input={<OutlinedInput />}
                                  >
                                    <MenuItem value="" disabled>
                                      {t("Unit Number")}
                                    </MenuItem>
                                  </Select>
                                  <img src={UnitIcon} alt="" />
                                </Box>
                                {errors.unit && touched.unit && <p className="error">{t(errors.unit)}</p>}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.resolvedBy}
                                  name="resolvedBy"
                                  className="select-input input"
                                  placeholder={t("Resolved By")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={ResolvedByIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.resolvedBy && touched.resolvedBy && (
                                  <p className="error">{t(errors.resolvedBy)}</p>
                                )}
                              </FormControl>
                              <FormControl fullWidth>
                                <Input
                                  value={values.summary}
                                  name="summary"
                                  className="select-input input"
                                  placeholder={t("Summary of the issue")}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      <img src={SummaryIcon} alt="" />
                                    </InputAdornment>
                                  }
                                  readOnly
                                />
                                {errors.summary && touched.summary && <p className="error">{t(errors.summary)}</p>}
                              </FormControl>

                              <div className="next-button">
                                {this.state.expenseId ? (
                                  <Button type="submit">{t("Update Expense")}</Button>
                                ) : (
                                  <Button type="submit">{t("Add Expense")}</Button>
                                )}
                              </div>
                            </Box>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Box>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <OwnerSidebarImage />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withTranslation()(withStyles(ExpenseTrackingStyle)(AddEditExpense));
// Customizable Area End
